import { Metadata } from "next";
import HeroServer from "@/components/sections/HeroServer";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppBooking from "@/components/WhatsAppBooking";
import JsonLdStructuredData from "@/components/JsonLdStructuredData";
import { translations } from "@/lib/translations";

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
    locale: "es_AR",
    url: "https://eleva-consultoria.com/faq",
    images: [
      {
        url: "https://eleva-consultoria.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Preguntas Frecuentes | FAQ Coaching | ELEVA CONSULTORIA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preguntas Frecuentes | FAQ Coaching | ELEVA CONSULTORIA",
    description: "Respuestas a las preguntas más frecuentes sobre nuestros servicios de coaching y consultoría organizacional.",
    images: ["https://eleva-consultoria.com/opengraph-image.png"],
    site: "@eleva_consultoria",
    creator: "@eleva_consultoria",
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
    <>
      <JsonLdStructuredData 
        type="FAQPage" 
        data={{ 
          questions: translations.es.faq.items
        }} 
        pathname="/faq"
      />
      <JsonLdStructuredData 
        type="WebPage" 
        data={{ 
          title: "Preguntas Frecuentes | FAQ Coaching | ELEVA CONSULTORIA",
          description: "Respuestas a las preguntas más frecuentes sobre nuestros servicios de coaching y consultoría.",
          breadcrumb: "FAQ"
        }} 
        pathname="/faq" 
      />
      <main>
        <HeroServer pathname="/faq" />
        <FAQ />
        <Contact />
        <Footer />
        <WhatsAppBooking />
      </main>
    </>
  );
}
