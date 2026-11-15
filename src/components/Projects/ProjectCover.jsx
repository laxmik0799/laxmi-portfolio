import { getIcon } from '../../utils/icons'

/** Simple deterministic hash so each project gets a stable, unique layout. */
const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7)

/**
 * Generated cover art used when a project has no `cover` image.
 * A stylised app window with abstract UI blocks in the project's accent colours.
 */
export default function ProjectCover({ project, className = '' }) {
  if (project.cover) {
    return (
      <img
        src={project.cover}
        alt={`${project.title} cover`}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    )
  }

  const [from, to] = project.accent || ['#8b5cf6', '#22d3ee']
  const Icon = getIcon(project.icon)
  const h = hash(project.id)
  const bars = Array.from({ length: 7 }, (_, i) => 30 + ((h >>> (i * 3)) % 60))

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: `radial-gradient(120% 90% at 0% 0%, ${from}55, transparent 55%), radial-gradient(100% 80% at 100% 100%, ${to}45, transparent 55%), #070a18` }}
      role="img"
      aria-label={`${project.title} cover illustration`}
    >
      <div aria-hidden className="grid-bg absolute inset-0 opacity-60" />

      {/* App window */}
      <div aria-hidden className="absolute inset-x-[9%] bottom-0 top-[14%] rounded-t-2xl border border-white/10 bg-ink-900/70 shadow-2xl backdrop-blur-sm transition-transform duration-700 group-hover:-translate-y-2">
        <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="ml-3 truncate font-mono text-[10px] text-slate-500">{project.id}.app</span>
        </div>
        <div className="grid grid-cols-[28%_1fr] gap-3 p-4">
          <div className="space-y-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-2 rounded-full" style={{ width: `${55 + ((h >>> i) % 40)}%`, background: i === 1 ? `${from}aa` : 'rgba(255,255,255,0.08)' }} />
            ))}
          </div>
          <div>
            <div className="mb-3 grid grid-cols-3 gap-2">
              {[from, to, 'rgba(255,255,255,0.12)'].map((c, i) => (
                <div key={i} className="h-8 rounded-lg border border-white/5" style={{ background: `linear-gradient(135deg, ${c}40, transparent)` }} />
              ))}
            </div>
            <div className="flex h-20 items-end gap-1.5 rounded-lg border border-white/5 bg-white/[0.02] p-2">
              {bars.map((b, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${b}%`, background: `linear-gradient(to top, ${from}cc, ${to}88)` }} />
              ))}
            </div>
            <div className="mt-3 space-y-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-2 rounded-md border border-white/5 bg-white/[0.02] px-2 py-1.5">
                  <span className="h-3 w-3 rounded-full" style={{ background: i === 0 ? from : i === 1 ? to : 'rgba(255,255,255,0.15)' }} />
                  <span className="h-1.5 rounded-full bg-white/10" style={{ width: `${35 + ((h >>> (i * 5)) % 45)}%` }} />
                  <span className="ml-auto h-1.5 w-8 rounded-full bg-white/[0.07]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Icon badge */}
      <div
        aria-hidden
        className="absolute right-[6%] top-[7%] flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 backdrop-blur-md transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110"
        style={{ background: `linear-gradient(135deg, ${from}66, ${to}44)`, boxShadow: `0 10px 40px -10px ${from}` }}
      >
        <Icon size={24} className="text-white" />
      </div>
    </div>
  )
}
