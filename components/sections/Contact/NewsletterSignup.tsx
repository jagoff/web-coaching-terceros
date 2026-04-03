"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function NewsletterSignup() {
  const { language } = useLanguage();
  const es = language === "es";
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call - replace with actual newsletter service
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    setEmail("");
  };

  const copy = {
    title: es ? "Tips de Liderazgo" : "Leadership Tips",
    subtitle: es ? "1 email por semana, sin spam" : "1 email per week, no spam",
    placeholder: es ? "tu@email.com" : "your@email.com",
    button: es ? "Suscribirse" : "Subscribe",
    success: es ? "¡Gracias por suscribirte!" : "Thanks for subscribing!",
    description: es 
      ? "Recibe estrategias probadas para escalar equipos y liderazgo remoto."
      : "Get proven strategies for scaling teams and remote leadership."
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="glass-card p-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(124,107,196,0.12) 0%, rgba(200,123,90,0.08) 100%)",
        border: "1px solid rgba(124,107,196,0.3)",
      }}
      whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(124,107,196,0.15)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Ambient violet glow */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,107,196,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(124,107,196,0.2)",
              border: "1px solid rgba(124,107,196,0.4)",
            }}
          >
            <Mail size={18} style={{ color: "var(--gold-primary)" }} />
          </div>
          <div>
            <h3
              className="font-semibold"
              style={{
                color: "var(--text-primary)",
                fontSize: "1rem",
                fontFamily: "var(--font-heading)",
              }}
            >
              {copy.title}
            </h3>
            <p
              className="text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              {copy.subtitle}
            </p>
          </div>
        </div>

        {/* Description */}
        <p
          className="mb-4 text-sm leading-relaxed"
          style={{
            color: "var(--text-secondary)",
            lineHeight: "1.5",
          }}
        >
          {copy.description}
        </p>

        {/* Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={copy.placeholder}
                required
                className="w-full px-4 py-3 rounded-lg text-sm transition-all duration-200"
                style={{
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(124,107,196,0.3)",
                  color: "var(--text-primary)",
                  fontSize: "0.875rem",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(124,107,196,0.6)";
                  e.target.style.background = "rgba(0,0,0,0.4)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(124,107,196,0.3)";
                  e.target.style.background = "rgba(0,0,0,0.3)";
                }}
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting || !email}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
              style={{
                background: isSubmitting || !email 
                  ? "rgba(124,107,196,0.3)" 
                  : "var(--gold-primary)",
                color: isSubmitting || !email 
                  ? "var(--text-muted)" 
                  : "#000000",
                fontSize: "0.875rem",
                fontWeight: 600,
                border: "1px solid transparent",
              }}
              whileHover={!isSubmitting && email ? { 
                scale: 1.02,
                backgroundColor: "var(--gold-hover)" 
              } : {}}
              whileTap={!isSubmitting && email ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  {es ? "Enviando..." : "Sending..."}
                </>
              ) : (
                <>
                  {copy.button}
                  <Send size={14} />
                </>
              )}
            </motion.button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
            style={{ color: "var(--gold-primary)" }}
          >
            <div className="text-2xl mb-2">✨</div>
            <p className="font-semibold text-sm">{copy.success}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
