"use client";

import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { blurUp, dividerGrow } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import { testimonialsES, testimonialsEN } from "@/lib/testimonials-data";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function Testimonials() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const testimonials = language === 'es' ? testimonialsES : testimonialsEN;
  
  // Show only first 3 testimonials for SSR consistency
  const visibleTestimonials = testimonials.slice(0, 3);

  return (
    <section id="testimonios" className="section section-surface testimonials-section" ref={ref} style={{ scrollMarginTop: "80px" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              <span className="badge badge-surface">{t.testimonials.badge}</span>
            </motion.div>
            <h2 className="heading-lg mb-4">
              <span className="text-gradient">{t.testimonials.title}</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t.testimonials.subtitle}
            </p>
          </div>

          {/* Cards Grid - Static for SSR consistency */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Card with glassmorphism */}
                <div
                  className="testimonial-card relative overflow-hidden rounded-2xl p-6 md:p-8 h-full flex flex-col"
                  style={{
                    minHeight: '320px',
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

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Stars */}
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-yellow-400"
                          fill="currentColor"
                        />
                      ))}
                    </div>

                    {/* Testimonial text */}
                    <blockquote className="text-gray-300 mb-6 flex-grow">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author info */}
                    <div className="mt-auto">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: testimonial.avatarBg }}
                        >
                          <span className="text-white font-semibold text-sm">
                            {testimonial.initials}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            {testimonial.role}
                          </div>
                          {testimonial.company && (
                            <div className="text-xs text-gray-500">
                              {testimonial.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Decorative divider */}
          <motion.div
            variants={dividerGrow}
            className="divider-gold mt-16"
          />
        </motion.div>
      </div>
    </section>
  );
}
