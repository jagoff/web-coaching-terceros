"use client";

import { useState, useEffect, useRef, ReactNode } from 'react';
import devLog from '@/lib/dev-logger';
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh?: () => void | Promise<void>;
}

export default function PullToRefresh({ children, onRefresh }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const maxPullDistance = 80;
  const triggerDistance = 60;

  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        touchStartY = e.touches[0].clientY;
        startY.current = touchStartY;
        setIsPulling(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling || window.scrollY > 0) return;

      const currentY = e.touches[0].clientY;
      const distance = currentY - startY.current;

      if (distance > 0 && distance <= maxPullDistance) {
        setPullDistance(distance);
        // Prevent default scroll when pulling
        if (distance > 10) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = async () => {
      if (pullDistance > triggerDistance && !isRefreshing) {
        setIsRefreshing(true);
        
        try {
          if (onRefresh) {
            await onRefresh();
          } else {
            // Default refresh: reload page
            window.location.reload();
          }
        } catch (error) {
          devLog.error('Refresh error:', error);
        } finally {
          setTimeout(() => {
            setIsRefreshing(false);
            setPullDistance(0);
            setIsPulling(false);
          }, 500);
        }
      } else {
        setPullDistance(0);
        setIsPulling(false);
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPulling, pullDistance, isRefreshing, onRefresh]);

  const pullProgress = Math.min(pullDistance / triggerDistance, 1);
  const rotation = pullProgress * 360;

  return (
    <>
      <AnimatePresence>
        {(isPulling || isRefreshing) && pullDistance > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4"
            style={{
              transform: `translateY(${Math.min(pullDistance - 20, 60)}px)`,
            }}
          >
            <div className="bg-dark-surface/95 backdrop-blur-xl border border-violet-500/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-xl">
              <motion.div
                animate={{
                  rotate: isRefreshing ? 360 : rotation,
                }}
                transition={
                  isRefreshing
                    ? { duration: 1, repeat: Infinity, ease: "linear" }
                    : { duration: 0 }
                }
              >
                <RefreshCw
                  size={20}
                  className={pullProgress >= 1 ? "text-violet-400" : "text-gray-400"}
                />
              </motion.div>
              <span className="text-sm font-medium text-white">
                {isRefreshing
                  ? "Actualizando..."
                  : pullProgress >= 1
                  ? "Suelta para actualizar"
                  : "Desliza para actualizar"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
