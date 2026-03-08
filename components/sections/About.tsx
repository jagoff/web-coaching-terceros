"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { CheckCircle2, Instagram, ExternalLink } from "lucide-react";

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
  "Advanced Certified ScrumMaster",
  "Advanced Certified Scrum Product Owner",
  "Professional Scrum™ with UX (PSU I)",
  "Agile Coach",
  "Management 3.0 Metrics & OKR's",
  "unFIX Foundation Workshop",
];

const stats = [
  { number: "20+", label: "Años en tecnología" },
  { number: "6+", label: "Años de coaching ágil" },
  { number: "20+", label: "Certificaciones activas" },
  { number: "4", label: "Empresas co-fundadas" },
];

const INSTAGRAM_URL = "https://www.instagram.com/jago_ff";

const instagramPosts = [
  "C2OEy3wR00Z",
  "DRf9MgBjBpk",
  "C7FrLQHxAA-",
  "C66kOA6uCt2",
  "CXzdfE2O3b6",
  "CRuVZZ5n3Ol",
  "B-AI5jKH_QC",
  "B9P_cZxnw_A",
  "B64Kku9HSCZ",
  "B6BfByZnOn3",
  "B8Y4ePxn3yt",
  "C4tG_41KXCV",
  "BsObYi7gI5s",
  "BrYzUSLAoJW",
  "BqbMSdOgtSO",
  "B6JTAE0Hb0T",
];

const instaStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const instaCard: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

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

            {/* Instagram header */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: "rgba(124,107,196,0.08)",
                    border: "1px solid rgba(124,107,196,0.25)",
                  }}
                >
                  <Instagram size={16} style={{ color: "var(--gold-primary)" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>@jago_ff</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Seguime en Instagram</p>
                </div>
              </a>
              <motion.a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-1"
                style={{ padding: "0.5rem 1rem", fontSize: "0.75rem" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Seguime
                <ExternalLink size={11} />
              </motion.a>
            </div>

            {/* Instagram grid */}
            <motion.div
              variants={instaStagger}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-3 gap-2"
            >
              {instagramPosts.map((shortcode, i) => {
                const isFirst = i === 0;
                return (
                <motion.a
                  key={shortcode}
                  href={`https://www.instagram.com/p/${shortcode}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={instaCard}
                  className="relative rounded-lg overflow-hidden"
                  style={{
                    aspectRatio: "1/1",
                    border: "1px solid rgba(124,107,196,0.12)",
                    background: "rgba(20,18,29,0.6)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img
                    src={`/api/instagram/${shortcode}`}
                    alt="Post de Instagram @jago_ff"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full transition-all duration-500"
                    style={{
                      objectFit: "cover",
                      filter: isFirst ? "grayscale(0%)" : "grayscale(100%)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%)")}
                    onMouseLeave={(e) => {
                      if (!isFirst) e.currentTarget.style.filter = "grayscale(100%)";
                    }}
                  />
                </motion.a>
                );
              })}
            </motion.div>
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

            <p className="lead-text mb-12">
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
