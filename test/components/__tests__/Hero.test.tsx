import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import HeroServer from '@/components/sections/HeroServer'

// Mock the language context
vi.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({
    language: 'es',
    t: {
      hero: {
        title1: 'Liderazgo ágil',
        title2: 'para',
        title3: 'organizaciones que escalan',
        subtitle: 'Transformo equipos y culturas empresariales...',
        cta: 'Agenda tu sesión gratuita',
        rotatingPhrases: ['Mi equipo no toma decisiones sin mí'],
      },
    },
  }),
}))

describe('Hero Component', () => {
  it('renders hero title correctly', () => {
    render(<HeroServer pathname="/" />)
    
    expect(screen.getByText('Liderazgo ágil')).toBeInTheDocument()
    expect(screen.getByText('para')).toBeInTheDocument()
    expect(screen.getByText('organizaciones que escalan')).toBeInTheDocument()
  })

  it('renders call to action button', () => {
    render(<HeroServer pathname="/" />)
    
    const ctaButton = screen.getByText('AGENDA GRATIS TU SESIÓN')
    expect(ctaButton).toBeInTheDocument()
  })
})
