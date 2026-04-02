"use client";

import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhatsAppBooking() {
  const { t } = useLanguage();

  const phoneNumber = "5493425153999";
  const message = encodeURIComponent(t.whatsapp.message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.ariaLabel}
      className="whatsapp-fab flex items-center justify-center text-white shadow-lg transition-all hover:scale-110"
      style={{ backgroundColor: "#25D366", width: "64px", height: "64px" }}
    >
      <MessageCircle size={24} />
    </a>
  );
}
