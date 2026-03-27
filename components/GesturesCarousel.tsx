"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Instagram, X } from "lucide-react";
import Image from "next/image";
import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images";
import { useLanguage } from "@/contexts/LanguageContext";

// Use the insta-XX.png and img_XX.png files from /public/img/ for 15 images
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
  'img_01.png',    // Changed from .jpeg to .png
  'img_02.png',    // Changed from .jpeg to .png
  'img_03.png',    // Changed from .jpeg to .png
  'img_04.png',    // Changed from .jpeg to .png
  'img_05.png'     // Changed from .jpeg to .png
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
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Simplified image array - no shuffling for debugging
  const images = baseImages;
  const currentImage = images[currentIndex];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!currentImage || images.length === 0) {
    return <div className="w-full h-full flex items-center justify-center">Cargando imágenes...</div>;
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Simplified Mobile Carousel - No animations, no gestures */}
      <div className="block sm:hidden">
        <div 
          className="relative overflow-hidden rounded-lg bg-black"
          style={{ aspectRatio: "4/5" }}
        >
          {/* Simple img tag - no motion, no complex styling */}
          <img
            src={getImagePath(currentImage)}
            alt={`Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            onLoad={() => console.log(`✅ LOADED: ${currentImage}`)}
            onError={(e) => {
              console.error(`❌ FAILED: ${currentImage}`);
              console.error(`Path: ${getImagePath(currentImage)}`);
              console.error(`Index: ${currentIndex}`);
              console.error(`Available images:`, images);
            }}
          />
          
          {/* Simple navigation buttons */}
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

        {/* Simple dots */}
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
      </div>

      {/* Desktop - Keep original for now */}
      <div className="hidden sm:block">
        <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: "3/4" }}>
          <ParallaxHeroImages 
            images={images.map(imageName => getImagePath(imageName))} 
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
