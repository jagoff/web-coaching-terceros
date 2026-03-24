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

// Dynamic import for WhatsAppBooking to prevent SSR issues
const WhatsAppBooking = dynamic(() => import('@/components/WhatsAppBooking'), {
  ssr: false,
  loading: () => null // Don't show loading state
})

const About = dynamic(() => import('@/components/sections/About'), {
  ssr: false,
  loading: () => <div>Loading...</div>
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
