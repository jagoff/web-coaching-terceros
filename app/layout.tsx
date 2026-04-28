import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import "../styles/scrollbar.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ClientLayout from "@/components/ClientLayout";
import JsonLdClient from "@/components/JsonLdClient";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://coaching-landing-cyan.vercel.app";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-PE7S1C5PX8";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f0f0f",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ELEVA CONSULTORA | Liderazgo Ágil y Transformación Organizacional",
  description:
    "Consultoría organizacional y coaching de liderazgo para líderes tech y startups. +20 años en tecnología, metodología ágil probada. Agendá tu sesión gratuita.",
  keywords:
    "coaching de liderazgo, consultoría organizacional, agile coaching, transformación ágil, scrum, liderazgo tech, startups, Argentina",
  authors: [{ name: "Fernando Ferrari" }],
  creator: "Fernando Ferrari",
  alternates: {
    canonical: "/",
    languages: {
      es: "/",
      en: "/en",
    },
  },
  openGraph: {
    title:
      "ELEVA CONSULTORA | Liderazgo Ágil y Transformación Organizacional",
    description:
      "Consultoría organizacional y coaching de liderazgo para líderes tech y startups. +20 años en tecnología. 6+ años de consultoría ágil.",
    url: SITE_URL,
    siteName: "ELEVA CONSULTORA",
    locale: "es_ES",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ELEVA CONSULTORA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "ELEVA CONSULTORA | Liderazgo Ágil y Transformación Organizacional",
    description:
      "Consultoría organizacional y coaching de liderazgo para líderes tech y startups.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <ClientLayout>
            <JsonLdClient />
            {children}
          </ClientLayout>
        </LanguageProvider>

        {/* Google Analytics — carga diferida tras hidratación */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
