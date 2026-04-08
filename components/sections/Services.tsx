'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { Flame, Gem, CheckCircle2, ArrowRight, Settings } from 'lucide-react'
import { scrollToElement } from '@/lib/scroll'
import { headerStagger, blurUp, dividerGrow } from '@/lib/animations'
import { useLanguage } from '@/contexts/LanguageContext'

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      delay: 0.3 + i * 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const benefitStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.4 } },
}

const benefitItem: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Services() {
  const { t, language } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Handle hash scrolling for "titulo-servicios"
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '')
      if (hash === 'titulo-servicios') {
        const element = document.getElementById('titulo-servicios')
        if (element) {
          // Small delay to ensure page is loaded
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 100)
        }
      }
    }
  }, [])

  const services = [
    {
      id: 'liderazgo',
      icon: Flame,
      title: t.services.items.liderazgo.title,
      description: t.services.items.liderazgo.description,
      benefits: t.services.items.liderazgo.benefits,
      cta: t.services.knowMore,
      featured: false,
    },
    {
      id: 'organizacional',
      icon: Gem,
      title: t.services.items.organizacional.title,
      description: t.services.items.organizacional.description,
      benefits: t.services.items.organizacional.benefits,
      cta: t.services.startHere,
      featured: true,
      badge: language === 'es' ? 'MÁS SOLICITADO' : 'MOST POPULAR',
    },
    {
      id: 'frameworks',
      icon: Settings,
      title: t.services.items.frameworks.title,
      description: t.services.items.frameworks.description,
      benefits: t.services.items.frameworks.benefits,
      cta: t.services.knowMore,
      featured: false,
    },
  ]

  return (
    <section id="servicios" className="section section-dark" ref={ref}>
      <div className="container">
        {/* Section header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">{t.services.badge}</span>
          </motion.div>
          <motion.h2
            id="titulo-servicios"
            variants={blurUp}
            className="heading-xl"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
              lineHeight: '1.2',
            }}
          >
            <span className="text-gradient">{t.services.title}</span>
          </motion.h2>
          <motion.div variants={dividerGrow} className="divider-gold mt-6" />
        </motion.div>

        {/* Service cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                custom={i}
                variants={cardReveal}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className={`glass-card p-6 sm:p-10 md:p-12 flex flex-col group relative overflow-hidden${service.featured ? ' ring-1' : ''}`}
                style={{
                  perspective: '800px',
                  ...(service.featured
                    ? {
                        borderColor: 'rgba(124,107,196,0.45)',
                        boxShadow: '0 0 40px rgba(124,107,196,0.12), 0 8px 32px rgba(0,0,0,0.5)',
                      }
                    : {}),
                }}
                whileHover={{
                  y: -6,
                  boxShadow: service.featured
                    ? '0 0 60px rgba(124,107,196,0.2), 0 16px 48px rgba(0,0,0,0.5)'
                    : '0 8px 32px rgba(0,0,0,0.4)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Featured glow background */}
                {service.featured && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      background:
                        'radial-gradient(ellipse at top right, rgba(124,107,196,0.25) 0%, transparent 60%)',
                    }}
                  />
                )}

                {/* Icon + Badge row */}
                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    className="w-14 h-14 rounded-lg flex items-center justify-center"
                    style={{
                      background: 'rgba(124,107,196,0.12)',
                      border: '1px solid rgba(124,107,196,0.25)',
                      color: 'var(--gold-primary)',
                    }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <Icon size={26} strokeWidth={1.5} />
                  </motion.div>
                  {service.badge && (
                    <span
                      className="badge text-xs"
                      style={{
                        color: 'rgba(255,255,255,0.8)',
                        borderColor: 'rgba(255,255,255,0.3)',
                      }}
                    >
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3
                  className="heading-md mb-6"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
                    minHeight: '4.5rem',
                  }}
                >
                  <span className="text-gradient">{service.title}</span>
                </h3>

                <p
                  className="mb-6 sm:mb-10"
                  style={{ color: 'var(--text-secondary)', lineHeight: '1.75', minHeight: '9rem' }}
                >
                  {service.description}
                </p>

                {/* Benefits */}
                <motion.ul
                  variants={benefitStagger}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-1"
                >
                  {service.benefits.map(benefit => (
                    <motion.li
                      key={benefit}
                      variants={benefitItem}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2
                        size={18}
                        className="flex-shrink-0"
                        style={{ color: 'var(--gold-primary)' }}
                      />
                      <span
                        className="text-base leading-relaxed"
                        style={{ color: 'var(--text-secondary)', fontWeight: 400 }}
                      >
                        {benefit}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* CTA centered */}
                <div className="flex justify-center">
                  <button
                    className="inline-flex items-center gap-2 bg-transparent border-0 cursor-pointer p-0 text-sm font-semibold uppercase tracking-widest transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #C87B5A 0%, #7C6BC4 50%, #FF6B35 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '0.1em',
                    }}
                    onClick={() => scrollToElement('#contacto')}
                    onMouseEnter={e => {
                      e.currentTarget.style.opacity = '0.8'
                      e.currentTarget.style.gap = '12px'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.opacity = '1'
                      e.currentTarget.style.gap = '8px'
                    }}
                  >
                    {service.cta}
                    <ArrowRight size={16} style={{ color: '#FF6B35' }} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
