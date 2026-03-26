import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/test', '/api/', '/admin/', '/_next/', '/static/'],
    },
    sitemap: 'https://eleva-consultoria.com/sitemap.xml',
  }
}
