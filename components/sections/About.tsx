'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { CheckCircle2, ExternalLink, Linkedin } from 'lucide-react'
import YouTubeThumbnail from '../YouTubeThumbnail'
import { ParallaxHeroImages } from '@/components/ui/parallax-hero-images'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { useLanguage } from '@/contexts/LanguageContext'

const slideReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

const credentialStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
}

const credentialPop: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 18 },
  },
}

const credentials = [
  'Advanced Certified ScrumMaster',
  'Advanced Certified Scrum Product Owner (ACSPO)',
  'Professional Scrum™ with UX (PSU I)',
  'Agile Coach',
  "Management 3.0 Metrics & OKR's",
  'unFIX Foundation Workshop',
  'Energizing People',
  'Fundamentals Online Workshop',
]

const baseImages = [
  'slide-01.png',
  'slide-02.png',
  'slide-03.png',
  'slide-04.png',
  'slide-05.png',
  'slide-06.png',
  'slide-07.png',
  'slide-08.png',
  'slide-09.png',
  'slide-10.png',
  'slide-11.png',
  'slide-12.png',
]

export default function About() {
  const { t, language } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [shuffledCredentials, setCredentials] = useState(credentials)
  const [buttonPosition, setButtonPosition] = useState(0)

  const optimizedImagePaths = baseImages.map(
    name => `/images/carousel/${name.replace('.png', '.webp')}`
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '')
      if (hash === 'titulo-about') {
        document.getElementById('titulo-about')?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  useEffect(() => {
    const shuffled = [...credentials].sort(() => Math.random() - 0.5)
    setCredentials(shuffled)
    setButtonPosition(Math.floor(Math.random() * (credentials.length + 1)))
  }, [])

  return (
    <section id="sobre-mi" className="section section-surface section-gold-border-top" ref={ref}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start mt-16 md:mt-24">
          {/* LEFT column: TV icon + carousel + YouTube */}
          <motion.div
            variants={slideReveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-col items-center md:items-start"
          >
            <ErrorBoundary>
              <CardContainer className="inter-var w-full">
                <CardBody className="relative group/card w-64 h-64 sm:w-80 sm:h-80 md:w-full md:h-auto md:aspect-square">
                  <CardItem translateZ="50" className="w-full h-full">
                    <img
                      src="/images/ui/tv-icon.webp"
                      alt="TV Icon"
                      loading="lazy"
                      className="w-full h-full object-contain transition-all duration-300"
                      style={{ filter: 'brightness(1.1) contrast(1.1)', transform: 'scale(1.1)' }}
                    />
                  </CardItem>
                </CardBody>
              </CardContainer>
            </ErrorBoundary>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full mt-8"
            >
              <ParallaxHeroImages images={optimizedImagePaths} className="w-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full mt-8"
            >
              <h3
                className="text-2xl font-semibold mb-3"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <span className="text-gradient">
                  {language === 'es' ? 'Conocé mi enfoque' : 'See My Approach'}
                </span>
              </h3>
              <YouTubeThumbnail
                videoId="mgr1mkSRl3o"
                title={
                  language === 'es'
                    ? 'Fernando Ferrari - Coaching de Liderazgo y Transformación Organizacional'
                    : 'Fernando Ferrari - Leadership Coaching and Organizational Transformation'
                }
                autoPlay={true}
              />
            </motion.div>
          </motion.div>

          {/* RIGHT column: title + bio + credentials */}
          <motion.div
            variants={slideReveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <h2
              id="titulo-about"
              className="heading-xl mb-6 sm:mb-10"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {t.about.title1}
              <br />
              <span className="text-gradient">{t.about.title2}</span>
              <br />
              {t.about.title3}
            </h2>

            <div className="divider-gold-left mb-6 sm:mb-10" />

            <div
              className="lead-text mb-6 sm:mb-8"
              dangerouslySetInnerHTML={{ __html: t.about.intro }}
            />

            <p className="lead-text mb-12">{t.about.approach}</p>

            <h3
              className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="web-underline">{t.about.certificaciones}</span>
            </h3>

            <motion.div
              variants={credentialStagger}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              {shuffledCredentials.map((credential, index) => (
                <React.Fragment key={`credential-${index}`}>
                  {index === buttonPosition && (
                    <motion.div variants={credentialPop} whileHover={{ scale: 1.05, y: -2 }}>
                      <motion.a
                        href="https://www.linkedin.com/in/fernandolferrari/details/certifications/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                        style={{
                          background: 'var(--gradient-gold)',
                          color: 'white',
                          textDecoration: 'none',
                          fontWeight: '600',
                        }}
                        whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(124,107,196,0.3)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Linkedin size={16} />
                        {t.process.linkedinButton}
                        <ExternalLink size={14} />
                      </motion.a>
                    </motion.div>
                  )}
                  <motion.div variants={credentialPop} className="credential-chip">
                    <CheckCircle2
                      size={14}
                      style={{ color: 'var(--gold-primary)', flexShrink: 0 }}
                    />
                    <span>{credential}</span>
                  </motion.div>
                  {index === shuffledCredentials.length - 1 && buttonPosition > index && (
                    <motion.div variants={credentialPop} whileHover={{ scale: 1.05, y: -2 }}>
                      <motion.a
                        href="https://www.linkedin.com/in/fernandolferrari/details/certifications/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                        style={{
                          background: 'var(--gradient-gold)',
                          color: 'white',
                          textDecoration: 'none',
                          fontWeight: '600',
                        }}
                        whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(124,107,196,0.3)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Linkedin size={16} />
                        {t.process.linkedinButton}
                        <ExternalLink size={14} />
                      </motion.a>
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
