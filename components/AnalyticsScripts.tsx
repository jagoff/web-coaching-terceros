'use client'

import { useEffect } from 'react'

export default function AnalyticsScripts() {
  useEffect(() => {
    // Load analytics only when browser is idle to avoid blocking main thread
    const loadAnalytics = () => {
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
    }

    // Use requestIdleCallback if available, otherwise fallback to setTimeout
    let idleCallbackId: number | undefined
    let timeoutId: NodeJS.Timeout | undefined

    if ('requestIdleCallback' in window) {
      idleCallbackId = requestIdleCallback(loadAnalytics, { timeout: 5000 })
    } else {
      timeoutId = setTimeout(loadAnalytics, 5000)
    }

    // Cleanup on unmount
    return () => {
      if (idleCallbackId) cancelIdleCallback(idleCallbackId)
      if (timeoutId) clearTimeout(timeoutId)
      const script1ToRemove = document.querySelector('script[src*="googletagmanager.com/gtag"]')
      const script2ToRemove = document.querySelector('script:not([src])[textContent*="gtag"]')
      if (script1ToRemove) script1ToRemove.remove()
      if (script2ToRemove) script2ToRemove.remove()
    }
  }, [])

  return null
}
