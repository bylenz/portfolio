import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const send = vi.fn();
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send } };
  }),
}));

import type { APIContext } from "astro";
import { POST, rateLimitStore } from "../../src/pages/api/contact";

const valid = {
  name: "Ana <b>",
  email: "ana@example.com",
  subject: "Hola\r\nBcc: x@y.com",
  message: "Mensaje & más",
};

let ipCounter = 0;
function call(body: unknown, ip = `10.0.0.${++ipCounter}`) {
  const request = new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
  return POST({
    request,
    clientAddress: "127.0.0.1",
  } as unknown as APIContext) as Promise<Response>;
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    rateLimitStore.clear();
    send.mockReset();
    send.mockResolvedValue({ data: { id: "1" }, error: null });
    vi.stubEnv("RESEND_API_KEY", "test_key");
  });
  afterEach(() => vi.unstubAllEnvs());

  it("sends with raw replyTo/subject and escaped HTML", async () => {
    const res = await call(valid);
    expect(res.status).toBe(200);
    const args = send.mock.calls[0][0];
    expect(args.replyTo).toBe("ana@example.com");
    expect(args.subject).toBe(
      "[Portfolio Contact] Hola Bcc: x@y.com de Ana <b>",
    );
    expect(args.html).toContain("Ana &lt;b&gt;");
    expect(args.html).toContain("Mensaje &amp; más");
    expect(args.from).toBe("onboarding@resend.dev");
  });

  it("uses CONTACT_FROM_EMAIL / CONTACT_TO_EMAIL when set", async () => {
    vi.stubEnv("CONTACT_FROM_EMAIL", "from@example.com");
    vi.stubEnv("CONTACT_TO_EMAIL", "to@example.com");
    await call(valid);
    expect(send.mock.calls[0][0]).toMatchObject({
      from: "from@example.com",
      to: "to@example.com",
    });
  });

  it("honeypot returns 200 without sending", async () => {
    const res = await call({ ...valid, website: "http://spam" });
    expect(res.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });

  it("returns Spanish errors by default and English with lang=en", async () => {
    const es = await (await call({})).json();
    expect(es.error).toBe("Error de validación");
    const en = await call({ lang: "en" });
    expect(en.status).toBe(400);
    expect((await en.json()).details).toContain("Name is required");
  });

  it("rejects invalid JSON", async () => {
    expect((await call("not json")).status).toBe(400);
  });

  it("rate limits by IP regardless of fingerprint", async () => {
    for (let i = 0; i < 3; i++) {
      expect(
        (await call({ ...valid, fingerprint: `fp${i}` }, "5.5.5.5")).status,
      ).toBe(200);
    }
    const res = await call(
      { ...valid, fingerprint: "new", lang: "en" },
      "5.5.5.5",
    );
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBeTruthy();
    expect((await res.json()).error).toMatch(/exceeded/);
  });

  it("returns 500 when RESEND_API_KEY is missing", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const res = await call({ ...valid, lang: "en" });
    expect(res.status).toBe(500);
    expect((await res.json()).error).toBe("Email service is not configured");
    expect(send).not.toHaveBeenCalled();
  });

  it("returns a localized error when Resend fails", async () => {
    send.mockResolvedValue({ data: null, error: { message: "boom" } });
    const res = await call(valid);
    expect(res.status).toBe(500);
    expect((await res.json()).error).toMatch(/No se pudo enviar/);
  });
});
