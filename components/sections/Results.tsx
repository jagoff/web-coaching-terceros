"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { scrollToElement } from "@/lib/scroll";
import { headerStagger, blurUp, dividerGrow } from "@/lib/animations";

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
    value: 6,
    suffix: "+",
    display: "6+",
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
      // ease-out cubic for a snappy feel
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(eased * value);
      if (frame >= totalFrames) {
        setDisplayed(value);
        clearInterval(timer);
      }
    }, duration / totalFrames);

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
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14 md:mb-24"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">Impacto Real</span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Los números{" "}
            <span className="text-gradient">hablan por sí solos</span>
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
              animate={isInView ? "visible" : "hidden"}
              className="text-center"
              whileHover={{ scale: 1.06, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                style={{ background: "rgba(124,107,196,0.3)" }}
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
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p
            className="lead-text max-w-2xl mx-auto mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            Cada número representa experiencia real construyendo equipos y organizaciones.{" "}
            <strong style={{ color: "var(--text-primary)" }}>
              ¿Hablamos de tu próximo paso?
            </strong>
          </p>
          <button
            className="btn-primary"
            onClick={() => handleScroll("#contacto")}
          >
            Empezá tu transformación <ArrowRight size={16} className="inline ml-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
