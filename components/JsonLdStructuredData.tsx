interface JsonLdStructuredDataProps {
  type: 'Organization' | 'Service' | 'Person' | 'WebPage';
  data?: any;
  pathname?: string;
}

export default function JsonLdStructuredData({ type, data = {}, pathname = '/' }: JsonLdStructuredDataProps) {

  const getStructuredData = () => {
    const baseUrl = "https://eleva-consultoria.com";
    const fullUrl = `${baseUrl}${pathname}`;

    switch (type) {
      case 'Organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "ELEVA CONSULTORIA",
          "url": baseUrl,
          "logo": `${baseUrl}/img/fav.png`,
          "description": "Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.",
          "founder": {
            "@type": "Person",
            "name": "Fernando Ferrari",
            "jobTitle": "Coach Profesional",
            "url": `${baseUrl}/sobre-mi`
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+54-9-11-1234-5678",
            "contactType": "consulting",
            "availableLanguage": ["Spanish", "English"]
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "Argentina",
            "addressRegion": "Buenos Aires"
          },
          "sameAs": [
            "https://linkedin.com/in/fernandorferrari",
            "https://instagram.com/jago_ff"
          ],
          "services": [
            "Coaching de Liderazgo",
            "Consultoría Organizacional",
            "Coaching para Startups",
            "Desarrollo de Equipos",
            "Cultura Organizacional"
          ]
        };

      case 'Service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data.name,
          "description": data.description,
          "provider": {
            "@type": "Organization",
            "name": "ELEVA CONSULTORIA",
            "url": baseUrl
          },
          "serviceType": "Professional Coaching",
          "category": "Business Consulting",
          "offers": {
            "@type": "Offer",
            "description": "Sesiones de coaching personalizadas para líderes y equipos",
            "availability": "https://schema.org/InStock",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "priceCurrency": "ARS",
              "price": data.price || "A consultar"
            }
          },
          "areaServed": {
            "@type": "Country",
            "name": "Argentina"
          }
        };

      case 'Person':
        return {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Fernando Ferrari",
          "jobTitle": "Coach Profesional",
          "description": "Coach profesional especializado en liderazgo tech y consultoría organizacional con más de 10 años de experiencia ayudando a líderes y startups a alcanzar su máximo potencial.",
          "url": `${baseUrl}/sobre-mi`,
          "image": `${baseUrl}/img/fav.png`,
          "sameAs": [
            "https://linkedin.com/in/fernandorferrari",
            "https://instagram.com/jago_ff"
          ],
          "worksFor": {
            "@type": "Organization",
            "name": "ELEVA CONSULTORIA"
          },
          "knowsAbout": [
            "Coaching de Liderazgo",
            "Consultoría Organizacional",
            "Desarrollo de Equipos",
            "Cultura Organizacional",
            "Startups",
            "Tecnología"
          ],
          "offers": {
            "@type": "Offer",
            "serviceType": "Professional Coaching",
            "description": "Coaching individual y organizacional para líderes tech"
          }
        };

      case 'WebPage':
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": data.title,
          "description": data.description,
          "url": fullUrl,
          "isPartOf": {
            "@type": "WebSite",
            "name": "ELEVA CONSULTORIA",
            "url": baseUrl
          },
          "inLanguage": "es",
          "isAccessibleForFree": true,
          "dateModified": new Date().toISOString(),
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": baseUrl
              },
              ...(pathname !== '/' ? [{
                "@type": "ListItem",
                "position": 2,
                "name": data.breadcrumb || pathname.replace('/', ''),
                "item": fullUrl
              }] : [])
            ]
          }
        };

      default:
        return {};
    }
  };

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
}
