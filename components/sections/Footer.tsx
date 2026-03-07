"use client";

import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";

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
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
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
        <div className="py-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-20">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                aria-label="ELEVA Coaching — inicio"
              >
                <span
                  className="text-gradient font-black text-3xl tracking-tight"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  ELEVA
                </span>
              </a>
            </div>
            <p
              className="text-sm leading-relaxed mb-10"
              style={{ color: "var(--text-muted)" }}
            >
              Coaching que transforma.
              <br />
              Para personas que saben que pueden más.
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
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--dark-border)",
                    color: "var(--text-muted)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--gold-primary)";
                    e.currentTarget.style.color = "var(--gold-primary)";
                    e.currentTarget.style.background = "rgba(212,175,55,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--dark-border)";
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-7"
              style={{ color: "var(--gold-primary)", letterSpacing: "0.15em" }}
            >
              Navegación
            </h3>
            <ul className="space-y-5">
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
              className="text-xs font-bold uppercase tracking-widest mb-7"
              style={{ color: "var(--gold-primary)", letterSpacing: "0.15em" }}
            >
              Servicios
            </h3>
            <ul className="space-y-5">
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

          {/* Contact */}
          <div>
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-7"
              style={{ color: "var(--gold-primary)", letterSpacing: "0.15em" }}
            >
              Contacto
            </h3>
            <ul className="space-y-5">
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
          className="py-10 border-t flex flex-col sm:flex-row items-center justify-between gap-8"
          style={{ borderColor: "var(--dark-border)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © 2026 ELEVA Coaching. Todos los derechos reservados.
          </p>
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
