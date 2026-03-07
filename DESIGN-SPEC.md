# DESIGN SPEC — Coaching Landing Page
## Concepto Visual: "Transformación & Elevación"

---

## 1. FILOSOFÍA DE DISEÑO

La identidad visual evoca **poder silencioso y transformación genuina**. El fondo casi negro crea una sensación de profundidad y exclusividad, mientras que los destellos dorados representan la elevación y el valor que el coaching aporta. El resultado es una experiencia premium que inspira confianza desde el primer scroll.

Palabras clave: **Elegante. Poderoso. Humano. Transformador.**

---

## 2. PALETA DE COLORES

### Colores Base
| Token              | Hex       | Uso                                       |
|--------------------|-----------|-------------------------------------------|
| `--dark-base`      | `#0A0A0F` | Fondo principal del sitio                 |
| `--dark-surface`   | `#12121A` | Cards, secciones alternas                 |
| `--dark-elevated`  | `#1A1A26` | Hover states, elementos elevados          |
| `--dark-border`    | `#2A2A3A` | Bordes sutiles, separadores               |

### Acentos Dorados
| Token              | Hex       | Uso                                       |
|--------------------|-----------|-------------------------------------------|
| `--gold-primary`   | `#D4AF37` | Acentos principales, iconos, highlights   |
| `--gold-light`     | `#E8C94A` | Hover sobre gold, variante clara          |
| `--gold-dark`      | `#B8962E` | Sombras doradas, profundidad              |
| `--amber-primary`  | `#F59E0B` | CTAs secundarios, badges, tags            |
| `--amber-light`    | `#FCD34D` | Texto sobre fondos oscuros, estrellas     |

### Texto
| Token              | Hex       | Uso                                       |
|--------------------|-----------|-------------------------------------------|
| `--text-primary`   | `#F5F5F0` | Texto principal sobre fondo oscuro        |
| `--text-secondary` | `#C9C9C0` | Texto secundario, subtítulos              |
| `--text-muted`     | `#6B7280` | Texto terciario, metadata, labels         |
| `--text-disabled`  | `#374151` | Bordes de inputs, elementos inactivos     |

