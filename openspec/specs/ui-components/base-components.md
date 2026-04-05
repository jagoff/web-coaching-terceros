# Base UI Components Specification

## Overview
Standardized UI components that form the foundation of all user interface elements in the coaching-landing project.

## Component Philosophy

### Design Principles
- **Mobile First**: All components designed for mobile first, then enhanced for desktop
- **Accessibility First**: WCAG-AA compliance built into every component
- **Performance Optimized**: Minimal bundle impact, 60fps animations
- **Consistent API**: Uniform prop interfaces across all components

### TypeScript Standards
```typescript
// Base component interface
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  testId?: string;
  'aria-label'?: string;
}

// Animation interface
interface AnimationProps {
  whileHover?: object;
  whileTap?: object;
  transition?: object;
  initial?: object;
  animate?: object;
}
```

## Core Components

### Button Component
**Location**: `/components/ui/Button.tsx`

**Props Interface**:
```typescript
interface ButtonProps extends BaseComponentProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  onClick?: () => void;
}
```

**Variants**:
- **Primary**: Gradient background, white text, shadow
- **Secondary**: Solid background, white text
- **Outline**: Transparent background, border, colored text
- **Ghost**: Transparent background, colored text, no border

**Size Standards**:
- **sm**: padding 0.5rem 1rem, text-sm
- **md**: padding 0.75rem 1.5rem, text-base
- **lg**: padding 1rem 2rem, text-lg
- **xl**: padding 1.25rem 2.5rem, text-xl

**Accessibility Requirements**:
- Minimum 44px touch target
- Keyboard navigation support
- Screen reader announcements
- Focus management

### Card Component
**Location**: `/components/ui/Card.tsx`

**Props Interface**:
```typescript
interface CardProps extends BaseComponentProps {
  variant: 'default' | 'glass' | 'gradient' | 'elevated';
  padding: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded: 'none' | 'sm' | 'md' | 'lg' | 'full';
  shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  interactive?: boolean;
}
```

**Variants**:
- **Default**: White background, subtle shadow
- **Glass**: Backdrop blur, transparent background
- **Gradient**: Gradient background, no border
- **Elevated**: Higher shadow, hover lift effect

### Input Component
**Location**: `/components/ui/Input.tsx`

**Props Interface**:
```typescript
interface InputProps extends BaseComponentProps {
  type: 'text' | 'email' | 'tel' | 'password';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: LucideIcon;
}
```

**Validation States**:
- **Default**: Border-gray-300
- **Focus**: Border-blue-500, ring-2 ring-blue-200
- **Error**: Border-red-500, text-red-600
- **Success**: Border-green-500, text-green-600

## Design Tokens

### Color System
```css
:root {
  /* Primary Colors */
  --color-primary-50: #f0f9ff;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  
  /* Semantic Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
  
  /* Neutral Colors */
  --color-gray-50: #f9fafb;
  --color-gray-900: #111827;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
```

### Typography Scale
```css
:root {
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;     /* 24px */
  --font-size-3xl: 1.875rem;   /* 30px */
  --font-size-4xl: 2.25rem;    /* 36px */
  
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

### Spacing Scale
```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
}
```

## Animation Standards

### Motion Principles
- **Purposeful**: Every animation has a clear purpose
- **Natural**: Follows physical world expectations
- **Efficient**: 60fps performance target
- **Respectful**: Honors user motion preferences

### Common Animations
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Scale In */
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Slide In */
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
```

### Timing Functions
```css
:root {
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

## Responsive Standards

### Breakpoint System
```css
:root {
  --breakpoint-sm: 640px;   /* Small phones */
  --breakpoint-md: 768px;   /* Tablets */
  --breakpoint-lg: 1024px;  /* Small desktops */
  --breakpoint-xl: 1280px;  /* Desktops */
  --breakpoint-2xl: 1536px; /* Large desktops */
}
```

### Mobile First Approach
```css
/* Base styles (mobile) */
.component {
  padding: var(--space-4);
  font-size: var(--font-size-base);
}

/* Tablet */
@media (min-width: 768px) {
  .component {
    padding: var(--space-6);
    font-size: var(--font-size-lg);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .component {
    padding: var(--space-8);
    font-size: var(--font-size-xl);
  }
}
```

## Testing Requirements

### Unit Testing
- Component rendering tests
- Prop validation tests
- Accessibility tests
- User interaction tests

### Visual Testing
- Screenshot comparisons
- Responsive design verification
- Cross-browser compatibility
- Dark mode support

### Performance Testing
- Bundle size impact
- Render performance
- Memory usage
- Animation frame rates

## Usage Examples

### Button Implementation
```typescript
import { Button } from '@/components/ui/Button';

// Primary button with icon
<Button
  variant="primary"
  size="lg"
  icon={Sparkles}
  iconPosition="left"
  onClick={handleClick}
>
  Get Started
</Button>

// Secondary outline button
<Button
  variant="outline"
  size="md"
  href="/contact"
>
  Contact Us
</Button>
```

### Card Implementation
```typescript
import { Card } from '@/components/ui/Card';

// Glass card with hover
<Card
  variant="glass"
  padding="lg"
  rounded="lg"
  hover={true}
  className="w-full"
>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

## Maintenance Guidelines

### Component Updates
- Semantic versioning for breaking changes
- Backward compatibility maintenance
- Deprecation warnings for old APIs
- Migration guides for major updates

### Documentation Requirements
- Prop interface documentation
- Usage examples for each variant
- Accessibility notes
- Performance considerations

### Code Quality
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Husky pre-commit hooks
