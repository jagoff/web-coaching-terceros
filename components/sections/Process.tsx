'use client'

import { useRef } from 'react'
import { useInView, useScroll } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Target, Users, TrendingUp, Star } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'

const headerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const blurUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const dividerGrow: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
}

const stepReveal: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: i => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: 0.35 + i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const steps = [
  {
    number: '01',
    icon: Target,
    key: 'diagnostico' as const,
  },
  {
    number: '02',
    icon: Users,
    key: 'diseno' as const,
  },
  {
    number: '03',
    icon: TrendingUp,
    key: 'ejecucion' as const,
  },
  {
    number: '04',
    icon: Star,
    key: 'autonomia' as const,
  },
]

export default function Process() {
  const { language, t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="proceso" className="section section-surface section-gold-border-top" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-14 md:mb-24 max-w-3xl mx-auto"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">{t.process.badge}</span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl mb-4"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
          >
            {t.process.title} <span className="text-gradient">{t.process.title2}</span>{' '}
            {t.process.title3}
          </motion.h2>
          <motion.p variants={blurUp} className="lead-text">
            {t.process.subtitle}
          </motion.p>
          <motion.div variants={dividerGrow} className="divider-gold mt-6" />
        </motion.div>

        {/* Steps — desktop horizontal / mobile vertical */}
        <div className="relative">
          {/* Connector line (desktop only) */}
          <div
            className="absolute top-[4.5rem] left-0 right-0 hidden lg:block"
            aria-hidden="true"
            style={{ zIndex: 0 }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.6,
                ease: [0, 0, 0.2, 1] as [number, number, number, number],
              }}
              className="step-connector mx-auto"
              style={{
                width: 'calc(100% - 120px)',
                marginLeft: '60px',
                transformOrigin: 'left',
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  custom={i}
                  variants={stepReveal}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="process-step glass-card-sm group p-6"
                  style={{ perspective: '600px' }}
                  whileHover={{ y: -2 }} // Minimal hover
                  whileTap={{ y: -8, scale: 1.05, zIndex: 10 }} // Dramatic tap effect
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Ghost number */}
                  <span
                    className="step-number"
                    aria-hidden="true"
                    style={{
                      color:
                        i === 0 ? '#9D8FD8' : i === 1 ? '#DFA080' : i === 2 ? '#B19EF9' : '#FFB380',
                    }}
                  >
                    {step.number}
                  </span>

                  {/* Icon circle */}
                  <motion.div
                    className="step-icon"
                    style={{
                      // DEBUG: Inline styles to ensure transforms work
                      transform: 'scale(1)',
                      transition: 'transform 0.3s ease',
                      backgroundColor: 'rgba(124, 107, 196, 0.1)',
                    }}
                    whileHover={{ scale: 1.02 }} // Minimal hover
                    whileTap={{ scale: 1.3, rotate: 10, zIndex: 15 }} // Dramatic tap effect
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </motion.div>

                  <h3
                    className="text-lg font-semibold mb-5"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color:
                        i === 0 ? '#9D8FD8' : i === 1 ? '#DFA080' : i === 2 ? '#B19EF9' : '#FFB380',
                      fontSize: 'var(--text-h3)',
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {t.process.steps[step.key].title}
                  </h3>

                  <p
                    className="text-body leading-relaxed"
                    style={{
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                      fontSize: 'var(--text-body)',
                      fontWeight: 400,
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    {t.process.steps[step.key].description}
                  </p>

                  {/* Mobile enhancements */}
                  <style jsx>{`
                    @media (max-width: 640px) {
                      h3 {
                        font-size: var(--text-h3) !important;
                      }
                      p {
                        font-size: var(--text-body) !important;
                      }
                    }
                  `}</style>

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
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
