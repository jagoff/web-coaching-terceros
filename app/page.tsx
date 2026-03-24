"use client";

import {
  Hero,
  About,
  Services,
  Process,
  Results,
  Pricing,
  FAQ,
  Contact,
  CalBooking,
  Footer,
  CaseStudies,
} from "@/components/PageSections";
import Testimonials from "@/components/sections/TestimonialsSimple";
import WhatsAppBooking from "@/components/WhatsAppBooking";

export default function Home() {
  return (
    <main>
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
  );
}
