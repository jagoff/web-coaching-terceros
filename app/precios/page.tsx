import { Metadata } from "next";
import HeroServer from "@/components/sections/HeroServer";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppBooking from "@/components/WhatsAppBooking";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Precios | Planes de Coaching | ELEVA CONSULTORIA",
  description: "Planes de coaching y consultoría adaptados a líderes tech y startups. Sesiones individuales, programas continuos y consultoría organizacional. Inversión en tu crecimiento profesional.",
  keywords: ["precios coaching", "costo coaching", "planes coaching", "tarifas consultoría", "inversión liderazgo", "coaching Argentina"],
  authors: [{ name: "Fernando Ferrari" }],
  openGraph: {
    title: "Precios | Planes de Coaching | ELEVA CONSULTORIA",
    description: "Planes de coaching y consultoría adaptados a líderes tech y startups. Inversión en tu crecimiento profesional y organizacional.",
    type: "website",
    locale: "es_ES",
    url: "https://eleva-consultoria.com/precios",
  },
  twitter: {
    card: "summary_large_image",
    title: "Precios | Planes de Coaching | ELEVA CONSULTORIA",
    description: "Planes de coaching y consultoría adaptados a líderes tech y startups.",
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
