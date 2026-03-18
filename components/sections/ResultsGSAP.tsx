"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { scrollToElement } from "@/lib/scroll";
import { useLanguage } from "@/contexts/LanguageContext";

// Registrar ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ResultsGSAP() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  
  // Refs para GSAP
  const headerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const stats = language === 'es' ? [
    {
      prefix: "+",
      value: 20,
      suffix: "",
      display: "+20",
      label: "Años en tecnología",
      description: "Desde infraestructura hasta liderazgo",
    },
    {
      prefix: "",
      value: 11,
      suffix: "+",
      display: "11+",
      label: "Años de coaching ágil",
      description: "Transformando startups y empresas tech",
    },
    {
      prefix: "",
      value: 9,
      suffix: "+",
      display: "9+",
      label: "Certificaciones activas",
      description: "Scrum, UX, Management 3.0, Security",
    },
    {
      prefix: "",
      value: 6,
      suffix: "",
      display: "6",
      label: "Empresas co-fundadas",
      description: "Moka, Nodok.AI, AyP",
    },
  ] : [
    {
      prefix: "+",
      value: 20,
      suffix: "",
      display: "+20",
      label: "Years in technology",
      description: "From infrastructure to leadership",
    },
    {
      prefix: "",
      value: 11,
      suffix: "+",
      display: "11+",
      label: "Years of agile coaching",
      description: "Transforming startups and tech companies",
    },
    {
      prefix: "",
      value: 9,
      suffix: "+",
      display: "9+",
      label: "Active certifications",
      description: "Scrum, UX, Management 3.0, Security",
    },
    {
      prefix: "",
      value: 6,
      suffix: "",
      display: "6",
      label: "Companies co-founded",
      description: "Moka, Nodok.AI, AyP",
    },
  ];

  function CountUp({
    value,
    prefix,
    suffix,
    started,
  }: {
    value: number;
    prefix: string;
    suffix: string;
    started: boolean;
  }) {
    const [displayed, setDisplayed] = useState(0);
    const isDecimal = value % 1 !== 0;

    useEffect(() => {
      if (!started) return;
      const duration = 2000;
      const totalFrames = 70;
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setDisplayed(value * easeOutQuart);

        if (frame >= totalFrames) {
          clearInterval(timer);
        }
      }, duration / totalFrames);

      return () => clearInterval(timer);
    }, [started, value]);

    const fmt = isDecimal ? displayed.toFixed(1) : Math.round(displayed).toString();

    return (
      <span className="stat-number">
        {prefix}{fmt}{suffix}
      </span>
    );
  }

  // Animaciones GSAP con ScrollTrigger
  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none reverse",
        onEnter: () => setStarted(true),
        onLeave: () => setStarted(false),
        onEnterBack: () => setStarted(true),
        onLeaveBack: () => setStarted(false)
      }
    });

    // Animar header
    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20, filter: "blur(4px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out"
        }
      );
    }

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
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

    if (dividerRef.current) {
      tl.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { 
          scaleX: 1, 
          opacity: 1, 
          duration: 0.6, 
          ease: "power2.inOut" 
        },
        "-=0.2"
      );
    }

    // Animar stats con stagger
    if (statsRef.current) {
      tl.fromTo(
        statsRef.current.children,
        { 
          opacity: 0, 
          y: 40, 
          scale: 0.9, 
          filter: "blur(6px)"
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          filter: "blur(0px)",
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out"
        },
        "-=0.2"
      );
    }

    // Animar CTA
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30, filter: "blur(6px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out"
        },
        "-=0.2"
      );
    }

    // Animar hover en stats
    const statElements = gsap.utils.toArray(".stat-card");
    statElements.forEach((stat: any) => {
      stat.addEventListener("mouseenter", () => {
        gsap.to(stat, {
          scale: 1.06,
          y: -4,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      stat.addEventListener("mouseleave", () => {
        gsap.to(stat, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Animar orb con scroll
    if (orbRef.current) {
      gsap.to(orbRef.current, {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <section
      id="resultados"
      className="section relative overflow-hidden"
      ref={ref}
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(124,107,196,0.08) 0%, transparent 60%), var(--dark-surface)",
      }}
    >
      {/* Decorative orb with scroll parallax */}
      <div
        ref={orbRef}
        className="orb orb-gold absolute"
        style={{
          width: 400,
          height: 400,
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14 md:mb-24">
          <div ref={badgeRef} className="flex justify-center mb-6">
            <div className="badge">{language === 'es' ? 'Impacto Real' : 'Real Impact'}</div>
          </div>
          <h2
            ref={titleRef}
            className="heading-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {language === 'es' ? 'Transformación en' : 'Transformation in'}{" "}
            <span className="text-gradient">{language === 'es' ? 'Números' : 'Numbers'}</span>
          </h2>
          <div
            ref={dividerRef}
            className="divider-gold mt-6"
          />
        </div>

        {/* Stats grid */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12 lg:gap-16 mb-14 md:mb-24">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card text-center cursor-pointer"
            >
              {/* Number */}
              <CountUp
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                started={started}
              />

              {/* Label */}
              <h3 className="heading-sm mt-3 mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center">
          <p
            className="lead-text max-w-2xl mx-auto mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            {language === 'es' 
              ? 'Cada número representa experiencia real construyendo equipos y organizaciones.' 
              : 'Every number represents real experience building teams and organizations.'
            }{" "}
            <strong style={{ color: "var(--text-primary)" }}>
              {language === 'es' ? '¿Hablamos de tu próximo paso?' : 'Shall we talk about your next step?'}
            </strong>
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
            {language === 'es' ? 'Empezá tu transformación' : 'Start your transformation'} <ArrowRight size={16} className="inline ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