### Gradientes
```css
/* Hero principal */
background: radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(245,158,11,0.10) 0%, transparent 50%),
            linear-gradient(180deg, #0A0A0F 0%, #12121A 100%);

/* Gold shimmer (texto y botones) */
background: linear-gradient(135deg, #D4AF37 0%, #F59E0B 50%, #D4AF37 100%);

/* Card glass */
background: rgba(26, 26, 38, 0.60);
backdrop-filter: blur(20px);
border: 1px solid rgba(212, 175, 55, 0.15);

/* Text gradient gold */
background: linear-gradient(135deg, #D4AF37 0%, #F59E0B 60%, #E8C94A 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

---

## 3. TIPOGRAFÍA

### Fuentes
- **Playfair Display** — Headings elegantes, serifas clásicas con personalidad
  - Weights: 400 (Regular), 700 (Bold), 900 (Black)
  - Uso: H1, H2, quotes, nombres propios
- **Inter** — Body limpio, legible, moderno
  - Weights: 300, 400, 500, 600, 700
  - Uso: Body text, botones, labels, navegación

### Escala Tipográfica
```
Display XL:  Playfair Display 900, clamp(3.5rem, 8vw, 7rem),   line-height 1.0,  letter-spacing -0.02em
H1:          Playfair Display 700, clamp(2.5rem, 5vw, 4.5rem), line-height 1.1
H2:          Playfair Display 700, clamp(2rem, 4vw, 3.5rem),   line-height 1.15
H3:          Playfair Display 400, clamp(1.5rem, 2.5vw, 2rem), line-height 1.3
Lead:        Inter 300,            clamp(1.1rem, 2vw, 1.35rem), line-height 1.75
Body:        Inter 400,            1rem,                         line-height 1.65
Small:       Inter 400,            0.875rem,                     line-height 1.6
Label:       Inter 600,            0.75rem,   letter-spacing 0.12em, UPPERCASE
```

---

## 4. ESPACIADO Y LAYOUT

- **Grid**: 12 columnas, max-width 1280px, padding horizontal `clamp(1.5rem, 5vw, 5rem)`
- **Secciones**: padding vertical `clamp(5rem, 10vw, 9rem)`
- **Border radius**: 8px (small), 16px (cards), 24px (large), 9999px (pill/buttons)
- **Breakpoints**: mobile < 640px · tablet 640–1024px · desktop > 1024px · wide > 1400px

---

## 5. COMPONENTES UI

### Botón Primario (.btn-primary)
```
background:    linear-gradient(135deg, #D4AF37, #F59E0B)
color:         #0A0A0F  (negro para máximo contraste)
padding:       1rem 2.5rem
border-radius: 9999px
font:          Inter 700, 1rem, letter-spacing 0.05em, uppercase
box-shadow:    0 4px 24px rgba(212,175,55,0.35)
hover:         shimmer sweep + scale(1.02) + shadow más intensa
```

### Botón Secundario (.btn-secondary)
```
background:    transparent
border:        1.5px solid rgba(212,175,55,0.6)
color:         #D4AF37
padding:       calc(1rem - 1.5px) calc(2.5rem - 1.5px)
border-radius: 9999px
hover:         background rgba(212,175,55,0.08) + border solid
```

### Glass Card (.glass-card)
```
background:    rgba(26, 26, 38, 0.60)
backdrop-filter: blur(20px) saturate(1.5)
border:        1px solid rgba(212, 175, 55, 0.12)
border-radius: 24px
box-shadow:    0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)
hover:         translateY(-8px) + border rgba(212,175,55,0.35) + shadow más intensa
transition:    all 0.35s cubic-bezier(0.4, 0, 0.2, 1)
```

### Badge / Tag
```
background:    rgba(212,175,55,0.08)
border:        1px solid rgba(212,175,55,0.30)
color:         #D4AF37
font:          Inter 600, 0.75rem, letter-spacing 0.1em, UPPERCASE
padding:       6px 16px
border-radius: 9999px
```

### Número de Impacto (Stat)
```
número:        Playfair Display 900, 3.5rem–5rem, gradient gold
label:         Inter 500, 0.875rem, color --text-muted, uppercase, letter-spacing 0.08em
separador:     línea 1px gold con opacidad 0.2 entre stats
```

---

## 6. EFECTOS Y ANIMACIONES

### Animaciones de Entrada (Intersection Observer)
- **fade-up**: opacity 0→1 + translateY(30px→0), 0.7s ease-out
- **fade-in**: opacity 0→1, 0.5s
- **stagger**: cada hijo con delay incremental de 0.1s
- **counter-up**: números animados cuando entran al viewport (JS)

### Animaciones CSS Continuas (@keyframes)
- **float**: translateY(-10px ↔ 10px), 6s infinite ease-in-out (orbes decorativos)
- **glow**: box-shadow pulsante dorado, 2.5s infinite alternate (CTA, hero)
- **shimmer**: gradiente que barre de izquierda a derecha, 2s infinite (botones, headings)
- **spin-slow**: rotate 360deg, 20s infinite linear (elemento decorativo hero)

### Hover Effects
- **Cards**: translateY(-8px) + border gold más intenso + box-shadow dorado
- **Botones**: scale(1.02) + shimmer + shadow más intensa
- **Links nav**: subrayado que crece desde la izquierda, color gold
- **Fotos**: scale(1.04) + brightness(1.05)

### Parallax (desktop only, desactivado con prefers-reduced-motion)
- Hero background se mueve al 30% de la velocidad del scroll
- Orbes decorativos al 50% de velocidad
- Implementado con CSS transform en el evento scroll

---

## 7. SECCIONES — CONTENIDO Y ESTRUCTURA

---

### SECCIÓN 1: HERO

**Layout:** Pantalla completa (min-height 100vh), centrado. Fondo con partículas doradas + orbes de luz difusa.

**Contenido:**
```
[Badge]      "COACHING EJECUTIVO · RESULTADOS REALES"

[H1 Display] "Deja de sobrevivir.
              Empieza a liderar
              tu propia vida."

[Lead]       "Coaching de vida y negocios para personas que saben
              que pueden más — y están listas para demostrarlo.
              Metodología probada. Resultados medibles. Acompañamiento real."

