"use client";

import { useEffect, useRef, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleDelay: number;
}

export default function StarfieldBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // Generate stars based on viewport size
    const generateStars = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const starCount = Math.floor((width * height) / 15000); // ~1 star per 15,000px²
      
      const newStars: Star[] = Array.from({ length: starCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5, // 0.5px to 2.5px
        opacity: Math.random() * 0.8 + 0.2, // 0.2 to 1.0
        twinkleSpeed: Math.random() * 3 + 2, // 2s to 5s
        twinkleDelay: Math.random() * 5, // 0s to 5s delay
      }));
      
      setStars(newStars);
    };

    generateStars();
    
    const handleResize = () => {
      generateStars();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 starfield-optimized"
      aria-hidden="true"
      style={{
        background: 'transparent',
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: `radial-gradient(circle, rgba(255, 255, 255, ${star.opacity}) 0%, transparent 70%)`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity * 0.5})`,
            animation: `twinkle ${star.twinkleSpeed}s ease-in-out ${star.twinkleDelay}s infinite`,
            willChange: 'opacity, transform',
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
