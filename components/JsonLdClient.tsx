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
          '@id': 'https://eleva-consultoria.com#person',
          name: 'Fernando Ferrari',
          jobTitle: 'Agile Coach & Leadership Consultant',
          description: language === 'es' 
            ? 'Coach de liderazgo y transformación organizacional con más de 20 años en tecnología'
            : 'Leadership and organizational transformation coach with over 20 years in technology',
          url: 'https://eleva-consultoria.com',
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
          '@id': 'https://eleva-consultoria.com#organization',
          name: 'ELEVA CONSULTORIA',
          description: language === 'es'
            ? 'Transformando líderes y organizaciones a través del coaching estratégico y liderazgo ágil'
            : 'Transforming leaders and organizations through strategic coaching and agile leadership',
          url: 'https://eleva-consultoria.com',
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
          '@id': 'https://eleva-consultoria.com#website',
          name: 'ELEVA CONSULTORIA',
          description: language === 'es'
            ? 'Coaching de liderazgo y transformación organizacional para líderes tech y startups'
            : 'Leadership coaching and organizational transformation for tech leaders and startups',
          url: 'https://eleva-consultoria.com',
          inLanguage: language,
          isAccessibleForFree: true,
          potentialAction: {
            '@type': 'ReadAction',
            target: 'https://eleva-consultoria.com',
          },
        },
        {
          '@type': 'Service',
          '@id': 'https://eleva-consultoria.com#leadership-coaching',
          name: language === 'es' ? 'Coaching de Liderazgo' : 'Leadership Coaching',
          description: language === 'es'
            ? 'Para líderes y managers que quieren potenciar su impacto y desarrollar equipos de alto rendimiento'
            : 'For leaders and managers who want to enhance their impact and develop high-performance teams',
          provider: {
            '@type': 'Organization',
            '@id': 'https://eleva-consultoria.com#organization',
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
          '@id': 'https://eleva-consultoria.com#organizational-consulting',
          name: language === 'es' ? 'Coaching Organizacional' : 'Organizational Consulting',
          description: language === 'es'
            ? 'Para startups y empresas que necesitan profesionalizar operaciones y adoptar agilidad real'
            : 'For startups and companies that need to professionalize operations and adopt real agility',
          provider: {
            '@type': 'Organization',
            '@id': 'https://eleva-consultoria.com#organization',
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
        {
          '@type': 'Review',
          '@id': 'https://eleva-consultoria.com#review-1',
          itemReviewed: {
            '@type': 'Service',
            name: language === 'es' ? 'Coaching de Liderazgo' : 'Leadership Coaching',
            provider: {
              '@type': 'Organization',
              '@id': 'https://eleva-consultoria.com#organization',
            },
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
            worstRating: '1',
          },
          author: {
            '@type': 'Person',
            name: 'Valentin Rios',
            jobTitle: 'Software Engineer',
          },
          reviewBody: language === 'es'
            ? 'Lo que más me impactó fue que Fernando no llegó con soluciones pre-armadas. Primero escuchó, observó nuestras reuniones, y recién entonces dijo: "Veo que el problema no es técnico, es de comunicación". En dos semanas nuestras daily meetings pasaron de 45 minutos a 15.'
            : 'What impressed me most was that Fernando didn\'t come with pre-made solutions. First he listened, observed our meetings, and only then said: "I see the problem isn\'t technical, it\'s communication". In two weeks our daily meetings went from 45 minutes to 15.',
          datePublished: '2024-01-15',
        },
        {
          '@type': 'Review',
          '@id': 'https://eleva-consultoria.com#review-2',
          itemReviewed: {
            '@type': 'Service',
            name: language === 'es' ? 'Coaching Organizacional' : 'Organizational Consulting',
            provider: {
              '@type': 'Organization',
              '@id': 'https://eleva-consultoria.com#organization',
            },
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
            worstRating: '1',
          },
          author: {
            '@type': 'Person',
            name: 'George Nicolaou',
            jobTitle: 'Project Manager',
          },
          reviewBody: language === 'es'
            ? 'En nuestra primera reunión, Fernando me dijo: "Pará, no me digas lo que querés construir, decime qué problema estás resolviendo". Nadie me había hecho esa pregunta antes. Empezamos a definir user stories reales, estimar con puntos, y de repente el cliente dejó de cambiar el alcance cada dos días.'
            : 'In our first meeting, Fernando told me: "Stop, don\'t tell me what you want to build, tell me what problem you\'re solving". No one had asked me that question before. We started defining real user stories, estimating with points, and suddenly the client stopped changing scope every two days.',
          datePublished: '2024-02-20',
        },
        {
          '@type': 'Review',
          '@id': 'https://eleva-consultoria.com#review-3',
          itemReviewed: {
            '@type': 'Service',
            name: language === 'es' ? 'Coaching Organizacional' : 'Organizational Consulting',
            provider: {
              '@type': 'Organization',
              '@id': 'https://eleva-consultoria.com#organization',
            },
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
            worstRating: '1',
          },
          author: {
            '@type': 'Person',
            name: 'Gabriel Yesuron',
            jobTitle: 'Software Developer',
          },
          reviewBody: language === 'es'
            ? 'Yo era dev junior y me tocaba hacer tareas sin entender el porqué. Fernando implementó retrospectivas cada dos semanas. La primera fue incómoda, nadie hablaba. Para la tercera, el más silencioso del equipo dijo: "¿Por qué no automatizamos este deploy que nos lleva 4 horas?". Hoy lo hacemos en 5 minutos.'
            : 'I was a junior dev and had to do tasks without understanding why. Fernando implemented retrospectives every two weeks. The first was uncomfortable, nobody spoke. By the third, the quietest person on the team said: "Why don\'t we automate this deployment that takes us 4 hours?". Today we do it in 5 minutes.',
          datePublished: '2024-03-10',
        },
        {
          '@type': 'AggregateRating',
          '@id': 'https://eleva-consultoria.com#aggregate-rating',
          itemReviewed: {
            '@type': 'Service',
            name: language === 'es' ? 'Coaching y Consultoría Organizacional' : 'Leadership Coaching and Organizational Consulting',
            provider: {
              '@type': 'Organization',
              '@id': 'https://eleva-consultoria.com#organization',
            },
          },
          ratingValue: '5',
          reviewCount: '3',
          bestRating: '5',
          worstRating: '1',
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