[CTAs]       [Agenda tu sesión gratuita →]    [Ver cómo funciona ↓]

[Social proof]
  ★★★★★  "Más de 500 clientes transformados · 10 años de experiencia certificada"
```

**Elementos visuales:**
- Partículas doradas flotantes (canvas o pseudo-elementos CSS)
- Orbe de luz difusa detrás del H1 (radial blur dorado)
- Línea decorativa horizontal con gradiente gold bajo el headline
- Flecha de scroll con animación bounce en la parte inferior

---

### SECCIÓN 2: ABOUT

**Layout:** 2 columnas en desktop — foto izquierda (45%), texto derecha (55%). Stack en mobile.

**Contenido:**
```
[Badge]   "SOBRE MÍ"

[Foto]    Foto profesional con marco decorativo de gradiente dorado
          + badge superpuesto "ICF Certified PCC"

[H2]      "Transformé mi vida.
           Ahora te ayudo a
           transformar la tuya."

[Párrafo 1]
  "Soy [Nombre], coach certificada con más de 10 años acompañando a
   personas y empresas en sus puntos de inflexión. Empecé desde cero —
   sin red de seguridad, sin hoja de ruta. Solo la certeza de que había
   algo más."

[Párrafo 2]
  "Mi metodología combina neurociencia aplicada, psicología positiva y
   estrategia de negocios. No te digo qué hacer — te acompaño a
   descubrirlo tú mismo, de forma más rápida y con menos dolor."

[Credenciales — chips]
  "ICF Certified Coach · PCC Level"
  "Máster en Psicología Organizacional"
  "NLP Practitioner Certificada"
  "Especialista en Neurociencia del Liderazgo"

[Stats — 4 en fila]
  +500          10+           87%           4.9★
  Clientes      Años exp.     Logran sus    Valoración
                certificada   objetivos     media
```

---

### SECCIÓN 3: SERVICES

**Layout:** 2 tarjetas grandes en desktop, stack en mobile.

**Tarjeta 1 — Coaching de Vida**
```
[Icono SVG]  Sol / llama dorada
[H3]         "Coaching de Vida"
[Desc]       "Para quienes sienten que están viviendo la vida de alguien más.
              Juntos clarificamos tu propósito, eliminamos los bloqueos
              invisibles y construimos la versión más auténtica de ti."
[Beneficios]
  ✓ Claridad de propósito y dirección
  ✓ Gestión emocional y resiliencia
  ✓ Relaciones más profundas y auténticas
  ✓ Confianza radical en tus decisiones
  ✓ Balance vida-trabajo real y sostenible
[CTA]        "Quiero transformar mi vida →"
```

**Tarjeta 2 — Coaching de Negocios** (destacada con badge y borde gold intenso)
```
[Badge]      "MÁS SOLICITADO"
[Icono SVG]  Diamante / cohete dorado
[H3]         "Coaching de Negocios"
[Desc]       "Para emprendedores y líderes que quieren llevar su empresa
              al siguiente nivel sin sacrificar su bienestar. Estrategia,
              mentalidad y ejecución — todo en uno."
[Beneficios]
  ✓ Liderazgo de alto rendimiento
  ✓ Claridad estratégica y foco ejecutivo
  ✓ Sistemas que escalan sin depender de ti
  ✓ Gestión y motivación de equipos
  ✓ Crecimiento sostenible y rentable
[CTA]        "Escala mi negocio →"
```

---

### SECCIÓN 4: PROCESS

**Layout:** 4 pasos en línea horizontal con conector numerado. Scroll horizontal en mobile.

**Contenido:**
```
[Badge]   "EL PROCESO"
[H2]      "Tu transformación en 4 pasos"
[Lead]    "No existe el cambio sin estructura. Mi metodología garantiza
           que cada sesión tenga un propósito claro y un avance medible."

[01]  DIAGNÓSTICO
      Icono: Lupa
      "Exploramos dónde estás, a dónde quieres llegar y qué te ha
       impedido llegar hasta ahora. Sin juicios, sin guiones."

[02]  DISEÑO
      Icono: Brújula
      "Construimos tu hoja de ruta personalizada: objetivos SMART,
       estrategias concretas y métricas de progreso reales."

