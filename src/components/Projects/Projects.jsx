import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { projects as rawProjects } from '../../data/projects'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'

// Featured first, otherwise keep the order from projects.js.
const projects = [...rawProjects].sort((a, b) => Number(b.featured) - Number(a.featured))

const getParam = () => new URLSearchParams(window.location.search).get('project')

function setParam(id) {
  const url = new URL(window.location.href)
  if (id) url.searchParams.set('project', id)
  else url.searchParams.delete('project')
  history.replaceState(null, '', url)
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [openId, setOpenId] = useState(() => {
    const id = getParam()
    return projects.some((p) => p.id === id) ? id : null
  })

  const categories = useMemo(() => ['All', ...new Set(projects.map((p) => p.category))], [])
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)
  const openIndex = projects.findIndex((p) => p.id === openId)

  const open = useCallback((id) => {
    setOpenId(id)
    setParam(id)
  }, [])
  const close = useCallback(() => {
    setOpenId(null)
    setParam(null)
  }, [])
  const step = useCallback(
    (dir) => {
      const next = projects[(openIndex + dir + projects.length) % projects.length]
      open(next.id)
    },
    [openIndex, open],
  )

  // Deep link: scroll to the section when arriving with ?project=…
  useEffect(() => {
    if (openId) document.getElementById('projects')?.scrollIntoView()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="container-x">
        <div className="flex flex-col">
          <SectionHeading
            index="03"
            eyebrow="Selected Work"
            title="Projects that solve real problems."
            lead="From banking platforms to data automation and AI systems. Open any project for the full story: architecture, features, and the problems solved along the way."
          />
          <Reveal className="-mt-4 mb-12">
            <LayoutGroup id="filters">
              <div className="glass inline-flex flex-wrap gap-1 rounded-2xl p-1.5" role="tablist" aria-label="Filter projects by category">
                {categories.map((c) => {
                  const count = c === 'All' ? projects.length : projects.filter((p) => p.category === c).length
                  const on = filter === c
                  return (
                    <button
                      key={c}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setFilter(c)}
                      className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-colors ${on ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      {on && (
                        <motion.span
                          layoutId="filter-pill"
                          className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-violet-600/70 to-sky-500/60"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                      {c}
                      <span className="ml-1.5 font-mono text-[11px] opacity-60">{count}</span>
                    </button>
                  )
                })}
              </div>
            </LayoutGroup>
          </Reveal>
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence>
            {visible.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onOpen={open} />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal className="mt-12 text-center">
          <p className="font-mono text-xs text-slate-500">
            <span className="text-cyan-400">$</span> more projects compiling…
          </p>
        </Reveal>
      </div>

      {/* Portal to <body> so the dialog sits above the navbar's stacking context */}
      {createPortal(
      <AnimatePresence>
        {openIndex >= 0 && (
          <ProjectModal
            key="project-modal"
            project={projects[openIndex]}
            position={`${String(openIndex + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`}
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
