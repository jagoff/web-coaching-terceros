# Interaction Patterns Specification

## Overview
Standardized interaction patterns that ensure consistent, intuitive, and accessible user experiences across all components and sections.

## Pattern Philosophy

### Core Principles
- **Predictability**: Users should know what to expect
- **Feedback**: Every interaction provides clear feedback
- **Recovery**: Users can easily undo or correct actions
- **Efficiency**: Minimal effort to achieve goals
- **Accessibility**: Patterns work for all users

### Mental Models
```typescript
interface MentalModel {
  action: string;
  expectation: string;
  feedback: string;
  recovery: string;
}

const interactionModels: MentalModel[] = [
  {
    action: 'Click button',
    expectation: 'Immediate response or loading state',
    feedback: 'Visual change + loading indicator',
    recovery: 'Cancel or retry option'
  },
  {
    action: 'Submit form',
    expectation: 'Validation feedback or success message',
    feedback: 'Error messages or confirmation',
    recovery: 'Edit and resubmit'
  },
  {
    action: 'Navigate menu',
    expectation: 'Smooth transition to new section',
    feedback: 'Active state indication',
    recovery: 'Back button or breadcrumb'
  }
];
```

## Button Patterns

### Primary Actions
```typescript
interface PrimaryButtonPattern {
  appearance: {
    background: 'gradient' | 'solid';
    color: 'white' | 'brand';
    shadow: 'always' | 'hover' | 'none';
    border: 'none' | 'subtle';
  };
  interaction: {
    hover: 'scale' | 'glow' | 'lift';
    active: 'scale-down' | 'ripple' | 'press';
    loading: 'spinner' | 'skeleton' | 'dots';
    disabled: 'opacity' | 'grayscale' | 'hidden';
  };
  feedback: {
    success: 'checkmark' | 'confetti' | 'color-change';
    error: 'shake' | 'color-change' | 'icon';
  };
}
```

### Secondary Actions
```typescript
interface SecondaryButtonPattern {
  appearance: {
    background: 'transparent' | 'subtle';
    color: 'brand' | 'text';
    border: 'outline' | 'underline';
    shadow: 'none';
  };
  interaction: {
    hover: 'underline' | 'background' | 'scale';
    active: 'darken' | 'scale-down';
    loading: 'dots' | 'spinner-small';
    disabled: 'opacity' | 'hidden';
  };
}
```

### Icon Button Patterns
```typescript
interface IconButtonPattern {
  size: {
    sm: 32;  // px
    md: 40;  // px
    lg: 48;  // px
    xl: 56;  // px
  };
  interaction: {
    hover: 'scale' | 'background' | 'rotate';
    active: 'scale-down' | 'bounce';
    tooltip: 'always' | 'hover' | 'focus';
  };
  accessibility: {
    label: 'required';
    description: 'optional';
    keyboard: 'tabbable';
  };
}
```

## Form Patterns

### Input Field Patterns
```typescript
interface InputFieldPattern {
  states: {
    default: {
      border: 'subtle';
      background: 'white';
      shadow: 'none';
    };
    focus: {
      border: 'brand';
      background: 'white';
      shadow: 'glow';
    };
    error: {
      border: 'error';
      background: 'error-subtle';
      shadow: 'none';
    };
    success: {
      border: 'success';
      background: 'success-subtle';
      shadow: 'none';
    };
    disabled: {
      border: 'muted';
      background: 'muted';
      shadow: 'none';
    };
  };
  interactions: {
    validation: 'real-time' | 'on-blur' | 'on-submit';
    feedback: 'inline' | 'toast' | 'modal';
    helper: 'always' | 'focus' | 'error';
  };
}
```

### Form Submission Patterns
```typescript
interface FormSubmissionPattern {
  process: {
    validate: 'client-first' | 'server-first' | 'hybrid';
    submit: 'async' | 'sync' | 'optimistic';
    feedback: 'inline' | 'modal' | 'redirect';
  };
  loading: {
    button: 'spinner' | 'skeleton' | 'disabled';
    form: 'overlay' | 'skeleton' | 'disabled';
    fields: 'disabled' | 'skeleton' | 'normal';
  };
  error: {
    validation: 'field-level' | 'form-level' | 'both';
    network: 'toast' | 'modal' | 'inline';
    server: 'modal' | 'inline' | 'redirect';
  };
}
```

