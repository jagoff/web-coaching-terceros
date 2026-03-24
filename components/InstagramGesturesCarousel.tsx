'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { X, ZoomIn, Share2 } from 'lucide-react'
import Image from 'next/image'

const allInstagramImages = [5, 1, 2, 8, 4, 6, 9, 7, 11, 12, 20, 21, 22, 23, 24, 25, 26]

const getRandomSubset = (array: number[], count: number) => {
  const shuffled = [...array].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

const getImagePath = (imageNum: number) => {
  if (imageNum >= 20 && imageNum <= 26) {
    return `/img/IMG_777${imageNum - 20}.jpg`
  }
  return `/img/insta-${imageNum}.png`
}

const shuffleArray = (array: number[]) => {
  const newArray = [...array]
  // Use deterministic shuffle based on array indices
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor((Math.sin(i * 1000) * 10000 - Math.floor(Math.sin(i * 1000) * 10000)) * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export default function InstagramGesturesCarousel() {
  const [[page, direction], setPage] = useState([0, 0])
  const [instagramImages, setInstagramImages] = useState<number[]>([])
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [touchStart, setTouchStart] = useState<{ x: number; y: number; time: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number; time: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const controls = useAnimation()

  useEffect(() => {
    const randomSubset = getRandomSubset(allInstagramImages, 15)
    setInstagramImages(randomSubset)
  }, [])

  const imageIndex = Math.abs(page) % instagramImages.length
  const currentImage = instagramImages[imageIndex]

  const randomizeImages = () => {
    const newRandomSubset = getRandomSubset(allInstagramImages, 15)
    setInstagramImages(newRandomSubset)
    setPage([0, 0]) // Reset to first image
  }

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
    setIsZoomed(false)
    
    // Randomize images every 10 navigation actions
    if (Math.abs(page + newDirection) % 10 === 0) {
      randomizeImages()
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
      time: performance.now(),
    })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return

    const touch = e.touches[0]
    setTouchEnd({
      x: touch.clientX,
      y: touch.clientY,
      time: performance.now(),
    })
    setIsDragging(true)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const deltaX = touchEnd.x - touchStart.x
    const deltaY = touchEnd.y - touchStart.y

    const minSwipeDistance = 50

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          paginate(-1)
        } else {
          paginate(1)
        }
      }
    }

    setTouchStart(null)
    setTouchEnd(null)
    setIsDragging(false)
  }

  const handleDoubleTap = () => {
    setIsZoomed(!isZoomed)

    if (!isZoomed) {
      controls.start({
        scale: 2,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      })
    } else {
      controls.start({
        scale: 1,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      })
    }
  }

  const shareImage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ELEVA CONSULTING - Instagram',
          text: `Mira esta imagen de coaching`,
          url: `https://www.instagram.com/ferf.coach/`,
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      navigator.clipboard.writeText('https://www.instagram.com/ferf.coach/')
    }
  }

  return (
    <div className="relative w-full" data-testid="instagram-carousel">
      {/* Mobile Touch Carousel */}
      <div className="block sm:hidden">
        <div
          className="relative overflow-hidden rounded-lg bg-black"
          style={{ aspectRatio: '1/1' }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              initial={{ x: direction > 0 ? 1000 : -1000, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction < 0 ? 1000 : -1000, opacity: 0 }}
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0"
            >
              <motion.div
                animate={controls}
                className="relative w-full h-full cursor-grab active:cursor-grabbing"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={handleDoubleTap}
                style={{ touchAction: 'none' }}
              >
                <Image
                  src={getImagePath(currentImage)}
                  alt={`Post de Instagram - ${currentImage}`}
                  fill
                  className="object-cover select-none"
                  draggable={false}
                  style={{
                    filter: (currentImage === 5 || currentImage === 20) ? 'none' : (isDragging ? 'brightness(0.8) grayscale(100%)' : 'brightness(1) grayscale(100%)'),
                    cursor: isZoomed ? 'zoom-out' : 'zoom-in',
                  }}
                />

                {/* Touch indicators */}
                {isDragging && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full">
                      <span className="text-white text-xs">Deslizando...</span>
                    </div>
                  </motion.div>
                )}

                {/* Zoom indicator */}
                {isZoomed && (
                  <motion.div
                    className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <span className="text-white text-xs">Zoom 2x</span>
                  </motion.div>
                )}

                {/* Gesture hints */}
                {!isDragging && !isZoomed && (
                  <motion.div
                    className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <div className="flex justify-between text-white text-xs">
                      <span>👆 Desliza para navegar</span>
                      <span>👆👆 Doble toque para zoom</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center mt-4 gap-2">
          {instagramImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setPage([index - imageIndex, index > imageIndex ? 1 : -1])}
              className={`min-w-[44px] min-h-[44px] rounded-full transition-all duration-300 flex items-center justify-center ${
                index === imageIndex
                  ? 'bg-[var(--gold-primary)] w-11'
                  : 'bg-gray-600 hover:bg-gray-500 w-11'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  index === imageIndex ? 'bg-white' : 'bg-current'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end mt-4">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedImage(currentImage)}
              className="min-w-[44px] min-h-[44px] p-2 rounded-full bg-black/50 text-white flex items-center justify-center"
              aria-label="Ver imagen completa"
            >
              <ZoomIn size={14} />
            </button>
            <button
              onClick={randomizeImages}
              className="min-w-[44px] min-h-[44px] p-2 rounded-full bg-black/50 text-white flex items-center justify-center"
              aria-label="Randomizar imágenes"
            >
              ↻
            </button>
            <button
              onClick={shareImage}
              className="min-w-[44px] min-h-[44px] p-2 rounded-full bg-black/50 text-white flex items-center justify-center"
              aria-label="Compartir"
            >
              <Share2 size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-3 gap-2">
          {instagramImages.map((postNum, i) => (
            <div
              key={postNum}
              className="relative rounded-lg overflow-hidden group cursor-pointer"
              style={{
                aspectRatio: '1/1',
                border: '1px solid rgba(167,139,250,0.12)',
                backgroundColor: 'rgba(19,18,27,0.6)',
              }}
              onClick={() => setSelectedImage(postNum)}
            >
              <Image
                src={getImagePath(postNum)}
                alt={`Post de Instagram - ${postNum}`}
                fill
                className={`object-cover transition-all duration-500 ${postNum === 5 ? 'force-color' : ''}`}
                style={{
                  filter: (postNum === 5 || postNum === 20) ? 'none' : 'grayscale(100%)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.filter = 'none'
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.filter = (postNum === 5 || postNum === 20) ? 'none' : 'grayscale(100%)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn size={24} className="text-white" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={randomizeImages}
            className="flex items-center gap-2 group"
            aria-label="Randomizar imágenes"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:scale-105"
              style={{
                background: 'rgba(167,139,250,0.08)',
                border: '1px solid rgba(167,139,250,0.25)',
              }}
            >
              <span style={{ color: 'var(--gold-primary)' }}>↻</span>
            </div>
            <div>
              <p
                className="text-sm font-semibold group-hover:text-purple-400 transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                Randomizar
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Nuevas imágenes
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative w-full h-full max-w-4xl max-h-screen p-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 min-w-[44px] min-h-[44px] p-2 rounded-full bg-black/50 text-white hover:bg-black/70 z-10 flex items-center justify-center"
                aria-label="Cerrar"
              >
                <X size={24} />
              </button>

              <Image
                src={getImagePath(selectedImage)}
                alt={`Post de Instagram - ${selectedImage}`}
                fill
                className="object-contain"
                draggable={false}
                style={{
                  filter: (selectedImage === 5 || selectedImage === 20) ? 'none' : 'grayscale(100%)'
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
