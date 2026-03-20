"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { scrollToElement } from "@/lib/scroll";
import { headerStagger, blurUp, dividerGrow } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";

const statCard: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.9, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay: 0.2 + i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Results() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const [forceVisible, setForceVisible] = useState(false);

  // Fallback: Force visibility after 2 seconds if animation hasn't triggered
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isInView) {
        setForceVisible(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [isInView]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -40]);

  const stats = language === 'es' ? [
    {
      prefix: "+",
      value: 20,
      suffix: "",
      display: "+20",
      label: "Años en tecnología",
      description: "Desde infraestructura hasta liderazgo",
    },
    {
      prefix: "",
      value: 11,
      suffix: "+",
      display: "11+",
      label: "Años de coaching ágil",
      description: "Transformando startups y empresas tech",
    },
    {
      prefix: "",
      value: 9,
      suffix: "+",
      display: "9+",
      label: "Certificaciones activas",
      description: "Scrum, UX, Management 3.0, Security",
    },
    {
      prefix: "",
      value: 6,
      suffix: "",
      display: "6",
      label: "Empresas co-fundadas",
      description: "Moka, Nodok.AI, AyP",
    },
  ] : [
    {
      prefix: "+",
      value: 20,
      suffix: "",
      display: "+20",
      label: "Years in technology",
      description: "From infrastructure to leadership",
    },
    {
      prefix: "",
      value: 11,
      suffix: "+",
      display: "11+",
      label: "Years of agile coaching",
      description: "Transforming startups and tech companies",
    },
    {
      prefix: "",
      value: 9,
      suffix: "+",
      display: "9+",
      label: "Active certifications",
      description: "Scrum, UX, Management 3.0, Security",
    },
    {
      prefix: "",
      value: 6,
      suffix: "",
      display: "6",
      label: "Companies co-founded",
      description: "Moka, Nodok.AI, AyP",
    },
  ];

  function CountUp({
    value,
    prefix,
    suffix,
    started,
  }: {
    value: number;
    prefix: string;
    suffix: string;
    started: boolean;
  }) {
  const [displayed, setDisplayed] = useState(0);
  const isDecimal = value % 1 !== 0;

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const totalFrames = 70;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayed(value * easeOutQuart);

      if (frame >= totalFrames) {
        clearInterval(timer);
      }
    }, duration / totalFrames);

    return () => clearInterval(timer);
  }, [started, value]);

  const fmt = isDecimal ? displayed.toFixed(1) : Math.round(displayed).toString();

  return (
    <span className="stat-number">
      {prefix}{fmt}{suffix}
    </span>
  );
}

  return (
    <section
      id="resultados"
      className="section relative overflow-hidden"
      ref={ref}
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(124,107,196,0.08) 0%, transparent 60%), var(--dark-surface)",
      }}
    >
      {/* Decorative orb with scroll parallax */}
      <motion.div
        className="orb orb-gold absolute"
        style={{
          width: 400,
          height: 400,
          top: "-20%",
          left: "50%",
          x: "-50%",
          y: orbY,
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView || forceVisible ? "visible" : "hidden"}
          className="text-center mb-14 md:mb-24"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">{language === 'es' ? 'Impacto Real' : 'Real Impact'}</span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {language === 'es' ? 'Transformación en' : 'Transformation in'}{" "}
            <span className="text-gradient">{language === 'es' ? 'Números' : 'Numbers'}</span>
          </motion.h2>
          <motion.div
            variants={dividerGrow}
            className="divider-gold mt-6"
          />
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12 lg:gap-16 mb-14 md:mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={statCard}
              initial="hidden"
              animate={isInView || forceVisible ? "visible" : "hidden"}
              className="text-center"
              whileHover={{ scale: 1.06, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Number */}
              <CountUp
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                started={isInView || forceVisible}
              />

              {/* Label */}
              <h3 className="heading-sm mt-3 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={isInView || forceVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p
            className="lead-text max-w-2xl mx-auto mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            {language === 'es' 
              ? 'Cada número representa experiencia real construyendo equipos y organizaciones.' 
              : 'Every number represents real experience building teams and organizations.'
            }{" "}
            <strong style={{ color: "var(--text-primary)" }}>
              {language === 'es' ? '¿Hablamos de tu próximo paso?' : 'Shall we talk about your next step?'}
            </strong>
          </p>
          <button
            className="btn-primary"
            onClick={() => {
              const target = document.querySelector("#contacto");
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {language === 'es' ? 'Empezá tu transformación' : 'Start your transformation'} <ArrowRight size={16} className="inline ml-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
