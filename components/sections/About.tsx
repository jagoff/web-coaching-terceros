"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { CheckCircle2, Instagram, ExternalLink, Linkedin } from "lucide-react";
import GesturesCarousel from "../GesturesCarousel";
import YouTubeThumbnail from "../YouTubeThumbnail";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const slideReveal: Variants = {
  hidden: (dir: number) => ({ opacity: 0, x: dir, filter: "blur(6px)" }),
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const credentialStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const credentialPop: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 18 },
  },
};

const credentials = [
  "Advanced Certified ScrumMaster",
  "Advanced Certified Scrum Product Owner (ACSPO)",
  "Professional Scrum™ with UX (PSU I)",
  "Agile Coach",
  "Management 3.0 Metrics & OKR's",
  "unFIX Foundation Workshop",
  "Energizing People",
  "Fundamentals Online Workshop",
];


const INSTAGRAM_URL = "https://www.instagram.com/jago_ff";

const instagramPosts = [5, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12];

const instaStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const instaCard: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [shuffledCredentials, setCredentials] = useState(credentials);
  const [buttonPosition, setButtonPosition] = useState(0);
  const [clickCount, setClickCount] = useState<{ [key: number]: number }>({});

  // Handle hash scrolling for "titulo-about"
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'titulo-about') {
        const element = document.getElementById('titulo-about');
        if (element) {
          // Small delay to ensure page is loaded
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    }
  }, []);

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
      style={{ 
        paddingTop: "clamp(0.5rem, 1.5vw, 1.5rem)",
        paddingBottom: "clamp(1.5rem, 3vw, 2rem)"
      }}
    >
      <div className="container">
        {/* TV Image - Mobile version with 3D effect */}
        <div className="lg:hidden mb-6 flex justify-center">
          <CardContainer className="inter-var">
            <CardBody className="relative group/card w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
              <CardItem translateZ="50" className="w-full h-full">
                <img
                  src="/images/ui/tv-icon.png"
                  alt="TV Icon"
                  className="w-full h-full object-contain group-hover/card:shadow-2xl transition-all duration-300"
                  style={{ transform: 'scale(1.2)' }}
                />
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center relative">
          {/* Badge - Positioned above TV image */}
          <div className="absolute left-0 top-0 lg:left-8 xl:left-12 z-0 lg:block hidden lg:z-20" style={{ top: '-10px' }}>
            <div className="mb-3 flex justify-start">
              <span className="badge">{t.about.badge}</span>
            </div>
          </div>

          {/* TV Image - At grid level, outside any column */}
          <div className="absolute left-0 top-6 lg:left-8 xl:left-12 z-0 lg:block hidden lg:z-10" style={{ top: '113px', left: '42px' }}>
            <CardContainer className="inter-var">
              <CardBody className="relative group/card w-[32rem] h-[32rem]">
                <CardItem translateZ="50" className="w-full h-full">
                  <img
                    src="/images/ui/tv-icon.png"
                    alt="TV Icon"
                    className="w-full h-full object-contain group-hover/card:shadow-2xl transition-all duration-300"
                    style={{ 
                      filter: 'brightness(1.1) contrast(1.1)',
                      opacity: 1,
                      transform: 'scale(1.2)'
                    }}
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>

          {/* Image column */}
          <motion.div
            custom={-60}
            variants={slideReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative order-2 lg:order-1 mt-4 lg:mt-0 lg:-mt-[470px]"
          >
            {/* Image Carousel - Mobile First */}
            <GesturesCarousel />
          </motion.div>

          {/* Text column */}
          <motion.div
            custom={60}
            variants={slideReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-1 lg:order-2"
          >
            <h2 
              id="titulo-about"
              className="heading-xl mb-6 sm:mb-10" 
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t.about.title1}{" "}
              <br />
              <span className="text-gradient">{t.about.title2}</span>
              <br />
              {t.about.title3}
            </h2>

            <div className="divider-gold-left mb-6 sm:mb-10" />

            <div 
              className="lead-text mb-6 sm:mb-8"
              dangerouslySetInnerHTML={{ __html: t.about.intro }}
            />

            <p className="lead-text mb-12">
              {t.about.approach}
            </p>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-gradient">{t.about.certificaciones}</span>
            </h3>

            {/* Credentials with LinkedIn Button */}
            <motion.div
              variants={credentialStagger}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-wrap gap-3 sm:gap-4"
            >
              {Array.from({ length: shuffledCredentials.length + 1 }, (_, index) => {
                const isLinkedInButton = index === buttonPosition;
                
                if (isLinkedInButton) {
                  return (
                    <motion.div
                      key="linkedin-button"
                      variants={credentialPop}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="linkedin-button-container"
                    >
                      <motion.a
                        href="https://www.linkedin.com/in/fernandolferrari/details/certifications/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                        style={{
                          background: "var(--gradient-gold)",
                          color: "white",
                          textDecoration: "none",
                          fontWeight: "600",
                          transition: "var(--transition-base)"
                        }}
                        whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(124,107,196,0.3)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLinkedInClick}
                      >
                        <Linkedin size={16} />
                        {t.process.linkedinButton}
                        <ExternalLink size={14} />
                      </motion.a>
                    </motion.div>
                  );
                } else {
                  const credIndex = index > buttonPosition ? index - 1 : index;
                  return (
                    <motion.div
                      key={shuffledCredentials[credIndex]}
                      variants={credentialPop}
                      className="credential-chip"
                    >
                      <CheckCircle2 size={14} style={{ color: "var(--gold-primary)", flexShrink: 0 }} />
                      <span>{shuffledCredentials[credIndex]}</span>
                    </motion.div>
                  );
                }
              })}
            </motion.div>

            {/* YouTube Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16"
            >
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                  <span className="text-gradient">
                    {language === 'es' ? 'Conocé mi enfoque' : 'See My Approach'}
                  </span>
                </h3>
                <p className="text-base" style={{ color: "var(--text-secondary)" }}>
                  {language === 'es' 
                    ? <span>¿Queres pasar por YouTube? <a 
                        href="https://www.youtube.com/watch?v=JIkgdtUAfGM&list=PLj8LyKdT6vm6V5h635rO3OCOsPBOsLYMH&index=3" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: "var(--gold-primary)", textDecoration: "underline", fontWeight: "500" }}
                      >
                        ¡Te espero!
                      </a></span>
                    : <span>Want to stop by YouTube? <a 
                        href="https://www.youtube.com/watch?v=JIkgdtUAfGM&list=PLj8LyKdT6vm6V5h635rO3OCOsPBOsLYMH&index=3" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: "var(--gold-primary)", textDecoration: "underline", fontWeight: "500" }}
                      >
                        I'll be there!
                      </a></span>
                  }
                </p>
              </div>
              
              <YouTubeThumbnail
                videoId="mgr1mkSRl3o"
                title={language === 'es' 
                  ? "Fernando Ferrari - Coaching de Liderazgo y Transformación Organizacional"
                  : "Fernando Ferrari - Leadership Coaching and Organizational Transformation"
                }
                className="max-w-4xl mx-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
