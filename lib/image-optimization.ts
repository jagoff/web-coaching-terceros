// Manifiesto de imágenes optimizadas
import { useState, useRef, useEffect } from "react";

export interface ImageManifest {
  generated: string;
  format: string;
  quality: number;
  images: ImageInfo[];
}

export interface ImageInfo {
  original: string;
  webp: string;
  size: number;
  optimized: boolean;
}

// Función para obtener la versión optimizada de una imagen
export function getOptimizedImagePath(originalPath: string, preferWebP = true): {
  src: string;
  webpSrc?: string;
  fallbackSrc: string;
} {
  // Mapeo manual de imágenes optimizadas (basado en el manifiesto generado)
  const optimizedMap: Record<string, { webp: string; original: string }> = {
    "/images/carousel/slide-01.png": {
      webp: "/images/carousel/slide-01.webp",
      original: "/images/carousel/slide-01.png"
    },
    "/images/carousel/slide-02.png": {
      webp: "/images/carousel/slide-02.webp", 
      original: "/images/carousel/slide-02.png"
    },
    "/images/carousel/slide-03.png": {
      webp: "/images/carousel/slide-03.webp",
      original: "/images/carousel/slide-03.png"
    },
    "/images/carousel/slide-04.png": {
      webp: "/images/carousel/slide-04.webp",
      original: "/images/carousel/slide-04.png"
    },
    "/images/carousel/slide-05.png": {
      webp: "/images/carousel/slide-05.webp",
      original: "/images/carousel/slide-05.png"
    },
    "/images/carousel/slide-06.png": {
      webp: "/images/carousel/slide-06.webp",
      original: "/images/carousel/slide-06.png"
    },
    "/images/carousel/slide-07.png": {
      webp: "/images/carousel/slide-07.webp",
      original: "/images/carousel/slide-07.png"
    },
    "/images/carousel/slide-08.png": {
      webp: "/images/carousel/slide-08.webp",
      original: "/images/carousel/slide-08.png"
    },
    "/images/carousel/slide-09.png": {
      webp: "/images/carousel/slide-09.webp",
      original: "/images/carousel/slide-09.png"
    },
    "/images/carousel/slide-10.png": {
      webp: "/images/carousel/slide-10.webp",
      original: "/images/carousel/slide-10.png"
    },
    "/images/carousel/slide-11.png": {
      webp: "/images/carousel/slide-11.webp",
      original: "/images/carousel/slide-11.png"
    },
    "/images/carousel/slide-12.png": {
      webp: "/images/carousel/slide-12.webp",
      original: "/images/carousel/slide-12.png"
    },
        "/images/ui/this-is-fine-meme.png": {
      webp: "/images/ui/this-is-fine-meme.webp",
      original: "/images/ui/this-is-fine-meme.png"
    },
    "/images/ui/logo.png": {
      webp: "/images/ui/logo.webp",
      original: "/images/ui/logo.png"
    },
    "/images/ui/profile.png": {
      webp: "/images/ui/profile.webp",
      original: "/images/ui/profile.png"
    },
    "/images/about/team-autonomy-process.png": {
      webp: "/images/about/team-autonomy-process.webp",
      original: "/images/about/team-autonomy-process.png"
    },
    "/images/opengraph.png": {
      webp: "/images/opengraph.webp",
      original: "/images/opengraph.png"
    }
  };

  const optimized = optimizedMap[originalPath];
  
  if (optimized) {
    return {
      src: preferWebP ? optimized.webp : optimized.original,
      webpSrc: optimized.webp,
      fallbackSrc: optimized.original
    };
  }

  // Si no está optimizada, retornar la original
  return {
    src: originalPath,
    fallbackSrc: originalPath
  };
}

// Hook para lazy loading de imágenes
export function useLazyImage(src: string, options?: { threshold?: number; rootMargin?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: options?.threshold ?? 0.01,
        rootMargin: options?.rootMargin ?? "200px"
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  return {
    ref: imgRef,
    isLoaded,
    isInView,
    hasError,
    setIsLoaded,
    setHasError
  };
}
