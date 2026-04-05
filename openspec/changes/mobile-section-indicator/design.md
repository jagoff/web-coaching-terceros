## Context

El sitio coaching-landing actualmente tiene navegación desktop robusta pero carece de contexto visual para usuarios móviles. Los usuarios mobile navegan mediante scroll vertical a través de 9+ secciones principales sin indicador claro de posición actual, afectando la experiencia de usuario y navegación.

**Current State:**
- Navegación desktop funcional con menú fijo
- Mobile navigation con hamburger menu
- Sin indicador de sección actual en mobile
- Scroll largo sin contexto posicional

**Constraints:**
- Must preserve existing desktop navigation
- Mobile-first design approach
- Performance optimized para scroll events
- Accessibility compliance (WCAG)
- Maintain glassmorphism design system

## Goals / Non-Goals

**Goals:**
- Add visual section indicator for mobile users
- Implement smooth scroll tracking system
- Maintain consistent design with existing UI
- Provide immediate visual feedback of current section
- Support both ES/EN languages

**Non-Goals:**
- Modify desktop navigation behavior
- Add complex animations that affect performance
- Change existing scroll behavior
- Implement full-screen navigation overlay

## Decisions

**Intersection Observer API Approach:**
- **Why**: Native browser API, performant, battery-friendly
- **Alternative**: Scroll event listeners - Rejected due to performance impact
- **Chosen**: Intersection Observer with threshold 0.5 for section detection

**Fixed Position Indicator:**
- **Why**: Always visible, minimal UI footprint
- **Alternative**: Floating indicator - Rejected due to potential content overlap
- **Chosen**: Top-right fixed position with glassmorphism background

**Framer Motion Integration:**
- **Why**: Existing animation library, smooth transitions
- **Alternative**: CSS transitions - Rejected due to limited animation capabilities
- **Chosen**: Framer Motion variants for section transitions

**Component Architecture:**
- **Why**: Separation of concerns, reusability
- **Alternative**: Inline implementation - Rejected due to maintainability
- **Chosen**: Custom hook + dedicated component pattern

## Risks / Trade-offs

**Performance Risk**: Intersection Observer on multiple sections
- **Mitigation**: Single observer instance, optimized thresholds

**Mobile Space Usage**: Fixed UI element occupies screen space
- **Mitigation**: Minimal design, 32px height, transparent background

**Accessibility Risk**: Screen reader compatibility
- **Mitigation**: ARIA labels, semantic HTML structure

**Browser Compatibility**: Intersection Observer support
- **Mitigation**: Polyfill only if needed, modern browser focus

**Trade-off**: Simplicity vs Feature Richness
- Chose simple, clean indicator over complex breadcrumb navigation
