import type { Metadata } from "next";
import { Playfair_Display, Inter, Space_Grotesk, Roboto } from "next/font/google";
import "./globals.css";
import "../styles/scrollbar.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ClientLayout from "@/components/ClientLayout";
import JsonLdClient from "@/components/JsonLdClient";
import AnalyticsScripts from "@/components/AnalyticsScripts";

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
  weight: ["300", "400", "500", "600"],
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

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://coaching-landing-cyan.vercel.app"
  ),
  title: "ELEVA CONSULTORA | Liderazgo Ágil y Transformación Organizacional",
  description:
    "Consultoría organizacional y coaching de liderazgo para líderes tech y startups. +20 años en tecnología, metodología ágil probada. Agendá tu sesión gratuita.",
  keywords:
    "coaching de liderazgo, consultoría organizacional, agile coaching, transformación ágil, scrum, liderazgo tech, startups, Argentina",
  authors: [{ name: "Fernando Ferrari" }],
  creator: "Fernando Ferrari",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0f0f0f",
  openGraph: {
    title: "ELEVA CONSULTORA | Liderazgo Ágil y Transformación Organizacional",
    description:
      "Consultoría organizacional y coaching de liderazgo para líderes tech y startups. +20 años en tecnología, metodología ágil probada. Agendá tu sesión gratuita.",
    url: "https://eleva-consultoria.com",
    siteName: "ELEVA CONSULTORA",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://eleva-consultoria.com/img/fav.png",
        width: 512,
        height: 512,
        alt: "ELEVA CONSULTORA - Liderazgo Ágil y Transformación Organizacional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ELEVA CONSULTORA | Liderazgo Ágil y Transformación Organizacional",
    description:
      "Consultoría organizacional y coaching de liderazgo para líderes tech y startups.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/img/fav.png',
    shortcut: '/img/fav.png',
    apple: '/img/fav.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/img/fav.png',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Analytics and JSON-LD moved to client components to prevent hydration issues */}
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} ${spaceGrotesk.variable} ${roboto.variable} antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <ThemeProvider>
            <ClientLayout>
              <AnalyticsScripts />
              <JsonLdClient />
              {children}
            </ClientLayout>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
