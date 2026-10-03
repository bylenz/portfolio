import { localize, ui } from "../../src/i18n/ui";

describe("localize", () => {
  it("returns shared values as-is", () => {
    expect(localize("React", "en")).toBe("React");
  });

  it("picks the value for the requested locale", () => {
    const value = { es: "Proyectos", en: "Projects" };
    expect(localize(value, "es")).toBe("Proyectos");
    expect(localize(value, "en")).toBe("Projects");
  });

  it("works with per-locale arrays", () => {
    expect(localize({ es: ["a"], en: ["b"] }, "en")).toEqual(["b"]);
  });
});

describe("ui dictionary", () => {
  it("both locales define the same keys", () => {
    expect(Object.keys(ui.en).sort()).toEqual(Object.keys(ui.es).sort());
  });

  it("uses the single 'AI Engineer' title", () => {
    for (const lang of ["es", "en"] as const) {
      expect(ui[lang].meta.title).toContain("AI Engineer");
      expect(JSON.stringify(ui[lang])).not.toMatch(/junior/i);
    }
  });
});
