"use client";

import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
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
  { label: "Coaching de Vida", href: "#servicios" },
  { label: "Coaching de Negocios", href: "#servicios" },
  { label: "Sesión Gratuita", href: "#contacto" },
  { label: "Programa Élite", href: "#precios" },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/eleva.coaching" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/eleva-coaching" },
  { icon: Youtube, label: "YouTube", href: "https://youtube.com/@eleva.coaching" },
];

const legalLinks = [
  { label: "Política de privacidad", href: "#" },
  { label: "Aviso legal", href: "#" },
  { label: "Cookies", href: "#" },
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
    <footer className="footer-bg" role="contentinfo">
      <div className="container">
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 lg:gap-16">
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
                  href="mailto:hola@eleva.coaching"
                  className="flex items-center gap-2 text-sm transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--text-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  <Mail size={14} className="flex-shrink-0" />
                  hola@eleva.coaching
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/34600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--text-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  <Phone size={14} className="flex-shrink-0" />
                  +34 600 000 000
                </a>
              </li>
              <li>
                <span
                  className="flex items-start gap-2 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                  España · Online (todo el mundo)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-8 border-t flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{ borderColor: "var(--dark-border)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2026 ELEVA Coaching. Todos los derechos reservados.
          </p>

          {/* Social */}
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  color: "var(--text-muted)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--gold-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs footer-link transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