[03]  EJECUCIÓN
      Icono: Rayo
      "Sesiones regulares de coaching. Revisamos avances, resolvemos
       obstáculos y mantenemos el momentum semana a semana."

[04]  INTEGRACIÓN
      Icono: Estrella
      "Consolidamos aprendizajes y construyes autonomía. Al terminar
       no dependes de mí — tienes las herramientas para seguir solo."
```

---

### SECCIÓN 5: TESTIMONIALS

**Layout:** Carrusel — 3 visibles en desktop, 1 en mobile. Autoplay 5s, pausa al hover.

**Testimonios:**
```
[1] "Llevaba 3 años sintiéndome estancada en mi empresa. En 6 meses
    con [Nombre] no solo dupliqué mis ingresos — encontré por qué me
    levanto cada mañana. Eso no tiene precio."
    — María González · CEO & Fundadora, MG Studio · ★★★★★

[2] "Era muy escéptico del coaching. Pensaba que era solo 'hablar de
    sentimientos'. Resultó ser la herramienta más poderosa que he usado
    para mi negocio. ROI del 400% en el primer año."
    — Carlos Mendoza · Director Comercial, TechHispano · ★★★★★

[3] "Pasé de querer dejarlo todo a construir la vida que siempre quise.
    El proceso fue intenso, honesto y completamente transformador.
    Lo recomendaría a cualquier persona lista para crecer."
    — Andrea Ruiz · Emprendedora & Madre · ★★★★★

[4] "Llegué con una crisis de identidad a los 45. Salí con un plan de
    vida claro, un negocio nuevo y la mejor versión de mí mismo.
    Literalmente, me cambió la vida."
    — Roberto Alvarado · Consultor Independiente · ★★★★★

[5] "El acompañamiento fue transformador en el sentido más literal.
    Mi empresa creció un 40% ese año y mi equipo se convirtió en el
    activo más sólido que tengo. Empecé por el negocio y terminé
    transformando también mi vida personal."
    — Jorge Paredes · Fundador, DataSur · ★★★★★
```

---

### SECCIÓN 6: RESULTS

**Layout:** 4 números grandes centrados en fila. Fondo con textura sutil.

**Contenido:**
```
[Badge]   "IMPACTO REAL"
[H2]      "Los números hablan por sí solos"

[Stats — counter-up animado al entrar en viewport]
  +500          10+           87%           4.9★
  Vidas         Años de       Tasa de       Valoración
  transformadas experiencia   satisfacción  media

[Frase]   "Cada número representa una persona que decidió que merecía más.
           ¿Cuándo es tu turno?"

[CTA]     "Comienza tu transformación →"
```

---

### SECCIÓN 7: PRICING

**Layout:** 3 tarjetas. La central más grande y destacada (plan recomendado).

**Contenido:**
```
[Badge]   "INVERSIÓN"
[H2]      "Elige tu nivel de compromiso"
[Nota]    "Todas las modalidades incluyen sesión de diagnóstico gratuita · Sin permanencia forzada"

[Plan 1 — SESIÓN INDIVIDUAL]
  Precio:   €197 / sesión
  Para:     "Resolver un punto de bloqueo específico o explorar el
             proceso antes de comprometerte."
  Incluye:
    ✓ 1 sesión de 90 minutos
    ✓ Plan de acción post-sesión
    ✓ Soporte por email 7 días
  CTA: "Reservar sesión"

[Plan 2 — PROGRAMA TRANSFORMACIÓN ← RECOMENDADO]
  Badge:    "MÁS POPULAR"
  Precio:   €1.497 / 3 meses
  Para:     "El proceso completo. Transformación real, medible y duradera."
  Incluye:
    ✓ 12 sesiones (1 por semana)
    ✓ Sesión de diagnóstico inicial
    ✓ Recursos y herramientas premium
    ✓ Soporte WhatsApp entre sesiones
    ✓ Plan estratégico personalizado
    ✓ Grabaciones + resúmenes escritos
  CTA: "Comenzar ahora"

