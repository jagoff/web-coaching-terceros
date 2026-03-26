import { Metadata } from "next";
import HeroServer from "@/components/sections/HeroServer";
import Testimonials from "@/components/sections/TestimonialsSimple";
import Results from "@/components/sections/Results";
import CaseStudies from "@/components/sections/CaseStudies";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppBooking from "@/components/WhatsAppBooking";

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: "Testimonios | Casos de Éxito | ELEVA CONSULTORIA",
  description: "Descubre los testimonios de clientes y casos de éxito de nuestro coaching. Líderes tech y startups que han transformado sus equipos y culturas organizacionales.",
  keywords: ["testimonios coaching", "casos de éxito", "coaching liderazgo", "resultados coaching", "clientes satisfechos", "coaching Argentina"],
  authors: [{ name: "Fernando Ferrari" }],
  openGraph: {
    title: "Testimonios | Casos de Éxito | ELEVA CONSULTORIA",
    description: "Descubre los testimonios de clientes y casos de éxito de nuestro coaching profesional.",
    type: "website",
    locale: "es_ES",
    url: "https://eleva-consultoria.com/testimonios",
  },
  twitter: {
    card: "summary_large_image",
    title: "Testimonios | Casos de Éxito | ELEVA CONSULTORIA",
    description: "Descubre los testimonios de clientes y casos de éxito de nuestro coaching profesional.",
  },
  alternates: {
    canonical: "https://eleva-consultoria.com/testimonios",
    languages: {
      'es': 'https://eleva-consultoria.com/testimonios',
      'en': 'https://eleva-consultoria.com/en/testimonials',
    },
  },
};

export default function TestimoniosPage() {
  return (
    <main>
      <HeroServer pathname="/testimonios" />
      <Testimonials />
      <Results />
      <CaseStudies />
      <Contact />
      <Footer />
      <WhatsAppBooking />
    </main>
  );
}
