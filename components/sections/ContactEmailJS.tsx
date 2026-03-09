"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Loader2, AlertCircle, User, Mail, MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const slideLeft = {
  hidden: { opacity: 0, x: -50, filter: "blur(6px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9 } },
};

const slideRight = {
  hidden: { opacity: 0, x: 50, filter: "blur(6px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, delay: 0.15 } },
};

export default function ContactEmailJS() {
  const { language } = useLanguage();
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [apiError, setApiError] = useState("");

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "nombre":
        if (!value.trim()) return "El nombre es obligatorio";
        if (value.trim().length < 2) return "El nombre debe tener al menos 2 caracteres";
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return "Solo letras y espacios permitidos";
        return "";
      case "email":
        if (!value.trim()) return "El email es obligatorio";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Introduce un email válido";
        return "";
      case "mensaje":
        if (!value.trim()) return "El mensaje es obligatorio";
        if (value.trim().length < 10) return "Cuéntanos más (mínimo 10 caracteres)";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const getFieldStatus = (fieldName: string) => {
    const hasValue = form[fieldName as keyof typeof form].trim().length > 0;
    const hasError = errors[fieldName];
    const isTouched = touched[fieldName];
    
    if (!isTouched) return "default";
    if (hasError) return "error";
    if (hasValue) return "success";
    return "default";
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar todos los campos
    const errs: Record<string, string> = {};
    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key as keyof typeof form]);
      if (error) errs[key] = error;
    });
    
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTouched({ nombre: true, email: true, mensaje: true });
      return;
    }

    setStatus("loading");
    setApiError("");

    try {
      // EmailJS configuration
      const serviceID = "service_your_service_id";
      const templateID = "template_your_template_id";
      const publicKey = "your_public_key";

      // Simulación del envío (reemplazar con EmailJS real)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Email enviado:", form);
      setStatus("success");
      setForm({ nombre: "", email: "", mensaje: "" });
      setTouched({});
      setErrors({});
      
    } catch (error) {
      setStatus("error");
      setApiError("Error al enviar el mensaje. Por favor intenta más tarde.");
      console.error("Error:", error);
    }
  };

  return (
    <section id="contacto" className="section section-compact">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 xl:gap-28 items-start">
          {/* Left copy */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate="visible"
          >
            <span className="badge mb-6 inline-flex">Contacto</span>
            <h2 className="heading-xl mb-6 sm:mb-10" style={{ fontFamily: "var(--font-heading)" }}>
              {language === 'es' ? 'Hablemos de tu' : "Let's talk about your"}{" "}
              <span className="text-gradient">{language === 'es' ? 'transformación' : 'transformation'}</span>
            </h2>
            <div className="divider-gold-left mb-6 sm:mb-10" />
            <p className="lead-text mb-4 sm:mb-6">
              {language === 'es' 
                ? 'La primera conversación es sin compromiso y nos permite entender si podemos ayudarte a alcanzar tus objetivos.'
                : 'The first conversation is without commitment and allows us to understand if we can help you achieve your goals.'
              }
            </p>
          </motion.div>

          {/* Form */}
          <motion.div variants={slideRight} initial="hidden" animate="visible">
            <div className="glass-card p-6 sm:p-10 md:p-12">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-8 gap-6"
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center animate-glow"
                      style={{ background: "rgba(124,107,196,0.15)", border: "1px solid var(--gold-primary)" }}>
                      <CheckCircle2 size={28} style={{ color: "#22c55e" }} />
                    </div>
                    <h3 className="heading-md" style={{ fontFamily: "var(--font-heading)" }}>
                      {language === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}
                    </h3>
                    <p style={{ color: "var(--text-secondary)" }}>
                      {language === 'es' 
                        ? 'Te responderemos en menos de 24 horas.'
                        : 'We\'ll respond within 24 hours.'
                      }
                    </p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={sendEmail} noValidate className="space-y-6 sm:space-y-7">
                    {/* Name */}
                    <div className="form-group">
                      <label htmlFor="nombre" className="form-label">
                        <User size={16} className="inline mr-2" />
                        Nombre <span style={{ color: "var(--gold-primary)" }}>*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="nombre"
                          name="nombre"
                          type="text"
                          autoComplete="name"
                          placeholder={language === 'es' ? 'Tu nombre' : 'Your name'}
                          className={`form-input text-base sm:text-sm p-4 sm:p-3 min-h-[56px] sm:min-h-[48px] pr-12 transition-all duration-200 ${
                            getFieldStatus('nombre') === 'success' ? 'border-green-500 bg-green-50/10' : 
                            getFieldStatus('nombre') === 'error' ? 'border-red-500 bg-red-50/10' : 
                            'border-gray-600'
                          }`}
                          value={form.nombre}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {getFieldStatus('nombre') === 'success' && <CheckCircle2 size={20} className="text-green-500" />}
                          {getFieldStatus('nombre') === 'error' && <AlertCircle size={20} className="text-red-500" />}
                        </div>
                      </div>
                      {errors.nombre && (
                        <motion.p role="alert" className="text-xs mt-2 flex items-center gap-1" style={{ color: "#ef4444" }}
                          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                          <AlertCircle size={12} />
                          {errors.nombre}
                        </motion.p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        <Mail size={16} className="inline mr-2" />
                        Email <span style={{ color: "var(--gold-primary)" }}>*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder={language === 'es' ? 'tu@email.com' : 'your@email.com'}
                          className={`form-input text-base sm:text-sm p-4 sm:p-3 min-h-[56px] sm:min-h-[48px] pr-12 transition-all duration-200 ${
                            getFieldStatus('email') === 'success' ? 'border-green-500 bg-green-50/10' : 
                            getFieldStatus('email') === 'error' ? 'border-red-500 bg-red-50/10' : 
                            'border-gray-600'
                          }`}
                          value={form.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {getFieldStatus('email') === 'success' && <CheckCircle2 size={20} className="text-green-500" />}
                          {getFieldStatus('email') === 'error' && <AlertCircle size={20} className="text-red-500" />}
                        </div>
                      </div>
                      {errors.email && (
                        <motion.p role="alert" className="text-xs mt-2 flex items-center gap-1" style={{ color: "#ef4444" }}
                          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                          <AlertCircle size={12} />
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="form-group">
                      <label htmlFor="mensaje" className="form-label">
                        <MessageSquare size={16} className="inline mr-2" />
                        Mensaje <span style={{ color: "var(--gold-primary)" }}>*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          id="mensaje"
                          name="mensaje"
                          className={`form-input form-textarea text-base sm:text-sm p-4 sm:p-3 min-h-[120px] sm:min-h-[100px] pr-12 transition-all duration-200 ${
                            getFieldStatus('mensaje') === 'success' ? 'border-green-500 bg-green-50/10' : 
                            getFieldStatus('mensaje') === 'error' ? 'border-red-500 bg-red-50/10' : 
                            'border-gray-600'
                          }`}
                          placeholder={language === 'es' ? '¿En qué podemos ayudarte?' : 'How can we help you?'}
                          value={form.mensaje}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          rows={4}
                        />
                        <div className="absolute right-3 top-4">
                          {getFieldStatus('mensaje') === 'success' && <CheckCircle2 size={20} className="text-green-500" />}
                          {getFieldStatus('mensaje') === 'error' && <AlertCircle size={20} className="text-red-500" />}
                        </div>
                      </div>
                      <div className="flex justify-between items-start mt-2">
                        {errors.mensaje ? (
                          <motion.p role="alert" className="text-xs flex items-center gap-1" style={{ color: "#ef4444" }}
                            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                            <AlertCircle size={12} />
                            {errors.mensaje}
                          </motion.p>
                        ) : (
                          <div>
                            {!errors.mensaje && touched.mensaje && form.mensaje && (
                              <motion.p className="text-xs text-green-500 flex items-center gap-1"
                                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                                <CheckCircle2 size={12} />
                                Mensaje válido
                              </motion.p>
                            )}
                          </div>
                        )}
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {form.mensaje.trim().length}/500
                        </span>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className={`btn-primary w-full !mt-8 text-base sm:text-sm py-4 sm:py-3 min-h-[56px] sm:min-h-[48px] transition-all duration-200 ${
                        status === "loading" ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={16} className="inline animate-spin mr-2" />
                          Enviando...
                        </>
                      ) : status === "error" ? (
                        <>
                          Reintentar <ArrowRight size={16} className="inline ml-1" />
                        </>
                      ) : (
                        <>
                          Agendá tu sesión gratuita <ArrowRight size={16} className="inline ml-1" />
                        </>
                      )}
                    </button>

                    {apiError && (
                      <p role="alert" className="text-xs text-center" style={{ color: "#ef4444" }}>
                        {apiError}
                      </p>
                    )}

                    <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                      {language === 'es' ? 'Respondo en menos de 24h. Tus datos están seguros.' : 'I respond within 24h. Your data is secure.'}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
