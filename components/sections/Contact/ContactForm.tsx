"use client";

import { motion, AnimatePresence } from "framer-motion";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import CheckCheck from "lucide-react/dist/esm/icons/check-check";
import AlertCircle from "lucide-react/dist/esm/icons/alert-circle";
import User from "lucide-react/dist/esm/icons/user";
import MessageSquare from "lucide-react/dist/esm/icons/message-square";
import { useContactForm, type ContactForm } from "./useContactForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { sendContactForm, createMailtoLink } from "@/lib/contact-service";

export default function ContactForm() {
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
  
  const { language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setStatus("loading");
    setApiError("");

    try {
      // Usar el nuevo servicio de contacto
      const result = await sendContactForm(form);

      if (result.success) {
        setStatus("success");
        setTimeout(() => resetForm(), 3000);
      } else {
        // Si falla, ofrecer mailto como fallback
        setStatus("error");
        const mailtoLink = createMailtoLink(form);
        setApiError(
          language === 'es' 
            ? `${result.message} Puedes contactarnos directamente haciendo clic aquí: ${mailtoLink}`
            : `${result.message} You can contact us directly by clicking here: ${mailtoLink}`
        );
      }
    } catch (err) {
      setStatus("error");
      const mailtoLink = createMailtoLink(form);
      setApiError(
        language === 'es'
          ? `Error al enviar mensaje. Contáctanos directamente: ${mailtoLink}`
          : `Error sending message. Contact us directly: ${mailtoLink}`
      );
    }
  };

  const getFieldIcon = (name: keyof ContactForm) => {
    switch (name) {
      case "nombre": return <User size={16} />;
      case "mensaje": return <MessageSquare size={16} />;
      default: return null;
    }
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
          className="text-center py-8"
        >
          <CheckCheck className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {language === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}
          </h3>
          <p style={{ color: "var(--text-secondary)" }}>
            {language === 'es' 
              ? 'Te responderé a la brevedad.'
              : `I'll get back to you soon.`
            }
          </p>
        </motion.div>
      ) : (
        <>
          {apiError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3"
            >
              <AlertCircle size={20} />
              <span>{apiError}</span>
            </motion.div>
          )}

          {Object.entries(form).map(([fieldName, value]) => (
            <div key={fieldName} className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                {getFieldIcon(fieldName as keyof ContactForm)}
                {fieldName === 'nombre' && (language === 'es' ? 'Nombre' : 'Name')}
                {fieldName === 'email' && 'Email'}
                {fieldName === 'mensaje' && (language === 'es' ? 'Mensaje' : 'Message')}
              </label>
              
              <div className="relative group">
                {/* Glassmorphism container */}
                <div className="glass-field-container">
                  {/* Animated background layer */}
                  <div className="glass-field-bg" />
                  
                  {/* Rainbow hover effect */}
                  <div className="glass-field-rainbow" />
                  
                  <div className="relative">
                    {fieldName === 'mensaje' ? (
                      <textarea
                        value={value}
                        onChange={(e) => updateFieldWithTouch(fieldName as keyof ContactForm, e.target.value)}
                        onBlur={() => updateFieldWithTouch(fieldName as keyof ContactForm, value)}
                        className={`glass-field-input ${
                          errors[fieldName]
                            ? 'glass-field-error'
                            : touched[fieldName] && !errors[fieldName]
                            ? 'glass-field-success'
                            : 'glass-field-default'
                        }`}
                        rows={4}
                        placeholder={language === 'es' 
                          ? 'Cuéntame sobre tu desafío actual...' 
                          : 'Tell me about your current challenge...'
                        }
                      />
                    ) : (
                      <input
                        type={fieldName === 'email' ? 'email' : 'text'}
                        value={value}
                        onChange={(e) => updateFieldWithTouch(fieldName as keyof ContactForm, e.target.value)}
                        onBlur={() => updateFieldWithTouch(fieldName as keyof ContactForm, value)}
                        className={`glass-field-input ${
                          errors[fieldName]
                            ? 'glass-field-error'
                            : touched[fieldName] && !errors[fieldName]
                            ? 'glass-field-success'
                            : 'glass-field-default'
                        }`}
                        placeholder={fieldName === 'nombre' 
                          ? (language === 'es' ? 'Tu nombre' : 'Your name')
                          : 'email@ejemplo.com'
                        }
                      />
                    )}
                    
                    {/* Glow effect on focus */}
                    <div className="glass-field-glow" />
                    
                    {touched[fieldName] && !errors[fieldName] && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-field-check"
                      >
                        <CheckCircle2 size={20} />
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
              
              {errors[fieldName] && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm flex items-center gap-1"
                >
                  <AlertCircle size={12} />
                  {errors[fieldName]}
                </motion.p>
              )}
            </div>
          ))}

          <motion.button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary w-full relative overflow-hidden group"
            whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
            whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
          >
            <AnimatePresence mode="wait">
              {status === "loading" ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center gap-2"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{language === 'es' ? 'Enviando...' : 'Sending...'}</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-violet-600/20"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center justify-center gap-2"
                >
                  <span>{language === 'es' ? 'Enviar Mensaje' : 'Send Message'}</span>
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    →
                  </motion.span>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </>
      )}
    </motion.form>
  );
}
