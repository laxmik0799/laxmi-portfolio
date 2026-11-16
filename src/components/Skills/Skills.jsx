import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skillCategories, allSkills, exploring } from '../../data/skills'
import { getIcon } from '../../utils/icons'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Constellation from './Constellation'

export default function Skills() {
  const [activeCat, setActiveCat] = useState(null)
  const [activeTech, setActiveTech] = useState(null)

  const tech = activeTech ? allSkills.find((s) => s.name === activeTech) : null
  const cat = skillCategories.find((c) => c.id === (tech?.categoryId || activeCat))

  const onTech = (name, catId) => {
    setActiveTech(name)
    setActiveCat(catId)
  }

  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[140px]" />
      <div className="container-x relative">
        <SectionHeading
          index="02"
          eyebrow="Tech Stack"
          title="A constellation of tools I build with."
          lead="Hover a node or a card to explore how each piece fits. From the language layer to the AI layer, these are the tools I reach for to ship real products."
        />

        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_1fr]">
          {/* Constellation + live detail */}
          <Reveal className="lg:sticky lg:top-24">
            <div className="glass glow-border relative hidden rounded-[28px] p-4 sm:block">
              <Constellation
                categories={skillCategories}
                activeCat={activeCat}
                activeTech={activeTech}
                onCat={(id) => {
                  setActiveCat(id)
                  setActiveTech(null)
                }}
                onTech={onTech}
              />
              <div className="mt-2 min-h-[68px] rounded-2xl border border-white/10 bg-ink-900/80 px-5 py-3.5 backdrop-blur-xl" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTech || activeCat || 'idle'}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tech ? (
                      <>
                        <p className="text-sm font-semibold text-white">
                          {tech.name} <span className="ml-2 font-mono text-[11px] font-normal" style={{ color: cat?.color }}>{cat?.title}</span>
                        </p>
                        <p className="mt-0.5 text-sm text-slate-400">{tech.note}</p>
                      </>
                    ) : cat ? (
                      <>
                        <p className="text-sm font-semibold text-white">{cat.title}</p>
                        <p className="mt-0.5 text-sm text-slate-400">{cat.items.map((i) => i.name).join(' · ')}</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-white">{allSkills.length} technologies · {skillCategories.length} domains</p>
                        <p className="mt-0.5 text-sm text-slate-400">Hover any node to see how I use it.</p>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          {/* Category cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {skillCategories.map((c, i) => {
              const Icon = getIcon(c.icon)
              const on = activeCat === c.id
              return (
                <Reveal key={c.id} delay={(i % 2) * 0.08}>
                  <div
                    onMouseEnter={() => {
                      setActiveCat(c.id)
                      setActiveTech(null)
                    }}
                    onMouseLeave={() => {
                      setActiveCat(null)
                      setActiveTech(null)
                    }}
                    className={`glass glow-border group h-full rounded-2xl p-5 transition-all duration-500 ${on ? '-translate-y-1 bg-white/[0.06]' : ''}`}
                    style={on ? { boxShadow: `0 20px 50px -25px ${c.color}` } : undefined}
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10"
                        style={{ background: `${c.color}1f`, color: c.color }}
                      >
                        <Icon size={18} aria-hidden />
                      </span>
                      <h3 className="font-display text-base font-semibold text-white">{c.title}</h3>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {c.items.map((item) => {
                        const t = activeTech === item.name
                        return (
                          <li key={item.name}>
                            <button
                              type="button"
                              title={item.note}
                              onMouseEnter={() => onTech(item.name, c.id)}
                              onFocus={() => onTech(item.name, c.id)}
                              onClick={() => onTech(item.name, c.id)}
                              className={`rounded-lg border px-2.5 py-1 text-[13px] transition-all duration-300 ${
                                t ? 'scale-105 text-white' : 'border-white/10 bg-white/[0.03] text-slate-300 hover:text-white'
                              }`}
                              style={t ? { borderColor: c.color, background: `${c.color}26`, boxShadow: `0 0 18px -4px ${c.color}` } : undefined}
                            >
                              {item.name}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                    {/* Mobile-only: show the note for the tapped tech */}
                    {tech && tech.categoryId === c.id && (
                      <p className="mt-3 text-xs leading-relaxed text-slate-400 sm:hidden">{tech.note}</p>
                    )}
                  </div>
                </Reveal>
              )
            })}
            <Reveal className="sm:col-span-2">
              <div className="rounded-2xl border border-dashed border-white/15 px-5 py-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">Exploring in personal projects</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Used in my Frontend Lab builds rather than at work: <span className="text-slate-200">{exploring.join(' · ')}</span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
