import {
  getNavLinks,
  getSocialLinks,
  getHeroStats,
  getTechCards,
  getSoftSkills,
  getFooterData,
} from "../../src/data/navigation";
import { projectCount } from "../../src/data/projects";
import type { Lang } from "../../src/i18n/ui";

const langs: Lang[] = ["es", "en"];

describe("navLinks data", () => {
  it("has the expected Spanish labels", () => {
    expect(getNavLinks("es").map((link) => link.label)).toEqual([
      "Sobre mí",
      "Skills",
      "Proyectos",
      "Experiencia",
      "Contacto",
    ]);
  });

  it("has the expected English labels", () => {
    expect(getNavLinks("en").map((link) => link.label)).toEqual([
      "About",
      "Skills",
      "Projects",
      "Experience",
      "Contact",
    ]);
  });

  it.each(langs)("each link has label and anchor href (%s)", (lang: Lang) => {
    for (const link of getNavLinks(lang)) {
      expect(typeof link.label).toBe("string");
      expect(link.href.startsWith("#")).toBe(true);
    }
  });
});

describe.each(langs)("socialLinks data (%s)", (lang: Lang) => {
  const socialLinks = getSocialLinks(lang);

  it("should have Email, LinkedIn, and GitHub", () => {
    const labels = socialLinks.map((link) => link.label);
    expect(labels).toContain("Email");
    expect(labels).toContain("LinkedIn");
    expect(labels).toContain("GitHub");
  });

  it("each social link has label, href, icon, and value", () => {
    for (const link of socialLinks) {
      expect(link).toHaveProperty("label");
      expect(link).toHaveProperty("href");
      expect(link).toHaveProperty("icon");
      expect(typeof link.value).toBe("string");
    }
  });
});

describe.each(langs)("heroStats data (%s)", (lang: Lang) => {
  const heroStats = getHeroStats(lang);

  it("should have 3 items", () => {
    expect(heroStats).toHaveLength(3);
  });

  it("each stat has value and label", () => {
    for (const stat of heroStats) {
      expect(typeof stat.value).toBe("string");
      expect(typeof stat.label).toBe("string");
    }
  });

  it("derives counts from the data", () => {
    expect(heroStats[0].value).toBe(String(projectCount));
    expect(heroStats[1].value).toBe(String(getTechCards(lang).length));
  });
});

describe.each(langs)("techCards data (%s)", (lang: Lang) => {
  const techCards = getTechCards(lang);

  it("should not be empty", () => {
    expect(techCards.length).toBeGreaterThan(0);
  });

  it("each item has label and category", () => {
    for (const item of techCards) {
      expect(item.label.length).toBeGreaterThan(0);
      expect(typeof item.category).toBe("string");
    }
  });
});

describe.each(langs)("softSkills data (%s)", (lang: Lang) => {
  const softSkills = getSoftSkills(lang);

  it("should have 6 items", () => {
    expect(softSkills).toHaveLength(6);
  });

  it("each soft skill has icon and label", () => {
    for (const skill of softSkills) {
      expect(skill).toHaveProperty("icon");
      expect(typeof skill.label).toBe("string");
    }
  });
});

describe.each(langs)("footerData (%s)", (lang: Lang) => {
  const footerData = getFooterData(lang);

  it("fields are non-empty strings", () => {
    expect(footerData.logo.length).toBeGreaterThan(0);
    expect(footerData.tagline.length).toBeGreaterThan(0);
    expect(footerData.builtWith.length).toBeGreaterThan(0);
  });

  it("copyright uses the current year", () => {
    expect(footerData.copyright).toBe(`©${new Date().getFullYear()}`);
  });
});
