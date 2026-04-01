import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://eleva-consultoria.com'
  const currentDate = new Date().toISOString()

  // Define pages with their Spanish and English paths
  const pages = [
    { es: '/', en: '/en', priority: 1.0 },
    { es: '/servicios', en: '/en/servicios', priority: 0.9 },
    { es: '/precios', en: '/en/precios', priority: 0.8 },
    { es: '/casos-de-estudio', en: '/en/casos-de-estudio', priority: 0.8 },
    { es: '/testimonios', en: '/en/testimonios', priority: 0.8 },
    { es: '/faq', en: '/en/faq', priority: 0.7 },
    { es: '/sobre-mi', en: '/en/sobre-mi', priority: 0.8 },
    { es: '/madurez-empresarial', en: '/en/madurez-empresarial', priority: 0.7 },
  ];

  // Generate sitemap entries for both languages
  const sitemapEntries: MetadataRoute.Sitemap = [];

  pages.forEach(page => {
    // Spanish version
    sitemapEntries.push({
      url: `${baseUrl}${page.es}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: page.priority,
      alternates: {
        languages: {
          es: `${baseUrl}${page.es}`,
          en: `${baseUrl}${page.en}`,
        },
      },
    });

    // English version
    sitemapEntries.push({
      url: `${baseUrl}${page.en}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: page.priority,
      alternates: {
        languages: {
          es: `${baseUrl}${page.es}`,
          en: `${baseUrl}${page.en}`,
        },
      },
    });
  });

  return sitemapEntries;
}
