"use client";

import { motion } from "framer-motion";
import { Sparkles, Target, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { blurUp } from "@/lib/animations";

export default function ContactInfo() {
  const { t, language } = useLanguage();

  const benefits = [
    {
      icon: Sparkles,
      title: language === 'es' ? 'Sesión Gratuita' : 'Free Session',
      description: language === 'es' 
        ? 'Primera sesión sin compromiso para conocernos' 
        : 'First session without commitment to get to know each other',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      icon: Target,
      title: language === 'es' ? 'Enfoque Personalizado' : 'Personalized Approach',
      description: language === 'es'
        ? 'Soluciones adaptadas a tu contexto y desafíos'
        : 'Solutions adapted to your context and challenges',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Zap,
      title: language === 'es' ? 'Resultados Rápidos' : 'Fast Results',
      description: language === 'es'
        ? 'Métodos validados por Scrum.org que funcionan'
        : 'Scrum.org validated methods that work',
      gradient: 'from-amber-500 to-orange-600'
    }
  ];

  const guarantees = [
    language === 'es' ? 'Respuesta en menos de 24hs' : 'Response in less than 24h',
    language === 'es' ? '100% confidencial' : '100% confidential',
    language === 'es' ? 'Sin compromiso' : 'No commitment'
  ];

  return (
    <div className="space-y-8">
      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center lg:text-left"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {language === 'es' ? '¿Por qué dar el primer paso hoy?' : 'Why take the first step today?'}
        </h3>
        <p className="text-gray-300 text-lg">
          {language === 'es' 
            ? 'Cada gran transformación comienza con una conversación' 
            : 'Every great transformation begins with a conversation'}
        </p>
      </motion.div>

      {/* Benefit Cards */}
      <div className="space-y-4">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            variants={blurUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-2xl"
            whileHover={{ scale: 1.02, y: -2 }}
          >
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />
            
            <div className="relative z-10 flex items-start space-x-4">
              {/* Icon container */}
              <div className={`flex-shrink-0 rounded-xl bg-gradient-to-br ${benefit.gradient} p-3 shadow-lg`}>
                <benefit.icon className="h-6 w-6 text-white" />
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-white mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Guarantees */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        {guarantees.map((guarantee, index) => (
          <div key={index} className="flex items-center space-x-3">
            <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
            <span className="text-gray-300">{guarantee}</span>
          </div>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="pt-4"
      >
        <motion.button
          className="group relative w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-violet-500/25 hover:shadow-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center justify-center space-x-3">
            <motion.span
              animate={{ rotate: [0, 12, -12, 0] }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Sparkles className="h-5 w-5" />
            </motion.span>
            <span>
              {language === 'es' ? 'Agendar Sesión Gratuita' : 'Book Free Session'}
            </span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.span>
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
