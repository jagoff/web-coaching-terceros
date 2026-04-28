import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Hero from '@/components/sections/Hero'

vi.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({ language: 'es' }),
}))

describe('Hero Component', () => {
  it('renders hero title correctly', () => {
    render(<Hero />)
    expect(screen.getByText(/Transformá/)).toBeInTheDocument()
    expect(screen.getByText(/Liderá con propósito/)).toBeInTheDocument()
    expect(screen.getByText(/sin límites/i)).toBeInTheDocument()
  })

  it('renders the primary CTA', () => {
    render(<Hero />)
    expect(screen.getByText(/Agendá tu sesión gratuita/)).toBeInTheDocument()
  })

  it('renders the secondary CTA', () => {
    render(<Hero />)
    expect(screen.getByText(/Conocé nuestro método/)).toBeInTheDocument()
  })
})
