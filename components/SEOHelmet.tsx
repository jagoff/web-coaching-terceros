'use client';

import { Helmet } from 'react-helmet-async';
import { getSEOData } from '@/lib/seo';

interface SEOHelmetProps {
  pathname: string;
}

export default function SEOHelmet({ pathname }: SEOHelmetProps) {
  const seoData = getSEOData(pathname);

  return (
    <Helmet>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      {seoData.keywords && (
        <meta name="keywords" content={seoData.keywords.join(', ')} />
      )}
      
      {/* Open Graph tags */}
      <meta property="og:title" content={seoData.ogTitle || seoData.title} />
      <meta property="og:description" content={seoData.ogDescription || seoData.description} />
      <meta property="og:type" content={seoData.type || 'website'} />
      <meta property="og:locale" content={seoData.locale || 'es_AR'} />
      {seoData.ogImage && (
        <>
          <meta property="og:image" content={seoData.ogImage} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:type" content="image/png" />
        </>
      )}
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.ogTitle || seoData.title} />
      <meta name="twitter:description" content={seoData.ogDescription || seoData.description} />
      {seoData.ogImage && (
        <meta name="twitter:image" content={seoData.ogImage} />
      )}
      <meta name="twitter:site" content="@eleva_consultoria" />
      <meta name="twitter:creator" content="@eleva_consultoria" />
      
      {/* Canonical URL */}
      {seoData.canonical && (
        <link rel="canonical" href={seoData.canonical} />
      )}
      
      {/* Additional meta tags */}
      <meta name="author" content="Fernando Ferrari" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
    </Helmet>
  );
}
