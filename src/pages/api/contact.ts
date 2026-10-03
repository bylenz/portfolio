import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

// Hard limits to prevent memory exhaustion
export const LIMITS = {
  name: 100,
  email: 150,
  subject: 150,
  message: 1500,
} as const;

export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
export const MAX_REQUESTS_PER_WINDOW = 3; // Max 3 emails per hour per IP

const DEFAULT_FROM = "onboarding@resend.dev";
const DEFAULT_TO = "lg.chavez1404@gmail.com";

// Strict email regex: letters, numbers, dots, underscores, percent, plus, hyphen
export const STRICT_EMAIL_REGEX =
  /^[a-zA-Z0-9]([a-zA-Z0-9._%+-]{0,61}[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9.-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;

export type Lang = "es" | "en";

export const MESSAGES = {
  es: {
    invalidJson: "Cuerpo de la solicitud inválido",
    nameRequired: "El nombre es obligatorio",
    nameTooLong: `El nombre supera los ${LIMITS.name} caracteres`,
    emailRequired: "El correo es obligatorio",
    emailInvalid: "El formato del correo no es válido",
    emailTooLong: `El correo supera los ${LIMITS.email} caracteres`,
    subjectRequired: "El asunto es obligatorio",
    subjectTooLong: `El asunto supera los ${LIMITS.subject} caracteres`,
    messageRequired: "El mensaje es obligatorio",
    messageTooLong: `El mensaje supera los ${LIMITS.message} caracteres`,
    validation: "Error de validación",
    tooManyRequests: (minutes: number) =>
      `Has excedido el límite de ${MAX_REQUESTS_PER_WINDOW} mensajes por hora. Intenta de nuevo en ${minutes} minuto(s).`,
    notConfigured: "El servicio de correo no está configurado",
    sendError: "No se pudo enviar el mensaje. Intenta de nuevo más tarde.",
    internal: "Error interno del servidor",
    methodNotAllowed: "Método no permitido",
  },
  en: {
    invalidJson: "Invalid request body",
    nameRequired: "Name is required",
    nameTooLong: `Name exceeds ${LIMITS.name} characters`,
    emailRequired: "Email is required",
    emailInvalid: "Invalid email format",
    emailTooLong: `Email exceeds ${LIMITS.email} characters`,
    subjectRequired: "Subject is required",
    subjectTooLong: `Subject exceeds ${LIMITS.subject} characters`,
    messageRequired: "Message is required",
    messageTooLong: `Message exceeds ${LIMITS.message} characters`,
    validation: "Validation error",
    tooManyRequests: (minutes: number) =>
      `You have exceeded the limit of ${MAX_REQUESTS_PER_WINDOW} messages per hour. Try again in ${minutes} minute(s).`,
    notConfigured: "Email service is not configured",
    sendError: "Could not send the message. Please try again later.",
    internal: "Internal server error",
    methodNotAllowed: "Method not allowed",
  },
} as const;

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// Best-effort: in-memory, per serverless instance (not shared across instances).
export const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Client IP: first x-forwarded-for entry, then x-real-ip, then Astro's clientAddress.
 */
export function getClientIP(request: Request, clientAddress?: string): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  const realIP = request.headers.get("x-real-ip");
  if (realIP) return realIP.trim();
  return clientAddress || "unknown";
}

/**
 * Fixed-window rate limit. Expired entries are pruned lazily on each call.
 */
export function checkRateLimit(
  key: string,
  now: number = Date.now(),
): { allowed: boolean; remaining: number; resetAt: number } {
  for (const [k, entry] of rateLimitStore) {
    if (entry.resetAt <= now) rateLimitStore.delete(k);
  }

  const entry = rateLimitStore.get(key);
  if (!entry) {
    const resetAt = now + RATE_LIMIT_WINDOW_MS;
    rateLimitStore.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1, resetAt };
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - entry.count,
    resetAt: entry.resetAt,
  };
}

/** HTML-escape a string. Use only when building the HTML email body. */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

