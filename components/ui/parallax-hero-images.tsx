"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxHeroImagesProps {
  images: string[];
  className?: string;
}

export function ParallaxHeroImages({ images, className = "" }: ParallaxHeroImagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Create transforms for each image position (outside of map to follow hooks rules)
  const transforms = images.map((_, index) => {
    const depth = (index % 3) + 1;
    return {
      x: useTransform(springX, (value) => value * depth * 15),
      y: useTransform(springY, (value) => value * depth * 15),
    };
  });

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
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Grid of images with individual parallax */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 w-full h-full">
        {images.map((src, index) => (
          <motion.div
            key={`${src}-${index}`}
            className="relative rounded-lg overflow-hidden group cursor-pointer"
            style={{
              aspectRatio: "1/1",
              border: "1px solid rgba(167,139,250,0.12)",
              backgroundColor: "rgba(19,18,27,0.6)",
            }}
            whileHover={{ 
              scale: 1.05,
              borderColor: "rgba(167,139,250,0.3)",
              backgroundColor: "rgba(19,18,27,0.8)",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {/* Individual parallax layer for each image */}
            <motion.div
              className="absolute inset-0"
              style={{
                x: transforms[index]?.x || 0,
                y: transforms[index]?.y || 0,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 30,
              }}
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
                draggable={false}
                style={{
                  filter: isHovered ? "brightness(1.1)" : "brightness(1)",
                  transition: "filter 0.3s ease",
                }}
              />
            </motion.div>
            
            {/* Hover overlay */}
            <motion.div 
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <div className="text-white text-center">
                <div className="text-xs font-semibold">Image {index + 1}</div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
