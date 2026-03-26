import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import DebugLogViewer from "@/components/debug/DebugLogViewer";
import "../styles/scrollbar.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ClientLayout from "@/components/ClientLayout";
import JsonLdStructuredData from "@/components/JsonLdStructuredData";
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
        url: "https://eleva-consultoria.com/images/opengraph.png",
        width: 1200,
        height: 630,
        alt: "ELEVA CONSULTORIA - Coaching & Consultoría Organizacional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ELEVA CONSULTORIA | Coaching & Consultoría Organizacional",
    description:
      "Coaching y consultoría organizacional para líderes tech y startups.",
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
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MMR8L48T');`
        }} />
        {/* End Google Tag Manager */}
        
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
        {/* Google Tag Manager (noscript) */}
        <noscript dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MMR8L48T"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`
        }} />
        {/* End Google Tag Manager (noscript) */}
        
        <LanguageProvider>
          <ThemeProvider>
            <ClientLayout>
              <AnalyticsScripts />
              <JsonLdStructuredData type="Organization" data={{}} />
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
