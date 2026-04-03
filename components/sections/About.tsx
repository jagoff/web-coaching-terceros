"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { CheckCircle2, ExternalLink, Linkedin } from "lucide-react";
import YouTubeThumbnail from "../YouTubeThumbnail";
import { ParallaxHeroImages } from "@/components/ui/parallax-hero-images";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { useLanguage } from "@/contexts/LanguageContext";
import DOMPurify from "isomorphic-dompurify";

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

// Array of 12 unique carousel images for the grid
const baseImages = [
  'slide-01.png',
  'slide-02.png', 
  'slide-03.png',
  'slide-04.png',
  'slide-05.png',
  'slide-06.png',
  'slide-07.png',
  'slide-08.png',
  'slide-09.png',
  'slide-10.png',
  'slide-11.png',
  'slide-12.png'
];

const getImagePaths = (imageName: string) => {
  // Usar imágenes optimizadas con soporte WebP
  const originalPath = `/images/carousel/${imageName}`;
  return originalPath; // Simplificado para desktop grid
};

export default function About() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [shuffledCredentials, setCredentials] = useState(credentials);
  const [buttonPosition, setButtonPosition] = useState(0);
  const [clickCount, setClickCount] = useState<{ [key: number]: number }>({});
  
  // Pre-calcular todas las rutas para desktop grid
  const optimizedImagePaths = baseImages.map(imageName => getImagePaths(imageName));

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
      try {
        const saved = localStorage.getItem('linkedinButtonMetrics');
        if (saved) {
          setClickCount(JSON.parse(saved));
        }
      } catch {
        // localStorage unavailable or JSON parse failed — proceed with defaults
      }
    }
  }, []);

  const handleLinkedInClick = () => {
    // Track click position
    setClickCount(prev => {
      const newCount = { ...prev, [buttonPosition]: (prev[buttonPosition] || 0) + 1 };
      try {
        localStorage.setItem('linkedinButtonMetrics', JSON.stringify(newCount));
      } catch {
        // localStorage unavailable — skip persisting metrics
      }
      return newCount;
    });
  };

  return (
    <section
      id="sobre-mi"
      className="section section-surface section-gold-border-top"
      ref={ref}
      style={{ 
        paddingTop: "clamp(0.25rem, 1vw, 1rem)",
        paddingBottom: "clamp(1rem, 2.5vw, 1.5rem)"
      }}
    >
      <div className="container">

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center relative mt-24 lg:mt-40">
          {/* Image column */}
          <motion.div
            custom={-60}
            variants={slideReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative order-2 lg:order-1 mt-4 z-0"
            style={{ 
              paddingTop: 'clamp(1rem, 10vw, 1rem)',
            }}
          >
            
            {/* Image Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <div className="relative rounded-lg w-full">
                <ParallaxHeroImages 
                  images={optimizedImagePaths} 
                  className="w-full"
                />
              </div>
            </motion.div>

            {/* YouTube Video Section */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  <span className="text-gradient">
                    {language === 'es' ? 'Conocé mi enfoque' : 'See My Approach'}
                  </span>
                </h3>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
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
              />
            </motion.div>
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
              className="heading-xl mb-6 sm:mb-10 px-4 sm:px-0" 
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="sm:hidden block text-gradient">{t.about.title1}{" "}{t.about.title2}</span>
              <span className="hidden sm:inline">{t.about.title1}{" "}</span>
              <span className="hidden sm:inline text-gradient">{t.about.title2}{" "}</span>
              <span className="block sm:inline">{t.about.title3}</span>
            </h2>

            <div className="divider-gold-left mb-6 sm:mb-10" />

            <div 
              className="lead-text mb-6 sm:mb-8"
              style={{
                maxWidth: '100%',
                overflow: 'hidden',
                wordWrap: 'break-word',
                wordBreak: 'break-word',
                hyphens: 'auto',
                boxSizing: 'border-box',
                padding: '0',
                margin: '0',
                position: 'relative',
                zIndex: 1
              }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(t.about.intro) }}
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
              {shuffledCredentials.map((credential, index) => {
                const shouldShowLinkedInBefore = index === buttonPosition;
                
                return (
                  <React.Fragment key={`credential-${index}`}>
                    {shouldShowLinkedInBefore && (
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
                    )}
                    <motion.div
                      key={credential}
                      variants={credentialPop}
                      className="credential-chip"
                    >
                      <CheckCircle2 size={14} style={{ color: "var(--gold-primary)", flexShrink: 0 }} />
                      <span>{credential}</span>
                    </motion.div>
                    {index === shuffledCredentials.length - 1 && buttonPosition > index && (
                      <motion.div
                        key="linkedin-button-end"
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
                    )}
                  </React.Fragment>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
