"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Linkedin, Instagram } from "lucide-react";
import { scrollToElement, scrollToTop } from "@/lib/scroll";
import { useLanguage } from "@/contexts/LanguageContext";
import logger from "@/lib/logger";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);
  const cachedContactTop = useRef<number | null>(null);

  const navLinks = [
    { label: t.nav.sobreMi, href: "/sobre-mi#titulo-about" },
    { label: t.nav.servicios, href: "/servicios#titulo-servicios" },
    { label: t.nav.testimonios, href: "/testimonios#titulo-testimonios" },
    { label: t.nav.preguntasFrecuentes, href: "/faq#titulo-faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const now = Date.now();

      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = documentHeight > 0 ? (currentScrollY / documentHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Throttle getBoundingClientRect calls to at most once every 100ms
      let shouldHide = false;
      const contactSection = document.querySelector('#contacto');
      if (contactSection) {
        if (now - lastScrollTime.current >= 100 || cachedContactTop.current === null) {
          lastScrollTime.current = now;
          const contactRect = contactSection.getBoundingClientRect();
          cachedContactTop.current = contactRect.top + window.scrollY;
        }
        const contactTop = cachedContactTop.current;
        shouldHide = currentScrollY > (contactTop - 200);

        // Log when approaching contact section
        if (shouldHide && currentScrollY > (contactTop - 250) && currentScrollY < (contactTop - 240)) {
          logger.info('Approaching contact section - navbar will hide', {
            component: 'Navbar',
            data: { scrollY: currentScrollY, contactTop, distance: contactTop - currentScrollY }
          });
        }
      } else {
        logger.warn('Contact section not found for auto-hide', { component: 'Navbar' });
      }
      
      // Hide when scrolling down near contact, show when scrolling up
      if (shouldHide) {
        if (visible) {
          logger.info('Navbar hiding - near contact section', { component: 'Navbar', data: { scrollY: currentScrollY } });
        }
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        if (!visible) {
          logger.info('Navbar showing - scrolling up', { component: 'Navbar', data: { scrollY: currentScrollY } });
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
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-900/20"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
        suppressHydrationWarning={true}
      >
        <div
          className="h-full transition-all duration-100 ease-out"
          style={{
            background: 'linear-gradient(90deg, #87CEEB 0%, #ADD8E6 50%, #B0E0E6 100%)',
            width: `${scrollProgress}%`
          }}
          suppressHydrationWarning={true}
        />
      </div>

      {/* Navbar is position:fixed — no spacer needed, it doesn't affect document flow */}
      
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
          <div className="flex items-center justify-between gap-8">
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
                className="text-gradient font-heading font-black text-2xl tracking-tight mt-[calc(2.5rem+2px)]"
                style={{ fontFamily: "var(--font-heading)", lineHeight: "0.8" }}
              >
                ELEVA
              </span>
              <span
                className="text-[0.5rem] font-semibold uppercase tracking-[0.2em] text-muted -mt-[calc(0.4rem+16px)]"
                style={{
                  opacity: 0.85,
                  lineHeight: "0.8"
                }}
              >
                {language === 'es' ? 'CONSULTORIA' : 'CONSULTING'}
              </span>
            </a>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-8 list-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    className="nav-link bg-transparent border-0 cursor-pointer p-0 whitespace-nowrap"
                    onClick={() => handleLinkClick(link.href)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              {/* Desktop CTA Button */}
              <button
                id="navbar-cta-primary"
                className="navbar-cta-primary"
                onClick={() => handleLinkClick("/#contacto")}
                aria-label="Agendar sesión gratuita de coaching"
              >
                {t.nav.sesionGratuita}
              </button>
            </div>

            {/* Mobile hamburger + language */}
            <div className="lg:hidden flex items-center gap-8">
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
                className="flex items-center justify-center rounded-md transition-colors w-11 h-11 bg-transparent border-0"
                style={{ color: "var(--text-secondary)" }}
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
            transition={{ duration: 0.15 }}
            className="fixed inset-0 flex flex-col lg:hidden"
            style={{
              background: "rgba(12, 10, 18, 0.95)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 9999,
            }}
          >
            {/* Ultra Simple Close Button */}
            <div className="flex justify-end p-4">
              <button
                className="p-2"
                style={{ color: "var(--text-secondary)" }}
                onClick={() => setMobileOpen(false)}
                aria-label="Cerrar menú"
              >
                <X size={18} />
              </button>
            </div>

            {/* Ultra Minimal Menu Links */}
            <nav className="flex flex-col items-center justify-center flex-1 px-4">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.2 }}
                  className="text-2xl font-light text-center py-4 bg-transparent cursor-pointer"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--text-primary)",
                    letterSpacing: "0.01em"
                  }}
                  onClick={() => handleLinkClick(link.href)}
                >
                  {link.label}
                </motion.button>
              ))}
              
              {/* Ultra Simple CTA */}
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.03, duration: 0.2 }}
                className="mt-6 text-lg font-light"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--gold-primary)",
                  letterSpacing: "0.01em"
                }}
                onClick={() => handleLinkClick("#contacto")}
              >
                {t.nav.sesionGratuita}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
