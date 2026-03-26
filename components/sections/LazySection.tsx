"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

const LoadingFallback = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center justify-center min-h-[200px]"
  >
    <div className="animate-pulse text-center">
      <div className="w-8 h-8 mx-auto mb-4 border-2 border-gold-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-muted">Cargando...</p>
    </div>
  </motion.div>
);

export default function LazySection({ children, fallback = <LoadingFallback />, className = "" }: LazySectionProps) {
  return (
    <div className={className}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </div>
  );
}

// HOC for making any component lazy
export function lazyLoad<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) {
  const LazyComponent = dynamic(importFunc, {
    loading: () => fallback || <LoadingFallback />,
    ssr: false
  });
  
  return LazyComponent;
}
