import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import '../styles/scrollbar.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import ClientLayout from '@/components/ClientLayout'
import AnalyticsScripts from '@/components/AnalyticsScripts'
import Hreflang from '@/components/Hreflang'
import LangAttribute from '@/components/LangAttribute'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: true, // Preload primary font to prevent FOIT
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  preload: true, // Preload heading font to prevent FOIT on h1/h2
})

const isStaging = process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development'

export const metadata: Metadata = {
  metadataBase: new URL('https://eleva-consultoria.com'),
  title: 'ELEVA CONSULTORIA | Coaching & Consultoría Organizacional',
  description:
    'Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.',
  keywords:
    'coaching, consultoría, liderazgo, tech, startups, organizacional, equipos, procesos, cultura, Argentina, consultoría agile, coaching líderes tech, escalar equipos, liderazgo remoto',
  authors: [{ name: 'Fernando Ferrari' }],
  creator: 'Fernando Ferrari',
  openGraph: {
    title: 'ELEVA CONSULTORIA | Coaching & Consultoría Organizacional',
    description:
      'Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.',
    url: 'https://eleva-consultoria.com',
    siteName: 'ELEVA CONSULTORIA',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: 'https://eleva-consultoria.com/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'ELEVA CONSULTORIA - Coaching & Consultoría Organizacional',
        type: 'image/png',
      },
    ],
  },
  other: {
    'og:image': 'https://eleva-consultoria.com/opengraph-image.png',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'ELEVA CONSULTORIA - Coaching & Consultoría Organizacional',
    'og:image:type': 'image/png',
    'og:type': 'website',
    'og:site_name': 'ELEVA CONSULTORIA',
    'og:title': 'ELEVA CONSULTORIA | Coaching & Consultoría Organizacional',
    'og:description':
      'Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.',
    'og:url': 'https://eleva-consultoria.com',
    'instagram:site': '@eleva_consultoria',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ELEVA CONSULTORIA | Coaching & Consultoría Organizacional',
    description:
      'Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.',
    images: ['https://eleva-consultoria.com/opengraph-image.png'],
    site: '@eleva_consultoria',
    creator: '@eleva_consultoria',
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
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f0f0f',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <head suppressHydrationWarning>
        {/* Critical CSS inline — prevents FOUC before main stylesheet loads */}
        <style
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
            *,*::before,*::after{box-sizing:border-box}
            html{line-height:1.15;-webkit-text-size-adjust:100%;scroll-behavior:auto!important;overflow-anchor:none}
            body{margin:0;background:#0C0A12;color:#fff;font-family:system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;overflow-anchor:none}
            .container{max-width:1200px;margin:0 auto;padding:0 1rem}
            .section{padding:clamp(3rem,6vw,5rem) 0}
            .heading-xl{font-size:clamp(1.75rem,5vw,3.5rem);font-weight:700;line-height:1.2}
            .text-gradient{background:linear-gradient(135deg,#7C6BC4 0%,#C87B5A 55%,#9D8FD8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
            .badge{display:inline-flex;align-items:center;padding:.5rem 1.25rem;background:linear-gradient(135deg,rgba(124,107,196,.25) 0%,rgba(200,123,90,.15) 100%);border:1px solid rgba(124,107,196,.5);border-radius:9999px;color:#C87B5A;font-size:.875rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase}
            .glass-card{background:rgba(20,18,29,.80);border:1px solid rgba(124,107,196,.3);border-radius:1rem}
            .hero-section{min-height:100svh;display:flex;align-items:center;background:radial-gradient(ellipse at 50% 100%,rgba(124,107,196,.08) 0%,transparent 60%),#0C0A12}
            .text-center{text-align:center}
            .flex{display:flex}
            .items-center{align-items:center}
          `,
          }}
        />

        {/* Preconnect for third-party origins */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

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
          <ClientLayout>
            <AnalyticsScripts />
            {children}
            <Analytics />
          </ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  )
}
