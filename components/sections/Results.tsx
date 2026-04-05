'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform, type Variants } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const statCard: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: 0.2 + i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function Results() {
  const { language } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -40])

  const stats =
    language === 'es'
      ? [
          {
            prefix: '+',
            value: 20,
            suffix: '',
            display: '+20',
            label: 'Años en tecnología',
            description: 'Desde infraestructura hasta liderazgo',
          },
          {
            prefix: '',
            value: 10,
            suffix: '+',
            display: '10+',
            label: 'Años de coaching ágil',
            description: 'Transformando startups y empresas tech',
          },
          {
            prefix: '',
            value: 9,
            suffix: '+',
            display: '+9',
            label: 'Certificaciones activas',
            description: 'Scrum, UX, Management 3.0, Security',
          },
          {
            prefix: '',
            value: 6,
            suffix: '',
            display: '6',
            label: 'Empresas co-fundadas',
            description: 'Mascabo, Nodok.AI, AyP',
          },
        ]
      : [
          {
            prefix: '+',
            value: 20,
            suffix: '',
            display: '+20',
            label: 'Years in technology',
            description: 'From infrastructure to leadership',
          },
          {
            prefix: '',
            value: 10,
            suffix: '+',
            display: '10+',
            label: 'Years of agile coaching',
            description: 'Transforming startups and tech companies',
          },
          {
            prefix: '',
            value: 9,
            suffix: '+',
            display: '+9',
            label: 'Active certifications',
            description: 'Scrum, UX, Management 3.0, Security',
          },
          {
            prefix: '',
            value: 6,
            suffix: '',
            display: '6',
            label: 'Companies co-founded',
            description: 'Mascabo, Nodok.AI, AyP',
          },
        ]

  function CountUp({
    value,
    prefix,
    suffix,
    started,
  }: {
    value: number
    prefix: string
    suffix: string
    started: boolean
  }) {
    const [displayed, setDisplayed] = useState(0)
    const isDecimal = value % 1 !== 0

    useEffect(() => {
      if (!started) return
      const duration = 2000
      const totalFrames = 70
      let frame = 0

      const timer = setInterval(() => {
        frame++
        const progress = frame / totalFrames
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setDisplayed(value * easeOutQuart)

        if (frame >= totalFrames) {
          clearInterval(timer)
        }
      }, duration / totalFrames)

      return () => clearInterval(timer)
    }, [started, value])

    const fmt = isDecimal ? displayed.toFixed(1) : Math.round(displayed).toString()

    return (
      <span className="stat-number">
        {prefix}
        {fmt}
        {suffix}
      </span>
    )
  }

  return (
    <section
      id="resultados"
      ref={ref}
      className="relative overflow-hidden section-gold-border-top"
      style={{
        background: 'var(--dark-surface)',
        paddingTop: 'clamp(2rem, 4vw, 3rem)',
        paddingBottom: 'clamp(2rem, 4vw, 3rem)',
      }}
    >
      {/* Subtle orb */}
      <motion.div
        className="orb orb-gold absolute pointer-events-none"
        style={{
          width: 300,
          height: 300,
          top: '-30%',
          left: '50%',
          x: '-50%',
          y: orbY,
          opacity: 0.3,
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-14">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={statCard}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="text-center"
              whileHover={{ scale: 1.06, y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <CountUp
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                started={isInView}
              />
              <h3
                className="heading-sm mt-2 mb-1 px-2"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(0.75rem, 3vw, 0.95rem)',
                  lineHeight: 1.3,
                  color: 'var(--text-primary)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                }}
              >
                {stat.label}
              </h3>
              <p
                className="text-xs px-2"
                style={{
                  color: 'var(--text-muted)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  lineHeight: '1.3',
                  maxHeight: '2.6em',
                  maxWidth: '100%',
                }}
              >
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
