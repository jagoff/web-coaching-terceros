"use client";

import React from 'react';
import { Linkedin, Instagram } from "lucide-react";
import { scrollToElement, scrollToTop } from "@/lib/scroll";
import { useLanguage } from "@/contexts/LanguageContext";
import { logError, logWarn, logInfo } from "@/lib/logger";
import { useEffect } from "react";

const FooterLink = ({ href, children, className, isService = false }: { 
  href: string; 
  children: React.ReactNode; 
  className?: string;
  isService?: boolean;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Log after successful scroll
      setTimeout(() => {
        logInfo(`Footer link clicked: ${href}`, 'FooterLink', { href, found: true });
      }, 100);
    } else {
      logError(`Footer link target not found: ${href}`, 'FooterLink', { href, found: false });
    }
  };

  return (
    <a 
      href={href} 
      onClick={handleClick} 
      className={`${className || ''}`.replace(/\s+/g, ' ').trim()}
      style={{
        whiteSpace: "nowrap"
      }}
      suppressHydrationWarning
    >
      {children}
    </a>
  );
};

// Memoized version to prevent hydration issues
const MemoizedFooterLink = React.memo(FooterLink);
MemoizedFooterLink.displayName = 'FooterLink';

export default function Footer() {
  const navLinks = [
    { label: "Sobre Mí", href: "#sobre-mi" },
    { label: "Servicios", href: "#servicios" },
    { label: "Testimonios", href: "#testimonios" },
    { label: "Precios", href: "#precios" },
    { label: "Preguntas Frecuentes", href: "#faq" },
  ];

  const serviceLinks = [
    { label: "Coaching de Liderazgo", href: "#servicios" },
    { label: "Coaching Organizacional", href: "#servicios" },
    { label: "Sesión Gratuita", href: "#contacto" },
    { label: "Coaching Continuo", href: "#precios" },
  ];

  return (
    <footer key="footer-static" className="footer-bg" style={{ paddingTop: "clamp(3.5rem, 6vw, 5rem)" }} role="contentinfo" suppressHydrationWarning>
      <div className="container" suppressHydrationWarning>
        <div className="pb-12 sm:pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-16" suppressHydrationWarning>
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col justify-start" suppressHydrationWarning>
            <div className="flex items-center gap-2 mb-4" suppressHydrationWarning>
              <h3
                className="text-gradient font-heading font-black text-2xl tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                ELEVA
              </h3>
              <span
                className="text-xs font-semibold uppercase tracking-[0.15em] text-muted"
                style={{
                  opacity: 0.9,
                  alignSelf: "flex-end",
                  paddingBottom: "0.2rem"
                }}
                suppressHydrationWarning
              >
                COACHING
              </span>
            </div>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)", lineHeight: "1.8" }} suppressHydrationWarning>
              Transformación profesional y organizacional a través de coaching de excelencia.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/in/fernandorferrari"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: "rgba(124,107,196,0.1)",
                  color: "var(--gold-primary)",
                  border: "1px solid var(--gold-border)"
                }}
                suppressHydrationWarning
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(124,107,196,0.2)";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(124,107,196,0.1)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Linkedin size={18} suppressHydrationWarning />
              </a>
              <a
                href="https://instagram.com/jago_ff"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: "rgba(124,107,196,0.1)",
                  color: "var(--gold-primary)",
                  border: "1px solid var(--gold-border)"
                }}
                suppressHydrationWarning
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(124,107,196,0.2)";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(124,107,196,0.1)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Instagram size={18} suppressHydrationWarning />
              </a>
            </div>
          </div>

          {/* Navigation & Services - Side by side on mobile */}
          <div className="grid grid-cols-2 gap-8">
            {/* Navigation */}
            <div>
              <h3
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: "var(--gold-primary)", letterSpacing: "0.15em" }}
                suppressHydrationWarning
              >
                Navegación
              </h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <FooterLink
                      href={link.href}
                      className="text-sm transition-colors duration-200 footer-link"
                    >
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: "var(--gold-primary)", letterSpacing: "0.15em" }}
                suppressHydrationWarning
              >
                Servicios
              </h3>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <FooterLink
                      href={link.href}
                      className="text-sm transition-colors duration-200 footer-link"
                      isService={true}
                    >
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm" style={{ color: "var(--text-muted)" }} suppressHydrationWarning>
            © 2026 ELEVA COACHING. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-sm" style={{ color: "var(--text-muted)" }} suppressHydrationWarning>
            <span className="hidden sm:inline">Argentina 🇦🇷</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
