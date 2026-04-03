# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Landing page for **ELEVA CONSULTORIA** — coaching and organizational consulting for tech leaders and startups in Argentina. Built with Next.js 16 App Router, bilingual (ES/EN), Framer Motion animations, Cal.com booking, and Resend email.

## Build Commands

```bash
npm run dev              # Development server
npm run build            # Production build
npm run start            # Production server
npm run lint             # ESLint
npm run lint:fix         # Fix lint issues
npm run test             # Unit tests (Vitest)
npm run test:e2e         # E2E tests (Playwright)
npm run analyze          # Bundle analysis (ANALYZE=true)
npm run optimize:images  # Optimize images with Sharp
```

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4 + custom CSS design tokens + fluid typography (`clamp()`)
- **Animations**: Framer Motion variants exported from `lib/animations.ts`
- **Testing**: Vitest (unit, jsdom), Playwright (e2e + visual regression)
- **Email**: Resend (primary) + Web3Forms (fallback)
- **Icons**: Lucide React

## Environment Variables

```bash
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=   # Contact form backend
NEXT_PUBLIC_CALCOM_USERNAME=        # Cal.com booking
NEXT_PUBLIC_CALCOM_EVENT_TYPE_ID=30min
RESEND_API_KEY=                     # Email confirmations
CONTACT_EMAIL=                      # Recipient for form notifications
VERCEL_ENV=                         # Staging detection (disables robots indexing)
```

## Architecture

### Homepage Section Order

Both `app/page.tsx` (ES) and `app/en/page.tsx` (EN) render sections in this order:
```
Hero → Clients → ForWho → Services → About → Process → Results → Testimonials → Pricing → FAQ → Contact
```

**Hard constraint**: Contact is always the last section. The nano footer stamp (logo + copyright + Instagram) is embedded inside `Contact.tsx`, not a separate component. Nothing renders after Contact on the homepage.

Subpages (`/servicios`, `/sobre-mi`, `/precios`, `/faq`, `/testimonios`, `/casos-de-estudio`) use `Footer.tsx` as a separate bottom component.

### i18n

- Language detected from URL pathname (`/en` → English, `/` → Spanish)
- `LanguageContext` provides `t` (translations object) and `language` string to all components
- All copy lives in `lib/translations.ts` — never hardcode Spanish/English strings in components without a conditional
- `useSSRLanguage` hook returns `'es'` during SSR to avoid hydration mismatches
- English homepage uses `CalBooking` widget; Spanish uses `WhatsAppButton`

### Hydration Safety

Components that depend on `language` or browser APIs must be client-side. The hero section uses a split pattern:
- `HeroServer.tsx` — renders static shell for SSR, passes `ssrLanguage` prop
- `HeroClient.tsx` — handles animations, rotating phrases, particle effects

For other components: check `mounted` state before rendering dynamic content, or use the `NoSSR` wrapper component.

### Code Splitting

`PageSections.tsx` is the barrel file for below-fold sections — all exported via `dynamic()`. Heavy libs (framer-motion, lucide-react) are split into separate webpack chunks in `next.config.ts`. Do not import heavy libs at the top-level of SSR components.

### Design System Rules

Every new section must follow this pattern (read `Services.tsx` as the canonical example):

```tsx
<section className="section section-surface section-gold-border-top">
  <div className="container">
    <motion.div variants={headerStagger} ...>
      <span className="badge">…</span>
      <h2 className="heading-xl" style={{ fontFamily: "var(--font-heading)" }}>
        Title <span className="text-gradient">Highlighted</span>
      </h2>
      <motion.div variants={dividerGrow} className="divider-gold" />
    </motion.div>
    {/* content */}
  </div>
</section>
```

Key classes and tokens:
- `glass-card` — card background with backdrop blur and violet border
- `text-gradient` — violet→terracotta gradient text
- `badge` — pill label for section category
- `divider-gold` — 80px decorative horizontal rule
- `section-surface` — slightly elevated background
- `section-gold-border-top` — subtle violet border-top
- CSS vars: `--gold-primary`, `--violet-primary`, `--text-primary/secondary/muted`, `--font-heading`, `--font-body`
- Animation variants from `lib/animations.ts`: `headerStagger`, `blurUp`, `dividerGrow`, `slideLeft`

### Mobile-First Constraints

- All inputs and textareas must have `fontSize: '1rem'` (16px minimum) to prevent iOS auto-zoom
- Touch targets minimum 48px height
- Pricing section uses horizontal snap scroll on mobile (`flex overflow-x-auto snap-x snap-mandatory`) — each card is `flex-none w-[82vw]`
- Clients section uses a pure CSS marquee (`@keyframes clients-marquee`) — no JS scroll animation
- ContactSidebar is `hidden lg:block` — not rendered on mobile. A compact trust strip (availability + stats + stars) appears above the form on mobile only
- `clamp()` minimums must be ≥ `1rem` for body text, ≥ `1.5rem` for headings

### Contact Form

`components/sections/Contact/ConversationalContactForm.tsx` is a 4-step wizard:
1. Name input
2. Email input
3. Challenge selection (5 preset options + custom textarea)
4. Sending/success/error state

Form validation is in `useContactForm.ts` with Zod schema in `lib/validations.ts`. Submit flow: Web3Forms API → on success, Resend sends confirmation email + coach notification.

### Performance

- Inline critical CSS in `app/layout.tsx` `<head>` (prevents FOUC)
- Cache-Control headers in `next.config.ts`: `/_next/static` (immutable 1yr), `/images` (7d SWR), `/fonts` (immutable)
- Particle count: 0 on mobile (`< 768px`), 3 on desktop — see `HeroClient.tsx`
- `CursorGlow` deferred 500ms after mount in `ClientLayout.tsx`
- All pages are force-static with `revalidate: 3600`

### SEO

- JSON-LD structured data via `JsonLdStructuredData.tsx` (supports: LocalBusiness, Person, Service, FAQPage, WebPage, AggregateRating, etc.)
- Hreflang tags via `Hreflang.tsx` component in `<head>`
- `LangAttribute.tsx` updates `<html lang>` on client after hydration
- `public/llms.txt` for AI crawlers
- `robots.ts` allowlists Grok, YouBot, GeminiBot, Meta-ExternalAgent

## Business Logic — Maturity Assessment (`/madurez-empresarial`)

5-question self-assessment across 5 dimensions (Organización, Comunicación, Procesos, Tecnología, Liderazgo). Score 1–5 per question → percentage out of 100. Levels: Inicial (0–40%) → Desarrollo (40–60%) → Maduro (60–80%) → Excelencia (80–100%). Logic lives in `lib/madurez-empresarial/calculator.ts`.
