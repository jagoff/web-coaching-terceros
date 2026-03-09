import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { DynamicNavbar } from "@/components/DynamicSections";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ClientLayout from "@/components/ClientLayout";
import GoogleTagManager from "@/components/GoogleTagManager";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://coaching-landing-cyan.vercel.app"
  ),
  title: "ELEVA Coaching | Liderazgo Ágil y Transformación Organizacional",
  description:
    "Coaching de liderazgo y consultoría organizacional para líderes tech y startups. +20 años en tecnología, metodología ágil probada. Agendá tu sesión gratuita.",
  keywords:
    "coaching de liderazgo, consultoría organizacional, agile coaching, transformación ágil, scrum, liderazgo tech, startups, Argentina",
  authors: [{ name: "Fernando Ferrari" }],
  creator: "Fernando Ferrari",
  openGraph: {
    title: "ELEVA Coaching | Liderazgo Ágil y Transformación Organizacional",
    description:
      "Coaching de liderazgo y consultoría organizacional para líderes tech y startups. +20 años en tecnología. 6+ años de consultoría ágil.",
    url: "https://coaching-landing-cyan.vercel.app",
    siteName: "ELEVA Coaching",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ELEVA Coaching | Liderazgo Ágil y Transformación Organizacional",
    description:
      "Coaching de liderazgo y consultoría organizacional para líderes tech y startups.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-MMR8L48T"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <GoogleTagManager />
        <LanguageProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
