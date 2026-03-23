'use client'

import {
  Hero,
  About,
  Services,
  Process,
  Testimonials,
  Results,
  Pricing,
  FAQ,
  Contact,
  CalBooking,
  Footer,
  CaseStudies,
} from '@/components/PageSections'
import WhatsAppBooking from '@/components/WhatsAppBooking'

export default function Home() {
  return (
    <main aria-label="Contenido principal de ELEVA CONSULTORA">
      <Hero />
      <About />
      <Services />
      <Process />
      <Testimonials />
      <Results />
      <CaseStudies />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppBooking />
    </main>
  )
}
