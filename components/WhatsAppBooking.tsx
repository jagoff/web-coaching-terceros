"use client";

import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhatsAppBooking() {
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const phoneNumber = "5493425153999";
  
  const message = encodeURIComponent(t.whatsapp.message);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  if (!isClient) {
    return null;
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.ariaLabel}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-full shadow-lg transition-all hover:scale-105"
      style={{
        backgroundColor: "#25D366",
        color: "white",
        fontWeight: "600",
        fontSize: "16px"
      }}
    >
      <MessageCircle size={24} />
      <span className="hidden sm:inline">{t.whatsapp.buttonText}</span>
    </a>
  );
}
