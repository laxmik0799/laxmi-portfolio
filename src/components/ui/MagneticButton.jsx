import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer, usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const variants = {
  primary:
    'text-white bg-gradient-to-r from-violet-600 via-indigo-500 to-sky-500 shadow-glow hover:shadow-[0_0_60px_-10px_rgba(139,92,246,0.8)]',
  ghost: 'text-slate-100 glass hover:bg-white/[0.08] hover:border-white/20',
  subtle: 'text-slate-200 border border-white/10 bg-transparent hover:border-cyan-300/50 hover:text-white',
}

/**
 * A button/link that is gently pulled toward the cursor.
 * Renders <a> when `href` is given, otherwise <button>.
 * Magnetism is disabled on touch devices and for reduced-motion users.
 */
export default function MagneticButton({
  href,
  children,
  variant = 'primary',
  className = '',
  strength = 0.35,
  icon: Icon,
  ...props
}) {
  const ref = useRef(null)
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const active = fine && !reduced

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 15, mass: 0.4 })

  const onMove = (e) => {
    if (!active || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const Comp = href ? motion.a : motion.button
  return (
    <Comp
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      data-cursor="hover"
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-[box-shadow,background-color,border-color,color] duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...(href ? {} : { type: props.type || 'button' })}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {Icon && <Icon size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />}
      </span>
    </Comp>
  )
}
