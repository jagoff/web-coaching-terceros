'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function JsonLdClient() {
  const { language } = useLanguage()
  
  useEffect(() => {
    const jsonLdData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': 'https://coaching-landing-cyan.vercel.app#person',
          name: 'Fernando Ferrari',
          jobTitle: 'Agile Coach & Leadership Consultant',
          description: language === 'es' 
            ? 'Coach de liderazgo y transformación organizacional con más de 20 años en tecnología'
            : 'Leadership and organizational transformation coach with over 20 years in technology',
          url: 'https://coaching-landing-cyan.vercel.app',
          sameAs: [
            'https://www.instagram.com/jago_ff',
            'https://www.linkedin.com/in/fernando-ferrari',
          ],
          knowsAbout: [
            'Agile Coaching',
            'Leadership Development',
            'Organizational Consulting',
            'Scrum',
            'Kanban',
            'Team Management',
          ],
        },
        {
          '@type': 'Organization',
          '@id': 'https://coaching-landing-cyan.vercel.app#organization',
          name: 'ELEVA COACHING',
          description: language === 'es'
            ? 'Transformando líderes y organizaciones a través del coaching estratégico y liderazgo ágil'
            : 'Transforming leaders and organizations through strategic coaching and agile leadership',
          url: 'https://coaching-landing-cyan.vercel.app',
          founder: {
            '@type': 'Person',
            name: 'Fernando Ferrari',
          },
          areaServed: {
            '@type': 'Country',
            name: language === 'es' ? 'Argentina' : 'United States',
          },
          serviceType: language === 'es' ? [
              'Coaching de Liderazgo',
              'Coaching Organizacional',
              'Transformación Ágil',
            ] : [
              'Leadership Coaching',
              'Organizational Consulting',
              'Agile Transformation',
            ],
        },
        {
          '@type': 'WebSite',
          '@id': 'https://coaching-landing-cyan.vercel.app#website',
          name: 'ELEVA COACHING',
          description: language === 'es'
            ? 'Coaching de liderazgo y transformación organizacional para líderes tech y startups'
            : 'Leadership coaching and organizational transformation for tech leaders and startups',
          url: 'https://coaching-landing-cyan.vercel.app',
          inLanguage: language,
          isAccessibleForFree: true,
          potentialAction: {
            '@type': 'ReadAction',
            target: 'https://coaching-landing-cyan.vercel.app',
          },
        },
        {
          '@type': 'Service',
          '@id': 'https://coaching-landing-cyan.vercel.app#leadership-coaching',
          name: language === 'es' ? 'Coaching de Liderazgo' : 'Leadership Coaching',
          description: language === 'es'
            ? 'Para líderes y managers que quieren potenciar su impacto y desarrollar equipos de alto rendimiento'
            : 'For leaders and managers who want to enhance their impact and develop high-performance teams',
          provider: {
            '@type': 'Organization',
            '@id': 'https://coaching-landing-cyan.vercel.app#organization',
          },
          serviceType: 'Leadership Coaching',
          offers: {
            '@type': 'Offer',
            price: '150',
            priceCurrency: 'USD',
            priceValidUntil: '2025-12-31',
            availability: 'https://schema.org/InStock',
          },
        },
        {
          '@type': 'Service',
          '@id': 'https://coaching-landing-cyan.vercel.app#organizational-consulting',
          name: language === 'es' ? 'Coaching Organizacional' : 'Organizational Consulting',
          description: language === 'es'
            ? 'Para startups y empresas que necesitan profesionalizar operaciones y adoptar agilidad real'
            : 'For startups and companies that need to professionalize operations and adopt real agility',
          provider: {
            '@type': 'Organization',
            '@id': 'https://coaching-landing-cyan.vercel.app#organization',
          },
          serviceType: 'Organizational Consulting',
          offers: {
            '@type': 'Offer',
            price: '200',
            priceCurrency: 'USD',
            priceValidUntil: '2025-12-31',
            availability: 'https://schema.org/InStock',
          },
        },
      ],
    }

    // Create and inject the JSON-LD script
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(jsonLdData)
    
    // Prevent duplicate injection
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }
    
    document.head.appendChild(script)

    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [])

  return null
}
