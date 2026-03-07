"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0, 0, 0.2, 1] as [number, number, number, number], delay },
  }),
};

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setParticles(
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 6,
        duration: Math.random() * 4 + 5,
        opacity: 0.3 + Math.random() * 0.4,
      }))
    );
  }, []);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="hero-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      aria-label="Sección principal"
    >
      {/* Decorative orbs */}
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

      {/* Floating particles — only rendered client-side to avoid hydration mismatch */}
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
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
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
      <div className="container relative z-10 flex flex-col items-center text-center px-4 sm:px-6" style={{ paddingTop: "clamp(140px, 20vh, 180px)", paddingBottom: "clamp(80px, 12vh, 120px)" }}>
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="badge mb-8"
        >
          <Sparkles size={12} fill="currentColor" />
          COACHING EJECUTIVO · RESULTADOS REALES
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
          className="display-text max-w-5xl mb-10 px-4"
          style={{ fontFamily: "var(--font-heading)", lineHeight: "1.15" }}
        >
          Deja de sobrevivir.
          <br className="block my-3" />
          <span className="text-gradient">Empieza a liderar</span>
          <br className="block my-3" />
          tu propia vida.
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="divider-gold mb-10"
          style={{ width: "80px", height: "3px" }}
        />

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.45}
          className="lead-text max-w-2xl mb-12 px-4"
        >
          Coaching de vida y negocios para personas que saben que pueden
          más — y están listas para demostrarlo.{" "}
          <br className="hidden sm:block" />
          Metodología probada. Resultados medibles. Acompañamiento real.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="flex flex-col sm:flex-row gap-5 sm:gap-6 w-full sm:w-auto px-4 max-w-2xl"
        >
          <button
            className="btn-primary animate-glow"
            onClick={() => handleScroll("#contacto")}
          >
            Agenda tu sesión gratuita →
          </button>
          <button
            className="btn-secondary"
            onClick={() => handleScroll("#proceso")}
          >
            Ver cómo funciona ↓
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.75}
          className="flex items-center justify-center mt-20 px-4"
        >
          <p className="text-sm leading-relaxed text-center" style={{ color: "var(--text-muted)" }}>
            Más de{" "}
            <span style={{ color: "var(--gold-primary)", fontWeight: 600 }}>500 clientes</span>{" "}
            transformados · {" "}
            <span style={{ color: "var(--gold-primary)", fontWeight: 600 }}>10 años</span>{" "}
            de experiencia certificada
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer bg-transparent border-0 z-10"
        style={{ color: "var(--text-muted)" }}
        onClick={() => handleScroll("#sobre-mi")}
        aria-label="Desplazarse hacia abajo"
      >
        <span className="text-xs uppercase tracking-widest" style={{ letterSpacing: "0.2em" }}>
          Descubre más
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
