"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const credentials = [
  "ICF Certified Coach · PCC Level",
  "Máster en Psicología Organizacional",
  "NLP Practitioner Certificada",
  "Especialista en Neurociencia del Liderazgo",
];

const stats = [
  { number: "+500", label: "Clientes" },
  { number: "10+", label: "Años exp. certificada" },
  { number: "87%", label: "Logran sus objetivos" },
  { number: "4.9", label: "Valoración media" },
];

const floatingBadges = [
  { text: "+500 clientes", top: "12%", right: "4%", delay: 0.2 },
  { text: "10 años", bottom: "25%", left: "4%", delay: 0.5 },
  { text: "ICF Certified", top: "55%", right: "4%", delay: 0.8 },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="sobre-mi"
      className="section section-surface section-gold-border-top"
      ref={ref}
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 xl:gap-28 items-center">
          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
            className="relative order-2 lg:order-1"
          >
            {/* Badge */}
            <div className="mb-10 flex justify-start">
              <span className="badge">Sobre mí</span>
            </div>

            {/* Photo placeholder with gradient */}
            <div className="relative rounded-lg overflow-hidden max-w-md mx-auto lg:mx-0" style={{ aspectRatio: "3/4" }}>
              {/* Gradient photo placeholder */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, #1A1A26 0%, #12121A 40%, rgba(212,175,55,0.08) 70%, #0A0A0F 100%)",
                }}
              />
              {/* Decorative frame */}
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, transparent 40%, rgba(245,158,11,0.08) 100%)",
                }}
              />
              {/* Coach silhouette shape */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-5/6">
                <div
                  className="w-full h-full rounded-t-full"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(212,175,55,0.12) 0%, rgba(26,26,38,0.8) 100%)",
                  }}
                />
              </div>

              {/* ICF badge overlay */}
              <div
                className="absolute top-6 left-6 glass-card-sm px-4 py-2"
                style={{ borderRadius: "var(--radius-md)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--gold-primary)" }}>
                  ICF Certified PCC
                </p>
              </div>
            </div>

            {/* Floating badges */}
            {floatingBadges.map((badge) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: badge.delay, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
                className="absolute badge hidden lg:flex"
                style={{
                  top: badge.top,
                  bottom: badge.bottom,
                  left: badge.left,
                  right: badge.right,
                }}
              >
                {badge.text}
              </motion.div>
            ))}
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] as [number, number, number, number], delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <h2 className="heading-xl mb-10" style={{ fontFamily: "var(--font-heading)" }}>
              Transformé mi vida.{" "}
              <br />
              <span className="text-gradient">Ahora te ayudo a</span>
              <br />
              transformar la tuya.
            </h2>

            <div className="divider-gold-left mb-10" />

            <p className="lead-text mb-8">
              Soy Valentina, coach certificada con más de 10 años acompañando
              a personas y empresas en sus puntos de inflexión. Empecé desde
              cero — sin red de seguridad, sin hoja de ruta. Solo la certeza
              de que había algo más.
            </p>

            <p className="mb-12" style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              Mi metodología combina neurociencia aplicada, psicología positiva
              y estrategia de negocios. No te digo qué hacer — te acompaño a
              descubrirlo tú mismo, de forma más rápida y con menos dolor.
            </p>

            {/* Credentials */}
            <div className="flex flex-wrap gap-4 mb-14">
              {credentials.map((cred) => (
                <div key={cred} className="credential-chip">
                  <CheckCircle2 size={14} style={{ color: "var(--gold-primary)", flexShrink: 0 }} />
                  <span>{cred}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 pt-10 border-t"
              style={{ borderColor: "var(--dark-border)" }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="text-center sm:text-left"
                >
                  <p className="stat-number">{stat.number}</p>
                  <p className="stat-label">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
