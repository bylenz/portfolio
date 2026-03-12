import {
  navLinks,
  socialLinks,
  heroStats,
  marqueeItems,
  softSkills,
  footerData,
} from "../../src/data/navigation";

describe("navLinks data", () => {
  it("should have the expected navigation items", () => {
    const labels = navLinks.map((link) => link.label);
    expect(labels).toContain("About");
    expect(labels).toContain("Skills");
    expect(labels).toContain("Projects");
    expect(labels).toContain("XP");
    expect(labels).toContain("Contact");
  });

  it("each link has label and href", () => {
    for (const link of navLinks) {
      expect(typeof link.label).toBe("string");
      expect(typeof link.href).toBe("string");
      expect(link.href.startsWith("#")).toBe(true);
    }
  });
});

describe("socialLinks data", () => {
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
      expect(link).toHaveProperty("value");
    }
  });
});

describe("heroStats data", () => {
  it("should have 3 items", () => {
    expect(heroStats).toHaveLength(3);
  });

  it("each stat has value and label", () => {
    for (const stat of heroStats) {
      expect(stat).toHaveProperty("value");
      expect(stat).toHaveProperty("label");
    }
  });
});

describe("marqueeItems data", () => {
  it("should not be empty", () => {
    expect(marqueeItems.length).toBeGreaterThan(0);
  });

  it("each item has a label", () => {
    for (const item of marqueeItems) {
      expect(typeof item.label).toBe("string");
      expect(item.label.length).toBeGreaterThan(0);
    }
  });
});

describe("softSkills data", () => {
  it("should have 6 items", () => {
    expect(softSkills).toHaveLength(6);
  });

  it("each soft skill has icon and label", () => {
    for (const skill of softSkills) {
      expect(skill).toHaveProperty("icon");
      expect(skill).toHaveProperty("label");
      expect(typeof skill.label).toBe("string");
    }
  });
});

describe("footerData", () => {
  it("should have required fields", () => {
    expect(footerData).toHaveProperty("logo");
    expect(footerData).toHaveProperty("tagline");
    expect(footerData).toHaveProperty("copyright");
    expect(footerData).toHaveProperty("builtWith");
  });

  it("fields are non-empty strings", () => {
    expect(footerData.logo.length).toBeGreaterThan(0);
    expect(footerData.tagline.length).toBeGreaterThan(0);
    expect(footerData.copyright.length).toBeGreaterThan(0);
    expect(footerData.builtWith.length).toBeGreaterThan(0);
  });
});
