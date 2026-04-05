'use client'

import { useEffect, useRef, useState } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const rendered = useRef({ x: 0, y: 0 })
  const raf = useRef<number>(0)
  const [hasPointer, setHasPointer] = useState(false)

  useEffect(() => {
    // Skip entirely on touch/mobile — no cursor exists
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setHasPointer(true)

    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      rendered.current.x += (pos.current.x - rendered.current.x) * 0.12
      rendered.current.y += (pos.current.y - rendered.current.y) * 0.12

      if (glowRef.current) {
        glowRef.current.style.setProperty('--glow-x', `${rendered.current.x}px`)
        glowRef.current.style.setProperty('--glow-y', `${rendered.current.y + window.scrollY}px`)
      }
      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  if (!hasPointer) return null

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
}
