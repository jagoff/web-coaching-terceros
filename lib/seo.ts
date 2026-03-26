export interface SEOData {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  keywords?: string[];
  locale?: string;
  type?: string;
}

export const defaultSEOData: SEOData = {
  title: "ELEVA CONSULTORIA | Coaching & Consultoría Organizacional",
  description: "Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.",
  ogTitle: "ELEVA CONSULTORIA | Coaching & Consultoría Organizacional",
  ogDescription: "Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.",
  ogImage: "https://eleva-consultoria.com/opengraph-image.png",
  canonical: "https://eleva-consultoria.com",
  keywords: ["coaching", "consultoría", "liderazgo", "tech", "startups", "organizacional", "equipos", "procesos", "cultura"],
  locale: "es_AR",
  type: "website",
};

export const seoDataByRoute: Record<string, SEOData> = {
  "/": {
    title: "ELEVA CONSULTORIA | Coaching & Consultoría Organizacional",
    description: "Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.",
    ogTitle: "ELEVA CONSULTORIA | Coaching & Consultoría Organizacional",
    ogDescription: "Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.",
    ogImage: "https://eleva-consultoria.com/opengraph-image.png",
    canonical: "https://eleva-consultoria.com",
    keywords: ["coaching", "consultoría", "liderazgo", "tech", "startups", "organizacional", "equipos", "procesos", "cultura", "Argentina", "consultoría agile", "coaching líderes tech", "escalar equipos", "liderazgo remoto"],
    locale: "es_AR",
    type: "website",
  },
  "/en": {
    title: "ELEVA Coaching | Agile Leadership and Organizational Transformation",
    description: "Leadership coaching and organizational consulting for tech leaders and startups. +20 years in technology, proven agile methodology. Book your free session.",
    ogTitle: "ELEVA Coaching | Agile Leadership and Organizational Transformation",
    ogDescription: "Leadership coaching and organizational consulting for tech leaders and startups. +20 years in technology, proven agile methodology. Book your free session.",
    ogImage: "https://eleva-consultoria.com/opengraph-image.png",
    canonical: "https://eleva-consultoria.com/en",
    keywords: ["leadership coaching", "organizational consulting", "agile coaching", "agile transformation", "scrum", "tech leadership", "startups", "consultoría agile", "coaching líderes tech", "escalar equipos", "liderazgo remoto"],
    locale: "en_US",
    type: "website",
  },
  "/casos-de-estudio": {
    title: "Casos de Estudio | ELEVA CONSULTORIA",
    description: "Transformaciones reales de equipos y organizaciones. Descubrí cómo líderes tech y startups aplicaron nuestra metodología para escalar sus equipos y procesos.",
    ogTitle: "Casos de Estudio | ELEVA CONSULTORIA",
    ogDescription: "Transformaciones reales de equipos y organizaciones. Descubrí cómo líderes tech y startups aplicaron nuestra metodología para escalar sus equipos y procesos.",
    ogImage: "https://eleva-consultoria.com/opengraph-image.png",
    canonical: "https://eleva-consultoria.com/casos-de-estudio",
    keywords: ["casos de estudio", "coaching éxito", "consultoría resultados", "transformación agile", "éxito startups", "liderazgo casos reales"],
    locale: "es_AR",
    type: "website",
  },
  "/faq": {
    title: "Preguntas Frecuentes | FAQ Coaching | ELEVA CONSULTORIA",
    description: "Respuestas a las preguntas más frecuentes sobre nuestros servicios de coaching y consultoría. Todo lo que necesitas saber sobre nuestro proceso, metodología y resultados.",
    ogTitle: "Preguntas Frecuentes | FAQ Coaching | ELEVA CONSULTORIA",
    ogDescription: "Respuestas a las preguntas más frecuentes sobre nuestros servicios de coaching y consultoría organizacional.",
    ogImage: "https://eleva-consultoria.com/opengraph-image.png",
    canonical: "https://eleva-consultoria.com/faq",
    keywords: ["FAQ coaching", "preguntas frecuentes", "dudas coaching", "metodología coaching", "proceso consultoría", "coaching Argentina"],
    locale: "es_AR",
    type: "website",
  },
};

export function getSEOData(pathname: string): SEOData {
  return seoDataByRoute[pathname] || defaultSEOData;
}
