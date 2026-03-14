import type { APIRoute } from "astro";
import { Resend } from "resend";
import { createHash } from "crypto";

export const prerender = false;

// Hard limits to prevent memory exhaustion and injection attacks
const LIMITS = {
  name: 100,
  email: 150,
  subject: 150,
  message: 1500,
} as const;

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 3; // Max 3 emails per hour per device/IP

// In-memory rate limiting store (use Redis in production)
interface RateLimitEntry {
  count: number;
  firstRequest: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries periodically
setInterval(
  () => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetAt < now) {
        rateLimitStore.delete(key);
      }
    }
  },
  5 * 60 * 1000,
); // Clean every 5 minutes

/**
 * Extract client IP from request headers
 * Supports Cloudflare, Nginx, and standard headers
 */
function getClientIP(request: Request): string {
  const headers = request.headers;

  // Check common proxy headers (order matters - most specific first)
  const cfConnectingIP = headers.get("cf-connecting-ip");
  if (cfConnectingIP) return cfConnectingIP;

  const xRealIP = headers.get("x-real-ip");
  if (xRealIP) return xRealIP;

  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first (original client)
    return xForwardedFor.split(",")[0].trim();
  }

  // Fallback: try to get from request object (server-side)
  // Note: In Node.js adapter, this might not be available
  return "unknown";
}

/**
 * Get IP subnet range for rate limiting
 * IPv4: /24 (last octet masked)
 * IPv6: /64 (last 64 bits masked)
 */
function getIPRange(ip: string): string {
  if (!ip || ip === "unknown") {
    return "unknown";
  }

  // Handle IPv4
  if (ip.includes(".")) {
    const parts = ip.split(".");
    if (parts.length === 4) {
      // Return first 3 octets (e.g., "192.168.1")
      return parts.slice(0, 3).join(".");
    }
  }

  // Handle IPv6
  if (ip.includes(":")) {
    // For IPv6, return first 4 groups (64 bits)
    const groups = ip.split(":");
    // Handle compressed IPv6 (::)
    const fullIPv6 = ip.replace(/::/g, ":".repeat(8 - groups.length + 1));
    const fullGroups = fullIPv6.split(":").slice(0, 4);
    return fullGroups.join(":");
  }

  // Fallback: return as-is
  return ip;
}

/**
 * Generate hybrid fingerprint key combining device fingerprint + IP range
 * This identifies users even if they rotate IPs within the same network/VPN
 */
function generateHybridKey(fingerprint: string, ipRange: string): string {
  const combined = `${fingerprint}:${ipRange}`;
  return createHash("sha256").update(combined).digest("hex").slice(0, 16);
}

/**
 * Check rate limit for a given key
 * Returns { allowed: boolean, remaining: number, resetAt: number }
 */
function checkRateLimit(key: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry) {
    // First request in window
    rateLimitStore.set(key, {
      count: 1,
      firstRequest: now,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    };
  }

  // Check if window has expired
  if (now >= entry.resetAt) {
    // Reset the window
    rateLimitStore.set(key, {
      count: 1,
      firstRequest: now,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    };
  }

  // Check if limit exceeded
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  // Increment count
  entry.count++;
  rateLimitStore.set(key, entry);

  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - entry.count,
    resetAt: entry.resetAt,
  };
}

// Strict email regex (more restrictive than basic format check)
// Allows: letters, numbers, dots, underscores, percent, plus, hyphen
const STRICT_EMAIL_REGEX =
  /^[a-zA-Z0-9]([a-zA-Z0-9._%+-]{0,61}[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9.-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;

interface ContactBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  fingerprint?: string;
}

/**
 * Sanitize and truncate input to prevent XSS and payload attacks
 * - Escape HTML entities first (prevents XSS in email)
 * - Then truncate to hard limit (prevents memory exhaustion)
 * - Finally trim whitespace
 *
 * CRITICAL: Order matters for security - escape BEFORE truncate
 * to prevent cutting in the middle of HTML tags
 */
function sanitizeInput(input: unknown, maxLength: number): string {
  if (typeof input !== "string") {
    return "";
  }

  // Step 1: Trim whitespace
  let sanitized = input.trim();

  // Step 2: Escape HTML entities FIRST (prevents XSS)
  // Order matters: escape & first to avoid double-encoding
  sanitized = sanitized
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");

  // Step 3: Truncate AFTER escaping (prevents memory exhaustion)
  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }

  return sanitized;
}

// Initialize Resend
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  let body: ContactBody;

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Extract fingerprint from request (sent by client)
  const fingerprint = body.fingerprint || "no-fp";

  // Get client IP and calculate range for hybrid rate limiting
  const clientIP = getClientIP(request);
  const ipRange = getIPRange(clientIP);
  const hybridKey = generateHybridKey(fingerprint, ipRange);

  // Check rate limit before any processing
  const rateLimit = checkRateLimit(hybridKey);
  if (!rateLimit.allowed) {
    const resetDate = new Date(rateLimit.resetAt);
    return new Response(
      JSON.stringify({
        error: "Too many requests",
        details: [
          `Has excedido el límite de ${MAX_REQUESTS_PER_WINDOW} mensajes por hora. Intenta de nuevo después de las ${resetDate.toLocaleTimeString()}`,
        ],
        retryAfter: Math.ceil((rateLimit.resetAt - Date.now()) / 1000 / 60), // minutes
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(
            Math.ceil((rateLimit.resetAt - Date.now()) / 1000),
          ),
        },
      },
    );
  }

  const { name, email, subject, message } = body;
  const details: string[] = [];

  if (!name?.trim()) {
    details.push("Name is required");
  } else if (name.length > LIMITS.name) {
    details.push(`Name exceeds ${LIMITS.name} characters`);
  }

  if (!email?.trim()) {
    details.push("Email is required");
  } else if (!STRICT_EMAIL_REGEX.test(email)) {
    details.push("Invalid email format");
  } else if (email.length > LIMITS.email) {
    details.push(`Email exceeds ${LIMITS.email} characters`);
  }

  if (!subject?.trim()) {
    details.push("Subject is required");
  } else if (subject.length > LIMITS.subject) {
    details.push(`Subject exceeds ${LIMITS.subject} characters`);
  }

  if (!message?.trim()) {
    details.push("Message is required");
  } else if (message.length > LIMITS.message) {
    details.push(`Message exceeds ${LIMITS.message} characters`);
  }

  if (details.length > 0) {
    return new Response(
      JSON.stringify({ error: "Validation error", details }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // Sanitize all inputs before using in email (prevents XSS)
  const sanitizedName = sanitizeInput(name, LIMITS.name);
  const sanitizedEmail = sanitizeInput(email, LIMITS.email);
  const sanitizedSubject = sanitizeInput(subject, LIMITS.subject);
  // For message, convert newlines to <br/> AFTER sanitization
  const sanitizedMessage = sanitizeInput(message, LIMITS.message).replace(
    /\n/g,
    "<br/>",
  );

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "lg.chavez1404@gmail.com",
      subject: `[Portfolio Contact] ${sanitizedSubject} de ${sanitizedName}`,
      replyTo: sanitizedEmail,
      html: `
        <h2>Nuevo mensaje de tu Portafolio</h2>
        <p><strong>Nombre:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Asunto:</strong> ${sanitizedSubject}</p>
        <hr />
        <p><strong>Mensaje:</strong></p>
        <p>${sanitizedMessage}</p>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return new Response(
        JSON.stringify({
          error: "Error sending email",
          details: [error.message],
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Internal server error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// Reject non-POST methods
export const ALL: APIRoute = () => {
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
};
