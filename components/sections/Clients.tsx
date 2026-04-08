'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const tools = [
  {
    name: 'AWS',
    style: { fontWeight: 700, letterSpacing: '0.06em', fontSize: '1rem' },
  },
  {
    name: 'Jira',
    style: { fontWeight: 600, letterSpacing: '0.03em', fontSize: '1rem' },
  },
  {
    name: 'Slack',
    style: { fontWeight: 600, letterSpacing: '0.05em', fontSize: '1rem' },
  },
  {
    name: 'Notion',
    style: { fontWeight: 600, letterSpacing: '0.04em', fontSize: '1rem' },
  },
  {
    name: 'GitHub',
    style: { fontWeight: 600, letterSpacing: '0.03em', fontSize: '1rem' },
  },
  {
    name: 'Figma',
    style: { fontWeight: 600, letterSpacing: '0.03em', fontSize: '1rem' },
  },
  {
    name: 'Linear',
    style: { fontWeight: 700, letterSpacing: '0.04em', fontSize: '1rem' },
  },
]

// Duplicate 4× for a seamless infinite loop with no visible gap
const track = [...tools, ...tools, ...tools, ...tools]

export default function Clients() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Use consistent text during SSR and hydration
  const labelText = mounted
    ? language === 'es'
      ? 'Stack tecnológico'
      : 'Tech Stack'
    : 'Stack tecnológico'

  return (
    <section
      id="clientes"
      aria-label={language === 'es' ? 'Stack tecnológico' : 'Tech Stack'}
      style={{
        padding: 'clamp(2.5rem, 5vw, 3.5rem) 0',
        borderTop: '1px solid rgba(124,107,196,0.10)',
        borderBottom: '1px solid rgba(124,107,196,0.10)',
        background:
          'linear-gradient(180deg, transparent 0%, rgba(124,107,196,0.03) 50%, transparent 100%)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Label */}
      <p
        className="mb-6 uppercase tracking-widest"
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.7rem',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        {labelText}
      </p>

      {/* Marquee track */}
      <div className="relative w-full" style={{ overflow: 'hidden' }}>
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: 'clamp(40px, 8vw, 80px)',
            background: 'linear-gradient(to right, var(--bg-primary, #0C0A12), transparent)',
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: 'clamp(40px, 8vw, 80px)',
            background: 'linear-gradient(to left, var(--bg-primary, #0C0A12), transparent)',
          }}
        />

        {/* Animated strip */}
        <div
          className="flex items-center gap-0"
          style={{
            animation: 'clients-marquee 30s linear infinite',
            width: 'max-content',
          }}
          onMouseEnter={e => {
            ;(e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'
          }}
        >
          {track.map((tool, idx) => (
            <div
              key={idx}
              className="flex items-center gap-0 flex-shrink-0"
              style={{
                padding: '0 clamp(2rem, 5vw, 3.5rem)',
                opacity: 0.45,
                transition: 'opacity 0.3s ease',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLDivElement).style.opacity = '1'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLDivElement).style.opacity = '0.45'
              }}
            >
              <span className="text-white select-none whitespace-nowrap" style={tool.style}>
                {tool.name}
              </span>
              {/* Dot separator */}
              <span
                className="ml-[clamp(2rem,5vw,3.5rem)]"
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'rgba(124,107,196,0.4)',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
