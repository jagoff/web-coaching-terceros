'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function ScrollProgressStory() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50])

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"
        style={{ opacity }}
      />

      {/* Content */}
      <motion.div className="container mx-auto px-6 text-center relative z-10" style={{ scale, y }}>
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Transformación Digital
          </span>
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          De la tecnología a la consultoría estratégica
        </motion.p>

        {/* Animated Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <AnimatedNumber number={20} label="Años de Experiencia" />
          <AnimatedNumber number={100} label="Empresas Transformadas" suffix="+" />
          <AnimatedNumber number={95} label="Satisfacción" suffix="%" />
        </div>
      </motion.div>
    </section>
  )
}

function AnimatedNumber({
  number,
  label,
  suffix = '',
}: {
  number: number
  label: string
  suffix?: string
}) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1, type: 'spring' }}
      >
        {number}
        {suffix}
      </motion.div>
      <p className="text-gray-400 mt-2">{label}</p>
    </motion.div>
  )
}
