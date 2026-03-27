"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ParallaxHeroImagesProps {
  images: string[];
  className?: string;
}

export function ParallaxHeroImages({ images, className = "" }: ParallaxHeroImagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Create transforms for each depth level
  const transformX1 = useTransform(springX, (value) => value * 2);
  const transformY1 = useTransform(springY, (value) => value * 2);
  const transformX2 = useTransform(springX, (value) => value * 4);
  const transformY2 = useTransform(springY, (value) => value * 4);
  const transformX3 = useTransform(springX, (value) => value * 6);
  const transformY3 = useTransform(springY, (value) => value * 6);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const newX = (e.clientX - centerX) / (rect.width / 2);
    const newY = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(newX);
    mouseY.set(newY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const getTransformForDepth = (depth: number) => {
    switch (depth) {
      case 1:
        return { x: transformX1, y: transformY1 };
      case 2:
        return { x: transformX2, y: transformY2 };
      case 3:
        return { x: transformX3, y: transformY3 };
      default:
        return { x: transformX1, y: transformY1 };
    }
  };

  return (
    <div
      ref={containerRef}
      className={`w-full h-full min-h-96 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="grid grid-cols-3 gap-2 md:gap-3 w-full h-full">
        {images.slice(0, 15).map((src, index) => {
          const depth = (index % 3) + 1;
          const { x: moveX, y: moveY } = getTransformForDepth(depth);
          
          return (
            <motion.div
              key={index}
              className="relative w-full aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden"
              style={{
                x: moveX,
                y: moveY,
              }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <img
                src={src}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index < 12 ? "eager" : "lazy"}
                onError={(e) => {
                  console.warn(`Image failed to load: ${src}`);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
