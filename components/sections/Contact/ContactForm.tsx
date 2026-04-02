"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  CheckCheck,
  AlertCircle,
  User,
  MessageSquare,
  Mail,
  Send,
  ArrowRight
} from "lucide-react";
import { useContactForm, type ContactForm } from "./useContactForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { sendContactForm, createMailtoLink } from "@/lib/contact-service";

export default function ContactForm() {
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mailtoRef = useRef<string>('');
  const {
    form,
    errors,
    touched,
    status,
    apiError,
    setStatus,
    setApiError,
    validate,
    updateFieldWithTouch,
    resetForm
  } = useContactForm();

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);
  
  const { language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setStatus("loading");
    setApiError("");

    try {
      const result = await sendContactForm(form);

      if (result.success) {
        setStatus("success");
        if (resetTimerRef.current !== null) {
          clearTimeout(resetTimerRef.current);
        }
        resetTimerRef.current = setTimeout(() => resetForm(), 3000);
      } else {
        setStatus("error");
        mailtoRef.current = createMailtoLink(form);
        setApiError(
          language === 'es'
            ? (result.message || 'Error al enviar mensaje.')
            : (result.message || 'Error sending message.')
        );
      }
    } catch {
      setStatus("error");
      mailtoRef.current = createMailtoLink(form);
      setApiError(
        language === 'es'
          ? 'Error al enviar mensaje.'
          : 'Error sending message.'
      );
    }
  };

  const getFieldIcon = (name: keyof ContactForm) => {
    switch (name) {
      case "nombre": return <User size={18} />;
      case "email": return <Mail size={18} />;
      case "mensaje": return <MessageSquare size={18} />;
      default: return null;
    }
  };

  const getPlaceholder = (name: keyof ContactForm) => {
    const placeholders = {
      nombre: language === 'es' ? 'Tu nombre completo' : 'Your full name',
      email: 'email@ejemplo.com',
      mensaje: language === 'es' 
        ? 'Cuéntame sobre tu desafío actual o lo que necesites...' 
        : 'Tell me about your current challenge or what you need...'
    };
    return placeholders[name];
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 px-6"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCheck className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white">
            {language === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}
          </h3>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            {language === 'es' 
              ? 'Te responderé en menos de 24 horas.'
              : `I'll get back to you within 24 hours.`
            }
          </p>
        </motion.div>
      ) : (
        <>
          {apiError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3 mb-6"
            >
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <span className="text-sm">
                {apiError}{' '}
                {mailtoRef.current && (
                  <a
                    href={mailtoRef.current}
                    className="underline hover:text-red-300 transition-colors"
                  >
                    {language === 'es' ? 'Contactanos directamente' : 'Contact us directly'}
                  </a>
                )}
              </span>
            </motion.div>
          )}

          <div className="space-y-6">
            {Object.entries(form).map(([fieldName, value], index) => {
              const fieldKey = fieldName as keyof ContactForm;
              const hasError = errors[fieldKey];
              const isValid = touched[fieldKey] && !hasError;
              
              return (
                <motion.div
                  key={fieldName}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  {/* Label outside glass container */}
                  <label className="flex items-center gap-2 text-white font-normal" style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem" }}>
                    <span 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: hasError 
                          ? '#ef4444'
                          : isValid 
                          ? '#10b981'
                          : '#FF6B35'
                      }}
                    />
                    {fieldName === 'nombre' && (language === 'es' ? 'Nombre' : 'Name')}
                    {fieldName === 'email' && 'Email'}
                    {fieldName === 'mensaje' && (language === 'es' ? 'Mensaje' : 'Message')}
                  </label>
                  
                  {/* Glassmorphism Container */}
                  <div className="relative group rounded-2xl overflow-hidden">
                    {/* Background glass layer */}
                    <div 
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    
                    {/* Gradient overlay for depth */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-40"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 107, 53, 0.05) 100%)',
                      }}
                    />
                    
                    {/* Input field */}
                    <div className="relative z-10">
                      {fieldName === 'mensaje' ? (
                        <textarea
                          value={value}
                          onChange={(e) => updateFieldWithTouch(fieldKey, e.target.value)}
                          onBlur={() => updateFieldWithTouch(fieldKey, value)}
                          className="w-full pt-3 pb-3 px-4 bg-transparent text-white placeholder-gray-500/70 resize-none transition-all duration-300"
                          style={{
                            fontSize: '0.9rem',
                            fontFamily: "var(--font-body)",
                            outline: 'none',
                            border: 'none',
                            fontWeight: '400',
                            borderRadius: '12px'
                          }}
                          rows={4}
                          placeholder={getPlaceholder(fieldKey)}
                        />
                      ) : (
                        <input
                          type={fieldName === 'email' ? 'email' : 'text'}
                          value={value}
                          onChange={(e) => updateFieldWithTouch(fieldKey, e.target.value)}
                          onBlur={() => updateFieldWithTouch(fieldKey, value)}
                          className="w-full pt-3 pb-3 px-4 bg-transparent text-white placeholder-gray-500/70 transition-all duration-300"
                          style={{
                            fontSize: '0.9rem',
                            fontFamily: "var(--font-body)",
                            outline: 'none',
                            border: 'none',
                            fontWeight: '400',
                            borderRadius: '12px'
                          }}
                          placeholder={getPlaceholder(fieldKey)}
                        />
                      )}
                      
                      {/* Success indicator with glassmorphism */}
                      {isValid && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-3 top-3 z-30"
                          style={{
                            background: 'rgba(16, 185, 129, 0.2)',
                            backdropFilter: 'blur(4px)',
                            WebkitBackdropFilter: 'blur(4px)',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            borderRadius: '50%',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Hover effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 107, 53, 0.05) 100%)',
                        boxShadow: '0 0 20px rgba(255, 107, 53, 0.2)',
                      }}
                    />
                  </div>
                  
                  {/* Error message with glassmorphism */}
                  {hasError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-3 py-1.5 inline-flex items-center gap-1.5"
                      style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: '24px'
                      }}
                    >
                      <AlertCircle size={10} style={{ color: '#ef4444' }} />
                      <span
                        className="text-xs font-normal"
                        style={{ color: '#ef4444', fontFamily: "var(--font-body)" }}
                      >
                        {hasError}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Premium Glassmorphism CTA */}
          <div className="pt-4">
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glassmorphism button container */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(255, 107, 53, 0.1) 100%)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 107, 53, 0.3)',
                  boxShadow: '0 8px 32px rgba(255, 107, 53, 0.2)',
                }}
              />
              
              {/* Gradient overlay */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-80"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.2) 0%, rgba(255, 133, 85, 0.2) 100%)',
                }}
              />
              
              {/* Button content */}
              <motion.button
                type="submit"
                disabled={status === "loading"}
                className="relative w-full py-4 px-6 text-white font-medium transition-all duration-300"
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.05em',
                  borderRadius: '16px'
                }}
              >
                <AnimatePresence mode="wait">
                  {status === "loading" ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-3"
                    >
                      <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#FF6B35' }} />
                      <span>{language === 'es' ? 'Enviando...' : 'Sending...'}</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-3"
                    >
                      <Send size={18} style={{ color: '#FF6B35' }} className="group-hover:scale-110 transition-transform" />
                      <span>{language === 'es' ? 'Enviar' : 'Send'}</span>
                      <ArrowRight size={18} style={{ color: '#FF6B35' }} className="group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              
              {/* Hover glow effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.3) 0%, rgba(255, 133, 85, 0.3) 100%)',
                  boxShadow: '0 0 40px rgba(255, 107, 53, 0.4)',
                  filter: 'blur(2px)'
                }}
              />
              
              {/* Animated particles */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-100"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: '50%',
                    background: '#FF6B35'
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>
        </>
      )}
    </motion.form>
  );
}
