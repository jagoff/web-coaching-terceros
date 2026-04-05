import { Metadata } from 'next'
import HeroServer from '@/components/sections/HeroServer'
import About from '@/components/sections/About'
import Testimonials from '@/components/sections/TestimonialsSimple'
import Clients from '@/components/sections/Clients'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import WhatsAppBooking from '@/components/WhatsAppBooking'
import JsonLdStructuredData from '@/components/JsonLdStructuredData'

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: 'Sobre Mí | Fernando Ferrari | ELEVA CONSULTORIA',
  description:
    'Conoce a Fernando Ferrari, coach profesional especializado en liderazgo tech y consultoría organizacional. Más de 10 años ayudando a líderes y startups a alcanzar su máximo potencial.',
  keywords: [
    'Fernando Ferrari',
    'coach profesional',
    'liderazgo tech',
    'consultoría organizacional',
    'coaching Argentina',
    'biografía coach',
  ],
  authors: [{ name: 'Fernando Ferrari' }],
  openGraph: {
    title: 'Sobre Mí | Fernando Ferrari | ELEVA CONSULTORIA',
    description:
      'Conoce a Fernando Ferrari, coach profesional especializado en liderazgo tech y consultoría organizacional.',
    type: 'profile',
    locale: 'es_ES',
    url: 'https://eleva-consultoria.com/sobre-mi',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Mí | Fernando Ferrari | ELEVA CONSULTORIA',
    description:
      'Conoce a Fernando Ferrari, coach profesional especializado en liderazgo tech y consultoría organizacional.',
  },
  alternates: {
    canonical: 'https://eleva-consultoria.com/sobre-mi',
    languages: {
      es: 'https://eleva-consultoria.com/sobre-mi',
      en: 'https://eleva-consultoria.com/en/about',
    },
  },
}

export default function SobreMiPage() {
  return (
    <>
      <JsonLdStructuredData
        type="Person"
        data={{
          title: 'Sobre Mí | Fernando Ferrari | ELEVA CONSULTORIA',
          description:
            'Conoce a Fernando Ferrari, coach profesional especializado en liderazgo tech y consultoría organizacional.',
          breadcrumb: 'Sobre Mí',
        }}
        pathname="/sobre-mi"
      />
      <JsonLdStructuredData
        type="WebPage"
        data={{
          title: 'Sobre Mí | Fernando Ferrari | ELEVA CONSULTORIA',
          description:
            'Conoce a Fernando Ferrari, coach profesional especializado en liderazgo tech y consultoría organizacional.',
          breadcrumb: 'Sobre Mí',
        }}
        pathname="/sobre-mi"
      />
      <main>
        <HeroServer pathname="/sobre-mi" />
        <About />
        <Testimonials />
        <Clients />
        <Contact />
        <Footer />
        <WhatsAppBooking />
      </main>
    </>
  )
}
