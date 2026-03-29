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
    
    // Generate particles with deterministic random
    const count = isMobile ? 5 : particleCount;
    const animations = ['particle-float-up', 'particle-float-diagonal', 'particle-pulse'];
    
    // Deterministic random function to avoid hydration mismatches
    const deterministicRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: deterministicRandom(i) * 100,
      y: deterministicRandom(i + 100) * 100,
      animation: animations[Math.floor(deterministicRandom(i + 200) * animations.length)],
      delay: deterministicRandom(i + 300) * 5,
      duration: 15 + deterministicRandom(i + 400) * 10,
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
