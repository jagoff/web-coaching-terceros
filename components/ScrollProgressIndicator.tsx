"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface Section {
  id: string;
  label: string;
  labelEn: string;
}

const sections: Section[] = [
  { id: "hero", label: "Inicio", labelEn: "Home" },
  { id: "titulo-about", label: "Sobre Mí", labelEn: "About" },
  { id: "titulo-servicios", label: "Servicios", labelEn: "Services" },
  { id: "titulo-proceso", label: "Proceso", labelEn: "Process" },
  { id: "titulo-testimonios", label: "Testimonios", labelEn: "Testimonials" },
  { id: "titulo-resultados", label: "Resultados", labelEn: "Results" },
  { id: "titulo-precios", label: "Precios", labelEn: "Pricing" },
  { id: "contacto", label: "Contacto", labelEn: "Contact" },
];

export default function ScrollProgressIndicator() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Show indicator after scrolling past hero
      setIsVisible(window.scrollY > 300);

      // Find active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          
          if (scrollPosition >= elementTop) {
            setActiveSection(i);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden"
        >
          {/* Container with glassmorphism */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-full backdrop-blur-xl"
            style={{
              background: "rgba(12, 10, 18, 0.85)",
              border: "1px solid rgba(124, 107, 196, 0.3)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            }}
          >
            {/* Section dots */}
            <div className="flex items-center gap-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => {
                    const element = document.getElementById(section.id);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  className="relative group"
                  aria-label={`Ir a ${language === 'es' ? section.label : section.labelEn}`}
                >
                  {/* Dot */}
                  <motion.div
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: activeSection === index ? "24px" : "8px",
                      height: "8px",
                      background:
                        activeSection === index
                          ? "linear-gradient(135deg, var(--gold-primary), var(--purple-primary))"
                          : "rgba(124, 107, 196, 0.3)",
                    }}
                    animate={{
                      scale: activeSection === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Tooltip on hover */}
                  <div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: "rgba(12, 10, 18, 0.95)",
                      border: "1px solid rgba(124, 107, 196, 0.4)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {language === 'es' ? section.label : section.labelEn}
                    {/* Arrow */}
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 -mt-px"
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "4px solid transparent",
                        borderRight: "4px solid transparent",
                        borderTop: "4px solid rgba(124, 107, 196, 0.4)",
                      }}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Active section label */}
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="text-xs font-semibold tracking-wide"
              style={{
                color: "var(--gold-primary)",
                minWidth: "70px",
                textAlign: "center",
              }}
            >
              {language === 'es' 
                ? sections[activeSection].label 
                : sections[activeSection].labelEn
              }
            </motion.div>

            {/* Progress percentage */}
            <div
              className="text-xs font-mono tabular-nums"
              style={{ color: "var(--text-muted)" }}
            >
              {Math.round(((activeSection + 1) / sections.length) * 100)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
