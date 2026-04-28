import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/TestimonialsSimple";
import Results from "@/components/sections/Results";
import CaseStudies from "@/components/sections/CaseStudies";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ForWho from "@/components/sections/ForWho";
import WhatsAppBooking from "@/components/WhatsAppBooking";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <ForWho />
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
