"use client";

import { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Clock, CheckCircle2 } from "lucide-react";
import { scrollToElement } from "@/lib/scroll";
import { headerStagger, blurUp, dividerGrow } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";

const caseCard: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: 0.3 + i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function CaseStudies() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [showAll, setShowAll] = useState(false);

  const handleScroll = (href: string) => scrollToElement(href);

  // Datos de casos de estudio usando traducciones
  const caseStudies = [
    {
      id: "nexolab",
      company: t.caseStudies.nexolab.company,
      role: t.caseStudies.nexolab.role,
      teamSize: t.caseStudies.nexolab.teamSize,
      duration: t.caseStudies.nexolab.duration,
      category: t.caseStudies.nexolab.category,
      before: {
        title: t.caseStudies.nexolab.before.title,
        points: t.caseStudies.nexolab.before.points
      },
      intervention: {
        title: t.caseStudies.nexolab.intervention.title,
        points: t.caseStudies.nexolab.intervention.points
      },
      results: {
        title: t.caseStudies.nexolab.results.title,
        points: t.caseStudies.nexolab.results.points
      }
    },
    {
      id: "dataflow",
      company: "DataFlow",
      role: "Engineering Manager",
      teamSize: "8 personas",
      duration: "2 meses",
      category: "Comunicación y Procesos",
      before: {
        title: "Equipos en Silos",
        points: [
          "Frontend y backend no se comunicaban",
          "Bugs de integración constantes",
          "Cultura de culpa ('culpa del backend')",
          "Progreso invisible para stakeholders"
        ]
      },
      intervention: {
        title: "Mientras",
        points: [
          "Pair programming semanal cross-equipo",
          "Contrato de API compartido",
          "Board Kanban visible para todos",
          "Demo Fridays con stakeholders"
        ]
      },
      results: {
        title: "Resultados",
        points: [
          "Bugs de integración reducidos drásticamente",
          "Tiempo de ciclo -40%",
          "Colaboración natural vs forzada",
          "Visibilidad clara del progreso"
        ]
      }
    },
    {
      id: "scaleup-co",
      company: "ScaleUp Co",
      role: "VP of Strategy",
      teamSize: "50+ empleados",
      duration: "4 meses",
      category: "Escalabilidad",
      before: {
        title: "Crecimiento Caótico",
        points: [
          "Procesos que no escalaban con el negocio",
          "Decisiones centralizadas en CEO",
          "Prioridades cambiantes sin aviso",
          "Equipos sin autonomía real"
        ]
      },
      intervention: {
        title: "Mientras",
        points: [
          "Implementación de OKRs company-wide",
          "Delegación efectiva con autonomía",
          "Planning Mondays estructurados",
          "Sistema de comunicación clara"
        ]
      },
      results: {
        title: "Resultados",
        points: [
          "Alineación completa de la compañía",
          "Toma de decisiones distribuida",
          "Procesos escalables y predecibles",
          "Cultura de alta autonomía"
        ]
      }
    }
  ];

  // Show only first case study initially
  const displayedCases = showAll ? caseStudies : [caseStudies[0]];

  return (
    <section id="casos-de-estudio" className="section section-surface section-gold-border-top hidden md:block" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">{t.caseStudies.badge}</span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl mb-4 text-center px-4"
            style={{ 
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {t.caseStudies.title}{" "}
            <span className="text-gradient">{t.caseStudies.titleHighlight}</span>
          </motion.h2>
          <motion.p
            variants={blurUp}
            className="lead-text max-w-2xl mx-auto text-center"
          >
            {t.caseStudies.subtitle}
          </motion.p>
          <motion.div
            variants={dividerGrow}
            className="divider-gold mt-6"
          />
        </motion.div>

        {/* Case Studies Grid Layout - Show only first initially */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 md:mb-16">
          {displayedCases.map((caseStudy, i) => (
            <motion.div
              key={caseStudy.id}
              custom={i}
              variants={caseCard}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="glass-card p-6 relative overflow-hidden group"
              style={{ perspective: "800px" }}
              whileHover={{ y: -4, boxShadow: "0 0 60px rgba(124,107,196,0.15), 0 16px 48px rgba(0,0,0,0.4)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Company Header */}
              <div className="mb-6 pb-4 border-b" style={{ borderColor: "rgba(124,107,196,0.2)" }}>
                <h4 
                  className="heading-md mb-2 font-bold"
                  style={{ 
                    fontFamily: "var(--font-heading)",
                    color: "white",
                    fontSize: "1.2rem"
                  }}
                >
                  {caseStudy.company}
                </h4>
                <p className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
                  {caseStudy.category}
                </p>
                <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                  <span className="font-semibold">Qué se hizo:</span> {caseStudy.intervention.points[0]}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                  {caseStudy.role} · {caseStudy.teamSize} · {caseStudy.duration}
                </p>
              </div>

              {/* Timeline Content - Horizontal Layout */}
              <div className="grid grid-cols-3 gap-4">
                {/* ANTES */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)" }}
                    >
                      <TrendingUp size={12} style={{ color: "#ef4444" }} />
                    </div>
                    <h5 
                      className="text-sm font-semibold"
                      style={{ color: "#ef4444" }}
                    >
                      {t.caseStudies.before}
                    </h5>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {caseStudy.before.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2" style={{ 
                        color: "var(--text-secondary)",
                        borderBottom: idx < caseStudy.before.points.length - 1 ? "1px solid rgba(124,107,196,0.1)" : "none",
                        paddingBottom: idx < caseStudy.before.points.length - 1 ? "6px" : "0"
                      }}>
                        <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* INTERVENCIÓN */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(124,107,196,0.15)", border: "1px solid rgba(124,107,196,0.3)" }}
                    >
                      <Users size={12} style={{ color: "var(--gold-primary)" }} />
                    </div>
                    <h5 
                      className="text-sm font-semibold"
                      style={{ color: "var(--gold-primary)" }}
                    >
                      {t.caseStudies.whileWorking}
                    </h5>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {caseStudy.intervention.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2" style={{ 
                        color: "var(--text-secondary)",
                        borderBottom: idx < caseStudy.intervention.points.length - 1 ? "1px solid rgba(124,107,196,0.1)" : "none",
                        paddingBottom: idx < caseStudy.intervention.points.length - 1 ? "6px" : "0"
                      }}>
                        <span className="text-yellow-400 mt-0.5 flex-shrink-0">→</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* RESULTADOS */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(34, 197, 94, 0.15)", border: "1px solid rgba(34, 197, 94, 0.3)" }}
                    >
                      <CheckCircle2 size={12} style={{ color: "#22c55e" }} />
                    </div>
                    <h5 
                      className="text-sm font-semibold"
                      style={{ color: "#22c55e" }}
                    >
                      {t.caseStudies.results}
                    </h5>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {caseStudy.results.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2" style={{ 
                        color: "var(--text-secondary)",
                        borderBottom: idx < caseStudy.results.points.length - 1 ? "1px solid rgba(124,107,196,0.1)" : "none",
                        paddingBottom: idx < caseStudy.results.points.length - 1 ? "6px" : "0"
                      }}>
                        <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 pt-4 border-t flex justify-end" style={{ borderColor: "rgba(124,107,196,0.1)" }}>
                <button
                  className="inline-flex items-center gap-2 bg-transparent border-0 cursor-pointer p-0 text-sm font-semibold tracking-widest transition-all"
                  style={{ 
                    background: "linear-gradient(135deg, #C87B5A 0%, #7C6BC4 50%, #FF6B35 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "0.1em",
                    transform: "translateY(13px)"
                  }}
                  onClick={() => handleScroll("#contacto")}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.8"; e.currentTarget.style.gap = "12px"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.gap = "8px"; }}
                >
                  {t.caseStudies.seeFullTransformation}
                  <ArrowRight 
                    size={16} 
                    style={{ color: "#FF6B35" }}
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {!showAll && caseStudies.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mb-12 md:mb-16"
          >
            <button
              className="btn-secondary"
              onClick={() => setShowAll(true)}
            >
              {t.caseStudies.viewMoreCases}
              <ArrowRight size={16} className="inline ml-2" />
            </button>
          </motion.div>
        )}

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: showAll ? 0.9 : 0.7 }}
          className="text-center"
        >
          <p className="lead-text max-w-2xl mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
            {language === 'es' ? 'Cada transformación requiere un enfoque único.' : 'Each transformation requires a unique approach.'} 
            <strong style={{ color: "var(--text-primary)" }}>
              {t.caseStudies.yourSpecificCase}
            </strong>
          </p>
          
          <button
            className="btn-primary"
            onClick={() => handleScroll("#contacto")}
          >
            {t.caseStudies.analyzeYourCase} <ArrowRight size={16} className="inline ml-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
