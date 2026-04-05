# Hero Section Specification

## Overview
The hero section is the primary landing experience, designed to capture attention, communicate value proposition, and drive user action within 3-5 seconds.

## Component Architecture

### Structure
```
HeroSection/
├── HeroClient.tsx          # Main client component
├── HeroBackground.tsx      # Background elements
├── HeroContent.tsx         # Text content and CTAs
├── HeroStats.tsx          # Social proof/stats
└── HeroTestimonial.tsx    # Rotating testimonials
```

### Props Interface
```typescript
interface HeroSectionProps {
  variant: 'default' | 'minimal' | 'video' | 'animated';
  background: 'gradient' | 'image' | 'video' | 'particles';
  showStats: boolean;
  showTestimonial: boolean;
  primaryCTA: CTAConfig;
  secondaryCTA?: CTAConfig;
}

interface CTAConfig {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
  icon?: LucideIcon;
  tracking?: AnalyticsEvent;
}
```

## Content Strategy

### Headline System
**Primary Headline Requirements**:
- Length: 4-7 words maximum
- Impact: Immediate value proposition
- Clarity: No jargon or ambiguity
- Emotion: Connect with user pain point

**Examples**:
- "Transforma tu equipo en 90 días"
- "Liderazgo ágil que escala con tu negocio"
- "De equipos frustrados a alto rendimiento"

### Subheadline System
**Supporting Copy Requirements**:
- Length: 8-12 words maximum
- Function: Explain how the headline is achieved
- Credibility: Hint at methodology or experience
- Relevance: Directly address target audience

**Examples**:
- "Metodología Scrum.org certificada para empresas tech"
- "Coaching personalizado para líderes de equipos remotos"
- "Resultados medibles en menos de 6 meses"

### Value Proposition
**Three-Point System**:
1. **Problem**: Briefly state the pain point
2. **Solution**: How you solve it
3. **Outcome**: Result they can expect

## Visual Design

### Layout Grid
```css
.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  min-height: 100vh;
  padding: var(--space-6);
  
  /* Tablet */
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    padding: var(--space-8);
  }
  
  /* Desktop */
  @media (min-width: 1024px) {
    gap: var(--space-16);
    padding: var(--space-12);
  }
}
```

### Typography Scale
```css
.hero-headline {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-4);
}

.hero-subheadline {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-gray-600);
  margin-bottom: var(--space-6);
}
```

### Color System
```css
.hero-variants {
  /* Default - Professional blue */
  --hero-primary: #1e40af;
  --hero-secondary: #3b82f6;
  --hero-accent: #60a5fa;
  
  /* Success - Green */
  --hero-primary: #059669;
  --hero-secondary: #10b981;
  --hero-accent: #34d399;
  
  /* Premium - Purple */
  --hero-primary: #6b21a8;
  --hero-secondary: #9333ea;
  --hero-accent: #a855f7;
}
```

## Background Systems

### Gradient Backgrounds
```typescript
interface GradientConfig {
  type: 'linear' | 'radial' | 'conic';
  colors: string[];
  angle?: number;
  position?: string;
}

const heroGradients: Record<string, GradientConfig> = {
  professional: {
    type: 'linear',
    colors: ['#1e40af', '#3730a3', '#1e1b4b'],
    angle: 135
  },
  energetic: {
    type: 'radial',
    colors: ['#f59e0b', '#d97706', '#92400e'],
    position: 'center'
  },
  modern: {
    type: 'conic',
    colors: ['#8b5cf6', '#6366f1', '#3b82f6'],
    angle: 45
  }
};
```

### Particle System
```typescript
interface ParticleConfig {
  count: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  connectionDistance: number;
}

const particleConfig: ParticleConfig = {
  count: 50,
  size: 2,
  speed: 0.5,
  opacity: 0.3,
  color: '#ffffff',
  connectionDistance: 150
};
```

## Call-to-Action System

### Button Hierarchy
```typescript
interface CTAHierarchy {
  primary: {
    size: 'lg' | 'xl';
    variant: 'primary';
    icon: LucideIcon;
    animation: 'pulse' | 'bounce' | 'glow';
  };
  secondary: {
    size: 'md' | 'lg';
    variant: 'outline' | 'ghost';
    icon?: LucideIcon;
    animation?: 'none';
  };
}
```

### CTA Placement
- **Above Fold**: Primary CTA immediately visible
- **After Content**: Secondary CTA after value proposition
- **Floating**: Sticky CTA on mobile after scroll

### Conversion Optimization
```typescript
interface CTAOptimization {
  text: {
    actionWords: ['Empieza', 'Comienza', 'Reserva', 'Agenda'];
    benefitWords: ['Gratis', 'Sin compromiso', 'Ahora'];
    urgencyWords: ['Hoy', 'Ahora', 'Inmediato'];
  };
  design: {
    contrast: 4.5; // WCAG AA minimum
    size: 44px; // Minimum touch target
    spacing: 16px; // From other elements
  };
  psychology: {
    socialProof: 'Únete a 50+ empresas';
    riskReversal: 'Sesión gratuita';
    scarcity: 'Plazas limitadas';
  };
}
```

## Animation System

### Entrance Animations
```typescript
interface AnimationSequence {
  initial: { opacity: 0; y: 20 };
  animate: { opacity: 1; y: 0 };
  transition: { duration: 0.6; ease: 'easeOut' };
}

const heroAnimations = {
  headline: {
    ...animationSequence,
    transition: { duration: 0.8, delay: 0.1 }
  },
  subheadline: {
    ...animationSequence,
    transition: { duration: 0.8, delay: 0.2 }
  },
  primaryCTA: {
    ...animationSequence,
    transition: { duration: 0.8, delay: 0.3 }
  },
  secondaryCTA: {
    ...animationSequence,
    transition: { duration: 0.8, delay: 0.4 }
  }
};
```

