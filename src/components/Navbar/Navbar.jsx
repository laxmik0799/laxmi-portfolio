import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Menu, X, FileDown } from 'lucide-react'
import { site } from '../../config/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { scrollToId } from '../../utils/scroll'

export default function Navbar() {
  const ids = useMemo(() => site.nav.map((n) => n.id), [])
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    // Wait for the mobile menu to close before scrolling.
    setTimeout(() => scrollToId(id), open ? 220 : 0)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        aria-hidden
        className="absolute left-0 top-0 h-[2px] w-full origin-left bg-gradient-to-r from-violet-500 via-indigo-400 to-cyan-400"
        style={{ scaleX: progress }}
      />
      <nav
        aria-label="Primary"
        className={`container-x mt-3 flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-5 ${
          scrolled ? 'glass-strong shadow-[0_10px_40px_-15px_rgba(0,0,0,0.7)]' : 'border border-transparent'
        }`}
      >
        <a
          href="#home"
          onClick={(e) => go(e, 'home')}
          className="group flex items-center gap-2 font-display text-sm font-semibold tracking-[0.22em] text-white"
          aria-label={`${site.name} — back to top`}
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-lg border border-violet-400/40 bg-violet-500/10 text-[11px] text-violet-200 transition-colors group-hover:border-cyan-300/60">
            L
          </span>
          <span>
            {site.brand.split('.')[0]}
            <span className="text-cyan-300">.{site.brand.split('.')[1]}</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => go(e, item.id)}
                aria-current={active === item.id ? 'true' : undefined}
                className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors ${
                  active === item.id ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.06]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={site.resume.path}
            download={site.resume.downloadName}
            className="hidden items-center gap-1.5 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-[13px] font-medium text-violet-100 transition-colors hover:border-cyan-300/60 hover:text-white sm:inline-flex"
          >
            <FileDown size={14} aria-hidden /> Resume
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-200 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="container-x mt-2 md:hidden"
          >
            <ul className="space-y-1 rounded-2xl border border-white/10 bg-ink-900/95 p-3 shadow-2xl backdrop-blur-2xl">
              {site.nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => go(e, item.id)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base ${
                      active === item.id ? 'bg-white/[0.06] text-white' : 'text-slate-300'
                    }`}
                  >
                    {item.label}
                    <span className="font-mono text-xs text-slate-500">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
              <li>
                <a
                  href={site.resume.path}
                  download={site.resume.downloadName}
                  className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-sky-500 px-4 py-3 font-semibold text-white"
                >
                  <FileDown size={16} aria-hidden /> Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
