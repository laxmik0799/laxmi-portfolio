import { useEffect } from 'react'
import Lenis from 'lenis'
import { setLenis } from '../utils/scroll'

/**
 * Enables Lenis smooth scrolling — skipped entirely for users who
 * prefer reduced motion, and on touch devices (native scroll feels better there).
 */
export function useSmoothScroll(enabled) {
  useEffect(() => {
    if (!enabled) return
    const lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true })
    setLenis(lenis)

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [enabled])
}