## Navigation Patterns

### Menu Patterns
```typescript
interface MenuPattern {
  types: {
    horizontal: {
      layout: 'flex' | 'grid';
      alignment: 'left' | 'center' | 'right';
      spacing: 'compact' | 'comfortable' | 'spacious';
    };
    vertical: {
      layout: 'stack' | 'accordion' | 'tree';
      indentation: 'subtle' | 'clear' | 'prominent';
      icons: 'none' | 'left' | 'right';
    };
    dropdown: {
      trigger: 'click' | 'hover' | 'focus';
      position: 'below' | 'right' | 'left';
      animation: 'fade' | 'slide' | 'scale';
    };
  };
  states: {
    active: 'background' | 'underline' | 'color';
    hover: 'background' | 'underline' | 'scale';
    focus: 'outline' | 'background' | 'underline';
    disabled: 'opacity' | 'hidden' | 'muted';
  };
}
```

### Breadcrumb Patterns
```typescript
interface BreadcrumbPattern {
  layout: {
    separator: 'arrow' | 'slash' | 'chevron' | 'dot';
    spacing: 'compact' | 'comfortable';
    alignment: 'left' | 'center';
  };
  interaction: {
    clickable: 'all' | 'except-current' | 'none';
    hover: 'underline' | 'background' | 'color';
    mobile: 'horizontal-scroll' | 'dropdown' | 'collapsible';
  };
  accessibility: {
    nav_label: 'required';
    current_page: 'aria-current';
    skip_links: 'optional';
  };
}
```

## Modal Patterns

### Modal Types
```typescript
interface ModalPattern {
  types: {
    dialog: {
      purpose: 'confirmation' | 'information' | 'warning';
      size: 'sm' | 'md' | 'lg' | 'fullscreen';
      backdrop: 'blur' | 'dark' | 'light';
    };
    sheet: {
      direction: 'right' | 'left' | 'top' | 'bottom';
      size: 'percentage' | 'fixed';
      overlay: 'subtle' | 'prominent';
    };
    fullscreen: {
      purpose: 'media' | 'form' | 'content';
      navigation: 'breadcrumb' | 'close-only' | 'steps';
      background: 'light' | 'dark' | 'adaptive';
    };
  };
  interactions: {
    open: 'fade' | 'slide' | 'scale' | 'none';
    close: 'fade' | 'slide' | 'scale' | 'none';
    escape: 'enabled' | 'disabled';
    backdrop: 'close' | 'disabled';
  };
}
```

### Modal Content Patterns
```typescript
interface ModalContentPattern {
  structure: {
    header: 'always' | 'optional' | 'none';
    body: 'scrollable' | 'fixed' | 'adaptive';
    footer: 'always' | 'optional' | 'none';
  };
  actions: {
    primary: 'right' | 'left' | 'center';
    secondary: 'right' | 'left' | 'center';
    danger: 'separate' | 'integrated';
  };
  scrolling: {
    body: 'auto' | 'overlay' | 'external';
    viewport: 'lock' | 'allow' | 'conditional';
  };
}
```

## Loading Patterns

### Loading States
```typescript
interface LoadingPattern {
  types: {
    skeleton: {
      purpose: 'content-preview' | 'structure-indication';
      animation: 'wave' | 'pulse' | 'shimmer';
      accuracy: 'precise' | 'approximate';
    };
    spinner: {
      size: 'sm' | 'md' | 'lg';
      color: 'brand' | 'muted' | 'adaptive';
      position: 'center' | 'inline' | 'overlay';
    };
    progress: {
      type: 'bar' | 'circle' | 'steps';
      determinate: 'always' | 'conditional';
      label: 'percentage' | 'steps' | 'custom';
    };
    placeholder: {
      content: 'generic' | 'specific' | 'branded';
      interaction: 'disabled' | 'skeleton' | 'shimmer';
    };
  };
  context: {
    button: 'spinner' | 'text' | 'skeleton';
    form: 'overlay' | 'disabled' | 'skeleton';
    image: 'skeleton' | 'placeholder' | 'blur';
    table: 'skeleton' | 'shimmer' | 'spinner';
  };
}
```

