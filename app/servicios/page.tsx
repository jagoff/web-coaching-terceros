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

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Servicios de Coaching | Liderazgo Tech | ELEVA CONSULTORIA",
  description: "Servicios profesionales de coaching y consultoría para líderes tech y startups. Coaching de liderazgo, consultoría organizacional, escalamiento de equipos y cultura organizacional.",
  keywords: ["servicios coaching", "coaching liderazgo", "consultoría tech", "coaching startups", "escalar equipos", "cultura organizacional", "coaching Argentina"],
  authors: [{ name: "Fernando Ferrari" }],
  openGraph: {
    title: "Servicios de Coaching | Liderazgo Tech | ELEVA CONSULTORIA",
    description: "Servicios profesionales de coaching y consultoría para líderes tech y startups. Acompañamos a construir equipos que funcionen y culturas donde la gente quiera quedarse.",
    type: "website",
    locale: "es_ES",
    url: "https://eleva-consultoria.com/servicios",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios de Coaching | Liderazgo Tech | ELEVA CONSULTORIA",
    description: "Servicios profesionales de coaching y consultoría para líderes tech y startups.",
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
    <main>
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
  );
}
