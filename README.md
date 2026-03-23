# ELEVA CONSULTORA - Landing Page de Coaching y Consultoría Ágil

## 📋 Descripción del Proyecto

**ELEVA CONSULTORA** es una landing page moderna y optimizada para servicios de coaching de liderazgo y consultoría organizacional. El sitio está diseñado para líderes tech, founders de startups y empresas que buscan transformación ágil y desarrollo de equipos de alto rendimiento.

### 🎯 Propósito Principal

- **Generación de leads**: Capturar potenciales clientes a través de formulario de contacto y booking de sesiones gratuitas
- **Posicionamiento profesional**: Mostrar experiencia y credibilidad en coaching ágil y consultoría organizacional
- **Educación de mercado**: Explicar el valor del coaching de liderazgo y la transformación organizacional
- **Conversión**: Facilitar el agendamiento de sesiones de diagnóstico gratuitas

---

## 🛠️ Stack Tecnológico

### Framework Principal
- **Next.js 16.1.6** con App Router
- **React 19.2.3** con Server Components
- **TypeScript 5** para tipado estricto

### Estilos y UI
- **TailwindCSS 4** para diseño utility-first
- **Framer Motion 12.35.1** para animaciones complejas
- **GSAP 3.14.2** para animaciones de alto rendimiento
- **Lucide React 0.577.0** para iconos

### Internacionalización
- **Sistema de i18n personalizado** con Context API
- **Español (default) e Inglés** con manejo de rutas URL
- **Traducciones tipadas** en `/lib/translations.ts`

### Animaciones y Efectos
- **Framer Motion**: Animaciones de scroll, transiciones y micro-interacciones
- **GSAP**: Animaciones complejas de partículas y efectos visuales
- **TSParticles**: Sistema de partículas interactivas
- **Lenis 1.3.18**: Smooth scroll optimizado

### Formularios y Contacto
- **Zod 4.3.6**: Validación de formularios tipada
- **Resend 6.9.3**: Envío de emails transaccionales
- **@calcom/embed-react 1.5.3**: Integración de booking de sesiones

### Testing y QA
- **Playwright 1.58.2**: E2E testing con visual testing
- **Vitest 4.0.18**: Unit testing con React Testing Library
- **ESLint + Prettier**: Code formatting y linting

---

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios Clave

```
├── app/                     # App Router de Next.js
│   ├── page.tsx            # Página principal
│   ├── layout.tsx          # Layout raíz con metadata SEO
│   ├── globals.css         # Estilos globales
│   └── en/                 # Páginas en inglés
├── components/
│   ├── sections/           # Secciones principales de la página
│   ├── ui/                 # Componentes UI reutilizables
│   └── experimental/       # Componentes en desarrollo
├── contexts/               # React Context providers
├── lib/                    # Utilidades y configuración
├── hooks/                  # Custom React hooks
├── styles/                 # Estilos adicionales
└── tests/                  # Playwright E2E tests
```

### Arquitectura de Componentes

#### 1. **Dynamic Imports Strategy**
```typescript
// PageSections.tsx - Loading optimizado
export const Hero = dynamic(() => import('@/components/sections/Hero'), {
  ssr: false,
  loading: () => <LoadingFallback />
})
```

#### 2. **Client-Side Rendering Selectivo**
- **SSR desactivado** para componentes con animaciones complejas
- **Hydration-safe** con `suppressHydrationWarning`
- **Loading states** para mejor UX

#### 3. **Sistema de Traducciones**
```typescript
// Contexto tipado con inferencia automática
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations.es
}
```

---

## ⚙️ Configuraciones Clave

### Next.js Configuration (`next.config.js`)

#### Optimizaciones de Performance
```javascript
// Image optimization avanzada
images: {
  formats: ['image/webp', 'image/avif'],
  minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
}

// Package optimization
experimental: {
  optimizePackageImports: ['framer-motion', 'gsap', 'lucide-react'],
}
```

#### Security Headers
- **X-Content-Type-Options**: nosniff
- **X-Frame-Options**: DENY
- **X-XSS-Protection**: 1; mode=block
- **Referrer-Policy**: strict-origin-when-cross-origin

### Sistema de Animaciones

#### Framer Motion Variants
```typescript
// lib/animations.ts - Variantes reutilizables
export const blurUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}
```

#### GSAP Integration
- **Partículas interactivas** con PhysicsPlugin
- **Scroll-triggered animations** con ScrollTrigger
- **Performance optimizado** con will-change

### Sistema de Email

#### Email Templates (lib/email.ts)
- **HTML templates** inline-CSS para máxima compatibilidad
- **Dual sending**: Confirmación cliente + notificación coach
- **Error handling** con Promise.allSettled
- **Development mode** con console.log fallback

#### Validación de Formularios
```typescript
// lib/validations.ts - Zod schemas
export const contactFormSchema = z.object({
  nombre: z.string().min(2).max(100).trim(),
  email: z.string().email().max(254).trim().toLowerCase(),
  mensaje: z.string().min(10).max(2000).trim()
})
```

---

## 🎨 Componentes Principales

### 1. **Hero Section** (`components/sections/Hero.tsx`)
- **Rotating phrases**: 40+ frases que rotan automáticamente
- **Parallax effects**: Capas con diferentes velocidades de scroll
- **Call-to-action**: Botón con animación hover compleja
- **Background particles**: Sistema de partículas interactivas

### 2. **Language Context** (`contexts/LanguageContext.tsx`)
- **URL-based language detection**: `/en/*` para inglés
- **History API navigation**: Sin recarga de página
- **Persistent state**: Mantiene idioma seleccionado

