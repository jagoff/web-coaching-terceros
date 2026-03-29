"use client";

import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Loader2, 
  CheckCheck, 
  AlertCircle, 
  User, 
  MessageSquare 
} from "lucide-react";
import { useContactForm, type ContactForm } from "./useContactForm";
import { useLanguage } from "@/contexts/LanguageContext";

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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      setStatus("success");
      setTimeout(() => resetForm(), 3000);
    } catch (err) {
      setStatus("error");
      setApiError(err instanceof Error ? err.message : "Error al enviar mensaje");
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                {language === 'es' ? 'Enviando...' : 'Sending...'}
              </>
            ) : (
              <>
                {language === 'es' ? 'Enviar Mensaje' : 'Send Message'}
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </>
            )}
          </motion.button>
        </>
      )}
    </motion.form>
  );
}
