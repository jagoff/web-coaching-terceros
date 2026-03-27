"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";

// Loading skeleton components
const SectionSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse space-y-4 w-full max-w-4xl mx-auto px-4">
      <div className="h-8 bg-gray-700 rounded w-3/4 mx-auto"></div>
      <div className="h-4 bg-gray-600 rounded w-1/2 mx-auto"></div>
      <div className="h-32 bg-gray-700 rounded"></div>
    </div>
  </div>
);

const CardSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-48 bg-gray-700 rounded-lg mb-4"></div>
    <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-600 rounded w-1/2"></div>
  </div>
);

// Lazy loaded heavy components
export const LazyAmbientParticles = dynamic(
  () => import("@/components/OptimizedParticles").then(mod => ({ default: mod.default })),
  { 
    ssr: false,
    loading: () => null // No loading state for particles
  }
);

export const LazyTestimonials = dynamic(
  () => import("@/components/sections/TestimonialsSimple").then(mod => ({ default: mod.default })),
  { 
    ssr: false,
    loading: () => (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-1 bg-gray-600 rounded w-32 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      </motion.div>
    )
  }
);

export const LazyCaseStudies = dynamic(
  () => import("@/components/sections/CaseStudies").then(mod => ({ default: mod.default })),
  { 
    ssr: false,
    loading: () => (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-1 bg-gray-600 rounded w-32 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      </motion.div>
    )
  }
);

export const LazyResults = dynamic(
  () => import("@/components/sections/Results").then(mod => ({ default: mod.default })),
  { 
    ssr: false,
    loading: () => (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-1 bg-gray-600 rounded w-32 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-16 bg-gray-700 rounded w-16 mx-auto mb-4 animate-pulse"></div>
                <div className="h-4 bg-gray-600 rounded w-24 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    )
  }
);

export const LazyContact = dynamic(
  () => import("@/components/sections/Contact").then(mod => ({ default: mod.default })),
  { 
    ssr: false,
    loading: () => (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-1 bg-gray-600 rounded w-32 mx-auto animate-pulse"></div>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="h-12 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-32 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-700 rounded w-32 mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }
);

// Wrapper component for lazy loading with intersection observer
interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
}

export function LazyWrapper({ 
  children, 
  fallback = <SectionSkeleton />,
  rootMargin = "200px 0px"
}: LazyWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}
