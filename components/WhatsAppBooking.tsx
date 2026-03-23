'use client'

import { MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function WhatsAppBooking() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const phoneNumber = '5493425153999'

  const message = encodeURIComponent(
    'Hola! Quiero agendá una sesión gratuita de consultoría. ¿Qué fechas y horarios tienes disponibles? Transformá tus credenciales profesionales en activos digitales inmutables.'
  )

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  if (!isClient) {
    return null
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-full shadow-lg transition-all hover:scale-105"
      style={{
        backgroundColor: '#25D366',
        color: 'white',
        fontWeight: '600',
        fontSize: '16px',
      }}
    >
      <MessageCircle size={24} />
      <span className="hidden sm:inline">Agendá por WhatsApp</span>
    </a>
  )
}
