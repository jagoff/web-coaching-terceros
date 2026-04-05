'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { headerStagger, blurUp, dividerGrow } from '@/lib/animations'
import { useLanguage } from '@/contexts/LanguageContext'
import { generateContentBasedId } from '@/lib/id-utils'

const faqStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

const faqItem: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function FAQ() {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Handle hash scrolling for "titulo-faq"
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '')
      if (hash === 'titulo-faq') {
        const element = document.getElementById('titulo-faq')
        if (element) {
          // Small delay to ensure page is loaded
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 100)
        }
      }
    }
  }, [])

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section id="faq" className="section section-dark section-compact" ref={ref}>
      <div className="container">
        {/* Section header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">{t.faq.badge}</span>
          </motion.div>
          <motion.h2
            id="titulo-faq"
            variants={blurUp}
            className="heading-xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {t.faq.title} <span className="text-gradient">{t.faq.title2}</span>
          </motion.h2>
          <motion.div variants={dividerGrow} className="divider-gold mt-6" />
        </motion.div>

        {/* Accordion */}
        <motion.div
          variants={faqStagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-3xl mx-auto flex flex-col"
        >
          {t.faq.items.map((faq, i) => {
            const faqId = generateContentBasedId(faq.question)
            return (
              <motion.div
                key={faqId}
                variants={faqItem}
                className="group"
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(124, 107, 196, 0.15)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginBottom: '1rem',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{
                  borderColor: 'rgba(124, 107, 196, 0.4)',
                  boxShadow: '0 8px 32px rgba(124, 107, 196, 0.1)',
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${faqId}`}
                  id={`faq-question-${faqId}`}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.5rem 1.75rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '1.5rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span
                    style={{
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-heading)',
                      lineHeight: 1.4,
                    }}
                  >
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 90 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background:
                        openIndex === i ? 'rgba(124, 107, 196, 0.2)' : 'rgba(124, 107, 196, 0.1)',
                      transition: 'background 0.3s ease',
                    }}
                    aria-hidden="true"
                  >
                    {openIndex === i ? (
                      <Minus
                        size={18}
                        style={{ color: 'var(--gold-primary)' }}
                        suppressHydrationWarning={true}
                      />
                    ) : (
                      <Plus
                        size={18}
                        style={{ color: 'var(--gold-primary)' }}
                        suppressHydrationWarning={true}
                      />
                    )}
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div
                        style={{
                          padding: '1rem 1.75rem 1.5rem 1.75rem',
                          fontSize: '1rem',
                          lineHeight: 1.8,
                          color: 'var(--text-secondary)',
                        }}
                        suppressHydrationWarning={true}
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
