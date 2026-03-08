"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Search, Compass, Zap, Star } from "lucide-react";
import { headerStagger, blurUp, dividerGrow } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";

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


export default function Process() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    {
      number: "01",
      icon: Search,
      title: t.process.steps.diagnostico.title,
      description: t.process.steps.diagnostico.description,
    },
    {
      number: "02",
      icon: Compass,
      title: t.process.steps.diseno.title,
      description: t.process.steps.diseno.description,
    },
    {
      number: "03",
      icon: Zap,
      title: t.process.steps.ejecucion.title,
      description: t.process.steps.ejecucion.description,
    },
    {
      number: "04",
      icon: Star,
      title: t.process.steps.autonomia.title,
      description: t.process.steps.autonomia.description,
    },
  ];

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
            <span className="badge">{t.process.badge}</span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl mb-4"
            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            {t.process.title}{" "}
            <span className="text-gradient">{t.process.title2}</span> {t.process.title3}
          </motion.h2>
          <motion.p variants={blurUp} className="lead-text">
            {t.process.subtitle}
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
                  <span 
                    className="step-number" 
                    aria-hidden="true"
                    style={{
                      background: i === 0 
                        ? "linear-gradient(135deg, #7C6BC4 0%, #C87B5A 55%, #9D8FD8 100%)"
                        : i === 1
                        ? "linear-gradient(135deg, #8B7BD4 0%, #D4956A 55%, #A89FE8 100%)"
                        : i === 2
                        ? "linear-gradient(135deg, #9A8BE4 0%, #E0A57A 55%, #B3AFF8 100%)"
                        : "linear-gradient(135deg, #A99BF4 0%, #ECB58A 55%, #BEBFFF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
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
