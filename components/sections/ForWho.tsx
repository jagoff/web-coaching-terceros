"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { scrollToElement } from "@/lib/scroll";
import { headerStagger, blurUp, dividerGrow } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 8, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: 0.3 + i * 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function ForWho() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="para-quien" className="section section-surface section-gold-border-top" ref={ref}>
      <div className="container">

        {/* Section header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">{t.forWho.badge}</span>
          </motion.div>

          <motion.h2
            variants={blurUp}
            className="heading-xl"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              lineHeight: "1.2",
            }}
          >
            <span className="text-gradient">{t.forWho.title}</span>
            {t.forWho.titleHighlight && <span>{t.forWho.titleHighlight}</span>}
          </motion.h2>

          <motion.p
            variants={blurUp}
            className="lead-text mt-4 max-w-2xl mx-auto"
            style={{ 
              color: "var(--text-secondary)",
              fontSize: "1.25rem",
              lineHeight: "1.6"
            }}
            dangerouslySetInnerHTML={{ __html: t.forWho.subtitle }}
          />

          <motion.div variants={dividerGrow} className="divider-gold mt-6" />
        </motion.div>

        {/* Profile cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 items-stretch">
          {t.forWho.profiles.map((profile, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardReveal}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="glass-card p-6 sm:p-8 flex flex-col group relative overflow-hidden"
              style={{ perspective: "800px" }}
              whileHover={{
                y: -6,
                boxShadow:
                  "0 0 40px rgba(124,107,196,0.12), 0 16px 48px rgba(0,0,0,0.5)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Subtle glow on hover */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(ellipse at top right, rgba(124,107,196,0.15) 0%, transparent 60%)",
                }}
              />

              {/* Icon */}
              <motion.div
                className="w-14 h-14 rounded-lg flex items-center justify-center text-2xl mb-6 flex-shrink-0"
                style={{
                  background: "rgba(124,107,196,0.12)",
                  border: "1px solid rgba(124,107,196,0.25)",
                }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                {profile.icon}
              </motion.div>

              {/* Title */}
              <h3
                className="heading-md mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                  lineHeight: "1.35",
                  minHeight: "3.5rem",
                }}
              >
                <span className="text-gradient">{profile.title}</span>
              </h3>

              {/* Description */}
              <p
                className="flex-1 mb-6"
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: "1.75",
                  fontSize: "0.95rem",
                }}
              >
                {profile.description}
              </p>

              {/* Pain point tag */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mt-auto"
                style={{
                  background: "rgba(200,123,90,0.10)",
                  border: "1px solid rgba(200,123,90,0.30)",
                  color: "var(--gold-primary)",
                  whiteSpace: "nowrap",
                  minWidth: "fit-content"
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--gold-primary)" }}
                />
                {profile.pain}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          variants={blurUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex justify-center mt-12"
        >
          <button
            className="inline-flex items-center gap-2 bg-transparent border-0 cursor-pointer p-0 text-sm font-semibold uppercase tracking-widest transition-all"
            style={{
              background: "linear-gradient(135deg, #C87B5A 0%, #7C6BC4 50%, #FF6B35 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.1em",
            }}
            onClick={() => scrollToElement("contacto")}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.8";
              e.currentTarget.style.gap = "12px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.gap = "8px";
            }}
          >
            {t.forWho.cta}
            <ArrowRight size={16} style={{ color: "#FF6B35" }} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
