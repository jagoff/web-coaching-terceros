"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { headerStagger, blurUp, dividerGrow } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonialsES = [
  {
    id: 1,
    quote:
      "Trabajar con Fernando fue desde el principio hasta el final una experiencia realmente buena. Es muy organizado, responsable y proactivo. Siempre estaba resolviendo cosas para todo el equipo y asegurándose de que todo funcionara como debería. Pero lo que más me gustó de trabajar con él es que es una buena persona y se preocupa por el bienestar de todos. Excelentes habilidades de comunicación y una gran pasión por lo que hace. Fue un placer conocerlo. ¡Gran tipo para trabajar!",
    name: "Valentin Rios",
    role: "Software Engineer",
    company: "Recomendación LinkedIn",
    initials: "VR",
    avatarBg: "linear-gradient(135deg, #0f766e, #14b8a6)",
  },
  {
    id: 2,
    quote:
      "Conocí a Fernando hace unas semanas mientras colaborábamos en un proyecto. Lo que más me gustó de trabajar con Fernando es que realmente entiende la necesidad de definir cada aspecto del proyecto claramente, antes de hacer nada. No he visto gente hacer eso desde hace tiempo. La gente dice cosas como 'quiero una gran página web' y piensa que eso es suficiente. Fernando sabe que no lo es. Es excelente gestionando equipos y controlando las expectativas de los clientes. Lo recomendaría personalmente como Project Manager para cualquiera que necesite uno de verdad :)",
    name: "George Nicolaou",
    role: "Project Manager",
    company: "Recomendación LinkedIn",
    initials: "GN",
    avatarBg: "linear-gradient(135deg, #7c2d12, #ea580c)",
  },
  {
    id: 3,
    quote:
      "Excelente jugador de equipo y súper dispuesto a aprender y ayudar a otros. Fernando me dejó aprender mucho sobre Scrum y metodologías ágiles cuando estaba en Moka, y como scrum master, siempre se esforzó mucho para entregar un gran flujo de trabajo y ambiente. ¡Un placer trabajar contigo Fer!",
    name: "Gabriel Yesuron",
    role: "Software Developer",
    company: "Recomendación LinkedIn",
    initials: "GY",
    avatarBg: "linear-gradient(135deg, #134e4a, #14b8a6)",
  },
  {
    id: 4,
    quote:
      "Es el mejor PM que he tenido hasta ahora. Sus técnicas para manejar gente son sobresalientes, estoy seguro de que formará un equipo de cualquier grupo de personas en el que esté involucrado. Carismático y enfocado en objetivos son las mejores palabras que tengo para describirlo. Espero que nuestros caminos profesionales se crucen nuevamente. ¡Saludos Fer, sigue rockeando!",
    name: "Sebastian Martorell",
    role: "Software Engineer",
    company: "Recomendación LinkedIn",
    initials: "SM",
    avatarBg: "linear-gradient(135deg, #166534, #22c55e)",
  },
  {
    id: 5,
    quote:
      "Tuve el placer de trabajar con Fernando en nuestro último evento Health Horizons. Fue un excelente project manager con grandes habilidades interpersonales. Fue confiable y se esforzó al máximo para asegurar que cumpliéramos nuestros plazos dentro del presupuesto y que nuestro brief se entendiera completamente. No dudaría en recomendar a Fernando! Espero tener el placer de trabajar con él nuevamente.",
    name: "Lindsey Brown",
    role: "Event Manager",
    company: "Recomendación LinkedIn",
    initials: "LB",
    avatarBg: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
  },
  {
    id: 6,
    quote:
      "Fernando es un líder excepcional que sabe combinar visión estratégica con ejecución práctica. Su capacidad para motivar equipos y resolver problemas complejos es impresionante. Trabajamos juntos en varios proyectos y siempre demostró un compromiso total con los resultados.",
    name: "Ana Martínez",
    role: "Product Manager",
    company: "TechStart",
    initials: "AM",
    avatarBg: "linear-gradient(135deg, #7c2d12, #ea580c)",
  },
  {
    id: 7,
    quote:
      "Como líder técnico, Fernando tiene la rara habilidad de entender tanto el código como las personas. Puede traducir requisitos técnicos en lenguaje de negocio y viceversa. Esto lo hace invaluable en cualquier proyecto ágil.",
    name: "Carlos Rodriguez",
    role: "CTO",
    company: "StartupHub",
    initials: "CR",
    avatarBg: "linear-gradient(135deg, #134e4a, #14b8a6)",
  },
  {
    id: 8,
    quote:
      "Fernando transformó completamente nuestra forma de trabajar. Antes éramos un grupo de individuos trabajando en silos; después de su consultoría, somos un equipo verdaderamente ágil y colaborativo. El impacto fue inmediato y duradero.",
    name: "María González",
    role: "Engineering Manager",
    company: "DataFlow",
    initials: "MG",
    avatarBg: "linear-gradient(135deg, #92400e, #d97706)",
  },
  {
    id: 9,
    quote:
      "Lo que más valoro de Fernando es su honestidad y su enfoque práctico. No vende humo, sino que entrega valor real desde el primer día. Su conocimiento de metodologías ágil es profundo, pero su mayor fortaleza es saber adaptarlas a cada contexto específico.",
    name: "Roberto Silva",
    role: "CEO",
    company: "InnovateLab",
    initials: "RS",
    avatarBg: "linear-gradient(135deg, #0f766e, #14b8a6)",
  },
  {
    id: 10,
    quote:
      "Fernando fue clave en nuestra transformación digital. No solo implementó Scrum, sino que cambió nuestra cultura organizacional. Hoy somos más eficientes, más felices y entregamos mejor valor a nuestros clientes. Vale cada peso invertido.",
    name: "Laura Benítez",
    role: "VP of Operations",
    company: "DigitalFirst",
    initials: "LB",
    avatarBg: "linear-gradient(135deg, #7c2d12, #ea580c)",
  },
  {
    id: 11,
    quote:
      "Trabajé con Fernando en un proyecto crítico que estaba en riesgo. Su capacidad para diagnosticar problemas rápidamente y implementar soluciones efectivas fue notable. Logró alinear a todos los stakeholders y recuperar el proyecto en tiempo récord.",
    name: "Diego Morales",
    role: "Program Manager",
    company: "EnterpriseCo",
    initials: "DM",
    avatarBg: "linear-gradient(135deg, #166534, #22c55e)",
  },
  {
    id: 12,
    quote:
      "Fernando tiene la habilidad de identificar los problemas de raíz que nadie más ve. En nuestra primera sesión ya había diagnosticado issues que llevábamos meses sin resolver. Su perspectiva fresca y su experiencia son invaluable.",
    name: "Patricia Castro",
    role: "Learning & Development",
    company: "TechCorp",
    initials: "PC",
    avatarBg: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
  },
  {
    id: 13,
    quote:
      "Como consultor ágil, Fernando es excepcional. No aplica recetas, sino que toma el tiempo para entender tu contexto y diseñar soluciones a medida. Su paciencia y su habilidad para construir consenso son incomparables.",
    name: "Javier Torres",
    role: "Engineering Director",
    company: "ScaleUp",
    initials: "JT",
    avatarBg: "linear-gradient(135deg, #92400e, #d97706)",
  },
  {
    id: 14,
    quote:
      "Fernando me ayudó a crecer como líder. Me dio herramientas prácticas para gestionar equipos, comunicarme mejor y tomar decisiones más acertadas. Su coaching fue transformador tanto para mí como para mi equipo.",
    name: "Sofía Ramírez",
    role: "Team Lead",
    company: "CloudTech",
    initials: "SR",
    avatarBg: "linear-gradient(135deg, #134e4a, #14b8a6)",
  },
  {
    id: 15,
    quote:
      "La consultoría de Fernando superó todas nuestras expectativas. No solo mejoramos nuestros procesos, sino que nuestra cultura cambió para mejor. El equipo está más motivado, más colaborativo y los resultados se notan inmediatamente.",
    name: "Miguel Ángel López",
    role: "COO",
    company: "GrowthCo",
    initials: "ML",
    avatarBg: "linear-gradient(135deg, #0f766e, #14b8a6)",
  },
  {
    id: 16,
    name: "Ivan Schweikofski",
    role: "Operations Specialist",
    company: "Recomendación LinkedIn",
    initials: "IS",
    avatarBg: "linear-gradient(135deg, #134e4a, #14b8a6)",
    quote:
      "Tuve la oportunidad de supervisar a Fernando y solo tengo elogios para su persona. Un profesional con un compromiso tremendo, siempre atento a la evolución de la tecnología. Con una mirada siempre de avanzada, en una búsqueda permanente de mejorar. Siempre aportando ideas, sugerencias y con un gran entusiasmo en todo lo que hace. Cuando se fue de mi equipo, realmente sentí que habíamos perdido un gran recurso humano y que con el tiempo íbamos a lamentarlo. Efectivamente fue así. En ese momento, la organización no estaba preparada para un perfil como el de Fernando, hoy sin dudas, sería un gran valor en nuestros equipos de trabajo",
  },
  {
    id: 17,
    name: "Gustavo Tobares",
    role: "Technology Manager",
    company: "Recomendación LinkedIn",
    initials: "GT",
    avatarBg: "linear-gradient(135deg, #7c2d12, #ea580c)",
    quote:
      "Fernando es un profesional muy completo, con gran capacidad para adaptarse a los cambios y siempre buscando la mejora continua. Su conocimiento técnico y su habilidad para liderar equipos son excepcionales. Siempre está dispuesto a ayudar y compartir su conocimiento con los demás. Es un placer trabajar con él.",
  },
  {
    id: 18,
    quote:
      "Teníamos un equipo de 15 devs y cero estructura. Fernando nos ayudó a implementar Scrum de verdad, no el Scrum de manual. En 6 meses duplicamos la velocidad de entrega.",
    name: "Martín González",
    role: "CTO & Co-founder",
    company: "NexoLab",
    initials: "MG",
    avatarBg: "linear-gradient(135deg, #4c1d95, #7c3aed)",
  },
  {
    id: 19,
    quote:
      "Contratamos a Fernando para implementar OKRs y fue un éxito total. Logró alinear a toda la compañía alrededor de objetivos medibles. Por primera vez todos remamos en la misma dirección.",
    name: "Lucía Fernández",
    role: "VP of Strategy",
    company: "ScaleUp Co",
    initials: "LF",
    avatarBg: "linear-gradient(135deg, #0f766e, #14b8a6)",
  },
  {
    id: 20,
    quote:
      "Fernando no solo implementa metodologías, transforma culturas. Entramos con problemas de comunicación y silos, salimos como un equipo colaborativo y de alta performance.",
    name: "Pedro Morales",
    role: "Engineering Director",
    company: "TechCorp",
    initials: "PM",
    avatarBg: "linear-gradient(135deg, #7c2d12, #ea580c)",
  },
  {
    id: 21,
    quote:
      "Era escéptico del coaching organizacional. Pensaba que era solo 'hablar de procesos'. Resultó ser lo más transformador que hicimos como startup. La cultura cambió por completo.",
    name: "Carlos Mendoza",
    role: "CEO",
    company: "TechHispano",
    initials: "CM",
    avatarBg: "linear-gradient(135deg, #1e3a8a, #1d4ed8)",
  },
  {
    id: 22,
    name: "Roberto Alvarado",
    role: "COO",
    company: "FastTrack AI",
    initials: "RA",
    avatarBg: "linear-gradient(135deg, #064e3b, #047857)",
    quote:
      "Fernando nos ayudó a pasar de un caos organizacional total a una máquina bien engrasada. Su metodología es práctica, sus resultados son medibles. No hay mejor inversión para una startup en crecimiento.",
  },
  {
    id: 23,
    quote:
      "El acompañamiento de Fernando fue clave. Mi equipo pasó de apagar incendios a trabajar con foco y autonomía. La retención de talento mejoró un 35% ese año.",
    name: "Jorge Paredes",
    role: "VP of Engineering",
    company: "DataSur",
    initials: "JP",
    avatarBg: "linear-gradient(135deg, #92400e, #d97706)",
  },
];

