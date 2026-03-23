'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface AnimatedFlameProps {
  size?: number
  className?: string
}

export default function AnimatedFlame({ size = 16, className = '' }: AnimatedFlameProps) {
  const [currentColor, setCurrentColor] = useState('#FFD700')
  const [currentScale, setCurrentScale] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const lastMouseX = useRef(0)
  const lastMouseY = useRef(0)
  const animationTimeout = useRef<NodeJS.Timeout | null>(null)
  const rafId = useRef<number | null>(null)

  // Paleta de colores para diferentes movimientos
  const colorPalette = [
    '#FFD700', // Amarillo oro
    '#FFA500', // Naranja estándar
    '#FF8C00', // Naranja oscuro
    '#FF7F50', // Coral
    '#FF4500', // Naranja rojo
    '#FF6347', // Tomate
    '#FFB347', // Naranja claro
    '#FF8C69', // Salmon claro
    '#FFA07A', // Salmon
    '#FF7F50', // Coral otra vez
  ]

  // Optimized mouse move handler with RAF throttling
  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isLoaded) return

      // Cancel previous RAF
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }

      rafId.current = requestAnimationFrame(() => {
        let currentX: number, currentY: number

        if ('touches' in e) {
          if (e.touches.length > 0) {
            currentX = e.touches[0].clientX
            currentY = e.touches[0].clientY
          } else {
            return
          }
        } else {
          currentX = e.clientX
          currentY = e.clientY
        }

        const deltaX = currentX - lastMouseX.current
        const deltaY = currentY - lastMouseY.current

        const movement = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        const threshold = window.innerWidth < 768 ? 8 : 15

        if (movement > threshold) {
          if (animationTimeout.current) {
            clearTimeout(animationTimeout.current)
          }

          const direction = Math.atan2(deltaY, deltaX)
          const speed = Math.min(movement / 100, 1)

          const colorIndex = Math.floor(
            ((direction + Math.PI) / (2 * Math.PI)) * colorPalette.length
          )
          const newColor = colorPalette[Math.abs(colorIndex) % colorPalette.length]
          const newScale = 0.8 + speed * 0.4

          setCurrentColor(newColor)
          setCurrentScale(newScale)
          setIsAnimating(true)

          animationTimeout.current = setTimeout(() => {
            setIsAnimating(false)
            setCurrentScale(1)
          }, 1000)

          lastMouseX.current = currentX
          lastMouseY.current = currentY
        }
      })
    },
    [isLoaded, colorPalette]
  )

  useEffect(() => {
    // Simulate component loading
    const loadTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // Add event listeners only after component is loaded
    if (isLoaded) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      window.addEventListener('touchmove', handleMouseMove, { passive: true })
    }

    return () => {
      clearTimeout(loadTimer)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleMouseMove)
      if (animationTimeout.current) {
        clearTimeout(animationTimeout.current)
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [isLoaded, handleMouseMove])

  // Loading placeholder
  if (!isLoaded) {
    return (
      <div className={`inline-block ${className}`} style={{ width: size, height: size }}>
        <div
          className="w-full h-full rounded-full bg-gray-300 animate-pulse"
          style={{ backgroundColor: 'rgba(255, 215, 0, 0.3)' }}
        />
      </div>
    )
  }

  return (
    <motion.div
      className={`inline-block ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 1.2, rotate: 15 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img
        src="/img/Gemini_Generated_Image_ciiloociiloociil-modified.png"
        alt="Animated flame icon"
        width={size}
        height={size}
        style={{
          filter: isHovered
            ? `drop-shadow(0 0 8px ${currentColor})`
            : `drop-shadow(0 0 2px ${currentColor})`,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          scale: isAnimating ? [1, 1.1, 0.9, 1.05, 1] : 1,
          rotate: isAnimating ? [0, 5, -3, 2, 0] : 0,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: isAnimating
            ? {
                duration: 0.6,
                ease: [0.68, -0.55, 0.265, 1.55],
                times: [0, 0.2, 0.4, 0.7, 1],
              }
            : { duration: 0.2 },
          rotate: isAnimating
            ? {
                duration: 0.6,
                ease: [0.68, -0.55, 0.265, 1.55],
                times: [0, 0.2, 0.4, 0.7, 1],
              }
            : { duration: 0.2 },
        }}
      />
    </motion.div>
  )
}
