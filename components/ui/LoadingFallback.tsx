'use client'

interface LoadingFallbackProps {
  height?: string
  className?: string
}

export default function LoadingFallback({
  height = '400px',
  className = '',
}: LoadingFallbackProps) {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ height }}>
      <div className="flex space-x-2">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-3 h-3 rounded-full animate-pulse"
            style={{
              backgroundColor: 'var(--gold-primary)',
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
