import { describe, it, expect, beforeEach } from "vitest";
import {
  checkRateLimit,
  getClientIP,
  rateLimitStore,
  MAX_REQUESTS_PER_WINDOW,
  RATE_LIMIT_WINDOW_MS,
} from "../../src/pages/api/contact";

describe("checkRateLimit", () => {
  beforeEach(() => rateLimitStore.clear());

  it("allows the first request", () => {
    const r = checkRateLimit("1.1.1.1");
    expect(r.allowed).toBe(true);
    expect(r.remaining).toBe(2);
  });

  it("allows up to the limit, then blocks", () => {
    checkRateLimit("1.1.1.1");
    checkRateLimit("1.1.1.1");
    expect(checkRateLimit("1.1.1.1")).toMatchObject({
      allowed: true,
      remaining: 0,
    });
    const blocked = checkRateLimit("1.1.1.1");
    expect(blocked.allowed).toBe(false);
    expect(blocked.resetAt).toBeGreaterThan(Date.now());
  });

  it("tracks keys separately", () => {
    for (let i = 0; i < 3; i++) checkRateLimit("1.1.1.1");
    expect(checkRateLimit("2.2.2.2")).toMatchObject({
      allowed: true,
      remaining: 2,
    });
  });

  it("resets after the window and prunes expired entries lazily", () => {
    const t0 = 1_000_000;
    for (let i = 0; i < 3; i++) checkRateLimit("1.1.1.1", t0);
    checkRateLimit("3.3.3.3", t0);
    expect(checkRateLimit("1.1.1.1", t0).allowed).toBe(false);

    const later = t0 + RATE_LIMIT_WINDOW_MS;
    expect(checkRateLimit("1.1.1.1", later).allowed).toBe(true);
    expect(rateLimitStore.has("3.3.3.3")).toBe(false);
  });
});

describe("getClientIP", () => {
  const req = (headers: Record<string, string>) =>
    new Request("http://localhost/api/contact", { headers });

  it("uses the first x-forwarded-for entry", () => {
    expect(getClientIP(req({ "x-forwarded-for": "9.9.9.9, 10.0.0.1" }))).toBe(
      "9.9.9.9",
    );
  });

  it("falls back to x-real-ip", () => {
    expect(getClientIP(req({ "x-real-ip": "8.8.8.8" }))).toBe("8.8.8.8");
  });

  it("falls back to clientAddress, then unknown", () => {
    expect(getClientIP(req({}), "7.7.7.7")).toBe("7.7.7.7");
    expect(getClientIP(req({}))).toBe("unknown");
  });
});

describe("rate limit constants", () => {
  it("allows 3 requests per hour", () => {
    expect(MAX_REQUESTS_PER_WINDOW).toBe(3);
    expect(RATE_LIMIT_WINDOW_MS).toBe(60 * 60 * 1000);
  });
});
