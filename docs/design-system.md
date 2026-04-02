# ELEVA CONSULTORIA - Design System

## 🎯 Design Principles

### 1. **Clarity First**
- Clear hierarchy and visual flow
- Readable typography and sufficient contrast
- Minimal cognitive load

### 2. **Professional Excellence**
- Sophisticated color palette
- Consistent spacing and rhythm
- Premium visual quality

### 3. **Trust & Credibility**
- Reliable feedback systems
- Consistent behavior patterns
- Professional aesthetics

### 4. **Conversion-Oriented**
- Clear CTAs with proper hierarchy
- Frictionless user flows
- Mobile-first responsive design

---

## 🎨 Color System

### Primary Palette
```css
/* Brand Colors */
--brand-primary: #6366f1;    /* Indigo-600 */
--brand-secondary: #8b5cf6;  /* Violet-600 */
--brand-accent: #10b981;     /* Emerald-600 */

/* Semantic Colors */
--success: #10b981;          /* Emerald-600 */
--warning: #f59e0b;          /* Amber-500 */
--error: #ef4444;            /* Red-500 */
--info: #3b82f6;             /* Blue-500 */
```

### Gradient System
```css
/* Primary Gradients */
--gradient-primary: linear-gradient(135deg, #6366f1, #8b5cf6);
--gradient-success: linear-gradient(135deg, #10b981, #14b8a6);
--gradient-accent: linear-gradient(135deg, #f43f5e, #ec4899);

/* Subtle Gradients */
--gradient-subtle-1: linear-gradient(135deg, #f8fafc, #f1f5f9);
--gradient-subtle-2: linear-gradient(135deg, #1e293b, #334155);
```

### Neutral Scale
```css
--gray-50: #f8fafc;
--gray-100: #f1f5f9;
--gray-200: #e2e8f0;
--gray-300: #cbd5e1;
--gray-400: #94a3b8;
--gray-500: #64748b;
--gray-600: #475569;
--gray-700: #334155;
--gray-800: #1e293b;
--gray-900: #0f172a;
```

---

## 📐 Typography System

### Font Families
```css
--font-heading: 'Inter', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Type Scale
```css
/* Headings */
--text-4xl: 2.25rem;    /* 36px */
--text-3xl: 1.875rem;  /* 30px */
--text-2xl: 1.5rem;    /* 24px */
--text-xl: 1.25rem;    /* 20px */
--text-lg: 1.125rem;   /* 18px */

/* Body */
--text-base: 1rem;     /* 16px */
--text-sm: 0.875rem;   /* 14px */
--text-xs: 0.75rem;    /* 12px */

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## 🎯 Atomic Design System

### Atoms (Basic Building Blocks)

#### Buttons
```typescript
// Primary Button
<Button variant="primary" size="lg">
  Primary Action
</Button>

// Secondary Button
<Button variant="secondary" size="md">
  Secondary Action
</Button>

// Ghost Button
<Button variant="ghost" size="sm">
  Ghost Action
</Button>
```

#### Form Elements
```typescript
// Input Field
<Input placeholder="Enter your email" />

// Textarea
<Textarea placeholder="Your message" rows={4} />

// Select
<Select options={options} />
```

#### Icons
```typescript
// Icon System
<Icon name="user" size="sm" />
<Icon name="mail" size="md" />
<Icon name="send" size="lg" />
```

### Molecules (Simple Components)

#### Form Groups
```typescript
// Form Field
<FormField label="Email" error="Invalid email">
  <Input type="email" />
</FormField>

// Search Box
<SearchBox placeholder="Search..." />
```

#### Cards
```typescript
// Basic Card
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

#### Badges
```typescript
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Error</Badge>
```

### Organisms (Complex Components)

#### Contact Form
```typescript
<ContactForm>
  <FormField label="Name">
    <Input />
  </FormField>
  <FormField label="Email">
    <Input type="email" />
  </FormField>
  <FormField label="Message">
    <Textarea />
  </FormField>
  <Button variant="primary" type="submit">
    Send Message
  </Button>
</ContactForm>
```

#### Navigation
```typescript
<Navigation>
  <Logo />
  <NavMenu />
  <CTAButton />
