"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { headerStagger, blurUp, dividerGrow } from "@/lib/animations";

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -50, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 50, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

const promiseStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const promiseItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
import {
  CheckCircle2,
  Mail,
  Linkedin,
  ArrowRight,
  Loader2,
  CheckCheck,
} from "lucide-react";

export default function Contact() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -40]);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    servicio: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.nombre.trim()) errs.nombre = "El nombre es obligatorio";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Introduce un email válido";
    if (!form.servicio) errs.servicio = "Selecciona un servicio";
    if (!form.mensaje.trim() || form.mensaje.trim().length < 10)
      errs.mensaje = "Cuéntanos brevemente tu situación (mín. 10 caracteres)";
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus("loading");
    setApiError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setApiError(data.error ?? "Ocurrió un error. Intenta de nuevo.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setApiError("Error de conexión. Verifica tu internet e intenta de nuevo.");
    }
  };

  return (
    <section
      id="contact"
      className="section section-compact"
      ref={ref}
    >
      {/* Glow with scroll parallax */}
      <motion.div
        className="orb orb-gold absolute"
        style={{
          width: 600,
          height: 600,
          bottom: "-30%",
          right: "-15%",
          opacity: 0.35,
          y: orbY,
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 xl:gap-28 items-start">
          {/* Left copy */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <span className="badge mb-6 inline-flex">{t.contact.badge}</span>

            <h2
              className="heading-xl mb-6 sm:mb-10"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t.contact.title}{" "}
              <span className="text-gradient">{t.contact.title2}</span>
            </h2>

            <div className="divider-gold-left mb-6 sm:mb-10" />

            <p className="lead-text mb-4 sm:mb-6">
              {t.contact.subtitle}
            </p>

            {/* Urgency indicator */}
            <div className="mb-4 p-4 rounded-lg" style={{
              background: "rgba(124,107,196,0.1)",
              border: "1px solid rgba(124,107,196,0.2)",
            }}>
              <p className="text-sm text-center" style={{ color: "var(--gold-primary)" }}>
                🎯 Solo <span className="font-bold">3 cupos disponibles</span> este mes para acompañamiento personalizado
              </p>
            </div>

            <motion.ul
              variants={promiseStagger}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4 sm:space-y-5 mb-10 sm:mb-14"
            >
              {[
                language === 'es' ? '30 minutos que sirven' : '30 minutes that matter',
                language === 'es' ? 'Conversación real y auténtica' : 'Real and authentic conversation',
                language === 'es' ? 'Claridad garantizada' : 'Clarity guaranteed',
              ].map((item) => (
                <motion.li key={item} variants={promiseItem} className="flex items-center gap-3">
                  <CheckCircle2
                    size={18}
                    style={{ color: "var(--gold-primary)", flexShrink: 0 }}
                  />
                  <span style={{ color: "var(--text-secondary)", fontSize: "clamp(0.875rem, 2.5vw, 1rem)" }}>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

                      </motion.div>

          {/* Right form */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="glass-card p-6 sm:p-10 md:p-12">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center py-8 gap-6"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center animate-glow"
                      style={{
                        background: "rgba(124,107,196,0.15)",
                        border: "1px solid var(--gold-primary)",
                      }}
                    >
                      <CheckCheck size={28} style={{ color: "var(--gold-primary)" }} />
                    </div>
                    <h3
                      className="heading-md"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {t.contact.success.title}
                    </h3>
                    <p style={{ color: "var(--text-secondary)" }}>
                      {t.contact.success.message}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-6 sm:space-y-7"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name */}
                    <div className="form-group">
                      <label htmlFor="nombre" className="form-label">
                        {t.contact.form.nombre.label} <span style={{ color: "var(--gold-primary)" }}>*</span>
                      </label>
                      <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        autoComplete="name"
                        placeholder={t.contact.form.nombre.placeholder}
                        className="form-input text-base sm:text-sm p-4 sm:p-3 min-h-[56px] sm:min-h-[48px]"
                        value={form.nombre}
                        onChange={handleChange}
                        aria-describedby={errors.nombre ? "nombre-error" : undefined}
                        aria-invalid={!!errors.nombre}
                        style={
                          errors.nombre
                            ? { borderColor: "#ef4444" }
                            : {}
                        }
                      />
                      {errors.nombre && (
                        <p
                          id="nombre-error"
                          role="alert"
                          className="text-xs mt-1"
                          style={{ color: "#ef4444" }}
                        >
                          {errors.nombre}
                        </p>
                      )}
                    </div>

                    {/* Email + Phone grid */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          {t.contact.form.email.label} <span style={{ color: "var(--gold-primary)" }}>*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder={t.contact.form.email.placeholder}
                          className="form-input text-base sm:text-sm p-4 sm:p-3 min-h-[56px] sm:min-h-[48px]"
                          value={form.email}
                          onChange={handleChange}
                          aria-invalid={!!errors.email}
                          style={errors.email ? { borderColor: "#ef4444" } : {}}
                        />
                        {errors.email && (
                          <p role="alert" className="text-xs mt-1" style={{ color: "#ef4444" }}>
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="form-group">
                        <label htmlFor="telefono" className="form-label">
                          {t.contact.form.empresa.label} <span className="text-xs" style={{ color: "var(--text-muted)" }}>({language === 'es' ? 'opcional' : 'optional'})</span>
                        </label>
                        <input
                          id="telefono"
                          name="telefono"
                          type="tel"
                          autoComplete="tel"
                          placeholder={language === 'es' ? '+54 9 3425 000000' : '+1 555 000 000'}
                          className="form-input text-base sm:text-sm p-4 sm:p-3 min-h-[56px] sm:min-h-[48px]"
                          value={form.telefono}
                          onChange={handleChange}
                          aria-invalid={!!errors.telefono}
                          style={errors.telefono ? { borderColor: "#ef4444" } : {}}
                        />
                        {errors.telefono && (
                          <p role="alert" className="text-xs mt-1" style={{ color: "#ef4444" }}>
                            {errors.telefono}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Service */}
                    <div className="form-group">
                      <label htmlFor="servicio" className="form-label">
                        {t.contact.form.servicio.label} <span style={{ color: "var(--gold-primary)" }}>*</span>
                      </label>
                      <select
                        id="servicio"
                        name="servicio"
                        className="form-input form-select text-base sm:text-sm p-4 sm:p-3 min-h-[56px] sm:min-h-[48px]"
                        value={form.servicio}
                        onChange={handleChange}
                        aria-invalid={!!errors.servicio}
                        style={errors.servicio ? { borderColor: "#ef4444" } : {}}
                      >
                        <option value="" disabled>
                          {language === 'es' ? 'Selecciona una opción' : 'Select an option'}
                        </option>
                        <option value="liderazgo">{language === 'es' ? 'Coaching de Liderazgo' : 'Leadership Coaching'}</option>
                        <option value="organizacional">{language === 'es' ? 'Consultoría Organizacional' : 'Organizational Consulting'}</option>
                        <option value="ambos">{language === 'es' ? 'Ambos servicios' : 'Both services'}</option>
                        <option value="otros">{language === 'es' ? 'Otros' : 'Other'}</option>
                      </select>
                      {errors.servicio && (
                        <p role="alert" className="text-xs mt-1" style={{ color: "#ef4444" }}>
                          {errors.servicio}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="form-group">
                      <label htmlFor="mensaje" className="form-label">
                        {t.contact.form.mensaje.label} <span style={{ color: "var(--gold-primary)" }}>*</span>
                      </label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        className="form-input form-textarea text-base sm:text-sm p-4 sm:p-3 min-h-[120px] sm:min-h-[100px]"
                        placeholder={language === 'es' ? '¿Qué te trae aquí? ¿Qué quieres cambiar?' : 'What brings you here? What do you want to change?'}
                        value={form.mensaje}
                        onChange={handleChange}
                        rows={4}
                        aria-invalid={!!errors.mensaje}
                        style={errors.mensaje ? { borderColor: "#ef4444" } : {}}
                      />
                      {errors.mensaje && (
                        <p role="alert" className="text-xs mt-1" style={{ color: "#ef4444" }}>
                          {errors.mensaje}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="btn-primary w-full !mt-8 text-base sm:text-sm py-4 sm:py-3 min-h-[56px] sm:min-h-[48px]"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={16} className="inline animate-spin mr-2" />
                          Enviando...
                        </>
                      ) : status === "error" ? (
                        <>
                          Reintentar{" "}
                          <ArrowRight size={16} className="inline ml-1" />
                        </>
                      ) : (
                        <>
                          Agendá tu sesión gratuita{" "}
                          <ArrowRight size={16} className="inline ml-1" />
                        </>
                      )}
                    </button>

                    {apiError && (
                      <p
                        role="alert"
                        className="text-xs text-center"
                        style={{ color: "#ef4444" }}
                      >
                        {apiError}
                      </p>
                    )}

                    <p
                      className="text-xs text-center"
                      style={{ color: "var(--text-muted)" }}
                    >
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
