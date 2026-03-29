"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { headerStagger, blurUp, dividerGrow } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";

const clientLogos = [
  { id: 1, name: "Google" },
  { id: 2, name: "Microsoft" },
  { id: 3, name: "Amazon" },
  { id: 4, name: "Meta" },
  { id: 5, name: "Apple" },
  { id: 6, name: "Netflix" },
  { id: 7, name: "Spotify" },
  { id: 8, name: "LinkedIn" },
  { id: 9, name: "Tesla" },
  { id: 10, name: "Salesforce" }
];

export default function Clients() {
  const { t, language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Auto-rotate carousel
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % clientLogos.length);
    }, 3000); // Change every 3 seconds
    
    return () => clearInterval(interval);
  }, [isPaused]);

  // Duplicate logos for infinite scroll effect
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="section py-12 md:py-16 bg-gradient-to-b from-transparent to-[rgba(124,107,196,0.03)]">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="heading-lg mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            {language === 'es' ? 'Mis Clientes' : 'My Clients'}
          </h2>
          <div className="divider-gold mx-auto" />
          <p className="text-secondary mt-4 max-w-2xl mx-auto">
            {language === 'es' 
              ? 'Empresas líderes que confían en mi consultoría para transformar sus equipos y procesos.'
              : 'Leading companies that trust my consulting to transform their teams and processes.'
            }
          </p>
        </motion.div>

        {/* Logo Carousel */}
        <div 
          className="relative overflow-hidden py-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient masks for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--dark-surface)] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--dark-surface)] to-transparent z-10" />

          {/* Animated carousel container */}
          <motion.div
            className="flex space-x-12 md:space-x-16"
            animate={{
              x: isPaused ? 0 : `-${currentSlide * 144}px` // 120px logo + 24px spacing
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}
            style={{
              width: `${duplicatedLogos.length * 144}px` // Total width for smooth animation
            }}
          >
            {duplicatedLogos.map((client, index) => (
              <motion.div
                key={`${client.id}-${index}`}
                className="flex-shrink-0 flex items-center justify-center px-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-2xl font-bold text-text-secondary opacity-60 hover:opacity-100 transition-all duration-300">
                  {client.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Subtle text below carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-xs text-secondary opacity-60">
            {language === 'es' 
              ? 'Colaboramos con empresas de diversos sectores para impulsar su crecimiento'
              : 'We collaborate with companies from various sectors to drive their growth'
            }
          </p>
        </motion.div>
      </div>
    </section>
  );
}
