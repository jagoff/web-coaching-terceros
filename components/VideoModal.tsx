"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, Youtube } from "lucide-react";

const modalVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const contentVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};

interface VideoModalProps {
  videoId: string;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ videoId, title = "Video", isOpen, onClose }: VideoModalProps) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1&playsinline=1`;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
        onClick={onClose}
      >
        <motion.div
          variants={contentVariants}
          className="relative w-full max-w-5xl"
          style={{ aspectRatio: "16/9" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="absolute -top-12 right-0 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          >
            <X size={24} className="text-white" />
          </motion.button>

          {/* YouTube iframe */}
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full rounded-lg shadow-2xl"
            style={{
              border: "none",
              borderRadius: "0.75rem",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />

          {/* YouTube badge */}
          <div className="absolute -bottom-12 left-0">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
              <Youtube size={16} className="text-red-500" />
              <span className="text-xs text-white font-medium">YouTube</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
