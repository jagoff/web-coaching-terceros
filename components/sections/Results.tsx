"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { scrollToElement } from "@/lib/scroll";

const stats = [
  {
    prefix: "+",
    value: 500,
    suffix: "",
    display: "+500",
    label: "Vidas transformadas",
    description: "Personas que ya dieron el paso",
  },
  {
    prefix: "",
    value: 10,
    suffix: "+",
    display: "10+",
    label: "Años de experiencia",
    description: "Certificada y en constante formación",
  },
  {
    prefix: "",
    value: 87,
    suffix: "%",
    display: "87%",
    label: "Tasa de satisfacción",
    description: "Clientes que logran sus objetivos",
  },
  {
    prefix: "",
    value: 4.9,
    suffix: "",
    display: "4.9",
    label: "Valoración media",
    description: "Basada en reseñas verificadas",
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
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      current = Math.min(current + increment, value);
      setDisplayed(current);
      if (frame >= steps) {
        setDisplayed(value);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [started, value]);

  const fmt = isDecimal ? displayed.toFixed(1) : Math.round(displayed).toString();

  return (
    <span>
      {prefix}{fmt}{suffix}
    </span>
  );
}

export default function Results() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const handleScroll = (href: string) => scrollToElement(href);

  return (
    <section
      id="resultados"
      className="section relative overflow-hidden"
      ref={ref}
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 60%), var(--dark-surface)",
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
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <span className="badge">Impacto Real</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Los números{" "}
            <span className="text-gradient">hablan por sí solos</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="divider-gold mt-6"
          />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
              className="text-center"
            >
              {/* Number */}
              <p className="stat-number mb-2">
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  started={isInView}
                />
              </p>

              {/* Separator */}
              <div
                className="w-10 h-px mx-auto mb-5"
                style={{ background: "rgba(212,175,55,0.3)" }}
              />

              <p
                className="text-sm font-semibold uppercase tracking-wider mb-3"
                style={{ color: "var(--text-primary)", letterSpacing: "0.08em" }}
              >
                {stat.label}
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <p
            className="lead-text max-w-2xl mx-auto mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            Cada número representa una persona que decidió que merecía más.{" "}
            <strong style={{ color: "var(--text-primary)" }}>
              ¿Cuándo es tu turno?
            </strong>
          </p>
          <button
            className="btn-primary"
            onClick={() => handleScroll("#contacto")}
          >
            Comienza tu transformación <ArrowRight size={16} className="inline ml-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
