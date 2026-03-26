import { Metadata } from "next";
import HeroServer from "@/components/sections/HeroServer";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppBooking from "@/components/WhatsAppBooking";
import SEOHelmet from "@/components/SEOHelmet";

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: "Precios y Planes | Coaching y Consultoría | ELEVA CONSULTORIA",
  description: "Planes de coaching y consultoría adaptados a tu necesidad. Sesiones individuales, transformación de equipos y acompañamiento organizacional.",
  keywords: ["precios coaching", "planes consultoría", "costo coaching", "tarifas consultoría", "precios liderazgo", "coaching Argentina"],
  authors: [{ name: "Fernando Ferrari" }],
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
      <SEOHelmet pathname="/precios" />
      <HeroServer pathname="/precios" />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppBooking />
    </main>
  );
}
