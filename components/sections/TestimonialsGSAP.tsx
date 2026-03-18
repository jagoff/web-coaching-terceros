"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Flame } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/contexts/LanguageContext";

// Registrar ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  {
    id: 4,
    quote:
      "Teníamos dos equipos que no se hablaban. Frontend y backend vivían en mundos distintos. Fernando nos hizo sentar juntos, definir un contrato de API, y trabajar en pair programming una vez por semana. La primera vez fue un desastre. La segunda, mejor. Al mes de empezar, los bugs de integración se redujeron drásticamente. Ya no era 'culpa del backend'.",
    name: "Sebastian Martorell",
    role: "Software Engineer",
    company: "Recomendación LinkedIn",
    initials: "SM",
    avatarBg: "linear-gradient(135deg, #166534, #22c55e)",
  },
  {
    id: 5,
    quote:
      "Organizamos un evento tech con 500 asistentes y todo era caos. Fernando llegó y dijo: 'Ok, vamos a dividir esto en sprints de 1 semana'. Creó un board Trello visible para todos, asignó responsables, y empezamos a tener daily meetings de 10 minutos. La semana anterior al evento, en lugar de pánico, teníamos un checklist claro. Todo salió como lo planeamos.",
    name: "Lindsey Brown",
    role: "Event Manager",
    company: "Recomendación LinkedIn",
    initials: "LB",
    avatarBg: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
  },
  {
    id: 6,
    quote:
      "Llegué como PM a un equipo donde cada uno trabajaba en su propia feature sin saber qué hacían los demás. Fernando implementó un board Kanban simple: To Do, In Progress, Review. La primera semana nadie lo usaba. Para la tercera, los devs empezaron a mover las cartas solos. De repente el dueño de producto podía ver en qué estábamos. El silencio se rompió.",
    name: "Ana Martínez",
    role: "Product Manager",
    company: "TechStart",
    initials: "AM",
    avatarBg: "linear-gradient(135deg, #7c2d12, #ea580c)",
  },
  {
    id: 7,
    quote:
      "Como CTO technical, hablaba código pero no entendía por qué el equipo no entregaba. Fernando me hizo sentar en las retrospectivas sin hablar. Solo escuchar. Escuché que los devs sentían que mis cambios de prioridad eran aleatorios. Empezamos a hacer planning Mondays y demo Fridays. La confianza volvió.",
    name: "Carlos Rodriguez",
    role: "CTO",
    company: "StartupHub",
    initials: "CR",
    avatarBg: "linear-gradient(135deg, #134e4a, #14b8a6)",
  },
  {
    id: 8,
    quote:
      "Mi equipo de 8 personas funcionaba como 8 freelancers. Cada uno en su horario, sin comunicación. Fernando nos hizo una pregunta simple: '¿Quién sabe qué está haciendo el de al lado?'. Nadie levantó la mano. Implementamos stand-ups de 15 minutos. Al principio forzados. Después naturales. Hoy sabemos quién está bloqueado y quién puede ayudar.",
    name: "María González",
    role: "Engineering Manager",
    company: "DataFlow",
    initials: "MG",
    avatarBg: "linear-gradient(135deg, #92400e, #d97706)",
  },
  {
    id: 9,
    quote:
      "Contraté a muchos consultores que venden humo. Fernando fue distinto. La primera reunión dijo: 'No voy a darte una solución mágica. Vamos a encontrar juntos qué funciona para ustedes'. Tres meses después, no tengo un equipo ágil perfecto, pero tengo un equipo que habla sus problemas y los resuelve. Eso es real.",
    name: "Roberto Silva",
    role: "CEO",
    company: "InnovateLab",
    initials: "RS",
    avatarBg: "linear-gradient(135deg, #0f766e, #14b8a6)",
  },
];

