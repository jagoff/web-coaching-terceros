"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Flame, Gem, CheckCircle2, ArrowRight } from "lucide-react";
import { scrollToElement } from "@/lib/scroll";
import { headerStagger, blurUp, dividerGrow } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Professional Fire Animation Component with GSAP
const AnimatedFire = ({ className = "" }: { className?: string }) => {
  const fireRef = useRef<HTMLSpanElement>(null);
  const gradientRef = useRef<string>("linear-gradient(45deg, #808080, #909090, #808080, #909090)");

  useEffect(() => {
    const fire = fireRef.current;
    if (!fire) return;

    // Set initial state - completely invisible
    gsap.set(fire, {
      scale: 0,
      opacity: 0,
      rotation: 0,
      filter: "blur(10px)"
    });

    // Create sophisticated ignition timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: fire,
        start: "top 90%", // Earlier trigger
        end: "top 70%",   // Shorter window
        once: true,
        toggleActions: "play none none reverse"
      }
    });

    // WOW effect: Explosive appearance
    tl.to(fire, {
      scale: 1.5,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.4,
      ease: "back.out(2.5)" // Explosive ease
    });

    // Progressive gradient animation
    const gradients = [
      "linear-gradient(45deg, #808080, #909090, #808080, #909090)", // Gray start
      "linear-gradient(45deg, #A0A0A0, #B0B0B0, #A0A0A0, #B0B0B0)", // Light gray
      "linear-gradient(45deg, #C0C0C0, #D0D0D0, #C0C0C0, #D0D0D0)", // Lighter gray
      "linear-gradient(45deg, #E0E0E0, #F0F0F0, #E0E0E0, #F0F0F0)", // Almost white
      "linear-gradient(45deg, #F0F0F0, #FFA040, #F0F0F0, #FFA040)", // First orange hint
      "linear-gradient(45deg, #FFA040, #FFB050, #FFA040, #FFB050)", // More orange
      "linear-gradient(45deg, #FFB050, #FFC060, #FFB050, #FFC060)", // Orange growing
      "linear-gradient(45deg, #FFC060, #FFD070, #FFC060, #FFD070)", // More orange
      "linear-gradient(45deg, #FFD070, #FFE080, #FFD070, #FFE080)", // Orange-yellow
      "linear-gradient(45deg, #FFE080, #FFA500, #FFE080, #FFA500)", // Yellow-orange
      "linear-gradient(45deg, #FFA500, #FFD700, #FFA500, #FFD700)", // Full orange/yellow
      "linear-gradient(45deg, #FFD700, #FFB347, #FFD700, #FFB347)", // Light orange
      "linear-gradient(45deg, #FFB347, #DFA080, #FFB347, #DFA080)", // Amber transition
      "linear-gradient(45deg, #DFA080, #C87B5A, #DFA080, #C87B5A)", // More amber
      "linear-gradient(45deg, #C87B5A, #9D8FD8, #C87B5A, #9D8FD8)", // Amber to violet
      "linear-gradient(45deg, #9D8FD8, #7C6BC4, #9D8FD8, #7C6BC4)", // Violet transition
      "linear-gradient(45deg, #7C6BC4, #9D8FD8, #C87B5A, #7C6BC4)", // Final gradient matching text
    ];

    // Animate gradient changes with faster timing
    gradients.forEach((gradient, index) => {
      tl.to(fire, {
        duration: 0.1, // Even faster for wow effect
        ease: "power2.inOut",
        onUpdate: function() {
          fire.style.background = gradient;
          (fire.style as any).webkitBackgroundClip = "text";
          (fire.style as any).webkitTextFillColor = "transparent";
          fire.style.backgroundClip = "text";
        }
      });
    });

    // Final scale adjustment to settle
    tl.to(fire, {
      scale: 1.1,
      duration: 0.3,
      ease: "elastic.out(1, 0.5)" // Bouncy settle
    });

    // Return to original position briefly
    tl.to(fire, {
      scale: 1.0,
      duration: 0.2,
      ease: "power2.inOut"
    });

    // Final bounce back to settled position
    tl.to(fire, {
      scale: 1.1,
      duration: 0.15,
      ease: "back.out(1.2)"
    });

    // Scale and final effects
    tl.to(fire, {
      scale: 1.1,
      opacity: 1,
      duration: 0.3,
      ease: "back.out(1.7)"
    });

    // Add subtle flickering after ignition
    tl.to(fire, {
      rotation: 2,
      duration: 0.15,
      ease: "sine.inOut"
    })
    .to(fire, {
      rotation: -2,
      duration: 0.15,
      ease: "sine.inOut"
    })
    .to(fire, {
      rotation: 1,
      duration: 0.15,
      ease: "sine.inOut"
    })
    .to(fire, {
      rotation: 0,
      duration: 0.15,
      ease: "sine.inOut"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <span
      ref={fireRef}
      className={`inline-block ${className}`}
      style={{
        display: "inline-block",
        background: "linear-gradient(45deg, #808080, #909090, #808080, #909090)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        textShadow: "0 0 15px rgba(255, 165, 0, 0.4)",
        fontSize: "1.1em",
        fontWeight: "bold",
        transformOrigin: "center"
      }}
    >
      🔥
    </span>
  );
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 8, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: 0.3 + i * 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const benefitStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.4 } },
};

const benefitItem: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};


export default function Services() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  return (
    <section id="servicios" className="section section-dark" ref={ref}>
      <div className="container">
        {/* Section header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14 md:mb-24"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">{t.services.badge}</span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-gradient">
              {t.services.title.includes('apagar') ? (
                <>
                  Deja de ap<AnimatedFire />gar incendios
                </>
              ) : (
                t.services.title
              )}
            </span>
          </motion.h2>
          <motion.div
            variants={dividerGrow}
            className="divider-gold mt-6"
          />
        </motion.div>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                custom={i}
                variants={cardReveal}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className={`glass-card p-6 sm:p-10 md:p-12 flex flex-col group relative overflow-hidden${service.featured ? " ring-1" : ""}`}
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
                whileHover={{ y: -6, boxShadow: service.featured ? "0 0 60px rgba(124,107,196,0.2), 0 16px 48px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.4)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                  <motion.div
                    className="w-14 h-14 rounded-lg flex items-center justify-center"
                    style={{
                      background: "rgba(124,107,196,0.12)",
                      border: "1px solid rgba(124,107,196,0.25)",
                      color: "var(--gold-primary)",
                    }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Icon size={26} strokeWidth={1.5} />
                  </motion.div>
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
                <motion.ul
                  variants={benefitStagger}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-1"
                >
                  {service.benefits.map((benefit) => (
                    <motion.li key={benefit} variants={benefitItem} className="flex items-start gap-3">
                      <CheckCircle2
                        size={16}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: "var(--gold-primary)" }}
                      />
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {benefit}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* CTA */}
                <button
                  className="inline-flex items-center gap-2 bg-transparent border-0 cursor-pointer p-0 text-sm font-semibold uppercase tracking-widest transition-all"
                  style={{ color: "var(--gold-primary)", letterSpacing: "0.1em" }}
                  onClick={() => scrollToElement("#contacto")}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.8"; e.currentTarget.style.gap = "12px"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.gap = "8px"; }}
                >
                  {service.cta} <ArrowRight size={16} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
