"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function ElegantScrollEngagement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Transformaciones muy sutiles
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  
  // Spring animation para naturalidad
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 20 });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Background sutil */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-50/5 to-blue-50/5"
        style={{ opacity }}
      />
      
      {/* Content principal */}
      <motion.div
        className="container mx-auto px-8 text-center relative z-10"
        style={{ y: smoothY, scale: smoothScale }}
      >
        {/* Título con fade sutil */}
        <motion.h2
          className="text-5xl md:text-7xl font-light mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <span className="bg-gradient-to-r from-purple-200/80 to-blue-200/80 bg-clip-text text-transparent">
            Experiencia
          </span>
          <br />
          <span className="text-gray-100/90 text-4xl md:text-6xl font-light">
            que transforma
          </span>
        </motion.h2>
        
        {/* Subtítulo con delay sutil */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300/70 mb-16 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          Más de dos décadas transformando líderes y organizaciones a través de metodologías ágiles y un enfoque human-centric
        </motion.p>

        {/* Stats con animación ultra sutil */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-24">
          <ElegantStat number={20} label="Años de experiencia" />
          <ElegantStat number={150} label="Líderes formados" suffix="+" />
          <ElegantStat number={98} label="Satisfacción" suffix="%" />
        </div>
      </motion.div>

      {/* Scroll indicator muy sutil */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-purple-400/30 to-transparent" />
      </motion.div>
    </section>
  );
}

function ElegantStat({ number, label, suffix = "" }: { number: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000; // 2 segundos para animación suave
    const steps = 60;
    const increment = number / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        setCount(number);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [isVisible, number]);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0
      }}
      onViewportEnter={() => setIsVisible(true)}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative">
        {/* Número con cambio sutil de color */}
        <motion.div
          className="text-5xl md:text-6xl font-light text-gray-100/90"
          animate={{ 
            color: isVisible ? "#a78bfa" : "#9ca3af"
          }}
          transition={{ duration: 3, ease: "easeInOut" }}
        >
          {count}{suffix}
        </motion.div>
        
        {/* Línea decorativa sutil */}
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        />
      </div>
      
      <p className="text-gray-400/70 mt-6 text-sm tracking-wide">{label}</p>
    </motion.div>
  );
}
