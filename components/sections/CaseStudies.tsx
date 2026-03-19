"use client";

import { useRef, useState, useEffect } from "react";
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

const caseStudies = [
  {
    id: "nexolab",
    company: "NexoLab",
    role: "CTO & Co-founder",
    teamSize: "15 devs",
    duration: "3 meses",
    category: "Transformación Ágil",
    before: {
      title: "Caos Organizacional",
      points: [
        "Sin estructura de trabajo definida",
        "Entregas inconsistentes y fuera de tiempo",
        "Alta rotación de talento",
        "Comunicación fragmentada entre equipos"
      ]
    },
    intervention: {
      title: "Intervención",
      points: [
        "Implementación de Scrum real (no de manual)",
        "Definition of Done clara y medible",
        "Retrospectivas quincenales con acción concreta",
        "Daily meetings de 45→15 minutos"
      ]
    },
    results: {
      title: "Resultados",
      points: [
        "Velocidad de entrega duplicada",
        "Deploy automation: 4hs→5 minutos",
        "Retención de talento +35%",
        "Equipos colaborativos vs silos"
      ]
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
      title: "Intervención",
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
      title: "Intervención",
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

export default function CaseStudies() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-200px", amount: 0.1 });
  const [showAll, setShowAll] = useState(false);
  const [featuredCases, setFeaturedCases] = useState<typeof caseStudies>([]);

  // Randomly select 2 featured case studies on component mount
  useEffect(() => {
    const shuffled = [...caseStudies].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);
    setFeaturedCases(selected);
  }, []);

  const handleScroll = (href: string) => scrollToElement(href);

  const displayCases = showAll ? caseStudies : featuredCases;

  return (
    <section id="casos-de-estudio" className="section section-surface section-gold-border-top" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12 md:mb-20"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">{t.caseStudies.badge}</span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t.caseStudies.title}{" "}
            <span className="text-gradient">{t.caseStudies.title2}</span>
          </motion.h2>
          <motion.p
            variants={blurUp}
            className="lead-text max-w-2xl mx-auto"
          >
            {t.caseStudies.subtitle}
          </motion.p>
          <motion.div
            variants={dividerGrow}
            className="divider-gold mt-6"
          />
        </motion.div>

        {/* Case Studies Grid Layout - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 md:mb-16">
          {displayCases.map((caseStudy, i) => (
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
                    color: "var(--gold-primary)",
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

              {/* Timeline Content - 3 Column Layout */}
              <div className="grid grid-cols-3 gap-4 flex-1">
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
                      ANTES
                    </h5>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {caseStudy.before.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2" style={{ 
                        color: "var(--text-secondary)"
                      }}>
                        <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
                        <span className="text-xs leading-tight">{point}</span>
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
                      INTERVENCIÓN
                    </h5>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {caseStudy.intervention.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2" style={{ 
                        color: "var(--text-secondary)"
                      }}>
                        <span className="text-yellow-400 mt-0.5 flex-shrink-0">→</span>
                        <span className="text-xs leading-tight">{point}</span>
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
                      RESULTADOS
                    </h5>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {caseStudy.results.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2" style={{ 
                        color: "var(--text-secondary)"
                      }}>
                        <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                        <span className="text-xs leading-tight">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA - FUERA DEL TEXTBOX PERO DENTRO DEL CARD */}
              <div className="mt-4 pt-4 border-t" style={{ borderColor: "rgba(124,107,196,0.1)" }}>
                <button
                  className="inline-flex items-center gap-2 bg-transparent border-0 cursor-pointer p-0 text-sm font-semibold transition-all group"
                  style={{ color: "var(--gold-primary)" }}
                  onClick={() => handleScroll("#contacto")}
                >
                  Ver transformación completa
                  <ArrowRight 
                    size={14} 
                    className="transition-transform group-hover:translate-x-1" 
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All / View Less Button */}
        <div className="text-center mb-12">
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 rounded-full font-medium transition-all duration-300"
            style={{
              background: "var(--gold-primary)",
              color: "var(--dark-bg)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAll 
              ? 'Ver menos transformaciones'
              : 'Ver más transformaciones'
            }
          </motion.button>
        </div>

        </div>
    </section>
  );
}
