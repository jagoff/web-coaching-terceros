'use client'

import { useState, useEffect } from 'react'
import { Language } from '@/lib/translations'

export function useSSRLanguage(): Language {
  // Initialize with a default value that matches server-side rendering
  const [language, setLanguage] = useState<Language>('es')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Only run on client side
    if (typeof window !== 'undefined') {
      const path = window.location.pathname
      const detectedLanguage = path.startsWith('/en') ? 'en' : 'es'
      setLanguage(detectedLanguage)
    }
  }, [])

  // During SSR and initial client render, return 'es'
  // After hydration, return the detected language
  return mounted ? language : 'es'
}
