import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { DynamicNavbar, CursorGlow } from "@/components/DynamicSections";

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
  title: "ELEVA Coaching | Transforma Tu Vida y Tu Negocio",
  description:
    "Coaching de vida y negocios para personas que saben que pueden más. Metodología probada, resultados medibles y acompañamiento real. Agenda tu sesión gratuita.",
  keywords:
    "coaching de vida, coaching de negocios, coach ejecutivo, transformación personal, liderazgo, desarrollo personal, España",
  authors: [{ name: "ELEVA Coaching" }],
  creator: "ELEVA Coaching",
  openGraph: {
    title: "ELEVA Coaching | Transforma Tu Vida y Tu Negocio",
    description:
      "Coaching de vida y negocios para personas que saben que pueden más. Más de 500 clientes transformados. 10 años de experiencia certificada.",
    url: "https://eleva.coaching",
    siteName: "ELEVA Coaching",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ELEVA Coaching | Transforma Tu Vida y Tu Negocio",
    description:
      "Coaching de vida y negocios para personas que saben que pueden más.",
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
      >
        <div className="noise-overlay" aria-hidden="true" />
        <CursorGlow />
        <DynamicNavbar />
        {children}
      </body>
    </html>
  );
}