/**
 * Validate raw (trimmed) input. Returns the list of error messages (empty if valid)
 * and the raw values truncated to their limits.
 */
export function validateContact(
  body: Record<string, unknown>,
  lang: Lang,
): { errors: string[]; data: ContactInput } {
  const t = MESSAGES[lang];
  const name = str(body.name);
  const email = str(body.email);
  const subject = str(body.subject);
  const message = str(body.message);
  const errors: string[] = [];

  if (!name) errors.push(t.nameRequired);
  else if (name.length > LIMITS.name) errors.push(t.nameTooLong);

  if (!email) errors.push(t.emailRequired);
  else if (email.length > LIMITS.email) errors.push(t.emailTooLong);
  else if (!STRICT_EMAIL_REGEX.test(email)) errors.push(t.emailInvalid);

  if (!subject) errors.push(t.subjectRequired);
  else if (subject.length > LIMITS.subject) errors.push(t.subjectTooLong);

  if (!message) errors.push(t.messageRequired);
  else if (message.length > LIMITS.message) errors.push(t.messageTooLong);

  return {
    errors,
    data: {
      name: name.slice(0, LIMITS.name),
      email: email.slice(0, LIMITS.email),
      subject: subject.slice(0, LIMITS.subject),
      message: message.slice(0, LIMITS.message),
    },
  };
}

/** Strip CR/LF so values are safe in single-line headers like the subject. */
export function stripNewlines(input: string): string {
  return input.replace(/[\r\n]+/g, " ");
}

export function buildEmailHtml(data: ContactInput): string {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const subject = escapeHtml(data.subject);
  const message = escapeHtml(data.message).replace(/\r?\n/g, "<br/>");
  return `
        <h2>Nuevo mensaje de tu Portafolio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <hr />
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `;
}

function json(
  body: unknown,
  status: number,
  headers: Record<string, string> = {},
) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let body: Record<string, unknown>;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Body must be a JSON object");
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ error: MESSAGES.es.invalidJson }, 400);
  }

  const lang: Lang = body.lang === "en" ? "en" : "es";
  const t = MESSAGES[lang];

  // Honeypot: bots fill the hidden "website" field. Pretend success, send nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return json({ success: true }, 200);
  }

  const { errors, data } = validateContact(body, lang);
  if (errors.length > 0) {
    return json({ error: t.validation, details: errors }, 400);
  }

  // clientAddress throws on adapters/dev modes that don't provide it
  let address: string | undefined;
  try {
    address = clientAddress;
  } catch {
    address = undefined;
  }
  const rateLimit = checkRateLimit(getClientIP(request, address));
  if (!rateLimit.allowed) {
    const seconds = Math.ceil((rateLimit.resetAt - Date.now()) / 1000);
    const minutes = Math.max(1, Math.ceil(seconds / 60));
    return json(
      {
        error: t.tooManyRequests(minutes),
        details: [t.tooManyRequests(minutes)],
        retryAfter: minutes,
      },
      429,
      { "Retry-After": String(seconds) },
    );
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return json({ error: t.notConfigured }, 500);
  }

  try {
    const resend = new Resend(apiKey);
    const { data: result, error } = await resend.emails.send({
      from: import.meta.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
      to: import.meta.env.CONTACT_TO_EMAIL || DEFAULT_TO,
      subject: stripNewlines(
        `[Portfolio Contact] ${data.subject} de ${data.name}`,
      ),
      replyTo: data.email,
      html: buildEmailHtml(data),
    });

    if (error) {
      console.error("Resend API error:", error);
      return json({ error: t.sendError, details: [t.sendError] }, 500);
    }

    return json({ success: true, data: result }, 200);
  } catch (err) {
    console.error("Internal server error:", err);
    return json({ error: t.internal }, 500);
  }
};

// Reject non-POST methods
export const ALL: APIRoute = () =>
  json({ error: MESSAGES.es.methodNotAllowed }, 405);
