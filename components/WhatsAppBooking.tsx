'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function WhatsAppBooking() {
  const { t } = useLanguage()
  const [showBadge] = useState(true)

  const phoneNumber = '5493425153999'
  const message = encodeURIComponent(t.whatsapp.message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.ariaLabel}
      className="whatsapp-fab flex items-center justify-center text-white shadow-lg relative"
      style={{ backgroundColor: '#25D366', width: '64px', height: '64px' }}
      whileHover={{
        scale: 1.1,
        boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4), 0 4px 10px rgba(0, 0, 0, 0.3)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut',
        }}
      >
        <MessageCircle size={24} />
      </motion.div>

      {/* Notification badge */}
      <AnimatePresence>
        {showBadge && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
            exit={{
              scale: 0,
              opacity: 0,
              transition: { duration: 0.2 },
            }}
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
    </motion.a>
  )
}
