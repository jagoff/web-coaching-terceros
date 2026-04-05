import { LanguageSectionMappings } from '@/lib/types/section-tracker'

// Section name mappings for internationalization
export const SECTION_MAPPINGS: LanguageSectionMappings = {
  es: {
    hero: 'Inicio',
    services: 'Servicios',
    prices: 'Precios',
    faq: 'FAQ',
    'case-studies': 'Casos',
    testimonials: 'Testimonios',
    about: 'Sobre Mí',
    'madurez-empresarial': 'Test',
    contact: 'Contacto',
  },
  en: {
    hero: 'Home',
    services: 'Services',
    prices: 'Pricing',
    faq: 'FAQ',
    'case-studies': 'Cases',
    testimonials: 'Reviews',
    about: 'About',
    'madurez-empresarial': 'Test',
    contact: 'Contact',
  },
}

// Section configuration for tracking
export const SECTION_CONFIG = [
  { id: 'hero', selector: '#hero' },
  { id: 'services', selector: '#servicios' },
  { id: 'prices', selector: '#precios' },
  { id: 'faq', selector: '#faq' },
  { id: 'case-studies', selector: '#casos-de-estudio' },
  { id: 'testimonials', selector: '#testimonios' },
  { id: 'about', selector: '#sobre-mi' },
  { id: 'madurez-empresarial', selector: '#madurez-empresarial' },
  { id: 'contact', selector: '#contacto' },
]

// Default section for initial state
export const DEFAULT_SECTION = 'hero'

// Mobile breakpoint
export const MOBILE_BREAKPOINT = 768
