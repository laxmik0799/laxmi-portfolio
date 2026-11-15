import { useEffect, useRef } from 'react'

/**
 * Lightweight 2D-canvas starfield behind the whole page.
 * Very few particles, capped DPR, pauses when the tab is hidden,
 * and renders a single static frame for reduced-motion users.
 */
export default function ParticleField({ reduced = false, density = 0.00005 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w, h, particles, raf
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const colors = ['167,139,250', '96,165,250', '103,232,249', '226,232,240']

    const init = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(140, Math.floor(w * h * density))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.2,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -Math.random() * 0.12 - 0.02,
        a: Math.random() * 0.5 + 0.15,
        tw: Math.random() * Math.PI * 2,
        c: colors[Math.floor(Math.random() * colors.length)],
      }))
    }

    const draw = (t = 0) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        if (!reduced) {
          p.x += p.vx
          p.y += p.vy
          if (p.y < -5) p.y = h + 5
          if (p.x < -5) p.x = w + 5
          if (p.x > w + 5) p.x = -5
        }
        const alpha = p.a * (0.65 + 0.35 * Math.sin(t * 0.001 + p.tw))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.c},${alpha})`
        ctx.fill()
      }
    }

    const loop = (t) => {
      draw(t)
      raf = requestAnimationFrame(loop)
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden && !reduced) raf = requestAnimationFrame(loop)
    }

    init()
    if (reduced) draw()
    else raf = requestAnimationFrame(loop)

    const onResize = () => {
      init()
      if (reduced) draw()
    }
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced, density])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0" />
}
