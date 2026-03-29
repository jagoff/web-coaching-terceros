"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, ArrowRight } from "lucide-react";
import { slideLeft, slideRight } from "./animations";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactInfo() {
  const { t, language } = useLanguage();

  return (
    <>
      <motion.div
        variants={slideLeft}
        className="space-y-6"
      >
        <p className="lead-text" style={{ color: "var(--text-secondary)" }}>
          {language === 'es' 
            ? 'Estoy listo para acompañarte en el próximo nivel de liderazgo y crecimiento organizacional.'
            : 'Ready to support you in the next level of leadership and organizational growth.'
          }
        </p>

        <div className="mt-8">
          <motion.a
            href="https://wa.me/5493425153999?text=Hola%20Fernando%2C%20vi%20tu%20web%20y%20quiero%20agendar%20una%20sesi%C3%B3n%20gratuita."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {language === 'es' ? 'Agendar Sesión Gratuita' : 'Book Free Session'}
            <ArrowRight 
              size={16} 
              className="group-hover:translate-x-1 transition-transform" 
            />
          </motion.a>
        </div>
      </motion.div>
    </>
  );
}
