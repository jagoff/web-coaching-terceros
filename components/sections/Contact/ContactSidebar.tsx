"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { slideLeft } from "./animations";

export default function ContactSidebar() {
  const { language } = useLanguage();
  const es = language === "es";
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="flex flex-col gap-4 h-full">

      {/* ── Testimonial ── */}
      <motion.div
        variants={slideLeft}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="glass-card p-6 relative overflow-hidden"
        whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(124,107,196,0.15)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Ambient gold halo */}
        <div
          className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(200,123,90,0.10) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10">
          {/* Opening quote mark */}
          <div
            className="text-5xl leading-none mb-3 select-none"
            style={{ color: "var(--gold-primary)", fontFamily: "Georgia, serif", opacity: 0.6 }}
            aria-hidden="true"
          >
            &ldquo;
          </div>

          <p
            className="mb-4"
            style={{
              color: "var(--text-secondary)",
              lineHeight: "1.7",
              fontSize: "0.95rem",
              fontStyle: "italic",
            }}
          >
            {es
              ? "Pasamos de micromanagement a equipos autónomos en 3 meses. Cambió completamente nuestra dinámica."
              : "We went from micromanagement to autonomous teams in 3 months. It completely changed our dynamics."}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <div
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}
              >
                VP Engineering
              </div>
              <div
                className="text-xs mt-0.5"
                style={{ color: "var(--text-muted)" }}
              >
                Tech Scale-up · Argentina
              </div>
            </div>

            {/* Stars */}
            <div className="flex gap-0.5" aria-label="5 estrellas">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3.5 h-3.5"
                  fill="var(--gold-primary)"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Call to action card - Last message before conversion ── */}
      <motion.div
        variants={slideLeft}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="glass-card p-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(124,107,196,0.12) 0%, rgba(200,123,90,0.08) 100%)",
          border: "1px solid rgba(124,107,196,0.3)",
        }}
      >
        {/* Ambient violet glow */}
        <div
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(124,107,196,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <p
            className="mb-3 leading-relaxed"
            style={{
              color: "var(--text-primary)",
              fontSize: "0.95rem",
              fontWeight: 500,
              lineHeight: "1.6",
            }}
          >
            {es
              ? "Cada día que pasa sin actuar es un día que tu equipo sigue lidiando con los mismos problemas."
              : "Every day you wait is another day your team struggles with the same problems."}
          </p>
          
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.875rem",
              lineHeight: "1.6",
            }}
          >
            {es
              ? "La primera sesión es gratis. No tienes nada que perder, pero tu equipo tiene todo por ganar."
              : "The first session is free. You have nothing to lose, but your team has everything to gain."}
          </p>
        </div>
      </motion.div>

    </div>
  );
}
