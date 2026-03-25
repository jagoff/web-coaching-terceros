"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

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
  const transformX1 = useTransform(springX, (value) => value * 3);
  const transformY1 = useTransform(springY, (value) => value * 3);
  const transformX2 = useTransform(springX, (value) => value * 6);
  const transformY2 = useTransform(springY, (value) => value * 6);
  const transformX3 = useTransform(springX, (value) => value * 9);
  const transformY3 = useTransform(springY, (value) => value * 9);

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
      className={`relative w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Simple grid layout - no nested positioning */}
      <div className="grid grid-cols-3 md:grid-cols-4 gap-1 w-full h-full p-1">
        {images.map((src, index) => {
          const depth = (index % 3) + 1;
          const { x: moveX, y: moveY } = getTransformForDepth(depth);
          
          return (
            <motion.div
              key={index}
              className="relative overflow-hidden bg-gray-800 rounded"
              style={{
                x: moveX,
                y: moveY,
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <div className="relative w-full h-full" style={{ paddingBottom: "100%" }}>
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                  draggable={false}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
