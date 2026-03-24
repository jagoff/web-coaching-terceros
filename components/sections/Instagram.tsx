"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Instagram, Heart, MessageCircle } from "@/components/ui/icons";

const containerReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemReveal: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const instagramPosts = [
  {
    id: 1,
    image: "/img/instagram/insta-1.svg",
    likes: 234,
    comments: 18,
    caption: "Transformación comienza con una decisión. 💪",
  },
  {
    id: 2,
    image: "/img/instagram/insta-2.svg",
    likes: 189,
    comments: 12,
    caption: "Liderazgo auténtico = resultados reales 🎯",
  },
  {
    id: 3,
    image: "/img/instagram/insta-3.svg",
    likes: 312,
    comments: 24,
    caption: "El éxito es la suma de pequeños hábitos 📈",
  },
  {
    id: 4,
    image: "/img/instagram/insta-4.svg",
    likes: 156,
    comments: 8,
    caption: "Mindset de crecimiento: la clave del progreso 🧠",
  },
  {
    id: 5,
    image: "/img/instagram/insta-5.svg",
    likes: 278,
    comments: 19,
    caption: "Acción > perfección. Empieza hoy 🚀",
  },
  {
    id: 6,
    image: "/img/instagram/insta-6.svg",
    likes: 425,
    comments: 31,
    caption: "Tu única limitación es tu mente ✨",
  },
];

export default function InstagramSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="instagram"
      className="section section-surface"
      ref={ref}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          variants={containerReveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-8">
            <span className="badge">
              <Instagram className="text-sm" />
              Sígueme en Instagram
            </span>
          </div>
          
          <h2 
            className="heading-xl mb-6 sm:mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Contenido diario para{" "}
            <span className="text-gradient">transformar tu vida</span>
          </h2>
          
          <div className="divider-gold mb-8 sm:mb-12" />
          
          <p className="lead-text max-w-2xl mx-auto">
            Tips, motivación y estrategias prácticas cada día. 
            Únete a más de 10,000 personas que están creciendo con nosotros.
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <motion.div
          variants={containerReveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
        >
          {instagramPosts.map((post, i) => (
            <motion.article
              key={post.id}
              custom={i}
              variants={itemReveal}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="glass-card cursor-pointer group overflow-hidden"
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
              }}
            >
              {/* Image Container */}
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Instagram icon overlay */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Instagram className="text-gray-800 text-lg" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-4 pb-4">
                {/* Engagement */}
                <div className="flex items-center gap-4 mb-3 text-sm" style={{ color: "var(--text-muted)" }}>
                  <div className="flex items-center gap-1">
                    <Heart className="text-sm" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="text-sm" />
                    <span>{post.comments}</span>
                  </div>
                </div>

                {/* Caption */}
                <p 
                  className="text-sm leading-relaxed line-clamp-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {post.caption}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={containerReveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.a
            href="https://instagram.com/elevacoaching"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Instagram className="text-lg" />
            Seguir en Instagram
          </motion.a>
          
          <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
            @elevacoaching • Contenido exclusivo diario
          </p>
        </motion.div>
      </div>
    </section>
  );
}
