'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Language, translations } from '@/lib/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.es
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const LANG_STORAGE_KEY = 'eleva-language'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Determine initial language during SSR/check
    if (typeof window === 'undefined') {
      // Server-side: default to 'es'; will be corrected on client
      return 'es'
    }
    // Client-side: URL takes priority over stored preference
    const path = window.location.pathname
    if (path.startsWith('/en')) return 'en'
    // Fall back to localStorage preference if no language in URL
    try {
      const stored = localStorage.getItem(LANG_STORAGE_KEY) as Language | null
      if (stored === 'en' || stored === 'es') return stored
    } catch {
      // localStorage unavailable — use default
    }
    return 'es'
  })

  // Update URL and persist preference when language changes
  const changeLanguage = (lang: Language) => {
    setLanguage(lang)

    if (typeof window !== 'undefined') {
      // Persist preference
      try {
        localStorage.setItem(LANG_STORAGE_KEY, lang)
      } catch {
        // localStorage unavailable — skip persisting
      }

      const currentPath = window.location.pathname
      const currentSearch = window.location.search

      if (lang === 'en' && !currentPath.startsWith('/en')) {
        window.history.pushState(null, '', `/en${currentPath}${currentSearch}`)
      } else if (lang === 'es' && currentPath.startsWith('/en')) {
        const newPath = currentPath.replace('/en', '') || '/'
        window.history.pushState(null, '', `${newPath}${currentSearch}`)
      }
    }
  }

  const t = translations[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
