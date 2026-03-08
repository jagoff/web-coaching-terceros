"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Flame, Gem, CheckCircle2, ArrowRight } from "lucide-react";
import { scrollToElement } from "@/lib/scroll";
import { headerStagger, blurUp, dividerGrow } from "@/lib/animations";

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 8, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: 0.3 + i * 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const benefitStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.4 } },
};

const benefitItem: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const services = [
  {
    id: "liderazgo",
    icon: Flame,
    title: "Coaching de Liderazgo",
    description:
      "Para líderes tech y founders que quieren potenciar su impacto, construir equipos de alto rendimiento y liderar con visión estratégica sin perder lo humano.",
    benefits: [
      "Liderazgo auténtico y estratégico",
      "Gestión y motivación de equipos tech",
      "Toma de decisiones en entornos complejos",
      "Comunicación efectiva con stakeholders",
      "Balance entre ejecución y visión",
    ],
    cta: "Quiero potenciar mi liderazgo",
    featured: false,
  },
  {
    id: "organizacional",
    icon: Gem,
    title: "Consultoría Organizacional",
    description:
      "Para startups y empresas que necesitan profesionalizar operaciones, adoptar agilidad real y construir una cultura que escale junto con el negocio.",
    benefits: [
      "Transformación ágil a medida",
      "Diseño de procesos escalables",
      "Cultura organizacional human-centric",
      "Métricas de eficiencia y mejora continua",
      "Alineación estratégica de equipos",
    ],
    cta: "Quiero transformar mi empresa",
    featured: true,
    badge: "MÁS SOLICITADO",
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicios" className="section section-dark" ref={ref}>
      <div className="container">
        {/* Section header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14 md:mb-24"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">Servicios</span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            ¿En qué área necesitas{" "}
            <span className="text-gradient">elevar</span> más?
          </motion.h2>
          <motion.div
            variants={dividerGrow}
            className="divider-gold mt-6"
          />
        </motion.div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                custom={i}
                variants={cardReveal}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className={`glass-card p-6 sm:p-10 md:p-12 flex flex-col group relative overflow-hidden${service.featured ? " ring-1" : ""}`}
                style={{
                  perspective: "800px",
                  ...(service.featured
                    ? {
                        borderColor: "rgba(212,175,55,0.45)",
                        boxShadow:
                          "0 0 40px rgba(212,175,55,0.12), 0 8px 32px rgba(0,0,0,0.5)",
                      }
                    : {}),
                }}
                whileHover={{ y: -6, boxShadow: service.featured ? "0 0 60px rgba(212,175,55,0.2), 0 16px 48px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.4)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Featured glow background */}
                {service.featured && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      background:
                        "radial-gradient(ellipse at top right, rgba(212,175,55,0.25) 0%, transparent 60%)",
                    }}
                  />
                )}

                {/* Icon + Badge row */}
                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    className="w-14 h-14 rounded-lg flex items-center justify-center"
                    style={{
                      background: "rgba(212,175,55,0.12)",
                      border: "1px solid rgba(212,175,55,0.25)",
                      color: "var(--gold-primary)",
                    }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Icon size={26} strokeWidth={1.5} />
                  </motion.div>
                  {service.badge && (
                    <span className="badge text-xs">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3
                  className="heading-md mb-6"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {service.title}
                </h3>

                <p className="mb-6 sm:mb-10" style={{ color: "var(--text-secondary)", lineHeight: "1.75" }}>
                  {service.description}
                </p>

                {/* Benefits */}
                <motion.ul
                  variants={benefitStagger}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-1"
                >
                  {service.benefits.map((benefit) => (
                    <motion.li key={benefit} variants={benefitItem} className="flex items-start gap-3">
                      <CheckCircle2
                        size={16}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: "var(--gold-primary)" }}
                      />
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {benefit}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* CTA */}
                <button
                  className="inline-flex items-center gap-2 bg-transparent border-0 cursor-pointer p-0 text-sm font-semibold uppercase tracking-widest transition-all"
                  style={{ color: "var(--gold-primary)", letterSpacing: "0.1em" }}
                  onClick={() => scrollToElement("#contacto")}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.8"; e.currentTarget.style.gap = "12px"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.gap = "8px"; }}
                >
                  {service.cta} <ArrowRight size={16} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
