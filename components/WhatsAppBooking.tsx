"use client";

import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function WhatsAppBooking() {
  const [isClient, setIsClient] = useState(false);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    // Show after 2.5 seconds to avoid competing with other animations
    const timer = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = "5493425153999";
  
  const message = encodeURIComponent(
    "Hola! Quiero agendar una sesión gratuita de consultoría. ¿Qué fechas y horarios tienes disponibles?"
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  if (!isClient) {
    return null;
  }

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-full shadow-lg transition-all hover:scale-105"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8, y: visible ? 0 : 20 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{ 
        backgroundColor: "#25D366",
        color: "white",
        fontWeight: "600",
        fontSize: "16px",
        pointerEvents: visible ? "auto" : "none"
      }}
    >
      <MessageCircle size={24} />
      <span className="hidden sm:inline">Agendar por WhatsApp</span>
    </motion.a>
  );
}
