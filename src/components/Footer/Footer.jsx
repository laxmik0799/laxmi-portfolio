import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { site } from '../../config/site'
import { scrollToId } from '../../utils/scroll'

export default function Footer() {
  const year = new Date().getFullYear()
  const socials = [
    { icon: Github, href: site.links.github, label: 'GitHub', external: true },
    { icon: Linkedin, href: site.links.linkedin, label: 'LinkedIn', external: true },
    { icon: Mail, href: `mailto:${site.links.email}`, label: 'Email', external: false },
  ]

  return (
    <footer className="relative border-t border-white/[0.06] py-14">
      <div className="container-x">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-3xl font-semibold tracking-[0.18em] text-white sm:text-4xl">
              {site.brand.split('.')[0]}
              <span className="text-gradient">.{site.brand.split('.')[1]}</span>
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-slate-500">{site.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
              {site.nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToId(n.id)
                    }}
                    className="transition-colors hover:text-white"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">
            © {year} {site.name}. Designed & engineered with care.
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, href, label, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-violet-400/50 hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
            <button
              type="button"
              onClick={() => scrollToId('home')}
              aria-label="Back to top"
              className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-sky-500 text-white transition-transform hover:-translate-y-0.5"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
