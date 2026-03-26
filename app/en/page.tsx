import HeroServer from "@/components/sections/HeroServer";
import {
  About,
  Services,
  Process,
  Results,
  Pricing,
  FAQ,
  Contact,
  CalBooking,
  Footer,
  CaseStudies,
} from "@/components/PageSections";
import Testimonials from "@/components/sections/TestimonialsSimple";
import WhatsAppBooking from "@/components/WhatsAppBooking";
import SEOHelmet from "@/components/SEOHelmet";
import { Metadata } from "next";

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: "ELEVA CONSULTORIA | Agile Leadership and Organizational Transformation",
  description:
    "Leadership coaching and organizational consulting for tech leaders and startups. +20 years in technology, proven agile methodology. Book your free session.",
  keywords:
    "leadership coaching, organizational consulting, agile coaching, agile transformation, scrum, tech leadership, startups, consultoría agile, coaching líderes tech, escalar equipos, liderazgo remoto",
  alternates: {
    canonical: "https://eleva-consultoria.com/en",
    languages: {
      'es': 'https://eleva-consultoria.com',
      'en': 'https://eleva-consultoria.com/en',
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f0f0f',
  colorScheme: 'dark',
}

export default function EnglishPage() {
  return (
    <main>
      <SEOHelmet pathname="/en" />
      <HeroServer pathname="/en" />
      <About />
      <Services />
      <Process />
      <Testimonials />
      <Results />
      <CaseStudies />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppBooking />
    </main>
  );
}
