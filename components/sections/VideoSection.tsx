"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Play, Youtube } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import YouTubeEmbed from "@/components/YouTubeEmbed";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const contentVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

interface VideoSectionProps {
  videoId: string;
  title?: string;
  description?: string;
  sectionId?: string;
  className?: string;
}

export default function VideoSection({
  videoId,
  title,
  description,
  sectionId = "video",
  className = "",
}: VideoSectionProps) {
  const { language, t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const defaultTitle = t.video.defaultTitle;
  const defaultDescription = t.video.defaultDescription;

  return (
    <section
      id={sectionId}
      ref={ref}
      className={`section section-surface ${className}`}
    >
      <div className="container">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <span className="badge">
              {t.video.badge}
            </span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="heading-xl mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="text-gradient">{title || defaultTitle}</span>
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className="divider-gold mx-auto mb-8"
            style={{ width: "80px" }}
          />
          
          <motion.p
            variants={itemVariants}
            className="lead-text max-w-3xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            {description || defaultDescription}
          </motion.p>
        </motion.div>

        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <YouTubeEmbed
              videoId={videoId}
              title={title || defaultTitle}
              className="max-w-5xl mx-auto"
              autoplay={false}
              muted={false}
              controls={true}
              rel={false}
              modestBranding={true}
              showInfo={false}
              allowFullscreen={false}
              allowKeyboard={false}
              showRelated={false}
              enableCC={false}
              enableAnnotations={false}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Quick preset for the specific video
export function FernandoFerrariVideo() {
  return (
    <VideoSection
      videoId="mgr1mkSRl3o"
      title={undefined}
      description={undefined}
      sectionId="video-presentacion"
    />
  );
}
