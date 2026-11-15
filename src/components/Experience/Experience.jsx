import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Briefcase, GraduationCap, MapPin } from 'lucide-react'
import { experience } from '../../data/experience'
import SectionHeading from '../ui/SectionHeading'

function TimelineItem({ item, index }) {
  const Icon = item.type === 'education' ? GraduationCap : Briefcase
  const right = index % 2 === 1
  return (
    <li className={`relative grid md:grid-cols-2 md:gap-16 ${right ? '' : ''}`}>
      {/* Node on the line */}
      <span className="absolute left-5 top-6 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-violet-400/50 bg-ink-900 text-violet-200 shadow-glow md:left-1/2">
        <Icon size={17} aria-hidden />
      </span>

      <motion.article
        initial={{ opacity: 0, x: right ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`glass glow-border group ml-14 rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-7 md:ml-0 ${
          right ? 'md:col-start-2' : 'md:col-start-1 md:text-right'
        }`}
      >
        <div className={`flex flex-wrap items-center gap-2 ${right ? '' : 'md:justify-end'}`}>
          <span className="chip font-mono uppercase tracking-wider">{item.type === 'education' ? 'Education' : 'Experience'}</span>
          {item.status && (
            <span className="chip border-emerald-400/30 text-emerald-300">
              {item.status === 'Current' && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />}
              {item.status}
            </span>
          )}
          {item.period && <span className="font-mono text-xs text-slate-500">{item.period}</span>}
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold text-white">{item.title}</h3>
        <p className="mt-1 text-gradient font-medium">{item.org}</p>
        {item.location && (
          <p className={`mt-1 flex items-center gap-1.5 text-xs text-slate-500 ${right ? '' : 'md:justify-end'}`}>
            <MapPin size={12} aria-hidden /> {item.location}
          </p>
        )}
        {item.summary && <p className="mt-4 text-sm leading-relaxed text-slate-400">{item.summary}</p>}
        {item.points?.length > 0 && (
          <ul className={`mt-4 space-y-2 text-sm text-slate-400 ${right ? '' : 'md:text-right'}`}>
            {item.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
        {item.tags?.length > 0 && (
          <ul className={`mt-5 flex flex-wrap gap-1.5 ${right ? '' : 'md:justify-end'}`}>
            {item.tags.map((t) => (
              <li key={t} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-slate-400">
                {t}
              </li>
            ))}
          </ul>
        )}
      </motion.article>
    </li>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 25 })

  return (
    <section id="experience" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading index="05" eyebrow="Journey" title="Where I've learned and where I build." align="center" />

        <div ref={ref} className="relative mx-auto max-w-5xl">
          {/* Track + scroll-driven glowing fill */}
          <div aria-hidden className="absolute bottom-0 left-5 top-0 w-px bg-white/10 md:left-1/2" />
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-5 top-0 w-px origin-top bg-gradient-to-b from-violet-400 via-indigo-400 to-cyan-300 shadow-[0_0_12px_rgba(139,92,246,0.8)] md:left-1/2"
            style={{ scaleY: fill }}
          />
          <ol className="space-y-12">
            {experience.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
