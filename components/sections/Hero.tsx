"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import { scrollToElement } from "@/lib/scroll";

const rotatingPhrases = [
  "Mi equipo no toma decisiones sin mí",
  "Las reuniones no llevan a nada concreto",
  "Estamos creciendo pero todo se rompe",
  "No logro delegar sin perder el control",
  "El equipo tiene talento pero no rinde",
  "Siempre apagamos incendios, nunca prevenimos",
  "Tengo demasiadas prioridades y no avanzo en ninguna",
  "No sé si mi equipo está alineado con los objetivos",
  "Contrato bien pero la gente se va rápido",
  "Trabajamos mucho pero los resultados no se ven",
  "No hay tiempo para pensar, solo para reaccionar",
  "Cada área va por su cuenta y nadie coordina",
  "El feedback que doy no genera cambios reales",
  "Mi jornada no termina nunca y sigo atrasado",
  "Sé lo que hay que hacer pero no cómo arrancarlo",
  "Los procesos que funcionaban antes ya no escalan",
  "Hay conflictos en el equipo que nadie nombra",
  "Tomo decisiones con datos incompletos siempre",
  "Perdemos clientes por problemas que podríamos evitar",
  "El equipo espera que yo tenga todas las respuestas",
];

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

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    setMounted(true);
    const count = window.innerWidth < 768 ? 12 : 35;
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 4 + 6,
        opacity: 0.2 + Math.random() * 0.5,
        drift: (Math.random() - 0.5) * 30,
      }))
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (href: string) => scrollToElement(href);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="hero-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      aria-label="Sección principal"
    >
      {/* Decorative orbs with scroll parallax */}
      <motion.div style={{ y: orbY1 }} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="orb orb-gold animate-float-slow"
          style={{
            width: "clamp(300px, 50vw, 700px)",
            height: "clamp(300px, 50vw, 700px)",
            top: "10%",
            left: "-15%",
            opacity: 0.6,
          }}
        />
      </motion.div>
      <motion.div style={{ y: orbY2 }} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="orb orb-amber animate-float"
          style={{
            width: "clamp(200px, 35vw, 500px)",
            height: "clamp(200px, 35vw, 500px)",
            top: "-5%",
            right: "-10%",
            opacity: 0.4,
            animationDelay: "2s",
          }}
        />
      </motion.div>
      <motion.div style={{ y: orbY3 }} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="orb orb-gold"
          style={{
            width: "clamp(150px, 25vw, 350px)",
            height: "clamp(150px, 25vw, 350px)",
            bottom: "15%",
            right: "20%",
            opacity: 0.3,
            filter: "blur(100px)",
          }}
        />
      </motion.div>

      {/* Floating particles — varied drift + pulse */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: `rgba(212, 175, 55, ${p.opacity})`,
                boxShadow: p.size > 2.5 ? `0 0 ${p.size * 3}px rgba(212,175,55,0.3)` : "none",
              }}
              animate={{
                y: [0, -30 - Math.random() * 20, 0],
                x: [0, p.drift, 0],
                opacity: [p.opacity * 0.4, p.opacity, p.opacity * 0.4],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

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
          {/* Badge */}
          <motion.div variants={revealScale} className="badge mb-4">
            <Sparkles size={12} fill="currentColor" />
            COACHING ORGANIZACIONAL · LIDERAZGO ÁGIL
          </motion.div>

          {/* Headline — each line reveals separately */}
          <motion.h1
            className="display-text max-w-5xl mb-3 sm:mb-4"
            style={{ fontFamily: "var(--font-heading)", lineHeight: "1.15" }}
          >
            <motion.span variants={revealUp} className="block">
              Transformá tu equipo.
            </motion.span>
            <motion.span variants={revealUp} className="block text-gradient mt-3">
              Liderá con propósito.
            </motion.span>
            <motion.span variants={revealUp} className="block mt-3">
              Escalá sin límites.
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
            className="max-w-2xl mb-4 sm:mb-6 px-6 sm:px-10 py-5 sm:py-6 rounded-xl"
            style={{
              minHeight: "5.5rem",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(212,175,55,0.12)",
            }}
          >
            <p className="text-sm uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)", letterSpacing: "0.15em" }}>
              ¿Te suena esto?
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={phraseIndex}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="lead-text italic"
                style={{ color: "var(--gold-light)", fontFamily: "var(--font-heading)", fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)" }}
              >
                &ldquo;{rotatingPhrases[phraseIndex]}&rdquo;
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={revealUp}
            className="lead-text max-w-2xl mb-8 sm:mb-12"
          >
            Coaching y consultoría organizacional para líderes tech y startups
            que quieren crecer de forma ágil, humana y sostenible.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={ctaReveal}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto max-w-2xl"
          >
            <motion.button
              className="btn-primary animate-glow"
              onClick={() => handleScroll("#contacto")}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Agendá tu sesión gratuita →
            </motion.button>
            <motion.button
              className="btn-secondary"
              onClick={() => handleScroll("#proceso")}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Conocé nuestro método ↓
            </motion.button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={revealUp}
            className="flex items-center justify-center mt-12 sm:mt-20 pb-16"
          >
            <p className="text-sm leading-relaxed text-center" style={{ color: "var(--text-muted)" }}>
              Más de{" "}
              <span style={{ color: "var(--gold-primary)", fontWeight: 600 }}>20 años</span>{" "}
              en tecnología ·{" "}
              <span style={{ color: "var(--gold-primary)", fontWeight: 600 }}>6+ años</span>{" "}
              de consultoría ágil
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
