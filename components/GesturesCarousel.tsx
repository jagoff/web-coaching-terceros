"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Instagram, X } from "lucide-react";
import Image from "next/image";
import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images";
import { useLanguage } from "@/contexts/LanguageContext";

// Use the insta-XX.png and img_XX.jpeg files from /public/img/ for 15 images
const baseImages = [
  'insta-1.png',
  'insta-2.png',
  'insta-3.png',
  'insta-4.png',
  'insta-5.png',
  'insta-6.png',
  'insta-7.png',
  'insta-8.png',
  'insta-9.png',
  'insta-10.png',
  'insta-11.png',
  'img_01.jpeg',
  'img_02.jpeg',
  'img_03.jpeg',
  'img_04.jpeg',
  'img_05.jpeg'
];

const getImagePath = (imageName: string): string => {
  return `/img/${imageName}`;
};

const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function GesturesCarousel() {
  const { t } = useLanguage();
  const [[page, direction], setPage] = useState([0, 0]);
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number; time: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number; time: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const controls = useAnimation();

  useEffect(() => {
    // Temporarily disable shuffling for debugging
    // const shuffled = shuffleArray(baseImages);
    const shuffled = baseImages; // Use original order for debugging
    setImages(shuffled);
    
    // Debug: Detailed logging
    const uniqueImages = [...new Set(shuffled)];
    console.log(`📸 Image carousel: ${uniqueImages.length}/${shuffled.length} unique images`);
    console.log(`🎲 Complete order:`, shuffled);
    console.log(`🖼️ Image paths:`, shuffled.map(n => getImagePath(n)));
    
    // Verify all images exist
    const imagePaths = shuffled.map(n => getImagePath(n));
    imagePaths.forEach((path, index) => {
      console.log(`🔍 Checking image ${index}: ${path}`);
    });
    
    if (uniqueImages.length !== shuffled.length) {
      console.error('🚨 DUPLICATES DETECTED!');
      const duplicates = shuffled.filter((item, index) => shuffled.indexOf(item) !== index);
      console.error('Duplicates:', duplicates);
    }
  }, []);

  const imageIndex = Math.abs(page) % images.length;
  const currentImage = images[imageIndex];

  if (!currentImage || images.length === 0) {
    return <div className="w-full h-full flex items-center justify-center">Cargando imágenes...</div>;
  }

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
    setIsZoomed(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touch = e.touches[0];
    setTouchEnd({
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    });
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;
    
    const minSwipeDistance = 50;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          paginate(-1);
        } else {
          paginate(1);
        }
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
  };

  const handleDoubleTap = () => {
    setIsZoomed(!isZoomed);
    
    if (!isZoomed) {
      controls.start({
        scale: 2,
        transition: { type: "spring", stiffness: 300, damping: 30 }
      });
    } else {
      controls.start({
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 30 }
      });
    }
  };

  const shareImage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ELEVA CONSULTORIA',
          text: 'Mira esta imagen',
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Mobile Touch Carousel */}
      <div className="block sm:hidden">
        <div 
          className="relative overflow-hidden rounded-lg bg-black"
          style={{ aspectRatio: "4/5" }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              initial={{ x: direction > 0 ? 1000 : -1000, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction < 0 ? 1000 : -1000, opacity: 0 }}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
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
                {/* Use native img tag for mobile to avoid Next.js Image issues with unoptimized */}
                <img
                  src={getImagePath(currentImage)}
                  alt={`Galería de imágenes - ${currentImage ? currentImage.substring(0, 20) : 'Cargando...'}...`}
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  draggable={false}
                  style={{ 
                    filter: isDragging ? "brightness(0.8)" : "brightness(1)",
                    cursor: isZoomed ? "zoom-out" : "zoom-in"
                  }}
                  onLoad={() => console.log(`✅ Image loaded: ${currentImage}`)}
                  onError={(e) => {
                    console.error(`❌ Image failed to load: ${currentImage}`);
                    console.error(`Path attempted: ${getImagePath(currentImage)}`);
                    // Try to show a fallback or next image
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    // Show error indicator
                    const parent = target.parentElement;
                    if (parent) {
                      const errorDiv = document.createElement('div');
                      errorDiv.className = 'absolute inset-0 flex items-center justify-center bg-gray-800 text-white';
                      errorDiv.innerHTML = `<div class="text-center"><p class="text-sm">Error al cargar imagen</p><p class="text-xs opacity-75">${currentImage}</p></div>`;
                      parent.appendChild(errorDiv);
                    }
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
                      <span className="text-white text-xs">{t.ui.swiping}</span>
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
                    <span className="text-white text-xs">{t.ui.zoom2x}</span>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar - Mobile only */}
        <div className="relative w-full h-1 bg-gray-700 rounded-full overflow-hidden mt-3 mb-2">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--gold-primary)] to-[var(--amber-primary)] rounded-full"
            initial={{ width: "0%" }}
            animate={{ 
              width: `${((page + 1) / images.length) * 100}%` 
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center mt-4 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index - page)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === page
                  ? "bg-[var(--gold-primary)] w-6"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between mt-4">
          <div></div>
          {/* Social profile link */}
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

      {/* Desktop Parallax Grid */}
      <div className="hidden sm:block">
        <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: "3/4" }}>
          <ParallaxHeroImages 
            images={images.map(imageName => getImagePath(imageName))} 
            className="w-full h-full"
          />
        </div>
        
        <div className="flex items-center justify-center mt-6">
          <a
            href="https://www.instagram.com/ferf.coach/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group justify-end"
          >
            <div>
              <p className="text-sm font-semibold group-hover:text-purple-400 transition-colors" style={{ color: "var(--text-primary)" }}>@ferf.coach</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Instagram</p>
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                background: "rgba(167,139,250,0.08)",
                border: "1px solid rgba(167,139,250,0.25)",
              }}
            >
              <Instagram size={18} style={{ color: "var(--gold-primary)" }} />
            </div>
          </a>
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
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 z-10"
                aria-label={t.ui.close}
              >
                <X size={24} />
              </button>
              
              {/* Use native img tag for modal to avoid Next.js Image issues */}
              <img
                src={getImagePath(selectedImage)}
                alt={`Galería de imágenes - ${selectedImage ? selectedImage.substring(0, 20) : 'Cargando...'}...`}
                className="w-full h-full object-contain"
                draggable={false}
                onLoad={() => console.log(`✅ Modal image loaded: ${selectedImage}`)}
                onError={(e) => {
                  console.error(`❌ Modal image failed to load: ${selectedImage}`);
                  console.error(`Path attempted: ${getImagePath(selectedImage)}`);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  // Show error indicator in modal
                  const parent = target.parentElement;
                  if (parent) {
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'flex items-center justify-center w-full h-full bg-gray-800 text-white';
                    errorDiv.innerHTML = `<div class="text-center"><p class="text-lg">Error al cargar imagen</p><p class="text-sm opacity-75">${selectedImage}</p></div>`;
                    parent.appendChild(errorDiv);
                  }
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
