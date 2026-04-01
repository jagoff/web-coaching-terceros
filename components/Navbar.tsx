"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Linkedin, Instagram } from "lucide-react";
import { scrollToElement, scrollToTop } from "@/lib/scroll";
import { useLanguage } from "@/contexts/LanguageContext";
import { logError, logWarn, logInfo } from "@/lib/logger";


export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const navLinks = [
    { label: t.nav.sobreMi, href: "/sobre-mi#titulo-about" },
    { label: t.nav.servicios, href: "/servicios#titulo-servicios" },
    { label: t.nav.testimonios, href: "/testimonios#titulo-testimonios" },
    { label: t.nav.preguntasFrecuentes, href: "/faq#titulo-faq" },
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
    
    // If clicking on "Sobre mí", "Servicios", "Testimonios", or "FAQ", hide navbar immediately and navigate smoothly
    if (href.includes('/sobre-mi') || href.includes('/servicios') || href.includes('/testimonios') || href.includes('/faq')) {
      setVisible(false);
      
      // Add scroll listener to show navbar again
      const handleScroll = () => {
        // Show navbar with smooth animation
        setVisible(true);
        document.removeEventListener('scroll', handleScroll);
      };
      
      // Show navbar on scroll after a short delay
      setTimeout(() => {
        document.addEventListener('scroll', handleScroll);
      }, 1000); // Wait 1 second before enabling scroll detection
      
      // Auto-remove listener after 10 seconds as fallback
      setTimeout(() => {
        document.removeEventListener('scroll', handleScroll);
      }, 10000);
      
      // Navigate smoothly without page reload
      if (href.includes('#')) {
        // If it has a hash, navigate to the page then scroll
        const [pagePath, hash] = href.split('#');
        if (window.location.pathname !== pagePath) {
          window.location.href = href;
        } else {
          // Already on the page, just scroll to the hash
          const element = document.querySelector(`#${hash}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      } else {
        window.location.href = href;
      }
      return;
    }
    
    // Check if it's an internal route (starts with /)
    if (href.startsWith('/')) {
      window.location.href = href;
    } else {
      // For hash links, use scroll behavior
      if (window.innerWidth < 1024) {
        const el = document.querySelector(href);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      } else {
        scrollToElement(href);
      }
    }
  };

  return (
    <>
      {/* Navbar placeholder to prevent content jump */}
      <motion.div 
        style={{ 
          height: visible ? '0px' : '88px', // Calculado: padding 1.5rem*2 + contenido ~44px
          transition: 'height 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
        }} 
      />
      
      <AnimatePresence>
        {visible && (
          <motion.nav
            className={`navbar${scrolled ? " scrolled" : ""}`}
            role="navigation"
            aria-label="Navegación principal"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="relative flex flex-col items-center group"
              aria-label={`ELEVA CONSULTORIA — inicio`}
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
            >
              <span
                className="text-gradient font-heading font-black text-2xl tracking-tight mt-[3.44rem]"
                style={{ fontFamily: "var(--font-heading)", lineHeight: "0.8" }}
              >
                ELEVA
              </span>
              <span
                className="text-[0.5rem] font-semibold uppercase tracking-[0.2em] text-muted -mt-[13rem]"
                style={{
                  opacity: 0.85,
                  lineHeight: "0.8"
                }}
              >
                {language === 'es' ? 'CONSULTORIA' : 'CONSULTING'}
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
                  color: "var(--text-secondary)",
                  minWidth: "65px"
                }}
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                aria-label={language === 'es' ? 'Cambiar idioma a inglés' : 'Change language to Spanish'}
              >
                <span style={{ fontSize: "0.7rem" }}>{language === 'es' ? '🇺🇸' : '🇪🇸'}</span>
                <span style={{ fontSize: "0.65rem", fontWeight: "500" }}>{language === 'es' ? 'EN' : 'ES'}</span>
              </button>
              {/* Desktop CTA - DO NOT ADD INLINE STYLES - protected by CSS rules */}
              <button
                id="navbar-cta-primary"
                style={{
                  background: '#FF6B35 !important',
                  color: '#FFFFFF !important',
                  border: '1.5px solid rgba(255, 255, 255, 0.5) !important',
                  boxShadow: '0 0 16px rgba(255, 107, 53, 0.15) !important',
                  borderRadius: '0.5rem !important',
                  padding: '0.75rem 1.5rem !important',
                  fontWeight: '600 !important',
                  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif !important',
                  fontSize: '0.8rem !important',
                  letterSpacing: '0.04em !important',
                  textTransform: 'uppercase !important',
                  cursor: 'pointer !important',
                  transition: 'all 0.3s ease !important'
                }}
                onClick={() => handleLinkClick("/#contacto")}
                aria-label="Agendar sesión gratuita de coaching"
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
                  color: "var(--text-secondary)",
                  fontSize: "13px",
                  fontWeight: "700",
                  minWidth: "85px",
                  height: "44px",
                  boxShadow: "0 2px 8px rgba(124,107,196,0.3)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)"
                }}
                onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                aria-label={language === 'es' ? 'Cambiar idioma a inglés' : 'Change language to Spanish'}
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
                  {language === 'es' ? 'CONSULTORIA' : 'CONSULTING'}
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
            <nav className="flex flex-col px-8 gap-2 pt-8">
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

            {/* Redes Sociales */}
            <div className="flex items-center justify-center gap-4 px-8 py-6">
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center bg-black/50 text-white hover:bg-black/70 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={18} />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center bg-black/50 text-white hover:bg-black/70 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center bg-black/50 text-white hover:bg-black/70 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={18} />
              </motion.a>
            </div>

            {/* Mobile CTA Button - DO NOT ADD INLINE STYLES - protected by CSS rules */}
            <div className="px-8 pb-6">
              <button
                id="navbar-cta-mobile"
                className="w-full"
                style={{
                  background: '#FF6B35 !important',
                  color: '#FFFFFF !important',
                  border: '1.5px solid rgba(255, 255, 255, 0.5) !important',
                  boxShadow: '0 0 16px rgba(255, 107, 53, 0.15) !important',
                  borderRadius: '0.5rem !important',
                  padding: '0.75rem 1.5rem !important',
                  fontWeight: '600 !important',
                  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif !important',
                  fontSize: '0.8rem !important',
                  letterSpacing: '0.04em !important',
                  textTransform: 'uppercase !important',
                  cursor: 'pointer !important',
                  transition: 'all 0.3s ease !important'
                }}
                onClick={() => handleLinkClick("#contacto")}
              >
                {t.nav.sesionGratuita}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
