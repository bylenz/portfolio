/**
 * IntersectionObserver setup for scroll-triggered animations.
 * Adds "visible" class when elements with ".observe" enter the viewport.
 */
export function initScrollObserver(): void {
  const options: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, options);

  document.querySelectorAll(".observe").forEach((el) => observer.observe(el));
}
