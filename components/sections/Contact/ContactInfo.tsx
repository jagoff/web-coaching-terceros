"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  Zap,
  CheckCircle2
} from "lucide-react";
import { slideLeft } from "./animations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactInfo() {
  const { language } = useLanguage();

  const benefits = [
    {
      icon: Sparkles,
      title: language === 'es' ? 'Sesión Gratuita' : 'Free Session',
      description: language === 'es' 
        ? 'Primera sesión sin compromiso para conocernos'
        : 'First session with no commitment to get to know each other',
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: Target,
      title: language === 'es' ? 'Enfoque Personalizado' : 'Personalized Approach',
      description: language === 'es'
        ? 'Soluciones adaptadas a tu contexto y desafíos'
        : 'Solutions tailored to your context and challenges',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: language === 'es' ? 'Resultados Rápidos' : 'Fast Results',
      description: language === 'es'
        ? 'Métodos validados por Scrum.org que funcionan'
        : 'Scrum.org validated methods that work',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  const guarantees = [
    language === 'es' ? 'Respuesta en menos de 24hs' : 'Response in less than 24h',
    language === 'es' ? '100% confidencial' : '100% confidential',
    language === 'es' ? 'Sin compromiso' : 'No commitment'
  ];

  return (
    <motion.div
      variants={slideLeft}
      className="space-y-8"
    >
      {/* Headline */}
      <div>
        <h3 
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {language === 'es' 
            ? '¿Por qué dar el primer paso hoy?'
            : 'Why take the first step today?'
          }
        </h3>
        <p className="text-base" style={{ color: "var(--text-secondary)" }}>
          {language === 'es' 
            ? 'Cada gran transformación comienza con una conversación.'
            : 'Every great transformation begins with a conversation.'
          }
        </p>
      </div>

      {/* Benefits Cards */}
      <div className="space-y-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
              }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              {/* Gradient overlay on hover */}
              <div 
                className={`absolute inset-0 bg-gradient-to-r ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              
              <div className="relative flex gap-4">
                {/* Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${benefit.color} p-2.5 flex items-center justify-center`}>
                  <Icon className="w-full h-full text-white" strokeWidth={2} />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h4 className="font-semibold mb-1 text-base">
                    {benefit.title}
                  </h4>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Guarantees */}
      <div className="space-y-2">
        {guarantees.map((guarantee, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            className="flex items-center gap-2 text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
            {guarantee}
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="pt-4">
        <motion.a
          href="https://wa.me/5493425153999?text=Hola%20Fernando%2C%20vi%20tu%20web%20y%20quiero%20agendar%20una%20sesi%C3%B3n%20gratuita."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2 group w-full justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
          {language === 'es' ? 'Agendar Sesión Gratuita' : 'Book Free Session'}
          <ArrowRight 
            size={18} 
            className="group-hover:translate-x-1 transition-transform" 
          />
        </motion.a>
      </div>
    </motion.div>
  );
}
