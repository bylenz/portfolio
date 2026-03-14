import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
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

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "lg.chavez1404@gmail.com",
      subject: `[Portfolio Contact] ${subject} de ${name}`,
      replyTo: email,
      html: `
        <h2>Nuevo mensaje de tu Portafolio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <hr />
        <p><strong>Mensaje:</strong></p>
        <p>${message?.replace(/\\n/g, "<br/>")}</p>
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
