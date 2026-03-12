import { experiences, currentlyLearning } from "../../src/data/experience";

describe("experiences data", () => {
  it("should not be empty", () => {
    expect(experiences.length).toBeGreaterThan(0);
  });

  it("each experience has all required fields", () => {
    for (const exp of experiences) {
      expect(exp).toHaveProperty("period");
      expect(exp).toHaveProperty("role");
      expect(exp).toHaveProperty("company");
      expect(exp).toHaveProperty("type");
      expect(exp).toHaveProperty("color");
      expect(exp).toHaveProperty("description");
      expect(exp).toHaveProperty("achievements");
    }
  });

  it("achievements are non-empty arrays", () => {
    for (const exp of experiences) {
      expect(Array.isArray(exp.achievements)).toBe(true);
      expect(exp.achievements.length).toBeGreaterThan(0);
    }
  });

  it("each achievement is a non-empty string", () => {
    for (const exp of experiences) {
      for (const achievement of exp.achievements) {
        expect(typeof achievement).toBe("string");
        expect(achievement.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("currentlyLearning data", () => {
  it("should exist and not be empty", () => {
    expect(currentlyLearning).toBeDefined();
    expect(currentlyLearning.length).toBeGreaterThan(0);
  });

  it("each item has a label", () => {
    for (const item of currentlyLearning) {
      expect(item).toHaveProperty("label");
      expect(typeof item.label).toBe("string");
      expect(item.label.length).toBeGreaterThan(0);
    }
  });
});
