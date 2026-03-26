"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = translations[language];

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const navItems = [
    {
      key: 'sobreMi',
      label: t.nav.sobreMi,
      href: '#about',
      hasDropdown: false
    },
    {
      key: 'servicios',
      label: t.nav.servicios,
      href: '#services',
      hasDropdown: true,
      dropdown: [
        { label: 'Leadership Coaching', href: '#leadership' },
        { label: 'Agile Consulting', href: '#agile' },
        { label: 'Team Transformation', href: '#team' }
      ]
    },
    {
      key: 'metodo',
      label: t.nav.metodo,
      href: '#process',
      hasDropdown: false
    },
    {
      key: 'testimonios',
      label: t.nav.testimonios,
      href: '#testimonials',
      hasDropdown: false
    },
    {
      key: 'precios',
      label: t.nav.precios,
      href: '#pricing',
      hasDropdown: false
    },
    {
      key: 'preguntasFrecuentes',
      label: t.nav.preguntasFrecuentes,
      href: '#faq',
      hasDropdown: false
    }
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setActiveDropdown(null);
    
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleDropdown = (key: string) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 bg-black/95 backdrop-blur-lg z-50 md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div>
                  <h2 className="text-2xl font-bold text-white">ELEVA</h2>
                  <p className="text-sm text-gray-400">
                    {language === 'es' ? 'COACHING' : 'COACHING'}
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="p-6 space-y-2">
                {navItems.map((item) => (
                  <div key={item.key}>
                    {item.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => toggleDropdown(item.key)}
                          className="w-full flex items-center justify-between p-4 rounded-lg text-white hover:bg-white/10 transition-colors text-left"
                        >
                          <span className="text-lg">{item.label}</span>
                          <ChevronDown
                            size={20}
                            className={`transition-transform duration-200 ${
                              activeDropdown === item.key ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === item.key && (
                            <motion.div
                              className="ml-4 mt-2 space-y-1"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.dropdown?.map((subItem, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleNavClick(subItem.href)}
                                  className="w-full p-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-left"
                                >
                                  {subItem.label}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className="w-full p-4 rounded-lg text-white hover:bg-white/10 transition-colors text-left text-lg"
                      >
                        {item.label}
                      </button>
                    )}
                  </div>
                ))}

                {/* CTA Button */}
                <div className="pt-6 border-t border-white/10" style={{ marginTop: '400px' }}>
                  <button
                    onClick={() => handleNavClick('#contact')}
                    className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
                  >
                    {language === 'es' ? 'COMENZAR AHORA' : 'GET STARTED NOW'}
                  </button>
                </div>

                {/* Language Switcher */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between p-4">
                    <span className="text-gray-400 text-sm">
                      {language === 'es' ? 'Idioma' : 'Language'}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          // Handle language change
                          const newLang = language === 'es' ? 'en' : 'es';
                          window.location.href = `?lang=${newLang}`;
                        }}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          language === 'es'
                            ? 'bg-purple-500 text-white'
                            : 'bg-white/10 text-gray-400 hover:bg-white/20'
                        }`}
                      >
                        ES
                      </button>
                      <button
                        onClick={() => {
                          const newLang = language === 'en' ? 'es' : 'en';
                          window.location.href = `?lang=${newLang}`;
                        }}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          language === 'en'
                            ? 'bg-purple-500 text-white'
                            : 'bg-white/10 text-gray-400 hover:bg-white/20'
                        }`}
                      >
                        EN
                      </button>
                    </div>
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
