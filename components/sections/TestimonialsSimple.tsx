"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { headerStagger, blurUp, dividerGrow } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonialsES = [
  {
    id: 1,
    quote:
      "Lo que más me impactó fue que Fernando no llegó con soluciones pre-armadas. Primero escuchó, observó nuestras reuniones, y recién entonces dijo: 'Veo que el problema no es técnico, es de comunicación'. En dos semanas nuestras daily meetings pasaron de 45 minutos a 15. Los devs empezaron a hablar entre ellos. Fue un cambio evidente.",
    name: "Valentin Rios",
    role: "Software Engineer",
    company: "Recomendación LinkedIn",
    initials: "VR",
    avatarBg: "linear-gradient(135deg, #0f766e, #14b8a6)",
  },
  {
    id: 2,
    quote:
      "En nuestra primera reunión, Fernando me dijo: 'Pará, no me digas lo que querés construir, decime qué problema estás resolviendo'. Nadie me había hecho esa pregunta antes. Empezamos a definir user stories reales, estimar con puntos, y de repente el cliente dejó de cambiar el alcance cada dos días. Por primera vez en meses supe qué teníamos que hacer mañana.",
    name: "George Nicolaou",
    role: "Project Manager",
    company: "Recomendación LinkedIn",
    initials: "GN",
    avatarBg: "linear-gradient(135deg, #7c2d12, #ea580c)",
  },
  {
    id: 3,
    quote:
      "Yo era dev junior y me tocaba hacer tareas sin entender el porqué. Fernando implementó retrospectivas cada dos semanas. La primera fue incómoda, nadie hablaba. Para la tercera, el más silencioso del equipo dijo: '¿Por qué no automatizamos este deploy que nos lleva 4 horas?'. Hoy lo hacemos en 5 minutos. Aprendí que mi opinión servía.",
    name: "Gabriel Yesuron",
    role: "Software Developer",
    company: "Recomendación LinkedIn",
    initials: "GY",
    avatarBg: "linear-gradient(135deg, #134e4a, #14b8a6)",
  },
];

const testimonialsEN = [
  {
    id: 1,
    quote:
      "What impressed me most was that Fernando didn't come with pre-made solutions. First he listened, observed our meetings, and only then said: 'I see the problem isn't technical, it's communication'. In two weeks our daily meetings went from 45 minutes to 15. The devs started talking to each other. It was a noticeable change.",
    name: "Valentin Rios",
    role: "Software Engineer",
    company: "LinkedIn Recommendation",
    initials: "VR",
    avatarBg: "linear-gradient(135deg, #0f766e, #14b8a6)",
  },
  {
    id: 2,
    quote:
      "In our first meeting, Fernando told me: 'Stop, don't tell me what you want to build, tell me what problem you're solving'. No one had ever asked me that question before. We started defining real user stories, estimating with points, and suddenly the client stopped changing scope every two days. For the first time in months I knew what we had to do tomorrow.",
    name: "George Nicolaou",
    role: "Project Manager",
    company: "LinkedIn Recommendation",
    initials: "GN",
    avatarBg: "linear-gradient(135deg, #7c2d12, #ea580c)",
  },
  {
    id: 3,
    quote:
      "I was a junior dev and had to do tasks without understanding why. Fernando implemented retrospectives every two weeks. The first one was uncomfortable, nobody spoke. By the third, the quietest person on the team said: 'Why don't we automate this deploy that takes us 4 hours?'. Today we do it in 5 minutes. I learned that my opinion mattered.",
    name: "Gabriel Yesuron",
    role: "Software Developer",
    company: "LinkedIn Recommendation",
    initials: "GY",
    avatarBg: "linear-gradient(135deg, #134e4a, #14b8a6)",
  },
];

export default function Testimonials() {
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = language === 'es' ? testimonialsES : testimonialsEN;
  const currentTestimonial = testimonials[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonios" className="section section-dark">
      <div className="container">
        {/* Header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate="visible"
          className="text-center mb-14 md:mb-24 max-w-3xl mx-auto"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">{t.testimonials.badge}</span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-gradient">{t.testimonials.title}</span>
          </motion.h2>
          <motion.div
            variants={dividerGrow}
            className="divider-gold mt-6"
          />
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Testimonial Card */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 md:p-12 text-center"
            >
              {/* Quote */}
              <blockquote className="mb-8">
                <p
                  className="text-lg md:text-xl leading-relaxed mb-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  "{currentTestimonial.quote}"
                </p>
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{ background: currentTestimonial.avatarBg }}
                >
                  {currentTestimonial.initials}
                </div>
                <div className="text-left">
                  <h4
                    className="font-semibold text-lg"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {currentTestimonial.name}
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {currentTestimonial.role}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {currentTestimonial.company}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center gap-1 mt-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < 4 ? "fill-current" : ""}
                    style={{
                      color: i < 4 ? "var(--gold-primary)" : "var(--text-muted)",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={goToPrevious}
                className="p-3 rounded-full glass-border transition-all hover:scale-110"
                style={{ color: "var(--gold-primary)" }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-gold-primary"
                        : "bg-text-muted opacity-50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="p-3 rounded-full glass-border transition-all hover:scale-110"
                style={{ color: "var(--gold-primary)" }}
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