## Feedback Patterns

### Success Feedback
```typescript
interface SuccessPattern {
  types: {
    toast: {
      position: 'top-right' | 'bottom-right' | 'top-center';
      duration: 'short' | 'medium' | 'long' | 'sticky';
      action: 'dismiss' | 'undo' | 'view';
    };
    inline: {
      position: 'above' | 'below' | 'side';
      persistence: 'temporary' | 'persistent';
      icon: 'checkmark' | 'celebration' | 'custom';
    };
    modal: {
      purpose: 'confirmation' | 'celebration' | 'next-steps';
      size: 'sm' | 'md' | 'lg';
      auto_close: 'enabled' | 'disabled';
    };
  };
  content: {
    message: 'specific' | 'generic' | 'personalized';
    details: 'summary' | 'full' | 'expandable';
    next_action: 'suggested' | 'required' | 'optional';
  };
}
```

### Error Feedback
```typescript
interface ErrorPattern {
  severity: {
    critical: {
      presentation: 'modal' | 'page';
      recovery: 'retry' | 'contact' | 'refresh';
      persistence: 'persistent';
    };
    warning: {
      presentation: 'toast' | 'inline';
      recovery: 'continue' | 'fix' | 'ignore';
      persistence: 'temporary';
    };
    info: {
      presentation: 'inline' | 'toast';
      recovery: 'acknowledge' | 'dismiss';
      persistence: 'minimal';
    };
  };
  content: {
    message: 'specific' | 'generic' | 'helpful';
    cause: 'explained' | 'hidden' | 'technical';
    solution: 'provided' | 'suggested' | 'contact';
  };
}
```

## Animation Patterns

### Transition Patterns
```typescript
interface TransitionPattern {
  easing: {
    enter: 'ease-out' | 'ease-in-out' | 'bounce';
    exit: 'ease-in' | 'ease-in-out' | 'sharp';
    hover: 'ease-out' | 'bounce' | 'elastic';
  };
  duration: {
    fast: 150;    // ms - micro-interactions
    medium: 300;  // ms - standard transitions
    slow: 500;    // ms - complex animations
    page: 800;    // ms - page transitions
  };
  properties: {
    transform: 'gpu-accelerated';
    opacity: 'smooth';
    layout: 'animated';
    colors: 'interpolated';
  };
}
```

### Motion Principles
```typescript
interface MotionPrinciples {
  purpose: {
    attention: 'draw' | 'redirect' | 'maintain';
    feedback: 'confirm' | 'reject' | 'inform';
    navigation: 'guide' | 'transition' | 'reveal';
  };
  natural: {
    physics: 'gravity' | 'bounce' | 'spring';
    anticipation: 'preparation' | 'wind-up';
    follow_through: 'overshoot' | 'settle';
  };
  respectful: {
    reduced_motion: 'detect' | 'respect' | 'simplify';
    performance: '60fps' | 'gpu' | 'optimized';
    battery: 'conservative' | 'adaptive';
  };
}
```

## Responsive Patterns

### Breakpoint Patterns
```typescript
interface ResponsivePattern {
  breakpoints: {
    mobile: {
      max: 767;
      patterns: ['stack', 'accordion', 'slide-out'];
      interactions: ['tap', 'swipe', 'long-press'];
    };
    tablet: {
      min: 768;
      max: 1023;
      patterns: ['two-column', 'side-by-side', 'overlay'];
      interactions: ['tap', 'hover', 'keyboard'];
    };
    desktop: {
      min: 1024;
      patterns: ['multi-column', 'grid', 'floating'];
      interactions: ['hover', 'keyboard', 'mouse'];
    };
  };
  adaptation: {
    layout: 'restructure' | 'scale' | 'hide';
    navigation: 'collapse' | 'transform' | 'replace';
    content: 'reformat' | 'summarize' | 'prioritize';
  };
}
```

