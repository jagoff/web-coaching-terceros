"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";
import { scrollToElement } from "@/lib/scroll";
import { useLanguage } from "@/contexts/LanguageContext";
import dynamic from "next/dynamic";

// Dynamic imports for non-critical components
const CoachingWordsBackground = dynamic(() => import("@/components/CoachingWordsBackground"), {
  ssr: false,
  loading: () => null
});

const rotatingPhrasesES = [
  "Mi equipo no toma <span class='text-gradient'>decisiones</span> sin mí",
  "Las reuniones no llevan a <span class='text-gradient'>nada concreto</span>",
  "Estamos creciendo pero <span class='text-gradient'>todo se rompe</span>",
  "No logro <span class='text-gradient'>delegar</span> sin perder el control",
  "El equipo tiene <span class='text-gradient'>talento</span> pero no rinde",
  "Siempre apagamos incendios 🔥, nunca <span class='text-gradient'>prevenimos</span>",
  "Tengo <span class='text-gradient'>demasiadas prioridades</span> y no avanzo en ninguna",
  "No sé si mi equipo está <span class='text-gradient'>alineado</span> con los objetivos",
  "Contrato bien pero la <span class='text-gradient'>gente se va</span> rápido",
  "Trabajamos mucho pero los <span class='text-gradient'>resultados no se ven</span>",
  "No hay tiempo para <span class='text-gradient'>pensar</span>, solo para reaccionar",
  "Cada área va por <span class='text-gradient'>su cuenta</span> y nadie coordina",
  "El feedback que doy no genera <span class='text-gradient'>cambios reales</span>",
  "Mi jornada <span class='text-gradient'>no termina nunca</span> y sigo atrasado",
  "Sé lo que hay que hacer pero no <span class='text-gradient'>cómo arrancarlo</span>",
  "Los procesos que funcionaban antes ya no <span class='text-gradient'>escalan</span>",
  "Hay <span class='text-gradient'>conflictos</span> en el equipo que nadie nombra",
  "Tomo decisiones con <span class='text-gradient'>datos incompletos</span> siempre",
  "Perdemos <span class='text-gradient'>clientes</span> por problemas que podríamos evitar",
  "El equipo espera que yo tenga <span class='text-gradient'>todas las respuestas</span>",
  "Nuestras daily meetings duran <span class='text-gradient'>45 minutos</span> y no resuelven nada",
  "Los devs dicen '<span class='text-gradient'>terminado</span>' pero siempre hay bugs en producción",
  "Cambio <span class='text-gradient'>prioridades</span> cada dos días y nadie sabe qué hacer",
  "El frontend y el backend no se <span class='text-gradient'>hablan</span>, siempre es culpa del otro",
  "Hacemos <span class='text-gradient'>overtime</span> pero seguimos entregando tarde",
  "Mi mejor dev está por <span class='text-gradient'>renunciar</span> y no sé por qué",
  "Implementamos <span class='text-gradient'>Scrum</span> pero solo son reuniones de más",
  "Los stakeholders cambian el <span class='text-gradient'>alcance</span> sin aviso",
  "No sé qué hace <span class='text-gradient'>cada uno</span> en el equipo",
  "Las retrospectivas son <span class='text-gradient'>silencio incómodo</span> y nada cambia",
  "El cliente <span class='text-gradient'>nunca está contento</span> con lo que entregamos",
];

