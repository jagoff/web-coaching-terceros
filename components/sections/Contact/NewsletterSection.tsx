'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle2, TrendingUp, Target, Zap } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function NewsletterSection() {
  const { language, t } = useLanguage()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const benefits = [
    {
      icon: TrendingUp,
      text:
        t.newsletter?.benefits?.[0] ||
        (language === 'es'
          ? 'Tips prácticos de leadership moderno'
          : 'Practical tips for modern leadership'),
    },
    {
      icon: Target,
      text:
        t.newsletter?.benefits?.[1] ||
        (language === 'es'
          ? 'Recursos ágiles para implementar ya'
          : 'Agile resources to implement now'),
    },
    {
      icon: Zap,
      text:
        t.newsletter?.benefits?.[2] ||
        (language === 'es' ? 'Noticias y tendencias del mundo tech' : 'Tech world news and trends'),
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    // Simulate API call - replace with actual newsletter service
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubscribed(true)
    setIsSubmitting(false)
    setEmail('')
  }

  if (isSubscribed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8 text-center"
      >
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">
          {language === 'es' ? '¡Gracias por suscribirte!' : 'Thanks for subscribing!'}
        </h3>
        <p className="text-gray-300">
          {language === 'es'
            ? 'Revisá tu email para confirmar la suscripción.'
            : 'Check your email to confirm the subscription.'}
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-2xl p-8 mb-8"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center">
            <Mail className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {t.newsletter?.title || (language === 'es' ? 'Newsletter Mensual' : 'Monthly Newsletter')}
        </h3>
        <p className="text-gray-300 text-sm">
          {t.newsletter?.subtitle ||
            (language === 'es'
              ? 'Leadership, recursos ágiles y noticias directamente en tu inbox'
              : 'Leadership, agile resources and news directly in your inbox')}
        </p>
      </div>

      {/* Benefits */}
      <div className="space-y-3 mb-6">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-violet-400" />
              </div>
              <span className="text-gray-300 text-sm">{benefit.text}</span>
            </motion.div>
          )
        })}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={
              t.newsletter?.emailPlaceholder ||
              (language === 'es' ? 'Tu email profesional' : 'Your professional email')
            }
            className="w-full px-4 py-3 bg-black/30 border border-violet-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !email}
          className="w-full px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-lg hover:from-violet-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              {language === 'es' ? 'Suscribiendo...' : 'Subscribing...'}
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {t.newsletter?.subscribeButton ||
                (language === 'es' ? 'Suscribirme Gratis' : 'Subscribe Free')}
            </>
          )}
        </button>
      </form>

      {/* Note */}
      <p className="text-xs text-gray-400 text-center mt-4">
        {t.newsletter?.note ||
          (language === 'es'
            ? 'Sin spam. Un email mensual con valor real.'
            : 'No spam. One monthly email with real value.')}
      </p>
    </motion.div>
  )
}
