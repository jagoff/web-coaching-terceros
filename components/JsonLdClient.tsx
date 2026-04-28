import Script from "next/script";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://coaching-landing-cyan.vercel.app";

// Validez de las ofertas: dinámica (1 año desde build) — evita strings caducos como '2025-12-31'
const priceValidUntil = (() => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().slice(0, 10);
})();

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}#person`,
      name: "Fernando Ferrari",
      jobTitle: "Agile Coach & Leadership Consultant",
      description:
        "Coach de liderazgo y consultoría organizacional con más de 20 años en tecnología",
      url: SITE_URL,
      sameAs: [
        "https://www.instagram.com/jago_ff",
        "https://www.linkedin.com/in/fernandorferrari",
      ],
      knowsAbout: [
        "Agile Coaching",
        "Leadership Development",
        "Organizational Consulting",
        "Scrum",
        "Kanban",
        "Team Management",
      ],
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: "ELEVA CONSULTORA",
      description:
        "Transformando líderes y organizaciones a través de la consultoría estratégica y coaching ágil",
      url: SITE_URL,
      founder: { "@type": "Person", "@id": `${SITE_URL}#person` },
      areaServed: { "@type": "Country", name: "Argentina" },
      serviceType: [
        "Coaching de Liderazgo",
        "Consultoría Organizacional",
        "Transformación Ágil",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      name: "ELEVA CONSULTORA",
      description:
        "Consultoría organizacional y coaching de liderazgo para líderes tech y startups",
      url: SITE_URL,
      inLanguage: ["es", "en"],
      isAccessibleForFree: true,
      potentialAction: {
        "@type": "ReadAction",
        target: SITE_URL,
      },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}#leadership-coaching`,
      name: "Coaching de Liderazgo",
      description:
        "Para líderes y managers que quieren potenciar su impacto y desarrollar equipos de alto rendimiento",
      provider: { "@type": "Organization", "@id": `${SITE_URL}#organization` },
      serviceType: "Leadership Coaching",
      offers: {
        "@type": "Offer",
        price: "150",
        priceCurrency: "USD",
        priceValidUntil,
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}#organizational-consulting`,
      name: "Consultoría Organizacional",
      description:
        "Para startups y empresas que necesitan profesionalizar operaciones y adoptar agilidad real",
      provider: { "@type": "Organization", "@id": `${SITE_URL}#organization` },
      serviceType: "Organizational Consulting",
      offers: {
        "@type": "Offer",
        price: "200",
        priceCurrency: "USD",
        priceValidUntil,
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Para quién es este servicio?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Para líderes tech, founders de startups, CTOs y managers que sienten que su equipo podría rendir más, que las decisiones se estancan o que la cultura no escala al mismo ritmo que el negocio.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué diferencia hay entre coaching y consultoría?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El coaching te acompaña a encontrar tus propias respuestas y desarrollar habilidades de liderazgo. La consultoría aporta frameworks, procesos y estrategias concretas. Mi enfoque combina ambos según lo que necesites.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuánto tiempo dura un proceso típico?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Un proceso de coaching individual suele durar entre 8 y 12 sesiones (2-3 meses). La consultoría organizacional varía según la complejidad, pero los primeros resultados se ven en las primeras 4-6 semanas.",
          },
        },
        {
          "@type": "Question",
          name: "¿La sesión de diagnóstico tiene algún costo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. La primera sesión de 30 minutos es completamente gratuita y sin compromiso. Sirve para entender tu situación, definir objetivos y ver si tiene sentido trabajar juntos.",
          },
        },
      ],
    },
  ],
};

// Server component — renderiza JSON-LD vía next/script en lugar de inyectar en useEffect.
export default function JsonLdClient() {
  return (
    <Script
      id="ld-json"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
