import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { site } from '../../config/site'
import MagneticButton from '../ui/MagneticButton'
import { scrollToId } from '../../utils/scroll'
import { useIsMobile, usePrefersReducedMotion } from '../../hooks/useMediaQuery'

const HeroScene = lazy(() => import('./HeroScene'))

/** Static glowing orb shown while three.js loads (and if WebGL is unavailable). */
function SceneFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center" aria-hidden>
      <div className="h-56 w-56 rounded-full bg-gradient-to-br from-violet-600/50 via-indigo-500/30 to-cyan-400/30 blur-2xl" />
    </div>
  )
}

const hasWebGL = () => {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch {
    return false
  }
}

const ease = [0.22, 1, 0.36, 1]

export default function Hero({ ready }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()
  const mobile = useIsMobile()
  const [inView, setInView] = useState(true)
  const [webgl, setWebgl] = useState(true)

  useEffect(() => setWebgl(hasWebGL()), [])

  // Stop rendering the 3D scene once the hero leaves the screen.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Parallax: content drifts up and fades as you scroll away.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -120])
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const show = ready ? 'show' : 'hidden'
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.1 + i * 0.1, ease } }),
  }

  const [firstName, ...lastName] = site.name.split(' ')

  return (
    <section id="home" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      {/* Background atmosphere */}
      <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[620px] w-[620px] rounded-full bg-violet-600/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-[120px]"
      />

      {/* 3D centerpiece */}
      <motion.div
        style={{ y: sceneY }}
        className="pointer-events-none absolute inset-0 opacity-50 md:pointer-events-auto md:left-[42%] md:opacity-100"
      >
        <motion.div
          className="h-full w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={ready ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.4, ease }}
        >
          {webgl ? (
            <Suspense fallback={<SceneFallback />}>
              <HeroScene reduced={reduced} mobile={mobile} active={inView} />
            </Suspense>
          ) : (
            <SceneFallback />
          )}
        </motion.div>
      </motion.div>

      <motion.div style={{ y: contentY, opacity: fade }} className="container-x relative z-10">
        <div className="max-w-2xl">
          <motion.div variants={item} initial="hidden" animate={show} custom={0}>
            <span className="glass inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-300">
              <span className="relative flex h-2 w-2">
                {site.status.available && (
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
                )}
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${site.status.available ? 'bg-emerald-400' : 'bg-slate-500'}`}
                />
              </span>
              {site.status.label}
            </span>
          </motion.div>

          <motion.p variants={item} initial="hidden" animate={show} custom={1} className="eyebrow mt-8">
            {site.brand} — {site.tagline}
          </motion.p>

          <h1 className="mt-4 font-display text-[clamp(3.2rem,10vw,7rem)] font-semibold uppercase leading-[0.92] tracking-tight text-white">
            <motion.span variants={item} initial="hidden" animate={show} custom={2} className="block">
              {firstName}
            </motion.span>
            <motion.span
              variants={item}
              initial="hidden"
              animate={show}
              custom={3}
              className="text-gradient block animate-shimmer pb-2"
            >
              {lastName.join(' ')}
            </motion.span>
          </h1>

          <motion.p
            variants={item}
            initial="hidden"
            animate={show}
            custom={4}
            className="mt-6 max-w-xl font-display text-[clamp(1.35rem,3vw,2rem)] font-medium leading-snug text-slate-100"
          >
            {site.heroHeadline[0]} <span className="text-slate-400">{site.heroHeadline[1]}</span>
          </motion.p>

          <motion.ul
            variants={item}
            initial="hidden"
            animate={show}
            custom={5}
            className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[13px] text-slate-400"
            aria-label="Professional identity"
          >
            {site.roles.map((r, i) => (
              <li key={r} className="flex items-center gap-3">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-violet-400/70" aria-hidden />}
                <span className={i === 0 ? 'text-cyan-200' : ''}>{r}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            variants={item}
            initial="hidden"
            animate={show}
            custom={6}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#projects"
              icon={ArrowRight}
              onClick={(e) => {
                e.preventDefault()
                scrollToId('projects')
              }}
            >
              Explore My Work
            </MagneticButton>
            <MagneticButton
              href="#contact"
              variant="ghost"
              icon={Sparkles}
              onClick={(e) => {
                e.preventDefault()
                scrollToId('contact')
              }}
            >
              Let&apos;s Connect
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          scrollToId('about')
        }}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-slate-500 transition-colors hover:text-slate-300 sm:flex"
        aria-label="Scroll to About section"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border border-white/20 pt-2">
          <span className="h-1.5 w-1 animate-scroll-dot rounded-full bg-cyan-300" />
        </span>
        Scroll
      </motion.a>
    </section>
  )
}
