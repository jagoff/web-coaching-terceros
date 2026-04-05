'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { SECTION_CONFIG, DEFAULT_SECTION, MOBILE_BREAKPOINT } from '@/lib/constants/sections'
import type { SectionTrackerOptions } from '@/lib/types/section-tracker'

export const useSectionTracker = (options: SectionTrackerOptions = {}) => {
  const [currentSection, setCurrentSection] = useState<string>(DEFAULT_SECTION)
  const [isMobile, setIsMobile] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id

        // Clear existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        // Add smooth transition with debouncing
        timeoutRef.current = setTimeout(() => {
          setCurrentSection(sectionId)
        }, 100)
      }
    })
  }, [])

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return

    // Check mobile status with throttling
    let resizeTimer: NodeJS.Timeout
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    const throttledCheckMobile = () => {
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(checkMobile, 150)
    }

    checkMobile()
    window.addEventListener('resize', throttledCheckMobile, { passive: true })

    // Only set up observer on mobile
    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      return () => {
        window.removeEventListener('resize', throttledCheckMobile)
        if (resizeTimer) clearTimeout(resizeTimer)
      }
    }

    // Create observer with options
    const observerOptions = {
      threshold: options.threshold || 0.5,
      rootMargin: options.rootMargin || '-20% 0px -20% 0px',
    }

    observerRef.current = new IntersectionObserver(handleIntersection, observerOptions)

    // Observe all sections
    const sectionElements = SECTION_CONFIG.map(section => {
      const element = document.querySelector(section.selector)
      return element
    }).filter(Boolean) as Element[]

    sectionElements.forEach(element => {
      observerRef.current?.observe(element)
    })

    // Cleanup
    return () => {
      observerRef.current?.disconnect()
      window.removeEventListener('resize', throttledCheckMobile)
      if (resizeTimer) clearTimeout(resizeTimer)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [handleIntersection, options.threshold, options.rootMargin])

  return currentSection
}
