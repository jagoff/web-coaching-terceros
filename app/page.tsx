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
  ScrollProgress,
  SmoothScroll,
  WhatsAppButton,
} from "@/components/DynamicSections";

export default function Home() {
  return (
    <SmoothScroll>
      <ScrollProgress />
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
      </main>
      <Footer />
      <WhatsAppButton />
    </SmoothScroll>
  );
}
