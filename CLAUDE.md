# CLAUDE.md

## Overview

Landing page for **ELEVA CONSULTORIA** — coaching and organizational consulting for tech leaders and startups in Argentina. Built with Next.js App Router, bilingual (ES/EN), with animations, Cal.com booking, and email integration.

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
- **Styling**: Tailwind CSS 4, Emotion, custom CSS design tokens
- **Animations**: Framer Motion, Lenis (smooth scrolling)
- **Testing**: Vitest (unit), Playwright (e2e + visual regression)
- **Email**: Resend
- **Booking**: Cal.com embed (`@calcom/embed-react`)
- **Icons**: Lucide React
- **Validation**: Zod

## Project Structure

```
/app                     # Next.js App Router pages
  ├── page.tsx           # Homepage
  ├── layout.tsx         # Root layout (fonts, metadata, providers)
  ├── en/                # English routes
  ├── precios/           # Pricing
  ├── servicios/         # Services
  ├── sobre-mi/          # About
  ├── testimonios/       # Testimonials
  ├── casos-de-estudio/  # Case studies
  ├── faq/               # FAQ
  └── madurez-empresarial/ # Maturity assessment tool
/components
  ├── sections/          # Page sections (hero, features, etc.)
  ├── ui/                # Reusable UI primitives
  └── madurez-empresarial/ # Assessment-specific components
/lib                     # Utilities, data, SEO helpers, email
/contexts                # LanguageContext (i18n), ThemeContext
/hooks                   # useSSRLanguage
/styles                  # Design tokens, fluid typography, animations
/tests                   # Playwright e2e tests
/scripts                 # Build/optimization scripts
```

## Architecture Notes

- **i18n**: Language switching via `LanguageContext`. Translations in `lib/translations.ts`. English routes under `/app/en/`.
- **SSR safety**: Use `useSSRLanguage` hook and `ClientLayout` wrapper to avoid hydration mismatches.
- **Path alias**: `@/` maps to project root.
- **Images**: WebP/AVIF with Sharp optimization pipeline; run `npm run optimize:images` after adding new images.
- **Environment**: Requires `.env.local` for dev (see `.env.example`).
