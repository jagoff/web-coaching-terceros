'use client'

import { useEffect, useState, useRef } from 'react'
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

type Particle = {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  opacity: number
  drift: number
}

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mounted, setMounted] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [language, setLanguage] = useState<'es' | 'en'>('es')

  const rotatingPhrases = language === 'es' ? rotatingPhrasesES : rotatingPhrasesEN
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
    const isMobile = window.innerWidth < 768
    const count = isMobile ? 8 : 20
    
    // Detect language from URL
    const path = window.location.pathname
    if (path.startsWith('/en')) {
      setLanguage('en')
    }
    
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: isMobile ? Math.random() * 4 + 2 : Math.random() * 2 + 0.5,
        delay: Math.random() * 2,
        duration: isMobile ? Math.random() * 2 + 2 : Math.random() * 2 + 4,
        opacity: isMobile ? 0.4 + Math.random() * 0.4 : 0.1 + Math.random() * 0.3,
        drift: isMobile ? (Math.random() - 0.5) * 20 : (Math.random() - 0.5) * 15,
      }))
    )

    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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

  // Parallax calculations
  const orbY1 = scrollY * 0.3
  const orbY2 = scrollY * 0.2
  const orbY3 = scrollY * 0.1

  if (!mounted) return null

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="hero-bg relative flex min-h-screen flex-col items-center overflow-hidden"
      style={{ paddingTop: 'clamp(2.25rem, 6vh, 4.25rem)' }}
      aria-label="Sección principal"
    >
      {/* Coaching Words Background Animation */}
      <CoachingWordsBackground />

      {/* Decorative orbs with CSS parallax */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ transform: `translateY(${orbY1}px)` }}
      >
        <div
          className="orb orb-gold animate-float-slow"
          style={{
            width: 'clamp(300px, 50vw, 700px)',
            height: 'clamp(300px, 50vw, 700px)',
            top: '10%',
            left: '-15%',
            opacity: 0.6,
          }}
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ transform: `translateY(${orbY2}px)` }}
      >
        <div
          className="orb orb-amber animate-float"
          style={{
            width: 'clamp(200px, 35vw, 500px)',
            height: 'clamp(200px, 35vw, 500px)',
            top: '-5%',
            right: '-10%',
            opacity: 0.4,
            animationDelay: '2s',
          }}
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ transform: `translateY(${orbY3}px)` }}
      >
        <div
          className="orb orb-gold"
          style={{
            width: 'clamp(150px, 25vw, 350px)',
            height: 'clamp(150px, 25vw, 350px)',
            bottom: '15%',
            right: '20%',
            opacity: 0.3,
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Floating particles - CSS animations */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {particles.map(p => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: `rgba(124, 107, 196, ${p.opacity})`,
                boxShadow: p.size > 2.5 ? `0 0 ${p.size * 3}px rgba(124,107,196,0.3)` : 'none',
                animation: `particle-float-${p.id % 3} ${p.duration}s ${p.delay}s infinite ease-in-out`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="container relative z-10 flex flex-col items-center text-center">
        <div
          className="flex flex-col items-center"
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
            <span className="block text-gradient animate-fade-in-up">
              {language === 'es' ? 'Transformá tu equipo.' : 'Transform your team.'}
            </span>
            <span className="block mt-3 text-gradient animate-fade-in-up animation-delay-200">
              {language === 'es' ? 'Liderá con propósito.' : 'Lead with purpose.'}
            </span>
            <span className="block mt-3 text-gradient animate-fade-in-up animation-delay-400">
              {language === 'es' ? 'Escalá sin límites.' : 'Scale without limits.'}
            </span>
          </h1>

          {/* Decorative line */}
          <div
            className="divider-gold mb-6 animate-width-expand"
            style={{ width: '80px', height: '3px' }}
          />

          {/* Rotating pain-point phrases */}
          <div
            className="relative w-[600px] max-w-full mb-4 sm:mb-6 px-6 sm:px-10 py-5 sm:py-6 rounded-2xl animate-fade-in-up animation-delay-600"
            style={{
              minHeight: '5.5rem',
              background: 'transparent',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(124,107,196,0.03)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 8px 32px rgba(0,0,0,0.2)',
              position: 'relative',
            }}
          >
            {/* Subtle gold radial glow behind */}
            <div
              className="absolute inset-0 -z-10 rounded-2xl"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(124,107,196,0.01) 0%, transparent 40%)',
                transform: 'scale(1.8)',
                filter: 'blur(50px)',
              }}
              aria-hidden="true"
            />
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
                {language === 'es' ? '¿Te suena esto?' : 'Does this sound familiar?'}
              </p>
            </div>
            <p
              className="lead-text italic animate-fade-in"
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
            className="lead-text max-w-2xl mb-8 sm:mb-12 animate-fade-in-up animation-delay-800"
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
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto max-w-2xl animate-fade-in-up animation-delay-1000"
            style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}
          >
            <button
              className="btn-primary-gradient animate-glow mobile-black-text transition-all duration-200 hover:scale-105 active:scale-95"
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
              className="btn-secondary transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={() => handleScroll('#proceso')}
            >
              {language === 'es' ? 'Conocé nuestro método ↓' : 'Learn our method ↓'}
            </button>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center mt-12 sm:mt-20 pb-16 animate-fade-in-up animation-delay-1200">
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer bg-transparent border-0 z-10 animate-fade-in animation-delay-1400"
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

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes width-expand {
          from { width: 0; opacity: 0; }
          to { width: 80px; opacity: 1; }
        }

        @keyframes scroll-mouse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(14px); }
        }

        @keyframes particle-float-0 {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-30px) translateX(10px); }
          50% { transform: translateY(10px) translateX(-10px); }
          75% { transform: translateY(-10px) translateX(5px); }
        }

        @keyframes particle-float-1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(15px) translateX(-15px); }
          50% { transform: translateY(-25px) translateX(15px); }
          75% { transform: translateY(10px) translateX(-5px); }
        }

        @keyframes particle-float-2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-30px) translateX(-5px); }
          50% { transform: translateY(20px) translateX(10px); }
          75% { transform: translateY(-15px) translateX(-10px); }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animate-width-expand {
          animation: width-expand 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1200 { animation-delay: 1.2s; }
        .animation-delay-1400 { animation-delay: 1.4s; }
      `}</style>
    </section>
  )
}
