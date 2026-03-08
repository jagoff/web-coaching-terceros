"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { headerStagger, blurUp, dividerGrow } from "@/lib/animations";

const testimonials = [
  {
    id: 1,
    quote:
      "Teníamos un equipo de 15 devs y cero estructura. Fernando nos ayudó a implementar Scrum de verdad, no el Scrum de manual. En 6 meses duplicamos la velocidad de entrega.",
    name: "Martín González",
    role: "CTO & Co-founder",
    company: "NexoLab",
    initials: "MG",
    avatarBg: "linear-gradient(135deg, #4c1d95, #7c3aed)",
  },
  {
    id: 2,
    quote:
      "Era escéptico del coaching organizacional. Pensaba que era solo 'hablar de procesos'. Resultó ser lo más transformador que hicimos como startup. La cultura cambió por completo.",
    name: "Carlos Mendoza",
    role: "CEO",
    company: "TechHispano",
    initials: "CM",
    avatarBg: "linear-gradient(135deg, #1e3a8a, #1d4ed8)",
  },
  {
    id: 3,
    quote:
      "Pasé de ser dev senior a liderar un equipo de 20 personas sin saber cómo. Fernando me dio las herramientas y la confianza para hacerlo bien. Hoy me siento un líder de verdad.",
    name: "Andrea Ruiz",
    role: "Engineering Manager",
    company: "Globant",
    initials: "AR",
    avatarBg: "linear-gradient(135deg, #881337, #be123c)",
  },
  {
    id: 4,
    quote:
      "Nuestra startup crecía rápido pero todo se rompía. Fer nos ayudó a profesionalizar operaciones sin perder la agilidad. Fue un antes y un después para la empresa.",
    name: "Roberto Alvarado",
    role: "COO",
    company: "FastTrack AI",
    initials: "RA",
    avatarBg: "linear-gradient(135deg, #064e3b, #047857)",
  },
  {
    id: 5,
    quote:
      "El acompañamiento de Fernando fue clave. Mi equipo pasó de apagar incendios a trabajar con foco y autonomía. La retención de talento mejoró un 35% ese año.",
    name: "Jorge Paredes",
    role: "VP of Engineering",
    company: "DataSur",
    initials: "JP",
    avatarBg: "linear-gradient(135deg, #92400e, #d97706)",
  },
];

const AUTOPLAY_INTERVAL = 5000;

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent((index + testimonials.length) % testimonials.length);
    },
    []
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

  const t = testimonials[current];

  return (
    <section
      id="testimonios"
      className="section section-dark"
      ref={ref}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14 md:mb-24"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">Testimonios</span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Lo que dicen quienes ya{" "}
            <span className="text-gradient">dieron el paso</span>
          </motion.h2>
          <motion.div
            variants={dividerGrow}
            className="divider-gold mt-6"
          />
        </motion.div>

        {/* Carousel */}
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
            style={{ minHeight: 'clamp(320px, 40vh, 400px)' }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col h-full"
              >
                {/* Stars */}
                <div className="stars mb-4 mt-2" aria-label="5 estrellas">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote
                  className="text-lg leading-relaxed flex-1 mb-10"
                  style={{
                    color: "var(--text-secondary)",
                    fontStyle: "italic",
                    lineHeight: 1.9,
                  }}
                >
                  {t.quote}
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: t.avatarBg }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: "var(--amber-light)" }}
                    >
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <p
                      className="font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {t.role}
                      {t.company && ` · ${t.company}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8 sm:mt-12">
            {/* Prev / Next */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="rounded-full flex items-center justify-center testimonial-nav-btn"
                style={{ width: 44, height: 44 }}
                aria-label="Testimonio anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="rounded-full flex items-center justify-center testimonial-nav-btn"
                style={{ width: 44, height: 44 }}
                aria-label="Siguiente testimonio"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Indicadores de testimonio">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonio ${i + 1}`}
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

            {/* Counter */}
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {current + 1} / {testimonials.length}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
