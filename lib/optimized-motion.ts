// Optimized framer-motion imports for tree-shaking
// This reduces bundle size by only importing used components

import {
  // Core animation components
  motion,
  AnimatePresence,
  
  // Hooks
  useScroll,
  useTransform,
  useInView,
  useAnimation,
  useReducedMotion,
  
  // Types
  type Variants,
  type Transition,
  type MotionValue,
  
  // Utilities
  isValidMotionProp,
  resolveMotionValue,
} from 'framer-motion';

// Export optimized imports
export {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useAnimation,
  useReducedMotion,
};

export type {
  Variants,
  Transition,
  MotionValue,
};

// Re-export commonly used utilities
export { isValidMotionProp, resolveMotionValue };

// Default export for convenience
export default motion;