### 3. **Contact System**
- **Multi-provider**: EmailJS, Formspree, y backend API
- **Real-time validation**: Con Zod y React Hook Form
- **Calendly integration**: Booking de sesiones con Cal.com

### 4. **Performance Optimizations**
- **Dynamic imports**: Code splitting por sección
- **Intersection Observer**: Lazy loading de below-fold content
- **Image optimization**: WebP/AVIF con fallbacks
- **Bundle analysis**: `npm run analyze` para optimización

---

## 🔧 Partes "Tricky" y Soluciones Implementadas

### 1. **Hydration Issues con Animaciones**
**Problema**: GSAP y Framer Motion causaban hydration mismatches.
**Solución**: 
```typescript
// ClientLayout.tsx - Client-side only rendering
const [isClient, setIsClient] = useState(false)
useEffect(() => setIsClient(true), [])
return isClient ? <AmbientParticles /> : null
```

### 2. **SEO vs Performance Trade-off**
**Problema**: SSR necesario para SEO pero incompatible con animaciones.
**Solución**: 
- **Dynamic imports con `ssr: false`**
- **JSON-LD client-side** para structured data
- **Metadata estática** en layout.tsx

### 3. **Internationalization con URL Routing**
**Problema**: Mantener estado de idioma sin recargas.
**Solución**: 
```typescript
// Language detection y URL manipulation
const changeLanguage = (lang: Language) => {
  if (lang === 'en' && !currentPath.startsWith('/en')) {
    window.history.pushState(null, '', `/en${currentPath}`)
  }
}
```

### 4. **Email Delivery Reliability**
**Problema**: Múltiples providers con diferentes configuraciones.
**Solución**: 
- **Fallback chain**: EmailJS → Formspree → Backend API
- **Promise.allSettled** para envío paralelo
- **Development simulation** sin dependencias externas

### 5. **Performance con Animaciones Complejas**
**Problema**: 60fps con múltiples animaciones simultáneas.
**Solución**: 
- **will-change CSS** para optimización de GPU
- **Debounced scroll events**
- **Intersection Observer** para trigger animations

---

## 🚀 Configuración y Deployment

### Variables de Entorno Requeridas

```bash
# Email configuration
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your_contact@email.com

# Site configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id
```

### Scripts Disponibles

```bash
# Development
npm run dev              # Servidor de desarrollo
npm run build           # Build de producción
npm run start           # Servidor de producción

# Code Quality
npm run lint            # ESLint check
npm run lint:fix        # ESLint auto-fix
npm run format          # Prettier formatting

# Testing
npm run test            # Unit tests con Vitest
npm run test:e2e         # E2E tests con Playwright
npm run test:visual      # Visual regression testing

# Analysis
npm run analyze         # Bundle analyzer
```

### Deployment en Vercel

1. **Conectar repositorio** a Vercel
2. **Configurar variables de entorno**
3. **Habilitar Edge Functions** para API routes
4. **Configurar dominio personalizado**
5. **Setup analytics** si es necesario

---

## 📊 Performance Metrics

### Optimizaciones Implementadas
- **Lighthouse Score**: 95+ Performance
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

### Bundle Optimization
- **Code splitting**: Por sección y componente
- **Tree shaking**: Eliminación de código unused
- **Image optimization**: WebP/AVIF con lazy loading
- **Font optimization**: preload y display: swap

---

## 🧪 Testing Strategy

### E2E Testing (Playwright)
```typescript
// tests/case-studies-final.spec.ts
test('Case studies modal functionality', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('case-studies-section').scrollIntoViewIfNeeded()
  await page.getByTestId('case-study-card-1').click()
  await expect(page.getByTestId('modal-overlay')).toBeVisible()
})
```

### Visual Testing
- **Screenshot comparison** para regresiones visuales
- **Cross-browser testing** (Chrome, Firefox, Safari)
- **Mobile responsive testing**

### Unit Testing (Vitest)
- **Component testing** con React Testing Library
- **Hook testing** custom hooks
- **Utility function testing**

---

## 🔮 Mejoras Futuras

### Roadmap de Features
1. **CMS Integration**: Sanity o Contentful para contenido dinámico
2. **Advanced Analytics**: Heatmaps y user behavior tracking
3. **A/B Testing**: Optimización de conversion rates
4. **Progressive Web App**: Offline functionality
5. **Multi-language support**: Más allá de español/inglés

### Technical Debt
1. **Component refactoring**: Extract shared logic
2. **Type strictness**: Mejorar tipado en componentes legacy
3. **Performance monitoring**: Implementar RUM (Real User Monitoring)
4. **Error boundaries**: Mejorar error handling

---

## 🤝 Contribución al Proyecto

### Code Style
- **TypeScript strict mode**
- **ESLint + Prettier** configuración
- **Conventional commits** para mensajes
- **Semantic versioning**

### Development Workflow
1. **Feature branches** desde main
2. **Pull requests** con review obligatorio
3. **Automated testing** en CI/CD
4. **Deployment automático** a staging/production

---

## 📞 Soporte y Contacto

### Technical Issues
- **GitHub Issues**: Reportar bugs y features
- **Documentation**: Revisar este README y code comments
- **Code Review**: Peer review para cambios críticos

### Business Contact
- **Email**: A través del formulario de contacto
- **Calendly**: Booking de sesiones gratuitas
- **WhatsApp**: Botón flotante para contacto directo

---

## 📄 Licencia

Este proyecto es propiedad privada de **ELEVA CONSULTORA**. Todos los derechos reservados.

---

**Última actualización**: Marzo 2026
**Versión**: 0.1.2
**Maintainer**: Fernando Ferrari
