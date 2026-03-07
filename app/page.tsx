import {
  Hero,
  About,
  Services,
  Process,
  Testimonials,
  Results,
  Pricing,
  Contact,
  Footer,
  ScrollProgress,
  SmoothScroll,
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
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
