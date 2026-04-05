'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { headerStagger, blurUp, dividerGrow } from '@/lib/animations'
import ConversationalContactForm from './Contact/ConversationalContactForm'
import ContactSidebar from './Contact/ContactSidebar'

export default function Contact() {
  const { language } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -40])

  return (
    <section
      id="contacto"
      className="section relative overflow-hidden"
      ref={ref}
      style={{
        background:
          'radial-gradient(ellipse at 50% 100%, rgba(124,107,196,0.08) 0%, transparent 60%), var(--dark-surface)',
        paddingBottom: 'clamp(1rem, 2vw, 1.5rem)',
      }}
    >
      {/* Decorative orb */}
      <motion.div
        className="orb orb-violet absolute"
        style={{
          width: 400,
          height: 400,
          bottom: '-20%',
          right: '50%',
          x: '50%',
          y: orbY,
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">
              {language === 'es' ? 'Contacto Directo' : 'Direct Contact'}
            </span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl text-center px-4"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              lineHeight: 1.2,
            }}
          >
            {language === 'es' ? 'Comenzá tu' : 'Start your'}{' '}
            <span className="text-gradient">
              {language === 'es' ? 'Transformación' : 'Transformation'}
            </span>
          </motion.h2>
          <motion.div variants={dividerGrow} className="divider-gold mt-6" />
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-start max-w-7xl mx-auto">
          {/* Left Column — Sidebar (desktop only) */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ContactSidebar />
          </motion.div>

          {/* Right Column — Form (full width on mobile) */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ConversationalContactForm />
          </motion.div>

          {/* ── Nano footer stamp
               lg:col-start-2 → only spans the form column on desktop
               col-span-full  → full width on mobile (single column)       ── */}
          <div
            className="flex items-center justify-between gap-3 pt-4 lg:col-start-2 self-end"
            style={{ borderTop: '1px solid var(--dark-border)' }}
          >
            <div className="flex items-center gap-1.5">
              <span
                className="text-gradient font-black tracking-tight"
                style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem' }}
              >
                ELEVA
              </span>
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: 'var(--text-muted)' }}
              >
                {language === 'es' ? 'CONSULTORIA' : 'CONSULTING'}
              </span>
            </div>

            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              © 2026
            </p>

            <a
              href="https://instagram.com/jago_ff"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de ELEVA Consultoria"
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
              style={{
                background: 'rgba(124,107,196,0.1)',
                border: '1px solid var(--gold-border)',
                color: 'var(--gold-primary)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(124,107,196,0.2)'
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(124,107,196,0.1)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <Instagram size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
