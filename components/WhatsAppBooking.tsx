'use client'

import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function WhatsAppBooking() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Don't render on server
  }

  const phoneNumber = '5493425153999'
  const message = encodeURIComponent('Hola! Quiero agendá una sesión gratuita de consultoría.')
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-full shadow-lg transition-all hover:scale-105 whatsapp-button"
    >
      <MessageCircle size={24} />
      <span className="hidden sm:inline">Agendá por WhatsApp</span>
    </a>
  )
}
