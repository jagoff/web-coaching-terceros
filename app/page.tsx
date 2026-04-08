import HeroServer from '@/components/sections/HeroServer'
import Clients from '@/components/sections/Clients'
import ForWho from '@/components/sections/ForWho'
import nextDynamic from 'next/dynamic'
import { Metadata } from 'next'

// Dynamic imports for performance optimization
const Services = nextDynamic(() => import('@/components/sections/Services'), {
  loading: () => (
    <section className="section section-dark">
      <div className="container text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    </section>
  ),
})

const About = nextDynamic(() => import('@/components/sections/About'), {
  loading: () => (
    <section className="section">
      <div className="container">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  ),
})

const Process = nextDynamic(() => import('@/components/sections/Process'), {
  loading: () => (
    <section className="section section-dark">
      <div className="container">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  ),
})

const Results = nextDynamic(() => import('@/components/sections/Results'), {
  loading: () => (
    <section className="section">
      <div className="container">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/4 mx-auto mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  ),
})

const Testimonials = nextDynamic(() => import('@/components/sections/TestimonialsSimple'), {
  loading: () => (
    <section className="section section-dark">
      <div className="container">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  ),
})

const Pricing = nextDynamic(() => import('@/components/sections/Pricing'), {
  loading: () => (
    <section className="section">
      <div className="container">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/4 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  ),
})

const FAQ = nextDynamic(() => import('@/components/sections/FAQ'), {
  loading: () => (
    <section className="section section-dark">
      <div className="container">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-16 bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  ),
})

const Contact = nextDynamic(() => import('@/components/sections/Contact'), {
  loading: () => (
    <section className="section">
      <div className="container">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto mb-8"></div>
          <div className="h-96 bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    </section>
  ),
})

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: 'ELEVA CONSULTORIA | Coaching & Consultoría Organizacional',
  description:
    'Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.',
  keywords: [
    'coaching',
    'consultoría',
    'liderazgo',
    'tech',
    'startups',
    'organizacional',
    'equipos',
    'procesos',
    'cultura',
  ],
  authors: [{ name: 'Fernando Ferrari' }],
  openGraph: {
    title: 'ELEVA CONSULTORIA | Coaching & Consultoría Organizacional',
    description: 'Coaching y consultoría organizacional para líderes tech y startups',
    type: 'website',
    locale: 'es_ES',
    url: 'https://eleva-consultoria.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ELEVA CONSULTORIA | Coaching & Consultoría Organizacional',
    description: 'Coaching y consultoría organizacional para líderes tech y startups',
  },
  alternates: {
    canonical: 'https://eleva-consultoria.com',
    languages: {
      es: 'https://eleva-consultoria.com',
      en: 'https://eleva-consultoria.com/en',
    },
  },
}

export default function Home() {
  return (
    <>
      <main>
        <HeroServer pathname="/" />
        <Clients />
        <ForWho />
        <Services />
        <About />
        <Process />
        <Results />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
    </>
  )
}