[Plan 3 — MENTORÍA ÉLITE]
  Precio:   €4.800 / 12 meses
  Para:     "Acompañamiento continuo de alto nivel para líderes que
             buscan resultados extraordinarios."
  Incluye:
    ✓ Todo lo del Programa Transformación
    ✓ Sesiones adicionales según necesidad
    ✓ Acceso directo y prioritario
    ✓ Revisión trimestral de objetivos
    ✓ Acceso a comunidad privada de clientes
  CTA: "Solicitar información"

[Pie]  "¿Tienes dudas sobre qué plan es el adecuado para ti?
        Escríbeme y lo hablamos sin compromiso."
```

---

### SECCIÓN 8: CONTACT

**Layout:** 2 columnas en desktop — copy emocional izquierda, formulario derecha.

**Contenido:**
```
[Izquierda]
  [H2]     "¿Listo para cambiar
             el guión?"

  [Lead]   "Tu primera sesión de diagnóstico es completamente gratuita.
             Sin compromiso. Sin presión. Solo 45 minutos que pueden
             cambiar el rumbo de todo."

  [Lista]
    ✓ Sin venta agresiva
    ✓ Conversación real y auténtica
    ✓ Claridad garantizada

  [Contacto alternativo]
    WhatsApp:  +34 600 000 000
    Email:     hola@[nombrecoach].com
    Instagram: @[nombrecoach]

[Derecha — Formulario]
  Input:    Nombre completo *
  Input:    Email *
  Input:    WhatsApp / Teléfono *
  Select:   ¿Qué te interesa más?
              → Coaching de Vida
              → Coaching de Negocios
              → Ambas áreas
              → Aún no lo sé
  Textarea: Cuéntame brevemente tu situación (opcional)
  Checkbox: Acepto la política de privacidad *
  CTA:      [Agenda mi sesión gratuita →]
  Nota:     "Respondo en menos de 24h. Tus datos están seguros."
```

---

### SECCIÓN 9: FOOTER

```
[Logo + tagline]  "[Nombre Coach] · Coaching que transforma"

[Col 1 — Marca]
  Logo SVG
  Tagline breve
  Redes: Instagram · LinkedIn · YouTube

[Col 2 — Navegación]
  Sobre mí · Servicios · Mi Método
  Testimonios · Precios · Contacto

[Col 3 — Servicios]
  Coaching de Vida · Coaching de Negocios
  Sesión Gratuita · Programa Élite

[Col 4 — Contacto]
  hola@[nombrecoach].com
  +34 600 000 000
  España · Online (todo el mundo)

[Bottom bar]
  "© 2026 [Nombre Coach]. Todos los derechos reservados."
  Política de privacidad · Aviso legal · Cookies
```

---

## 8. NAVEGACIÓN (NAVBAR)

- Fija (sticky), fondo transparente → glassmorphism al hacer scroll
- Logo a la izquierda
- Links: Sobre mí · Servicios · Método · Testimonios · Precios
- CTA derecha: "Sesión gratuita" (btn-primary, tamaño pequeño)
- Mobile: hamburger → panel full-screen con links y CTA

---

## 9. MICROINTERACCIONES

- Progress bar dorada en la parte superior (scroll position)
- Números con count-up al entrar en viewport (IntersectionObserver)
- Smooth scroll entre secciones (scroll-behavior: smooth)
- Formulario: validación inline en tiempo real con feedback gold/red
- Toast de confirmación al enviar formulario
- Cursor: punto dorado que crece en hover de elementos interactivos (desktop)

---

## 10. ACCESIBILIDAD

- Contraste mínimo WCAG AA en todo el texto
- Focus states visibles: outline 2px gold, offset 4px
- `prefers-reduced-motion`: desactiva todas las animaciones continuas y parallax
- H1 único por página, estructura semántica correcta (section, article, nav, footer)
- ARIA labels en botones solo-icono y controles del carrusel
- Alt text descriptivo en todas las imágenes
- Formulario: labels correctos, mensajes de error descriptivos, role="alert"

---

## 11. ASSETS REQUERIDOS

- [ ] Foto coach — alta resolución, fondo neutro o oscuro, formato portrait
- [ ] Logo — SVG, versión light sobre dark
- [ ] Fotos de testimonios — circular, mínimo 80×80px
- [ ] Iconos — Lucide React o SVG custom (lupa, brújula, rayo, estrella, sol, diamante)
- [ ] OG Image — 1200×630px para redes sociales
