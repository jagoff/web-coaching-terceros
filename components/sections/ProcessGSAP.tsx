'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, Compass, Zap, Star } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

// Registrar ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ProcessGSAP() {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)

  // Refs para GSAP
  const headerRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const connectorRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      number: '01',
      icon: Search,
      title: t.process.steps.diagnostico.title,
      description: t.process.steps.diagnostico.description,
    },
    {
      number: '02',
      icon: Compass,
      title: t.process.steps.diseno.title,
      description: t.process.steps.diseno.description,
    },
    {
      number: '03',
      icon: Zap,
      title: t.process.steps.ejecucion.title,
      description: t.process.steps.ejecucion.description,
    },
    {
      number: '04',
      icon: Star,
      title: t.process.steps.autonomia.title,
      description: t.process.steps.autonomia.description,
    },
  ]

  // Animaciones GSAP con ScrollTrigger
  useEffect(() => {
    if (!ref.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 75%',
        end: 'bottom 25%',
        toggleActions: 'play none none reverse',
      },
    })

    // Animar header
    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.5,
          ease: 'power2.out',
        }
      )
    }

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.2'
      )
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.2'
      )
    }

    if (dividerRef.current) {
      tl.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.inOut',
        },
        '-=0.2'
      )
    }

    // Animar línea conectora (desktop)
    if (connectorRef.current) {
      tl.fromTo(
        connectorRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.inOut',
          transformOrigin: 'left',
        },
        '-=0.2'
      )
    }

    // Animar steps con stagger
    if (stepsRef.current) {
      tl.fromTo(
        stepsRef.current.children,
        {
          opacity: 0,
          y: 50,
          rotateY: -8,
          filter: 'blur(4px)',
          transformPerspective: 600,
        },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '-=0.5'
      )
    }

    // Animar hover en steps
    const stepElements = gsap.utils.toArray('.process-step')
    stepElements.forEach((step: any) => {
      step.addEventListener('mouseenter', () => {
        gsap.to(step, {
          y: -8,
          duration: 0.3,
          ease: 'power2.out',
        })
      })

      step.addEventListener('mouseleave', () => {
        gsap.to(step, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
      })

      // Animar icon en hover
      const iconElement = step.querySelector('.step-icon')
      if (iconElement) {
        step.addEventListener('mouseenter', () => {
          gsap.to(iconElement, {
            scale: 1.15,
            rotation: -5,
            duration: 0.3,
            ease: 'back.out(1.7)',
          })
        })

        step.addEventListener('mouseleave', () => {
          gsap.to(iconElement, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out',
          })
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      tl.kill()
    }
  }, [])

  return (
    <section id="proceso" className="section section-surface section-gold-border-top" ref={ref}>
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14 md:mb-24 max-w-3xl mx-auto">
          <div ref={badgeRef} className="flex justify-center mb-6">
            <div className="badge">{t.process.badge}</div>
          </div>
          <h2
            ref={titleRef}
            className="heading-xl mb-4"
            style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: 'var(--text-h2)',
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}
          >
            {t.process.title} <span className="text-gradient">{t.process.title2}</span>{' '}
            {t.process.title3}
          </h2>
          <p ref={subtitleRef} className="lead-text">
            {t.process.subtitle}
          </p>
          <div ref={dividerRef} className="divider-gold mt-6" />
        </div>

        {/* Steps — desktop horizontal / mobile vertical */}
        <div className="relative">
          {/* Connector line (desktop only) */}
          <div
            className="absolute top-[4.5rem] left-0 right-0 hidden lg:block"
            aria-hidden="true"
            style={{ zIndex: 0 }}
          >
            <div
              ref={connectorRef}
              className="step-connector mx-auto"
              style={{
                width: 'calc(100% - 120px)',
                marginLeft: '60px',
                transformOrigin: 'left',
              }}
            />
          </div>

          <div
            ref={stepsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8 relative z-10"
          >
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className="process-step glass-card-sm group p-6"
                  style={{ perspective: '600px' }}
                >
                  {/* Ghost number */}
                  <span
                    className="step-number"
                    aria-hidden="true"
                    style={{
                      background:
                        i === 0
                          ? 'linear-gradient(135deg, #7C6BC4 0%, #C87B5A 55%, #9D8FD8 100%)'
                          : i === 1
                            ? 'linear-gradient(135deg, #8B7BD4 0%, #D4956A 55%, #A89FE8 100%)'
                            : i === 2
                              ? 'linear-gradient(135deg, #9A8BE4 0%, #E0A57A 55%, #B3AFF8 100%)'
                              : 'linear-gradient(135deg, #A99BF4 0%, #ECB58A 55%, #BEBFFF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {step.number}
                  </span>

                  {/* Icon circle */}
                  <div className="step-icon">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  <h3
                    className="text-lg font-semibold mb-5"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}
                  >
                    {step.description}
                  </p>

                  {/* Mobile connector */}
                  {i < steps.length - 1 && (
                    <div
                      className="sm:hidden mx-auto mt-4 w-px h-8 opacity-30"
                      style={{
                        background: 'linear-gradient(180deg, var(--gold-primary), transparent)',
                      }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
