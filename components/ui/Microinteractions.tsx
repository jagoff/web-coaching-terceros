"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight, Heart, Star, Sparkles } from 'lucide-react';

// Enhanced button with microinteractions
export function InteractiveButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    onClick?.();
  };

  const baseClasses = "relative overflow-hidden transition-all duration-200";
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary", 
    ghost: "p-2 rounded-lg hover:bg-gray-800/20 dark:hover:bg-gray-200/20"
  };

  const sizeClasses = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2", 
    lg: "text-lg px-6 py-3"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {/* Ripple effect */}
      {isClicked && (
        <motion.span
          className="absolute inset-0 bg-white/20 rounded-inherit"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && <motion.div
          initial={{ x: -5 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {icon}
        </motion.div>}
        {children}
        {variant === 'primary' && (
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: isClicked ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight size={16} />
          </motion.div>
        )}
      </span>
    </motion.button>
  );
}

// Floating action button with microinteractions
export function FloatingActionButton({
  icon,
  onClick,
  position = 'bottom-right',
  badge,
  tooltip,
  ...props
}: {
  icon: React.ReactNode;
  onClick: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  badge?: number | string;
  tooltip?: string;
  [key: string]: any;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  return (
    <motion.div
      className={`fixed ${positionClasses[position]} z-40`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.button
        className="relative w-14 h-14 bg-gradient-to-r from-violet-500 to-amber-500 rounded-full shadow-lg flex items-center justify-center text-white"
        onClick={onClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ rotate: 15 }}
        {...props}
      >
        {/* Badge */}
        {badge && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {badge}
          </motion.div>
        )}

        {/* Icon */}
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>

        {/* Tooltip */}
        {tooltip && isHovered && (
          <motion.div
            className="absolute bottom-full mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {tooltip}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
            </div>
          </motion.div>
        )}
      </motion.button>
    </motion.div>
  );
}

// Interactive card with hover effects
export function InteractiveCard({
  children,
  onClick,
  className = '',
  hoverEffect = 'lift',
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'slide';
  [key: string]: any;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const hoverVariants = {
    lift: {
      y: -8,
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
    },
    glow: {
      boxShadow: "0 0 30px rgba(124,107,196,0.5)"
    },
    scale: {
      scale: 1.02
    },
    slide: {
      x: 8
    }
  };

  return (
    <motion.div
      className={`glass-card cursor-pointer ${className}`}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={hoverVariants[hoverEffect]}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {/* Shimmer effect on hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
          initial={{ x: -100 }}
          animate={{ x: 200 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      )}
      
      {children}
    </motion.div>
  );
}

// Social proof with animations
export function AnimatedSocialProof({
  text,
  icon,
  delay = 0
}: {
  text: string;
  icon: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      className="flex items-center gap-3 p-3 bg-gray-800/20 rounded-lg"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay }}
      >
        {icon}
      </motion.div>
      <motion.span
        className="text-sm text-gray-300"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, delay }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
}

// Interactive rating component
export function InteractiveRating({
  value,
  onChange,
  max = 5,
  size = 'md',
  readonly = false
}: {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}) {
  const [hoverValue, setHoverValue] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const isActive = starValue <= (hoverValue || value);
        
        return (
          <motion.button
            key={i}
            type="button"
            disabled={readonly}
            className={`${sizeClasses[size]} transition-colors duration-200 ${
              isActive ? 'text-amber-500' : 'text-gray-600'
            } ${!readonly && 'cursor-pointer hover:scale-110'}`}
            onClick={() => onChange?.(starValue)}
            onHoverStart={() => !readonly && setHoverValue(starValue)}
            onHoverEnd={() => !readonly && setHoverValue(0)}
            whileHover={!readonly ? { scale: 1.2, rotate: 15 } : {}}
            whileTap={!readonly ? { scale: 0.9 } : {}}
          >
            <Star size="100%" fill={isActive ? 'currentColor' : 'none'} />
          </motion.button>
        );
      })}
    </div>
  );
}

// Floating particles background
export function FloatingParticles() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-violet-500/30 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            scale: Math.random() * 2 + 0.5
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Pulse animation for important elements
export function Pulse({
  children,
  className = '',
  color = 'violet'
}: {
  children: React.ReactNode;
  className?: string;
  color?: 'violet' | 'amber' | 'green' | 'red';
}) {
  const colorClasses = {
    violet: 'bg-violet-500',
    amber: 'bg-amber-500',
    green: 'bg-green-500',
    red: 'bg-red-500'
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        className={`absolute inset-0 ${colorClasses[color]} rounded-full opacity-75`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.75, 0, 0.75]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
