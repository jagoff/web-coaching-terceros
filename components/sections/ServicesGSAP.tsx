"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flame, Gem, CheckCircle2, ArrowRight } from "lucide-react";
import { scrollToElement } from "@/lib/scroll";
import { useLanguage } from "@/contexts/LanguageContext";

// Registrar ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesGSAP() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  
  // Refs para GSAP
  const headerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      id: "liderazgo",
      icon: Flame,
      title: t.services.items.liderazgo.title,
      description: t.services.items.liderazgo.description,
      benefits: t.services.items.liderazgo.benefits,
      cta: t.services.items.liderazgo.benefits[0],
      featured: false,
    },
    {
      id: "organizacional",
      icon: Gem,
      title: t.services.items.organizacional.title,
      description: t.services.items.organizacional.description,
      benefits: t.services.items.organizacional.benefits,
      cta: t.services.items.organizacional.benefits[0],
      featured: true,
      badge: language === 'es' ? 'MÁS SOLICITADO' : 'MOST POPULAR',
    },
  ];

  // Animaciones GSAP con ScrollTrigger
  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none reverse"
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

    // Animar cards con stagger
    if (cardsRef.current) {
      tl.fromTo(
        cardsRef.current.children,
        { 
          opacity: 0, 
          y: 50, 
          rotateX: 8, 
          filter: "blur(6px)",
          transformPerspective: 800
        },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0, 
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        },
        "-=0.2"
      );
    }

    // Animar beneficios dentro de cada card
    const benefitItems = gsap.utils.toArray(".benefit-item");
    benefitItems.forEach((item: any, index: number) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          delay: 0.6 + index * 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <section id="servicios" className="section section-dark" ref={ref}>
      <div className="container">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-14 md:mb-24">
          <div ref={badgeRef} className="flex justify-center mb-6">
            <div className="badge">{t.services.badge}</div>
          </div>
          <h2
            ref={titleRef}
            className="heading-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-gradient">{t.services.title}</span>
          </h2>
          <div
            ref={dividerRef}
            className="divider-gold mt-6"
          />
        </div>

        {/* Service cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`glass-card p-6 sm:p-10 md:p-12 flex flex-col group relative overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5${
                  service.featured ? " ring-1" : ""
                }`}
                style={{
                  perspective: "800px",
                  ...(service.featured
                    ? {
                        borderColor: "rgba(124,107,196,0.45)",
                        boxShadow:
                          "0 0 40px rgba(124,107,196,0.12), 0 8px 32px rgba(0,0,0,0.5)",
                      }
                    : {}),
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    y: -6,
                    boxShadow: service.featured 
                      ? "0 0 60px rgba(124,107,196,0.2), 0 16px 48px rgba(0,0,0,0.5)"
                      : "0 8px 32px rgba(0,0,0,0.4)",
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    y: 0,
                    boxShadow: service.featured
                      ? "0 0 40px rgba(124,107,196,0.12), 0 8px 32px rgba(0,0,0,0.5)"
                      : "0 4px 16px rgba(0,0,0,0.3)",
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }}
              >
                {/* Featured glow background */}
                {service.featured && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      background:
                        "radial-gradient(ellipse at top right, rgba(124,107,196,0.25) 0%, transparent 60%)",
                    }}
                  />
                )}

                {/* Icon + Badge row */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center transition-transform duration-300"
                    style={{
                      background: "rgba(124,107,196,0.12)",
                      border: "1px solid rgba(124,107,196,0.25)",
                      color: "var(--gold-primary)",
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1.15,
                        rotation: 5,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: "power2.out"
                      });
                    }}
                  >
                    <Icon size={26} strokeWidth={1.5} />
                  </div>
                  {service.badge && (
                    <span className="badge text-xs">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3
                  className="heading-md mb-6"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {service.title}
                </h3>

                <p className="mb-6 sm:mb-10" style={{ color: "var(--text-secondary)", lineHeight: "1.75" }}>
                  {service.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-1">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="benefit-item flex items-start gap-3">
                      <CheckCircle2
                        size={16}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: "var(--gold-primary)" }}
                      />
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className="inline-flex items-center gap-2 bg-transparent border-0 cursor-pointer p-0 text-sm font-semibold uppercase tracking-widest transition-all"
                  style={{ color: "var(--gold-primary)", letterSpacing: "0.1em" }}
                  onClick={() => scrollToElement("#contacto")}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      opacity: 0.8,
                      gap: "12px",
                      duration: 0.2,
                      ease: "power2.out"
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      opacity: 1,
                      gap: "8px",
                      duration: 0.2,
                      ease: "power2.out"
                    });
                  }}
                >
                  {service.cta} <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
