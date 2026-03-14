import type { APIRoute } from "astro";

export const prerender = false;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

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

  const { name, email, subject, message } = body;
  const details: string[] = [];

  if (!name?.trim()) {
    details.push("Name is required");
  }

  if (!email?.trim()) {
    details.push("Email is required");
  } else if (!EMAIL_REGEX.test(email)) {
    details.push("Invalid email format");
  }

  if (!subject?.trim()) {
    details.push("Subject is required");
  }

  if (!message?.trim()) {
    details.push("Message is required");
  }

  if (details.length > 0) {
    return new Response(
      JSON.stringify({ error: "Validation error", details }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  // TODO: Integrate Resend for actual email sending
  // For now, return success placeholder
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

// Reject non-POST methods
export const ALL: APIRoute = () => {
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
};
