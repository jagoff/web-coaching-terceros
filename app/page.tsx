import { Users, Target, TrendingUp, Zap } from "lucide-react";
import ClientLayout from "@/components/ClientLayout";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroServer from "@/components/sections/HeroServer";
import Clients from "@/components/sections/Clients";
import ForWho from "@/components/sections/ForWho";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Results from "@/components/sections/Results";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

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
    <>
      <ClientLayout>
        <WhatsAppButton />
        <main>
          <HeroServer pathname="/" />
          <Clients />
          <ForWho />
          <Services />
          <About />
          <Process />
          <Results />
          <Testimonials />
          <Pricing />
          <FAQ />
          <Contact />
          <WhatsAppButton />
        </main>
      </ClientLayout>
    </>
  );
}
