"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedFlameProps {
  size?: number;
  className?: string;
}

export default function AnimatedFlame({ size = 16, className = "" }: AnimatedFlameProps) {
  const [currentColor, setCurrentColor] = useState("#FFD700");
  const [currentScale, setCurrentScale] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);
  const animationTimeout = useRef<NodeJS.Timeout | null>(null);

  // Paleta de colores para diferentes movimientos
  const colorPalette = [
    "#FFD700", // Amarillo oro
    "#FFA500", // Naranja estándar
    "#FF8C00", // Naranja oscuro
    "#FF7F50", // Coral
    "#FF4500", // Naranja rojo
    "#FF6347", // Tomate
    "#FFB347", // Naranja claro
    "#FF8C69", // Salmon claro
    "#FFA07A", // Salmon
    "#FF7F50", // Coral otra vez
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      const deltaX = currentX - lastMouseX.current;
      const deltaY = currentY - lastMouseY.current;
      
      // Detectar movimiento significativo
      const movement = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (movement > 15) {
        // Cancelar animación anterior
        if (animationTimeout.current) {
          clearTimeout(animationTimeout.current);
        }
        
        // Calcular dirección y velocidad
        const direction = Math.atan2(deltaY, deltaX);
        const speed = Math.min(movement / 100, 1);
        
        // Seleccionar color basado en la dirección del movimiento
        const colorIndex = Math.floor(((direction + Math.PI) / (2 * Math.PI)) * colorPalette.length);
        const newColor = colorPalette[Math.abs(colorIndex) % colorPalette.length];
        
        // Calcular escala basada en la velocidad
        const newScale = 0.8 + (speed * 0.4); // Entre 0.8 y 1.2
        
        // Aplicar nueva animación
        setCurrentColor(newColor);
        setCurrentScale(newScale);
        setIsAnimating(true);
        
        // Resetear animación después de completar
        animationTimeout.current = setTimeout(() => {
          setIsAnimating(false);
          setCurrentScale(1);
        }, 600);
        
        lastMouseX.current = currentX;
        lastMouseY.current = currentY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationTimeout.current) {
        clearTimeout(animationTimeout.current);
      }
    };
  }, []);

  return (
    <motion.div
      className={`inline-block ${className}`}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          scale: isAnimating ? [currentScale, currentScale * 1.15, currentScale * 0.95, currentScale * 1.05, currentScale] : 1,
          rotate: isAnimating ? [-3, 5, -2, 1, 0] : 0,
          filter: isAnimating 
            ? [
                `blur(0.3px) drop-shadow(0 0 2px ${currentColor})`, 
                `blur(0.5px) drop-shadow(0 0 4px ${currentColor})`, 
                `blur(0.3px) drop-shadow(0 0 2px ${currentColor})`,
                `blur(0.4px) drop-shadow(0 0 3px ${currentColor})`,
                `blur(0.3px) drop-shadow(0 0 2px ${currentColor})`
              ]
            : `blur(0.3px) drop-shadow(0 0 2px ${currentColor})`,
        }}
        transition={{
          duration: 0.5,
          ease: [0.68, -0.55, 0.265, 1.55], // Easing elástico
          times: [0, 0.2, 0.4, 0.7, 1], // Timing para efecto rebote
        }}
      >
        <motion.path
          d="M12 2C12 2 8 6 8 11C8 14 10 16 12 16C14 16 16 14 16 11C16 6 12 2 12 2Z"
          fill={currentColor}
          animate={{
            fill: isAnimating ? [currentColor, "#FF4500", "#FFD700", "#FF4500", currentColor] : currentColor,
            scale: isAnimating ? [1, 1.1, 0.9, 1.05, 1] : 1,
          }}
          transition={{
            duration: 0.5,
            ease: [0.68, -0.55, 0.265, 1.55], // Mismo easing elástico
            times: [0, 0.2, 0.4, 0.7, 1],
          }}
        />
        <motion.path
          d="M12 7C12 7 10 9 10 11C10 12.5 11 13.5 12 13.5C13 13.5 14 12.5 14 11C14 9 12 7 12 7Z"
          fill="#FFA500"
          opacity={0.8}
          animate={{
            opacity: isAnimating ? [0.8, 1.1, 0.7, 1.05, 0.8] : 0.8,
            scale: isAnimating ? [1, 1.15, 0.85, 1.08, 1] : 1,
          }}
          transition={{
            duration: 0.5,
            ease: [0.68, -0.55, 0.265, 1.55], // Mismo easing elástico
            times: [0, 0.2, 0.4, 0.7, 1],
          }}
        />
        <motion.circle
          cx="12"
          cy="10"
          r="1.5"
          fill="#FFEB3B"
          opacity={0.9}
          animate={{
            opacity: isAnimating ? [0.9, 1.2, 0.8, 1.1, 0.9] : 0.9,
            scale: isAnimating ? [1, 1.2, 0.8, 1.1, 1] : 1,
            r: isAnimating ? [1.5, 1.8, 1.2, 1.6, 1.5] : 1.5,
          }}
          transition={{
            duration: 0.5,
            ease: [0.68, -0.55, 0.265, 1.55], // Mismo easing elástico
            times: [0, 0.2, 0.4, 0.7, 1],
          }}
        />
      </motion.svg>
    </motion.div>
  );
}
