'use client'

import { useRef, useEffect } from 'react'
import { CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollToElement } from '@/lib/scroll'
import { useLanguage } from '@/contexts/LanguageContext'

// Registrar ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function PricingGSAP() {
  const { t, language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const plansRef = useRef<HTMLDivElement>(null)

  const handleScroll = (href: string) => scrollToElement(href)

  const plans = [
    {
      id: 'individual',
      name: t.pricing.plans.liderazgo.name,
      description: t.pricing.plans.liderazgo.description,
      features: t.pricing.plans.liderazgo.features,
      cta: language === 'es' ? 'Consultar por este plan' : 'Inquire about this plan',
      featured: false,
      badge: null,
    },
    {
      id: 'transformacion',
      name: t.pricing.plans.organizacional.name,
      description: t.pricing.plans.organizacional.description,
      features: t.pricing.plans.organizacional.features,
      cta: language === 'es' ? 'Consultar por este plan' : 'Inquire about this plan',
      featured: true,
      badge: language === 'es' ? 'Más Popular' : 'Most Popular',
    },
    {
      id: 'elite',
      name: t.pricing.plans.personalizado.name,
      description: t.pricing.plans.personalizado.description,
      features: t.pricing.plans.personalizado.features,
      cta: language === 'es' ? 'Consultar por este plan' : 'Inquire about this plan',
      featured: false,
      badge: null,
    },
  ]

  // Animaciones GSAP con ScrollTrigger
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'bottom 25%',
        toggleActions: 'play none none reverse',
      },
    })

    // Animar header
    if (headerRef.current) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }
      )
    }

    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.2)',
        },
        '-=0.4'
      )
    }

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.3'
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
          duration: 0.6,
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
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '-=0.4'
      )
    }

    // Animar planes
    if (plansRef.current) {
      const planCards = plansRef.current.children
      tl.fromTo(
        planCards,
        {
          opacity: 0,
          y: 50,
          rotateX: 6,
          filter: 'blur(6px)',
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '-=0.3'
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      tl.kill()
    }
  }, [])

  return (
    <section
      id="precios"
      className="section section-surface section-gold-border-top"
      ref={sectionRef}
    >
      <div className="container">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-20">
          <div ref={badgeRef} className="flex justify-center mb-6">
            <span className="badge">{t.pricing.badge}</span>
          </div>
          <h2
            ref={titleRef}
            className="heading-xl mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t.pricing.title} <span className="text-gradient">{t.pricing.title2}</span>
          </h2>
          <p ref={subtitleRef} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {t.pricing.subtitle}
          </p>
          <div ref={dividerRef} className="divider-gold mt-6" />
        </div>

        {/* Pricing Cards */}
        <div ref={plansRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative group ${
                plan.featured ? 'scale-105 z-10' : 'scale-100'
              } transition-all duration-300`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <div className="badge">{plan.badge}</div>
                </div>
              )}
              <div
                className={`relative h-full p-8 rounded-2xl border transition-all duration-300 ${
                  plan.featured
                    ? 'bg-gradient-to-br from-[var(--gold-primary)]/10 to-[var(--gold-primary)]/5 border-[var(--gold-primary)] shadow-2xl'
                    : 'bg-[var(--dark-surface)] border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]'
                }`}
                style={{
                  boxShadow: plan.featured
                    ? '0 25px 50px -12px rgba(124,107,196,0.25), inset 0 1px 0 rgba(255,255,255,0.1)'
                    : '0 10px 25px -5px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {plan.name}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {plan.id === 'individual' && language === 'es'
                        ? 'Personalizado'
                        : plan.id === 'individual' && language === 'en'
                          ? 'Custom'
                          : plan.id === 'transformacion'
                            ? '€2.500/mes'
                            : plan.id === 'elite' && language === 'es'
                              ? 'Elite'
                              : 'Elite'}
                    </span>
                    {plan.id === 'transformacion' && (
                      <span className="text-sm ml-2" style={{ color: 'var(--text-secondary)' }}>
                        /mes
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle2
                          size={18}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: 'var(--gold-primary)' }}
                        />
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.featured
                      ? 'bg-[var(--gold-primary)] text-black hover:bg-[var(--gold-hover)]'
                      : 'bg-[rgba(255,255,255,0.1)] text-white hover:bg-[rgba(255,255,255,0.2)]'
                  }`}
                  onClick={() => handleScroll('#contacto')}
                >
                  {plan.cta}
                  <ArrowRight size={16} className="ml-2 inline" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 p-4 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]">
            <MessageCircle size={20} style={{ color: 'var(--gold-primary)' }} />
            <div className="text-left">
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {language === 'es'
                  ? '¿Necesitas una solución personalizada?'
                  : 'Need a custom solution?'}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {language === 'es'
                  ? 'Hablemos de tus necesidades específicas'
                  : "Let's discuss your specific needs"}
              </p>
            </div>
            <button
              className="px-4 py-2 rounded-lg bg-[var(--gold-primary)] text-black font-semibold text-sm hover:bg-[var(--gold-hover)] transition-all duration-300"
              onClick={() => handleScroll('#contacto')}
            >
              {language === 'es' ? 'Consultar' : 'Inquire'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
