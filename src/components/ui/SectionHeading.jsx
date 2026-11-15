import Reveal, { RevealText } from './Reveal'

/** Consistent section header: numbered eyebrow, animated title, optional lead. */
export default function SectionHeading({ index, eyebrow, title, lead, align = 'left' }) {
  const center = align === 'center'
  return (
    <div className={`mb-14 max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <Reveal>
        <p className={`eyebrow mb-4 flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
          <span className="text-violet-400">{index}</span>
          <span className="h-px w-8 bg-gradient-to-r from-violet-500 to-cyan-400" />
          {eyebrow}
        </p>
      </Reveal>
      <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
        <RevealText text={title} />
      </h2>
      {lead && (
        <Reveal delay={0.15}>
          <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
