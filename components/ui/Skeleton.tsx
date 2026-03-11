import { motion, type Variants } from "framer-motion";

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  lines?: number;
}

const skeletonVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0.4, 0.8, 0.4],
    transition: {
      duration: 1.5,
      ease: [0.4, 0, 0.6, 1],
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
};

export function Skeleton({ 
  className = '', 
  variant = 'text', 
  width, 
  height, 
  lines = 1 
}: SkeletonProps) {
  const baseClasses = "bg-gray-800/50 dark:bg-gray-700/50";
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
    rounded: 'rounded-lg'
  };

  const style = {
    width: width || (variant === 'text' ? '100%' : '40px'),
    height: height || (variant === 'text' ? '1rem' : '40px'),
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }, (_, i) => (
          <motion.div
            key={i}
            className={`${baseClasses} ${variantClasses[variant]}`}
            style={{
              ...style,
              width: i === lines - 1 ? '70%' : '100%' // Last line shorter
            }}
            variants={skeletonVariants}
            initial="hidden"
            animate="visible"
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      variants={skeletonVariants}
      initial="hidden"
      animate="visible"
    />
  );
}

// Preset components for common use cases
export function HeroSkeleton() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto text-center">
      {/* Title skeleton */}
      <Skeleton 
        variant="text" 
        height="3.5rem" 
        width="80%" 
        className="mx-auto"
      />
      
      {/* Subtitle skeleton */}
      <Skeleton 
        variant="text" 
        height="1.5rem" 
        width="60%" 
        className="mx-auto"
      />
      
      {/* Description skeleton */}
      <Skeleton variant="text" lines={3} className="mx-auto max-w-2xl" />
      
      {/* CTA buttons skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Skeleton 
          variant="rounded" 
          width="200px" 
          height="3rem"
        />
        <Skeleton 
          variant="rectangular" 
          width="180px" 
          height="3rem"
        />
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12 lg:gap-16">
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="text-center">
          <Skeleton 
            variant="text" 
            height="3rem" 
            width="100px" 
            className="mx-auto mb-2"
          />
          <Skeleton 
            variant="text" 
            height="1rem" 
            width="120px" 
            className="mx-auto"
          />
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="glass-card p-6 sm:p-8">
      <Skeleton 
        variant="text" 
        height="1.5rem" 
        width="70%" 
        className="mb-4"
      />
      <Skeleton variant="text" lines={3} className="mb-6" />
      <Skeleton 
        variant="rounded" 
        width="120px" 
        height="2.5rem"
      />
    </div>
  );
}

export function FooterSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Brand section */}
      <div className="lg:col-span-2">
        <Skeleton 
          variant="text" 
          height="2rem" 
          width="80px" 
          className="mb-4"
        />
        <Skeleton variant="text" lines={3} className="mb-6" />
        <div className="flex gap-4">
          <Skeleton variant="circular" width="40px" height="40px" />
          <Skeleton variant="circular" width="40px" height="40px" />
        </div>
      </div>
      
      {/* Navigation sections */}
      <div>
        <Skeleton 
          variant="text" 
          height="1rem" 
          width="100px" 
          className="mb-4"
        />
        <div className="space-y-3">
          {Array.from({ length: 5 }, (_, i) => (
            <Skeleton key={i} variant="text" height="1rem" width="80px" />
          ))}
        </div>
      </div>
      
      <div>
        <Skeleton 
          variant="text" 
          height="1rem" 
          width="100px" 
          className="mb-4"
        />
        <div className="space-y-3">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} variant="text" height="1rem" width="100px" />
          ))}
        </div>
      </div>
    </div>
  );
}
