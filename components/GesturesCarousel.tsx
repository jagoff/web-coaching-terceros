"use client";

import { useState } from "react";
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

  if (!currentImage || images.length === 0) {
    return <div className="w-full h-full flex items-center justify-center">{t.loadingStates.loading}</div>;
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Mobile Carousel */}
      <div className="block sm:hidden">
        <div 
          className="relative overflow-hidden rounded-lg bg-black"
          style={{ aspectRatio: "4/5" }}
        >
          {/* Native img with explicit dimensions for mobile static export */}
          <OptimizedImage
            key={currentImage}  // Force re-render when image changes
            src={currentImagePaths.src}
            webpSrc={currentImagePaths.webpSrc}
            fallbackSrc={currentImagePaths.fallbackSrc}
            alt={`Image ${currentIndex + 1}`}
            width={400}
            height={500}
            className="w-full h-full object-cover"
            style={{ aspectRatio: '4/5' }}
            lazy={false} // No lazy loading para carousel visible
            priority={currentIndex === 0} // Priorizar primera imagen
          />
          
          {/* Navigation buttons */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            ←
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            →
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-4 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-500"
              }`}
            />
          ))}
        </div>

        {/* Instagram link */}
        <div className="flex justify-center mt-4">
          <a
            href="https://www.instagram.com/ferf.coach/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm"
          >
            <Instagram size={16} />
            @ferf.coach
          </a>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block">
        <div className="relative rounded-lg overflow-hidden w-full h-96 md:h-[500px] lg:h-[600px]">
          <ParallaxHeroImages 
            images={optimizedImagePaths} 
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
