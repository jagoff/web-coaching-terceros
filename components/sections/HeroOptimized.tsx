'use client'

import { useEffect, useState, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import CoachingWordsBackground from '@/components/CoachingWordsBackground'

const rotatingPhrasesES = [
  'Mi equipo no toma decisiones sin mí',
  'Las reuniones no llevan a nada concreto',
  'Estamos creciendo pero todo se rompe',
  'No logro delegar sin perder el control',
  'El equipo tiene talento pero no rinde',
  'Siempre ap🔥gamos incendios 🔥, nunca prevenimos',
  'Tengo demasiadas prioridades y no avanzo en ninguna',
  'No sé si mi equipo está alineado con los objetivos',
  'Contrato bien pero la gente se va rápido',
  'Trabajamos mucho pero los resultados no se ven',
]

const rotatingPhrasesEN = [
  "My team doesn't make decisions without me",
  "Meetings don't lead to anything concrete",
  "We're growing but everything breaks",
  "I can't delegate without losing control",
  "The team has talent but doesn't perform",
  "We're always putting out fires, never preventing",
  "I have too many priorities and don't advance in any",
  "I don't know if my team is aligned with objectives",
  'I hire well but people leave quickly',
  "We work a lot but results aren't visible",
]

export default function Hero() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const rotatingPhrases = language === 'es' ? rotatingPhrasesES : rotatingPhrasesEN

  useEffect(() => {
    setMounted(true)
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex(prev => (prev + 1) % rotatingPhrases.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const handleScroll = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (!mounted) return null

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className={`hero-bg relative flex min-h-screen flex-col items-center overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ paddingTop: 'clamp(2.25rem, 6vh, 4.25rem)' }}
      aria-label="Sección principal"
    >
      {/* Coaching Words Background Animation - Simplified */}
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <CoachingWordsBackground />
      </div>

      {/* Simplified decorative elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="orb orb-gold animate-float-slow"
          style={{
            width: 'clamp(300px, 50vw, 700px)',
            height: 'clamp(300px, 50vw, 700px)',
            top: '10%',
            left: '-15%',
            opacity: 0.3,
          }}
        />
        <div
          className="orb orb-amber animate-float"
          style={{
            width: 'clamp(200px, 35vw, 500px)',
            height: 'clamp(200px, 35vw, 500px)',
            top: '-5%',
            right: '-10%',
            opacity: 0.2,
            animationDelay: '2s',
          }}
        />
      </div>

      {/* Main content */}
      <div className="container relative z-10 flex flex-col items-center text-center">
        <div
          className={`flex flex-col items-center transition-all duration-1200 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{
            paddingTop: 'clamp(64px, 10vh, 120px)',
            paddingBottom: 'clamp(32px, 5vh, 60px)',
          }}
        >
          {/* Headline */}
          <h1
            className="display-text max-w-5xl mb-3 sm:mb-4"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(48px, 5.5vw, 56px)',
              fontWeight: 600,
              letterSpacing: '-0.5px',
              lineHeight: '1.08',
            }}
          >
            <span className="block text-gradient mb-3">Transformá tu equipo.</span>
            <span className="block text-gradient mb-3">Liderá con propósito.</span>
            <span className="block text-gradient">Escalá sin límites.</span>
          </h1>

          {/* Decorative line */}
          <div
            className="divider-gold mb-6 transition-all duration-1000 delay-500"
            style={{
              width: isVisible ? '80px' : '0px',
              height: '3px',
            }}
          />

          {/* Rotating phrases - Simplified */}
          <div
            className={`relative w-[600px] max-w-full mb-4 sm:mb-6 px-6 sm:px-10 py-5 sm:py-6 rounded-2xl transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{
              minHeight: '5.5rem',
              background: 'transparent',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(124,107,196,0.03)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 8px 32px rgba(0,0,0,0.2)',
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/img/this-is-fine-dog-optimized.png"
                alt="Avatar - ¿Te suena esto?"
                className="w-16 h-16 object-contain rounded-full"
                loading="lazy"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 107, 53, 0.4))',
                  animation: 'pulse 2s infinite',
                }}
              />
              <p
                className="text-base uppercase tracking-widest"
                style={{ color: 'var(--text-muted)', letterSpacing: '0.15em' }}
              >
                ¿Te suena esto?
              </p>
            </div>
            <p
              className="lead-text italic transition-all duration-500"
              style={{
                color: '#FFFFFF',
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              }}
            >
              "{rotatingPhrases[phraseIndex]}"
            </p>
          </div>

          {/* Subheadline */}
          <p
            className={`lead-text max-w-2xl mb-8 sm:mb-12 transition-all duration-1000 delay-900 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(18px, 2vw, 20px)',
              fontWeight: 400,
              color: 'var(--text-secondary)',
              marginTop: '20px',
              lineHeight: '1.6'
            }}
          >
            {language === 'es'
              ? 'Coaching y consultoría organizacional para líderes tech y startups que quieren crecer de forma ágil, humana y sostenible.'
              : 'Leadership coaching and organizational consulting for tech leaders and startups that want to grow in an agile, human, and sustainable way.'}
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto max-w-2xl transition-all duration-1000 delay-1100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}
          >
            <button
              className="btn-primary-gradient animate-glow mobile-black-text transition-transform duration-200 hover:scale-105 active:scale-95"
              onClick={() => handleScroll('#contacto')}
              style={{
                fontSize: 'var(--text-body)',
                fontWeight: 500,
                padding: '14px 32px'
              }}
            >
              {language === 'es' ? 'Agendá tu sesión gratuita →' : 'Book your free session →'}
            </button>
            <button
              className="btn-secondary transition-transform duration-200 hover:scale-105 active:scale-95"
              onClick={() => handleScroll('#proceso')}
            >
              {language === 'es' ? 'Conocé nuestro método ↓' : 'Learn our method ↓'}
            </button>
          </div>

          {/* Social proof */}
          <div
            className={`flex items-center justify-center mt-12 sm:mt-20 pb-16 transition-all duration-1000 delay-1300 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p
              className="text-sm leading-relaxed text-center"
              style={{ color: 'var(--text-muted)' }}
            >
              {language === 'es'
                ? 'Más de 20 años en tecnología · 11+ años de consultoría'
                : 'Over 20 years in technology · 11+ years of agile consulting'}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer bg-transparent border-0 z-10 transition-all duration-1000 delay-1500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => handleScroll('#sobre-mi')}
        aria-label="Desplazarse hacia abajo"
      >
        <div
          className="relative rounded-full"
          style={{
            width: 24,
            height: 40,
            border: '2px solid var(--text-muted)',
            transition: 'border-color 0.3s',
          }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: 4,
              height: 8,
              top: 6,
              background: 'var(--gold-primary)',
              animation: 'scroll-mouse 2s infinite',
            }}
          />
        </div>
      </button>
    </section>
  )
}
