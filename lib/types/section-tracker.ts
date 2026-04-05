// Section tracking types
export interface SectionConfig {
  id: string
  selector: string
}

export interface SectionNameMapping {
  [key: string]: string
}

export interface LanguageSectionMappings {
  es: SectionNameMapping
  en: SectionNameMapping
}

// Mobile section indicator props
export interface MobileSectionIndicatorProps {
  className?: string
}

// Intersection Observer options
export interface SectionTrackerOptions {
  threshold?: number
  rootMargin?: string
}
