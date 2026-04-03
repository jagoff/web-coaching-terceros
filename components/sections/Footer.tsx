"use client";

import React from "react";
import { Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import NoSSR from "@/components/NoSSR";

export default function Footer() {
  const { t, language } = useLanguage();

  const navLinks = [
    { label: t.footer.navLinks.sobreMi,              href: "/sobre-mi" },
    { label: t.footer.navLinks.servicios,             href: "/servicios" },
    { label: t.footer.navLinks.testimonios,           href: "/testimonios" },
    { label: t.footer.navLinks.precios,               href: "/precios" },
    { label: t.footer.navLinks.preguntasFrecuentes,   href: "/faq" },
  ];

  const fallbackLinks = [
    { label: "Sobre Mí",             href: "/sobre-mi" },
    { label: "Servicios",            href: "/servicios" },
    { label: "Testimonios",          href: "/testimonios" },
    { label: "Precios",              href: "/precios" },
    { label: "Preguntas Frecuentes", href: "/faq" },
  ];

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: "1px solid var(--dark-border)",
        background: "var(--bg-primary)",
        paddingTop: "clamp(1rem, 2vw, 1.5rem)",
        paddingBottom: "clamp(1rem, 2vw, 1.5rem)",
      }}
    >
      <div
        className="container flex flex-col sm:flex-row items-center justify-end gap-4"
        suppressHydrationWarning
      >
        {/* Nav links — hidden on small mobile, row on sm+ */}
        <nav aria-label="Footer navigation" className="order-2 sm:order-1">
          <ul className="hidden sm:flex items-center gap-5 flex-wrap justify-center">
            <NoSSR
              fallback={fallbackLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs transition-colors duration-200 footer-link"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs transition-colors duration-200 footer-link"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </NoSSR>
          </ul>
        </nav>

        {/* Right: Logo + Instagram + copyright */}
        <div className="flex items-center gap-3 flex-shrink-0 order-1 sm:order-2">
          {/* Logo */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span
              className="text-gradient font-black tracking-tight"
              style={{ fontFamily: "var(--font-heading)", fontSize: "1rem" }}
            >
              ELEVA
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--text-muted)", paddingBottom: "1px" }}
            >
              <NoSSR fallback="CONSULTORIA">
                {language === "es" ? "CONSULTORIA" : "CONSULTING"}
              </NoSSR>
            </span>
          </div>
          
          <span
            className="text-xs"
            style={{ color: "var(--text-muted)", whiteSpace: "nowrap" }}
            suppressHydrationWarning
          >
            © 2026
          </span>
          
          <a
            href="https://instagram.com/jago_ff"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de ELEVA Consultoria"
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{
              background: "rgba(124,107,196,0.1)",
              border: "1px solid var(--gold-border)",
              color: "var(--gold-primary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(124,107,196,0.2)";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(124,107,196,0.1)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Instagram size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
