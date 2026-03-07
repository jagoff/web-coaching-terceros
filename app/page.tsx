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
} from "@/components/DynamicSections";

export default function Home() {
  return (
    <>
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
    </>
  );
}
