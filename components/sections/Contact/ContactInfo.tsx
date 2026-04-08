'use client'

import { motion } from 'framer-motion'
import { Sparkles, Target, Zap, ArrowRight, Star, Shield, Clock, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactInfo() {
  const { language } = useLanguage()

  const benefits = [
    {
      icon: Sparkles,
      title: language === 'es' ? 'Sesión Gratuita' : 'Free Session',
      description:
        language === 'es'
          ? 'Primera sesión sin compromiso para conocernos'
          : 'First session without commitment to get to know each other',
      gradient: 'from-violet-500 via-purple-500 to-indigo-600',
      bgGradient: 'from-violet-500/10 to-purple-500/5',
    },
    {
      icon: Target,
      title: language === 'es' ? 'Enfoque Personalizado' : 'Personalized Approach',
      description:
        language === 'es'
          ? 'Soluciones adaptadas a tu contexto y desafíos'
          : 'Solutions adapted to your context and challenges',
      gradient: 'from-blue-500 via-cyan-500 to-teal-600',
      bgGradient: 'from-blue-500/10 to-cyan-500/5',
    },
    {
      icon: Zap,
      title: language === 'es' ? 'Resultados Rápidos' : 'Fast Results',
      description:
        language === 'es'
          ? 'Métodos validados por Scrum.org que funcionan'
          : 'Scrum.org validated methods that work',
      gradient: 'from-amber-500 via-orange-500 to-red-600',
      bgGradient: 'from-amber-500/10 to-orange-500/5',
    },
  ]

  const guarantees = [
    {
      icon: Clock,
      text: language === 'es' ? 'Respuesta en menos de 24hs' : 'Response in less than 24h',
    },
    { icon: Shield, text: language === 'es' ? '100% confidencial' : '100% confidential' },
    { icon: Star, text: language === 'es' ? 'Sin compromiso' : 'No commitment' },
  ]

  return (
    <div className="relative min-h-screen">
      {/* Modern geometric background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-violet-500/20 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-gradient-to-br from-amber-500/20 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-500" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(124,107,196,0.1)' stroke-width='1'%3E%3Cpath d='M0 30h60M30 0v60M15 0l30 60M45 0L15 60M0 15l60 30M0 45l60-30'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        {/* Modern Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-20"
        >
          {/* Modern badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/10 border border-violet-500/30 backdrop-blur-sm mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="h-5 w-5 text-violet-400" />
            </motion.div>
            <span className="text-sm font-medium text-violet-300 tracking-wide uppercase">
              {language === 'es' ? 'Transformación Garantizada' : 'Guaranteed Transformation'}
            </span>
          </motion.div>

          {/* Modern typography with proper spacing */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-6xl md:text-8xl font-black mb-12 leading-tight tracking-tight"
            style={{ textShadow: '0 0 40px rgba(124, 107, 196, 0.8)' }}
          >
            <span className="block bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              {language === 'es' ? '¿Por qué dar' : 'Why take'}
            </span>
            <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              {language === 'es' ? 'el primer paso' : 'the first step'}
            </span>
            <span className="block bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              {language === 'es' ? 'hoy?' : 'today?'}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12 font-light"
          >
            {language === 'es'
              ? 'Cada gran transformación comienza con una conversación. Descubre cómo el coaching ágil puede revolucionar tu equipo y tu carrera.'
              : 'Every great transformation begins with a conversation. Discover how agile coaching can revolutionize your team and career.'}
          </motion.p>
        </motion.div>

        {/* Modern Benefit Cards with geometric design */}
        <div className="space-y-8 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.8 }}
              className="group"
            >
              {/* Modern card with geometric elements */}
              <div
                className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${benefit.bgGradient} p-10 backdrop-blur-xl transition-all duration-700 hover:border-white/30 hover:shadow-2xl`}
              >
                {/* Geometric background pattern */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 transition-opacity duration-700 group-hover:opacity-10`}
                />

                {/* Geometric shapes */}
                <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/10 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border border-white/10 rounded-full group-hover:scale-150 transition-transform duration-700" />

                {/* Modern content layout */}
                <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
                  {/* Icon with modern design */}
                  <div className="md:col-span-3">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${benefit.gradient} p-4 shadow-2xl mx-auto md:mx-0`}
                    >
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-50" />
                      <benefit.icon className="h-12 w-12 text-white relative z-10 mx-auto" />
                    </motion.div>
                  </div>

                  {/* Content with modern typography */}
                  <div className="md:col-span-9 text-center md:text-left">
                    <h4 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                      {benefit.title}
                    </h4>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6 font-light">
                      {benefit.description}
                    </p>

                    {/* Modern progress indicator */}
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-1 w-20 bg-gradient-to-r ${benefit.gradient} rounded-full`}
                      />
                      <span className="text-sm text-gray-400 uppercase tracking-widest font-medium">
                        {language === 'es' ? 'Beneficio Clave' : 'Key Benefit'}
                      </span>
                      <ChevronRight
                        className={`h-5 w-5 text-${benefit.gradient.split(' ')[0].split('-')[1]}-400 group-hover:translate-x-2 transition-transform duration-300`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modern Guarantees Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mb-20"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/5 rounded-3xl blur-2xl" />
            <div className="relative glass-card p-10 border border-white/10 rounded-3xl">
              <h4 className="text-3xl font-bold text-white mb-8 text-center tracking-tight">
                {language === 'es' ? 'Garantías Exclusivas' : 'Exclusive Guarantees'}
              </h4>
              <div className="grid md:grid-cols-3 gap-6">
                {guarantees.map((guarantee, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
                    className="group"
                  >
                    <div className="flex items-center space-x-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="flex-shrink-0 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-3 shadow-xl"
                      >
                        <guarantee.icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <span className="text-gray-200 font-medium text-lg">{guarantee.text}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ultra-Modern CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="text-center"
        >
          <motion.button
            className="group relative inline-flex items-center justify-center px-12 py-6 rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 font-bold text-white text-xl shadow-2xl transition-all duration-700 hover:shadow-violet-500/30 hover:shadow-3xl border border-white/20 overflow-hidden"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const contactForm = document.querySelector(
                '#contacto form, [data-testid="contact-form"], .contact-form'
              )
              if (contactForm) {
                contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' })
              } else {
                // Si no hay formulario, navegar a página de contacto
                window.location.href = '/#contacto'
              }
            }}
          >
            {/* Modern button effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 opacity-50" />

            {/* Geometric button decoration */}
            <div className="absolute top-2 left-2 w-4 h-4 bg-white/30 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute bottom-2 right-2 w-3 h-3 bg-white/20 rounded-full group-hover:scale-200 transition-transform duration-700" />

            {/* Button content with modern spacing */}
            <div className="relative z-10 flex items-center justify-center space-x-6">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="h-7 w-7 text-yellow-300 drop-shadow-lg" />
              </motion.div>
              <span className="font-bold tracking-wide text-xl">
                {language === 'es' ? 'Agendar Sesión Gratuita' : 'Book Free Session'}
              </span>
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <ArrowRight className="h-7 w-7 text-white drop-shadow-lg" />
              </motion.div>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