const testimonialsEN = [
  {
    id: 1,
    quote:
      "What impressed me most was that Fernando didn't come with pre-packaged solutions. First he listened, observed our meetings, and only then said: 'I see the problem isn't technical, it's communication'. In two weeks our daily meetings went from 45 minutes to 15. The devs started talking to each other. It was a noticeable change.",
    name: "Valentin Rios",
    role: "Software Engineer",
    company: "LinkedIn Recommendation",
    initials: "VR",
    avatarBg: "linear-gradient(135deg, #0f766e, #14b8a6)",
  },
  {
    id: 2,
    quote:
      "In our first meeting, Fernando told me: 'Stop, don't tell me what you want to build, tell me what problem you're solving'. No one had ever asked me that question before. We started defining real user stories, estimating with points, and suddenly the client stopped changing the scope every two days. For the first time in months I knew what we had to do tomorrow.",
    name: "George Nicolaou",
    role: "Project Manager",
    company: "LinkedIn Recommendation",
    initials: "GN",
    avatarBg: "linear-gradient(135deg, #7c2d12, #ea580c)",
  },
  {
    id: 3,
    quote:
      "I was a junior dev and I had to do tasks without understanding why. Fernando implemented retrospectives every two weeks. The first one was uncomfortable, nobody spoke. By the third, the quietest person on the team said: 'Why don't we automate this deploy that takes us 4 hours?'. Today we do it in 5 minutes. I learned that my opinion mattered.",
    name: "Gabriel Yesuron",
    role: "Software Developer",
    company: "LinkedIn Recommendation",
    initials: "GY",
    avatarBg: "linear-gradient(135deg, #134e4a, #14b8a6)",
  },
  {
    id: 4,
    quote:
      "We had two teams that didn't talk to each other. Frontend and backend lived in different worlds. Fernando made us sit together, define an API contract, and work on pair programming once a week. The first time was a disaster. The second, better. A month after starting, integration bugs dropped dramatically. It was no longer 'the backend's fault'.",
    name: "Sebastian Martorell",
    role: "Software Engineer",
    company: "LinkedIn Recommendation",
    initials: "SM",
    avatarBg: "linear-gradient(135deg, #166534, #22c55e)",
  },
  {
    id: 5,
    quote:
      "We organized a tech event with 500 attendees and everything was chaos. Fernando arrived and said: 'Ok, let's divide this into 1-week sprints'. He created a Trello board visible to everyone, assigned responsibilities, and we started having 10-minute daily meetings. The week before the event, instead of panic, we had a clear checklist. Everything went as planned.",
    name: "Lindsey Brown",
    role: "Event Manager",
    company: "LinkedIn Recommendation",
    initials: "LB",
    avatarBg: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
  },
  {
    id: 6,
    quote:
      "I arrived as PM to a team where everyone worked on their own feature without knowing what others were doing. Fernando implemented a simple Kanban board: To Do, In Progress, Review. The first week nobody used it. By the third, the devs started moving cards on their own. Suddenly the product owner could see what we were working on. The silence broke.",
    name: "Ana Martínez",
    role: "Product Manager",
    company: "TechStart",
    initials: "AM",
    avatarBg: "linear-gradient(135deg, #7c2d12, #ea580c)",
  },
  {
    id: 7,
    quote:
      "As a technical CTO, I spoke code but didn't understand why the team wasn't delivering. Fernando made me sit in retrospectives without speaking. Just listen. I heard that the devs felt my priority changes were random. We started having planning Mondays and demo Fridays. Trust came back.",
    name: "Carlos Rodriguez",
    role: "CTO",
    company: "StartupHub",
    initials: "CR",
    avatarBg: "linear-gradient(135deg, #134e4a, #14b8a6)",
  },
  {
    id: 8,
    quote:
      "My team of 8 people functioned like 8 freelancers. Each one on their own schedule, without communication. Fernando asked us a simple question: 'Who knows what the person next to them is doing?'. No one raised their hand. We implemented 15-minute stand-ups. At first forced. Then natural. Today we know who's blocked and who can help.",
    name: "María González",
    role: "Engineering Manager",
    company: "DataFlow",
    initials: "MG",
    avatarBg: "linear-gradient(135deg, #92400e, #d97706)",
  },
  {
    id: 9,
    quote:
      "I hired many consultants who sell smoke. Fernando was different. The first meeting he said: 'I'm not going to give you a magic solution. We're going to find together what works for you'. Three months later, I don't have a perfect agile team, but I have a team that talks about its problems and solves them. That's real.",
    name: "Roberto Silva",
    role: "CEO",
    company: "InnovateLab",
    initials: "RS",
    avatarBg: "linear-gradient(135deg, #0f766e, #14b8a6)",
  },
];

