# CLAUDE.md

## Overview

Landing page for **ELEVA CONSULTORIA** — coaching and organizational consulting for tech leaders and startups in Argentina. Built with Next.js App Router, bilingual (ES/EN), animations, Cal.com booking, and email integration.

## Build Commands

```bash
npm run dev              # Development server
npm run build            # Production build
npm run start            # Production server
npm run lint             # ESLint
npm run lint:fix         # Fix lint issues
npm run format           # Prettier
npm run test             # Unit tests (Vitest)
npm run test:e2e         # E2E tests (Playwright)
npm run test:coverage    # Coverage report
npm run analyze          # Bundle analysis
npm run verify:ssr       # Verify SSR
npm run optimize:images  # Optimize images with Sharp
```

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4, Emotion, custom CSS design tokens + fluid typography
- **Animations**: Framer Motion, Lenis (smooth scrolling), custom animation variants
- **Testing**: Vitest (unit, jsdom), Playwright (e2e + visual regression, multi-browser)
- **Email**: Resend (primary) + Web3Forms (fallback)
- **Booking**: Cal.com embed (`@calcom/embed-react`)
- **Icons**: Lucide React
- **Validation**: Zod

## Environment Variables

```bash
# Required
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=   # Contact form backend
NEXT_PUBLIC_CALCOM_USERNAME=        # Cal.com booking
NEXT_PUBLIC_CALCOM_EVENT_TYPE_ID=30min
RESEND_API_KEY=                     # Email confirmations
CONTACT_EMAIL=                      # Recipient for form notifications

# Optional
OPENAI_API_KEY=                     # Voice contact (not active)
NEXT_PUBLIC_SITE_URL=               # Domain for links
VERCEL_ENV=                         # Staging detection
```

## Project Structure

```
/app
  ├── page.tsx                 # Homepage (ES) — force-static, revalidate 3600s
  ├── layout.tsx               # Root layout (fonts, metadata, providers)
  ├── en/page.tsx              # Homepage (EN) — same sections, CalBooking instead of WhatsApp
  ├── servicios/page.tsx       # Services page
  ├── sobre-mi/page.tsx        # About page (Fernando Ferrari)
  ├── precios/page.tsx         # Pricing page
  ├── faq/page.tsx             # FAQ page
  ├── testimonios/page.tsx     # Testimonials page
  ├── casos-de-estudio/page.tsx# Case studies page
  ├── madurez-empresarial/     # Business maturity self-assessment tool
  ├── sitemap.ts               # Multilingual sitemap (16 URLs: 8 pages × 2 langs)
  └── robots.ts                # robots.txt (allows all crawlers incl. AI)
/components
  ├── sections/                # Page sections
  │   ├── HeroServer.tsx / HeroClient.tsx  # SSR-safe hero with rotating phrases
  │   ├── About.tsx            # Stats, credentials, approach
  │   ├── Services.tsx         # 3 service cards
  │   ├── Process.tsx          # 4-step process (Diagnosis→Design→Execution→Autonomy)
  │   ├── Results.tsx          # Stats with CountUp animations
  │   ├── CaseStudies.tsx      # Client case study cards
  │   ├── Pricing.tsx          # 3 pricing tiers
  │   ├── FAQ.tsx              # Accordion FAQ
  │   ├── Contact/             # Contact form (ContactForm, ContactInfo, useContactForm, animations)
  │   ├── Testimonials.tsx / TestimonialsSimple.tsx
  │   ├── Clients.tsx          # Client logos
  │   ├── CalBookingSimple.tsx # Cal.com booking widget
  │   └── Footer.tsx
  ├── ui/                      # Reusable primitives (Button, Card, Input, 3d-card, Skeleton, etc.)
  ├── madurez-empresarial/     # Maturity assessment components
  ├── ClientLayout.tsx         # Client wrapper with Navbar, Particles, CursorGlow
  ├── Navbar.tsx               # Auto-hides near contact section, language switcher
  ├── JsonLdStructuredData.tsx # Schema.org structured data (10+ types)
  ├── PageSections.tsx         # Dynamic-import barrel for code splitting
  ├── WhatsAppButton.tsx / WhatsAppBooking.tsx
  ├── OptimizedParticles.tsx   # Particle background
  ├── CursorGlow.tsx           # Mouse glow effect
  └── SmoothScroll.tsx         # Lenis integration
/lib
  ├── translations.ts          # Full i18n strings (ES + EN), 500+ lines
  ├── seo.ts                   # SEOData interface + per-route metadata map
  ├── constants.ts             # ANIMATION, BREAKPOINTS, PARTICLES, NAVBAR, SEO, Z_INDEX, VALIDATION
  ├── animations.ts            # Framer Motion variants (headerStagger, blurUp, dividerGrow)
  ├── email.ts                 # Resend integration: confirmation + coach notification templates
  ├── validations.ts           # Zod schema: contact form (nombre, email, mensaje)
  ├── contact-service.ts       # Web3Forms API + mailto fallback
  ├── testimonials-data.ts     # 15+ testimonials array with avatars
  ├── utils.ts                 # cn() (clsx + tailwind-merge)
  ├── madurez-empresarial/
  │   ├── types.ts             # Question, Option, TestResults, MadurezDimension interfaces
  │   ├── questions.ts         # 5 questions × 5 options (score 1–5 each)
  │   └── calculator.ts        # MadurezCalculator: scoring, strengths/weaknesses, recommendations
  └── (scroll, haptics, logger, image-optimization, get-dictionary utilities)
/contexts
  ├── LanguageContext.tsx      # Language state from URL pathname; provides t (translations object)
  └── ThemeContext.tsx         # Dark/light mode from localStorage + system preference
/hooks
  └── useSSRLanguage.ts        # Returns 'es' during SSR, detects real lang on client (prevents hydration mismatch)
/styles
  ├── design-tokens.css        # Colors, typography, spacing, shadows, gradients, z-index scale
  ├── fluid-typography.css     # CSS clamp() responsive type (no breakpoints)
  ├── mobile-optimization.css  # Touch targets (44–48px min), safe area padding
  ├── particles.css            # Particle animation styles
  └── scrollbar.css            # Custom scrollbar
/tests                         # Playwright e2e tests
/scripts                       # Build/optimization scripts
```

