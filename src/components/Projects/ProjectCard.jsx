import { motion } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'
import TiltCard from '../ui/TiltCard'
import ProjectCover from './ProjectCover'

export default function ProjectCard({ project, onOpen, index }) {
  const [from, to] = project.accent || ['#8b5cf6', '#22d3ee']
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard className="group glow-border h-full rounded-[26px]" max={6} glow={`${from}2e`}>
        <button
          type="button"
          onClick={() => onOpen(project.id)}
          className="glass flex h-full w-full flex-col overflow-hidden rounded-[26px] text-left transition-colors duration-500 hover:bg-white/[0.05]"
          aria-label={`Open details for ${project.title}`}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <ProjectCover project={project} className="transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute left-4 top-4 flex gap-2">
              <span className="rounded-full border border-white/15 bg-ink-900/70 px-3 py-1 text-[11px] font-medium text-slate-200 backdrop-blur-md">
                {project.category}
              </span>
              {project.featured && (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-[11px] font-medium text-amber-200 backdrop-blur-md">
                  <Star size={11} className="fill-amber-300 text-amber-300" aria-hidden /> Featured
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: to }}>
                  {project.tagline}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-white">{project.title}</h3>
              </div>
              <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-all duration-500 group-hover:rotate-45 group-hover:border-white/30 group-hover:bg-white group-hover:text-ink-900">
                <ArrowUpRight size={18} aria-hidden />
              </span>
            </div>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">{project.description}</p>
            <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Tech stack">
              {project.tech.slice(0, 5).map((t) => (
                <li key={t} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-slate-400">
                  {t}
                </li>
              ))}
              {project.tech.length > 5 && (
                <li className="rounded-md px-2 py-0.5 font-mono text-[11px] text-slate-500">+{project.tech.length - 5}</li>
              )}
            </ul>
          </div>
        </button>
      </TiltCard>
    </motion.div>
  )
}
