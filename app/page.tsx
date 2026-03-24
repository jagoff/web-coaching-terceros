'use client'

import {
  HeroAdaptive,
  About,
  ServicesAdaptive,
  Process,
  Testimonials,
  Pricing,
  FAQ,
  Contact,
  Footer,
  CaseStudies,
} from '@/components/PageSectionsAdaptive'
import dynamic from 'next/dynamic'
import ProactiveCTA from '@/components/ProactiveCTA'

const WhatsAppBooking = dynamic(() => import('@/components/WhatsAppBooking'), {
  ssr: false,
  loading: () => null,
})

export default function Home() {
  return (
    <main aria-label="Contenido principal de ELEVA CONSULTORA">
      <HeroAdaptive />
      <About />
      <ServicesAdaptive />
      <Process />
      <Testimonials />
      <CaseStudies />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppBooking />
      <ProactiveCTA trigger="exit_intent" />
      <ProactiveCTA trigger="scroll_depth" />
      <ProactiveCTA trigger="time_based" />
    </main>
  )
}
