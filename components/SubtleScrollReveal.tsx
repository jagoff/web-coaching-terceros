"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SubtleScrollReveal() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transformaciones extremadamente sutiles
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

  return (
    <section ref={ref} className="relative py-32">
      {/* Gradiente background extremadamente sutil */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50"
        style={{ opacity }}
      />
      
      {/* Contenido con animación delicada */}
      <motion.div
        className="container mx-auto px-8 text-center relative z-10"
        style={{ opacity, y, scale }}
      >
        {/* Título serif elegante */}
        <motion.h2
          className="text-6xl md:text-8xl font-extralight mb-12 tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <span className="text-gray-100/80">
            Transformación
          </span>
          <br />
          <span className="text-4xl md:text-5xl font-light text-gray-300/60 italic">
            a través del método
          </span>
        </motion.h2>
        
        {/* Línea divisora elegante */}
        <motion.div
          className="w-32 h-px bg-gradient-to-r from-transparent via-gray-400/30 to-transparent mx-auto mb-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        />
        
        {/* Descripción con tipografía elegante */}
        <motion.p
          className="text-xl md:text-2xl text-gray-400/50 max-w-2xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
        >
          Un enfoque human-centric que combina metodologías ágiles 
          con liderazgo estratégico para generar resultados sostenibles
        </motion.p>

        {/* Cards con hover sutil */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24">
          <SubtleCard 
            title="Diagnóstico" 
            description="Análisis profundo de tu realidad actual"
            delay={0.2}
          />
          <SubtleCard 
            title="Diseño" 
            description="Co-creación de hoja de ruta personalizada"
            delay={0.4}
          />
          <SubtleCard 
            title="Ejecución" 
            description="Acompañamiento continuo y ajustes finos"
            delay={0.6}
          />
        </div>
      </motion.div>
    </section>
  );
}

function SubtleCard({ title, description, delay }: { title: string; description: string; delay: number }) {
  return (
    <motion.div
      className="text-center group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
    >
      {/* Número romano sutil */}
      <motion.div
        className="text-3xl md:text-4xl font-light text-gray-500/40 mb-6"
        whileHover={{ color: "#a78bfa" }}
        transition={{ duration: 0.8 }}
      >
        {title === "Diagnóstico" ? "I" : title === "Diseño" ? "II" : "III"}
      </motion.div>
      
      {/* Título */}
      <h3 
        className="text-xl md:text-2xl font-light mb-4"
        style={{
          background: "linear-gradient(135deg, #FF6B35 0%, #C87B5A 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}
      >
        {title}
      </h3>
      
      {/* Descripción */}
      <p className="text-gray-400/50 leading-relaxed">
        {description}
      </p>
      
      {/* Línea decorativa que aparece en hover */}
      <motion.div
        className="mt-6 h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}
