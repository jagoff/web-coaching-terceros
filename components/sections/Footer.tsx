"use client";

import { Mail, MapPin, Linkedin, Instagram } from "lucide-react";
import { scrollToElement, scrollToTop } from "@/lib/scroll";

const navLinks = [
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Servicios", href: "#servicios" },
  { label: "Mi Método", href: "#proceso" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Precios", href: "#precios" },
  { label: "Contacto", href: "#contacto" },
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
        <div className="pb-12 sm:pb-16 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">
          {/* Links — Navigation + Services combined */}
          <div className="grid grid-cols-2 gap-6">
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

          {/* Contact */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-5"
              style={{ color: "var(--gold-primary)", letterSpacing: "0.15em" }}
            >
              Contacto
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:fernandoferrari@gmail.com"
                  className="flex items-center gap-2 text-sm contact-link"
                >
                  <Mail size={14} className="flex-shrink-0" />
                  fernandoferrari@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/fernandorferrari"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm contact-link"
                >
                  <Linkedin size={14} className="flex-shrink-0" />
                  /in/fernandorferrari
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/jago_ff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm contact-link"
                >
                  <Instagram size={14} className="flex-shrink-0" />
                  @jago_ff
                </a>
              </li>
              <li>
                <span
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                  Santa Fe, Argentina · Online (todo el mundo)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-8 border-t"
          style={{ borderColor: "var(--dark-border)" }}
        />
      </div>
    </footer>
  );
}
