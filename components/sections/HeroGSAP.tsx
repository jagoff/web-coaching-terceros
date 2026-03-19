"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { scrollToElement } from "@/lib/scroll";
import { useLanguage } from "@/contexts/LanguageContext";
import CoachingWordsBackground from "@/components/CoachingWordsBackground";

const rotatingPhrasesES = [
  "Mi equipo no toma decisiones sin mí",
  "Las reuniones no llevan a nada concreto",
  "Estamos creciendo pero todo se rompe",
  "No logro delegar sin perder el control",
  "El equipo tiene talento pero no rinde",
  "Siempre apagamos incendios 🔥, nunca prevenimos",
  "Tengo demasiadas prioridades y no avanzo en ninguna",
  "No sé si mi equipo está alineado con los objetivos",
  "Contrato bien pero la gente se va rápido",
  "Trabajamos mucho pero los resultados no se ven",
  "No hay tiempo para pensar, solo para reaccionar",
  "Cada área va por su cuenta y nadie coordina",
  "El feedback que doy no genera cambios reales",
  "Mi jornada no termina nunca y sigo atrasado",
  "Sé lo que hay que hacer pero no cómo arrancarlo",
  "Los procesos que funcionaban antes ya no escalan",
  "Hay conflictos en el equipo que nadie nombra",
  "Tomo decisiones con datos incompletos siempre",
  "Perdemos clientes por problemas que podríamos evitar",
  "El equipo espera que yo tenga todas las respuestas",
  "Nuestras daily meetings duran 45 minutos y no resuelven nada",
  "Los devs dicen 'terminado' pero siempre hay bugs en producción",
  "Cambio prioridades cada dos días y nadie sabe qué hacer",
  "El frontend y el backend no se hablan, siempre es culpa del otro",
  "Hacemos overtime pero seguimos entregando tarde",
  "Mi mejor dev está por renunciar y no sé por qué",
  "Implementamos Scrum pero solo son reuniones de más",
  "Los stakeholders cambian el alcance sin aviso",
  "No sé qué hace cada uno en el equipo",
  "Las retrospectivas son silencio incómodo y nada cambia",
  "El cliente nunca está contento con lo que entregamos",
];

const rotatingPhrasesEN = [
  "My team doesn't make decisions without me",
  "Meetings don't lead to anything concrete",
  "We're growing but everything breaks",
  "I can't delegate without losing control",
  "The team has talent but doesn't perform",
  "We're always putting out fires, never preventing",
  "I have too many priorities and don't advance in any",
  "I don't know if my team is aligned with objectives",
  "I hire well but people leave quickly",
  "We work a lot but results aren't visible",
  "There's no time to think, only to react",
  "Each area goes its own way and nobody coordinates",
  "The feedback I give doesn't generate real changes",
  "My workday never ends and I'm still behind",
  "I know what needs to be done but not how to start",
  "The processes that worked before no longer scale",
  "There are conflicts in the team that nobody mentions",
  "I always make decisions with incomplete data",
  "We lose clients due to problems we could avoid",
  "The team expects me to have all the answers",
  "Our daily meetings last 45 minutes and solve nothing",
  "Devs say 'done' but there are always bugs in production",
  "I change priorities every two days and nobody knows what to do",
  "Frontend and backend don't talk, it's always the other's fault",
  "We work overtime but still deliver late",
  "My best dev is about to quit and I don't know why",
  "We implemented Scrum but it's just more meetings",
  "Stakeholders change scope without notice",
  "I don't know what each person on the team does",
  "Retrospectives are awkward silence and nothing changes",
  "The client is never happy with what we deliver",
];

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  drift: number;
};