## Accessibility Patterns

### Focus Management
```typescript
interface FocusPattern {
  management: {
    trap: 'modal' | 'drawer' | 'dropdown';
    restore: 'previous' | 'first' | 'custom';
    skip: 'visible' | 'hidden' | 'conditional';
  };
  indication: {
    style: 'outline' | 'background' | 'underline';
    color: 'brand' | 'high-contrast' | 'custom';
    width: 'thin' | 'medium' | 'thick';
    offset: 'subtle' | 'clear' | 'prominent';
  };
  order: {
    logical: 'source' | 'visual' | 'custom';
    grouping: 'related' | 'container' | 'none';
    labels: 'explicit' | 'implicit' | 'custom';
  };
}
```

### Screen Reader Patterns
```typescript
interface ScreenReaderPattern {
  announcements: {
    changes: 'live-region' | 'aria-live' | 'alert';
    status: 'polite' | 'assertive' | 'off';
    context: 'minimal' | 'detailed' | 'progressive';
  };
  navigation: {
    landmarks: 'header' | 'main' | 'nav' | 'footer';
    headings: 'hierarchical' | 'flat' | 'semantic';
    lists: 'descriptive' | 'simple' | 'nested';
  };
  content: {
    images: 'decorative' | 'informative' | 'functional';
    links: 'descriptive' | 'contextual' | 'standalone';
    forms: 'grouped' | 'labeled' | 'instructed';
  };
}
```

## Testing Requirements

### Pattern Testing
```typescript
interface PatternTesting {
  visual: {
    screenshots: 'all-breakpoints';
    comparisons: 'pixel-perfect';
    regression: 'automated';
  };
  functional: {
    interactions: 'user-flows';
    accessibility: 'screen-readers';
    performance: 'animation-frames';
  };
  usability: {
    learnability: 'first-time-users';
    efficiency: 'task-completion';
    satisfaction: 'user-feedback';
  };
}
```

### Pattern Documentation
```typescript
interface PatternDocumentation {
  structure: {
    name: 'descriptive' | 'action-oriented';
    purpose: 'clear' | 'specific' | 'contextual';
    usage: 'examples' | 'guidelines' | 'anti-patterns';
  };
  implementation: {
    code: 'complete' | 'minimal' | 'copy-paste';
    props: 'documented' | 'typed' | 'validated';
    styles: 'consistent' | 'themed' | 'customizable';
  };
  maintenance: {
    version: 'semantic' | 'breaking' | 'compatibility';
    testing: 'coverage' | 'types' | 'accessibility';
    migration: 'guide' | 'automated' | 'supported';
  };
}
```

## Pattern Library Integration

### Component Mapping
```typescript
interface PatternComponentMap {
  button: {
    patterns: ['primary-action', 'secondary-action', 'icon-button'];
    variants: ['size', 'color', 'state', 'loading'];
    props: ['onClick', 'disabled', 'loading', 'children'];
  };
  input: {
    patterns: ['field-validation', 'form-submission'];
    variants: ['type', 'size', 'state', 'validation'];
    props: ['value', 'onChange', 'error', 'helper'];
  };
  modal: {
    patterns: ['dialog', 'sheet', 'fullscreen'];
    variants: ['size', 'backdrop', 'animation'];
    props: ['open', 'onClose', 'size', 'children'];
  };
}
```

### Design System Integration
```typescript
interface DesignSystemIntegration {
  tokens: {
    colors: 'semantic' | 'scale' | 'theme';
    typography: 'scale' | 'hierarchy' | 'brand';
    spacing: 'scale' | 'semantic' | 'rhythm';
    animation: 'duration' | 'easing' | 'motion';
  };
  themes: {
    light: 'default' | 'high-contrast' | 'blue-light';
    dark: 'default' | 'high-contrast' | 'warm-dark';
    custom: 'brand' | 'seasonal' | 'campaign';
  };
  customization: {
    overrides: 'component' | 'global' | 'theme';
    extensions: 'patterns' | 'components' | 'tokens';
    migration: 'automated' | 'manual' | 'supported';
  };
}
