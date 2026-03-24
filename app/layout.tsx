import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Roboto } from 'next/font/google'
import './globals.css'
import '../styles/scrollbar.css'
import '../styles/performance.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import ClientLayout from '@/components/ClientLayout'
import JsonLdClient from '@/components/JsonLdClient'
import AnalyticsScripts from '@/components/AnalyticsScripts'
import { validateEnv } from '@/lib/env-validation'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://coaching-landing-cyan.vercel.app'
  ),
  title: 'ELEVA CONSULTORA | Liderazgo Ágil y Transformación Organizacional',
  description:
    'Consultoría organizacional y coaching de liderazgo para líderes tech y startups. +20 años en tecnología, metodología ágil probada. Agendá tu sesión gratuita.',
  keywords:
    'coaching de liderazgo, consultoría organizacional, agile coaching, transformación ágil, scrum, liderazgo tech, startups, Argentina',
  authors: [{ name: 'Fernando Ferrari' }],
  creator: 'Fernando Ferrari',
  openGraph: {
    title: 'ELEVA CONSULTORA | Liderazgo Ágil y Transformación Organizacional',
    description:
      'Consultoría organizacional y coaching de liderazgo para líderes tech y startups. +20 años en tecnología. 6+ años de consultoría ágil.',
    url: 'https://coaching-landing-cyan.vercel.app',
    siteName: 'ELEVA CONSULTORA',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ELEVA CONSULTORA | Liderazgo Ágil y Transformación Organizacional',
    description: 'Consultoría organizacional y coaching de liderazgo para líderes tech y startups.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Analytics and JSON-LD moved to client components to prevent hydration issues */}
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${roboto.variable} antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <ClientLayout>
            <AnalyticsScripts />
            <JsonLdClient />
            {children}
          </ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  )
}
