"use client";

import { useState } from "react";
import { Instagram } from "lucide-react";
import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images";

// Simple array of working images
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
  'insta-1.png',
  'insta-2.png',
  'insta-3.png',
  'insta-4.png'
];

const getImagePath = (imageName: string): string => {
  return `/img/${imageName}`;
};

export default function GesturesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = baseImages;
  const currentImage = images[currentIndex];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!currentImage || images.length === 0) {
    return <div className="w-full h-full flex items-center justify-center">Cargando...</div>;
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Mobile Carousel */}
      <div className="block sm:hidden">
        <div 
          className="relative overflow-hidden rounded-lg bg-black"
          style={{ aspectRatio: "4/5" }}
        >
          {/* Simple img - no complexity */}
          <img
            src={getImagePath(currentImage)}
            alt={`Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
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
