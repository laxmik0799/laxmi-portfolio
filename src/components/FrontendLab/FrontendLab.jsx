import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react'
import { labProjects, LAB_CATEGORIES } from '../../data/labProjects'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import TiltCard from '../ui/TiltCard'
import ProjectCover from '../Projects/ProjectCover'
import ProjectModal from '../Projects/ProjectModal'

/** A project is only "live" with a real deployment URL — never a placeholder. */
const isLive = (p) => p.status === 'live' && Boolean(p.links?.live)

const sorted = [...labProjects].sort((a, b) => Number(isLive(b)) - Number(isLive(a)) || Number(b.featured) - Number(a.featured))

function StatusBadge({ project }) {
  return isLive(project) ? (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-200 backdrop-blur-md">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden /> Live
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-[11px] font-medium text-amber-200 backdrop-blur-md">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-300" aria-hidden /> In Development
    </span>
  )
}

function LabCard({ project, index, onOpen }) {
  const [from, to] = project.accent
  const live = isLive(project)
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="list-none"
    >
      <TiltCard className="group glow-border h-full rounded-[24px]" max={8} glow={`${from}33`}>
        <article className="glass flex h-full flex-col overflow-hidden rounded-[24px]">
          <button type="button" onClick={() => onOpen(project.id)} className="relative block aspect-[16/10] w-full overflow-hidden text-left" aria-label={`Open details for ${project.title}`}>
            <ProjectCover project={project} className="transition-transform duration-700 group-hover:scale-[1.04]" />
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/15 bg-ink-900/70 px-3 py-1 text-[11px] font-medium text-slate-200 backdrop-blur-md">{project.category}</span>
              <StatusBadge project={project} />
            </div>
          </button>
          <div className="flex flex-1 flex-col p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: to }}>
              {project.tagline}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-white">{project.title}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">{project.description}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
              {project.tech.slice(0, 4).map((t) => (
                <li key={t} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-slate-400">
                  {t}
                </li>
              ))}
              {project.tech.length > 4 && <li className="px-1 py-0.5 font-mono text-[11px] text-slate-500">+{project.tech.length - 4}</li>}
            </ul>
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
              {live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-sky-500 px-3.5 py-1.5 text-xs font-semibold text-white">
                  <ExternalLink size={13} aria-hidden /> Live demo
                </a>
              )}
              {project.links?.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-white/40 hover:text-white">
                  <Github size={13} aria-hidden /> Code
                </a>
              )}
              <button type="button" onClick={() => onOpen(project.id)} className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors hover:text-white">
                Details <ArrowUpRight size={14} aria-hidden />
              </button>
            </div>
          </div>
        </article>
      </TiltCard>
    </motion.li>
  )
}

const getParam = () => new URLSearchParams(window.location.search).get('lab')
const setParam = (id) => {
  const url = new URL(window.location.href)
  if (id) url.searchParams.set('lab', id)
  else url.searchParams.delete('lab')
  history.replaceState(null, '', url)
}

export default function FrontendLab() {
  const [filter, setFilter] = useState('All')
  const [openId, setOpenId] = useState(() => (sorted.some((p) => p.id === getParam()) ? getParam() : null))
  const counts = useMemo(() => Object.fromEntries(LAB_CATEGORIES.map((c) => [c, sorted.filter((p) => p.category === c).length])), [])
  const visible = filter === 'All' ? sorted : sorted.filter((p) => p.category === filter)
  const openIndex = sorted.findIndex((p) => p.id === openId)
  const liveCount = sorted.filter(isLive).length

  const open = useCallback((id) => {
    setOpenId(id)
    setParam(id)
  }, [])
  const close = useCallback(() => {
    setOpenId(null)
    setParam(null)
  }, [])
  const step = (dir) => open(sorted[(openIndex + dir + sorted.length) % sorted.length].id)

  useEffect(() => {
    if (openId) document.getElementById('lab')?.scrollIntoView()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id="lab" className="relative py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/4 h-[480px] w-[640px] rounded-full bg-fuchsia-600/10 blur-[140px]" />
      <div className="container-x relative">
        <SectionHeading
          index="04"
          eyebrow="Frontend Lab"
          title="Design-driven builds and creative experiments."
          lead="Standalone frontend projects where I push interaction, motion and 3D. Each one is an independent app with its own repository."
        />

        <Reveal className="-mt-4 mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <LayoutGroup id="lab-filters">
            <div className="glass inline-flex flex-wrap gap-1 rounded-2xl p-1.5" role="tablist" aria-label="Filter lab projects by category">
              {['All', ...LAB_CATEGORIES].map((c) => {
                const count = c === 'All' ? sorted.length : counts[c]
                const on = filter === c
                return (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    disabled={count === 0}
                    onClick={() => setFilter(c)}
                    className={`relative rounded-xl px-3.5 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${on ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    {on && <motion.span layoutId="lab-pill" className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-fuchsia-600/60 to-violet-600/60" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                    {c}
                    <span className="ml-1.5 font-mono text-[11px] opacity-60">{count}</span>
                  </button>
                )
              })}
            </div>
          </LayoutGroup>
          <p className="font-mono text-xs text-slate-500">
            <span className="text-emerald-300">{liveCount}</span> live · <span className="text-amber-200">{sorted.length - liveCount}</span> in development
          </p>
        </Reveal>

        <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {visible.map((p, i) => (
              <LabCard key={p.id} project={p} index={i} onOpen={open} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      {createPortal(
        <AnimatePresence>
          {openIndex >= 0 && (
            <ProjectModal
              key="lab-modal"
              project={sorted[openIndex]}
              position={`${String(openIndex + 1).padStart(2, '0')} / ${String(sorted.length).padStart(2, '0')}`}
              onClose={close}
              onPrev={() => step(-1)}
              onNext={() => step(1)}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  )
}
