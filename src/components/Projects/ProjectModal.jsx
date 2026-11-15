import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X, Github, ExternalLink, Check, ChevronLeft, ChevronRight, Lightbulb, Target, ImageIcon, Star } from 'lucide-react'
import ProjectCover from './ProjectCover'
import { lockScroll, unlockScroll } from '../../utils/scroll'

function LinkButton({ href, icon: Icon, label }) {
  if (!href) {
    return (
      <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-white/15 px-4 py-2 text-sm text-slate-500" title={`${label} coming soon`}>
        <Icon size={15} aria-hidden /> {label} · coming soon
      </span>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white transition-colors hover:border-cyan-300/60 hover:bg-white/[0.1]"
    >
      <Icon size={15} aria-hidden /> {label}
    </a>
  )
}

/**
 * Accessible project detail dialog.
 * Esc closes, ←/→ switch projects, focus is moved in and restored on close.
 */
export default function ProjectModal({ project, onClose, onPrev, onNext, position }) {
  const closeRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement
    lockScroll()
    closeRef.current?.focus()
    return () => {
      unlockScroll()
      previouslyFocused?.focus?.()
    }
  }, [])

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 })
  }, [project.id])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
      // Basic focus trap
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll('a[href], button:not([disabled])')
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onNext, onPrev])

  const [from, to] = project.accent || ['#8b5cf6', '#22d3ee']

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-md" onClick={onClose} aria-hidden />

      <motion.div
        ref={panelRef}
        data-lenis-prevent
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong relative max-h-[92svh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-t-[28px] sm:rounded-[28px]"
        style={{ boxShadow: `0 40px 120px -40px ${from}` }}
      >
        {/* Header bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-white/5 bg-ink-850/85 px-5 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-1">
            <button type="button" onClick={onPrev} className="rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white" aria-label="Previous project">
              <ChevronLeft size={18} />
            </button>
            <span className="font-mono text-xs text-slate-500">{position}</span>
            <button type="button" onClick={onNext} className="rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-white" aria-label="Next project">
              <ChevronRight size={18} />
            </button>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} className="rounded-full border border-white/10 p-2 text-slate-300 hover:bg-white/10 hover:text-white" aria-label="Close project details">
            <X size={18} />
          </button>
        </div>

        <div className="group relative aspect-[16/7] w-full overflow-hidden">
          <ProjectCover project={project} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-850 via-transparent to-transparent" />
        </div>

        <div className="relative -mt-10 px-6 pb-10 sm:px-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip">{project.category}</span>
            {project.status === 'in-development' && (
              <span className="chip border-amber-300/30 text-amber-200">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" aria-hidden /> In Development
              </span>
            )}
            {project.status === 'live' && project.links?.live && (
              <span className="chip border-emerald-400/30 text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden /> Live
              </span>
            )}
            {project.featured && (
              <span className="chip border-amber-300/30 text-amber-200">
                <Star size={11} className="fill-amber-300 text-amber-300" aria-hidden /> Featured
              </span>
            )}
          </div>
          <h2 id="project-modal-title" className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            {project.title}
          </h2>
          <p className="mt-3 max-w-2xl text-slate-300">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href={project.links?.github} icon={Github} label="Source code" />
            <LinkButton href={project.links?.live} icon={ExternalLink} label="Live demo" />
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h3 className="eyebrow mb-3">Overview</h3>
              {project.overview.filter(Boolean).map((p, i) => (
                <p key={i} className="mb-4 leading-relaxed text-slate-400">
                  {p}
                </p>
              ))}
            </div>
            <div>
              <h3 className="eyebrow mb-3">Tech stack</h3>
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li key={t} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-slate-200">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {project.features?.filter(Boolean).length > 0 && (
            <div className="mt-10">
              <h3 className="eyebrow mb-4">Key features</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.features.filter(Boolean).map((f) => (
                  <li key={f} className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-sm text-slate-300">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: `${to}26`, color: to }}>
                      <Check size={12} aria-hidden />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.challenges?.length > 0 && (
            <div className="mt-10">
              <h3 className="eyebrow mb-4">Challenges & solutions</h3>
              <div className="space-y-3">
                {project.challenges.map((c, i) => (
                  <div key={i} className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-2">
                    <div className="bg-ink-850 p-5">
                      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-300/80">
                        <Target size={13} aria-hidden /> Challenge
                      </p>
                      <p className="text-sm text-slate-300">{c.challenge}</p>
                    </div>
                    <div className="bg-ink-850 p-5">
                      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300/80">
                        <Lightbulb size={13} aria-hidden /> Solution
                      </p>
                      <p className="text-sm text-slate-300">{c.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10">
            <h3 className="eyebrow mb-4">Screenshots</h3>
            {project.screenshots?.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {project.screenshots.map((s, i) => (
                  <figure key={i} className="overflow-hidden rounded-2xl border border-white/10">
                    <img src={s.src} alt={s.caption || `${project.title} screenshot ${i + 1}`} loading="lazy" className="w-full" />
                    {s.caption && <figcaption className="px-4 py-2 text-xs text-slate-500">{s.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-500">
                <ImageIcon size={18} aria-hidden /> Screenshots for this project are on their way.
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
