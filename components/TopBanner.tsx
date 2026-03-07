"use client";

import { Star } from "lucide-react";

export default function TopBanner() {
  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[110] flex items-center justify-center py-3 px-4"
      style={{
        background: "rgba(10, 10, 15, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
      }}
    >
      <div className="badge text-xs">
        <Star size={12} fill="currentColor" />
        COACHING EJECUTIVO · RESULTADOS REALES
      </div>
    </div>
  );
}
