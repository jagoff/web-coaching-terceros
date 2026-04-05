'use client'

import { usePathname } from 'next/navigation'

/**
 * Hreflang component - Generates automatic hreflang tags for SEO
 * Implements proper multilingual SEO according to Google guidelines
 */
export default function Hreflang() {
  const pathname = usePathname()

  // Determine current language from pathname
  const currentLang = pathname?.startsWith('/en') ? 'en' : 'es'

  // Remove language prefix to get base path
  const basePath = pathname?.replace(/^\/(en|es)/, '') || '/'

  // Generate URLs for each language
  const baseUrl = 'https://eleva-consultoria.com'
  const esUrl = basePath === '/' ? baseUrl : `${baseUrl}${basePath}`
  const enUrl = `${baseUrl}/en${basePath}`

  return (
    <>
      {/* Hreflang tags for each language */}
      <link rel="alternate" hrefLang="es" href={esUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="x-default" href={esUrl} />

      {/* Canonical URL for current language */}
      <link rel="canonical" href={currentLang === 'en' ? enUrl : esUrl} />
    </>
  )
}
