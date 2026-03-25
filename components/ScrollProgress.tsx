"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToElement } from "@/lib/scroll";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ScrollProgress() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  const sections = [
    { id: "inicio", label: t.scrollProgress.inicio },
    { id: "sobre-mi", label: t.scrollProgress.sobreMi },
    { id: "servicios", label: t.scrollProgress.servicios },
    { id: "proceso", label: t.scrollProgress.proceso },
    { id: "testimonios", label: t.scrollProgress.testimonios },
    { id: "resultados", label: t.scrollProgress.resultados },
    { id: "precios", label: t.scrollProgress.precios },
    { id: "faq", label: t.scrollProgress.faq },
    { id: "contacto", label: t.scrollProgress.contacto },
  ];

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
          aria-label={t.scrollProgress.navigation}
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
                  aria-label={t.scrollProgress.goToSection.replace('{section}', section.label)}
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
