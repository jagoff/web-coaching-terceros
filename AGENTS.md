# AGENTS.md

## Complemento al CLAUDE.md — Notas específicas para agentes

### 🔴 Reglas Críticas (No violar)

1. **Traducciones**: Todo texto visible debe estar en `lib/translations.ts`. Nunca hardcodear strings ES/EN en componentes.
2. **Orden de secciones**: La página principal usa `Contact` como ÚLTIMA sección. El nano-footer está embebido dentro de `Contact.tsx`.
3. **No usar emojis como iconos**: Usar `lucide-react` (ya instalado). Pattern: `import { Rocket } from 'lucide-react'`.

### ✂️ Estilo de Respuesta

- **Máximo 4 líneas** para respuestas simples (1-2 para yes/no)
- Incluir `file:line` al referenciar código
- Evitar introducciones/conclusiones innecesarias
- Solo usar ejemplos de código si el usuario lo pide explícitamente

### 🛠️ Uso de Herramientas

- **Edit** sobre sed/awk para modificaciones de archivo
- **Glob/Grep** sobre find/ls/grep para búsqueda
- **Bash** solo para comandos de sistema (npm, git, etc.)
- **Read** antes de editar cualquier archivo

### 🚫 No Hacer

- No estimar tiempos de implementación
- No agregar features no pedidas ("no unnecessary additions")
- No crear abstracciones para requisitos hipotéticos
- No agregar error handling para escenarios imposibles
- No eliminar código usado, solo remover código muerto

### 🎯 Patrones de Componentes

**Hydration-safe** (componentes que dependen de `language` o browser APIs):

- Usar patrón `HeroServer.tsx` + `HeroClient.tsx`
- Hook `useSSRLanguage` o estado `mounted`
- `suppressHydrationWarning` en elementos que cambian post-hydration

**Dynamic imports**: Heavy libs (framer-motion, lucide-react) van en `nextDynamic()` con loading skeletons.

### 🎨 Design System

- **Tokens CSS**: Usar variables (`--gold-primary`, `--text-primary`) NO valores hardcodeados
- **Clases reutilizables**: `.text-gradient`, `.badge`, `.glass-card`, `.section`, `.container`
- **Botones**: `.btn-hero-primary` para CTA principales
- **Tipografía fluida**: `clamp()` con mínimos `1rem` (body) y `1.5rem` (headings)

### 🧪 Testing

```bash
npm run lint      # ESLint
npm run test      # Vitest (unit)
npm run build     # Build + verificación
```

Orden: lint → build → test

### 📁 Archivos Clave

- `lib/translations.ts` — TODAS las traducciones ES/EN
- `lib/validations.ts` — Zod schemas (usar para formularios)
- `lib/animations.ts` — Framer Motion variants
- `components/sections/` — Una sección = un archivo
- `app/globals.css` — CSS custom properties y utilidades

### ⚠️ Anti-patterns Conocidos

- **No usar `reactStrictMode: false`** en producción (oculta bugs)
- **No agregar `Math.random()` en renders** (causa CLS)
- **No usar social proof falso** (marcas que no son clientes reales)
- **No dejar fechas outdated** en testimonios
- **No hardcodear año en copyrights**: usar `new Date().getFullYear()`

### 🔧 Helpers Útiles

```tsx
// Scroll suave
import { scrollToElement } from '@/lib/scroll'

// Detectar idioma
const { language, t } = useLanguage() // t = translations object

// Animaciones pre-definidas
import { headerStagger, blurUp, dividerGrow } from '@/lib/animations'
```

### 📱 Mobile-First

- Touch targets mínimo 48px
- Font-size inputs mínimo 16px (previene iOS zoom)
- `clamp()` para espaciado responsive
