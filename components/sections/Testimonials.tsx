"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { headerStagger, blurUp, dividerGrow } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import { testimonialsES, testimonialsEN } from "@/lib/testimonials-data";

const AUTOPLAY_INTERVAL = 5000;

export default function Testimonials() {
  const { t, language } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const testimonials = language === 'es' ? testimonialsES : testimonialsEN;

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * testimonials.length);
    setCurrent(randomIndex);
  }, [language, testimonials.length]);

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent((index + testimonials.length) % testimonials.length);
    },
    [testimonials.length]
  );

  const prev = () => goTo(current - 1, -1);
  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [paused, next]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)",
    }),
  };

  const testimonial = testimonials[current] || testimonials[0];

  return (
    <section
      id="testimonios"
      className="section section-dark"
      ref={ref}
    >
      <div className="container">
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

        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="testimonial-card relative overflow-hidden flex flex-col justify-between"
            style={{ minHeight: '400px', height: '400px' }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={testimonial.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col h-full"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                dragMomentum={false}
                onDragEnd={(e, info) => {
                  const { offset } = info;
                  const swipeThreshold = 50;
                  
                  if (offset.x < -swipeThreshold) {
                    next();
                  } else if (offset.x > swipeThreshold) {
                    prev();
                  }
                }}
                style={{ cursor: 'grab' }}
              >
                <div className="stars mb-4 mt-2" aria-label="5 estrellas">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                <blockquote
                  className="text-lg leading-relaxed flex-1 mb-10"
                  style={{
                    color: "var(--text-secondary)",
                    fontStyle: "italic",
                    lineHeight: 1.9,
                  }}
                >
                  {testimonial.quote}
                </blockquote>

                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: testimonial.avatarBg }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: "var(--amber-light)" }}
                    >
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <p
                      className="font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {testimonial.name}
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {testimonial.role}
                      {testimonial.company && ` · ${testimonial.company}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-8 sm:mt-12">
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="rounded-full flex items-center justify-center testimonial-nav-btn"
                style={{ width: 44, height: 44 }}
                aria-label={t.testimonialsNav.ariaPrevious}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="rounded-full flex items-center justify-center testimonial-nav-btn"
                style={{ width: 44, height: 44 }}
                aria-label={t.testimonialsNav.ariaNext}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="flex gap-2" role="tablist" aria-label={t.testimonialsNav.ariaPrevious + ' / ' + t.testimonialsNav.ariaNext}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`${t.testimonialsNav.previous} ${i + 1}`}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    background:
                      i === current
                        ? "var(--gold-primary)"
                        : "var(--dark-border)",
                  }}
                />
              ))}
            </div>

            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {current + 1} / {testimonials.length}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
