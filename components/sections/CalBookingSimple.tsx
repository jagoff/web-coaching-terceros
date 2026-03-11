"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScroll, useTransform } from "framer-motion";
import { Calendar, CheckCircle2 } from "lucide-react";

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

export default function CalBookingSimple() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -40]);

  const CalComUsername = process.env.NEXT_PUBLIC_CALCOM_USERNAME || "fferrari";
  const eventTypeId = process.env.NEXT_PUBLIC_CALCOM_EVENT_TYPE_ID || "30min";
  const calComUrl = `https://cal.com/${CalComUsername}/${eventTypeId}`;

  console.log('Cal.com URL:', calComUrl);

  return (
    <section
      id="contacto"
      className="section section-compact"
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
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 xl:gap-28 items-start">
          {/* Left copy */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6 lg:space-y-0"
          >
            <span className="badge mb-4 sm:mb-6 inline-flex">{t.contact.badge}</span>

            <h2
              className="heading-xl mb-4 sm:mb-6 lg:mb-10"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t.contact.title}{" "}
              <span className="text-gradient">{t.contact.title2}</span>
            </h2>

            <div className="divider-gold-left mb-4 sm:mb-6 lg:mb-10" />

            <p className="lead-text mb-4 sm:mb-6">
              {t.contact.subtitle}
            </p>

            {/* Urgency indicator */}
            <div className="mb-4 p-4 rounded-lg" style={{
              background: "rgba(124,107,196,0.1)",
              border: "1px solid rgba(124,107,196,0.2)",
            }}>
              <p className="text-sm text-center" style={{ color: "var(--gold-primary)" }}>
                🎯 Solo <span className="font-bold">3 cupos disponibles</span> este mes para acompañamiento personalizado
              </p>
            </div>

            <motion.ul
              variants={promiseStagger}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4 sm:space-y-5 mb-10 sm:mb-14"
            >
              {[
                {
                  icon: Calendar,
                  text: language === 'es' ? '30 minutos que sirven' : '30 minutes that matter'
                },
                {
                  icon: Calendar,
                  text: language === 'es' ? 'Conversación real y auténtica' : 'Real and authentic conversation'
                },
                {
                  icon: CheckCircle2,
                  text: language === 'es' ? 'Claridad garantizada' : 'Clarity guaranteed'
                },
              ].map((item, index) => (
                <motion.li key={index} variants={promiseItem} className="flex items-center gap-3">
                  <item.icon
                    size={18}
                    style={{ color: "var(--gold-primary)", flexShrink: 0 }}
                  />
                  <span style={{ color: "var(--text-secondary)", fontSize: "clamp(0.875rem, 2.5vw, 1rem)" }}>
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Additional benefits */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-lg" style={{
                background: "rgba(124,107,196,0.05)",
                border: "1px solid rgba(124,107,196,0.1)",
              }}>
                <Calendar size={20} style={{ color: "var(--gold-primary)", marginBottom: "8px" }} />
                <p className="text-sm font-medium mb-1">
                  {t.contact.booking.instantBooking}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {t.contact.booking.instantBookingDesc}
                </p>
              </div>
              <div className="p-4 rounded-lg" style={{
                background: "rgba(124,107,196,0.05)",
                border: "1px solid rgba(124,107,196,0.1)",
              }}>
                <CheckCircle2 size={20} style={{ color: "var(--gold-primary)", marginBottom: "8px" }} />
                <p className="text-sm font-medium mb-1">
                  {t.contact.booking.autoReminder}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {t.contact.booking.autoReminderDesc}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right booking widget */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="glass-card p-4 sm:p-6 md:p-8 lg:p-10" style={{ minHeight: "500px" }}>
              <div className="mb-4 sm:mb-6">
                <h3
                  className="heading-md mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t.contact.booking.title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                  {t.contact.booking.subtitle}
                </p>
              </div>

              {/* Cal.com Iframe - Solución directa */}
              <div className="calcom-widget-container" style={{ 
                minHeight: "400px", 
                maxHeight: "70vh",
                height: "clamp(400px, 60vh, 500px)"
              }}>
                <iframe
                  src={calComUrl}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "8px",
                    background: "white",
                    touchAction: "manipulation",
                  }}
                  frameBorder="0"
                  title="Booking Calendar"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>

              <div className="mt-4 sm:mt-6 text-center">
                <p
                  className="text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {t.contact.booking.confirmationText}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
