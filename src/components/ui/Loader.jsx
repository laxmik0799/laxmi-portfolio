import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../../config/site'

const lines = ['initialising runtime', 'loading modules', 'compiling experience']

/**
 * Short "boot sequence" intro (~1.4s) that reinforces the LAXMI.EXE identity.
 * Skipped instantly for reduced-motion users.
 */
export default function Loader({ reduced, onDone }) {
  const [show, setShow] = useState(!reduced)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (reduced) {
      onDone?.()
      return
    }
    const timers = [
      setTimeout(() => setStep(1), 350),
      setTimeout(() => setStep(2), 700),
      setTimeout(() => setStep(3), 1050),
      setTimeout(() => setShow(false), 1450),
    ]
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink-950"
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="w-72 font-mono text-sm">
            <p className="mb-4 font-display text-2xl font-semibold tracking-[0.2em] text-gradient">{site.brand}</p>
            {lines.map((l, i) => (
              <motion.p
                key={l}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: step > i ? 1 : 0, x: step > i ? 0 : -6 }}
                className="text-slate-500"
              >
                <span className="text-cyan-400">›</span> {l}
                <span className="text-violet-400">{step > i + 1 || step === 3 ? ' ✓' : '…'}</span>
              </motion.p>
            ))}
            <div className="mt-5 h-px w-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 via-indigo-400 to-cyan-400"
                initial={{ width: '0%' }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.35 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
