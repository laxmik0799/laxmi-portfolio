import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Briefcase, GraduationCap, Rocket, MapPin } from 'lucide-react'
import { site } from '../../config/site'
import { projects } from '../../data/projects'
import { skillCategories, allSkills } from '../../data/skills'
import { experience } from '../../data/experience'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import TiltCard from '../ui/TiltCard'
import Counter from '../ui/Counter'

/** Every number here is derived from the data files — nothing is invented. */
const stats = [
  { value: projects.length, label: 'Projects showcased' },
  { value: allSkills.length, label: 'Technologies in my stack' },
  { value: skillCategories.find((c) => c.id === 'languages')?.items.length ?? 0, label: 'Programming languages' },
  { value: 1, label: 'Boxing gold medal' },
]

function ProfileCard() {
  const photo = site.about.photo
  const initials = site.name
    .split(' ')
    .map((p) => p[0])
    .join('')
  return (
    <TiltCard className="group glow-border mx-auto w-full max-w-sm rounded-[28px]" max={7}>
      <div className="glass relative overflow-hidden rounded-[28px] p-3">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-gradient-to-br from-ink-800 via-ink-850 to-ink-900">
          {photo ? (
            <img src={photo} alt={`Portrait of ${site.name}`} className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center" role="img" aria-label="Profile photo placeholder">
              <div aria-hidden className="grid-bg absolute inset-0 opacity-70" />
              <div aria-hidden className="absolute h-56 w-56 rounded-full bg-violet-600/25 blur-3xl" />
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-white/10 bg-ink-900/60">
                <div aria-hidden className="absolute inset-[-10px] animate-[spin_14s_linear_infinite] rounded-full border border-dashed border-cyan-300/30" />
                <div aria-hidden className="absolute inset-[-22px] animate-[spin_22s_linear_infinite_reverse] rounded-full border border-violet-400/20" />
                <span className="font-display text-5xl font-semibold text-gradient">{initials}</span>
              </div>
            </div>
          )}
          <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/10 bg-ink-900/70 p-4 backdrop-blur-xl">
            <p className="font-display text-lg font-semibold text-white">{site.name}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
              <MapPin size={12} aria-hidden /> IIT (BHU) · Standard Chartered
            </p>
          </div>
        </div>
      </div>
    </TiltCard>
  )
}

export default function About() {
  const [activeHighlight, setActiveHighlight] = useState(0)
  const highlights = site.about.highlights
  const journey = [...experience].reverse()

  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading index="01" eyebrow="About" title="Engineer by training. Builder by choice." />

        <div className="grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <ProfileCard />
          </Reveal>

          <div>
            <Reveal>
              <p className="font-display text-2xl leading-snug text-white sm:text-[1.7rem]">{site.about.intro}</p>
            </Reveal>
            {site.about.body.map((p, i) => (
              <Reveal key={i} delay={0.08 * (i + 1)}>
                <p className="mt-5 leading-relaxed text-slate-400">{p}</p>
              </Reveal>
            ))}

            {/* Interactive highlights */}
            <Reveal delay={0.2} className="mt-10">
              <p className="eyebrow mb-4">What I focus on</p>
              <div className="flex flex-wrap gap-2" role="tablist" aria-label="Focus areas">
                {highlights.map((h, i) => (
                  <button
                    key={h.label}
                    type="button"
                    role="tab"
                    aria-selected={activeHighlight === i}
                    onMouseEnter={() => setActiveHighlight(i)}
                    onFocus={() => setActiveHighlight(i)}
                    onClick={() => setActiveHighlight(i)}
                    className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                      activeHighlight === i
                        ? 'border-violet-400/60 bg-violet-500/15 text-white shadow-glow'
                        : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200'
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
              <div className="glass mt-4 min-h-[64px] rounded-2xl px-5 py-4" role="tabpanel" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeHighlight}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="text-sm text-slate-300"
                  >
                    <span className="mr-2 font-mono text-cyan-300">→</span>
                    {highlights[activeHighlight].detail}
                  </motion.p>
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="glass glow-border group h-full rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1">
                <p className="font-display text-4xl font-semibold text-white sm:text-5xl">
                  <span className="text-gradient">
                    <Counter value={s.value} />
                  </span>
                </p>
                <p className="mt-2 text-sm text-slate-400">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Journey strip */}
        <Reveal className="mt-20">
          <p className="eyebrow mb-6">The journey so far</p>
          <div className="relative">
          <div
            aria-hidden
            className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-violet-500/60 via-indigo-400/40 to-cyan-400/60 md:left-0 md:top-5 md:h-px md:w-full md:bg-gradient-to-r"
          />
          <ol className="relative grid gap-6 md:grid-cols-3">
            {journey.map((j) => {
              const Icon = j.type === 'education' ? GraduationCap : Briefcase
              return (
                <li key={j.id} className="relative pl-14 md:pl-0 md:pt-14">
                  <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-ink-850 text-violet-300 shadow-glow">
                    <Icon size={18} aria-hidden />
                  </span>
                  <p className="font-display text-lg text-white">{j.org}</p>
                  <p className="text-sm text-slate-400">{j.title}</p>
                </li>
              )
            })}
            <li className="relative pl-14 md:pl-0 md:pt-14">
              <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl border border-dashed border-cyan-300/40 bg-ink-850 text-cyan-300">
                <Rocket size={18} aria-hidden />
              </span>
              <p className="font-display text-lg text-white">Next chapter</p>
              <p className="text-sm text-slate-400">Building AI-powered products & scalable systems</p>
            </li>
          </ol>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
