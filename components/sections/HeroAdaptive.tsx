'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { useUserProfileAI } from '@/hooks/useUserProfileAI'
import { ArrowRight, Phone, Calendar } from 'lucide-react'

const adaptiveContent = {
  founder: {
    title: "¿Creciendo demasiado rápido?",
    subtitle: "El 73% de startups fracasan por escalar mal. Nosotros ayudamos a crecer sin romper todo.",
    cta: "¿5 min para llamarte mañana?",
    secondaryCTA: "Ver cómo funciona",
  },
  ceo: {
    title: "Escala tu equipo sin perder control",
    subtitle: "Liderazgo estratégico para empresas en crecimiento. Resultados medibles desde el primer mes.",
    cta: "Agenda sesión estratégica",
    secondaryCTA: "Ver casos de éxito",
  },
  tech_lead: {
    title: "Implementa agile que realmente funcione",
    subtitle: "Deja las reuniones inútiles. Equipos productivos con metodologías que entregan valor.",
    cta: "Optimiza tu proceso",
    secondaryCTA: "Ver framework",
  },
  manager: {
    title: "Transforma tu equipo en high-performers",
    subtitle: "Liderazgo práctico para gestionar talentos y multiplicar resultados sin burnout.",
    cta: "Potencia tu liderazgo",
    secondaryCTA: "Ver metodología",
  },
  individual: {
    title: "Transforma tu liderazgo",
    subtitle: "Coaching ejecutivo para líderes tech y startups. +20 años en tecnología, metodología ágil probada.",
    cta: "Agenda tu sesión gratuita",
    secondaryCTA: "Conocer más",
  },
}

const urgencyCTAs = {
  high: {
    text: "¿5 min para llamarte mañana?",
    icon: Phone,
    action: "call",
    timeSlots: ["9am", "11am", "2pm"] as string[]
  },
  medium: {
    text: "Agenda sesión diagnóstica",
    icon: Calendar,
    action: "schedule",
    timeSlots: ["Esta semana", "Próxima semana"] as string[]
  },
  low: {
    text: "Explora cómo funciona",
    icon: ArrowRight,
    action: "explore",
    timeSlots: [] as string[]
  }
}

export default function HeroAdaptive() {
  const { t } = useLanguage()
  const { profile, trackInteraction } = useUserProfileAI()
  const [content, setContent] = useState(adaptiveContent.individual)
  const [cta, setCta] = useState(urgencyCTAs.low)
  const [showTimeSlots, setShowTimeSlots] = useState(false)

  useEffect(() => {
    if (profile && profile.confidence > 0.7) {
      setContent(adaptiveContent[profile.persona])
      setCta(urgencyCTAs[profile.urgencyLevel])
    }
  }, [profile])

  const handleMainCTA = () => {
    trackInteraction('contactAttempts')
    
    if (cta.action === 'call' && profile?.urgencyLevel === 'high') {
      setShowTimeSlots(true)
    } else {
      // Navigate to regular booking
      window.location.href = '#contact'
    }
  }

  const handleTimeSlot = (time: string) => {
    // Here you would integrate with your booking system
    setShowTimeSlots(false)
  }

  if (!profile) {
    // Show default hero while AI analyzes
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 opacity-90" />
      
      <motion.div 
        className="relative z-10 text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-0 right-0 text-xs text-gray-400">
          {profile.persona} • {profile.urgencyLevel} • {Math.round(profile.confidence * 100)}%
        </div>

        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {content.title}
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {content.subtitle}
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {/* Main CTA */}
          <motion.button
            onClick={handleMainCTA}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 min-h-[48px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              <cta.icon size={20} />
              {cta.text}
            </span>
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            onClick={() => trackInteraction('servicesClicked')}
            className="px-8 py-4 border border-purple-400 text-purple-300 font-semibold rounded-full text-lg hover:bg-purple-400/10 transition-all duration-300 min-h-[48px]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {content.secondaryCTA}
          </motion.button>
        </motion.div>

        {/* Time slots modal for urgent calls */}
        {showTimeSlots && (
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg p-6 mt-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-white font-semibold mb-4">¿Cuándo te llamamos?</h3>
            <div className="flex gap-2 justify-center">
              {cta.timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSlot(time)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {time}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Trust indicators */}
        <motion.div 
          className="mt-12 flex justify-center gap-8 text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>+20 años experiencia</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>6+ años consultoría ágil</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Sesión gratuita</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
