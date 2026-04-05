# Technical Implementation Details

## JSON-LD Schema Implementation

### Schema Types Used
```javascript
// LocalBusiness Schema (Homepage)
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ELEVA CONSULTORIA",
  "description": "Coaching y consultoría organizacional",
  "address": {...},
  "openingHours": [...],
  "contactPoint": {...}
}

// Person Schema (/sobre-mi)
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Fernando Ferrari",
  "jobTitle": "Agile Coach & Organizational Consultant",
  "sameAs": [...socialMediaLinks...]
}

// FAQPage Schema (/faq)
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Question text",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Answer text"
      }
    }
  ]
}
```

## Contact System Technical Details

### Component Architecture
```typescript
// ContactInfo.tsx - Main component structure
const ContactInfo: React.FC = () => {
  // Headline system with emotional hook
  // 3 benefit cards with gradient backgrounds
  // Trust badges system
  // Enhanced CTA with dual icons
}
```

### CSS Optimizations
```css
/* Mobile-optimized credential chips */
.credential-chip {
  padding: 0.5rem 0.875rem; /* Reduced from 0.5rem 1.125rem */
  font-size: 0.9375rem; /* 15px for mobile readability */
  gap: 0.4rem;
  white-space: nowrap; /* Prevent text breakup */
}

/* Glassmorphism effects */
.glass-card {
  backdrop-filter: blur(sm);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}
```

## SEO Configuration

### Metadata Structure
```typescript
// /lib/seo.ts - SEO configuration
const seoConfig = {
  "/": {
    title: "ELEVA CONSULTORIA | Coaching & Consultoría Organizacional",
    description: "Transformación organizacional y liderazgo ágil",
    ogImage: "/opengraph.png"
  },
  // ... 8 more routes
}
```

### Route Coverage
- Homepage (priority: 1.0)
- /en (priority: 0.9)
- /servicios (priority: 0.9)
- /precios, /casos-de-estudio, /testimonios, /sobre-mi (priority: 0.8)
- /faq, /madurez-empresarial (priority: 0.7)

## Performance Optimizations

### Static Generation
- ISR (Incremental Static Regeneration) with 1-hour revalidate
- 230 static files generated in /out directory
- API routes removed for static export compatibility

### Image Optimization
- Updated `images.domains` to `images.remotePatterns`
- `unoptimized: true` for static export
- Responsive images for all device sizes

## Deployment Configuration

### Next.js Config
```javascript
// next.config.ts
output: 'export',
images: {
  remotePatterns: [...],
  unoptimized: true
},
experimental: {
  isrMemoryCacheSize: 0
}
```

### Build Scripts
- `npm run build` - Normal build with ISR
- `npm run build:export` - Complete static export
- `npm run verify:ssr` - SSR/SSG verification
