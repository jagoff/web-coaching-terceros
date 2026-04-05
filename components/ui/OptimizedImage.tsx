"use client";

import Image, { ImageProps } from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import devLog from '@/lib/dev-logger';

interface OptimizedImageProps extends Omit<ImageProps, 'src' | 'onLoad' | 'onError'> {
  src: string;
  webpSrc?: string;
  fallbackSrc?: string;
  lazy?: boolean;
  priority?: boolean;
  onLoadCallback?: () => void;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export default function OptimizedImage({
  src,
  webpSrc,
  fallbackSrc,
  lazy = true,
  priority = false,
  onLoadCallback,
  placeholder = "empty",
  blurDataURL,
  className = "",
  alt,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Lazy loading con Intersection Observer
  useEffect(() => {
    if (!lazy || priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px", // Reduced from 200px to 50px for faster loading
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority, isInView]);

  // Generar blur placeholder
  const generateBlurDataURL = (width: number, height: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, width, height);
    }
    return canvas.toDataURL();
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoadCallback?.();
  };

  const handleError = () => {
    setHasError(true);
    devLog.warn(`Failed to load image: ${src}`);
  };

  // Determinar qué fuente usar
  const getImageSrc = () => {
    if (hasError && fallbackSrc) return fallbackSrc;
    
    // Soporte para WebP con fallback (solo en cliente)
    const supportsWebP = typeof window !== 'undefined' && 
      (window.navigator?.userAgent?.includes('Chrome') || 
       window.navigator?.userAgent?.includes('Firefox'));
    
    if (supportsWebP && webpSrc && !hasError) return webpSrc;
    return src;
  };

  // Placeholder mientras carga
  if (!isInView && lazy) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-800/50 animate-pulse ${className}`}
        style={{
          width: props.width,
          height: props.height,
          ...props.style
        }}
        aria-label={alt}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder de blur */}
      {placeholder === "blur" && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-800/50 backdrop-blur-sm"
          style={{
            backgroundImage: blurDataURL ? `url(${blurDataURL})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}
      
      {/* Imagen optimizada */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 1.05
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full h-full"
      >
        <Image
          src={getImageSrc()}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          priority={priority}
          quality={75}
          unoptimized={true} // Required for static export
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          className={`transition-opacity duration-400 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ width: '100%', height: '100%', ...props.style }}
          {...props}
        />
      </motion.div>
      
      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/30">
          <div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
          <div className="text-center text-gray-400">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-sm">Error al cargar imagen</p>
          </div>
        </div>
      )}
    </div>
  );
}
