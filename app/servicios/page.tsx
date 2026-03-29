import { Metadata } from "next";
import HeroServer from "@/components/sections/HeroServer";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Results from "@/components/sections/Results";
import CaseStudies from "@/components/sections/CaseStudies";
import Pricing from "@/components/sections/Pricing";
import Clients from "@/components/sections/Clients";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppBooking from "@/components/WhatsAppBooking";
import JsonLdStructuredData from "@/components/JsonLdStructuredData";

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: "Servicios de Coaching y Consultoría | ELEVA CONSULTORIA",
  description: "Servicios especializados en coaching de liderazgo, consultoría agile y transformación organizacional para equipos tech y startups.",
  keywords: ["servicios coaching", "consultoría agile", "coaching liderazgo", "transformación organizacional", "servicios consultoría", "coaching equipos"],
  authors: [{ name: "Fernando Ferrari" }],
  openGraph: {
    title: "Servicios de Coaching y Consultoría | ELEVA CONSULTORIA",
    description: "Descubrí nuestros servicios de coaching de liderazgo y consultoría agile para transformar tu equipo tech.",
    type: "website",
    locale: "es_AR",
    url: "https://eleva-consultoria.com/servicios",
    images: [
      {
        url: "https://eleva-consultoria.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Servicios de Coaching y Consultoría | ELEVA CONSULTORIA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios de Coaching y Consultoría | ELEVA CONSULTORIA",
    description: "Descubrí nuestros servicios de coaching de liderazgo y consultoría agile para transformar tu equipo tech.",
    images: ["https://eleva-consultoria.com/opengraph-image.png"],
    site: "@eleva_consultoria",
    creator: "@eleva_consultoria",
  },
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
        type="ProfessionalService" 
        data={{ 
          name: "Agile Leadership Coaching Services",
          description: "Coaching especializado para construir equipos autónomos y procesos escalables en empresas tecnológicas"
        }} 
        pathname="/servicios"
      />
      <JsonLdStructuredData 
        type="HowTo" 
        data={{ 
          name: "Cómo implementar equipos autónomos",
          description: "Proceso completo de 12 semanas para desarrollar equipos tecnológicos autosuficientes",
          steps: [
            {
              "@type": "HowToStep",
              "name": "Assessment Phase",
              "text": "Evaluate current team autonomy and identify improvement areas",
              "timeNeeded": "P2W",
              "tool": ["Team Assessment Matrix", "Autonomy Scorecard"]
            },
            {
              "@type": "HowToStep", 
              "name": "Framework Implementation",
              "text": "Implement agile frameworks and autonomy protocols",
              "timeNeeded": "P4W",
              "tool": ["OKR Templates", "Agile Ceremonies", "Decision Matrix"]
            },
            {
              "@type": "HowToStep",
              "name": "Scaling Phase", 
              "text": "Scale autonomy practices and measure ROI",
              "timeNeeded": "P6W",
              "tool": ["Metrics Dashboard", "ROI Calculator", "Process Automation"]
            }
          ]
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
        <HeroServer pathname="/servicios" />
        <Services />
        <Process />
        <Results />
        <CaseStudies />
        <Pricing />
        <Clients />
        <Contact />
        <Footer />
        <WhatsAppBooking />
      </main>
    </>
  );
}
