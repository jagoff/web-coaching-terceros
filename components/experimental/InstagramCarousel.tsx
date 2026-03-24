'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Instagram } from 'lucide-react'
import Image from 'next/image'

const baseInstagramImages = [5, 1, 2, 8, 4, 6, 9, 7, 11, 20, 21, 22, 23, 24, 25]

const getImagePath = (imageNum: number) => {
  if (imageNum >= 20 && imageNum <= 26) {
    return `/img/IMG_777${imageNum - 20}.jpg`
  }
  return `/img/insta-${imageNum}.png`
}

// Function to shuffle array
const shuffleArray = (array: number[]) => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

const carouselVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.min(Math.max(offset * velocity, 0), swipeConfidenceThreshold)
}

export default function InstagramCarousel() {
  const [[page, direction], setPage] = useState([0, 0])
  const [isDragging, setIsDragging] = useState(false)
  const [instagramImages, setInstagramImages] = useState<number[]>([])
  const carouselRef = useRef<HTMLDivElement>(null)

  // Shuffle images on component mount
  useEffect(() => {
    const shuffled = shuffleArray(baseInstagramImages)
    setInstagramImages(shuffled)
  }, [])

  const imageIndex = Math.abs(page) % instagramImages.length
  const currentImage = instagramImages[imageIndex]

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  const handleSwipeEnd = (e: any, info: any) => {
    const { offset } = info

    // Umbral más simple y directo
    if (offset.x < -50) {
      paginate(1) // Swipe izquierda → siguiente
    } else if (offset.x > 50) {
      paginate(-1) // Swipe derecha → anterior
    }
  }

  const handleImageClick = () => {
    // No hacer nada - las imágenes ya no redirigen a Instagram
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1)
      if (e.key === 'ArrowRight') paginate(1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [page])

  // Auto-advance (optional)
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 5000)
    return () => clearInterval(timer)
  }, [page])

  return (
    <div className="relative w-full">
      {/* Mobile Carousel - Visible solo en mobile */}
      <div className="block sm:hidden">
        <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: '1/1' }}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={carouselVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              dragMomentum={false}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(e, info) => {
                setIsDragging(false)
                handleSwipeEnd(e, info)
              }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              ref={carouselRef}
            >
              <Image
                src={getImagePath(currentImage)}
                alt={`Post de Instagram - ${currentImage}`}
                fill
                className="object-cover select-none"
                draggable={false}
                style={{
                  filter: (currentImage === 5 || currentImage === 20) ? 'none' : (isDragging ? 'grayscale(100%) brightness(0.8)' : 'grayscale(100%)'),
                  cursor: isDragging ? 'grabbing' : 'grab',
                }}
              />
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

        {/* Navigation arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
          aria-label="Siguiente imagen"
        >
          <ChevronRight size={16} />
        </button>

      </div>

      {/* Desktop Grid - Visible solo en desktop y tablet */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-3 gap-2">
          {instagramImages.map((postNum, i) => (
            <div
              key={postNum}
              className="relative rounded-lg overflow-hidden group"
              style={{
                aspectRatio: '1/1',
                border: '1px solid rgba(167,139,250,0.12)',
                backgroundColor: 'rgba(19,18,27,0.6)',
              }}
            >
              <Image
                src={getImagePath(postNum)}
                alt={`Post de Instagram - ${postNum}`}
                fill
                className={`object-cover transition-all duration-500`}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
