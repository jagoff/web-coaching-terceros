"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  variant?: "default" | "elevated" | "glass";
  padding?: "sm" | "md" | "lg";
  interactive?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  className,
  variant = "default",
  padding = "md",
  interactive,
  children
}) => {
  const baseClasses = "rounded-xl transition-all duration-300";
  
  const variants = {
    default: "bg-white border border-gray-200",
    elevated: "bg-white border border-gray-200 shadow-lg hover:shadow-xl",
    glass: "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10"
  };
  
  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };

  const interactiveClasses = interactive ? "cursor-pointer hover:scale-[1.02] active:scale-[0.98]" : "";

  return (
    <motion.div
      className={cn(
        baseClasses,
        variants[variant],
        paddings[padding],
        interactiveClasses,
        className
      )}
      whileHover={interactive ? { y: -2 } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
    >
      {children}
    </motion.div>
  );
};

Card.displayName = "Card";

export { Card };
export type { CardProps };