export default function Hero() {
  const { language } = useLanguage();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  
  const rotatingPhrases = language === 'es' ? rotatingPhrasesES : rotatingPhrasesEN;
  const isAlignmentPhrase = rotatingPhrases[phraseIndex].includes('alineado') || rotatingPhrases[phraseIndex].includes('aligned');
  
  const sectionRef = useRef<HTMLElement>(null);
  
  // Refs para GSAP
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroCTARef = useRef<HTMLDivElement>(null);
  const heroDividerRef = useRef<HTMLDivElement>(null);
  const rotatingPhraseRef = useRef<HTMLDivElement>(null);
  const socialProofRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const count = window.innerWidth < 768 ? 12 : 35;
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 4 + 6,
        opacity: 0.2 + Math.random() * 0.5,
        drift: (Math.random() - 0.5) * 30,
      }))
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Animaciones GSAP - Sin overlay, sin carga
  useEffect(() => {
    if (!mounted) return;

    const tl = gsap.timeline();

    // Animar el título inmediatamente
    if (heroTitleRef.current) {
      tl.fromTo(
        heroTitleRef.current.children,
        { opacity: 0, y: 40, filter: "blur(8px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out"
        }
      );
    }

    // Animar línea divisora
    if (heroDividerRef.current) {
      tl.fromTo(
        heroDividerRef.current,
        { scaleX: 0, opacity: 0 },
        { 
          scaleX: 1, 
          opacity: 1, 
          duration: 0.6, 
          ease: "power2.inOut" 
        },
        "-=0.3"
      );
    }

    // Animar frase rotante
    if (rotatingPhraseRef.current) {
      tl.fromTo(
        rotatingPhraseRef.current,
        { opacity: 0, y: 20, filter: "blur(4px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out"
        },
        "-=0.2"
      );
    }

    // Animar subtítulo
    if (heroSubtitleRef.current) {
      tl.fromTo(
        heroSubtitleRef.current,
        { opacity: 0, y: 30, filter: "blur(6px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out"
        },
        "-=0.2"
      );
    }

    // Animar CTA
    if (heroCTARef.current) {
      tl.fromTo(
        heroCTARef.current.children,
        { opacity: 0, y: 20, scale: 0.98 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.2)"
        },
        "-=0.3"
      );
    }

    // Animar social proof
    if (socialProofRef.current) {
      tl.fromTo(
        socialProofRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        },
        "-=0.2"
      );
    }

    // Animar scroll indicator
    if (scrollIndicatorRef.current) {
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { 
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        },
        "+=0.5"
      );
    }

    return () => {
      tl.kill();
    };
  }, [mounted]);

  const handleScroll = (href: string) => scrollToElement(href);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="hero-bg relative flex min-h-screen flex-col items-center overflow-hidden"
      style={{ paddingTop: "clamp(2.25rem, 6vh, 4.25rem)" }}
      aria-label="Sección principal"
    >
      {/* Coaching Words Background Animation */}
      <CoachingWordsBackground />

      {/* Decorative orbs */}
      <div ref={orb1Ref} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="orb orb-gold animate-float-slow"
          style={{
            width: "clamp(300px, 50vw, 700px)",
            height: "clamp(300px, 50vw, 700px)",
            top: "10%",
            left: "-15%",
            opacity: 0.6,
          }}
        />
      </div>
      <div ref={orb2Ref} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="orb orb-amber animate-float"
          style={{
            width: "clamp(200px, 35vw, 500px)",
            height: "clamp(200px, 35vw, 500px)",
            top: "-5%",
            right: "-10%",
            opacity: 0.4,
            animationDelay: "2s",
          }}
        />
      </div>
      <div ref={orb3Ref} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="orb orb-gold"
          style={{
            width: "clamp(150px, 25vw, 350px)",
            height: "clamp(150px, 25vw, 350px)",
            bottom: "15%",
            right: "20%",
            opacity: 0.3,
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* Floating particles */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: `rgba(124, 107, 196, ${p.opacity})`,
                boxShadow: p.size > 2.5 ? `0 0 ${p.size * 3}px rgba(124,107,196,0.3)` : "none",
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div
        className="container relative z-10 flex flex-col items-center text-center"
      >
        <div
          className="flex flex-col items-center"
          style={{ paddingTop: "clamp(64px, 10vh, 120px)", paddingBottom: "clamp(32px, 5vh, 60px)" }}
        >
          {/* Headline */}
          <h1
            ref={heroTitleRef}
            className="display-text max-w-5xl mb-3 sm:mb-4"
            style={{ fontFamily: "var(--font-heading)", lineHeight: "1.15", fontSize: "clamp(2.25rem, 4.8vw, 3.75rem)" }}
          >
            <span className="block">
              {language === 'es' ? 'Transformá tu equipo.' : 'Transform your team.'}
            </span>
            <span className="block text-gradient mt-3" data-text={language === 'es' ? 'Liderá con propósito.' : 'Lead with purpose.'}>
              {language === 'es' ? 'Liderá con propósito.' : 'Lead with purpose.'}
            </span>
            <span className="block mt-3">
              {language === 'es' ? 'Escalá sin límites.' : 'Scale without limits.'}
            </span>
          </h1>

          {/* Decorative line */}
          <div
            ref={heroDividerRef}
            className="divider-gold mb-6"
            style={{ width: "80px", height: "3px" }}
          />

          {/* Rotating pain-point phrases */}
          <div
            ref={rotatingPhraseRef}
            className={`relative w-[600px] max-w-full mb-4 sm:mb-6 px-6 sm:px-10 py-5 sm:py-6 rounded-2xl transition-all duration-500 ${
              isAlignmentPhrase ? 'phrase-alignment-focused' : ''
            }`}
            style={{
              minHeight: "5.5rem",
              background: "transparent",
              backdropFilter: "blur(15px)",
              border: "1px solid rgba(124,107,196,0.03)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03), 0 8px 32px rgba(0,0,0,0.2)",
              position: "relative"
            }}
          >
            {/* Subtle gold radial glow behind */}
            <div
              className="absolute inset-0 -z-10 rounded-2xl"
              style={{
                background: "radial-gradient(ellipse at center, rgba(124,107,196,0.01) 0%, transparent 40%)",
                transform: "scale(1.8)",
                filter: "blur(50px)",
              }}
              aria-hidden="true"
            />
            <p className="text-sm uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)", letterSpacing: "0.15em" }}>
              ¿Te suena esto?
            </p>
            <p
              className={`lead-text italic transition-all duration-500 ${
                isAlignmentPhrase ? 'text-gold-enhanced' : ''
              }`}
              style={{ 
                backgroundImage: isAlignmentPhrase 
                  ? "linear-gradient(135deg, #D4CAD8 0%, #8B7AD2 60%, #ADA0E0 100%)"
                  : "linear-gradient(135deg, var(--text-primary) 0%, var(--gold-primary) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                fontFamily: "var(--font-heading)", 
                fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)" 
              }}
            >
              &ldquo;{rotatingPhrases[phraseIndex]}&rdquo;
            </p>
          </div>

          {/* Subheadline */}
          <p
            ref={heroSubtitleRef}
            className="lead-text max-w-2xl mb-8 sm:mb-12"
          >
            {language === 'es' 
              ? 'Coaching y consultoría organizacional para líderes tech y startups que quieren crecer de forma ágil, humana y sostenible.'
              : 'Leadership coaching and organizational consulting for tech leaders and startups that want to grow in an agile, human, and sustainable way.'
            }
          </p>

          {/* CTAs */}
          <div
            ref={heroCTARef}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto max-w-2xl"
          >
            <button
              className="btn-primary animate-glow"
              onClick={() => handleScroll("#contacto")}
            >
              {language === 'es' ? 'Agendá tu sesión gratuita →' : 'Book your free session →'}
            </button>
            <button
              className="btn-secondary"
              onClick={() => handleScroll("#proceso")}
            >
              {language === 'es' ? 'Conocé nuestro método ↓' : 'Learn our method ↓'}
            </button>
          </div>

          {/* Social proof */}
          <div
            ref={socialProofRef}
            className="flex items-center justify-center mt-12 sm:mt-20 pb-16"
          >
            <p className="text-sm leading-relaxed text-center" style={{ color: "var(--text-muted)" }}>
              {language === 'es' 
                ? 'Más de 20 años en tecnología · 11+ años de consultoría'
                : 'Over 20 years in technology · 11+ years of agile consulting'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer bg-transparent border-0 z-10"
        onClick={() => handleScroll("#sobre-mi")}
        aria-label="Desplazarse hacia abajo"
      >
        <div
          className="relative rounded-full"
          style={{
            width: 24,
            height: 40,
            border: "2px solid var(--text-muted)",
            transition: "border-color 0.3s",
          }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: 4,
              height: 8,
              top: 6,
              background: "var(--gold-primary)",
            }}
          />
        </div>
      </button>
    </section>
  );
}
