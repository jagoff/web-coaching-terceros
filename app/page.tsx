import HeroServer from "@/components/sections/HeroServer";
import {
  About,
  Services,
  Process,
  Results,
  Pricing,
  FAQ,
  Contact,
  ForWho,
  Clients,
} from "@/components/PageSections";
import Testimonials from "@/components/sections/TestimonialsSimple";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLdStructuredData from "@/components/JsonLdStructuredData";
import { Metadata } from "next";

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
    <div style={{ padding: '2rem', textAlign: 'center', minHeight: '100vh' }}>
      <h1>Página de Prueba Mínima</h1>
      <p>Si esto funciona, el problema está en los componentes.</p>
      <p>Si esto sigue en loop, el problema es más profundo.</p>
    </div>
  );
}
