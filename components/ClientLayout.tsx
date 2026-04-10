'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const DynamicNavbar = dynamic(() => import('@/components/Navbar'), {
  loading: () => null, // Navbar is position:fixed — no skeleton needed
})

const CursorGlow = dynamic(() => import('@/components/CursorGlow'), {
  ssr: false,
  loading: () => null,
})

const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), {
  ssr: false,
  loading: () => null,
})

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Prevent browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Force scroll to top immediately - multiple attempts
    const forceScrollTop = () => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    // Execute immediately
    forceScrollTop()

    // Clear hash to prevent auto-scroll to anchor
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }

    // One deferred check in case the browser tries to restore scroll position
    const scrollTimer = setTimeout(forceScrollTop, 100)

    // Defer non-critical decorative components after first paint
    const loadTimer = setTimeout(() => setIsLoaded(true), 500)

    return () => {
      clearTimeout(scrollTimer)
      clearTimeout(loadTimer)
    }
  }, [])

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      {isLoaded && <CursorGlow />}
      <DynamicNavbar />
      {children}
      {isLoaded && typeof window !== 'undefined' && !document.querySelector('.whatsapp-fab') && (
        <WhatsAppButton />
      )}
    </>
  )
}
