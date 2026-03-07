"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  MessageCircle,
  Mail,
  Instagram,
  ArrowRight,
  Loader2,
  CheckCheck,
} from "lucide-react";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    privacy: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "El nombre es obligatorio";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Introduce un email válido";
    if (!form.phone.trim()) errs.phone = "El teléfono es obligatorio";
    if (!form.service) errs.service = "Selecciona un servicio";
    if (!form.privacy) errs.privacy = "Debes aceptar la política de privacidad";
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
  };

  return (
    <section
      id="contacto"
      className="section section-dark relative overflow-hidden"
      ref={ref}
    >
      {/* Glow */}
      <div
        className="orb orb-gold absolute"
        style={{
          width: 600,
          height: 600,
          bottom: "-30%",
          right: "-15%",
          opacity: 0.35,
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 xl:gap-28 items-start">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
          >
            <span className="badge mb-6 inline-flex">Contacto</span>

            <h2
              className="heading-xl mb-10"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              ¿Listo para cambiar{" "}
              <span className="text-gradient">el guión?</span>
            </h2>

            <div className="divider-gold-left mb-10" />

            <p className="lead-text mb-12">
              Tu primera sesión de diagnóstico es completamente gratuita. Sin
              compromiso. Sin presión. Solo 45 minutos que pueden cambiar el
              rumbo de todo.
            </p>

            <ul className="space-y-5 mb-14">
              {[
                "Sin venta agresiva",
                "Conversación real y auténtica",
                "Claridad garantizada",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    size={18}
                    style={{ color: "var(--gold-primary)", flexShrink: 0 }}
                  />
                  <span style={{ color: "var(--text-secondary)" }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* Contact alternatives */}
            <div
              className="space-y-6 pt-12 border-t"
              style={{ borderColor: "var(--dark-border)" }}
            >
              <a
                href="https://wa.me/34600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    background: "rgba(212,175,55,0.1)",
                    color: "var(--gold-primary)",
                  }}
                >
                  <MessageCircle size={18} />
                </div>
                <span className="group-hover:text-white transition-colors">
                  +34 600 000 000 (WhatsApp)
                </span>
              </a>

              <a
                href="mailto:hola@eleva.coaching"
                className="flex items-center gap-3 group transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(212,175,55,0.1)",
                    color: "var(--gold-primary)",
                  }}
                >
                  <Mail size={18} />
                </div>
                <span className="group-hover:text-white transition-colors">
                  hola@eleva.coaching
                </span>
              </a>

              <a
                href="https://instagram.com/eleva.coaching"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(212,175,55,0.1)",
                    color: "var(--gold-primary)",
                  }}
                >
                  <Instagram size={18} />
                </div>
                <span className="group-hover:text-white transition-colors">
                  @eleva.coaching
                </span>
              </a>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] as [number, number, number, number], delay: 0.15 }}
          >
            <div className="glass-card p-10 md:p-12">
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
                        background: "rgba(212,175,55,0.15)",
                        border: "1px solid var(--gold-primary)",
                      }}
                    >
                      <CheckCheck size={28} style={{ color: "var(--gold-primary)" }} />
                    </div>
                    <h3
                      className="heading-md"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      ¡Mensaje recibido!
                    </h3>
                    <p style={{ color: "var(--text-secondary)" }}>
                      Te responderé en menos de 24 horas para coordinar tu
                      sesión de diagnóstico gratuita.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-7"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name */}
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Nombre completo <span style={{ color: "var(--gold-primary)" }}>*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Tu nombre"
                        className="form-input"
                        value={form.name}
                        onChange={handleChange}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        aria-invalid={!!errors.name}
                        style={
                          errors.name
                            ? { borderColor: "#ef4444" }
                            : {}
                        }
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          role="alert"
                          className="text-xs mt-1"
                          style={{ color: "#ef4444" }}
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email + Phone grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          Email <span style={{ color: "var(--gold-primary)" }}>*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="tu@email.com"
                          className="form-input"
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
                        <label htmlFor="phone" className="form-label">
                          WhatsApp / Teléfono <span style={{ color: "var(--gold-primary)" }}>*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+34 600 000 000"
                          className="form-input"
                          value={form.phone}
                          onChange={handleChange}
                          aria-invalid={!!errors.phone}
                          style={errors.phone ? { borderColor: "#ef4444" } : {}}
                        />
                        {errors.phone && (
                          <p role="alert" className="text-xs mt-1" style={{ color: "#ef4444" }}>
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Service */}
                    <div className="form-group">
                      <label htmlFor="service" className="form-label">
                        ¿Qué te interesa más? <span style={{ color: "var(--gold-primary)" }}>*</span>
                      </label>
                      <select
                        id="service"
                        name="service"
                        className="form-input form-select"
                        value={form.service}
                        onChange={handleChange}
                        aria-invalid={!!errors.service}
                        style={errors.service ? { borderColor: "#ef4444" } : {}}
                      >
                        <option value="" disabled>
                          Selecciona una opción
                        </option>
                        <option value="vida">Coaching de Vida</option>
                        <option value="negocios">Coaching de Negocios</option>
                        <option value="ambas">Ambas áreas</option>
                        <option value="nosé">Aún no lo sé</option>
                      </select>
                      {errors.service && (
                        <p role="alert" className="text-xs mt-1" style={{ color: "#ef4444" }}>
                          {errors.service}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        Cuéntame brevemente tu situación{" "}
                        <span style={{ color: "var(--text-muted)" }}>(opcional)</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-input form-textarea"
                        placeholder="¿Qué te trae aquí? ¿Qué quieres cambiar?"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                      />
                    </div>

                    {/* Privacy */}
                    <div className="flex items-start gap-3">
                      <input
                        id="privacy"
                        name="privacy"
                        type="checkbox"
                        className="mt-1 w-4 h-4 flex-shrink-0 cursor-pointer"
                        style={{ accentColor: "var(--gold-primary)" }}
                        checked={form.privacy}
                        onChange={handleChange}
                        aria-invalid={!!errors.privacy}
                      />
                      <label
                        htmlFor="privacy"
                        className="text-sm cursor-pointer"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Acepto la{" "}
                        <a
                          href="#"
                          className="underline transition-colors"
                          style={{ color: "var(--gold-primary)" }}
                        >
                          política de privacidad
                        </a>{" "}
                        <span style={{ color: "var(--gold-primary)" }}>*</span>
                      </label>
                    </div>
                    {errors.privacy && (
                      <p role="alert" className="text-xs -mt-3" style={{ color: "#ef4444" }}>
                        {errors.privacy}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      className="btn-primary w-full mt-2"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={16} className="inline animate-spin mr-2" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Agenda mi sesión gratuita{" "}
                          <ArrowRight size={16} className="inline ml-1" />
                        </>
                      )}
                    </button>

                    <p
                      className="text-xs text-center"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Respondo en menos de 24h. Tus datos están seguros.
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
