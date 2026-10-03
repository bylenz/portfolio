import { describe, it, expect } from "vitest";
import {
  LIMITS,
  STRICT_EMAIL_REGEX,
  escapeHtml,
  stripNewlines,
  validateContact,
  buildEmailHtml,
} from "../../src/pages/api/contact";

const valid = {
  name: "John Doe",
  email: "john@example.com",
  subject: "Hello",
  message: "Hi there",
};

describe("escapeHtml", () => {
  it("escapes HTML special characters", () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;&#x27;&amp;&#x27;&lt;/a&gt;",
    );
  });

  it("neutralizes script tags", () => {
    const r = escapeHtml("<script>alert(1)</script>");
    expect(r).not.toContain("<script>");
    expect(r).toContain("&lt;script&gt;");
  });
});

describe("stripNewlines", () => {
  it("removes CR/LF", () => {
    expect(stripNewlines("a\r\nBcc: x@y.com\nb")).toBe("a Bcc: x@y.com b");
  });
});

describe("validateContact", () => {
  it("accepts valid input and keeps raw (unescaped) values", () => {
    const { errors, data } = validateContact(
      { ...valid, name: "  O'Brien & <Co>  " },
      "es",
    );
    expect(errors).toEqual([]);
    expect(data.name).toBe("O'Brien & <Co>");
    expect(data.email).toBe("john@example.com");
  });

  it("reports missing fields in Spanish by default", () => {
    const { errors } = validateContact({}, "es");
    expect(errors).toEqual([
      "El nombre es obligatorio",
      "El correo es obligatorio",
      "El asunto es obligatorio",
      "El mensaje es obligatorio",
    ]);
  });

  it("reports errors in English", () => {
    const { errors } = validateContact({ ...valid, email: "bad" }, "en");
    expect(errors).toEqual(["Invalid email format"]);
  });

  it("rejects over-length fields", () => {
    const { errors } = validateContact(
      {
        name: "a".repeat(LIMITS.name + 1),
        email: "a".repeat(LIMITS.email) + "@example.com",
        subject: "a".repeat(LIMITS.subject + 1),
        message: "a".repeat(LIMITS.message + 1),
      },
      "en",
    );
    expect(errors).toHaveLength(4);
  });

  it("treats non-string values as missing", () => {
    const { errors } = validateContact({ ...valid, name: 123 }, "en");
    expect(errors).toEqual(["Name is required"]);
  });

  it("does not count escaping toward the length limit", () => {
    const { errors } = validateContact(
      { ...valid, name: "&".repeat(LIMITS.name) },
      "en",
    );
    expect(errors).toEqual([]);
  });
});

describe("buildEmailHtml", () => {
  it("escapes user input and converts newlines", () => {
    const html = buildEmailHtml({ ...valid, message: "<b>hi</b>\nline2" });
    expect(html).toContain("&lt;b&gt;hi&lt;/b&gt;<br/>line2");
    expect(html).not.toContain("<b>hi");
  });
});

describe("STRICT_EMAIL_REGEX", () => {
  it("accepts valid emails", () => {
    for (const e of [
      "test@example.com",
      "user.name@domain.co.uk",
      "user+tag@example.org",
      "a@b.co",
    ]) {
      expect(STRICT_EMAIL_REGEX.test(e)).toBe(true);
    }
  });

  it("rejects invalid emails", () => {
    for (const e of [
      "",
      "plainaddress",
      "@example.com",
      "test@",
      "test@.com",
      "test@example",
      "test@example.c",
      ".test@example.com",
      "test.@example.com",
    ]) {
      expect(STRICT_EMAIL_REGEX.test(e)).toBe(false);
    }
  });
});
