import dynamicImport from 'next/dynamic';
import HeroServer from "@/components/sections/HeroServer";
import {
  About,
  Services,
  Process,
  Footer,
} from "@/components/PageSections";
import JsonLdStructuredData from "@/components/JsonLdStructuredData";
import { Metadata } from "next";

// Lazy load componentes below-the-fold para mejor performance
const Testimonials = dynamicImport(() => import("@/components/sections/TestimonialsSimple"), {
  loading: () => <div className="min-h-[400px]" />,
});
const Results = dynamicImport(() => import("@/components/PageSections").then(mod => ({ default: mod.Results })), {
  loading: () => <div className="min-h-[400px]" />,
});
const CaseStudies = dynamicImport(() => import("@/components/PageSections").then(mod => ({ default: mod.CaseStudies })), {
  loading: () => <div className="min-h-[400px]" />,
});
const Pricing = dynamicImport(() => import("@/components/PageSections").then(mod => ({ default: mod.Pricing })), {
  loading: () => <div className="min-h-[400px]" />,
});
const FAQ = dynamicImport(() => import("@/components/PageSections").then(mod => ({ default: mod.FAQ })), {
  loading: () => <div className="min-h-[400px]" />,
});
const Clients = dynamicImport(() => import("@/components/sections/Clients"), {
  loading: () => <div className="min-h-[300px]" />,
});
const Contact = dynamicImport(() => import("@/components/PageSections").then(mod => ({ default: mod.Contact })), {
  loading: () => <div className="min-h-[500px]" />,
});
const WhatsAppBooking = dynamicImport(() => import("@/components/WhatsAppBooking"), {
  ssr: true,
});

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: "ELEVA CONSULTORIA | Coaching & Consultoría Organizacional",
  description: "Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.",
  keywords: ["coaching", "consultoría", "liderazgo", "tech", "startups", "organizacional", "equipos", "procesos", "cultura"],
  authors: [{ name: "Fernando Ferrari" }],
  openGraph: {
    title: "ELEVA CONSULTORIA | Coaching & Consultoría Organizacional",
    description: "Coaching y consultoría organizacional para líderes tech y startups",
    type: "website",
    locale: "es_ES",
    url: "https://eleva-consultoria.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "ELEVA CONSULTORIA | Coaching & Consultoría Organizacional",
    description: "Coaching y consultoría organizacional para líderes tech y startups",
  },
  alternates: {
    canonical: "https://eleva-consultoria.com",
    languages: {
      'es': 'https://eleva-consultoria.com',
      'en': 'https://eleva-consultoria.com/en',
    },
  },
};

export default function Home() {
  return (
    <>
      <JsonLdStructuredData 
        type="LocalBusiness" 
        pathname="/"
      />
      <JsonLdStructuredData 
        type="WebPage" 
        data={{ 
          title: "ELEVA CONSULTORIA | Coaching & Consultoría Organizacional",
          description: "Coaching y consultoría organizacional para líderes tech y startups.",
          breadcrumb: "Inicio"
        }} 
        pathname="/" 
      />
      <main>
        <HeroServer pathname="/" />
        <About />
        <Services />
        <Process />
        <Testimonials />
        <Results />
        <CaseStudies />
        <Pricing />
        <FAQ />
        <Clients />
        <Contact />
        <Footer />
        <WhatsAppBooking />
      </main>
    </>
  );
}
