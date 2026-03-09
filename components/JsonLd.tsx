import { Organization, Person, WebSite, Service } from 'schema-dts'

export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://coaching-landing-cyan.vercel.app'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${baseUrl}#person`,
        name: 'Fernando Ferrari',
        jobTitle: 'Agile Coach & Leadership Consultant',
        description: 'Coach de liderazgo y consultoría organizacional con más de 20 años en tecnología',
        url: baseUrl,
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
        '@id': `${baseUrl}#organization`,
        name: 'ELEVA Coaching',
        description: 'Transformando líderes y organizaciones a través del coaching ágil y la consultoría estratégica',
        url: baseUrl,
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
        '@id': `${baseUrl}#website`,
        name: 'ELEVA Coaching',
        description: 'Coaching de liderazgo y consultoría organizacional para líderes tech y startups',
        url: baseUrl,
        inLanguage: 'es',
        isAccessibleForFree: true,
        potentialAction: {
          '@type': 'ReadAction',
          target: baseUrl,
        },
      },
      {
        '@type': 'Service',
        '@id': `${baseUrl}#leadership-coaching`,
        name: 'Coaching de Liderazgo',
        description: 'Para líderes y managers que quieren potenciar su impacto y desarrollar equipos de alto rendimiento',
        provider: {
          '@type': 'Organization',
          '@id': `${baseUrl}#organization`,
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
        '@id': `${baseUrl}#organizational-consulting`,
        name: 'Consultoría Organizacional',
        description: 'Para startups y empresas que necesitan profesionalizar operaciones y adoptar agilidad real',
        provider: {
          '@type': 'Organization',
          '@id': `${baseUrl}#organization`,
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
