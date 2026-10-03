import { getProjects, projectCount } from "../../src/data/projects";
import type { Lang } from "../../src/i18n/ui";

const langs: Lang[] = ["es", "en"];

describe.each(langs)("projects data (%s)", (lang: Lang) => {
  const projects = getProjects(lang);

  it("should not be empty", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("each project has all required fields", () => {
    for (const project of projects) {
      expect(project).toHaveProperty("number");
      expect(project).toHaveProperty("status");
      expect(project).toHaveProperty("emoji");
      expect(project).toHaveProperty("title");
      expect(typeof project.status).toBe("string");
      expect(typeof project.subtitle).toBe("string");
      expect(typeof project.description).toBe("string");
      expect(project).toHaveProperty("highlights");
      expect(project).toHaveProperty("tags");
      expect(project).toHaveProperty("accentColor");
    }
  });

  it("highlights and tags are non-empty arrays", () => {
    for (const project of projects) {
      expect(Array.isArray(project.highlights)).toBe(true);
      expect(project.highlights.length).toBeGreaterThan(0);
      expect(Array.isArray(project.tags)).toBe(true);
      expect(project.tags.length).toBeGreaterThan(0);
    }
  });

  it("first project has featured: true", () => {
    expect(projects[0].featured).toBe(true);
  });

  it("accentColor matches hex pattern", () => {
    const hexPattern = /^#[0-9A-Fa-f]{6}$/;
    for (const project of projects) {
      expect(project.accentColor).toMatch(hexPattern);
    }
  });

  it("project numbers are sequential ('01', '02', ...)", () => {
    projects.forEach((project, index) => {
      const expected = String(index + 1).padStart(2, "0");
      expect(project.number).toBe(expected);
    });
  });
});

describe("project translations", () => {
  it("projectCount matches the data", () => {
    expect(projectCount).toBe(getProjects("es").length);
  });

  it("non-text fields are shared between locales", () => {
    const es = getProjects("es");
    const en = getProjects("en");
    es.forEach((project, i) => {
      expect(en[i].title).toBe(project.title);
      expect(en[i].tags).toEqual(project.tags);
      expect(en[i].images).toEqual(project.images);
      expect(en[i].accentColor).toBe(project.accentColor);
    });
  });

  it("text fields are actually translated", () => {
    expect(getProjects("en")[0].description).not.toBe(
      getProjects("es")[0].description,
    );
  });
});
