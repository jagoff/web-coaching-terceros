"use client";

import Image from "next/image";

interface ParallaxHeroImagesProps {
  images: string[];
  className?: string;
}

export function ParallaxHeroImages({ images, className = "" }: ParallaxHeroImagesProps) {
  console.log("🖼️ ParallaxHeroImages images:", images);
  
  return (
    <div className={`w-full h-full bg-blue-100 ${className}`}>
      <div className="p-4 text-xs">
        DEBUG: {images.length} images - {images.join(', ')}
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 w-full">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative w-full aspect-square bg-gray-200 rounded-lg overflow-hidden border-2 border-red-500"
          >
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <span className="text-xs bg-white px-1">{index + 1}</span>
            </div>
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 25vw"
              onError={(e) => console.error("❌ Failed:", src)}
              onLoad={() => console.log("✅ Loaded:", src)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
