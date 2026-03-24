'use client'

import {
  Hero,
  Services,
  Process,
  Testimonials,
  Pricing,
  FAQ,
  Contact,
  Footer,
  CaseStudies,
} from '@/components/PageSections'
import dynamic from 'next/dynamic'
import WhatsAppBooking from '@/components/WhatsAppBooking'

const About = dynamic(() => import('@/components/sections/About'), {
  ssr: false,
  loading: () => (
    <section className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-center">
        <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
      </div>
    </section>
  )
})

export default function Home() {
  return (
    <main aria-label="Contenido principal de ELEVA CONSULTORA">
      <Hero />
      <About />
      <Services />
      <Process />
      <Testimonials />
      <CaseStudies />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppBooking />
    </main>
  )
}
