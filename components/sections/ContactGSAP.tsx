"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CheckCircle2,
  Mail,
  Linkedin,
  ArrowRight,
  Loader2,
  AlertCircle,
  User,
  MessageSquare,
  Calendar,
} from "lucide-react";

// Registrar ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactGSAP() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const promisesRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [apiError, setApiError] = useState("");

  // Real-time validation function
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "nombre":
        if (!value.trim()) return "El nombre es obligatorio";
        if (value.trim().length < 2) return "El nombre debe tener al menos 2 caracteres";
        if (value.trim().length > 50) return "El nombre no puede exceder 50 caracteres";
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return "Solo letras y espacios permitidos";
        return "";
      
      case "email":
        if (!value.trim()) return "El email es obligatorio";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Introduce un email válido";
        if (value.length > 100) return "Email demasiado largo";
        return "";
      
      case "mensaje":
        if (!value.trim()) return "El mensaje es obligatorio";
        if (value.trim().length < 10) return "Cuéntanos más (mínimo 10 caracteres)";
        if (value.trim().length > 500) return "El mensaje no puede exceder 500 caracteres";
        return "";
      
      default:
        return "";
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key as keyof typeof form]);
      if (error) errs[key] = error;
    });
    return errs;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({ nombre: true, email: true, mensaje: true });

    if (Object.keys(validationErrors).length === 0) {
      setStatus("loading");
      setApiError("");

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          setStatus("success");
          setForm({ nombre: "", email: "", mensaje: "" });
          setTouched({});
          setErrors({});
        } else {
          const data = await response.json();
          setApiError(data.error || "Error al enviar el mensaje");
          setStatus("error");
        }
      } catch (err) {
        setApiError("Error de conexión. Intenta de nuevo.");
        setStatus("error");
      }
    }
  };

  // Animaciones GSAP con ScrollTrigger
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none reverse",
      }
    });

    // Animar header
    if (headerRef.current) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: "power3.out"
        }
      );
    }

    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.2)"
        },
        "-=0.4"
      );
    }

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40, filter: "blur(8px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out"
        },
        "-=0.3"
      );
    }

    if (dividerRef.current) {
      tl.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { 
          scaleX: 1, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power2.inOut" 
        },
        "-=0.4"
      );
    }

    // Animar columnas
    if (leftColRef.current) {
      tl.fromTo(
        leftColRef.current,
        { opacity: 0, x: -50, filter: "blur(6px)" },
        { 
          opacity: 1, 
          x: 0, 
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out"
        },
        "-=0.3"
      );
    }

    if (rightColRef.current) {
      tl.fromTo(
        rightColRef.current,
        { opacity: 0, x: 50, filter: "blur(6px)" },
        { 
          opacity: 1, 
          x: 0, 
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out"
        },
        "-=0.6"
      );
    }

    // Animar promesas
    if (promisesRef.current) {
      const items = promisesRef.current.children;
      tl.fromTo(
        items,
        { 
          opacity: 0, 
          x: -20 
        },
        { 
          opacity: 1, 
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out"
        },
        "-=0.3"
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <section id="contacto" className="section section-surface section-gold-border-top" ref={sectionRef}>
      {/* Decorative orb */}
      <div
        ref={orbRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="orb orb-gold absolute"
          style={{
            width: "clamp(200px, 30vw, 400px)",
            height: "clamp(200px, 30vw, 400px)",
            top: "20%",
            right: "-10%",
            opacity: 0.4,
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-20">
          <div ref={badgeRef} className="flex justify-center mb-6">
            <span className="badge">{t.contact.badge}</span>
          </div>
          <h2
            ref={titleRef}
            className="heading-xl mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t.contact.title} <span className="text-gradient">{t.contact.title2}</span>
          </h2>
          <p
            className="lead-text max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            {t.contact.subtitle}
          </p>
          <div
            ref={dividerRef}
            className="divider-gold mt-6"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div ref={leftColRef} className="space-y-8">
            <div>
              <h3
                className="heading-lg mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {language === 'es' ? 'Hablemos de tu proyecto' : 'Let\'s talk about your project'}
              </h3>
              <p
                className="text-sm mb-8"
                style={{ color: "var(--text-secondary)" }}
              >
                {language === 'es'
                  ? 'Estoy listo para ayudarte a transformar tu equipo y alcanzar tus objetivos. Agenda una sesión gratuita sin compromiso.'
                  : 'I\'m ready to help you transform your team and achieve your goals. Schedule a free, no-obligation session.'}
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(124,107,196,0.1)",
                    color: "var(--gold-primary)",
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <p
                    className="font-semibold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {language === 'es' ? 'Email' : 'Email'}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    fernando@eleva.consulting
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(124,107,196,0.1)",
                    color: "var(--gold-primary)",
                  }}
                >
                  <Linkedin size={20} />
                </div>
                <div>
                  <p
                    className="font-semibold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    LinkedIn
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {language === 'es' ? 'Conectemos profesionalmente' : 'Let\'s connect professionally'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(124,107,196,0.1)",
                    color: "var(--gold-primary)",
                  }}
                >
                  <Calendar size={20} />
                </div>
                <div>
                  <p
                    className="font-semibold mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {language === 'es' ? 'Sesión Gratuita' : 'Free Session'}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {language === 'es' ? '30 minutos para conocernos' : '30 minutes to get to know each other'}
                  </p>
                </div>
              </div>
            </div>

            {/* Promises */}
            <div ref={promisesRef} className="space-y-4">
              <h4
                className="font-semibold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                {language === 'es' ? '¿Qué esperar?' : 'What to expect?'}
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={16} style={{ color: "var(--gold-primary)" }} />
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {language === 'es' ? 'Respuesta en menos de 24 horas' : 'Response in less than 24 hours'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={16} style={{ color: "var(--gold-primary)" }} />
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {language === 'es' ? 'Sin compromiso ni costos ocultos' : 'No commitment or hidden costs'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={16} style={{ color: "var(--gold-primary)" }} />
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {language === 'es' ? 'Enfoque 100% personalizado' : '100% personalized approach'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div ref={rightColRef}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {language === 'es' ? 'Nombre' : 'Name'} *
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--text-muted)" }}
                  />
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 ${
                      errors.nombre && touched.nombre
                        ? "border-red-500 bg-red-500/5"
                        : "border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)]"
                    } focus:border-[var(--gold-primary)] focus:outline-none`}
                    style={{ color: "var(--text-primary)" }}
                    placeholder={language === 'es' ? 'Tu nombre completo' : 'Your full name'}
                  />
                </div>
                {errors.nombre && touched.nombre && (
                  <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Email *
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--text-muted)" }}
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 ${
                      errors.email && touched.email
                        ? "border-red-500 bg-red-500/5"
                        : "border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)]"
                    } focus:border-[var(--gold-primary)] focus:outline-none`}
                    style={{ color: "var(--text-primary)" }}
                    placeholder={language === 'es' ? 'tu@email.com' : 'your@email.com'}
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="mensaje"
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {language === 'es' ? 'Mensaje' : 'Message'} *
                </label>
                <div className="relative">
                  <MessageSquare
                    size={18}
                    className="absolute left-3 top-3"
                    style={{ color: "var(--text-muted)" }}
                  />
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 resize-none ${
                      errors.mensaje && touched.mensaje
                        ? "border-red-500 bg-red-500/5"
                        : "border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)]"
                    } focus:border-[var(--gold-primary)] focus:outline-none`}
                    style={{ color: "var(--text-primary)" }}
                    placeholder={language === 'es' ? 'Cuéntame sobre tu proyecto...' : 'Tell me about your project...'}
                  />
                </div>
                {errors.mensaje && touched.mensaje && (
                  <p className="text-red-500 text-sm mt-1">{errors.mensaje}</p>
                )}
              </div>

              {apiError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <AlertCircle size={16} className="text-red-500" />
                  <p className="text-red-500 text-sm">{apiError}</p>
                </div>
              )}

              {status === "success" && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <CheckCircle2 size={16} className="text-green-500" />
                  <p className="text-green-500 text-sm">
                    {language === 'es' ? '¡Mensaje enviado! Te responderé pronto.' : 'Message sent! I\'ll reply soon.'}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 px-6 rounded-lg bg-[var(--gold-primary)] text-black font-semibold transition-all duration-300 hover:bg-[var(--gold-hover)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    {language === 'es' ? 'Enviando...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    {language === 'es' ? 'Enviar mensaje' : 'Send message'}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
