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
