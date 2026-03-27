import { Metadata } from "next";
import HeroServer from "@/components/sections/HeroServer";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppBooking from "@/components/WhatsAppBooking";

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: "Precios y Planes | Coaching y Consultoría | ELEVA CONSULTORIA",
  description: "Planes de coaching y consultoría adaptados a tu necesidad. Sesiones individuales, transformación de equipos y acompañamiento organizacional.",
  keywords: ["precios coaching", "planes consultoría", "costo coaching", "tarifas consultoría", "precios liderazgo", "coaching Argentina"],
  authors: [{ name: "Fernando Ferrari" }],
  openGraph: {
    title: "Precios y Planes | Coaching y Consultoría | ELEVA CONSULTORIA",
    description: "Conocé nuestros planes de coaching y consultoría para líderes tech y startups.",
    type: "website",
    locale: "es_AR",
    url: "https://eleva-consultoria.com/precios",
    images: [
      {
        url: "https://eleva-consultoria.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Precios y Planes | Coaching y Consultoría | ELEVA CONSULTORIA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Precios y Planes | Coaching y Consultoría | ELEVA CONSULTORIA",
    description: "Conocé nuestros planes de coaching y consultoría para líderes tech y startups.",
    images: ["https://eleva-consultoria.com/opengraph-image.png"],
    site: "@eleva_consultoria",
    creator: "@eleva_consultoria",
  },
  alternates: {
    canonical: "https://eleva-consultoria.com/precios",
    languages: {
      'es': 'https://eleva-consultoria.com/precios',
      'en': 'https://eleva-consultoria.com/en/pricing',
    },
  },
};

export default function PreciosPage() {
  return (
    <main>
      <HeroServer pathname="/precios" />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppBooking />
    </main>
  );
}
