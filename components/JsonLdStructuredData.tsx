interface FAQQuestion {
  question: string
  answer: string
}

interface JsonLdData {
  name?: string
  description?: string
  price?: string
  questions?: FAQQuestion[]
  rating?: string
  author?: string
  review?: string
  date?: string
  value?: string | number
  minValue?: string | number
  maxValue?: string | number
  unitText?: string
  unitCode?: string
  valueReference?: {
    name?: string
    value?: string | number
    unitText?: string
  }
  [key: string]: unknown
}

interface JsonLdStructuredDataProps {
  type:
    | 'Organization'
    | 'Service'
    | 'Person'
    | 'WebPage'
    | 'LocalBusiness'
    | 'FAQPage'
    | 'Review'
    | 'AggregateRating'
    | 'ProfessionalService'
    | 'HowTo'
    | 'QuantitativeValue'
  data?: JsonLdData
  pathname?: string
}

export default function JsonLdStructuredData({
  type,
  data = {},
  pathname = '/',
}: JsonLdStructuredDataProps) {
  const getStructuredData = () => {
    const baseUrl = 'https://eleva-consultoria.com'
    const fullUrl = `${baseUrl}${pathname}`

    switch (type) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'ELEVA CONSULTORIA',
          url: baseUrl,
          logo: `${baseUrl}/images/ui/logo.png`,
          description:
            'Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.',
          founder: {
            '@type': 'Person',
            name: 'Fernando Ferrari',
            jobTitle: 'Coach Profesional',
            url: `${baseUrl}/sobre-mi`,
          },
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'Argentina',
            addressRegion: 'Buenos Aires',
          },
          sameAs: [
            'https://www.instagram.com/jago_ff',
            'https://www.linkedin.com/in/fernandolferrari',
          ],
          knowsAbout: [
            'Agile Methodologies',
            'Coaching de Liderazgo',
            'Consultoría Organizacional',
            'Desarrollo de Equipos',
            'Cultura Organizacional',
            'OKR Implementation',
            'Scrum',
            'Management 3.0',
            'Remote Team Management',
            'Startups',
            'Tech Leadership',
            'Transformación Digital',
          ],
          category: [
            'Business Consulting',
            'Executive Coaching',
            'Agile Transformation',
            'Organizational Development',
          ],
          services: [
            'Coaching de Liderazgo',
            'Consultoría Organizacional',
            'Coaching para Startups',
            'Desarrollo de Equipos',
            'Cultura Organizacional',
          ],
        }

      case 'Service':
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: data.name,
          description: data.description,
          provider: {
            '@type': 'Organization',
            name: 'ELEVA CONSULTORIA',
            url: baseUrl,
          },
          serviceType: 'Professional Coaching',
          category: 'Business Consulting',
          offers: {
            '@type': 'Offer',
            description: 'Sesiones de coaching personalizadas para líderes y equipos',
            availability: 'https://schema.org/InStock',
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'ARS',
              price: data.price || 'A consultar',
            },
          },
          areaServed: {
            '@type': 'Country',
            name: 'Argentina',
          },
        }

      case 'Person':
        return {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Fernando Ferrari',
          jobTitle: 'Coach Profesional',
          description:
            'Coach profesional especializado en liderazgo tech y consultoría organizacional con más de 10 años de experiencia ayudando a líderes y startups a alcanzar su máximo potencial.',
          url: `${baseUrl}/sobre-mi`,
          image: `${baseUrl}/images/ui/profile.png`,
          sameAs: [
            'https://www.instagram.com/eleva_consultoria',
            'https://www.linkedin.com/in/fernandoferrari',
            'https://twitter.com/eleva_consultoria',
          ],
          worksFor: {
            '@type': 'Organization',
            name: 'ELEVA CONSULTORIA',
          },
          alumniOf: [
            {
              '@type': 'EducationalOccupationalCredential',
              name: 'Advanced Certified ScrumMaster (A-CSM)',
            },
            {
              '@type': 'EducationalOccupationalCredential',
              name: 'Advanced Certified Scrum Product Owner (A-CSPO)',
            },
            { '@type': 'EducationalOccupationalCredential', name: 'Management 3.0' },
          ],
          hasCredential: [
            {
              '@type': 'EducationalOccupationalCredential',
              name: 'Advanced Certified ScrumMaster (A-CSM)',
            },
            {
              '@type': 'EducationalOccupationalCredential',
              name: 'Advanced Certified Scrum Product Owner (A-CSPO)',
            },
            { '@type': 'EducationalOccupationalCredential', name: 'Management 3.0' },
          ],
          knowsAbout: [
            'Coaching de Liderazgo',
            'Consultoría Organizacional',
            'Desarrollo de Equipos',
            'Cultura Organizacional',
            'Agile Methodologies',
            'OKR Implementation',
            'Scrum',
            'Startups',
            'Tech Leadership',
            'Transformación Digital',
          ],
          offers: {
            '@type': 'Offer',
            serviceType: 'Professional Coaching',
            description: 'Coaching individual y organizacional para líderes tech',
          },
        }

      case 'WebPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: data.title,
          description: data.description,
          url: fullUrl,
          isPartOf: {
            '@type': 'WebSite',
            name: 'ELEVA CONSULTORIA',
            url: baseUrl,
          },
          inLanguage: 'es',
          isAccessibleForFree: true,
          dateModified: '2025-04-01T00:00:00.000Z',
          breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Inicio',
                item: baseUrl,
              },
              ...(pathname !== '/'
                ? [
                    {
                      '@type': 'ListItem',
                      position: 2,
                      name: data.breadcrumb || pathname.replace('/', ''),
                      item: fullUrl,
                    },
                  ]
                : []),
            ],
          },
        }

      case 'LocalBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'ELEVA CONSULTORIA',
          url: baseUrl,
          logo: `${baseUrl}/images/ui/logo.png`,
          description:
            'Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.',
          founder: {
            '@type': 'Person',
            name: 'Fernando Ferrari',
            jobTitle: 'Coach Profesional',
            url: `${baseUrl}/sobre-mi`,
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+54-9-11-1234-5678',
            contactType: 'consulting',
            availableLanguage: ['Spanish', 'English'],
          },
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'Argentina',
            addressRegion: 'Buenos Aires',
          },
          geo: {
            '@type': 'GeoCoordinates',
            addressCountry: 'Argentina',
            addressRegion: 'Buenos Aires',
          },
          openingHours: ['Mo-Fr 09:00-18:00', 'Sa-Su Closed'],
          paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
          priceRange: '$$',
          sameAs: ['https://instagram.com/jago_ff'],
          services: [
            'Coaching de Liderazgo',
            'Consultoría Organizacional',
            'Coaching para Startups',
            'Desarrollo de Equipos',
            'Cultura Organizacional',
          ],
        }

      case 'FAQPage':
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity:
            data.questions?.map((faq, index) => ({
              '@type': 'Question',
              position: index + 1,
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })) || [],
        }

      case 'Review':
        return {
          '@context': 'https://schema.org',
          '@type': 'Review',
          itemReviewed: {
            '@type': 'Service',
            name: 'Coaching y Consultoría Organizacional',
            provider: {
              '@type': 'Organization',
              name: 'ELEVA CONSULTORIA',
              url: baseUrl,
            },
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: data.rating || '5',
            bestRating: '5',
            worstRating: '1',
          },
          author: {
            '@type': 'Person',
            name: data.author,
          },
          reviewBody: data.review,
          datePublished: data.date || '2025-04-01T00:00:00.000Z',
          publisher: {
            '@type': 'Organization',
            name: 'ELEVA CONSULTORIA',
          },
        }

      case 'AggregateRating':
        return {
          '@context': 'https://schema.org',
          '@type': 'AggregateRating',
          itemReviewed: {
            '@type': 'ProfessionalService',
            name: 'ELEVA CONSULTORIA',
            url: baseUrl,
            description: 'Coaching y consultoría organizacional para líderes tech y startups',
          },
          ratingValue: data.rating || '5',
          bestRating: '5',
          worstRating: '1',
          ratingCount: data.value || '15',
          reviewCount: data.value || '15',
        }

      case 'ProfessionalService':
        return {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Agile Leadership Coaching',
          description:
            'Coaching especializado para construir equipos autónomos y procesos escalables en empresas tecnológicas',
          provider: {
            '@type': 'Person',
            name: 'Fernando Ferrari',
            jobTitle: 'Agile Coach & Leadership Consultant',
            experience: '20+ years in technology leadership',
            alumniOf: [
              'Advanced Certified ScrumMaster',
              'Advanced Certified Scrum Product Owner',
              'Management 3.0',
            ],
            knowsAbout: [
              'Agile Methodologies',
              'Team Autonomy',
              'OKR Implementation',
              'Remote Team Management',
              'Cultural Transformation',
              'Process Scaling',
            ],
          },
          serviceType: 'Leadership Development',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Coaching Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Team Autonomy Coaching',
                  description: 'Process to build self-managing tech teams in 12 weeks',
                  serviceOutput: {
                    '@type': 'QuantitativeValue',
                    name: 'Team Autonomy Score',
                    minValue: 0,
                    maxValue: 100,
                    unitText: 'points',
                  },
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Process Scaling Consulting',
                  description: 'Scale agile processes from 4 to 2500+ team members',
                  serviceOutput: {
                    '@type': 'QuantitativeValue',
                    name: 'Process Efficiency',
                    minValue: 0,
                    maxValue: 100,
                    unitText: 'percentage',
                  },
                },
              },
            ],
          },
          areaServed: {
            '@type': 'Country',
            name: 'Argentina',
          },
          availableChannel: {
            '@type': 'ServiceChannel',
            serviceUrl: `${baseUrl}/#contacto`,
            availableLanguage: ['Spanish', 'English'],
          },
        }

      case 'HowTo':
        return {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: data.name || 'Cómo construir equipos autónomos',
          description:
            data.description ||
            'Proceso step-by-step para desarrollar equipos tecnológicos autónomos y autosuficientes',
          image: `${baseUrl}/images/about/team-autonomy-process.png`,
          totalTime: 'P12W',
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: 'ARS',
            value: 'A consultar',
          },
          supply: [
            {
              '@type': 'HowToSupply',
              name: 'Assessment Tools',
            },
            {
              '@type': 'HowToSupply',
              name: 'Agile Frameworks',
            },
            {
              '@type': 'HowToSupply',
              name: 'OKR Templates',
            },
          ],
          tool: [
            {
              '@type': 'HowToTool',
              name: 'Jira',
            },
            {
              '@type': 'HowToTool',
              name: 'Slack',
            },
            {
              '@type': 'HowToTool',
              name: 'Notion',
            },
          ],
          step: data.steps || [
            {
              '@type': 'HowToStep',
              name: 'Phase 1: Team Assessment',
              text: 'Evaluate current team autonomy level and identify bottlenecks',
              url: `${baseUrl}/servicios#assessment`,
              timeNeeded: 'P2W',
            },
            {
              '@type': 'HowToStep',
              name: 'Phase 2: Framework Implementation',
              text: 'Implement agile frameworks and autonomy protocols',
              url: `${baseUrl}/servicios#implementation`,
              timeNeeded: 'P4W',
            },
            {
              '@type': 'HowToStep',
              name: 'Phase 3: Autonomy Scaling',
              text: 'Scale autonomy practices and measure results',
              url: `${baseUrl}/servicios#scaling`,
              timeNeeded: 'P6W',
            },
          ],
        }

      case 'QuantitativeValue':
        return {
          '@context': 'https://schema.org',
          '@type': 'QuantitativeValue',
          name: data.name,
          value: data.value,
          minValue: data.minValue,
          maxValue: data.maxValue,
          unitText: data.unitText,
          unitCode: data.unitCode,
          valueReference: data.valueReference
            ? {
                '@type': 'QuantitativeValue',
                name: data.valueReference.name,
                value: data.valueReference.value,
                unitText: data.valueReference.unitText,
              }
            : undefined,
        }

      default:
        return {}
    }
  }

  const structuredData = getStructuredData()

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
