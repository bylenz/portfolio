import { skillCategories, toolsBelt } from "../../src/data/skills";

describe("skillCategories data", () => {
  it("should have 4 categories", () => {
    expect(skillCategories).toHaveLength(4);
  });

  it("each category has icon, label, color, and skills array", () => {
    for (const category of skillCategories) {
      expect(category).toHaveProperty("icon");
      expect(category).toHaveProperty("label");
      expect(category).toHaveProperty("color");
      expect(Array.isArray(category.skills)).toBe(true);
      expect(category.skills.length).toBeGreaterThan(0);
    }
  });

  it("each skill has name, note, and percentage (0-100)", () => {
    for (const category of skillCategories) {
      for (const skill of category.skills) {
        expect(skill).toHaveProperty("name");
        expect(skill).toHaveProperty("note");
        expect(skill).toHaveProperty("percentage");
        expect(typeof skill.percentage).toBe("number");
      }
    }
  });

  it("all percentages are between 0 and 100", () => {
    for (const category of skillCategories) {
      for (const skill of category.skills) {
        expect(skill.percentage).toBeGreaterThanOrEqual(0);
        expect(skill.percentage).toBeLessThanOrEqual(100);
      }
    }
  });
});

describe("toolsBelt data", () => {
  it("should not be empty", () => {
    expect(toolsBelt.length).toBeGreaterThan(0);
  });

  it("each item is a non-empty string", () => {
    for (const tool of toolsBelt) {
      expect(typeof tool).toBe("string");
      expect(tool.length).toBeGreaterThan(0);
    }
  });
});
