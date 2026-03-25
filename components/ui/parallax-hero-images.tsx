"use client";

import Image from "next/image";

interface ParallaxHeroImagesProps {
  images: string[];
  className?: string;
}

export function ParallaxHeroImages({ images, className = "" }: ParallaxHeroImagesProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 w-full">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative w-full aspect-square bg-gray-200 rounded-lg overflow-hidden"
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 25vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
