'use client'

import { useEffect } from 'react'

export default function JsonLdClient() {
  useEffect(() => {
    const jsonLdData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': 'https://coaching-landing-cyan.vercel.app#person',
          name: 'Fernando Ferrari',
          jobTitle: 'Agile Coach & Leadership Consultant',
          description:
            'Coach de liderazgo y consultoría organizacional con más de 20 años en tecnología',
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
          name: 'ELEVA CONSULTORA',
          description:
            'Transformando líderes y organizaciones a través de la consultoría estratégica y coaching ágil',
          url: 'https://coaching-landing-cyan.vercel.app',
          founder: {
            '@type': 'Person',
            name: 'Fernando Ferrari',
          },
          areaServed: {
            '@type': 'Country',
            name: 'Argentina',
          },
          serviceType: [
            'Coaching de Liderazgo',
            'Consultoría Organizacional',
            'Transformación Ágil',
          ],
        },
        {
          '@type': 'WebSite',
          '@id': 'https://coaching-landing-cyan.vercel.app#website',
          name: 'ELEVA CONSULTORA',
          description:
            'Consultoría organizacional y coaching de liderazgo para líderes tech y startups',
          url: 'https://coaching-landing-cyan.vercel.app',
          inLanguage: 'es',
          isAccessibleForFree: true,
          potentialAction: {
            '@type': 'ReadAction',
            target: 'https://coaching-landing-cyan.vercel.app',
          },
        },
        {
          '@type': 'Service',
          '@id': 'https://coaching-landing-cyan.vercel.app#leadership-coaching',
          name: 'Coaching de Liderazgo',
          description:
            'Para líderes y managers que quieren potenciar su impacto y desarrollar equipos de alto rendimiento',
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
          name: 'Consultoría Organizacional',
          description:
            'Para startups y empresas que necesitan profesionalizar operaciones y adoptar agilidad real',
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