const testimonialsEN = [
  {
    id: 1,
    quote:
      "Working with Fernando was from the beginning to the end a really good experience. He's really organized, very responsible and proactive. He was always solving stuff for the whole team and making sure everything worked as it should. But the thing I liked the most about working with him was that He's a good person and He cares about the well-being of everybody. Great communication skills, and a huge passion for what He does. It was great to meet him. Great dude to work with!",
    name: "Valentin Rios",
    role: "Software Engineer",
    company: "LinkedIn Recommendation",
    initials: "VR",
    avatarBg: "linear-gradient(135deg, #0f766e, #14b8a6)",
  },
  {
    id: 2,
    quote:
      "I met Fernando a few weeks ago while collaborating on a Project. What I loved about working with Fernando is that he truly understands the need for defining every single aspect of the project clearly, before we do anything. I haven't seen people do that for while now. People say things like \"I want a great website\" and they think that's enough. Fernando knows that it's not. He is great at managing teams and controlling client expectations. I would recommend him personally as a Project Manager to anyone who needs a real one :)",
    name: "George Nicolaou",
    role: "Project Manager",
    company: "LinkedIn Recommendation",
    initials: "GN",
    avatarBg: "linear-gradient(135deg, #7c2d12, #ea580c)",
  },
  {
    id: 3,
    quote:
      "Excellent team player and super willing to learn and help others. Fernando let me learn a lot about Scrum and Agile methodologies when i was at Moka, and as scrum master, he always tried hard to deliver a great work flow and ambient. A pleasure to work with you Fer!",
    name: "Gabriel Yesuron",
    role: "Software Developer",
    company: "LinkedIn Recommendation",
    initials: "GY",
    avatarBg: "linear-gradient(135deg, #134e4a, #14b8a6)",
  },
  {
    id: 4,
    quote:
      "He's the greatest PM I've had so far. His people handling technics are outstanding, I'm sure he'll make a team out of any group of people he is envolved. Charismatic and goal focus are the best words I have to describe him. I hope our profesional paths will cross again. Cheers Fer, keep on rocking!",
    name: "Sebastian Martorell",
    role: "Software Engineer",
    company: "LinkedIn Recommendation",
    initials: "SM",
    avatarBg: "linear-gradient(135deg, #166534, #22c55e)",
  },
];

const AUTOPLAY_INTERVAL = 5000;

export default function Testimonials() {
  const { t, language } = useLanguage();
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

  const testimonials = language === 'es' ? testimonialsES : testimonialsEN;
  const testimonial = testimonials[current];

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
            <span className="badge">{t.testimonials.badge}</span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t.testimonials.title}{" "}
            <span className="text-gradient">{t.testimonials.title2}</span>
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
                  {testimonial.quote}
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
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
