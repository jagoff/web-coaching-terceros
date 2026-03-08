"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { headerStagger, blurUp, dividerGrow } from "@/lib/animations";

const testimonials = [
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
  {
    id: 5,
    quote:
      "I had the pleasure of working with Fernando on out latest event Health Horizons. He was an excellent project manager with great interpersonal skills. He was reliable and went to great lengths to ensure that our deadlines were met to budget and our brief was understood fully. I wouldn't hesitate to recommend Fernando! I hope I have the pleasure of working with him again.",
    name: "Lindsey Brown",
    role: "Event Manager",
    company: "LinkedIn Recommendation",
    initials: "LB",
    avatarBg: "linear-gradient(135deg, #be123c, #f43f5e)",
  },
  {
    id: 6,
    quote:
      "Fernando is one of the best managers I've ever worked with. He is a strong team player, and extremely approachable. He is always willing to walk the extra mile to achieve goals and bring the best experience for customers and team members alike. I'm going to miss him in my future endeavors.",
    name: "David Lischinsky",
    role: "Software Engineer",
    company: "LinkedIn Recommendation",
    initials: "DL",
    avatarBg: "linear-gradient(135deg, #1e40af, #3b82f6)",
  },
  {
    id: 7,
    quote:
      "I worked with Fer at Moka and definitely he is a great team player. He's always learning and seeking the best ways to improve the workflows of the company, and definitely is one of the main responsible for the great work environment on Moka. He puts first the human part and is always available to listen to every comment and suggestion you have!",
    name: "Mateo Gonzales Zugasti",
    role: "Software Developer",
    company: "LinkedIn Recommendation",
    initials: "MZ",
    avatarBg: "linear-gradient(135deg, #7c2d12, #f97316)",
  },
  {
    id: 8,
    quote:
      "It is so good to work with people that make you improve every day and at the same time help you in every step you need. Fernando is that, and much more, this is my first time working in the marketing área, and I couldn't ask for a better guide than him, he is a person you can talk to about anything, he is willing to help you and listen to you, gives you suggestion and makes you feel heard. Thanks to him, I became a better professional and learned a lot about how a company works.",
    name: "João Abreu",
    role: "Marketing Specialist",
    company: "LinkedIn Recommendation",
    initials: "JA",
    avatarBg: "linear-gradient(135deg, #166534, #16a34a)",
  },
  {
    id: 9,
    quote:
      "I had the privilege of working alongside Fernando as their coworker, and it was a game-changer. Their approach to Agile methodologies goes beyond the technical - it's about people. They helped create a culture where each team member felt valued, heard, and empowered. Through their guidance, we became adaptable and resilient, achieving remarkable success. Fernando is not just a consultant; they're a mentor and a friend on the journey to Agile excellence.",
    name: "Luis Khem",
    role: "Product Manager",
    company: "LinkedIn Recommendation",
    initials: "LK",
    avatarBg: "linear-gradient(135deg, #581c87, #9333ea)",
  },
  {
    id: 10,
    quote:
      "Fer is a visionary project manager who consistently brings innovative ideas and clear objectives to every web development project we worked on. Across distant borders and time zones, there's a magical connection among us that makes it seem like we're all comfortably seated at the same table and sharing ideas. He understands the importance of a strong working relationship and actively fosters a positive and productive project environment.",
    name: "Akash Patel",
    role: "Web Developer",
    company: "LinkedIn Recommendation",
    initials: "AP",
    avatarBg: "linear-gradient(135deg, #0f766e, #0d9488)",
  },
  {
    id: 11,
    quote:
      "During my time at Moka, I had the pleasure of having Fer as my day-to-day leader. A professional who consistently provided support and guidance in everything I did. Fer empowered me and transmitted a great deal of motivation to make my work enjoyable. In terms of the operational and strategic matters of the business, Fer always approached problem-solving from a very logical and rational perspective. This ensured that the decisions made and the path the company took in every step was very stable and secure.",
    name: "Jack Heinz Dombrower",
    role: "Business Analyst",
    company: "LinkedIn Recommendation",
    initials: "JD",
    avatarBg: "linear-gradient(135deg, #7c2d12, #dc2626)",
  },
  {
    id: 12,
    quote:
      "Tuve la oportunidad de trabajar junto a Fernando en Moka, el nivel de organización era sobresaliente, apuntaba con cada paso a la mejora continúa de la empresa y del individuo, creaba dinámicas de acercamiento entre los compañeros y hacia la empresa logrando mitigar la distancia del trabajo remoto, además, nunca dejaba pasar la oportunidad de fortalecer el vínculo fuera del alcance de lo laboral. Un gran profesional y una excelente persona.",
    name: "Andrés Hernández",
    role: "Software Developer",
    company: "LinkedIn Recommendation",
    initials: "AH",
    avatarBg: "linear-gradient(135deg, #166534, #15803d)",
  },
  {
    id: 13,
    quote:
      "It gives me great pleasure to endorse Fer, my former Director of Operations at Moka. Fer's distinguishing feature is his emphasis on the human component of our team. He instilled an aspect of growth and maintained an inspiring work atmosphere in addition to promoting teamwork. His ability to comprehend, manage, and assist our team's daily operational needs made a big contribution to our team's progress and personal development. His distinct leadership style taught me vital life and professional lessons that I will apply throughout my career. Fer is a valuable asset to any organization, and any team that has the opportunity to work with him is fortunate.",
    name: "Jaime Fili",
    role: "Operations Manager",
    company: "LinkedIn Recommendation",
    initials: "JF",
    avatarBg: "linear-gradient(135deg, #831843, #e11d48)",
  },
  {
    id: 14,
    quote:
      "I had the opportunity to work with Fernando. I was able to learn a lot from him and I admire his enormous professionalism. He is the player we always want to have in our team.",
    name: "Matias Larriqueta",
    role: "Software Developer",
    company: "LinkedIn Recommendation",
    initials: "ML",
    avatarBg: "linear-gradient(135deg, #1e3a8a, #2563eb)",
  },
  {
    id: 15,
    quote:
      "I wholeheartedly recommend Fernando Ferrari! Having worked together at Moka, I witnessed his incredible leadership as Director of Operations. Fernando is not only organized; he is a master at streamlining processes, making work a breeze. As an operations leader, he uses agile methodologies to drive growth and cultural transformation.",
    name: "Ivan Schweikofski",
    role: "Operations Specialist",
    company: "LinkedIn Recommendation",
    initials: "IS",
    avatarBg: "linear-gradient(135deg, #134e4a, #14b8a6)",
  },
  {
    id: 16,
    quote:
      "Tuve la oportunidad de supervisar a Fernando y solo tengo elogios para su persona. Un profesional con un compromiso tremendo, siempre atento a la evolución de la tecnología. Con una mirada siempre de avanzada, en una búsqueda permanente de mejorar. Siempre aportando ideas, sugerencias y con un gran entusiasmo en todo lo que hace. Cuando se fue de mi equipo, realmente sentí que habíamos perdido un gran recurso humano y que con el tiempo íbamos a lamentarlo. Efectivamente fue así. En ese momento, la organización no estaba preparada para un perfil como el de Fernando, hoy sin dudas, sería un gran valor en nuestros equipos de trabajo",
    name: "Gustavo Tobares",
    role: "Technology Manager",
    company: "LinkedIn Recommendation",
    initials: "GT",
    avatarBg: "linear-gradient(135deg, #7c2d12, #ea580c)",
  },
  {
    id: 17,
    quote:
      "Teníamos un equipo de 15 devs y cero estructura. Fernando nos ayudó a implementar Scrum de verdad, no el Scrum de manual. En 6 meses duplicamos la velocidad de entrega.",
    name: "Martín González",
    role: "CTO & Co-founder",
    company: "NexoLab",
    initials: "MG",
    avatarBg: "linear-gradient(135deg, #4c1d95, #7c3aed)",
  },
  {
    id: 18,
    quote:
      "Era escéptico del coaching organizacional. Pensaba que era solo 'hablar de procesos'. Resultó ser lo más transformador que hicimos como startup. La cultura cambió por completo.",
    name: "Carlos Mendoza",
    role: "CEO",
    company: "TechHispano",
    initials: "CM",
    avatarBg: "linear-gradient(135deg, #1e3a8a, #1d4ed8)",
  },
  {
    id: 19,
    quote:
      "Pasé de ser dev senior a liderar un equipo de 20 personas sin saber cómo. Fernando me dio las herramientas y la confianza para hacerlo bien. Hoy me siento un líder de verdad.",
    name: "Andrea Ruiz",
    role: "Engineering Manager",
    company: "Globant",
    initials: "AR",
    avatarBg: "linear-gradient(135deg, #881337, #be123c)",
  },
  {
    id: 20,
    quote:
      "Nuestra startup crecía rápido pero todo se rompía. Fer nos ayudó a profesionalizar operaciones sin perder la agilidad. Fue un antes y un después para la empresa.",
    name: "Roberto Alvarado",
    role: "COO",
    company: "FastTrack AI",
    initials: "RA",
    avatarBg: "linear-gradient(135deg, #064e3b, #047857)",
  },
  {
    id: 21,
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
