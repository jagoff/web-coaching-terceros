import { Suspense } from 'react';
import { motion, type Variants } from 'framer-motion';
import { 
  Skeleton, 
  HeroSkeleton, 
  StatsSkeleton, 
  CardSkeleton, 
  FooterSkeleton 
} from './Skeleton';

interface SuspenseWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  type?: 'hero' | 'stats' | 'card' | 'footer' | 'default';
  className?: string;
}

const fallbackVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export function SuspenseWrapper({ 
  children, 
  fallback, 
  type = 'default', 
  className = '' 
}: SuspenseWrapperProps) {
  const getDefaultFallback = () => {
    switch (type) {
      case 'hero':
        return <HeroSkeleton />;
      case 'stats':
        return <StatsSkeleton />;
      case 'card':
        return <CardSkeleton />;
      case 'footer':
        return <FooterSkeleton />;
      default:
        return <Skeleton variant="text" lines={3} />;
    }
  };

  return (
    <Suspense 
      fallback={
        <motion.div
          variants={fallbackVariants}
          initial="hidden"
          animate="visible"
          className={className}
        >
          {fallback || getDefaultFallback()}
        </motion.div>
      }
    >
      {children}
    </Suspense>
  );
}

// Specialized wrappers for common patterns
export function HeroSuspense({ children }: { children: React.ReactNode }) {
  return (
    <SuspenseWrapper type="hero" className="min-h-screen flex items-center justify-center">
      {children}
    </SuspenseWrapper>
  );
}

export function StatsSuspense({ children }: { children: React.ReactNode }) {
  return (
    <SuspenseWrapper type="stats" className="py-20">
      {children}
    </SuspenseWrapper>
  );
}

export function CardSuspense({ children }: { children: React.ReactNode }) {
  return (
    <SuspenseWrapper type="card">
      {children}
    </SuspenseWrapper>
  );
}

export function FooterSuspense({ children }: { children: React.ReactNode }) {
  return (
    <SuspenseWrapper type="footer">
      {children}
    </SuspenseWrapper>
  );
}
