"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
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

export default function ForWho() {
  const { language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const situations = [
    {
      id: "nuevo-lider",
      title: language === 'es' ? "Nuevo en el rol de liderazgo" : "New to leadership",
      description: language === 'es' 
        ? "Pasaste de escribir código a liderar personas y nadie te enseñó cómo. Técnicamente sos muy bueno, pero la parte humana y organizacional todavía te pesa."
        : "You went from writing code to leading people, and nobody taught you how. You're technically great, but the human and organizational side still weighs you down."
    },
    {
      id: "crece-empresa",
      title: language === 'es' ? "Tu empresa crece, los procesos no acompañan" : "Your company grows, processes don't keep up",
      description: language === 'es'
        ? "Lo que funcionaba con 5 personas ya no alcanza con 20. El equipo se descoordina, las prioridades se chocan y la velocidad que tenías antes se perdió."
        : "What worked with 5 people no longer works with 20. The team gets uncoordinated, priorities clash, and the speed you had before is lost."
    },
    {
      id: "equipo-resultados",
      title: language === 'es' ? "Tenés el equipo pero no los resultados" : "You have the team but not the results",
      description: language === 'es'
        ? "Hay talento, pero no entrega. Aparecen silos, falta de ownership y decisiones que nadie toma. Sabés que el problema no es técnico - y eso lo hace más difícil de resolver."
        : "There's talent, but it doesn't deliver. Silos appear, there's lack of ownership, and decisions nobody makes. You know the problem isn't technical - and that makes it harder to solve."
    }
  ];

  return (
    <section id="para-quienes" className="section" ref={ref}>
      <div className="container">
        {/* Section header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14 md:mb-24"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">
              {language === 'es' ? '¿TE ENCONTRÁS EN ALGUNA DE ESTAS SITUACIONES?' : 'DO YOU FIND YOURSELF IN ANY OF THESE SITUATIONS?'}
            </span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {language === 'es' 
              ? 'Acompaño a líderes tech y founders que están en momentos clave. Si alguna de estas situaciones te resuena, podemos trabajar juntos.'
              : 'I accompany tech leaders and founders who are at key moments. If any of these situations resonates with you, we can work together.'
            }
          </motion.h2>
          <motion.div
            variants={dividerGrow}
            className="divider-gold mt-6"
          />
        </motion.div>

        {/* Situation cards */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
          {situations.map((situation, i) => (
            <motion.div
              key={situation.id}
              custom={i}
              variants={cardReveal}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="glass-card p-8 rounded-2xl h-full"
              style={{
                background: "rgba(20, 18, 29, 0.8)",
                backdropFilter: "blur(20px) saturate(1.5)",
                WebkitBackdropFilter: "blur(20px) saturate(1.5)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <h3 
                className="text-xl font-bold mb-4 text-gradient"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {situation.title}
              </h3>
              <p 
                className="text-base leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {situation.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
