import type Lenis from "lenis";

function getLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  return (window as unknown as Record<string, Lenis>).__lenis ?? null;
}

export function scrollToElement(href: string, offset = -80) {
  const el = document.querySelector(href);
  if (!el) return;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset, duration: 1.2 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export function scrollToTop() {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.2 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
