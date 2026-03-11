"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface LoadingProgressProps {
  isLoading?: boolean;
  progress?: number;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'line' | 'circle' | 'dots';
}

export function LoadingProgress({
  isLoading = true,
  progress,
  showPercentage = false,
  size = 'md',
  variant = 'line'
}: LoadingProgressProps) {
  const [currentProgress, setCurrentProgress] = useState(0);

  // Animate progress
  useEffect(() => {
    if (progress !== undefined) {
      const timer = setTimeout(() => {
        setCurrentProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  // Auto-progress if no progress provided
  useEffect(() => {
    if (progress === undefined && isLoading) {
      const interval = setInterval(() => {
        setCurrentProgress(prev => {
          const next = prev + Math.random() * 15;
          return next >= 95 ? 95 : next;
        });
      }, 200);

      return () => clearInterval(interval);
    } else if (!isLoading && progress === undefined) {
      setCurrentProgress(100);
    }
  }, [isLoading, progress]);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const dotSizes = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  if (!isLoading && currentProgress >= 100) {
    return null;
  }

  if (variant === 'circle') {
    return (
      <div className="flex flex-col items-center gap-2">
        <motion.div
          className="relative"
          style={{ width: size === 'sm' ? 32 : size === 'md' ? 48 : 64 }}
        >
          <svg
            className="transform -rotate-90"
            width={size === 'sm' ? 32 : size === 'md' ? 48 : 64}
            height={size === 'sm' ? 32 : size === 'md' ? 48 : 64}
          >
            <circle
              cx="50%"
              cy="50%"
              r={size === 'sm' ? 14 : size === 'md' ? 20 : 28}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
              fill="none"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r={size === 'sm' ? 14 : size === 'md' ? 20 : 28}
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${2 * Math.PI * (size === 'sm' ? 14 : size === 'md' ? 20 : 28)}`}
              strokeDashoffset={`${2 * Math.PI * (size === 'sm' ? 14 : size === 'md' ? 20 : 28) * (1 - currentProgress / 100)}`}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7C6BC4" />
                <stop offset="100%" stopColor="#C87B5A" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            {showPercentage && (
              <span className="text-xs font-medium text-white">
                {Math.round(currentProgress)}%
              </span>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={`${dotSizes[size]} rounded-full bg-gradient-to-r from-violet-500 to-amber-500`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
        {showPercentage && (
          <span className="text-sm text-gray-400 ml-2">
            {Math.round(currentProgress)}%
          </span>
        )}
      </div>
    );
  }

  // Line variant (default)
  return (
    <div className="w-full">
      <div className={`relative ${sizeClasses[size]} bg-gray-800/30 rounded-full overflow-hidden`}>
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-500 to-amber-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${currentProgress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-400/50 to-amber-400/50 rounded-full"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: "100%" }}
        />
      </div>
      {showPercentage && (
        <div className="mt-2 text-center">
          <span className="text-sm text-gray-400">
            {Math.round(currentProgress)}%
          </span>
        </div>
      )}
    </div>
  );
}

// Global loading progress for page navigation
export function GlobalLoadingProgress() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
      setProgress(0);
    };

    const handleProgress = (newProgress: number) => {
      setProgress(newProgress);
    };

    const handleComplete = () => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 500);
    };

    // Listen to Next.js route events
    if (typeof window !== 'undefined') {
      // @ts-ignore - Next.js internal events
      window.addEventListener('routeChangeStart', handleStart);
      // @ts-ignore
      window.addEventListener('routeChangeComplete', handleComplete);
      // @ts-ignore
      window.addEventListener('routeChangeError', handleComplete);
    }

    return () => {
      if (typeof window !== 'undefined') {
        // @ts-ignore
        window.removeEventListener('routeChangeStart', handleStart);
        // @ts-ignore
        window.removeEventListener('routeChangeComplete', handleComplete);
        // @ts-ignore
        window.removeEventListener('routeChangeError', handleComplete);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-md mx-auto">
            <LoadingProgress 
              progress={progress} 
              showPercentage={false}
              variant="line"
              size="sm"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Loading spinner for buttons and small elements
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <motion.div
      className={sizeClasses[size]}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <Loader2 size="100%" className="text-violet-500" />
    </motion.div>
  );
}
