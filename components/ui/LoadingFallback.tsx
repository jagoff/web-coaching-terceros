"use client";

import { motion } from "framer-motion";

interface LoadingFallbackProps {
  height?: string;
  className?: string;
}

export default function LoadingFallback({ 
  height = "400px", 
  className = "" 
}: LoadingFallbackProps) {
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ height }}
    >
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full"
            style={{ 
              backgroundColor: "var(--gold-primary)",
              y: 0 
            }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
