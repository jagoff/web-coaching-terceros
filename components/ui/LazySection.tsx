'use client'

import { useEffect, useRef, useState } from 'react'

interface LazySectionProps {
  children: React.ReactNode
  rootMargin?: string
  threshold?: number
  fallback?: React.ReactNode
}

export default function LazySection({ 
  children, 
  rootMargin = '200px',
  threshold = 0.1,
  fallback = <div className="h-32 animate-pulse bg-gray-800/20 rounded-lg" />
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setIsVisible(true)
          setHasIntersected(true)
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [rootMargin, threshold, hasIntersected])

  return (
    <div ref={ref} className="lazy-section">
      {isVisible ? children : fallback}
    </div>
  )
}
