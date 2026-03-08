"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToElement, scrollToTop } from "@/lib/scroll";

const navLinks = [
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Servicios", href: "#servicios" },
  { label: "Método", href: "#proceso" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Precios", href: "#precios" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    scrollToElement(href);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} role="navigation" aria-label="Navegación principal">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2 group"
              aria-label="ELEVA Coaching — inicio"
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
                className="hidden sm:block text-xs font-semibold uppercase tracking-[0.15em]"
                style={{ color: "var(--text-muted)" }}
              >
                Coaching
              </span>
            </a>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-10 xl:gap-12 list-none">
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
                className="btn-primary"
                style={{ padding: "0.875rem 1.75rem", fontSize: "0.875rem" }}
                onClick={() => handleLinkClick("#contacto")}
              >
                Sesión gratuita
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex items-center justify-center rounded-md transition-colors"
              style={{ width: 44, height: 44, color: "var(--text-secondary)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="fixed inset-0 flex flex-col lg:hidden"
            style={{
              background: "rgba(10, 10, 15, 0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              zIndex: 110,
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b"
              style={{ borderColor: "var(--dark-border)" }}>
              <span
                className="text-gradient font-heading font-black text-2xl tracking-tight"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                ELEVA
              </span>
              <button
                className="flex items-center justify-center rounded-md"
                style={{ width: 44, height: 44, color: "var(--text-secondary)" }}
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
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "1px solid var(--dark-border)",
                    fontFamily: "var(--font-heading)",
                  }}
                  onClick={() => handleLinkClick(link.href)}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            {/* CTA */}
            <div className="px-8 pb-12">
              <button
                className="btn-primary w-full"
                onClick={() => handleLinkClick("#contacto")}
              >
                Agendá tu sesión gratuita
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
