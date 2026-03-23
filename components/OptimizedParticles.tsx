'use client'

import { useEffect, useState } from 'react'

export default function OptimizedParticles() {
  const [mounted, setMounted] = useState(false)
  const [isReduced, setIsReduced] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReduced(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setIsReduced(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  if (!mounted || isReduced) return null

  // CSS-only particles solution
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    >
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: Math.random() * 4 + 1 + 'px',
            height: Math.random() * 4 + 1 + 'px',
            background: `hsl(${260 + Math.random() * 40}, 70%, 60%)`,
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float-${i % 3} ${15 + Math.random() * 10}s infinite ease-in-out`,
            animationDelay: Math.random() * 5 + 's',
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(10px) translateX(-10px); }
          75% { transform: translateY(-10px) translateX(5px); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(15px) translateX(-15px); }
          50% { transform: translateY(-25px) translateX(15px); }
          75% { transform: translateY(10px) translateX(-5px); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-30px) translateX(-5px); }
          50% { transform: translateY(20px) translateX(10px); }
          75% { transform: translateY(-15px) translateX(-10px); }
        }
      `}</style>
    </div>
  )
}
