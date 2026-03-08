"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToElement } from "@/lib/scroll";

const sections = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "servicios", label: "Servicios" },
  { id: "proceso", label: "Método" },
  { id: "testimonios", label: "Testimonios" },
  { id: "resultados", label: "Resultados" },
  { id: "precios", label: "Precios" },
  { id: "faq", label: "FAQ" },
  { id: "contacto", label: "Contacto" },
];

export default function ScrollProgress() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show dots only after scrolling past the hero a bit
      setVisible(window.scrollY > 300);

      // Find which section is currently in view
      let currentIndex = 0;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            currentIndex = i;
            break;
          }
        }
      }
      setActiveIndex(currentIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="scroll-dots-nav"
          aria-label="Navegación por secciones"
        >
          {sections.map((section, i) => {
            const isActive = i === activeIndex;
            const isHovered = i === hoveredIndex;
            return (
              <div
                key={section.id}
                className="scroll-dot-row"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: 8, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="scroll-dot-label"
                    >
                      {section.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                <button
                  className={`scroll-dot${isActive ? " active" : ""}`}
                  onClick={() => scrollToElement(`#${section.id}`)}
                  aria-label={`Ir a ${section.label}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <motion.div
                    className="scroll-dot-inner"
                    animate={{
                      scale: isActive ? 1 : 0.5,
                      backgroundColor: isActive
                        ? "var(--gold-primary)"
                        : "var(--dark-border)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </button>
              </div>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
