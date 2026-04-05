'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSectionTracker } from '@/hooks/useSectionTracker'
import { useLanguage } from '@/contexts/LanguageContext'
import { SECTION_MAPPINGS, MOBILE_BREAKPOINT } from '@/lib/constants/sections'
import type { MobileSectionIndicatorProps } from '@/lib/types/section-tracker'

export const MobileSectionIndicator: React.FC<MobileSectionIndicatorProps> = ({
  className = '',
}) => {
  const currentSection = useSectionTracker()
  const { language } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [displaySection, setDisplaySection] = useState('')

  const getSectionName = (section: string) => {
    const mappings = SECTION_MAPPINGS[language as keyof typeof SECTION_MAPPINGS]
    const fullName = mappings?.[section as keyof typeof mappings] || section

    // Abbreviation logic for very long names on mobile
    const abbreviations: Record<string, string> = {
      'Sobre Mí': 'Sobre',
      'Madurez Empresarial': 'Test',
      'Casos de Estudio': 'Casos',
      Testimonios: 'Test',
      Reviews: 'Rev',
      About: 'About',
      Cases: 'Cases',
    }

    return abbreviations[fullName] || fullName
  }

  // Update display section when language or current section changes
  useEffect(() => {
    const sectionName = getSectionName(currentSection)
    setDisplaySection(sectionName)
  }, [currentSection, language])

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Loading state animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500) // 500ms delay for loading animation

    return () => clearTimeout(timer)
  }, [])

  // Animation variants with proper typing
  const variants = {
    initial: { opacity: 0, x: prefersReducedMotion ? 0 : 20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: prefersReducedMotion ? ([0, 0, 0.2, 1] as const) : ([0.4, 0, 0.2, 1] as const),
      },
    },
    exit: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : 20,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: prefersReducedMotion ? ([0, 0, 0.2, 1] as const) : ([0.4, 0, 0.2, 1] as const),
      },
    },
  }

  // Loading animation variants
  const loadingVariants = {
    initial: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : 50,
      scale: prefersReducedMotion ? 1 : 0.8,
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: prefersReducedMotion ? ([0, 0, 0.2, 1] as const) : ([0.4, 0, 0.2, 1] as const),
        delay: prefersReducedMotion ? 0 : 0.2,
      },
    },
  }

  // Don't render on desktop
  if (typeof window !== 'undefined' && window.innerWidth >= MOBILE_BREAKPOINT) {
    return null
  }

  return (
    <motion.div
      className={`fixed top-12 right-4 z-40 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full shadow-lg md:hidden ${className}`}
      variants={isLoading ? loadingVariants : variants}
      initial="initial"
      animate="animate"
      exit="exit"
      role="status"
      aria-label={`Current section: ${displaySection}`}
      aria-live="polite"
      aria-atomic="true"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          const element = document.querySelector(`#${currentSection}`)
          element?.scrollIntoView({ behavior: 'smooth' })
        }
      }}
    >
      <span className="text-xs font-medium text-white/90 whitespace-nowrap select-none">
        {displaySection}
      </span>
    </motion.div>
  )
}
