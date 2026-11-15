import { useEffect, useState } from 'react'

/** Subscribe to a CSS media query. SSR-safe default of `false`. */
export function useMediaQuery(query) {
  const get = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false)
  const [matches, setMatches] = useState(get)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
/** True on devices with a precise pointer (mouse/trackpad) that can hover. */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')
export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
