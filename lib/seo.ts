export interface SEOData {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonical?: string
  keywords?: string[]
  locale?: string
  type?: string
}

export const defaultSEOData: SEOData = {
  title: 'ELEVA CONSULTORIA | Coaching & Consultoría Organizacional',
  description:
    'Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.',
  ogTitle: 'ELEVA CONSULTORIA | Coaching & Consultoría Organizacional',
  ogDescription:
    'Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.',
  ogImage: 'https://eleva-consultoria.com/opengraph-image.png',
  canonical: 'https://eleva-consultoria.com',
  keywords: [
    'coaching',
    'consultoría',
    'liderazgo',
    'tech',
    'startups',
    'organizacional',
    'equipos',
    'procesos',
    'cultura',
  ],
  locale: 'es_AR',
  type: 'website',
}

export const seoDataByRoute: Record<string, SEOData> = {
  '/': {
    title: 'ELEVA CONSULTORIA | Coaching & Consultoría Organizacional',
    description:
      'Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.',
    ogTitle: 'ELEVA CONSULTORIA | Coaching & Consultoría Organizacional',
    ogDescription:
      'Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.',
    ogImage: 'https://eleva-consultoria.com/opengraph-image.png',
    canonical: 'https://eleva-consultoria.com',
    keywords: [
      'coaching',
      'consultoría',
      'liderazgo',
      'tech',
      'startups',
      'organizacional',
      'equipos',
      'procesos',
      'cultura',
      'Argentina',
      'consultoría agile',
      'coaching líderes tech',
      'escalar equipos',
      'liderazgo remoto',
    ],
    locale: 'es_AR',
    type: 'website',
  },
  '/en': {
    title: 'ELEVA CONSULTORIA | Agile Leadership and Organizational Transformation',
    description:
      'Leadership coaching and organizational consulting for tech leaders and startups. +20 years in technology, proven agile methodology. Book your free session.',
    ogTitle: 'ELEVA CONSULTORIA | Agile Leadership and Organizational Transformation',
    ogDescription:
      'Leadership coaching and organizational consulting for tech leaders and startups. +20 years in technology, proven agile methodology. Book your free session.',
    ogImage: 'https://eleva-consultoria.com/opengraph-image.png',
    canonical: 'https://eleva-consultoria.com/en',
    keywords: [
      'leadership coaching',
      'organizational consulting',
      'agile coaching',
      'agile transformation',
      'scrum',
      'tech leadership',
      'startups',
      'consultoría agile',
      'coaching líderes tech',
      'escalar equipos',
      'liderazgo remoto',
    ],
    locale: 'en_US',
    type: 'website',
  },
  '/casos-de-estudio': {
    title: 'Casos de Estudio | ELEVA CONSULTORIA',
    description:
      'Transformaciones reales de equipos y organizaciones. Descubrí cómo líderes tech y startups aplicaron nuestra metodología para escalar sus equipos y procesos.',
    ogTitle: 'Casos de Estudio | ELEVA CONSULTORIA',
    ogDescription:
      'Transformaciones reales de equipos y organizaciones. Descubrí cómo líderes tech y startups aplicaron nuestra metodología para escalar sus equipos y procesos.',
    ogImage: 'https://eleva-consultoria.com/opengraph-image.png',
    canonical: 'https://eleva-consultoria.com/casos-de-estudio',
    keywords: [
      'casos de estudio',
      'coaching éxito',
      'consultoría resultados',
      'transformación agile',
      'éxito startups',
      'liderazgo casos reales',
    ],
    locale: 'es_AR',
    type: 'website',
  },
  '/faq': {
    title: 'Preguntas Frecuentes | FAQ Coaching | ELEVA CONSULTORIA',
    description:
      'Respuestas a las preguntas más frecuentes sobre nuestros servicios de coaching y consultoría. Todo lo que necesitas saber sobre nuestro proceso, metodología y resultados.',
    ogTitle: 'Preguntas Frecuentes | FAQ Coaching | ELEVA CONSULTORIA',
    ogDescription:
      'Respuestas a las preguntas más frecuentes sobre nuestros servicios de coaching y consultoría organizacional.',
    ogImage: 'https://eleva-consultoria.com/opengraph-image.png',
    canonical: 'https://eleva-consultoria.com/faq',
    keywords: [
      'FAQ coaching',
      'preguntas frecuentes',
      'dudas coaching',
      'metodología coaching',
      'proceso consultoría',
      'coaching Argentina',
    ],
    locale: 'es_AR',
    type: 'website',
  },
  '/servicios': {
    title: 'Servicios de Coaching y Consultoría | ELEVA CONSULTORIA',
    description:
      'Servicios especializados en coaching de liderazgo, consultoría agile y transformación organizacional para equipos tech y startups.',
    ogTitle: 'Servicios de Coaching y Consultoría | ELEVA CONSULTORIA',
    ogDescription:
      'Descubrí nuestros servicios de coaching de liderazgo y consultoría agile para transformar tu equipo tech.',
    ogImage: 'https://eleva-consultoria.com/opengraph-image.png',
    canonical: 'https://eleva-consultoria.com/servicios',
    keywords: [
      'servicios coaching',
      'consultoría agile',
      'coaching liderazgo',
      'transformación organizacional',
      'servicios consultoría',
      'coaching equipos',
    ],
    locale: 'es_AR',
    type: 'website',
  },
  '/precios': {
    title: 'Precios y Planes | Coaching y Consultoría | ELEVA CONSULTORIA',
    description:
      'Planes de coaching y consultoría adaptados a tu necesidad. Sesiones individuales, transformación de equipos y acompañamiento organizacional.',
    ogTitle: 'Precios y Planes | Coaching y Consultoría | ELEVA CONSULTORIA',
    ogDescription: 'Conocé nuestros planes de coaching y consultoría para líderes tech y startups.',
    ogImage: 'https://eleva-consultoria.com/opengraph-image.png',
    canonical: 'https://eleva-consultoria.com/precios',
    keywords: [
      'precios coaching',
      'planes consultoría',
      'costo coaching',
      'tarifas consultoría',
      'precios liderazgo',
      'coaching Argentina',
    ],
    locale: 'es_AR',
    type: 'website',
  },
  '/sobre-mi': {
    title: 'Sobre Mí | Fernando Ferrari | ELEVA CONSULTORIA',
    description:
      'Conocé mi trayectoria de +20 años en tecnología, coaching agile y consultoría para líderes tech y startups en Argentina y Latinoamérica.',
    ogTitle: 'Sobre Mí | Fernando Ferrari | ELEVA CONSULTORIA',
    ogDescription:
      '+20 años de experiencia en tecnología, coaching agile y consultoría para líderes tech.',
    ogImage: 'https://eleva-consultoria.com/opengraph-image.png',
    canonical: 'https://eleva-consultoria.com/sobre-mi',
    keywords: [
      'Fernando Ferrari',
      'sobre mí',
      'trayectoria',
      'experiencia tecnología',
      'coaching agile',
      'consultoría Argentina',
    ],
    locale: 'es_AR',
    type: 'website',
  },
  '/testimonios': {
    title: 'Testimonios de Clientes | Coaching y Consultoría | ELEVA CONSULTORIA',
    description:
      'Historias de éxito de líderes tech y startups que transformaron sus equipos con nuestra metodología de coaching y consultoría.',
    ogTitle: 'Testimonios de Clientes | Coaching y Consultoría | ELEVA CONSULTORIA',
    ogDescription:
      'Descubrí las historias de éxito de nuestros clientes en coaching y consultoría tech.',
    ogImage: 'https://eleva-consultoria.com/opengraph-image.png',
    canonical: 'https://eleva-consultoria.com/testimonios',
    keywords: [
      'testimonios',
      'historias éxito',
      'clientes coaching',
      'resultados consultoría',
      'casos éxito',
      'coaching tech',
    ],
    locale: 'es_AR',
    type: 'website',
  },
  '/madurez-empresarial': {
    title: 'Test de Madurez Empresarial | Evaluación Gratuita | ELEVA CONSULTORIA',
    description:
      'Evaluá gratuitamente la madurez empresarial de tu organización. Descubrí áreas de mejora y recibe recomendaciones personalizadas.',
    ogTitle: 'Test de Madurez Empresarial | Evaluación Gratuita | ELEVA CONSULTORIA',
    ogDescription: 'Evaluá la madurez de tu empresa y recibí un plan de mejora personalizado.',
    ogImage: 'https://eleva-consultoria.com/opengraph-image.png',
    canonical: 'https://eleva-consultoria.com/madurez-empresarial',
    keywords: [
      'test madurez',
      'evaluación empresarial',
      'diagnóstico organizacional',
      'madurez empresarial',
      'evaluación gratuita',
      'consultoría empresas',
    ],
    locale: 'es_AR',
    type: 'website',
  },
}

export function getSEOData(pathname: string): SEOData {
  return seoDataByRoute[pathname] || defaultSEOData
}
