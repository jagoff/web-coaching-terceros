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
} from "@/components/DynamicSections";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Process />
      <Testimonials />
      <Results />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
