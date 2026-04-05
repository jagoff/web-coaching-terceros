'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Play, Youtube } from 'lucide-react'
import Image from 'next/image'
import logger from '@/lib/logger'

const thumbnailContainer: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

interface YouTubeThumbnailProps {
  videoId: string
  title?: string
  className?: string
  autoPlay?: boolean // New prop for auto-play on scroll
}

export default function YouTubeThumbnail({
  videoId,
  title,
  className = '',
  autoPlay = false, // Default to false for manual play
}: YouTubeThumbnailProps) {
  const { t } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [shouldAutoPlay, setShouldAutoPlay] = useState(false)
  const videoRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(videoRef, {
    once: false, // Allow multiple triggers
    margin: '-100px', // Start loading 100px before video enters viewport
    amount: 0.3, // Trigger when 30% of video is visible
  })

  const defaultTitle = t.video.defaultTitle
  const finalTitle = title || defaultTitle

  // Simple reliable thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&playsinline=1&fs=0&cc_load_policy=0&iv_load_policy=3&showinfo=0&disablekb=1&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}&widgetid=1`

  // Auto-play when video comes into view
  useEffect(() => {
    if (autoPlay && isInView && !isPlaying && !shouldAutoPlay) {
      logger.debug('Video in view, triggering auto-play', { component: 'YouTubeThumbnail' })
      setShouldAutoPlay(true)
      // Reduced delay for faster response
      setTimeout(() => {
        setIsPlaying(true)
      }, 200)
    }
  }, [autoPlay, isInView, isPlaying, shouldAutoPlay])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    logger.debug('YouTube thumbnail clicked', { component: 'YouTubeThumbnail' })
    setIsPlaying(true)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <motion.div
      ref={videoRef}
      variants={thumbnailContainer}
      initial="hidden"
      animate="visible"
      className={`relative w-full cursor-pointer group ${className}`}
      style={{
        aspectRatio: '16/9',
        minHeight: '180px',
        width: '100%',
        maxWidth: '100%',
      }}
      onClick={!autoPlay ? handleClick : undefined}
      role={autoPlay ? 'presentation' : 'button'}
      tabIndex={autoPlay ? -1 : 0}
      onKeyDown={e => {
        if (!autoPlay && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          setIsPlaying(true)
        }
      }}
    >
      {isPlaying ? (
        // Video iframe when playing
        <div
          className="w-full h-full rounded-lg overflow-hidden"
          style={{ borderRadius: '0.75rem' }}
        >
          <iframe
            src={embedUrl}
            title={finalTitle}
            className="w-full h-full"
            style={{
              border: 'none',
              borderRadius: '0.75rem',
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => logger.debug('YouTube iframe loaded', { component: 'YouTubeThumbnail' })}
          />
        </div>
      ) : (
        // Thumbnail when not playing
        <>
          {/* Thumbnail image */}
          <Image
            src={thumbnailUrl}
            alt={finalTitle}
            fill
            className="object-cover rounded-lg"
            style={{ borderRadius: '0.75rem' }}
            onError={handleImageError}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority={false}
            unoptimized={true}
          />

          {/* Error fallback */}
          {imageError && (
            <div
              className="absolute inset-0 flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-800 to-gray-900"
              style={{ borderRadius: '0.75rem' }}
            >
              <div className="text-center">
                <Youtube size={48} className="text-red-500 mb-2" />
                <p className="text-white text-sm">Video Preview</p>
              </div>
            </div>
          )}

          {/* Dark overlay on hover */}
          <div
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)',
              borderRadius: '0.75rem',
            }}
          />

          {/* Play button overlay - only show if not auto-playing */}
          {!autoPlay && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                {/* Play button circle */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl"
                  style={{
                    background: 'rgba(255, 0, 0, 0.9)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Play size={32} className="text-white ml-1" fill="white" />
                </div>

                {/* Pulse animation */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-red-500"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </div>
          )}

          {/* Auto-play indicator */}
          {autoPlay && shouldAutoPlay && !isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 rounded-full border-2 border-red-500 border-t-transparent"
              />
            </div>
          )}

          {/* YouTube badge */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm">
              <Youtube size={16} className="text-red-500" />
              <span className="text-xs text-white font-medium">YouTube</span>
            </div>
          </div>

          {/* Shadow */}
          <div
            className="absolute inset-0 pointer-events-none rounded-lg"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              borderRadius: '0.75rem',
            }}
          />
        </>
      )}
    </motion.div>
  )
}

// Quick thumbnail component
export function QuickYouTubeThumbnail({
  videoUrl,
  className = '',
}: {
  videoUrl: string
  className?: string
}) {
  // Extract video ID from URL
  const getVideoId = (urlOrId: string) => {
    if (urlOrId.match(/^[a-zA-Z0-9_-]{11}$/)) {
      return urlOrId
    }
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
    const match = urlOrId.match(regex)
    return match ? match[1] : urlOrId
  }

  const videoId = getVideoId(videoUrl)

  return <YouTubeThumbnail videoId={videoId} className={className} title="Video presentation" />
}
