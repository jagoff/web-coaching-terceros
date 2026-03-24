'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Calendar, X, ArrowRight } from 'lucide-react'
import { useUserProfileAI } from '@/hooks/useUserProfileAI'

interface ProactiveCTAProps {
  trigger: 'exit_intent' | 'scroll_depth' | 'time_based' | 'interaction_pattern'
}

export default function ProactiveCTA({ trigger }: ProactiveCTAProps) {
  const { profile, trackInteraction } = useUserProfileAI()
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    if (hasShown || !profile) return

    const showCTA = () => {
      if (!hasShown && profile.confidence > 0.7) {
        setIsVisible(true)
        setHasShown(true)
        trackInteraction('contactAttempts')
      }
    }

    switch (trigger) {
      case 'exit_intent':
        const handleExitIntent = (e: MouseEvent) => {
          if (e.clientY <= 0) {
            showCTA()
          }
        }
        document.addEventListener('mouseleave', handleExitIntent)
        return () => document.removeEventListener('mouseleave', handleExitIntent)

      case 'scroll_depth':
        const handleScroll = () => {
          const scrollDepth = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
          if (scrollDepth > 70) {
            showCTA()
          }
        }
        window.addEventListener('scroll', handleScroll, { once: true })
        return () => window.removeEventListener('scroll', handleScroll)

      case 'time_based':
        const timer = setTimeout(showCTA, 45000) // 45 seconds
        return () => clearTimeout(timer)

      case 'interaction_pattern':
        // Show after multiple interactions
        const interactionTimer = setTimeout(() => {
          showCTA()
        }, 30000)
        return () => clearTimeout(interactionTimer)
    }
  }, [trigger, profile, hasShown, trackInteraction])

  const getCTAContent = () => {
    if (!profile) return null

    switch (profile.persona) {
      case 'founder':
        return {
          title: "¿5 min para llamarte mañana?",
          subtitle: "Hablemos de tu escala. Sin compromisos, solo soluciones reales.",
          icon: Phone,
          primaryAction: "Agendar llamada 5 min",
          secondaryAction: "Ver casos similares",
          timeSlots: ["9am", "11am", "2pm"]
        }
      
      case 'ceo':
        return {
          title: "Sesión estratégica gratuita",
          subtitle: "Diagnóstico de liderazgo y roadmap de crecimiento personalizado.",
          icon: Calendar,
          primaryAction: "Agendar diagnóstico",
          secondaryAction: "Ver metodología",
          timeSlots: ["Esta semana", "Próxima semana"]
        }
      
      case 'tech_lead':
        return {
          title: "Optimiza tu proceso agile",
          subtitle: "Revisión gratuita de tu actual implementación y recomendaciones prácticas.",
          icon: ArrowRight,
          primaryAction: "Solicitar revisión",
          secondaryAction: "Ver framework",
          timeSlots: []
        }
      
      default:
        return {
          title: "¿Necesitas ayuda para decidir?",
          subtitle: "Hablemos de tus desafíos específicos y encontramos la solución ideal.",
          icon: Phone,
          primaryAction: "Iniciar conversación",
          secondaryAction: "Explorar servicios",
          timeSlots: []
        }
    }
  }

  const content = getCTAContent()

  if (!content || !isVisible) return null

  const handlePrimaryAction = () => {
    if (profile?.persona === 'founder' && content.timeSlots.length > 0) {
      // Handle time slot selection
      console.log('Show time slots:', content.timeSlots)
    } else {
      // Navigate to contact
      window.location.href = '#contact'
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="fixed bottom-4 right-4 left-4 md:left-auto md:w-96 bg-gradient-to-br from-purple-900 to-blue-900 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-purple-500/20 z-50"
      >
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X size={16} className="text-white" />
        </button>

        {/* Content */}
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-purple-600 to-blue-600">
            <content.icon size={20} className="text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">
              {content.title}
            </h3>
            
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {content.subtitle}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2">
              <motion.button
                onClick={handlePrimaryAction}
                className="flex-1 px-4 py-2 bg-white text-purple-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {content.primaryAction}
              </motion.button>
              
              <motion.button
                onClick={() => window.location.href = '#services'}
                className="flex-1 px-4 py-2 border border-purple-400 text-purple-300 font-semibold rounded-lg hover:bg-purple-400/10 transition-colors text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {content.secondaryAction}
              </motion.button>
            </div>

            {/* Trust indicator */}
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Respuesta en menos de 24h</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
