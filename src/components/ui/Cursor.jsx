import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Soft glowing ring that trails the cursor and expands over interactive
 * elements. The native cursor stays visible for usability.
 * Only mounted on fine-pointer devices without reduced motion.
 */
export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
      const target = e.target.closest?.('a, button, [data-cursor="hover"], input, textarea, select, [role="button"]')
      setHover(Boolean(target))
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [x, y, visible])

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-cyan-300/60 mix-blend-screen"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hover ? 52 : 26,
          height: hover ? 52 : 26,
          opacity: visible ? 1 : 0,
          backgroundColor: hover ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0)',
          borderColor: hover ? 'rgba(167,139,250,0.8)' : 'rgba(103,232,249,0.55)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-0 h-[480px] w-[480px] rounded-full"
        style={{
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.07), transparent 60%)',
        }}
        animate={{ opacity: visible ? 1 : 0 }}
      />
    </>
  )
}
