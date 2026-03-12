import { describe, it, expect } from "vitest";

describe("Test infrastructure", () => {
  it("should run tests with vitest", () => {
    expect(true).toBe(true);
  });

  it("should have jsdom environment available", () => {
    expect(typeof document).toBe("object");
    expect(typeof window).toBe("object");
  });
});
