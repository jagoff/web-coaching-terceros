"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const slideReveal: Variants = {
  hidden: (dir: number) => ({ opacity: 0, x: dir, filter: "blur(6px)" }),
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const credentialStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const credentialPop: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 18 },
  },
};

const statReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.5 + i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const credentials = [
  "Advanced Certified ScrumMaster · UTN",
  "Advanced Certified Scrum Product Owner · UTN",
  "Professional Scrum™ with UX (PSU I)",
  "Management 3.0 Metrics & OKR's",
  "unFIX Foundation Workshop",
];

const stats = [
  { number: "20+", label: "Años en tecnología" },
  { number: "6+", label: "Años de coaching ágil" },
  { number: "20+", label: "Certificaciones activas" },
  { number: "3", label: "Empresas co-fundadas" },
];

const floatingBadges = [
  { text: "+20 años tech", top: "12%", right: "4%", delay: 0.2 },
  { text: "Scrum Master", bottom: "25%", left: "4%", delay: 0.5 },
  { text: "PSU I Certified", top: "55%", right: "4%", delay: 0.8 },
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
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 xl:gap-28 items-center">
          {/* Image column */}
          <motion.div
            custom={-60}
            variants={slideReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative order-2 lg:order-1 mt-4 lg:mt-0"
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
                  PSU I Certified
                </p>
              </div>
            </div>

            {/* Floating badges */}
            {floatingBadges.map((badge) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, scale: 0.6, y: 20, filter: "blur(6px)" }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ delay: badge.delay + 0.3, type: "spring", stiffness: 260, damping: 16 }}
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
            custom={60}
            variants={slideReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-1 lg:order-2"
          >
            <h2 className="heading-xl mb-6 sm:mb-10" style={{ fontFamily: "var(--font-heading)" }}>
              De la tecnología{" "}
              <br />
              <span className="text-gradient">a transformar</span>
              <br />
              organizaciones.
            </h2>

            <div className="divider-gold-left mb-6 sm:mb-10" />

            <p className="lead-text mb-6 sm:mb-8">
              Soy Fernando, con más de 20 años en tecnología y 6+ años
              como consultor ágil independiente. Pasé de administrar servidores
              a liderar operaciones y transformar culturas organizacionales
              en startups y empresas tech.
            </p>

            <p className="mb-12" style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              Mi enfoque combina metodologías ágiles, liderazgo estratégico
              y un approach human-centric. No te digo qué hacer — te acompaño
              a construir equipos autónomos, procesos escalables y una cultura
              que impulse resultados.
            </p>

            {/* Credentials */}
            <motion.div
              variants={credentialStagger}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-14"
            >
              {credentials.map((cred) => (
                <motion.div key={cred} variants={credentialPop} className="credential-chip" whileHover={{ scale: 1.05, y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
                  <CheckCircle2 size={14} style={{ color: "var(--gold-primary)", flexShrink: 0 }} />
                  <span>{cred}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 pt-10 border-t"
              style={{ borderColor: "var(--dark-border)" }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={statReveal}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="text-center sm:text-left"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
