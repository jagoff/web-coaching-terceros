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
import Clients from "@/components/sections/Clients";
import WhatsAppBooking from "@/components/WhatsAppBooking";
import { Metadata } from "next";

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: "ELEVA CONSULTORIA | Agile Leadership and Organizational Transformation",
  description:
    "Leadership coaching and organizational consulting for tech leaders and startups. +20 years in technology, proven agile methodology. Book your free session.",
  keywords:
    "leadership coaching, organizational consulting, agile coaching, agile transformation, scrum, tech leadership, startups, consultoría agile, coaching líderes tech, escalar equipos, liderazgo remoto",
  authors: [{ name: "Fernando Ferrari" }],
  creator: "Fernando Ferrari",
  openGraph: {
    title: "ELEVA CONSULTORIA | Agile Leadership and Organizational Transformation",
    description:
      "Leadership coaching and organizational consulting for tech leaders and startups. +20 years in technology, proven agile methodology. Book your free session.",
    url: "https://eleva-consultoria.com/en",
    siteName: "ELEVA CONSULTORIA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://eleva-consultoria.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ELEVA CONSULTORIA - Agile Leadership and Organizational Transformation",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ELEVA CONSULTORIA | Agile Leadership and Organizational Transformation",
    description:
      "Leadership coaching and organizational consulting for tech leaders and startups. +20 years in technology.",
    images: ["https://eleva-consultoria.com/opengraph-image.png"],
    site: "@eleva_consultoria",
    creator: "@eleva_consultoria",
  },
  alternates: {
    canonical: "https://eleva-consultoria.com/en",
    languages: {
      'es-AR': 'https://eleva-consultoria.com',
      'en-US': 'https://eleva-consultoria.com/en',
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
      <HeroServer pathname="/en" />
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
  );
}
