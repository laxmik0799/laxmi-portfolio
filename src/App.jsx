import { useCallback, useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import FrontendLab from './components/FrontendLab/FrontendLab'
import Experience from './components/Experience/Experience'
import Achievements from './components/Achievements/Achievements'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Cursor from './components/ui/Cursor'
import Loader from './components/ui/Loader'
import ParticleField from './components/ui/ParticleField'
import { useFinePointer, usePrefersReducedMotion } from './hooks/useMediaQuery'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { scrollToId } from './utils/scroll'

export default function App() {
  const reduced = usePrefersReducedMotion()
  const fine = useFinePointer()
  const [ready, setReady] = useState(false)

  useSmoothScroll(fine && !reduced)

  const onLoaded = useCallback(() => setReady(true), [])

  // Honour a #section in the URL once the intro has finished.
  useEffect(() => {
    if (!ready) return
    const id = window.location.hash.slice(1)
    if (id && document.getElementById(id)) setTimeout(() => scrollToId(id), 50)
  }, [ready])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink-900"
      >
        Skip to content
      </a>
      <Loader reduced={reduced} onDone={onLoaded} />
      <ParticleField reduced={reduced} />
      <div aria-hidden className="noise pointer-events-none fixed inset-0 z-[1] opacity-[0.025] mix-blend-overlay" />
      {fine && !reduced && <Cursor />}

      <Navbar />
      <main id="main" className="relative z-10">
        <Hero ready={ready} />
        <About />
        <Skills />
        <Projects />
        <FrontendLab />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </MotionConfig>
  )
}
