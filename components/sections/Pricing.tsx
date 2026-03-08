"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import { scrollToElement } from "@/lib/scroll";

const headerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const blurUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const planCard: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 6, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: 0.25 + i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const featureStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
};

const featureItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

const plans = [
  {
    id: "individual",
    name: "Sesión Individual",
    price: "€197",
    period: "/ sesión",
    description:
      "Resolver un punto de bloqueo específico o explorar el proceso antes de comprometerte.",
    features: [
      "1 sesión de 90 minutos",
      "Plan de acción post-sesión",
      "Soporte por email 7 días",
    ],
    cta: "Reservar sesión",
    featured: false,
    badge: null,
  },
  {
    id: "transformacion",
    name: "Programa Transformación",
    price: "€1.497",
    period: "/ 3 meses",
    description:
      "El proceso completo. Transformación real, medible y duradera.",
    features: [
      "12 sesiones (1 por semana)",
      "Sesión de diagnóstico inicial",
      "Recursos y herramientas premium",
      "Soporte WhatsApp entre sesiones",
      "Plan estratégico personalizado",
      "Grabaciones + resúmenes escritos",
    ],
    cta: "Comenzar ahora",
    featured: true,
    badge: "Más Popular",
  },
  {
    id: "elite",
    name: "Mentoría Élite",
    price: "€4.800",
    period: "/ 12 meses",
    description:
      "Acompañamiento continuo de alto nivel para líderes que buscan resultados extraordinarios.",
    features: [
      "Todo lo del Programa Transformación",
      "Sesiones adicionales según necesidad",
      "Acceso directo y prioritario",
      "Revisión trimestral de objetivos",
      "Acceso a comunidad privada de clientes",
    ],
    cta: "Solicitar información",
    featured: false,
    badge: null,
  },
];

export default function Pricing() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const handleScroll = (href: string) => scrollToElement(href);

  return (
    <section id="precios" className="section section-surface section-gold-border-top" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12 md:mb-20"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">Inversión</span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Elige tu nivel de{" "}
            <span className="text-gradient">compromiso</span>
          </motion.h2>
          <motion.p
            variants={blurUp}
            className="text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            Todas las modalidades incluyen sesión de diagnóstico gratuita · Sin permanencia forzada
          </motion.p>
          <motion.div
            variants={{ hidden: { scaleX: 0, opacity: 0 }, visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
            className="divider-gold mt-6"
          />
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-stretch mt-12 sm:mt-20">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              custom={i}
              variants={planCard}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className={`pricing-card flex flex-col relative${plan.featured ? " featured animated-border" : ""}`}
              style={{ perspective: "800px" }}
              whileHover={{ y: -8, boxShadow: plan.featured ? "0 0 60px rgba(212,175,55,0.2), 0 16px 48px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.4)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Badge row — fixed height keeps all cards aligned */}
              <div className="flex justify-end mb-4" style={{ minHeight: "1.75rem" }}>
                {plan.badge && (
                  <span className="badge text-xs px-3 py-1" aria-label="Plan más popular">
                    {plan.badge}
                  </span>
                )}
              </div>

              {/* Plan name */}
              <p
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: "var(--gold-primary)", letterSpacing: "0.15em" }}
              >
                {plan.name}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-5">
                <span className="price-amount">{plan.price}</span>
                <span className="price-period">{plan.period}</span>
              </div>

              {/* Description */}
              <p
                className="text-sm pb-8 mb-8 border-b"
                style={{
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                  borderColor: "rgba(255,255,255,0.06)",
                  minHeight: "5.5rem",
                }}
              >
                {plan.description}
              </p>

              {/* Features */}
              <motion.ul
                variants={featureStagger}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="space-y-4 mb-12 flex-1"
              >
                {plan.features.map((feature) => (
                  <motion.li key={feature} variants={featureItem} className="pricing-feature">
                    <CheckCircle2 className="pricing-check" size={16} />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* CTA */}
              <button
                className="btn-secondary"
                onClick={() => handleScroll("#contacto")}
              >
                {plan.cta} <ArrowRight size={14} className="inline ml-1" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-12 sm:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MessageCircle size={18} style={{ color: "var(--gold-primary)", flexShrink: 0 }} />
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            ¿Tienes dudas sobre qué plan es el adecuado para ti?{" "}
            <button
              className="underline transition-colors bg-transparent border-0 cursor-pointer p-0"
              style={{ color: "var(--gold-primary)" }}
              onClick={() => handleScroll("#contacto")}
            >
              Escríbeme y lo hablamos sin compromiso.
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
