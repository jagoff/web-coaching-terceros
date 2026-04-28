import { Metadata } from "next";
import page from "../page";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://coaching-landing-cyan.vercel.app";

export const metadata: Metadata = {
  title: "ELEVA Coaching | Agile Leadership and Organizational Transformation",
  description:
    "Leadership coaching and organizational consulting for tech leaders and startups. +20 years in technology, proven agile methodology. Book your free session.",
  keywords:
    "leadership coaching, organizational consulting, agile coaching, agile transformation, scrum, tech leadership, startups",
  alternates: {
    canonical: "/en",
    languages: {
      es: "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "ELEVA Coaching | Agile Leadership and Organizational Transformation",
    description:
      "Leadership coaching and organizational consulting for tech leaders and startups.",
    url: `${SITE_URL}/en`,
    siteName: "ELEVA CONSULTING",
    locale: "en_US",
    alternateLocale: ["es_ES"],
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ELEVA CONSULTING",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ELEVA Coaching | Agile Leadership and Organizational Transformation",
    description:
      "Leadership coaching and organizational consulting for tech leaders and startups.",
    images: ["/og-image.png"],
  },
};

export default page;
