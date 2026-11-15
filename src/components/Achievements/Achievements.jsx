import { achievements } from '../../data/achievements'
import { getIcon } from '../../utils/icons'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import TiltCard from '../ui/TiltCard'

function HighlightCard({ a }) {
  const Icon = getIcon(a.icon)
  return (
    <TiltCard className="group glow-border h-full rounded-[28px]" max={5} glow="rgba(251,191,36,0.12)">
      <article className="glass relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] p-8 sm:p-10">
        <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl transition-opacity duration-700 group-hover:opacity-150" />
        <div aria-hidden className="absolute -bottom-6 right-4 select-none font-display text-[9rem] font-bold leading-none text-white/[0.03] sm:text-[12rem]">
          GOLD
        </div>
        <div className="relative">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-300/30 bg-gradient-to-br from-amber-300/25 to-amber-600/10 text-amber-200 shadow-[0_0_50px_-10px_rgba(251,191,36,0.6)] transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-110">
            <Icon size={28} aria-hidden />
          </span>
          <p className="eyebrow mt-8 text-amber-200/80">{a.kicker}</p>
          <h3 className="mt-3 font-display text-4xl font-semibold text-white sm:text-5xl">{a.title}</h3>
        </div>
        <p className="relative mt-8 max-w-md leading-relaxed text-slate-400">{a.description}</p>
      </article>
    </TiltCard>
  )
}

function Card({ a, i }) {
  const Icon = getIcon(a.icon)
  return (
    <article className="glass glow-border group relative h-full overflow-hidden rounded-[24px] p-7 transition-transform duration-500 hover:-translate-y-1">
      <span aria-hidden className="absolute right-6 top-5 font-mono text-xs text-slate-600">0{i + 1}</span>
      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-violet-500/10 text-violet-200 transition-colors duration-500 group-hover:border-cyan-300/40 group-hover:text-cyan-200">
        <Icon size={22} aria-hidden />
      </span>
      <p className="eyebrow mt-6">{a.kicker}</p>
      <h3 className="mt-2 font-display text-2xl font-semibold text-white">{a.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">{a.description}</p>
    </article>
  )
}

export default function Achievements() {
  const highlight = achievements.find((a) => a.highlight)
  const rest = achievements.filter((a) => a !== highlight)

  return (
    <section id="achievements" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading
          index="06"
          eyebrow="Beyond Code"
          title="Discipline in the ring. Curiosity at the keyboard."
          lead="The person behind the pull requests: what keeps me sharp, focused and hungry to build."
        />
        <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          {highlight && (
            <Reveal className="h-full">
              <HighlightCard a={highlight} />
            </Reveal>
          )}
          <div className="grid gap-5">
            {rest.map((a, i) => (
              <Reveal key={a.id} delay={0.1 * (i + 1)} className="h-full">
                <Card a={a} i={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
