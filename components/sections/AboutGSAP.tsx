"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, Instagram, ExternalLink, Linkedin } from "lucide-react";
import InstagramCarousel from "../experimental/InstagramCarousel";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

// Registrar ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const credentials = [
  "Advanced Certified ScrumMaster",
  "Advanced Certified Scrum Product Owner (ACSPO)",
  "Professional Scrum™ with UX (PSU I)",
  "Agile Coach",
  "Management 3.0 Metrics & OKR's",
  "unFIX Foundation Workshop",
  "Energizing People",
];

const INSTAGRAM_URL = "https://www.instagram.com/jago_ff";

const instagramPosts = [5, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12];

export default function AboutGSAP() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [shuffledCredentials, setCredentials] = useState(credentials);
  const [buttonPosition, setButtonPosition] = useState(0);
  const [clickCount, setClickCount] = useState<{ [key: number]: number }>({});

  // Refs para GSAP
  const imageColumnRef = useRef<HTMLDivElement>(null);
  const textColumnRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const approachRef = useRef<HTMLParagraphElement>(null);
  const certTitleRef = useRef<HTMLHeadingElement>(null);
  const credentialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Shuffle credentials array
      const shuffled = [...credentials].sort(() => Math.random() - 0.5);
      setCredentials(shuffled);
      // Set random button position
      const randomPos = Math.floor(Math.random() * (credentials.length + 1));
      setButtonPosition(randomPos);
      
      // Load click count from localStorage
      const saved = localStorage.getItem('linkedinButtonMetrics');
      if (saved) {
        setClickCount(JSON.parse(saved));
      }
    }
  }, []);

  // Animaciones GSAP con ScrollTrigger
  useEffect(() => {
    if (!ref.current) return;

    // Crear timeline para las animaciones
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Animar badge
    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20, filter: "blur(4px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 0.5,
          ease: "power2.out"
        }
      );
    }

    // Animar columna de imagen
    if (imageColumnRef.current) {
      tl.fromTo(
        imageColumnRef.current,
        { opacity: 0, x: -60, filter: "blur(6px)" },
        { 
          opacity: 1, 
          x: 0, 
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out"
        },
        "-=0.2"
      );
    }

    // Animar columna de texto
    if (textColumnRef.current) {
      tl.fromTo(
        textColumnRef.current,
        { opacity: 0, x: 60, filter: "blur(6px)" },
        { 
          opacity: 1, 
          x: 0, 
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out"
        },
        "-=0.4"
      );
    }

    // Animar título
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current.children,
        { opacity: 0, y: 30, filter: "blur(4px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        },
        "-=0.3"
      );
    }

    // Animar línea divisora
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

    // Animar párrafos
    if (introRef.current) {
      tl.fromTo(
        introRef.current,
        { opacity: 0, y: 20, filter: "blur(3px)" },
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

    if (approachRef.current) {
      tl.fromTo(
        approachRef.current,
        { opacity: 0, y: 20, filter: "blur(3px)" },
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

    // Animar título de certificaciones
    if (certTitleRef.current) {
      tl.fromTo(
        certTitleRef.current,
        { opacity: 0, y: 20, filter: "blur(3px)" },
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

    // Animar credenciales
    if (credentialsRef.current) {
      tl.fromTo(
        credentialsRef.current.children,
        { opacity: 0, scale: 0.85, y: 10 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "back.out(1.2)"
        },
        "-=0.1"
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  const handleLinkedInClick = () => {
    // Track click position
    setClickCount(prev => {
      const newCount = { ...prev, [buttonPosition]: (prev[buttonPosition] || 0) + 1 };
      localStorage.setItem('linkedinButtonMetrics', JSON.stringify(newCount));
      return newCount;
    });
  };

  return (
    <section
      id="sobre-mi"
      className="section section-surface section-gold-border-top"
      ref={ref}
      style={{ paddingBottom: "clamp(2rem, 4vw, 3rem)" }}
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">
          {/* Image column */}
          <div
            ref={imageColumnRef}
            className="relative order-2 lg:order-1 mt-4 lg:mt-0"
          >
            {/* Badge */}
            <div className="mb-3 flex justify-start">
              <span ref={badgeRef} className="badge">{t.about.badge}</span>
            </div>

            {/* Instagram Carousel - Mobile First */}
            <InstagramCarousel />
          </div>

          {/* Text column */}
          <div
            ref={textColumnRef}
            className="order-1 lg:order-2"
          >
            <h2 ref={titleRef} className="heading-xl mb-6 sm:mb-10" style={{ fontFamily: "var(--font-heading)" }}>
              <span>{t.about.title1}{" "}</span>
              <br />
              <span className="text-gradient">{t.about.title2}</span>
              <br />
              <span>{t.about.title3}</span>
            </h2>

            <div ref={dividerRef} className="divider-gold-left mb-6 sm:mb-10" />

            <p ref={introRef} className="lead-text mb-6 sm:mb-8">
              {t.about.intro}
            </p>

            <p ref={approachRef} className="lead-text mb-12">
              {t.about.approach}
            </p>

            <h3 ref={certTitleRef} className="text-2xl md:text-3xl font-semibold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-gradient">{t.about.certificaciones}</span>
            </h3>

            {/* Credentials with LinkedIn Button */}
            <div
              ref={credentialsRef}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              {Array.from({ length: shuffledCredentials.length + 1 }, (_, index) => {
                const isLinkedInButton = index === buttonPosition;
                
                if (isLinkedInButton) {
                  return (
                    <div
                      key="linkedin-button"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                      style={{
                        background: "var(--gradient-gold)",
                        color: "white",
                        textDecoration: "none",
                        fontWeight: "600",
                        transition: "var(--transition-base)"
                      }}
                    >
                      <Linkedin size={16} />
                      {t.process.linkedinButton}
                      <ExternalLink size={14} />
                    </div>
                  );
                } else {
                  const credIndex = index > buttonPosition ? index - 1 : index;
                  return (
                    <div
                      key={shuffledCredentials[credIndex]}
                      className="credential-chip"
                    >
                      <CheckCircle2 size={14} style={{ color: "var(--gold-primary)", flexShrink: 0 }} />
                      <span>{shuffledCredentials[credIndex]}</span>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
