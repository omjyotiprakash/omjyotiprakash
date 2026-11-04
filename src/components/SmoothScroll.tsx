import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export function SmoothScroll() {
  const { pathname, hash } = useLocation()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Check if visitor prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    let animationFrameId: number

    function raf(time: number) {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(raf)
    }

    animationFrameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(animationFrameId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Smooth scroll on route change or hash navigation
  useEffect(() => {
    if (!lenisRef.current) return

    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        lenisRef.current.scrollTo(target as HTMLElement, { offset: -70, duration: 1.2 })
        return
      }
    }

    // On new page navigation, reset scroll to top immediately
    lenisRef.current.scrollTo(0, { immediate: true })
  }, [pathname, hash])

  return null
}

