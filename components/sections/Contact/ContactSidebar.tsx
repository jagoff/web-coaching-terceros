"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { slideLeft } from "./animations";

export default function ContactSidebar() {
  const { language } = useLanguage();
  const es = language === "es";
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Array de testimonios
  const testimonials = es ? [
    {
      text: "Pasamos de micromanagement a equipos autónomos en 3 meses. Cambió completamente nuestra dinámica.",
      role: "VP Engineering",
      company: "Tech Scale-up · Argentina"
    },
    {
      text: "Fernando transformó nuestra forma de trabajar. Hoy tenemos procesos que escalan y equipos felices.",
      role: "CEO & Founder",
      company: "Startup SaaS · Buenos Aires"
    },
    {
      text: "El coaching nos dio las herramientas para crecer sin perder nuestra cultura. Impacto inmediato.",
      role: "CTO",
      company: "Fintech · Argentina"
    },
    {
      text: "Dejamos de apagar incendios y empezamos a construir el futuro. Mejor inversión que hicimos.",
      role: "Head of Engineering",
      company: "E-commerce LATAM"
    }
  ] : [
    {
      text: "We went from micromanagement to autonomous teams in 3 months. It completely changed our dynamics.",
      role: "VP Engineering",
      company: "Tech Scale-up · Argentina"
    },
    {
      text: "Fernando transformed our way of working. Today we have scalable processes and happy teams.",
      role: "CEO & Founder",
      company: "SaaS Startup · Buenos Aires"
    },
    {
      text: "The coaching gave us the tools to grow without losing our culture. Immediate impact.",
      role: "CTO",
      company: "Fintech · Argentina"
    },
    {
      text: "We stopped fighting fires and started building the future. Best investment we made.",
      role: "Head of Engineering",
      company: "E-commerce LATAM"
    }
  ];

  // Rotación automática cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Funciones para navegación manual
  const goToNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const testimonial = testimonials[currentTestimonial];

  return (
    <div ref={ref} className="flex flex-col gap-4 h-full">

      {/* ── Testimonial ── */}
      <motion.div
        variants={slideLeft}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="glass-card p-6 relative overflow-hidden"
        whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(124,107,196,0.15)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Ambient gold halo */}
        <div
          className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(200,123,90,0.10) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10">
          {/* Opening quote mark */}
          <div
            className="text-5xl leading-none mb-3 select-none"
            style={{ color: "var(--gold-primary)", fontFamily: "Georgia, serif", opacity: 0.6 }}
            aria-hidden="true"
          >
            &ldquo;
          </div>

          <motion.p
            key={currentTestimonial}
            className="mb-4"
            style={{
              color: "var(--text-secondary)",
              lineHeight: "1.7",
              fontSize: "0.95rem",
              fontStyle: "italic",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {testimonial.text}
          </motion.p>

          <motion.div 
            key={`author-${currentTestimonial}`}
            className="flex items-center justify-between"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <div
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}
              >
                {testimonial.role}
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ color: "var(--text-muted)" }}
              >
                {testimonial.company}
              </div>
            </div>

            {/* Stars */}
            <div className="flex gap-0.5" aria-label="5 estrellas">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3.5 h-3.5"
                  fill="var(--gold-primary)"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </motion.div>

          {/* Indicadores de progreso */}
          <div className="flex items-center gap-2 mt-3 justify-center">
            {/* Botón anterior */}
            <button
              onClick={goToPrev}
              className="p-1 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Testimonio anterior"
            >
              <svg 
                className="w-3 h-3 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Indicadores */}
            <div className="flex gap-1">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'w-6 bg-gradient-to-r from-yellow-400 to-orange-500' 
                      : 'w-1 bg-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Botón siguiente */}
            <button
              onClick={goToNext}
              className="p-1 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Siguiente testimonio"
            >
              <svg 
                className="w-3 h-3 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── Call to action card - Last message before conversion ── */}
      <motion.div
        variants={slideLeft}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="glass-card p-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(124,107,196,0.12) 0%, rgba(200,123,90,0.08) 100%)",
          border: "1px solid rgba(124,107,196,0.3)",
        }}
      >
        {/* Ambient violet glow */}
        <div
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(124,107,196,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <p
            className="mb-3 leading-relaxed"
            style={{
              color: "var(--text-primary)",
              fontSize: "0.95rem",
              fontWeight: 500,
              lineHeight: "1.6",
            }}
          >
            {es
              ? "Cada día que pasa sin actuar es un día que tu equipo sigue lidiando con los mismos problemas."
              : "Every day you wait is another day your team struggles with the same problems."}
          </p>
          
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.875rem",
              lineHeight: "1.6",
            }}
          >
            {es
              ? "La primera sesión es gratis. No tienes nada que perder, pero tu equipo y tu empresa tiene todo por ganar."
              : "The first session is free. You have nothing to lose, but your team and your company has everything to gain."}
          </p>
        </div>
      </motion.div>

    </div>
  );
}
