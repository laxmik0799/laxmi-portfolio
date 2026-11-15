import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useFinePointer, usePrefersReducedMotion } from '../../hooks/useMediaQuery'

/**
 * 3D tilt container with a cursor-following spotlight.
 * Tilt is disabled on touch devices and for reduced-motion users.
 */
export default function TiltCard({ children, className = '', max = 9, glow = 'rgba(139,92,246,0.18)', ...props }) {
  const ref = useRef(null)
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const active = fine && !reduced

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 180, damping: 18 })
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 180, damping: 18 })
  const mx = useTransform(px, (v) => `${v * 100}%`)
  const my = useTransform(py, (v) => `${v * 100}%`)
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx} ${my}, ${glow}, transparent 65%)`

  const onMove = (e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={active ? { rotateX: rx, rotateY: ry, transformPerspective: 1000, transformStyle: 'preserve-3d' } : undefined}
      className={`relative ${className}`}
      {...props}
    >
      {active && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
      )}
      {children}
    </motion.div>
  )
}
