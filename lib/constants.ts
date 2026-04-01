/**
 * Application-wide constants
 * Centralized magic numbers and configuration values
 */

// Animation timing constants
export const ANIMATION = {
  DELAYS: {
    STAGGER_CHILDREN: 0.15,
    DELAY_CHILDREN: 0.2,
    CARD_REVEAL: 0.3,
    BENEFIT_STAGGER: 0.06,
    BENEFIT_DELAY: 0.4,
  },
  DURATIONS: {
    FAST: 0.15,
    BASE: 0.3,
    SLOW: 0.5,
    REVEAL: 0.9,
    SCALE: 0.7,
  },
  EASING: {
    SMOOTH: [0.22, 1, 0.36, 1] as const,
    BOUNCE: [0.34, 1.56, 0.64, 1] as const,
    OUT: [0, 0, 0.2, 1] as const,
  },
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Particle configuration
export const PARTICLES = {
  COUNT: {
    MOBILE: 3,
    DESKTOP: 10,
  },
  SIZE: {
    MIN: 2,
    MAX: 4,
  },
  OPACITY: {
    MIN: 0.1,
    MAX: 0.3,
  },
} as const;

// Touch target sizes (WCAG compliance)
export const TOUCH_TARGETS = {
  MIN_HEIGHT: 44, // px - WCAG 2.1 Level AAA
  MIN_WIDTH: 44,  // px
  RECOMMENDED: 48, // px - Better UX
} as const;

// Navbar configuration
export const NAVBAR = {
  SCROLL_THRESHOLD: 40, // px
  HIDE_OFFSET: 200, // px before contact section
  MOBILE_HEIGHT: 88, // px
  DESKTOP_HEIGHT: 88, // px
} as const;

// Performance thresholds
export const PERFORMANCE = {
  LAZY_LOAD_MARGIN: '-100px',
  IMAGE_QUALITY: 75,
  REVALIDATE_TIME: 3600, // seconds (1 hour)
} as const;

// SEO configuration
export const SEO = {
  DEFAULT_LOCALE: 'es-AR',
  SUPPORTED_LOCALES: ['es-AR', 'en-US'] as const,
  SITE_URL: 'https://eleva-consultoria.com',
  SITE_NAME: 'ELEVA CONSULTORIA',
} as const;

// Color contrast ratios (WCAG)
export const WCAG = {
  CONTRAST: {
    AA_NORMAL: 4.5,
    AA_LARGE: 3.0,
    AAA_NORMAL: 7.0,
    AAA_LARGE: 4.5,
  },
  FONT_SIZE: {
    MINIMUM: 16, // px - WCAG recommendation
    LARGE_TEXT: 18, // px - 18pt = 24px
  },
} as const;

// Z-index layers
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
} as const;

// Form validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_MESSAGE_LENGTH: 10,
  MAX_MESSAGE_LENGTH: 1000,
} as const;
