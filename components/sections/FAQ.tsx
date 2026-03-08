"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { headerStagger, blurUp, dividerGrow } from "@/lib/animations";

const faqStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const faqItem: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const faqs = [
  {
    question: "¿Para quién es este servicio?",
    answer:
      "Para líderes tech, founders de startups, CTOs y managers que sienten que su equipo podría rendir más, que las decisiones se estancan o que la cultura no escala al mismo ritmo que el negocio.",
  },
  {
    question: "¿Qué diferencia hay entre coaching y consultoría?",
    answer:
      "El coaching te acompaña a encontrar tus propias respuestas y desarrollar habilidades de liderazgo. La consultoría aporta frameworks, procesos y estrategias concretas. Mi enfoque combina ambos según lo que necesites.",
  },
  {
    question: "¿Cuánto tiempo dura un proceso típico?",
    answer:
      "Un proceso de coaching individual suele durar entre 8 y 12 sesiones (2-3 meses). La consultoría organizacional varía según la complejidad, pero los primeros resultados se ven en las primeras 4-6 semanas.",
  },
  {
    question: "¿La sesión de diagnóstico tiene algún costo?",
    answer:
      "No. La primera sesión de 30 minutos es completamente gratuita y sin compromiso. Sirve para entender tu situación, definir objetivos y ver si tiene sentido trabajar juntos.",
  },
  {
    question: "¿Trabajás con empresas fuera de Argentina?",
    answer:
      "Sí. Trabajo con líderes y equipos de toda Latinoamérica y España. Las sesiones son 100% remotas por videollamada, lo que permite flexibilidad total de horarios.",
  },
];

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="section section-dark section-compact" ref={ref}>
      <div className="container">
        {/* Section header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">Preguntas Frecuentes</span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Resolvé tus <span className="text-gradient">dudas</span>
          </motion.h2>
          <motion.div
            variants={dividerGrow}
            className="divider-gold mt-6"
          />
        </motion.div>

        {/* Accordion */}
        <motion.div
          variants={faqStagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto flex flex-col"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={faqItem}
              className="faq-item"
            >
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={20} style={{ color: "var(--gold-primary)" }} />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="faq-answer">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
