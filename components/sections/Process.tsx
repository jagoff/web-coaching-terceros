"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Search, Compass, Zap, Star } from "lucide-react";
import { headerStagger, blurUp, dividerGrow } from "@/lib/animations";

const stepReveal: Variants = {
  hidden: { opacity: 0, y: 50, rotateY: -8, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateY: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay: 0.35 + i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Diagnóstico",
    description:
      "Analizamos tu organización, equipo o liderazgo actual. Identificamos fricciones, oportunidades y el punto de partida real.",
  },
  {
    number: "02",
    icon: Compass,
    title: "Diseño",
    description:
      "Co-creamos una hoja de ruta a medida: objetivos claros, métricas de avance y estrategia ágil adaptada a tu contexto.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Ejecución",
    description:
      "Sesiones de coaching y acompañamiento en el día a día. Iteramos, removemos impedimentos y mantenemos el foco.",
  },
  {
    number: "04",
    icon: Star,
    title: "Autonomía",
    description:
      "Consolidamos prácticas, transferimos herramientas y construís la capacidad interna para seguir evolucionando sin depender de mí.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="proceso" className="section section-surface section-gold-border-top" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14 md:mb-24 max-w-3xl mx-auto"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">El Proceso</span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Tu transformación en{" "}
            <span className="text-gradient">4 pasos</span>
          </motion.h2>
          <motion.p variants={blurUp} className="lead-text">
            Sin estructura no hay transformación duradera. Mi metodología
            garantiza que cada paso tenga propósito claro y avance medible.
          </motion.p>
          <motion.div
            variants={dividerGrow}
            className="divider-gold mt-6"
          />
        </motion.div>

        {/* Steps — desktop horizontal / mobile vertical */}
        <div className="relative">
          {/* Connector line (desktop only) */}
          <div
            className="absolute top-[4.5rem] left-0 right-0 hidden lg:block"
            aria-hidden="true"
            style={{ zIndex: 0 }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.6, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
              className="step-connector mx-auto"
              style={{
                width: "calc(100% - 120px)",
                marginLeft: "60px",
                transformOrigin: "left",
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  custom={i}
                  variants={stepReveal}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="process-step glass-card-sm group p-6"
                  style={{ perspective: "600px" }}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Ghost number */}
                  <span className="step-number" aria-hidden="true">
                    {step.number}
                  </span>

                  {/* Icon circle */}
                  <motion.div
                    className="step-icon"
                    whileHover={{ scale: 1.15, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </motion.div>

                  {/* Number label */}
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: "var(--gold-primary)", letterSpacing: "0.15em" }}
                  >
                    {step.number}
                  </p>

                  <h3
                    className="text-lg font-semibold mb-5"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
                  >
                    {step.title}
                  </h3>

                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)", lineHeight: "1.8" }}>
                    {step.description}
                  </p>

                  {/* Mobile connector */}
                  {i < steps.length - 1 && (
                    <div
                      className="sm:hidden mx-auto mt-4 w-px h-8 opacity-30"
                      style={{
                        background: "linear-gradient(180deg, var(--gold-primary), transparent)",
                      }}
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
