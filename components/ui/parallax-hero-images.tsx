"use client";

import Image from "next/image";

interface ParallaxHeroImagesProps {
  images: string[];
  className?: string;
}

export function ParallaxHeroImages({ images, className = "" }: ParallaxHeroImagesProps) {
  console.log("🖼️ ParallaxHeroImages received images:", images);
  
  return (
    <div className={`w-full h-full ${className}`}>
      {/* Basic grid with proper aspect ratio */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 w-full">
        {images.map((src, index) => {
          console.log(`📸 Rendering image ${index}: ${src}`);
          
          return (
            <div
              key={index}
              className="relative w-full aspect-square bg-gray-200 rounded-lg overflow-hidden"
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
                draggable={false}
                sizes="(max-width: 768px) 33vw, 25vw"
                onError={(e) => {
                  console.error(`❌ Image failed to load: ${src}`);
                  e.currentTarget.style.display = 'none';
                }}
                onLoad={() => {
                  console.log(`✅ Image loaded successfully: ${src}`);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
