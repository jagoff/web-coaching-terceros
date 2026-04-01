"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const coachingWords = [
  "PROPÓSITO", "TRANSFORMACIÓN", "AUTONOMÍA", "CONFIANZA", "ESCALABILIDAD",
  "LIDERAZGO", "CLARIDAD", "FOCO", "IMPACTO", "LEGADO", "VISIÓN", "EQUILIBRIO",
  "CONEXIÓN", "CRECIMIENTO", "RESILIENCIA", "AUTENTICIDAD", "FLUJO", "MAESTRÍA",
  "INNOVACIÓN", "SINERGIA", "TRASCENDENCIA", "EVOLUCIÓN", "CONCIENCIA", "PODER"
];

interface FloatingWord {
  id: number;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  opacity: number;
  duration: number;
  delay: number;
}

export default function CoachingWordsBackground() {
  const [words, setWords] = useState<FloatingWord[]>([]);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // Generar palabras flotantes con posiciones aleatorias deterministas
    const generateWords = () => {
      const newWords: FloatingWord[] = [];
      const wordCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 4 : 8; // Reduced from 12/20 to 4/8
      
      // Deterministic random function to avoid hydration mismatches
      const deterministicRandom = (seed: number) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
      };
      
      for (let i = 0; i < wordCount; i++) {
        newWords.push({
          id: i,
          text: coachingWords[Math.floor(deterministicRandom(i) * coachingWords.length)],
          x: deterministicRandom(i + 100) * 100,
          y: deterministicRandom(i + 200) * 100,
          fontSize: deterministicRandom(i + 300) * 1.5 + 0.8, // 0.8rem a 2.3rem
          opacity: deterministicRandom(i + 400) * 0.15 + 0.05, // 0.05 a 0.20
          duration: deterministicRandom(i + 500) * 20 + 15, // 15s a 35s
          delay: deterministicRandom(i + 600) * 10, // 0s a 10s
        });
      }
      return newWords;
    };

    setWords(generateWords());
  }, []);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    >
      <AnimatePresence>
        {words.map((word) => (
          <motion.div
            key={word.id}
            className="absolute font-bold tracking-wider"
            style={{
              left: `${word.x}%`,
              top: `${word.y}%`,
              fontSize: `${word.fontSize}rem`,
              opacity: word.opacity,
              backgroundImage: `linear-gradient(135deg, 
                rgba(124, 107, 196, ${word.opacity}) 0%, 
                rgba(201, 123, 90, ${word.opacity * 0.8}) 50%,
                rgba(124, 107, 196, ${word.opacity}) 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: `blur(${0.5 + word.opacity * 2}px)`,
              transform: "translate(-50%, -50%)",
              whiteSpace: "nowrap",
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.8,
              filter: "blur(8px)",
              y: 20
            }}
            animate={{
              opacity: [0, word.opacity, 0],
              scale: [0.9, 1, 0.9],
              y: [10, 0, 10],
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8,
              filter: "blur(8px)",
              y: 20
            }}
            transition={{
              duration: word.duration,
              delay: word.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {word.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Capa de efecto ondulante adicional */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(124, 107, 196, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(201, 123, 90, 0.02) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(124, 107, 196, 0.01) 0%, transparent 70%)
          `,
        }}
        animate={{
          background: [
            `
              radial-gradient(ellipse at 20% 30%, rgba(124, 107, 196, 0.03) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, rgba(201, 123, 90, 0.02) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(124, 107, 196, 0.01) 0%, transparent 70%)
            `,
            `
              radial-gradient(ellipse at 70% 40%, rgba(124, 107, 196, 0.04) 0%, transparent 50%),
              radial-gradient(ellipse at 30% 80%, rgba(201, 123, 90, 0.03) 0%, transparent 50%),
              radial-gradient(ellipse at 60% 20%, rgba(124, 107, 196, 0.02) 0%, transparent 70%)
            `,
            `
              radial-gradient(ellipse at 40% 60%, rgba(124, 107, 196, 0.03) 0%, transparent 50%),
              radial-gradient(ellipse at 90% 30%, rgba(201, 123, 90, 0.02) 0%, transparent 50%),
              radial-gradient(ellipse at 20% 80%, rgba(124, 107, 196, 0.01) 0%, transparent 70%)
            `,
            `
              radial-gradient(ellipse at 20% 30%, rgba(124, 107, 196, 0.03) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, rgba(201, 123, 90, 0.02) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(124, 107, 196, 0.01) 0%, transparent 70%)
            `,
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
