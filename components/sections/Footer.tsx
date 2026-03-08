"use client";

import { Linkedin, Instagram } from "lucide-react";
import { scrollToElement, scrollToTop } from "@/lib/scroll";

const navLinks = [
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Servicios", href: "#servicios" },
  { label: "Mi Método", href: "#proceso" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Precios", href: "#precios" },
];

const serviceLinks = [
  { label: "Coaching de Liderazgo", href: "#servicios" },
  { label: "Consultoría Organizacional", href: "#servicios" },
  { label: "Sesión Gratuita", href: "#contacto" },
  { label: "Consultoría Continua", href: "#precios" },
];



function ScrollLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToElement(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="footer-bg" style={{ paddingTop: "clamp(3.5rem, 6vw, 5rem)" }} role="contentinfo">
      <div className="container">
        <div className="pb-12 sm:pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3
              className="text-gradient font-heading font-black text-2xl tracking-tight mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              ELEVA
            </h3>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              Transformando líderes tech y organizaciones a través de coaching práctico y consultoría ágil que genera resultados medibles.
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(124,107,196,0.2)";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(124,107,196,0.1)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Linkedin size={18} />
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(124,107,196,0.2)";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(124,107,196,0.1)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: "var(--gold-primary)", letterSpacing: "0.15em" }}
            >
              Navegación
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <ScrollLink
                    href={link.href}
                    className="text-sm transition-colors duration-200 footer-link"
                  >
                    {link.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: "var(--gold-primary)", letterSpacing: "0.15em" }}
            >
              Servicios
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <ScrollLink
                    href={link.href}
                    className="text-sm transition-colors duration-200 footer-link"
                  >
                    {link.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "var(--dark-border)" }}
        >
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            © 2024 ELEVA Coaching. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-sm" style={{ color: "var(--text-muted)" }}>
            <a href="mailto:fernandoferrari@gmail.com" className="footer-link">
              fernandoferrari@gmail.com
            </a>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Argentina 🇦🇷</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
