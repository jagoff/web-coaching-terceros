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

  // Create transforms for each depth level (outside of map)
  const transformX1 = useTransform(springX, (value) => value * 1 * 20);
  const transformY1 = useTransform(springY, (value) => value * 1 * 20);
  const transformX2 = useTransform(springX, (value) => value * 2 * 20);
  const transformY2 = useTransform(springY, (value) => value * 2 * 20);
  const transformX3 = useTransform(springX, (value) => value * 3 * 20);
  const transformY3 = useTransform(springY, (value) => value * 3 * 20);

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
      {images.map((src, index) => {
        // Different depth levels for parallax effect
        const depth = (index % 3) + 1;
        const { x: moveX, y: moveY } = getTransformForDepth(depth);
        
        // Random initial positions for more dynamic effect
        const initialX = (index % 2 === 0 ? -1 : 1) * (index * 5);
        const initialY = ((index + 1) % 2 === 0 ? -1 : 1) * (index * 3);
        
        return (
          <motion.div
            key={`${src}-${index}`}
            className="absolute inset-0"
            initial={{ 
              x: initialX, 
              y: initialY,
              scale: 0.8 + (index * 0.05),
              opacity: 0.3 + (index * 0.1)
            }}
            animate={{
              x: isHovered ? depth * 20 : 0,
              y: isHovered ? depth * 20 : 0,
              scale: isHovered ? 1.1 : 1,
              opacity: isHovered ? 0.8 : 0.6,
            }}
            style={{
              x: moveX,
              y: moveY,
              zIndex: images.length - index,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 30,
            }}
          >
            <Image
              src={src}
              alt={`Parallax layer ${index + 1}`}
              fill
              className="object-cover"
              draggable={false}
              style={{
                filter: `blur(${index === 0 ? 0 : index * 0.5}px) brightness(${1 - index * 0.1})`,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
