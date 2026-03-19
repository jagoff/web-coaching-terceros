"use client";

import { Linkedin, Instagram } from "lucide-react";
import { scrollToElement, scrollToTop } from "@/lib/scroll";
import { FooterSuspense } from "@/components/ui/SuspenseWrapper";
import { useLanguage } from "@/contexts/LanguageContext";

const FooterLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} style={{ whiteSpace: 'nowrap' }}>
      {children}
    </a>
  );
};

export default function Footer() {
  const { t, language } = useLanguage();

  const navLinks = [
    { label: t.footer.navLinks.sobreMi, href: "#sobre-mi" },
    { label: t.footer.navLinks.servicios, href: "#servicios" },
    { label: t.footer.navLinks.testimonios, href: "#testimonios" },
    { label: t.footer.navLinks.precios, href: "#precios" },
    { label: t.footer.navLinks.preguntasFrecuentes, href: "#faq" },
  ];

  const serviceLinks = [
    { label: language === 'es' ? "Coaching de Liderazgo" : "Leadership Coaching", href: "#servicios" },
    { label: language === 'es' ? "Consultoría Organizacional" : "Organizational Consulting", href: "#servicios" },
    { label: language === 'es' ? "Sesión Gratuita" : "Free Session", href: "#contacto" },
    { label: language === 'es' ? "Consultoría Continua" : "Ongoing Consulting", href: "#precios" },
  ];

  return (
    <FooterSuspense>
      <footer className="footer-bg" style={{ paddingTop: "clamp(3.5rem, 6vw, 5rem)" }} role="contentinfo">
      <div className="container">
        <div className="pb-12 sm:pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col justify-start">
            <div className="flex items-center gap-2 mb-4">
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
              >
                {language === 'es' ? 'CONSULTORA' : 'CONSULTING'}
              </span>
            </div>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              {t.footer.description}
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

          {/* Navigation & Services - Side by side on mobile */}
          <div className="grid grid-cols-2 gap-8">
            {/* Navigation */}
            <div>
              <h3
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: "var(--gold-primary)", letterSpacing: "0.15em" }}
              >
                {language === 'es' ? 'Navegación' : 'Navigation'}
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
              >
                {language === 'es' ? 'Servicios' : 'Services'}
              </h3>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
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
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            © 2026 ELEVA {language === 'es' ? 'CONSULTORA' : 'CONSULTING'}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6 text-sm" style={{ color: "var(--text-muted)" }}>
            <span className="hidden sm:inline">Argentina 🇦🇷</span>
          </div>
        </div>
      </div>
    </footer>
    </FooterSuspense>
  );
}
