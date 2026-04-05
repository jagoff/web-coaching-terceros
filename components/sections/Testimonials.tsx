"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { headerStagger, blurUp, dividerGrow } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import { testimonialsES, testimonialsEN } from "@/lib/testimonials-data";

const AUTOPLAY_INTERVAL = 6000;

export default function Testimonials() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const testimonials = language === 'es' ? testimonialsES : testimonialsEN;

  // Calculate how many testimonials to show based on screen size
  const getVisibleCount = () => {
    // Always show 1 testimonial at a time
    return 1;
  };

  const [visibleCount, setVisibleCount] = useState(1); // Default to 1 for SSR

  useEffect(() => {
    // Set visible count to 1 (single testimonial mode)
    setVisibleCount(1);
  }, []);

  useEffect(() => {
    // Use deterministic index based on language to prevent hydration mismatch
    const deterministicIndex = language === 'es' ? 0 : 1;
    setCurrentIndex(deterministicIndex);
  }, [language]);

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrentIndex((index + testimonials.length) % testimonials.length);
    },
    [testimonials.length]
  );

  const prev = () => goTo(currentIndex - 1, -1);
  const next = useCallback(() => goTo(currentIndex + 1, 1), [currentIndex, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" as const }
    },
    hover: { 
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section
      id="testimonios"
      className="section section-dark relative overflow-hidden"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(124, 107, 196, 0.1) 0%, transparent 70%)' }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14 md:mb-24"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">{t.testimonials.badge}</span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl mb-4 text-center px-4"
            style={{ 
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            <span className="text-gradient">{t.testimonials.title}</span>
          </motion.h2>
          <motion.div
            variants={dividerGrow}
            className="divider-gold mt-6"
          />
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Cards Grid with Navigation */}
          <div className="flex justify-center relative">
            <AnimatePresence mode="wait">
              {getVisibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${currentIndex}`}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  exit="hidden"
                  transition={{ delay: index * 0.1 }}
                  className="relative max-w-xl w-full"
                >
                  {/* Card with glassmorphism */}
                  <div
                    className="testimonial-card relative overflow-hidden rounded-2xl p-5 md:p-6 h-full flex flex-col"
                    style={{
                      minHeight: '240px',
                      maxHeight: '280px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {/* Quote icon */}
                    <div className="absolute top-4 right-4 opacity-20">
                      <Quote 
                        size={32} 
                        style={{ color: 'var(--gold-primary)' }}
                      />
                    </div>

                    {/* Quote */}
                    <blockquote
                      className="text-xs md:text-xs leading-relaxed flex-1 mb-2"
                      style={{
                        color: "var(--text-secondary)",
                        fontStyle: "italic",
                        lineHeight: 1.8,
                      }}
                    >
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author info */}
                    <div className="flex items-center justify-between mt-auto pb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: testimonial.avatarBg }}
                        >
                          <span
                            className="text-xs font-bold"
                            style={{ color: "var(--amber-light)" }}
                          >
                            {testimonial.initials}
                          </span>
                        </div>
                        <div className="text-left">
                          <p
                            className="font-semibold text-xs md:text-xs"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {testimonial.name}
                          </p>
                          <p 
                            className="text-xs md:text-xs" 
                            style={{ color: "var(--text-muted)" }}
                          >
                            {testimonial.role}
                            {testimonial.company && ` · ${testimonial.company}`}
                          </p>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex gap-1" aria-label="5 estrellas">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            fill="currentColor"
                            style={{ color: 'var(--gold-primary)' }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Hover gradient overlay */}
                    <div 
                      className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-2xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(124, 107, 196, 0.05) 100%)',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
