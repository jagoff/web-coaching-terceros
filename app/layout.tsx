import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import DebugLogViewer from "@/components/debug/DebugLogViewer";
import "../styles/scrollbar.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ClientLayout from "@/components/ClientLayout";
import JsonLdClient from "@/components/JsonLdClient";
import AnalyticsScripts from "@/components/AnalyticsScripts";

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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://coaching-landing-cyan.vercel.app"
  ),
  title: "ELEVA COACHING | Liderazgo Ágil y Transformación Organizacional",
  description:
    "Coaching de liderazgo y transformación organizacional para líderes tech y startups. +20 años en tecnología, metodología ágil probada. Agendá tu sesión gratuita.",
  keywords:
    "coaching de liderazgo, transformación organizacional, agile coaching, transformación ágil, scrum, liderazgo tech, startups, Argentina",
  authors: [{ name: "Fernando Ferrari" }],
  creator: "Fernando Ferrari",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
  themeColor: "#0f0f0f",
  openGraph: {
    title: "ELEVA COACHING | Liderazgo Ágil y Transformación Organizacional",
    description:
      "Coaching de liderazgo y transformación organizacional para líderes tech y startups. +20 años en tecnología, metodología ágil probada. Agendá tu sesión gratuita.",
    url: "https://eleva-consultoria.com",
    siteName: "ELEVA COACHING",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://eleva-consultoria.com/img/fav.png",
        width: 512,
        height: 512,
        alt: "ELEVA COACHING - Liderazgo Ágil y Transformación Organizacional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ELEVA COACHING | Liderazgo Ágil y Transformación Organizacional",
    description:
      "Coaching de liderazgo y transformación organizacional para líderes tech y startups.",
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
        <LanguageProvider>
          <ThemeProvider>
            <ClientLayout>
              <AnalyticsScripts />
              <JsonLdClient />
              {children}
            </ClientLayout>
          </ThemeProvider>
        </LanguageProvider>
        
        {/* Debug Log Viewer - Only in development */}
        {process.env.NODE_ENV === 'development' && <DebugLogViewer />}
      </body>
    </html>
  );
}
