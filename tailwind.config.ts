import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ============================================================
         COLORES
         ============================================================ */
      colors: {
        /* Fondos */
        dark: {
          base:     "#0A0A0F",
          surface:  "#12121A",
          elevated: "#1A1A26",
          border:   "#2A2A3A",
          footer:   "#07070C",
        },

        /* Dorados */
        gold: {
          DEFAULT: "#D4AF37",
          light:   "#E8C94A",
          dark:    "#B8962E",
          muted:   "rgba(212, 175, 55, 0.15)",
        },

        /* Amber (acento secundario) */
        amber: {
          DEFAULT: "#F59E0B",
          light:   "#FCD34D",
          dark:    "#D97706",
        },

        /* Texto */
        content: {
          primary:   "#F5F5F0",
          secondary: "#C9C9C0",
          muted:     "#6B7280",
          disabled:  "#374151",
        },
      },

      /* ============================================================
         TIPOGRAFÍA
         ============================================================ */
      fontFamily: {
        heading: ["Playfair Display", "Georgia", "serif"],
        body:    ["Inter", "system-ui", "-apple-system", "sans-serif"],
        sans:    ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },

      fontSize: {
        "display": ["clamp(3rem, 8vw, 6.5rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        "heading-xl": ["clamp(2.25rem, 5vw, 4rem)",    { lineHeight: "1.1" }],
        "heading-lg": ["clamp(1.875rem, 4vw, 3rem)",   { lineHeight: "1.15" }],
        "heading-md": ["clamp(1.375rem, 2.5vw, 1.875rem)", { lineHeight: "1.25" }],
        "lead":       ["clamp(1.0625rem, 2vw, 1.25rem)", { lineHeight: "1.80" }],
        "label":      ["0.75rem", { lineHeight: "1", letterSpacing: "0.12em" }],
      },

      /* ============================================================
         ESPACIADO
         ============================================================ */
      maxWidth: {
        container: "1280px",
      },

      spacing: {
        "section": "clamp(5rem, 10vw, 9rem)",
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
      },

      /* ============================================================
         BORDER RADIUS
         ============================================================ */
      borderRadius: {
        "sm":   "8px",
        "md":   "16px",
        "lg":   "24px",
        "pill": "9999px",
      },

      /* ============================================================
         BOX SHADOW
         ============================================================ */
      boxShadow: {
        "sm":       "0 2px 8px rgba(0, 0, 0, 0.40)",
        "md":       "0 8px 32px rgba(0, 0, 0, 0.50)",
        "lg":       "0 20px 60px rgba(0, 0, 0, 0.60)",
        "gold-sm":  "0 4px 20px rgba(212, 175, 55, 0.25)",
        "gold-md":  "0 8px 40px rgba(212, 175, 55, 0.35)",
        "gold-lg":  "0 16px 60px rgba(212, 175, 55, 0.45)",
        "glass":    "0 8px 32px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.05)",
        "card-hover": "0 24px 64px rgba(0,0,0,0.60), 0 0 40px rgba(212,175,55,0.12)",
      },

      /* ============================================================
         GRADIENTES (como background-image)
         ============================================================ */
      backgroundImage: {
        "gradient-gold":      "linear-gradient(135deg, #D4AF37 0%, #F59E0B 50%, #D4AF37 100%)",
        "gradient-gold-h":    "linear-gradient(90deg, #D4AF37 0%, #F59E0B 100%)",
        "gradient-gold-v":    "linear-gradient(180deg, #D4AF37 0%, #B8962E 100%)",
        "gradient-hero":
          "radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.14) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(245,158,11,0.09) 0%, transparent 50%), linear-gradient(180deg, #0A0A0F 0%, #12121A 100%)",
        "gradient-glow":      "radial-gradient(ellipse at center, rgba(212,175,55,0.18) 0%, transparent 70%)",
        "gradient-card":      "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        "gradient-dark-fade": "linear-gradient(180deg, transparent 0%, #0A0A0F 100%)",
        "gradient-text":      "linear-gradient(135deg, #D4AF37 0%, #F59E0B 60%, #E8C94A 100%)",
        "shimmer":
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.20) 50%, transparent 100%)",
      },

      /* ============================================================
         ANIMACIONES CUSTOM
         ============================================================ */
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-16px)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(-8px)" },
          "50%":      { transform: "translateY(8px)" },
        },
        glow: {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(212,175,55,0.20), 0 0 40px rgba(212,175,55,0.10)",
          },
          "50%": {
            boxShadow:
              "0 0 40px rgba(212,175,55,0.50), 0 0 80px rgba(212,175,55,0.25), 0 0 120px rgba(245,158,11,0.12)",
          },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "bounce-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(8px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.55" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.90)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-40px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(40px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "text-shimmer": {
          "0%":   { backgroundPosition: "0% 50%" },
          "50%":  { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "border-glow": {
          "0%, 100%": { borderColor: "rgba(212,175,55,0.20)" },
          "50%":      { borderColor: "rgba(212,175,55,0.60)" },
        },
        "count-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        /* Decorativas */
        "float":         "float 6s ease-in-out infinite",
        "float-slow":    "float 9s ease-in-out infinite",
        "float-reverse": "float-reverse 7s ease-in-out infinite",

        /* Efectos de luz */
        "glow":          "glow 3s ease-in-out infinite alternate",
        "shimmer":       "shimmer 2.5s linear infinite",
        "text-shimmer":  "text-shimmer 4s ease-in-out infinite",
        "border-glow":   "border-glow 3s ease-in-out infinite",
        "pulse-soft":    "pulse-soft 3s ease-in-out infinite",

        /* Movimiento */
        "bounce-y":      "bounce-y 2s ease-in-out infinite",
        "spin-slow":     "spin-slow 20s linear infinite",

        /* Entradas (una sola vez) */
        "fade-in-up":      "fade-in-up 0.8s cubic-bezier(0,0,0.2,1) both",
        "fade-in":         "fade-in 0.6s cubic-bezier(0,0,0.2,1) both",
        "scale-in":        "scale-in 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
        "slide-in-left":   "slide-in-left 0.7s cubic-bezier(0,0,0.2,1) both",
        "slide-in-right":  "slide-in-right 0.7s cubic-bezier(0,0,0.2,1) both",
        "count-up":        "count-up 0.6s cubic-bezier(0,0,0.2,1) both",
      },

      /* ============================================================
         TRANSICIONES
         ============================================================ */
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "out":    "cubic-bezier(0, 0, 0.2, 1)",
      },

      transitionDuration: {
        "150": "150ms",
        "250": "250ms",
        "350": "350ms",
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },

      /* ============================================================
         BACKDROP BLUR
         ============================================================ */
      backdropBlur: {
        "xs":  "4px",
        "sm":  "8px",
        "md":  "12px",
        "lg":  "20px",
        "xl":  "40px",
        "2xl": "80px",
      },

      /* ============================================================
         Z-INDEX
         ============================================================ */
      zIndex: {
        "behind":   "-1",
        "base":     "0",
        "raised":   "10",
        "dropdown": "20",
        "sticky":   "30",
        "overlay":  "40",
        "modal":    "50",
        "toast":    "60",
        "tooltip":  "70",
        "top":      "100",
      },
    },
  },
  plugins: [
    // Plugin inline para utilidades adicionales
    function ({ addUtilities, theme }: { addUtilities: Function; theme: Function }) {
      const newUtilities = {
        /* Text gradient gold */
        ".text-gradient-gold": {
          background: "linear-gradient(135deg, #D4AF37 0%, #F59E0B 60%, #E8C94A 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
          color: "transparent",
        },

        /* Glass morphism */
        ".glass": {
          background: "rgba(26, 26, 38, 0.60)",
          "backdrop-filter": "blur(20px) saturate(1.5)",
          "-webkit-backdrop-filter": "blur(20px) saturate(1.5)",
          border: "1px solid rgba(212, 175, 55, 0.15)",
        },

        ".glass-dark": {
          background: "rgba(10, 10, 15, 0.80)",
          "backdrop-filter": "blur(20px) saturate(1.5)",
          "-webkit-backdrop-filter": "blur(20px) saturate(1.5)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
        },

        /* Gold border animated */
        ".border-gold-animated": {
          border: "1px solid rgba(212, 175, 55, 0.25)",
          animation: "border-glow 3s ease-in-out infinite",
        },

        /* No text fill (reset para text-gradient en elementos hijos) */
        ".no-fill-reset": {
          "-webkit-text-fill-color": "unset",
          "background-clip": "unset",
        },

        /* Shimmer background para botones */
        ".shimmer-bg": {
          background:
            "linear-gradient(90deg, #D4AF37 0%, #F59E0B 30%, #FCD34D 50%, #F59E0B 70%, #D4AF37 100%)",
          "background-size": "200% auto",
          animation: "shimmer 2.5s linear infinite",
        },

        /* Ocultar scrollbar pero mantener scroll */
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none",
        },

        /* Aspect ratios comunes */
        ".aspect-portrait": {
          "aspect-ratio": "3 / 4",
        },
        ".aspect-golden": {
          "aspect-ratio": "1.618 / 1",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};

export default config;
