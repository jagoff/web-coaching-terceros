"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";
import { scrollToElement } from "@/lib/scroll";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/translations";
import dynamic from "next/dynamic";
import Image from "next/image";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { getOptimizedImagePath } from "@/lib/image-optimization";

// Dynamic imports for non-critical components - lazy loaded after page load
const CoachingWordsBackground = dynamic(() => import("@/components/CoachingWordsBackground"), {
  ssr: false,
  loading: () => null
});

// No particles for performance optimization

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  drift: number;
};

/* ---------- animation variants ---------- */

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const revealUp: Variants = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const revealScale: Variants = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineGrow: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const ctaReveal: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

export default function HeroClient({ ssrLanguage = 'es' }: { ssrLanguage?: Language }) {
  const { language, t } = useLanguage();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [renderLanguage, setRenderLanguage] = useState(ssrLanguage);
  
  const rotatingPhrases = renderLanguage === 'es' ? t.hero.rotatingPhrases : t.hero.rotatingPhrases;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    setMounted(true);
    setRenderLanguage(language); // Sync with context language after mount
    // Drastically reduced particle count for performance
    const count = window.innerWidth < 768 ? 0 : 3; // 6→3, 2→0 (no particles on mobile)
    
    // Deterministic random function to avoid hydration mismatches
    const deterministicRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: deterministicRandom(i) * 100,
        y: deterministicRandom(i + 1000) * 100,
        size: deterministicRandom(i + 2000) * 2 + 1, // Smaller particles
        delay: deterministicRandom(i + 3000) * 4,
        duration: deterministicRandom(i + 4000) * 3 + 4, // Shorter duration
        opacity: 0.1 + deterministicRandom(i + 5000) * 0.3, // Lower opacity
        drift: (deterministicRandom(i + 6000) - 0.5) * 20, // Less drift
      }))
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => {
        const nextIndex = (prev + 1) % (rotatingPhrases?.length || 1);
        return nextIndex;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [rotatingPhrases?.length]);

  const handleScroll = (href: string) => scrollToElement(href);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="hero-bg relative flex min-h-screen flex-col items-center overflow-hidden"
      style={{ 
        paddingTop: "clamp(2.25rem, 6vh, 4.25rem)",
        position: "relative"
      }}
      aria-label="Sección principal"
    >
      {/* Remove CoachingWordsBackground for FCP optimization */}

      {/* Simplified orbs - reduced from 3 to 1 for FCP */}
      <motion.div style={{ y: orbY1, willChange: 'transform', contain: 'layout style paint' }} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="orb orb-gold animate-float-slow"
          style={{
            width: "clamp(300px, 50vw, 700px)",
            height: "clamp(300px, 50vw, 700px)",
            top: "10%",
            left: "-5%",
            opacity: 0.6,
          }}
        />
      </motion.div>

      {/* No particles for performance optimization */}

      {/* Main content */}
      <div
        className="container relative z-10 flex flex-col items-center text-center"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
          style={{ paddingTop: "clamp(64px, 10vh, 120px)", paddingBottom: "clamp(32px, 5vh, 60px)" }}
        >
          {/* Headline — each line reveals separately */}
          <motion.h1
            className="display-text max-w-5xl mb-3 sm:mb-4"
            style={{ fontFamily: "var(--font-heading)", lineHeight: "1.15", fontSize: "clamp(2.125rem, 4.8vw, 3.625rem)" }}
          >
            <motion.span variants={revealUp} className="block">
              {renderLanguage === 'es' ? (
                <>
                  <span className="text-gradient">Transformá</span> tu equipo.
                </>
              ) : (
                <>
                  <span className="text-gradient">Transform</span> your team.
                </>
              )}
            </motion.span>
            <motion.span variants={revealUp} className="block text-gradient mt-3">
              {renderLanguage === 'es' ? 'Liderá tu empresa.' : 'Lead with purpose.'}
            </motion.span>
            <motion.span variants={revealUp} className="block mt-3">
              {renderLanguage === 'es' ? (
                <> <span style={{
                  background: "linear-gradient(135deg, #FF6B35 0%, #C87B5A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}>Escalá</span> sin límites.</>
              ) : (
                <>Scale <span className="text-gradient">without limits</span>.</>
              )}
            </motion.span>
          </motion.h1>

          {/* Decorative line */}
          <motion.div
            variants={lineGrow}
            className="divider-gold mb-6"
            style={{ width: "80px", height: "3px" }}
          />

          {/* Rotating pain-point phrases */}
          <motion.div
            variants={revealUp}
            className="relative w-full max-w-lg mb-4 sm:mb-6 px-6 sm:px-10 py-5 sm:py-6 rounded-2xl mx-auto"
            style={{
              height: "9.5rem", // Extended height to cover 3 lines properly
              background: "#000000",
              backdropFilter: "none",
              border: "1px solid rgba(124,107,196,0.12)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02), 0 8px 32px rgba(0,0,0,0.4)",
              position: "relative"
            }}
          >
            {/* Subtle gold radial glow behind */}
            <div
              className="absolute inset-0 -z-10 rounded-2xl"
              style={{
                background: "radial-gradient(ellipse at center, rgba(124,107,196,0.01) 0%, transparent 40%)",
                transform: "scale(1.8)",
                filter: "blur(50px)",
              }}
              aria-hidden="true"
            />
            <div className="flex items-center justify-between gap-4 h-full">
              <div className="flex-shrink-0">
                <OptimizedImage 
                  src={getOptimizedImagePath("/images/ui/this-is-fine-meme.png").src}
                  webpSrc={getOptimizedImagePath("/images/ui/this-is-fine-meme.png").webpSrc}
                  fallbackSrc={getOptimizedImagePath("/images/ui/this-is-fine-meme.png").fallbackSrc}
                  alt="Meme de un perro sentado en una oficina en llamas con el lema 'This is fine', representando equipos tech abrumados por problemas de procesos y comunicación"
                  width={72}
                  height={72}
                  className="w-16 h-16 sm:w-18 sm:h-18 object-cover rounded-full opacity-100"
                  priority={true}
                  lazy={false}
                />
              </div>
              <div className="flex-1">
                <p className="text-base uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)", letterSpacing: "0.15em" }}>
                  {renderLanguage === 'es' ? '¿Te suena esto?' : 'Does this sound familiar?'}
                </p>
                <div className="flex items-center justify-center" style={{ minHeight: "2.5rem" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={phraseIndex}
                      initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="lead-text italic"
                      style={{ 
                        background: "linear-gradient(135deg, var(--text-primary) 0%, var(--gold-primary) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        fontFamily: "var(--font-heading)", 
                        fontSize: "clamp(1.3rem, 2.7vw, 1.7rem)",
                        textAlign: "center"
                      }}
                      dangerouslySetInnerHTML={{ 
                        __html: `&ldquo;${mounted ? rotatingPhrases[phraseIndex] : (renderLanguage === 'en' ? 'My team doesn\'t make <span class=\'web-underline\'>decisiones</span> without me' : 'Mi equipo no toma <span class=\'web-underline\'>decisiones</span> sin mí')}&rdquo;` 
                      }}
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={revealUp}
            className="max-w-2xl mb-8 sm:mb-12"
            style={{ 
              fontFamily: "var(--font-modern)",
              fontWeight: 400,
              fontSize: "clamp(1.25rem, 2.2vw, 1.4rem)",
              lineHeight: 1.85,
              color: "#F8F7FF"
            }}
          >
            {renderLanguage === 'es' 
              ? 'Te acompaño a construir equipos autónomos, procesos que escalen, y una cultura que retenga y desafie al talento.'
              : 'I help you build teams that work without you micromanaging, processes that scale, and a culture where people want to stay.'
            }
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={ctaReveal}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto max-w-2xl"
          >
            <button
              onClick={() => handleScroll("#contacto")}
              className="btn-hero-primary"
              aria-label={renderLanguage === 'es' 
                ? 'Agendar sesión gratuita de coaching - Ir al formulario de contacto' 
                : 'Book free coaching session - Go to contact form'
              }
            >
              {renderLanguage === 'es' ? 'AGENDA GRATIS TU SESIÓN' : 'BOOK YOUR FREE SESSION'} →
            </button>
            <motion.button
              className="btn-secondary"
              onClick={() => handleScroll("#proceso")}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              aria-label={renderLanguage === 'es' 
                ? 'Conocer el método de coaching - Ir a sección de proceso' 
                : 'Learn about coaching method - Go to process section'
              }
            >
              {renderLanguage === 'es' ? 'Conocé mi método ↓' : 'Know my method ↓'}
            </motion.button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={revealUp}
            className="flex items-center justify-center mt-12 sm:mt-20 pb-16"
          >
            <p className="text-sm leading-relaxed text-center" style={{ color: "var(--text-muted)" }}>
              {renderLanguage === 'es' 
                ? 'Más de 20 años en tecnología · 11+ años de coaching'
                : 'Over 20 years in technology · 11+ years of agile consulting'
              }
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator — animated mouse */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer bg-transparent border-0 z-10"
        onClick={() => handleScroll("#sobre-mi")}
        aria-label="Desplazarse hacia abajo"
      >
        <div
          className="relative rounded-full"
          style={{
            width: 24,
            height: 40,
            border: "2px solid var(--text-muted)",
            transition: "border-color 0.3s",
          }}
        >
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: 4,
              height: 8,
              top: 6,
              background: "var(--gold-primary)",
            }}
            animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.button>
    </section>
  );
}
