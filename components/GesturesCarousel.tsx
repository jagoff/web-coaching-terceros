"use client";

import { useState, useRef, useEffect } from "react";
import { Instagram } from "lucide-react";
import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images";
import { useLanguage } from "@/contexts/LanguageContext";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { getOptimizedImagePath } from "@/lib/image-optimization";

// Array of 12 unique carousel images
const baseImages = [
  'slide-01.png',
  'slide-02.png', 
  'slide-03.png',
  'slide-04.png',
  'slide-05.png',
  'slide-06.png',
  'slide-07.png',
  'slide-08.png',
  'slide-09.png',
  'slide-10.png',
  'slide-11.png',
  'slide-12.png'
];

const getImagePaths = (imageName: string) => {
  // Usar imágenes optimizadas con soporte WebP
  const originalPath = `/images/carousel/${imageName}`;
  return getOptimizedImagePath(originalPath, true);
};

export default function GesturesCarousel() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const images = baseImages;
  const currentImage = images[currentIndex];
  const currentImagePaths = getImagePaths(currentImage);
  
  // Pre-calcular todas las rutas optimizadas para desktop
  const optimizedImagePaths = images.map(imageName => getImagePaths(imageName).src);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Swipe handlers para móvil
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50; // Mínimo de píxeles para considerar un swipe
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next image
        nextImage();
      } else {
        // Swipe right - previous image
        prevImage();
      }
    }
  };

  if (!currentImage || images.length === 0) {
    return <div className="w-full h-full flex items-center justify-center">{t.loadingStates.loading}</div>;
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Mobile Carousel */}
      <div className="block sm:hidden">
        <div 
          className="relative overflow-hidden rounded-lg bg-black shadow-2xl touch-pan-y"
          style={{ aspectRatio: "4/5", minHeight: "400px" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Native img with explicit dimensions for mobile static export */}
          <OptimizedImage
            key={currentImage}  // Force re-render when image changes
            src={currentImagePaths.src}
            webpSrc={currentImagePaths.webpSrc}
            fallbackSrc={currentImagePaths.fallbackSrc}
            alt={`Slide ${currentIndex + 1} de ${images.length} - Instagram @ferf.coach`}
            width={600}
            height={750}
            sizes="(max-width: 640px) 320px, (max-width: 768px) 400px, 600px"
            className="w-full h-full object-cover"
            style={{ aspectRatio: '4/5' }}
            lazy={false} // No lazy loading para carousel visible
            priority={currentIndex === 0} // Priorizar primera imagen
          />
          
          {/* Navigation buttons - Mejorados para móvil */}
          <button
            onClick={prevImage}
            aria-label="Imagen anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-sm transition-all active:scale-95 shadow-lg"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <span className="text-xl font-bold">←</span>
          </button>
          <button
            onClick={nextImage}
            aria-label="Siguiente imagen"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full backdrop-blur-sm transition-all active:scale-95 shadow-lg"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <span className="text-xl font-bold">→</span>
          </button>
          
          {/* Contador de imágenes */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Dots - Mejorados para táctil */}
        <div className="flex justify-center mt-4 gap-2 flex-wrap px-4">
          {images.map((image, index) => (
            <button
              key={`carousel-dot-${image}-${index}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Ir a imagen ${index + 1}`}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex 
                  ? "bg-blue-500 scale-125" 
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
              style={{ minWidth: '12px', minHeight: '12px' }}
            />
          ))}
        </div>

        {/* Instagram link - Mejorado para móvil */}
        <div className="flex justify-center mt-4">
          <a
            href="https://www.instagram.com/ferf.coach/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-sm hover:shadow-lg transition-all active:scale-95"
            style={{ minHeight: '44px' }}
          >
            <Instagram size={18} />
            <span>Ver más en @ferf.coach</span>
          </a>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block">
        <div className="relative rounded-lg w-full">
          <ParallaxHeroImages 
            images={optimizedImagePaths} 
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
