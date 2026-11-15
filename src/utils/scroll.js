/**
 * Tiny scroll service shared across components.
 * Uses Lenis when active, otherwise falls back to native smooth scrolling.
 */
let lenisInstance = null

export const setLenis = (instance) => {
  lenisInstance = instance
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: id === 'home' ? 0 : -72 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  history.replaceState(null, '', id === 'home' ? window.location.pathname : `#${id}`)
}

export const lockScroll = () => {
  lenisInstance?.stop()
  document.documentElement.style.overflow = 'hidden'
}

export const unlockScroll = () => {
  lenisInstance?.start()
  document.documentElement.style.overflow = ''
}
