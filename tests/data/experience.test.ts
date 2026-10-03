import {
  getCurrentlyLearning,
  getExperiences,
} from "../../src/data/experience";
import type { Lang } from "../../src/i18n/ui";

const langs: Lang[] = ["es", "en"];

describe.each(langs)("experiences data (%s)", (lang: Lang) => {
  const experiences = getExperiences(lang);

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

describe.each(langs)("currentlyLearning data (%s)", (lang: Lang) => {
  const currentlyLearning = getCurrentlyLearning(lang);

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

describe("experience translations", () => {
  it("both locales have the same entries and colors", () => {
    const es = getExperiences("es");
    const en = getExperiences("en");
    expect(en).toHaveLength(es.length);
    es.forEach((exp, i) => {
      expect(en[i].color).toBe(exp.color);
      expect(en[i].achievements).toHaveLength(exp.achievements.length);
    });
  });
});
