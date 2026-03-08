"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

const proofItems = [
  { city: "Buenos Aires", timeAgo: "hace 2 días" },
  { city: "Rosario", timeAgo: "hace 3 días" },
  { city: "Córdoba", timeAgo: "hace 5 días" },
  { city: "Montevideo", timeAgo: "hace 1 semana" },
  { city: "Santiago de Chile", timeAgo: "hace 4 días" },
  { city: "Medellín", timeAgo: "hace 6 días" },
  { city: "Ciudad de México", timeAgo: "hace 1 semana" },
  { city: "Lima", timeAgo: "hace 3 días" },
];

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    // First toast after 12 seconds
    const initialTimeout = setTimeout(() => {
      setIndex(0);
      setVisible(true);
    }, 12000);

    return () => clearTimeout(initialTimeout);
  }, []);

  useEffect(() => {
    if (index < 0) return;

    // Show toast for 5 seconds
    const hideTimeout = setTimeout(() => {
      setVisible(false);
    }, 5000);

    // Next toast after 18 seconds (5s visible + 13s gap)
    const nextTimeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % proofItems.length);
      setVisible(true);
    }, 18000);

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(nextTimeout);
    };
  }, [index]);

  const item = index >= 0 ? proofItems[index] : null;

  return (
    <AnimatePresence>
      {visible && item && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: 0, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="social-proof-toast"
          role="status"
          aria-live="polite"
        >
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(212, 175, 55, 0.12)",
              border: "1px solid rgba(212, 175, 55, 0.25)",
              color: "var(--gold-primary)",
            }}
          >
            <MapPin size={16} />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-semibold" style={{ color: "var(--text-primary)", lineHeight: 1.3 }}>
              Un líder de {item.city}
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)", lineHeight: 1.3 }}>
              agendó su sesión {item.timeAgo}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
