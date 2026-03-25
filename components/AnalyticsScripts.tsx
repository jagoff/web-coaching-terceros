'use client'

import { useEffect } from 'react'

export default function AnalyticsScripts() {
  useEffect(() => {
    // Delay analytics to prioritize core content loading
    const analyticsTimer = setTimeout(() => {
      // Inject Google Analytics script with async loading
      const script1 = document.createElement('script')
      script1.async = true
      script1.defer = true
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-PE7S1C5PX8'
      
      const script2 = document.createElement('script')
      script2.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-PE7S1C5PX8');
      `
      
      // Prevent duplicate injection
      const existingScript1 = document.querySelector('script[src*="googletagmanager.com/gtag"]')
      const existingScript2 = document.querySelector('script:not([src])[textContent*="gtag"]')
      
      if (existingScript1) existingScript1.remove()
      if (existingScript2) existingScript2.remove()
      
      document.head.appendChild(script1)
      document.head.appendChild(script2)
    }, 2000) // Delay 2 seconds to prioritize initial page load

    // Cleanup on unmount
    return () => {
      clearTimeout(analyticsTimer)
      const script1ToRemove = document.querySelector('script[src*="googletagmanager.com/gtag"]')
      const script2ToRemove = document.querySelector('script:not([src])[textContent*="gtag"]')
      if (script1ToRemove) script1ToRemove.remove()
      if (script2ToRemove) script2ToRemove.remove()
    }
  }, [])

  return null
}
