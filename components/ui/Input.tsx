"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InputProps {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "default" | "glass";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  className,
  label,
  error,
  helperText,
  variant = "default",
  size = "md",
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur
}) => {
    const baseClasses = "w-full px-4 py-3 rounded-xl border transition-all duration-300 placeholder-gray-400 focus:outline-none focus:ring-2";
    
    const variants = {
      default: {
        container: "space-y-2",
        input: "bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 text-gray-900"
      },
      glass: {
        container: "space-y-2",
        input: "bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder-gray-400 focus:border-cyan-400/50 focus:ring-cyan-400/20"
      }
    };
    
    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-5 py-4 text-lg"
    };

    const errorClasses = error ? "border-red-400/50 bg-red-400/5 focus:border-red-500 focus:ring-red-500/20" : "";
    const successClasses = value && !error ? "border-green-400/50 bg-green-400/5 focus:border-green-500 focus:ring-green-500/20" : "";

    return (
      <div className={variants[variant].container}>
        {label && (
          <label className="text-base font-semibold text-white flex items-center gap-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          <motion.input
            className={cn(
              baseClasses,
              variants[variant].input,
              sizes[size],
              errorClasses,
              successClasses,
              className
            )}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
          
          {value && !error && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-3 top-3 text-green-400"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </motion.div>
          )}
        </div>
        
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </motion.p>
        )}
        
        {helperText && !error && (
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {helperText}
          </p>
        )}
      </div>
    );
  };

Input.displayName = "Input";

export { Input };
export type { InputProps };
