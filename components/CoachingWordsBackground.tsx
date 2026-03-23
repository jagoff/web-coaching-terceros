'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const coachingWords = [
  'PROPÓSITO',
  'TRANSFORMACIÓN',
  'AUTONOMÍA',
  'CONFIANZA',
  'ESCALABILIDAD',
  'LIDERAZGO',
  'CLARIDAD',
  'FOCO',
  'IMPACTO',
  'LEGADO',
  'VISIÓN',
  'EQUILIBRIO',
  'CONEXIÓN',
  'CRECIMIENTO',
  'RESILIENCIA',
  'AUTENTICIDAD',
  'FLUJO',
  'MAESTRÍA',
  'INNOVACIÓN',
  'SINERGIA',
  'TRASCENDENCIA',
  'EVOLUCIÓN',
  'CONCIENCIA',
  'PODER',
]

interface FloatingWord {
  id: number
  text: string
  x: number
  y: number
  fontSize: number
  opacity: number
  duration: number
  delay: number
}

export default function CoachingWordsBackground() {
  const [words, setWords] = useState<FloatingWord[]>([])
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    // Generar palabras flotantes con posiciones aleatorias
    const generateWords = () => {
      const newWords: FloatingWord[] = []
      const wordCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 12 : 20

      for (let i = 0; i < wordCount; i++) {
        newWords.push({
          id: i,
          text: coachingWords[Math.floor(Math.random() * coachingWords.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          fontSize: Math.random() * 1.5 + 0.8, // 0.8rem a 2.3rem
          opacity: Math.random() * 0.15 + 0.05, // 0.05 a 0.20
          duration: Math.random() * 20 + 15, // 15s a 35s
          delay: Math.random() * 10, // 0s a 10s
        })
      }
      return newWords
    }

    setWords(generateWords())
  }, [])

  if (!mounted) return null

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    >
      <AnimatePresence>
        {words.map(word => (
          <motion.div
            key={word.id}
            className="absolute font-bold tracking-wider"
            style={{
              left: `${word.x}%`,
              top: `${word.y}%`,
              fontSize: `${word.fontSize}rem`,
              opacity: word.opacity,
              backgroundImage: `linear-gradient(135deg, 
                rgba(255, 107, 53, ${word.opacity}) 0%, 
                rgba(200, 123, 90, ${word.opacity * 0.8}) 50%,
                rgba(255, 133, 85, ${word.opacity}) 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: `blur(${0.5 + word.opacity * 2}px)`,
              transform: 'translate(-50%, -50%)',
              whiteSpace: 'nowrap',
            }}
            initial={{
              opacity: 0,
              scale: 0.8,
              filter: 'blur(8px)',
              y: 20,
            }}
            animate={{
              opacity: [0, word.opacity, word.opacity * 0.3, word.opacity, word.opacity * 0.5, 0],
              scale: [0.8, 1, 1.1, 1, 0.9, 0.8],
              filter: [
                'blur(8px)',
                `blur(${0.5 + word.opacity * 2}px)`,
                'blur(1px)',
                `blur(${0.5 + word.opacity * 2}px)`,
                'blur(2px)',
                'blur(8px)',
              ],
              y: [20, 0, -10, 5, -5, 20],
              x: [0, Math.sin(word.id) * 10, Math.cos(word.id) * 15, Math.sin(word.id) * 8, 0],
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              filter: 'blur(8px)',
              y: 20,
            }}
            transition={{
              duration: word.duration,
              delay: word.delay,
              repeat: Infinity,
              repeatType: 'loop',
              ease: [0.22, 1, 0.36, 1],
              times: [0, 0.1, 0.3, 0.5, 0.7, 1],
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
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
