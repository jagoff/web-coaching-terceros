"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import Image from "next/image";
import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images";

const baseImages = [5, 1, 2, 8, 4, 6, 9, 7, 11];

// Function to shuffle array
const shuffleArray = (array: number[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const carouselVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.min(Math.max(offset * velocity, 0), swipeConfidenceThreshold);
};

export default function ImageCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState<number[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Shuffle images on component mount
  useEffect(() => {
    const shuffled = shuffleArray(baseImages);
    setImages(shuffled);
  }, []);

  const imageIndex = Math.abs(page) % images.length;
  const currentImage = images[imageIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleSwipeEnd = (e: any, info: any) => {
    const { offset } = info;
    
    // Umbral más simple y directo
    if (offset.x < -50) {
      paginate(1); // Swipe izquierda → siguiente
    } else if (offset.x > 50) {
      paginate(-1); // Swipe derecha → anterior
    }
  };

  const handleImageClick = () => {
    // No hacer nada - las imágenes ya no redirigen a Instagram
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [page]);

  // Auto-advance (optional)
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [page]);

  return (
    <div className="relative w-full">
      {/* Mobile Carousel - Visible solo en mobile */}
      <div className="block sm:hidden">
        <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "1/1" }}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={carouselVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              dragMomentum={false}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(e, info) => {
                setIsDragging(false);
                handleSwipeEnd(e, info);
              }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              ref={carouselRef}
            >
              <Image
                src={`/insta-${currentImage}.png`}
                alt={`Galería de imágenes - ${currentImage}`}
                fill
                className="object-cover select-none"
                draggable={false}
                style={{ 
                  filter: isDragging ? "brightness(0.9)" : "brightness(1)",
                  cursor: isDragging ? "grabbing" : "grab"
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center mt-4 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setPage([index - imageIndex, index > imageIndex ? 1 : -1])}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === imageIndex
                  ? "bg-[var(--gold-primary)] w-6"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
          aria-label="Imagen anterior"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
          aria-label="Siguiente imagen"
        >
          <ChevronRight size={16} />
        </button>

        {/* Social profile link */}
        <div className="flex items-center justify-end mt-4">
          <a
            href="https://www.instagram.com/ferf.coach/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group justify-end"
          >
            <div>
              <p className="text-xs font-semibold group-hover:text-purple-400 transition-colors" style={{ color: "var(--text-primary)" }}>@ferf.coach</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Instagram</p>
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
              style={{
                background: "rgba(167,139,250,0.08)",
                border: "1px solid rgba(167,139,250,0.25)",
              }}
            >
              <Instagram size={14} style={{ color: "var(--gold-primary)" }} />
            </div>
          </a>
        </div>
      </div>

      {/* Desktop Parallax Grid - Visible solo en desktop y tablet */}
      <div className="hidden sm:block">
        <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <ParallaxHeroImages 
            images={images.map(postNum => `/insta-${postNum}.png`)} 
            className="w-full h-full"
          />
        </div>
        
        {/* Social profile link para desktop - eliminado */}
        <div className="flex items-center justify-center mt-6">
          {/* Espacio vacío - icono y texto eliminados */}
        </div>
      </div>
    </div>
  );
}
