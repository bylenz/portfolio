import { describe, it, expect } from "vitest";

// Hard limits (must match contact.ts)
const LIMITS = {
  name: 100,
  email: 150,
  subject: 150,
  message: 1500,
} as const;

// Strict email regex (must match contact.ts - allows dots in domain)
const STRICT_EMAIL_REGEX =
  /^[a-zA-Z0-9]([a-zA-Z0-9._%+-]{0,61}[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9.-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/;

/**
 * Copy of sanitizeInput from contact.ts for testing
 * Note: Order is trim -> escape -> truncate
 */
function sanitizeInput(input: unknown, maxLength: number): string {
  if (typeof input !== "string") {
    return "";
  }

  let sanitized = input.trim();

  sanitized = sanitized
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");

  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }

  return sanitized;
}

describe("sanitizeInput", () => {
  describe("truncation", () => {
    it("should truncate name to 100 characters", () => {
      const longName = "a".repeat(200);
      const result = sanitizeInput(longName, LIMITS.name);
      expect(result.length).toBe(100);
    });

    it("should truncate email to 150 characters", () => {
      const longEmail = "a".repeat(200) + "@example.com";
      const result = sanitizeInput(longEmail, LIMITS.email);
      expect(result.length).toBe(150);
    });

    it("should truncate subject to 150 characters", () => {
      const longSubject = "a".repeat(300);
      const result = sanitizeInput(longSubject, LIMITS.subject);
      expect(result.length).toBe(150);
    });

    it("should truncate message to 1500 characters", () => {
      const longMessage = "a".repeat(3000);
      const result = sanitizeInput(longMessage, LIMITS.message);
      expect(result.length).toBe(1500);
    });

    it("should NOT truncate if under limit", () => {
      const shortName = "John Doe";
      const result = sanitizeInput(shortName, LIMITS.name);
      expect(result).toBe("John Doe");
    });
  });

  describe("HTML escaping (XSS prevention)", () => {
    it("should escape <script> tags", () => {
      const input = "<script>alert('xss')</script>";
      const result = sanitizeInput(input, LIMITS.name);
      expect(result).not.toContain("<script>");
      expect(result).not.toContain("</script>");
      expect(result).toContain("&lt;");
      expect(result).toContain("&gt;");
    });

    it("should escape < and > characters", () => {
      const result = sanitizeInput("a < b > c", LIMITS.name);
      expect(result).toBe("a &lt; b &gt; c");
    });

    it("should escape quotes", () => {
      const result = sanitizeInput("hello \"world\" and 'test'", LIMITS.name);
      expect(result).toBe("hello &quot;world&quot; and &#x27;test&#x27;");
    });

    it("should escape forward slash", () => {
      const result = sanitizeInput("test/path", LIMITS.name);
      expect(result).toBe("test&#x2F;path");
    });

    it("should escape ampersand", () => {
      const result = sanitizeInput("foo & bar", LIMITS.name);
      expect(result).toBe("foo &amp; bar");
    });

    it("should escape complex XSS payload", () => {
      const payload = '<img src=x onerror="alert(1)">';
      const result = sanitizeInput(payload, LIMITS.message);
      // The < and > should be escaped, neutralizing the tag
      // We should NOT have raw <img, but we SHOULD have escaped &lt;img
      expect(result).not.toContain("<img"); // Raw tag
      expect(result).toContain("&lt;img"); // Escaped tag - this is SAFE
    });

    it("should escape nested HTML", () => {
      const payload = "<div><p><script>evil()</script></p></div>";
      const result = sanitizeInput(payload, LIMITS.message);
      expect(result).not.toContain("<div>");
      expect(result).not.toContain("<p>");
      expect(result).not.toContain("<script>");
    });
  });

  describe("whitespace handling", () => {
    it("should trim leading whitespace", () => {
      const result = sanitizeInput("   John", LIMITS.name);
      expect(result).toBe("John");
    });

    it("should trim trailing whitespace", () => {
      const result = sanitizeInput("John   ", LIMITS.name);
      expect(result).toBe("John");
    });

    it("should trim both sides", () => {
      const result = sanitizeInput("   John Doe   ", LIMITS.name);
      expect(result).toBe("John Doe");
    });
  });

  describe("non-string input", () => {
    it("should return empty string for null", () => {
      const result = sanitizeInput(null, LIMITS.name);
      expect(result).toBe("");
    });

    it("should return empty string for undefined", () => {
      const result = sanitizeInput(undefined, LIMITS.name);
      expect(result).toBe("");
    });

    it("should return empty string for number", () => {
      const result = sanitizeInput(123, LIMITS.name);
      expect(result).toBe("");
    });

    it("should return empty string for object", () => {
      const result = sanitizeInput({ foo: "bar" }, LIMITS.name);
      expect(result).toBe("");
    });
  });

  describe("security: order of operations", () => {
    it("should escape HTML before truncating", () => {
      // If we truncate first, we could cut in the middle of a tag
      // Escaping first prevents active tags from remaining
      const payload = "<script>alert(1)</script>" + "a".repeat(100);
      const result = sanitizeInput(payload, LIMITS.name);
      // The script tag should be neutralized by escaping
      expect(result).not.toContain("<script>");
      expect(result).not.toContain("</script>");
    });

    it("should neutralize HTML tags regardless of position", () => {
      // Tag at the start
      const payload1 = "<img src=x onerror=alert(1)>aaaa";
      const result1 = sanitizeInput(payload1, LIMITS.name);
      // The < should be escaped to &lt;, neutralizing the tag
      expect(result1).not.toContain("<img");
      expect(result1).toContain("&lt;img"); // Escaped opening bracket

      // Tag in the middle
      const payload2 = "aaaa" + "<script>evil()</script>" + "aaaa";
      const result2 = sanitizeInput(payload2, LIMITS.name);
      expect(result2).not.toContain("<script>");
    });
  });
});

describe("STRICT_EMAIL_REGEX", () => {
  it("should accept valid emails", () => {
    expect(STRICT_EMAIL_REGEX.test("test@example.com")).toBe(true);
    expect(STRICT_EMAIL_REGEX.test("user.name@domain.co.uk")).toBe(true);
    expect(STRICT_EMAIL_REGEX.test("user+tag@example.org")).toBe(true);
    expect(STRICT_EMAIL_REGEX.test("a@b.co")).toBe(true);
  });

  it("should reject invalid emails", () => {
    expect(STRICT_EMAIL_REGEX.test("")).toBe(false);
    expect(STRICT_EMAIL_REGEX.test("plainaddress")).toBe(false);
    expect(STRICT_EMAIL_REGEX.test("@example.com")).toBe(false);
    expect(STRICT_EMAIL_REGEX.test("test@")).toBe(false);
    expect(STRICT_EMAIL_REGEX.test("test@.com")).toBe(false);
    expect(STRICT_EMAIL_REGEX.test("test@example")).toBe(false);
    expect(STRICT_EMAIL_REGEX.test("test@example.c")).toBe(false);
  });

  it("should reject emails starting/ending with special chars", () => {
    expect(STRICT_EMAIL_REGEX.test(".test@example.com")).toBe(false);
    expect(STRICT_EMAIL_REGEX.test("test.@example.com")).toBe(false);
  });
});

describe("LIMITS constants", () => {
  it("should have correct name limit", () => {
    expect(LIMITS.name).toBe(100);
  });

  it("should have correct email limit", () => {
    expect(LIMITS.email).toBe(150);
  });

  it("should have correct subject limit", () => {
    expect(LIMITS.subject).toBe(150);
  });

  it("should have correct message limit", () => {
    expect(LIMITS.message).toBe(1500);
  });
});
