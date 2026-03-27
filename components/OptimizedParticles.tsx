"use client";

import { useEffect, useRef, useState } from "react";
import "@/styles/particles.css";

interface Particle {
  id: number;
  x: number;
  y: number;
  animation: string;
  delay: number;
  duration: number;
}

interface OptimizedParticlesProps {
  particleCount?: number;
  className?: string;
}

export default function OptimizedParticles({ 
  particleCount = 15, 
  className = "" 
}: OptimizedParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    setIsMobile(window.innerWidth < 768);
    
    // Generate particles
    const count = isMobile ? 5 : particleCount;
    const animations = ['particle-float-up', 'particle-float-diagonal', 'particle-pulse'];
    
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      animation: animations[Math.floor(Math.random() * animations.length)],
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
    }));

    setParticles(newParticles);
  }, [particleCount, isMobile]);

  return (
    <div 
      ref={containerRef}
      className={`particles-container ${className}`}
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `${particle.animation} ${particle.duration}s infinite linear`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
