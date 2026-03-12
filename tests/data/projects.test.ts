import { projects } from "../../src/data/projects";

describe("projects data", () => {
  it("should not be empty", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("each project has all required fields", () => {
    for (const project of projects) {
      expect(project).toHaveProperty("number");
      expect(project).toHaveProperty("status");
      expect(project).toHaveProperty("emoji");
      expect(project).toHaveProperty("title");
      expect(project).toHaveProperty("subtitle");
      expect(project).toHaveProperty("description");
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