export default function TestimonialsGSAP() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const testimonials = language === 'es' ? testimonialsES : testimonialsEN;
  const currentTestimonial = testimonials[currentIndex];
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Animaciones GSAP con ScrollTrigger
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none reverse",
      }
    });

    // Animar header
    if (headerRef.current) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: "power3.out"
        }
      );
    }

    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.2)"
        },
        "-=0.4"
      );
    }

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40, filter: "blur(8px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out"
        },
        "-=0.3"
      );
    }

    if (dividerRef.current) {
      tl.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { 
          scaleX: 1, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power2.inOut" 
        },
        "-=0.4"
      );
    }

    // Animar carousel
    if (carouselRef.current) {
      tl.fromTo(
        carouselRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1,
          ease: "power3.out"
        },
        "-=0.3"
      );
    }

    // Animar navegación
    if (navRef.current) {
      tl.fromTo(
        navRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        },
        "-=0.2"
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section
      id="testimonios"
      ref={sectionRef}
      className="section relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, rgba(124,107,196,0.08) 0%, transparent 60%), var(--dark-surface)",
      }}
    >
      {/* Decorative orbs */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="orb orb-gold absolute"
          style={{
            width: "clamp(200px, 30vw, 400px)",
            height: "clamp(200px, 30vw, 400px)",
            top: "-10%",
            right: "-10%",
            opacity: 0.4,
          }}
        />
        <div
          className="orb orb-amber absolute"
          style={{
            width: "clamp(150px, 25vw, 300px)",
            height: "clamp(150px, 25vw, 300px)",
            bottom: "-5%",
            left: "-5%",
            opacity: 0.3,
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14 md:mb-20">
          <div ref={badgeRef} className="flex justify-center mb-6">
            <div className="badge">
              <Flame size={16} className="mr-2" />
              {language === 'es' ? 'Casos Reales' : 'Real Stories'}
            </div>
          </div>
          <h2
            ref={titleRef}
            className="heading-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {language === 'es' ? 'Transformación que habla por sí misma' : 'Transformation that speaks for itself'}
          </h2>
          <div
            ref={dividerRef}
            className="divider-gold mt-6"
          />
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="relative max-w-4xl mx-auto mb-12 md:mb-16"
        >
          <div
            ref={cardRef}
            className="relative bg-gradient-to-br from-[#1a1a1a]/80 to-[#2d2d2d]/80 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-[rgba(255,255,255,0.1)] shadow-2xl"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            {/* Quote */}
            <blockquote className="mb-8">
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{ color: "var(--text-primary)", lineHeight: "1.8" }}
              >
                "{currentTestimonial.quote}"
              </p>
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ background: currentTestimonial.avatarBg }}
              >
                {currentTestimonial.initials}
              </div>
              <div>
                <p
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {currentTestimonial.name}
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {currentTestimonial.role} · {currentTestimonial.company}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] backdrop-blur-sm border border-[rgba(255,255,255,0.2)] flex items-center justify-center transition-all hover:bg-[rgba(255,255,255,0.2)]"
              style={{ color: "var(--text-primary)" }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[rgba(255,255,255,0.1)] backdrop-blur-sm border border-[rgba(255,255,255,0.2)] flex items-center justify-center transition-all hover:bg-[rgba(255,255,255,0.2)]"
              style={{ color: "var(--text-primary)" }}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
          <div
            ref={navRef}
            className="flex justify-center gap-2 mb-8"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-[var(--gold-primary)] w-8"
                    : "bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-1 mb-8">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={20}
              className="fill-[var(--gold-primary)]"
              style={{ color: "var(--gold-primary)" }}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p
            className="lead-text max-w-2xl mx-auto mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            {language === 'es'
              ? 'Estos son resultados reales de equipos que decidieron cambiar su forma de trabajar.'
              : 'These are real results from teams that decided to change how they work.'}
          </p>
          <button
            className="btn-primary"
            onClick={() => {
              const target = document.querySelector("#contacto");
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {language === 'es' ? 'Obtené resultados similares →' : 'Get similar results →'}
          </button>
        </div>
      </div>
    </section>
  );
}
