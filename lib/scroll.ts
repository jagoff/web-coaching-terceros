export function scrollToElement(href: string, offset = -80) {
  const el = document.querySelector(href)
  if (!el) return

  const top = el.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: 'smooth' })
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
