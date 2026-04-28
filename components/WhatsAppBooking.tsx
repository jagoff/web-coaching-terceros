"use client";

import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const PHONE = "5493425153999";

export default function WhatsAppBooking() {
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const whatsappUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(t.whatsapp.bookingMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.fabLabel}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-6 py-4 rounded-full shadow-lg transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      style={{
        backgroundColor: "#25D366",
        color: "white",
        fontWeight: "600",
        fontSize: "16px",
        minWidth: 56,
        minHeight: 56,
      }}
    >
      <MessageCircle size={24} aria-hidden="true" />
      <span className="hidden sm:inline">{t.whatsapp.fabLabel}</span>
    </a>
  );
}
