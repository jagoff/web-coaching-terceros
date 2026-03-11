"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { scrollToElement } from "@/lib/scroll";
import { blurUp } from "@/lib/animations";
import { HeroSuspense } from "@/components/ui/SuspenseWrapper";

const rotatingPhrasesES = [
  "liderazgo auténtico",
  "equipos de alto rendimiento",
  "transformación real",
  "crecimiento sostenible",
  "cultura ágil",
];

const rotatingPhrasesEN = [
  "authentic leadership",
  "high-performing teams",
  "real transformation",
  "sustainable growth",
  "agile culture",
];

const revealUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const orbVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 0.35,
    scale: 1,
    transition: {
      duration: 2,
      ease: "easeOut",
      delay: 0.3,
    },
  },
};

export default function HeroWithSuspense() {
  const { t, language } = useLanguage();
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -40]);

  const rotatingPhrases = language === 'es' ? rotatingPhrasesES : rotatingPhrasesEN;

  const handleScroll = useCallback((targetId: string) => {
    scrollToElement(targetId);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isClient, rotatingPhrases.length]);

  if (!isClient) {
    return (
      <HeroSuspense>
        <div />
      </HeroSuspense>
    );
  }

  return (
    <HeroSuspense>
      <section
        id="inicio"
        className="hero-bg relative flex min-h-screen flex-col items-center overflow-hidden"
        aria-label="Sección principal"
        ref={ref}
        style={{ paddingTop: "var(--header-height)" }}
      >
        {/* Glow with scroll parallax */}
        <motion.div
          className="orb orb-gold absolute"
          style={{
            width: 800,
            height: 800,
            top: "-20%",
            left: "-30%",
            opacity: 0.35,
            y: orbY,
          }}
          aria-hidden="true"
        />

        {/* Floating particles */}
        <div className="particles absolute inset-0" aria-hidden="true" />

        {/* Main content */}
        <div className="container relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-16">
          <motion.div
            variants={revealUp}
            initial="hidden"
            animate="visible"
            className="w-full max-w-4xl text-center"
          >
            {/* Main heading */}
            <h1
              className="heading-xl mb-6 sm:mb-8"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {language === 'es' ? (
                <>
                  Transformá tu{" "}
                  <span className="text-gradient">liderazgo</span>
                </>
              ) : (
                <>
                  Transform your{" "}
                  <span className="text-gradient">leadership</span>
                </>
              )}
            </h1>

            {/* Rotating phrases */}
            <div className="mb-8 sm:mb-12 min-h-[2rem]">
              <motion.p
                key={currentPhraseIndex}
                variants={blurUp}
                initial="hidden"
                animate="visible"
                className="heading-lg text-gradient"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {language === 'es' ? 'en ' : 'in '}
                {rotatingPhrases[currentPhraseIndex]}
              </motion.p>
            </div>

            {/* Subtitle */}
            <motion.p
              variants={revealUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="lead-text max-w-2xl mb-8 sm:mb-12"
            >
              {language === 'es' 
                ? 'Coaching y consultoría organizacional para líderes tech y startups que quieren crecer de forma ágil, humana y sostenible.'
                : 'Leadership coaching and organizational consulting for tech leaders and startups that want to grow in an agile, human, and sustainable way.'
              }
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={revealUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll("#contacto");
                }}
                className="btn-primary animate-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'es' ? 'Agendá tu sesión gratuita' : 'Book your free session'}
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </motion.a>

              <motion.a
                href="#servicios"
                onClick={(e) => {
                  e.preventDefault();
                  handleScroll("#servicios");
                }}
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {language === 'es' ? 'Ver servicios' : 'View services'}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={revealUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center mt-12 sm:mt-20 pb-16"
          >
            <p className="text-sm leading-relaxed text-center" style={{ color: "var(--text-muted)" }}>
              {language === 'es' 
                ? 'Más de 20 años en tecnología · 11+ años de consultoría'
                : 'Over 20 years in technology · 11+ years of agile consulting'
              }
            </p>
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
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--gold-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--text-muted)";
            }}
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-3 rounded-full"
              style={{ backgroundColor: "var(--text-muted)" }}
            />
          </div>
          <span className="text-xs text-white/60 uppercase tracking-widest">Deslizar</span>
        </motion.button>
      </section>
    </HeroSuspense>
  );
}
