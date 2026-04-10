import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import HeroServer from '@/components/sections/HeroServer'

// Mock the language context
vi.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'es',
    t: {
      hero: {
        title1: 'Transformá',
        title2: 'tu equipo',
        title3: 'Liderá tu empresa',
        subtitle: 'Te acompaño a construir equipos autónomos...',
        cta: 'AGENDA GRATIS TU SESIÓN',
        rotatingPhrases: ['Mi equipo no toma decisiones sin mí'],
      },
    },
  }),
}))

describe('Hero Component', () => {
  it('renders hero title correctly', () => {
    render(<HeroServer pathname="/" />)
    
    expect(screen.getByText('Transformá')).toBeInTheDocument()
    expect(screen.getByText('tu equipo.')).toBeInTheDocument()
    expect(screen.getByText('Liderá tu empresa.')).toBeInTheDocument()
  })

  it('renders call to action button', () => {
    render(<HeroServer pathname="/" />)
    
    // Look for button by CSS class
    const ctaButton = document.querySelector('.btn-hero-primary')
    expect(ctaButton).toBeInTheDocument()
  })
})
