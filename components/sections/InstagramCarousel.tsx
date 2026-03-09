"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram, ExternalLink } from "lucide-react";
import Image from "next/image";

const instagramImages = [5, 1, 2, 8, 4, 6, 9, 7];

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

export default function InstagramCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const imageIndex = Math.abs(page) % instagramImages.length;
  const currentImage = instagramImages[imageIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleSwipeEnd = (e: any, { offset, velocity }: any) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  const handleImageClick = () => {
    window.open(`https://www.instagram.com/p/C${currentImage}.../`, '_blank');
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
              dragElastic={1}
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
                alt={`Post de Instagram @jago_ff - ${currentImage}`}
                fill
                className="object-cover select-none"
                draggable={false}
                onClick={handleImageClick}
                style={{ 
                  filter: isDragging ? "brightness(0.9)" : "brightness(1)",
                  cursor: isDragging ? "grabbing" : "grab"
                }}
              />
              
              {/* Overlay con info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-medium">Ver en Instagram</p>
                  <p className="text-white/80 text-xs">@jago_ff</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center mt-4 gap-2">
          {instagramImages.map((_, index) => (
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

        {/* Instagram link */}
        <div className="flex items-center justify-between mt-4">
          <a
            href="https://www.instagram.com/jago_ff"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
              style={{
                background: "rgba(167,139,250,0.08)",
                border: "1px solid rgba(167,139,250,0.25)",
              }}
            >
              <Instagram size={14} style={{ color: "var(--gold-primary)" }} />
            </div>
            <div>
              <p className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>@jago_ff</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Seguime en Instagram</p>
            </div>
          </a>
          <a
            href="https://www.instagram.com/jago_ff"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-1"
            style={{ padding: "0.25rem 0.75rem", fontSize: "0.625rem" }}
          >
            Seguime
            <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* Desktop Grid - Visible solo en desktop y tablet */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-3 gap-2">
          {instagramImages.map((postNum, i) => (
            <div
              key={postNum}
              className="relative rounded-lg overflow-hidden cursor-pointer group"
              style={{
                aspectRatio: "1/1",
                border: "1px solid rgba(167,139,250,0.12)",
                backgroundColor: "rgba(19,18,27,0.6)",
              }}
              onClick={() => window.open(`https://www.instagram.com/p/C${postNum}.../`, '_blank')}
            >
              <Image
                src={`/insta-${postNum}.png`}
                alt={`Post de Instagram @jago_ff - ${postNum}`}
                fill
                className="object-cover transition-all duration-500"
                style={{ filter: "grayscale(100%)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "grayscale(0%)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "grayscale(100%)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
