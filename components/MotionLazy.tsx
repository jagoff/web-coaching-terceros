"use client";

/**
 * Lazy-loaded framer-motion wrapper
 * Reduces initial bundle size by deferring motion imports
 */

import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

// Lazy load framer-motion components
export const motion = {
  div: dynamic(() => import('framer-motion').then(mod => mod.motion.div), {
    ssr: true,
  }) as any,
  section: dynamic(() => import('framer-motion').then(mod => mod.motion.section), {
    ssr: true,
  }) as any,
  button: dynamic(() => import('framer-motion').then(mod => mod.motion.button), {
    ssr: true,
  }) as any,
  span: dynamic(() => import('framer-motion').then(mod => mod.motion.span), {
    ssr: true,
  }) as any,
  h1: dynamic(() => import('framer-motion').then(mod => mod.motion.h1), {
    ssr: true,
  }) as any,
  h2: dynamic(() => import('framer-motion').then(mod => mod.motion.h2), {
    ssr: true,
  }) as any,
  h3: dynamic(() => import('framer-motion').then(mod => mod.motion.h3), {
    ssr: true,
  }) as any,
  p: dynamic(() => import('framer-motion').then(mod => mod.motion.p), {
    ssr: true,
  }) as any,
  ul: dynamic(() => import('framer-motion').then(mod => mod.motion.ul), {
    ssr: true,
  }) as any,
  li: dynamic(() => import('framer-motion').then(mod => mod.motion.li), {
    ssr: true,
  }) as any,
  a: dynamic(() => import('framer-motion').then(mod => mod.motion.a), {
    ssr: true,
  }) as any,
  form: dynamic(() => import('framer-motion').then(mod => mod.motion.form), {
    ssr: true,
  }) as any,
};

export { AnimatePresence } from 'framer-motion';
export type { Variants } from 'framer-motion';
