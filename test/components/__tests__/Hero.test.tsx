import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Hero from '@/components/sections/Hero'

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
      },
    },
  }),
}))

describe('Hero Component', () => {
  it('renders hero title correctly', () => {
    render(<Hero />)
    
    expect(screen.getByText('Liderazgo ágil')).toBeInTheDocument()
    expect(screen.getByText('para')).toBeInTheDocument()
    expect(screen.getByText('organizaciones que escalan')).toBeInTheDocument()
  })

  it('renders call to action button', () => {
    render(<Hero />)
    
    const ctaButton = screen.getByText('Agenda tu sesión gratuita')
    expect(ctaButton).toBeInTheDocument()
  })
})
