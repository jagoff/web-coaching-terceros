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
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#FF3B30',
              color: '#fff',
              fontSize: '11px',
              fontWeight: '700',
              lineHeight: '1',
              boxShadow: '0 2px 8px rgba(255, 59, 48, 0.4)',
              border: '2px solid #25D366',
              zIndex: 10,
            }}
          >
            1
          </motion.span>
        )}
      </AnimatePresence>
    </a>
  )
}
