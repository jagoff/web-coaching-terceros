import { Metadata } from "next";
import HeroServer from "@/components/sections/HeroServer";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Results from "@/components/sections/Results";
import CaseStudies from "@/components/sections/CaseStudies";
import Pricing from "@/components/sections/Pricing";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppBooking from "@/components/WhatsAppBooking";
import JsonLdStructuredData from "@/components/JsonLdStructuredData";
import SEOHelmet from "@/components/SEOHelmet";

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: "Servicios de Coaching y Consultoría | ELEVA CONSULTORIA",
  description: "Servicios especializados en coaching de liderazgo, consultoría agile y transformación organizacional para equipos tech y startups.",
  keywords: ["servicios coaching", "consultoría agile", "coaching liderazgo", "transformación organizacional", "servicios consultoría", "coaching equipos"],
  authors: [{ name: "Fernando Ferrari" }],
  alternates: {
    canonical: "https://eleva-consultoria.com/servicios",
    languages: {
      'es': 'https://eleva-consultoria.com/servicios',
      'en': 'https://eleva-consultoria.com/en/services',
    },
  },
};

export default function ServiciosPage() {
  return (
    <>
      <JsonLdStructuredData 
        type="Service" 
        data={{ 
          name: "Servicios de Coaching y Consultoría",
          description: "Servicios especializados en coaching de liderazgo, consultoría agile y transformación organizacional para equipos tech y startups.",
          price: "A consultar",
          breadcrumb: "Servicios"
        }} 
        pathname="/servicios"
      />
      <JsonLdStructuredData 
        type="WebPage" 
        data={{ 
          title: "Servicios de Coaching y Consultoría | ELEVA CONSULTORIA",
          description: "Servicios especializados en coaching de liderazgo, consultoría agile y transformación organizacional.",
          breadcrumb: "Servicios"
        }} 
        pathname="/servicios" 
      />
      <main>
        <SEOHelmet pathname="/servicios" />
        <HeroServer pathname="/servicios" />
        <Services />
        <Process />
        <Results />
        <CaseStudies />
        <Pricing />
        <Contact />
        <Footer />
        <WhatsAppBooking />
      </main>
    </>
  );
}