const rotatingPhrasesEN = [
  "My team doesn't make <span class='text-gradient'>decisions</span> without me",
  "Meetings don't lead to <span class='text-gradient'>anything concrete</span>",
  "We're growing but <span class='text-gradient'>everything breaks</span>",
  "I can't <span class='text-gradient'>delegate</span> without losing control",
  "The team has <span class='text-gradient'>talent</span> but doesn't perform",
  "We're always putting out fires, never <span class='text-gradient'>preventing</span>",
  "I have <span class='text-gradient'>too many priorities</span> and don't advance in any",
  "I don't know if my team is <span class='text-gradient'>aligned</span> with objectives",
  "I hire well but <span class='text-gradient'>people leave</span> quickly",
  "We work a lot but <span class='text-gradient'>results aren't visible</span>",
  "There's no time to <span class='text-gradient'>think</span>, only to react",
  "Each area goes <span class='text-gradient'>its own way</span> and nobody coordinates",
  "The feedback I give doesn't generate <span class='text-gradient'>real changes</span>",
  "My workday <span class='text-gradient'>never ends</span> and I'm still behind",
  "I know what needs to be done but not <span class='text-gradient'>how to start</span>",
  "The processes that worked before no longer <span class='text-gradient'>scale</span>",
  "There are <span class='text-gradient'>conflicts</span> in the team that nobody mentions",
  "I always make decisions with <span class='text-gradient'>incomplete data</span>",
  "We lose <span class='text-gradient'>clients</span> due to problems we could avoid",
  "The team expects me to have <span class='text-gradient'>all the answers</span>",
  "Our daily meetings last <span class='text-gradient'>45 minutes</span> and solve nothing",
  "Devs say '<span class='text-gradient'>done</span>' but there are always bugs in production",
  "I change <span class='text-gradient'>priorities</span> every two days and nobody knows what to do",
  "Frontend and backend don't <span class='text-gradient'>talk</span>, it's always the other's fault",
  "We work <span class='text-gradient'>overtime</span> but still deliver late",
  "My best dev is about to <span class='text-gradient'>quit</span> and I don't know why",
  "We implemented <span class='text-gradient'>Scrum</span> but it's just more meetings",
  "Stakeholders change <span class='text-gradient'>scope</span> without notice",
  "I don't know what <span class='text-gradient'>each person</span> on the team does",
  "Retrospectives are <span class='text-gradient'>awkward silence</span> and nothing changes",
  "The client is <span class='text-gradient'>never happy</span> with what we deliver",
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
  const { language } = useLanguage();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  
  const rotatingPhrases = language === 'es' ? rotatingPhrasesES : rotatingPhrasesEN;
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
      className="hero-bg relative flex min-h-screen flex-col items-center overflow-hidden"
      style={{ paddingTop: "clamp(2.25rem, 6vh, 4.25rem)" }}
      aria-label="Sección principal"
    >
      {/* Coaching Words Background Animation - Delayed Load */}
      <CoachingWordsBackground />

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
                background: `rgba(124, 107, 196, ${p.opacity})`,
                boxShadow: p.size > 2.5 ? `0 0 ${p.size * 3}px rgba(124,107,196,0.3)` : "none",
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
          {/* Headline — each line reveals separately */}
          <motion.h1
            className="display-text max-w-5xl mb-3 sm:mb-4"
            style={{ fontFamily: "var(--font-heading)", lineHeight: "1.15", fontSize: "clamp(2.25rem, 4.8vw, 3.75rem)" }}
          >
            <motion.span variants={revealUp} className="block">
              {language === 'es' ? (
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
              {language === 'es' ? 'Liderá tu empresa.' : 'Lead with purpose.'}
            </motion.span>
            <motion.span variants={revealUp} className="block mt-3">
              {language === 'es' ? (
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
            className="relative w-[600px] max-w-full mb-4 sm:mb-6 px-6 sm:px-10 py-5 sm:py-6 rounded-2xl"
            style={{
              minHeight: "5.5rem",
              background: "transparent",
              backdropFilter: "blur(15px)",
              border: "1px solid rgba(124,107,196,0.03)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 8px 32px rgba(0,0,0,0.2)",
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
            <div className="flex items-center justify-between gap-4">
              <div className="flex-shrink-0">
                <img 
                  src="/img/this_is_fine.png" 
                  alt="This is fine meme"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-full opacity-80"
                />
              </div>
              <div className="flex-1">
                <p className="text-base uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)", letterSpacing: "0.15em" }}>
                  ¿Te suena esto?
                </p>
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
                      fontSize: "clamp(1.3rem, 2.7vw, 1.7rem)" 
                    }}
                    dangerouslySetInnerHTML={{ 
                      __html: `&ldquo;${rotatingPhrases[phraseIndex]}&rdquo;` 
                    }}
                  />
                </AnimatePresence>
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
              color: "var(--text-secondary)"
            }}
          >
            {language === 'es' 
              ? 'Coaching y consultoría organizacional para líderes tech y startups que quieren crecer de forma ágil, humana y sostenible.'
              : 'Leadership coaching and organizational consulting for tech leaders and startups that want to grow in an agile, human, and sustainable way.'
            }
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={ctaReveal}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto max-w-2xl"
          >
            <motion.button
              className="btn-primary"
              onClick={() => handleScroll("#contacto")}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
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
              Conocé mi método ↓
            </motion.button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={revealUp}
            className="flex items-center justify-center mt-12 sm:mt-20 pb-16"
          >
            <p className="text-sm leading-relaxed text-center" style={{ color: "var(--text-muted)" }}>
              {language === 'es' 
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
