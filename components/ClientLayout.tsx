'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Import dynamic components directly in ClientLayout to avoid module conflicts
const DynamicNavbar = dynamic(() => import('@/components/Navbar'), { ssr: false })
const AmbientParticles = dynamic(() => import('@/components/AmbientParticles'), { ssr: false })
const CursorGlow = dynamic(() => import('@/components/CursorGlow'), { ssr: false })
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false })

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient && <AmbientParticles />}
      <div className="noise-overlay" aria-hidden="true" />
      {isClient && <CursorGlow />}

      <DynamicNavbar />
      {isClient && <WhatsAppButton />}
      {children}
    </>
  )
}
