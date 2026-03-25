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

  // Create fixed number of transforms for each depth level (outside of map)
  const transformX1 = useTransform(springX, (value) => value * 1 * 8);
  const transformY1 = useTransform(springY, (value) => value * 1 * 8);
  const transformX2 = useTransform(springX, (value) => value * 2 * 8);
  const transformY2 = useTransform(springY, (value) => value * 2 * 8);
  const transformX3 = useTransform(springX, (value) => value * 3 * 8);
  const transformY3 = useTransform(springY, (value) => value * 3 * 8);

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
      className={`relative w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Grid of images with individual parallax */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 w-full h-full">
        {images.map((src, index) => {
          const depth = (index % 3) + 1;
          const { x: moveX, y: moveY } = getTransformForDepth(depth);
          
          return (
            <motion.div
              key={`${src}-${index}`}
              className="relative rounded-lg overflow-hidden group cursor-pointer"
              style={{
                aspectRatio: "1/1",
                border: "1px solid rgba(167,139,250,0.12)",
                backgroundColor: "rgba(19,18,27,0.6)",
                x: moveX,
                y: moveY,
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
          );
        })}
      </div>
    </div>
  );
}
