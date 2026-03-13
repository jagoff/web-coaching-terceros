"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToElement, scrollToTop } from "@/lib/scroll";
import { useLanguage } from "@/contexts/LanguageContext";


export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);

  // Rotating words for branding
  const rotatingWordsES = ['ELEVA', 'ELEVATE', 'ELEVARSE', 'ELEVARNOS', 'ELEVAREMOS'];
  const rotatingWordsEN = ['ELEVA', 'ELEVATE', 'ELEVATE', 'ELEVATE US', 'WE WILL ELEVATE'];
  const rotatingWords = language === 'es' ? rotatingWordsES : rotatingWordsEN;

  // Rotate words every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  const navLinks = [
    { label: t.nav.sobreMi, href: "#sobre-mi" },
    { label: t.nav.servicios, href: "#servicios" },
    { label: t.nav.metodo, href: "#proceso" },
    { label: t.nav.testimonios, href: "#testimonios" },
    { label: t.nav.precios, href: "#precios" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    scrollToElement(href);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} role="navigation" aria-label="Navegación principal">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2 group"
              aria-label="ELEVA Coaching — inicio"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
            >
              <span
                className="text-gradient font-heading font-black text-2xl tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                ELEVA
              </span>
              <span
                className="hidden sm:block text-xs font-semibold uppercase tracking-[0.15em] text-muted"
                style={{
                  transition: 'all 0.5s ease-in-out',
                  opacity: 0.9,
                  transform: 'translateY(0)'
                }}
              >
                {rotatingWords[currentWord]}
              </span>
            </a>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-10 xl:gap-12 list-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    className="nav-link bg-transparent border-0 cursor-pointer p-0"
                    onClick={() => handleLinkClick(link.href)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors"
                style={{
                  background: "rgba(124,107,196,0.08)",
                  borderColor: "rgba(124,107,196,0.2)",
                  color: "var(--gold-primary)",
                }}
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              >
                <span className="text-sm">{language === 'es' ? '🇺🇸' : '🇪🇸'}</span>
                <span className="text-sm font-medium">{language === 'es' ? 'EN' : 'ES'}</span>
              </button>
              <button
                className="btn-primary"
                style={{ padding: "0.875rem 1.75rem", fontSize: "0.875rem" }}
                onClick={() => handleLinkClick("#contacto")}
              >
                {t.nav.sesionGratuita}
              </button>
            </div>

            {/* Mobile hamburger + language */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Mobile language button - EXTRA VISIBLE */}
              <button
                className="flex items-center gap-2 px-4 py-3 rounded-xl border-2"
                style={{
                  background: "rgba(199, 123, 90, 0.2)",
                  borderColor: "rgba(199, 123, 90, 0.5)",
                  color: "#C87B5A",
                  fontSize: "14px",
                  fontWeight: "800",
                  minWidth: "90px",
                  height: "48px",
                  boxShadow: "0 3px 12px rgba(199, 123, 90, 0.4)",
                  textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                  position: "relative",
                  zIndex: 50,
                  borderStyle: "solid",
                  borderWidth: "2px"
                }}
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              >
                <span style={{ fontSize: "18px" }}>{language === 'es' ? '🇺🇸' : '🇪🇸'}</span>
                <span style={{ fontSize: "13px", fontWeight: "900" }}>{language === 'es' ? 'EN' : 'ES'}</span>
              </button>
              
              <button
                className="flex items-center justify-center rounded-md transition-colors w-11 h-11 text-text-secondary bg-transparent border-0"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 flex flex-col lg:hidden"
            style={{
              background: "rgba(12, 10, 18, 0.98)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              zIndex: 9999,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b"
              style={{ borderColor: "var(--dark-border)" }}>
              <span
                className="text-gradient font-heading font-black text-2xl tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                ELEVA
              </span>
              <button
                className="flex items-center justify-center rounded-md w-11 h-11 text-text-secondary"
                onClick={() => setMobileOpen(false)}
                aria-label="Cerrar menú"
              >
                <X size={22} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col flex-1 justify-center px-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                  className="text-left py-4 text-2xl font-heading font-semibold bg-transparent cursor-pointer mobile-nav-link"
                  style={{
                    borderBottom: "1px solid var(--dark-border)",
                    fontFamily: "var(--font-heading)",
                  }}
                  onClick={() => handleLinkClick(link.href)}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            {/* Mobile CTA Button */}
            <div className="px-8 pb-6">
              <button
                className="btn-primary w-full"
                onClick={() => handleLinkClick("#contacto")}
              >
                {t.nav.sesionGratuita}
              </button>
            </div>

            {/* Language Toggle */}
            <div className="px-8 pb-8">
              <div className="flex justify-center">
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border-2"
                  style={{
                    background: "rgba(124,107,196,0.25)",
                    borderColor: "rgba(124,107,196,0.6)",
                    color: "#7C6BC4",
                    fontSize: "16px",
                    fontWeight: "700",
                    boxShadow: "0 4px 16px rgba(124,107,196,0.4)",
                    textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                    minWidth: "140px",
                    height: "56px"
                  }}
                  onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                >
                  <span style={{ fontSize: "20px" }}>{language === 'es' ? '🇺🇸' : '🇪🇸'}</span>
                  <span style={{ fontSize: "14px", fontWeight: "800" }}>{language === 'es' ? 'EN' : 'ES'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
