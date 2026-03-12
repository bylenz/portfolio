import { initScrollObserver } from "../../src/utils/observe";
import { vi } from "vitest";

describe("initScrollObserver", () => {
  let mockObserve: ReturnType<typeof vi.fn>;
  let constructorCalls: Array<[IntersectionObserverCallback, IntersectionObserverInit]>;

  beforeEach(() => {
    mockObserve = vi.fn();
    constructorCalls = [];

    const MockIntersectionObserver = function (
      this: IntersectionObserver,
      callback: IntersectionObserverCallback,
      options: IntersectionObserverInit,
    ) {
      constructorCalls.push([callback, options]);
      return { observe: mockObserve, unobserve: vi.fn(), disconnect: vi.fn() };
    } as unknown as typeof IntersectionObserver;

    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  it("should be a callable function", () => {
    expect(typeof initScrollObserver).toBe("function");
  });

  it("should create an IntersectionObserver", () => {
    initScrollObserver();
    expect(constructorCalls).toHaveLength(1);
  });

  it("should pass correct options to IntersectionObserver", () => {
    initScrollObserver();
    const [, options] = constructorCalls[0];
    expect(options).toEqual({
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });
  });

  it("should observe all elements with .observe class", () => {
    document.body.innerHTML = `
      <div class="observe">A</div>
      <div class="observe">B</div>
      <div class="other">C</div>
    `;
    initScrollObserver();
    expect(mockObserve).toHaveBeenCalledTimes(2);
  });

  it("should not call observe when no .observe elements exist", () => {
    document.body.innerHTML = `<div class="other">Nothing here</div>`;
    initScrollObserver();
    expect(mockObserve).toHaveBeenCalledTimes(0);
  });

  it("should add 'visible' class when entry is intersecting", () => {
    document.body.innerHTML = `<div class="observe">Target</div>`;
    initScrollObserver();

    const [callback] = constructorCalls[0];
    const target = document.querySelector(".observe")!;
    callback([{ isIntersecting: true, target } as unknown as IntersectionObserverEntry], {} as IntersectionObserver);

    expect(target.classList.contains("visible")).toBe(true);
  });

  it("should NOT add 'visible' class when entry is not intersecting", () => {
    document.body.innerHTML = `<div class="observe">Target</div>`;
    initScrollObserver();

    const [callback] = constructorCalls[0];
    const target = document.querySelector(".observe")!;
    callback([{ isIntersecting: false, target } as unknown as IntersectionObserverEntry], {} as IntersectionObserver);

    expect(target.classList.contains("visible")).toBe(false);
  });
});
