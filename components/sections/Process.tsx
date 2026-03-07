"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Compass, Zap, Star } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Diagnóstico",
    description:
      "Exploramos dónde estás, a dónde quieres llegar y qué te ha impedido llegar hasta ahora. Sin juicios, sin guiones.",
  },
  {
    number: "02",
    icon: Compass,
    title: "Diseño",
    description:
      "Construimos tu hoja de ruta personalizada: objetivos SMART, estrategias concretas y métricas de progreso reales.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Ejecución",
    description:
      "Sesiones regulares de coaching. Revisamos avances, resolvemos obstáculos y mantenemos el momentum semana a semana.",
  },
  {
    number: "04",
    icon: Star,
    title: "Integración",
    description:
      "Consolidamos aprendizajes y construyes autonomía. Al terminar no dependes de mí — tienes las herramientas para seguir solo.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="proceso" className="section section-surface section-gold-border-top" ref={ref}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <span className="badge">El Proceso</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="heading-xl mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Tu transformación en{" "}
            <span className="text-gradient">4 pasos</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lead-text"
          >
            No existe el cambio sin estructura. Mi metodología garantiza que
            cada sesión tenga un propósito claro y un avance medible.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="divider-gold mt-6"
          />
        </div>

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.15,
                    ease: [0, 0, 0.2, 1] as [number, number, number, number],
                  }}
                  className="process-step glass-card-sm group p-6"
                >
                  {/* Ghost number */}
                  <span className="step-number" aria-hidden="true">
                    {step.number}
                  </span>

                  {/* Icon circle */}
                  <div className="step-icon group-hover:scale-110 transition-transform duration-300">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

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
                      className="lg:hidden mx-auto mt-4 w-px h-8 opacity-30"
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
