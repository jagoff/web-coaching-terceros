'use client'

import { useRef, useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/contexts/LanguageContext'

// Registrar ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function FAQGSAP() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const accordionRef = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

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

    // Animar accordion items
    if (accordionRef.current) {
      const items = accordionRef.current.children
      tl.fromTo(
        items,
        {
          opacity: 0,
          y: 20,
          filter: 'blur(4px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          stagger: 0.1,
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

  // Animar chevron cuando cambia el estado
  useEffect(() => {
    if (openIndex !== null && accordionRef.current) {
      const items = accordionRef.current.children
      const chevron = items[openIndex]?.querySelector('.chevron-icon')

      if (chevron) {
        gsap.to(chevron, {
          rotation: 180,
          duration: 0.3,
          ease: 'power2.inOut',
        })
      }
    }
  }, [openIndex])

  return (
    <section id="faq" className="section section-dark section-compact" ref={sectionRef}>
      <div className="container">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-8 md:mb-12">
          <div ref={badgeRef} className="flex justify-center mb-6">
            <span className="badge">{t.faq.badge}</span>
          </div>
          <h2 ref={titleRef} className="heading-xl" style={{ fontFamily: 'var(--font-heading)' }}>
            {t.faq.title} <span className="text-gradient">{t.faq.title2}</span>
          </h2>
          <div ref={dividerRef} className="divider-gold mt-6" />
        </div>

        {/* Accordion */}
        <div ref={accordionRef} className="max-w-3xl mx-auto flex flex-col">
          {t.faq.items.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span>{faq.question}</span>
                <div
                  className="chevron-icon flex-shrink-0"
                  style={{
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <ChevronDown size={20} style={{ color: 'var(--gold-primary)' }} />
                </div>
              </button>
              {openIndex === i && (
                <div
                  className="faq-answer"
                  style={{
                    height: 'auto',
                    opacity: 1,
                    overflow: 'hidden',
                  }}
                >
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
