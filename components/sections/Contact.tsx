"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";

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
      id="contacto"
      className="section section-dark relative overflow-hidden"
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
            <span className="badge mb-6 inline-flex">Contacto</span>

            <h2
              className="heading-xl mb-6 sm:mb-10"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              ¿Listo para dar{" "}
              <span className="text-gradient">el próximo paso?</span>
            </h2>

            <div className="divider-gold-left mb-6 sm:mb-10" />

            <p className="lead-text mb-8 sm:mb-12">
              Tu primera sesión de diagnóstico es completamente gratuita. Sin
              compromiso. Sin presión. Solo 30 minutos para escucharte, analizar dónde
              estás y hacia dónde querés ir.
            </p>

            <motion.ul
              variants={promiseStagger}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4 sm:space-y-5 mb-10 sm:mb-14"
            >
              {[
                "30 minutos que sirven",
                "Conversación real y auténtica",
                "Claridad garantizada",
              ].map((item) => (
                <motion.li key={item} variants={promiseItem} className="flex items-center gap-3">
                  <CheckCircle2
                    size={18}
                    style={{ color: "var(--gold-primary)", flexShrink: 0 }}
                  />
                  <span style={{ color: "var(--text-secondary)" }}>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Contact alternatives */}
            <div
              className="space-y-6 pt-12 border-t"
              style={{ borderColor: "var(--dark-border)" }}
            >
              <a
                href="mailto:fernandoferrari@gmail.com"
                className="flex items-center gap-3 group transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(124,107,196,0.1)",
                    color: "var(--gold-primary)",
                  }}
                >
                  <Mail size={18} />
                </div>
                <span className="group-hover:text-white transition-colors">
                  fernandoferrari@gmail.com
                </span>
              </a>

              <a
                href="https://linkedin.com/in/fernandorferrari"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(124,107,196,0.1)",
                    color: "var(--gold-primary)",
                  }}
                >
                  <Linkedin size={18} />
                </div>
                <span className="group-hover:text-white transition-colors">
                  /in/fernandorferrari
                </span>
              </a>

                          </div>
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
                      <label htmlFor="nombre" className="form-label">
                        Nombre completo <span style={{ color: "var(--gold-primary)" }}>*</span>
                      </label>
                      <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        autoComplete="name"
                        placeholder="Tu nombre"
                        className="form-input"
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
                        <label htmlFor="telefono" className="form-label">
                          WhatsApp / Teléfono <span className="text-xs" style={{ color: "var(--text-muted)" }}>(opcional)</span>
                        </label>
                        <input
                          id="telefono"
                          name="telefono"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+34 600 000 000"
                          className="form-input"
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
                        ¿Qué estás buscando? <span style={{ color: "var(--gold-primary)" }}>*</span>
                      </label>
                      <select
                        id="servicio"
                        name="servicio"
                        className="form-input form-select"
                        value={form.servicio}
                        onChange={handleChange}
                        aria-invalid={!!errors.servicio}
                        style={errors.servicio ? { borderColor: "#ef4444" } : {}}
                      >
                        <option value="" disabled>
                          Selecciona una opción
                        </option>
                        <option value="liderazgo">Coaching de Liderazgo</option>
                        <option value="organizacional">Consultoría Organizacional</option>
                        <option value="ambos">Ambos servicios</option>
                        <option value="otros">Otros</option>
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
                        Cuéntame brevemente tu situación{" "}
                        <span style={{ color: "var(--gold-primary)" }}>*</span>
                      </label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        className="form-input form-textarea"
                        placeholder="¿Qué te trae aquí? ¿Qué quieres cambiar?"
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
                      className="btn-primary w-full !mt-16"
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
