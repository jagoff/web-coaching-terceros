"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToElement, scrollToTop } from "@/lib/scroll";
import { useLanguage } from "@/contexts/LanguageContext";
import { logError, logWarn, logInfo } from "@/lib/logger";


export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Rotating words for branding
  const rotatingWordsES = ['ELEVA', 'ELEVATE', 'ELEVARSE', 'ELEVARNOS', 'ELEVAREMOS'];
  const rotatingWordsEN = ['ELEVA', 'ELEVATE', 'ELEVATE', 'ELEVATE US', 'WE WILL ELEVATE'];
  const rotatingWords = language === 'es' ? rotatingWordsES : rotatingWordsEN;

  // Rotate words every 2 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, [rotatingWords.length]);

  const navLinks = [
    { label: t.nav.sobreMi, href: "#sobre-mi" },
    { label: t.nav.servicios, href: "#servicios" },
    { label: t.nav.testimonios, href: "#testimonios" },
    { label: t.nav.preguntasFrecuentes, href: "#faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const contactSection = document.querySelector('#contacto');
      
      // Check if near contact section (200px before)
      let shouldHide = false;
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        const contactTop = contactRect.top + window.scrollY;
        shouldHide = currentScrollY > (contactTop - 200);
        
        // Log when approaching contact section
        if (shouldHide && currentScrollY > (contactTop - 250) && currentScrollY < (contactTop - 240)) {
          logInfo('Approaching contact section - navbar will hide', 'Navbar', {
            scrollY: currentScrollY,
            contactTop,
            distance: contactTop - currentScrollY
          });
        }
      } else {
        logWarn('Contact section not found for auto-hide', 'Navbar');
      }
      
      // Hide when scrolling down near contact, show when scrolling up
      if (shouldHide) {
        if (visible) {
          logInfo('Navbar hiding - near contact section', 'Navbar', { scrollY: currentScrollY });
        }
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        if (!visible) {
          logInfo('Navbar showing - scrolling up', 'Navbar', { scrollY: currentScrollY });
        }
        setVisible(true);
      }
      
      setScrolled(currentScrollY > 40);
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible]);

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
    // For mobile, use native scroll to avoid Lenis issues
    if (window.innerWidth < 1024) {
      const el = document.querySelector(href);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } else {
      scrollToElement(href);
    }
  };

  return (
    <>
      {/* Navbar placeholder to prevent content jump */}
      <motion.div 
        style={{ 
          height: visible ? '0px' : '88px', // Calculado: padding 1.5rem*2 + contenido ~44px
          transition: 'height 0.3s easeInOut'
        }} 
      />
      
      <AnimatePresence>
        {visible && (
          <motion.nav
            className={`navbar${scrolled ? " scrolled" : ""}`}
            role="navigation"
            aria-label="Navegación principal"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2 group"
              aria-label={`ELEVA CONSULTORIA — inicio`}
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
                  opacity: 0.9,
                  alignSelf: "flex-end",
                  paddingBottom: "0.2rem"
                }}
              >
                {language === 'es' ? 'COACHING' : 'COACHING'}
              </span>
            </a>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-12 xl:gap-16 list-none">
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
                <span style={{ fontSize: "0.75rem" }}>{language === 'es' ? '🇺🇸' : '🇪🇸'}</span>
                <span style={{ fontSize: "0.75rem", fontWeight: "500" }}>{language === 'es' ? 'EN' : 'ES'}</span>
              </button>
              <button
                className="btn-primary"
                style={{ 
                  padding: "0.875rem 1.75rem", 
                  fontSize: "0.75rem", /* Reduced from 0.875rem (-2 points) */
                  background: "linear-gradient(135deg, #FF6B35 0%, #E67E22 30%, #8E44AD 70%, #7C6BC4 100%) !important",
                  boxShadow: "none !important",
                  border: "1px solid rgba(255, 255, 255, 0.2) !important"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.setProperty('background', 'linear-gradient(135deg, #E67E22 0%, #FF6B35 30%, #7C6BC4 70%, #8E44AD 100%)', 'important');
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.setProperty('background', 'linear-gradient(135deg, #FF6B35 0%, #E67E22 30%, #8E44AD 70%, #7C6BC4 100%)', 'important');
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onClick={() => handleLinkClick("#contacto")}
              >
                {t.nav.sesionGratuita}
              </button>
            </div>

            {/* Mobile hamburger + language */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Mobile language button - BACKUP */}
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2"
                style={{
                  background: "rgba(124,107,196,0.2)",
                  borderColor: "rgba(124,107,196,0.5)",
                  color: "#7C6BC4",
                  fontSize: "13px",
                  fontWeight: "700",
                  minWidth: "80px",
                  height: "44px",
                  boxShadow: "0 2px 8px rgba(124,107,196,0.3)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)"
                }}
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              >
                <span style={{ fontSize: "16px" }}>{language === 'es' ? '🇺🇸' : '🇪🇸'}</span>
                <span style={{ fontSize: "12px", fontWeight: "800" }}>{language === 'es' ? 'EN' : 'ES'}</span>
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
          </motion.nav>
        )}
      </AnimatePresence>

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
              <div className="flex items-center gap-2">
                <span
                  className="text-gradient font-heading font-black text-2xl tracking-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  ELEVA
                </span>
                <span
                  className="text-xs font-semibold uppercase tracking-[0.15em] text-muted"
                  style={{
                    opacity: 0.9,
                    alignSelf: "flex-end",
                    paddingBottom: "0.2rem"
                  }}
                >
                  {language === 'es' ? 'COACHING' : 'COACHING'}
                </span>
              </div>
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
