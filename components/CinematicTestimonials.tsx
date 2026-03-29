"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CinematicTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      name: "María González",
      role: "CTO at StartupTech",
      company: "Buenos Aires",
      content: "Transformó completamente nuestra forma de trabajar. Pasamos de estar apagando incendios a tener procesos escalables.",
      avatar: "👩‍💼"
    },
    {
      name: "Carlos Rodríguez",
      role: "Founder at DevFlow",
      company: "México DF", 
      content: "El coaching de liderazgo me dio las herramientas para construir equipos autónomos que no dependan de mí.",
      avatar: "👨‍💻"
    },
    {
      name: "Ana Martínez",
      role: "Engineering Manager",
      company: "Santiago de Chile",
      content: "La consultoría ágil nos permitió triplicar nuestra velocidad de entrega sin sacrificar calidad.",
      avatar: "👩‍🔬"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
        <motion.div
          className="absolute inset-0 bg-[url('/images/ui/pattern.svg')] opacity-10"
          animate={{ x: [0, 100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Historias de Transformación
          </span>
        </motion.h2>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-64 md:h-80">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="text-center px-6">
                  {/* Avatar with animation */}
                  <motion.div
                    className="text-6xl mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                  >
                    {testimonials[currentIndex].avatar}
                  </motion.div>

                  {/* Quote with typewriter effect */}
                  <motion.blockquote
                    className="text-xl md:text-2xl text-gray-300 mb-8 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    "{testimonials[currentIndex].content}"
                  </motion.blockquote>

                  {/* Author info */}
                  <motion.div
                    className="text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="font-semibold text-lg">{testimonials[currentIndex].name}</div>
                    <div className="text-gray-400">{testimonials[currentIndex].role}</div>
                    <div className="text-purple-400 text-sm">{testimonials[currentIndex].company}</div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-12">
            <motion.button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-purple-400" : "bg-gray-600"
                  }`}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
