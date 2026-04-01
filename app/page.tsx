import dynamicImport from 'next/dynamic';
import HeroServer from "@/components/sections/HeroServer";

// Split into individual imports for better code splitting
const About = dynamicImport(() => import("@/components/sections/About"), {
  loading: () => <LoadingSkeleton />,
});
const Services = dynamicImport(() => import("@/components/sections/Services"), {
  loading: () => <LoadingSkeleton />,
});
const Process = dynamicImport(() => import("@/components/sections/Process"), {
  loading: () => <LoadingSkeleton />,
});
const Footer = dynamicImport(() => import("@/components/sections/Footer"));
import JsonLdStructuredData from "@/components/JsonLdStructuredData";
import { Metadata } from "next";

// Loading skeleton component
const LoadingSkeleton = ({ height = "400px" }: { height?: string }) => (
  <div className="flex items-center justify-center" style={{ minHeight: height }}>
    <div className="animate-pulse text-center">
      <div className="inline-block h-8 w-8 rounded-full border-2 border-gold-primary border-t-transparent animate-spin mb-4" 
           style={{ borderColor: 'var(--gold-primary)', borderTopColor: 'transparent' }} />
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Cargando...</p>
    </div>
  </div>
);

// Aggressive code splitting - defer ALL below-fold components
const Testimonials = dynamicImport(() => import("@/components/sections/TestimonialsSimple"), {
  loading: () => <LoadingSkeleton />,
});
const Results = dynamicImport(() => import("@/components/PageSections").then(mod => ({ default: mod.Results })), {
  loading: () => <LoadingSkeleton />,
});
const CaseStudies = dynamicImport(() => import("@/components/PageSections").then(mod => ({ default: mod.CaseStudies })), {
  loading: () => <LoadingSkeleton />,
});
const Pricing = dynamicImport(() => import("@/components/PageSections").then(mod => ({ default: mod.Pricing })), {
  loading: () => <LoadingSkeleton />,
});
const FAQ = dynamicImport(() => import("@/components/PageSections").then(mod => ({ default: mod.FAQ })), {
  loading: () => <LoadingSkeleton />,
});
const Clients = dynamicImport(() => import("@/components/sections/Clients"), {
  loading: () => <LoadingSkeleton height="300px" />,
});
const Contact = dynamicImport(() => import("@/components/PageSections").then(mod => ({ default: mod.Contact })), {
  loading: () => <LoadingSkeleton height="500px" />,
});
const WhatsAppBooking = dynamicImport(() => import("@/components/WhatsAppBooking"));

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
