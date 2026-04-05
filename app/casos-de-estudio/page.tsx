import { Metadata } from 'next'
import CaseStudies from '@/components/sections/CaseStudies'
import Clients from '@/components/sections/Clients'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import WhatsAppBooking from '@/components/WhatsAppBooking'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Casos de Estudio | ELEVA CONSULTORIA',
  description:
    'Transformaciones reales de equipos y organizaciones. Descubrí cómo líderes tech y startups aplicaron nuestra metodología para escalar sus equipos y procesos.',
  keywords:
    'casos de estudio, coaching éxito, consultoría resultados, transformación agile, éxito startups, liderazgo casos reales',
  openGraph: {
    title: 'Casos de Estudio | ELEVA CONSULTORIA',
    description:
      'Transformaciones reales de equipos y organizaciones. Descubrí cómo líderes tech y startups aplicaron nuestra metodología.',
    type: 'website',
    locale: 'es_AR',
    url: 'https://eleva-consultoria.com/casos-de-estudio',
    images: [
      {
        url: 'https://eleva-consultoria.com/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Casos de Estudio | ELEVA CONSULTORIA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casos de Estudio | ELEVA CONSULTORIA',
    description:
      'Transformaciones reales de equipos y organizaciones. Descubrí cómo líderes tech y startups aplicaron nuestra metodología.',
    images: ['https://eleva-consultoria.com/opengraph-image.png'],
    site: '@eleva_consultoria',
    creator: '@eleva_consultoria',
  },
  alternates: {
    canonical: 'https://eleva-consultoria.com/casos-de-estudio',
    languages: {
      es: 'https://eleva-consultoria.com/casos-de-estudio',
      en: 'https://eleva-consultoria.com/en/case-studies',
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f0f0f',
  colorScheme: 'dark',
}

export default function CaseStudiesPage() {
  return (
    <main>
      <CaseStudies />
      <Clients />
      <Contact />
      <Footer />
      <WhatsAppBooking />
    </main>
  )
}
