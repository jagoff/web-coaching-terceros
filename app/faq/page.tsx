import { Metadata } from "next";
import HeroServer from "@/components/sections/HeroServer";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppBooking from "@/components/WhatsAppBooking";
import SEOHelmet from "@/components/SEOHelmet";

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | FAQ Coaching | ELEVA CONSULTORIA",
  description: "Respuestas a las preguntas más frecuentes sobre nuestros servicios de coaching y consultoría. Todo lo que necesitas saber sobre nuestro proceso, metodología y resultados.",
  keywords: ["FAQ coaching", "preguntas frecuentes", "dudas coaching", "metodología coaching", "proceso consultoría", "coaching Argentina"],
  authors: [{ name: "Fernando Ferrari" }],
  openGraph: {
    title: "Preguntas Frecuentes | FAQ Coaching | ELEVA CONSULTORIA",
    description: "Respuestas a las preguntas más frecuentes sobre nuestros servicios de coaching y consultoría organizacional.",
    type: "website",
    locale: "es_ES",
    url: "https://eleva-consultoria.com/faq",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preguntas Frecuentes | FAQ Coaching | ELEVA CONSULTORIA",
    description: "Respuestas a las preguntas más frecuentes sobre nuestros servicios de coaching y consultoría.",
  },
  alternates: {
    canonical: "https://eleva-consultoria.com/faq",
    languages: {
      'es': 'https://eleva-consultoria.com/faq',
      'en': 'https://eleva-consultoria.com/en/faq',
    },
  },
};

export default function FAQPage() {
  return (
    <main>
      <SEOHelmet pathname="/faq" />
      <HeroServer pathname="/faq" />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppBooking />
    </main>
  );
}
