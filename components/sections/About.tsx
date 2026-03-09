"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { CheckCircle2, Instagram, ExternalLink } from "lucide-react";
import InstagramCarousel from "./InstagramCarousel";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

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


const INSTAGRAM_URL = "https://www.instagram.com/jago_ff";

const instagramPosts = [5, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12];

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
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: "20+", label: t.about.stats.tecnologia },
    { number: "11+", label: t.about.stats.coaching },
    { number: "9+", label: t.about.stats.certificaciones },
    { number: "6", label: t.about.stats.empresas },
  ];

  return (
    <section
      id="sobre-mi"
      className="section section-surface section-gold-border-top"
      ref={ref}
      style={{ paddingBottom: "clamp(2rem, 4vw, 3rem)" }}
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">
          {/* Image column */}
          <motion.div
            custom={-60}
            variants={slideReveal}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative order-2 lg:order-1 mt-4 lg:mt-0"
          >
            {/* Badge */}
            <div className="mb-3 flex justify-start">
              <span className="badge">{t.about.badge}</span>
            </div>

            {/* Instagram Carousel - Mobile First */}
            <InstagramCarousel />
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
              {t.about.title1}{" "}
              <br />
              <span className="text-gradient">{t.about.title2}</span>
              <br />
              {t.about.title3}
            </h2>

            <div className="divider-gold-left mb-6 sm:mb-10" />

            <p className="lead-text mb-6 sm:mb-8">
              {t.about.intro}
            </p>

            <p className="lead-text mb-12">
              {t.about.approach}
            </p>

            <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
              {t.about.certificaciones}
            </h3>

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
