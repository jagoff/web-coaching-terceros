'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function WhatsAppBooking() {
  const { t } = useLanguage()
  const [showBadge, setShowBadge] = useState(true)

  const phoneNumber = '5493425153999'
  const message = encodeURIComponent(t.whatsapp.message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.ariaLabel}
      className="whatsapp-fab flex items-center justify-center text-white shadow-lg transition-all hover:scale-110 relative"
      style={{ backgroundColor: '#25D366', width: '64px', height: '64px' }}
    >
      <MessageCircle size={24} />
      
      {/* Notification badge */}
      <AnimatePresence>
        {showBadge && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="whatsapp-badge"
          >
            1
          </motion.span>
        )}
      </AnimatePresence>
    </a>
  )
}
