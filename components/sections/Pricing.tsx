'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react'
import { scrollToElement } from '@/lib/scroll'
import { headerStagger, blurUp, dividerGrow } from '@/lib/animations'
import { useLanguage } from '@/contexts/LanguageContext'

const planCard: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 6, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      delay: 0.25 + i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const featureStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
}

const featureItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Pricing() {
  const { t, language } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const [forceVisible, setForceVisible] = useState(false)

  // Fallback: Force visibility after 2 seconds if animation hasn't triggered
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isInView) {
        setForceVisible(true)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [isInView])

  const handleScroll = (href: string) => scrollToElement(href)

  const plans = [
    {
      id: 'individual',
      name: t.pricing.plans.liderazgo.name,
      description: t.pricing.plans.liderazgo.description,
      features: t.pricing.plans.liderazgo.features,
      cta: t.pricing.plans.liderazgo.cta,
      featured: false,
      badge: null,
    },
    {
      id: 'transformacion',
      name: t.pricing.plans.organizacional.name,
      description: t.pricing.plans.organizacional.description,
      features: t.pricing.plans.organizacional.features,
      cta: t.pricing.plans.organizacional.cta,
      featured: true,
      badge: language === 'es' ? 'Más Popular' : 'Most Popular',
    },
    {
      id: 'elite',
      name: t.pricing.plans.personalizado.name,
      description: t.pricing.plans.personalizado.description,
      features: t.pricing.plans.personalizado.features,
      cta: t.pricing.plans.personalizado.cta,
      featured: false,
      badge: null,
    },
  ]

  return (
    <section id="precios" className="section section-surface section-gold-border-top" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView || forceVisible ? 'visible' : 'hidden'}
          className="text-center mb-12 md:mb-20"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">{t.pricing.badge}</span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t.pricing.title} <span className="text-gradient">{t.pricing.title2}</span>
          </motion.h2>
          <motion.p variants={blurUp} className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {t.pricing.subtitle}
          </motion.p>
          <motion.div variants={dividerGrow} className="divider-gold mt-6" />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-stretch mt-12 sm:mt-20">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              custom={i}
              variants={planCard}
              initial="hidden"
              animate={isInView || forceVisible ? 'visible' : 'hidden'}
              className={`pricing-card flex flex-col relative${plan.featured ? ' featured animated-border' : ''}`}
              style={{
                perspective: '800px',
                // DEBUG: Force visibility on mobile
                opacity: 1,
                transform: 'none',
                background: plan.featured 
                  ? 'linear-gradient(135deg, rgba(124,107,196,0.15) 0%, rgba(255,107,53,0.08) 100%)'
                  : 'rgba(20, 18, 29, 0.9)',
                border: plan.featured
                  ? '2px solid var(--gold-primary)'
                  : '1px solid var(--gold-border)',
                borderRadius: '24px',
                padding: '2rem',
                boxShadow: plan.featured
                  ? '0 0 40px rgba(124,107,196,0.15), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                  : 'none',
              }}
              whileHover={{
                y: -8,
                boxShadow: plan.featured
                  ? '0 0 60px rgba(124,107,196,0.2), 0 16px 48px rgba(0,0,0,0.5)'
                  : '0 8px 32px rgba(0,0,0,0.4)',
              }}
              whileTap={{ scale: 1.02 }} // Mobile touch support
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Badge row — fixed height keeps all cards aligned */}
              <div className="flex justify-end mb-4" style={{ minHeight: '1.75rem' }}>
                {plan.badge && (
                  <span 
                    className="text-xs px-3 py-1 font-semibold" 
                    aria-label="Plan más popular"
                    style={{
                      background: 'var(--gradient-gold)',
                      color: 'white',
                      borderRadius: '20px',
                      boxShadow: '0 4px 12px rgba(124,107,196,0.3)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    {plan.badge}
                  </span>
                )}
              </div>

              {/* Plan name */}
              <p
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: 'var(--gold-primary)', letterSpacing: '0.15em' }}
              >
                {plan.name}
              </p>

              {/* Description */}
              <p
                className="text-sm pb-8 mb-8"
                style={{
                  color: 'var(--text-muted)',
                  lineHeight: 1.8,
                  minHeight: '5.5rem',
                }}
              >
                {plan.description}
              </p>

              {/* Features */}
              <motion.ul
                variants={featureStagger}
                initial="hidden"
                animate={isInView || forceVisible ? 'visible' : 'hidden'}
                className="space-y-4 mb-8 flex-1"
              >
                {plan.features.map(feature => (
                  <motion.li key={feature} variants={featureItem} className="pricing-feature">
                    <CheckCircle2 className="pricing-check" size={16} />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* CTA */}
              <button
                className={`btn-primary-vibrant w-full ${plan.featured ? 'featured' : ''}`}
                onClick={() => handleScroll('#contacto')}
                style={{
                  minHeight: plan.featured ? '56px' : '48px',
                  borderRadius: '16px',
                  fontSize: 'calc(var(--text-body) - 6px)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'none',
                  border: plan.featured 
                    ? '2px solid rgba(255,255,255,0.3)'
                    : '2px solid transparent',
                  boxShadow: plan.featured
                    ? '0 0 30px rgba(255, 87, 34, 0.4), 0 8px 24px rgba(0,0,0,0.3)'
                    : '0 0 20px rgba(255, 87, 34, 0.3)',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  if (plan.featured) {
                    e.currentTarget.style.background = '#ff7043';
                    e.currentTarget.style.transform = 'scale(1.02) translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 87, 34, 0.5), 0 12px 32px rgba(0,0,0,0.4)';
                  }
                }}
                onMouseOut={(e) => {
                  if (plan.featured) {
                    e.currentTarget.style.background = 'var(--cta-orange-vibrant)';
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 87, 34, 0.4), 0 8px 24px rgba(0,0,0,0.3)';
                  }
                }}
              >
                <span style={{ marginRight: '6px' }}>{plan.cta}</span> <ArrowRight size={14} className="flex-shrink-0" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={isInView || forceVisible ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-12 sm:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MessageCircle size={18} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
          <div className="text-base" style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <p style={{ margin: 0, marginBottom: '0.5rem' }}>
              {language === 'es'
                ? '¿Tenés dudas sobre qué plan se adapta mejor a tu caso?'
                : 'Not sure which plan best fits your needs?'}
            </p>
            <button
              className="underline transition-colors bg-transparent border-0 cursor-pointer p-0 text-base"
              style={{ color: 'var(--gold-primary)' }}
              onClick={() => {
                window.location.href = 'mailto:fernandoferrari@gmail.com?subject=Consulta sobre planes de coaching&body=Hola Fernando, tengo dudas sobre cuál plan se adapta mejor a mi caso. ¿Podemos conversar?'
              }}
            >
              {language === 'es'
                ? 'Escribime y lo hablamos sin compromiso.'
                : "Write to me and we'll discuss it with no commitment."}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
