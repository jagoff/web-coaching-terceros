import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "../styles/scrollbar.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ClientLayout from "@/components/ClientLayout";
import JsonLdStructuredData from "@/components/JsonLdStructuredData";
import AnalyticsScripts from "@/components/AnalyticsScripts";
import Hreflang from "@/components/Hreflang";
import LangAttribute from "@/components/LangAttribute";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

const isStaging = process.env.VERCEL_ENV === 'preview' || 
                  process.env.NODE_ENV === 'development';

export const metadata: Metadata = {
  metadataBase: new URL("https://eleva-consultoria.com"),
  title: "ELEVA CONSULTORIA | Coaching & Consultoría Organizacional",
  description:
    "Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.",
  keywords:
    "coaching, consultoría, liderazgo, tech, startups, organizacional, equipos, procesos, cultura, Argentina, consultoría agile, coaching líderes tech, escalar equipos, liderazgo remoto",
  authors: [{ name: "Fernando Ferrari" }],
  creator: "Fernando Ferrari",
  openGraph: {
    title: "ELEVA CONSULTORIA | Coaching & Consultoría Organizacional",
    description:
      "Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.",
    url: "https://eleva-consultoria.com",
    siteName: "ELEVA CONSULTORIA",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://eleva-consultoria.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ELEVA CONSULTORIA - Coaching & Consultoría Organizacional",
        type: "image/png",
      },
    ],
  },
  other: {
    "og:image": "https://eleva-consultoria.com/opengraph-image.png",
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:alt": "ELEVA CONSULTORIA - Coaching & Consultoría Organizacional",
    "og:image:type": "image/png",
    "og:type": "website",
    "og:site_name": "ELEVA CONSULTORIA",
    "og:title": "ELEVA CONSULTORIA | Coaching & Consultoría Organizacional",
    "og:description": "Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.",
    "og:url": "https://eleva-consultoria.com",
    "instagram:site": "@eleva_consultoria",
  },
  twitter: {
    card: "summary_large_image",
    title: "ELEVA CONSULTORIA | Coaching & Consultoría Organizacional",
    description:
      "Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.",
    images: ["https://eleva-consultoria.com/opengraph-image.png"],
    site: "@eleva_consultoria",
    creator: "@eleva_consultoria",
  },
  robots: {
    index: !isStaging,
    follow: !isStaging,
    googleBot: {
      index: !isStaging,
      follow: !isStaging,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon.png',
    },
  },
  alternates: {
    canonical: 'https://eleva-consultoria.com',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <head>
        {/* Hreflang tags for multilingual SEO */}
        <Hreflang />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Prevent pull-to-refresh and touch behaviors */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#0f0f0f" />
        <meta name="color-scheme" content="dark" />
        
        {/* Analytics and JSON-LD moved to client components to prevent hydration issues */}
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
        suppressHydrationWarning
      >
        <LangAttribute />
        <LanguageProvider>
          <ThemeProvider>
            <ClientLayout>
              <AnalyticsScripts />
              {children}
            </ClientLayout>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
