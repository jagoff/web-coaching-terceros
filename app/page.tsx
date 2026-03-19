"use client";

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
} from "@/components/PageSections";
import WhatsAppBooking from "@/components/WhatsAppBooking";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Process />
      <Testimonials />
      <Pricing />
      <Results />
      <CaseStudies />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppBooking />
    </main>
  );
}