</Navigation>
```

#### Hero Section
```typescript
<Hero>
  <HeroHeadline>Transform Your Team</HeroHeadline>
  <HeroSubheadline>Build high-performing teams</HeroSubheadline>
  <CTAButton variant="primary">Get Started</CTAButton>
</Hero>
```

---

## 📏 Spacing System

### Scale
```css
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
--space-24: 6rem;     /* 96px */
```

### Usage Patterns
```css
/* Component Padding */
--padding-xs: var(--space-2);
--padding-sm: var(--space-4);
--padding-md: var(--space-6);
--padding-lg: var(--space-8);
--padding-xl: var(--space-12);

/* Component Gaps */
--gap-xs: var(--space-2);
--gap-sm: var(--space-4);
--gap-md: var(--space-6);
--gap-lg: var(--space-8);
--gap-xl: var(--space-12);
```

---

## 🎭 Animation System

### Durations
```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

### Easing
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Motion Patterns
```typescript
// Micro-interactions
const buttonHover = {
  scale: 1.02,
  transition: { duration: 150 }
};

// Page transitions
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 300 }
};

// Stagger animations
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

---

## 📱 Component Library Structure

### File Organization
```
components/
├── ui/                    # Atoms
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Icon.tsx
│   └── Badge.tsx
├── molecules/            # Molecules
│   ├── FormField.tsx
│   ├── Card.tsx
│   └── SearchBox.tsx
├── organisms/            # Organisms
│   ├── ContactForm.tsx
│   ├── Navigation.tsx
│   └── Hero.tsx
└── templates/            # Templates
    ├── PageLayout.tsx
    └── SectionLayout.tsx
```

---

## 🎯 Component Variants

### Button System
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'outline';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}
```

### Card System
```typescript
interface CardProps {
  variant: 'default' | 'elevated' | 'glass';
  padding: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}
```

---

## 🔧 Implementation Guidelines

### 1. **Consistency First**
- Always use design tokens
- Follow naming conventions
- Maintain visual hierarchy

### 2. **Accessibility**
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation
- Color contrast compliance

### 3. **Performance**
- Optimize images and assets
- Lazy load components
- Minimize re-renders
- Use CSS transforms for animations

### 4. **Responsive Design**
- Mobile-first approach
- Fluid typography
- Flexible grid system
- Touch-friendly targets

---

## 🚀 Usage Examples

### Contact Section
```typescript
<ContactSection>
  <ContactInfo>
    <BenefitCard
      icon="sparkles"
      title="Free Session"
      description="No commitment consultation"
      gradient="emerald-teal"
    />
    <CTAButton variant="primary" size="lg">
      Book Free Session
    </CTAButton>
  </ContactInfo>
  
  <ContactForm>
    <FormField label="Name">
      <Input placeholder="Your name" />
    </FormField>
    <FormField label="Email">
      <Input type="email" placeholder="email@example.com" />
    </FormField>
    <FormField label="Message">
      <Textarea placeholder="Tell us about your challenge" />
    </FormField>
    <Button variant="secondary" size="md">
      Send via Form
    </Button>
  </ContactForm>
</ContactSection>
```

---

## 📋 Design Tokens

### CSS Variables Implementation
```css
:root {
  /* Colors */
  --brand-primary: #6366f1;
  --brand-secondary: #8b5cf6;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  
  /* Typography */
  --font-heading: 'Inter', system-ui, sans-serif;
  --text-xl: 1.25rem;
  --font-semibold: 600;
  
  /* Spacing */
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  
  /* Effects */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  
  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}
```

---

## 🔄 Evolution Strategy

### Phase 1: Foundation
- [ ] Define design tokens
- [ ] Create atomic components
- [ ] Establish color system

### Phase 2: Components
- [ ] Build molecules
- [ ] Create organisms
- [ ] Implement templates

### Phase 3: Documentation
- [ ] Component documentation
- [ ] Usage guidelines
- [ ] Design principles

### Phase 4: Optimization
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] User testing

---

## 📊 Success Metrics

### Design Quality
- Visual consistency score
- Component reusability rate
- Design system adoption

### User Experience
- Task completion rate
- User satisfaction score
- Accessibility compliance

### Development Efficiency
- Component usage frequency
- Build time reduction
- Bug rate decrease

---

*This design system is a living document that evolves with the product and user needs.*
