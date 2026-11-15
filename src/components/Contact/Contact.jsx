import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Linkedin, Github, FileDown, Send, Copy, Check, ArrowUpRight, Loader2, CircleAlert } from 'lucide-react'
import { site } from '../../config/site'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import MagneticButton from '../ui/MagneticButton'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please tell me your name.'
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (v.message.trim().length < 10) e.message = 'A little more detail, please (10+ characters).'
  return e
}

const mailtoHref = (subject = '', body = '') =>
  `mailto:${site.links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

function Field({ id, label, error, textarea, ...props }) {
  const Comp = textarea ? 'textarea' : 'input'
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
        {label}
      </label>
      <Comp
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-ink-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-600 transition-all duration-300 focus:bg-ink-900 focus:outline-none focus:ring-2 ${
          error ? 'border-rose-400/60 focus:ring-rose-400/30' : 'border-white/10 focus:border-violet-400/60 focus:ring-violet-500/25'
        } ${textarea ? 'min-h-[140px] resize-y' : ''}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-xs text-rose-300">
          <CircleAlert size={12} aria-hidden /> {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '', _gotcha: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [copied, setCopied] = useState(false)

  const update = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.links.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = mailtoHref()
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (values._gotcha) return // bot trap
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) return

    // No Formspree ID yet → open the visitor's email app, pre-filled.
    if (!site.formspreeId) {
      window.location.href = mailtoHref(
        `Portfolio enquiry from ${values.name}`,
        `${values.message}\n\n— ${values.name} (${values.email})`,
      )
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: values.name, email: values.email, message: values.message }),
      })
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`)
      setStatus('sent')
      setValues({ name: '', email: '', message: '', _gotcha: '' })
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const channels = [
    { icon: Linkedin, label: 'LinkedIn', value: 'Connect professionally', href: site.links.linkedin },
    { icon: Github, label: 'GitHub', value: 'Browse my code', href: site.links.github },
  ]

  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-36">
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-[520px] w-[900px] -translate-x-1/2 translate-y-1/3 rounded-full bg-violet-700/20 blur-[140px]" />
      <div className="container-x relative">
        <SectionHeading
          index="07"
          eyebrow="Contact"
          title="Let's build something meaningful."
          lead="Whether it's a role, a freelance project or an idea worth exploring, my inbox is open. I usually reply within a couple of days."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          {/* Channels */}
          <Reveal className="min-w-0 space-y-4">
            <div className="glass glow-border group rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-400/20 text-white">
                  <Mail size={20} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wider text-slate-500">Email</p>
                  <a href={mailtoHref()} className="mt-1 block truncate font-display text-lg text-white hover:text-cyan-200">
                    {site.links.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="rounded-lg border border-white/10 p-2 text-slate-400 transition-colors hover:border-white/25 hover:text-white"
                  aria-label={copied ? 'Email copied' : 'Copy email address'}
                >
                  {copied ? <Check size={16} className="text-emerald-300" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {channels.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glow-border group flex items-center gap-4 rounded-2xl p-5 transition-transform duration-500 hover:-translate-y-1"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition-colors group-hover:text-cyan-200">
                    <Icon size={19} aria-hidden />
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium text-white">{label}</span>
                    <span className="block text-xs text-slate-500">{value}</span>
                  </span>
                  <ArrowUpRight size={16} className="text-slate-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" aria-hidden />
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <MagneticButton href={site.resume.path} download={site.resume.downloadName} icon={FileDown}>
                Download Resume
              </MagneticButton>
              <MagneticButton href={mailtoHref('Hello Laxmi!')} variant="ghost" icon={Mail}>
                Contact Me
              </MagneticButton>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="min-w-0">
            <form onSubmit={onSubmit} noValidate className="glass glow-border relative rounded-[26px] p-6 sm:p-8" aria-label="Contact form">
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[380px] flex-col items-center justify-center text-center"
                    role="status"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300 shadow-[0_0_50px_-10px_rgba(52,211,153,0.7)]">
                      <Check size={28} aria-hidden />
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                      {site.formspreeId ? 'Message sent!' : 'Almost there!'}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-slate-400">
                      {site.formspreeId
                        ? "Thanks for reaching out. I'll get back to you soon."
                        : 'Your email app should have opened with the message ready to send.'}
                    </p>
                    <button type="button" onClick={() => setStatus('idle')} className="mt-6 text-sm text-cyan-300 underline-offset-4 hover:underline">
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="name" label="Name" placeholder="Your name" autoComplete="name" value={values.name} onChange={update} error={errors.name} />
                      <Field id="email" label="Email" type="email" placeholder="you@company.com" autoComplete="email" value={values.email} onChange={update} error={errors.email} />
                    </div>
                    <Field id="message" label="Message" textarea placeholder="Tell me about your project, role or idea…" value={values.message} onChange={update} error={errors.message} />
                    {/* Honeypot (hidden from humans) */}
                    <input type="text" name="_gotcha" value={values._gotcha} onChange={update} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

                    {status === 'error' && (
                      <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200" role="alert">
                        Something went wrong. Please try again, or{' '}
                        <a className="underline" href={mailtoHref('Portfolio enquiry', values.message)}>
                          email me directly
                        </a>
                        .
                      </p>
                    )}

                    <MagneticButton type="submit" icon={status === 'sending' ? undefined : Send} className="w-full sm:w-auto" disabled={status === 'sending'} strength={0.2}>
                      {status === 'sending' ? (
                        <>
                          <Loader2 size={16} className="animate-spin" aria-hidden /> Sending…
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </MagneticButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