### Micro-interactions
```css
.cta-button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
}

.cta-button:active {
  transform: translateY(0);
  box-shadow: 0 5px 15px -3px rgba(0, 0, 0, 0.2);
}
```

## Content Variants

### Industry Specific
```typescript
interface IndustryVariant {
  name: string;
  headline: string;
  subheadline: string;
  painPoints: string[];
  outcomes: string[];
  socialProof: string;
}

const industryVariants: Record<string, IndustryVariant> = {
  technology: {
    name: 'Technology',
    headline: 'Equipos tech que entregan valor',
    subheadline: 'Metodologías ágiles para desarrollo de software a escala',
    painPoints: ['Retrasos constantes', 'Comunicación frágil', 'Burnout del equipo'],
    outcomes: ['Entregas predecibles', 'Equipos motivados', 'Calidad consistente'],
    socialProof: '50+ empresas tech confían en nosotros'
  },
  finance: {
    name: 'Finance',
    headline: 'Transformación digital en finanzas',
    subheadline: 'Agilidad y compliance para instituciones financieras',
    painPoints: ['Procesos lentos', 'Resistencia al cambio', 'Riesgos operativos'],
    outcomes: ['Innovación rápida', 'Cultura adaptativa', 'Gestión de riesgos'],
    socialProof: '15+ instituciones financieras transformadas'
  }
};
```

### Persona Based
```typescript
interface PersonaVariant {
  name: string;
  role: string;
  challenges: string[];
  goals: string[];
  messaging: string;
}

const personaVariants: Record<string, PersonaVariant> = {
  cto: {
    name: 'CTO',
    role: 'Chief Technology Officer',
    challenges: [
      'Escalar equipos sin perder calidad',
      'Mantener velocidad de desarrollo',
      'Gestionar equipos remotos'
    ],
    goals: [
      'Entregas predecibles',
      'Equipos autónomos',
      'Innovación constante'
    ],
    messaging: 'Lidera equipos tech de alto rendimiento'
  },
  ceo: {
    name: 'CEO',
    role: 'Chief Executive Officer',
    challenges: [
      'Transformación organizacional',
      'Competitividad digital',
      'Crecimiento sostenible'
    ],
    goals: [
      'Agilidad empresarial',
      'Ventaja competitiva',
      'Resultados medibles'
    ],
    messaging: 'Transforma tu organización para el futuro'
  }
};
```

## Performance Requirements

### Core Web Vitals
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Optimization Strategies
```typescript
interface PerformanceConfig {
  images: {
    format: 'webp' | 'avif';
    loading: 'eager' | 'lazy';
    sizes: string[];
    srcset: string[];
  };
  fonts: {
    display: 'swap' | 'optional';
    preload: boolean;
    subset: string[];
  };
  animations: {
    reducedMotion: boolean;
    willChange: string[];
    gpuAccelerated: boolean;
  };
}
```

### Bundle Optimization
```typescript
// Dynamic imports for heavy components
const HeroBackground = lazy(() => import('./HeroBackground'));
const HeroStats = lazy(() => import('./HeroStats'));

// Code splitting by variant
const HeroVariant = lazy(() => 
  import(`./variants/${variant}`).then(mod => mod.default)
);
```

## Testing Requirements

### Visual Testing
- Screenshot comparisons across devices
- Responsive design verification
- Color contrast validation
- Font rendering consistency

### Performance Testing
- Lighthouse scores > 90
- Bundle size analysis
- Memory usage monitoring
- Animation frame rate testing

### Accessibility Testing
- Screen reader compatibility
- Keyboard navigation
- Focus management
- Color contrast compliance

### A/B Testing
```typescript
interface ABTestConfig {
  name: string;
  variants: string[];
  traffic: number; // percentage
  metrics: ('conversion' | 'engagement' | 'bounce')[];
  duration: number; // days
}

const heroABTests: ABTestConfig[] = [
  {
    name: 'headline-impact',
    variants: ['transforma-equipos', 'liderazgo-agil', 'alto-rendimiento'],
    traffic: 50,
    metrics: ['conversion', 'engagement'],
    duration: 14
  }
];
```

## Analytics Integration

### Tracking Events
```typescript
interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: Date;
  userId?: string;
  sessionId: string;
}

const heroAnalytics = {
  'hero_view': {
    event: 'hero_view',
    properties: {
      variant: string,
      industry: string,
      persona: string
    }
  },
  'cta_click': {
    event: 'cta_click',
    properties: {
      button_type: 'primary' | 'secondary',
      button_text: string,
      position: number
    }
  },
  'form_start': {
    event: 'form_start',
    properties: {
      form_type: string,
      trigger: string
    }
  }
};
```

### Heatmap Integration
```typescript
interface HeatmapConfig {
  provider: 'hotjar' | 'clarity' | 'fullstory';
  tracking: {
    clicks: boolean;
    scrolls: boolean;
    movement: boolean;
  };
  sampling: number; // percentage of users
}
```

## Maintenance Guidelines

### Content Updates
- Headline review monthly
- CTA performance analysis weekly
- Industry variant updates quarterly
- Persona messaging validation bi-annually

### Performance Monitoring
- Core Web Vitals tracking
- Bundle size monitoring
- Animation performance testing
- Mobile optimization verification

### Accessibility Audits
- Screen reader testing quarterly
- Keyboard navigation verification
- Color contrast validation
- Focus management testing
