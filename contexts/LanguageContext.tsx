"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.es;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  // Detect language from URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/en')) {
        setLanguage('en');
      }
    }
  }, []);

  // Update URL when language changes
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const currentSearch = window.location.search;
      
      if (lang === 'en' && !currentPath.startsWith('/en')) {
        window.history.pushState(null, '', `/en${currentPath}${currentSearch}`);
      } else if (lang === 'es' && currentPath.startsWith('/en')) {
        const newPath = currentPath.replace('/en', '') || '/';
        window.history.pushState(null, '', `${newPath}${currentSearch}`);
      }
    }
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
