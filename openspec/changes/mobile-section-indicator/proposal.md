## Why

Los usuarios móviles navegan por scroll vertical largo sin contexto claro de qué sección están viendo, dificultando la navegación y comprensión del contenido del sitio.

## What Changes

- **Nuevo componente MobileSectionIndicator**: Indicador visual de sección actual en mobile
- **Sistema de tracking de scroll**: Detección automática de sección visible
- **Integración con navegación existente**: Sin afectar desktop navigation
- **Animaciones suaves**: Transiciones entre secciones con Framer Motion

## Capabilities

### New Capabilities
- `mobile-section-indicator`: Sistema de indicación de sección actual para dispositivos móviles con tracking de scroll y animaciones fluidas

### Modified Capabilities
- `responsive-design`: Actualización para incluir componente mobile-specific con breakpoint management

## Impact

- **Componentes**: Nuevo MobileSectionIndicator.tsx en components/ui/
- **Hooks**: Custom hook useSectionTracker para scroll detection
- **Layout**: Modificación en ClientLayout.tsx para integrar indicador
- **CSS**: Estilos mobile-first con glassmorphism effects
- **Performance**: Optimizado con Intersection Observer API