## Architecture Notes

### i18n
- Language detected from URL pathname (`/en` = English, `/` = Spanish)
- `LanguageContext` provides `t` (translations object) to all components
- `useSSRLanguage` hook returns `'es'` during SSR to prevent hydration mismatches
- English homepage uses `CalBooking` instead of `WhatsAppBooking`

### Code Splitting
- `PageSections.tsx` barrel exports all sections as `dynamic()` imports
- Heavy libs (framer-motion, lucide-react) split into separate webpack chunks
- Components below the fold: `ssr: false` or lazy-loaded with skeleton fallbacks

### Styling Conventions
- Design tokens in `/styles/design-tokens.css` → CSS variables (`--brand-primary`, `--space-*`, etc.)
- Fluid typography via `clamp()` in `/styles/fluid-typography.css` — avoid fixed `text-*` breakpoints
- Use `cn()` from `lib/utils.ts` to merge Tailwind classes
- Path alias `@/` maps to project root

### SEO
- Rich JSON-LD structured data on every page (LocalBusiness, Service, Person, FAQPage, Review, etc.)
- Multilingual sitemap + hreflang tags via `Hreflang.tsx`
- Force-static pages with `revalidate: 3600`

### Email Flow
1. Contact form submits → Web3Forms API (fallback: `mailto:`)
2. On success → Resend sends user confirmation + coach notification to `CONTACT_EMAIL`

## Business Logic — Maturity Assessment

5-question self-assessment, 5 dimensions (20% weight each):
- **Organización** — team structure and roles
- **Comunicación** — information flow
- **Procesos** — workflow maturity and continuous improvement
- **Tecnología** — tooling and automation
- **Liderazgo** — leadership style (authoritarian → servant)

Scoring: each question 1–5 → total 25 max → percentage.
Levels: Inicial (0–40%) → Desarrollo (40–60%) → Maduro (60–80%) → Excelencia (80–100%).
Output: level, percentage, strengths (≥4), weaknesses (≤2), 6 recommendations, 4 next steps.

## Services Offered

1. **Coaching de Liderazgo** — individual coaching for tech leaders (decision-making, communication, conflict resolution)
2. **Consultoría Organizacional** — team structure, agile methodologies, culture frameworks
3. **Servicios Combinados** — full transformation engagements (custom pricing)

Process: Diagnosis → Design → Execution → Autonomy (12-week typical engagement)
