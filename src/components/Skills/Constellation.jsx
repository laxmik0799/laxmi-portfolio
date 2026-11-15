import { useMemo } from 'react'
import { motion } from 'framer-motion'

const SIZE = 700
const C = SIZE / 2
const CAT_R = 185 // distance of category nodes from the centre
const TECH_D = 92 // distance of tech nodes from their category
const FAN = 0.44 // radians between sibling tech nodes

/**
 * SVG "technology constellation": centre → categories → technologies.
 * Layout is computed from the data, so new skills place themselves.
 */
export default function Constellation({ categories, activeCat, activeTech, onCat, onTech }) {
  const layout = useMemo(() => {
    return categories.map((cat, i) => {
      const a = (i / categories.length) * Math.PI * 2 - Math.PI / 2
      const cx = C + CAT_R * Math.cos(a)
      const cy = C + CAT_R * Math.sin(a)
      const n = cat.items.length
      const techs = cat.items.map((item, j) => {
        const step = n <= 2 ? 0.7 : FAN
        const ta = a + (j - (n - 1) / 2) * step
        const x = cx + TECH_D * Math.cos(ta)
        const y = cy + TECH_D * Math.sin(ta)
        const cos = Math.cos(ta)
        return {
          ...item,
          x,
          y,
          lx: x + Math.cos(ta) * 13,
          ly: y + Math.sin(ta) * 13 + 5,
          // Always anchor away from the node so near-vertical siblings diverge.
          anchor: cos >= 0 ? 'start' : 'end',
          dy: Math.abs(cos) < 0.35 ? Math.sign(Math.sin(ta)) * 4 : 0,
        }
      })
      return { ...cat, cx, cy, techs }
    })
  }, [categories])

  const dim = (catId) => activeCat && activeCat !== catId

  return (
    <svg viewBox={`-80 -20 ${SIZE + 160} ${SIZE + 40}`} className="h-auto w-full select-none" role="img" aria-label="Technology constellation">
      <defs>
        <radialGradient id="core-grad">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="60%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* orbit guides */}
      <circle cx={C} cy={C} r={CAT_R} fill="none" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 6" />
      <circle cx={C} cy={C} r={CAT_R + TECH_D} fill="none" stroke="rgba(255,255,255,0.03)" />

      {layout.map((cat, i) => (
        <g key={cat.id} opacity={dim(cat.id) ? 0.25 : 1} style={{ transition: 'opacity 0.4s' }}>
          <motion.line
            x1={C}
            y1={C}
            x2={cat.cx}
            y2={cat.cy}
            stroke={cat.color}
            strokeOpacity={activeCat === cat.id ? 0.9 : 0.35}
            strokeWidth={activeCat === cat.id ? 1.6 : 1}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 * i }}
          />
          {cat.techs.map((t) => (
            <line
              key={t.name}
              x1={cat.cx}
              y1={cat.cy}
              x2={t.x}
              y2={t.y}
              stroke={cat.color}
              strokeOpacity={activeTech === t.name ? 0.95 : 0.25}
              strokeWidth={activeTech === t.name ? 1.5 : 0.8}
            />
          ))}
        </g>
      ))}

      {layout.map((cat) => (
        <g key={`${cat.id}-nodes`} opacity={dim(cat.id) ? 0.3 : 1} style={{ transition: 'opacity 0.4s' }}>
          {cat.techs.map((t) => {
            const on = activeTech === t.name
            return (
              <g
                key={t.name}
                onMouseEnter={() => onTech(t.name, cat.id)}
                onMouseLeave={() => onTech(null, null)}
                style={{ cursor: 'pointer' }}
                data-cursor="hover"
              >
                <circle cx={t.x} cy={t.y} r={14} fill="transparent" />
                <circle cx={t.x} cy={t.y} r={on ? 6 : 4} fill={cat.color} filter={on ? 'url(#glow)' : undefined} style={{ transition: 'r 0.25s' }} />
                <text
                  x={t.lx}
                  y={t.ly + t.dy}
                  textAnchor={t.anchor}
                  fontSize={on ? 19 : 16.5}
                  fontFamily="Inter, sans-serif"
                  fill={on ? '#ffffff' : activeCat === cat.id ? '#cbd5e1' : '#7c8aa5'}
                  style={{ transition: 'fill 0.25s' }}
                >
                  {t.name}
                </text>
              </g>
            )
          })}
          <g onMouseEnter={() => onCat(cat.id)} onMouseLeave={() => onCat(null)} style={{ cursor: 'pointer' }} data-cursor="hover">
            <circle cx={cat.cx} cy={cat.cy} r={activeCat === cat.id ? 22 : 18} fill="#0b1024" stroke={cat.color} strokeWidth={1.5} style={{ transition: 'r 0.3s' }} filter={activeCat === cat.id ? 'url(#glow)' : undefined} />
            <circle cx={cat.cx} cy={cat.cy} r={5} fill={cat.color} />
          </g>
        </g>
      ))}

      {/* Core */}
      <circle cx={C} cy={C} r={52} fill="rgba(139,92,246,0.10)" />
      <circle cx={C} cy={C} r={38} fill="url(#core-grad)" filter="url(#glow)" />
      <text x={C} y={C + 7} textAnchor="middle" fontSize="20" fontWeight="600" fill="#fff" fontFamily="'Space Grotesk', sans-serif" letterSpacing="2">
        LK
      </text>
    </svg>
  )
}
