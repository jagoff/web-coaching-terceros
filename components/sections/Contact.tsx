"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { headerStagger, blurUp, dividerGrow } from "@/lib/animations";
import ContactInfo from "./Contact/ContactInfo";
import ContactForm from "./Contact/ContactForm";
import ContactPromises from "./Contact/ContactPromises";

export default function Contact() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -40]);

  return (
    <section
      id="contacto"
      className="section relative overflow-hidden"
      ref={ref}
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, rgba(124,107,196,0.08) 0%, transparent 60%), var(--dark-surface)",
      }}
    >
      {/* Decorative orb with scroll parallax */}
      <motion.div
        className="orb orb-violet absolute"
        style={{
          width: 400,
          height: 400,
          bottom: "-20%",
          right: "50%",
          x: "50%",
          y: orbY,
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14 md:mb-24"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">{language === 'es' ? 'Contacto Directo' : 'Direct Contact'}</span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl text-center px-4"
            style={{ 
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {language === 'es' ? 'Comienza tu' : 'Start your'}{" "}
            <span className="text-gradient">{language === 'es' ? 'Transformación' : 'Transformation'}</span>
          </motion.h2>
          <motion.div
            variants={dividerGrow}
            className="divider-gold mt-6"
          />
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-14 md:mb-24">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ContactInfo />
            <ContactPromises />
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <p
            className="lead-text max-w-2xl mx-auto mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            {language === 'es' 
              ? 'Tu próximo nivel de liderazgo está a una conversación de distancia.' 
              : 'Your next leadership level is one conversation away.'
            }{" "}
            <strong style={{ color: "var(--text-primary)" }}>
              {language === 'es' ? '¿Cuándo empezamos?' : 'When do we start?'}
            </strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
