"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import CountUp from "react-countup";
import { StatsSuspense } from "@/components/ui/SuspenseWrapper";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const stats = [
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
];

export default function ResultsWithSuspense() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasStarted, setHasStarted] = useState(false);

  // Trigger count animation when in view
  React.useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
    }
  }, [isInView, hasStarted]);

  return (
    <StatsSuspense>
      <section
        id="resultados"
        className="section section-surface section-gold-border-top"
        ref={ref}
      >
        {/* Glow with scroll parallax */}
        <motion.div
          className="orb orb-violet absolute"
          style={{
            width: 600,
            height: 600,
            top: "50%",
            right: "-20%",
            opacity: 0.25,
            y: -300,
          }}
          aria-hidden="true"
        />

        <div className="container relative z-10">
          {/* Header */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-center mb-12 md:mb-20"
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-6">
              <span className="badge">
                {language === 'es' ? 'Resultados Comprobados' : 'Proven Results'}
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="heading-xl mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {language === 'es' ? (
                <>
                  Transformación en{" "}
                  <span className="text-gradient">Números</span>
                </>
              ) : (
                <>
                  Transformation in{" "}
                  <span className="text-gradient">Numbers</span>
                </>
              )}
            </motion.h2>

            <motion.div variants={fadeInUp} className="divider-gold-center" />

            <motion.p
              variants={fadeInUp}
              className="lead-text max-w-3xl mx-auto"
            >
              {language === 'es'
                ? 'Más de dos décadas transformando líderes y organizaciones. Los números hablan por sí solos.'
                : 'More than two decades transforming leaders and organizations. The numbers speak for themselves.'}
            </motion.p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12 lg:gap-16 mb-14 md:mb-24"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeInUp}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Number */}
                <p className="stat-number mb-2">
                  {hasStarted ? (
                    <CountUp
                      end={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2.5}
                      delay={i * 0.2}
                      easingFn={(t: number) => t * (2 - t)} // ease-out
                      separator=""
                    />
                  ) : (
                    <span style={{ opacity: 0.3 }}>0</span>
                  )}
                </p>

                {/* Label */}
                <p className="stat-label mb-2">{stat.label}</p>

                {/* Description */}
                <p
                  className="text-sm"
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: "1.5",
                  }}
                >
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional context */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <p
              className="text-sm italic"
              style={{ color: "var(--text-muted)" }}
            >
              {language === 'es'
                ? 'Cada número representa una historia de transformación y crecimiento.'
                : 'Every number represents a story of transformation and growth.'}
            </p>
          </motion.div>
        </div>
      </section>
    </StatsSuspense>
  );
}
