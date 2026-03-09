"use client";

import { useEffect, useState } from "react";
import AmbientParticles from "./AmbientParticles";
import CursorGlow from "./CursorGlow";
import WhatsAppButton from "./WhatsAppButton";
import { DynamicNavbar } from "./DynamicSections";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && <AmbientParticles />}
      <div className="noise-overlay" aria-hidden="true" />
      {isClient && <CursorGlow />}
      <DynamicNavbar />
      {isClient && <WhatsAppButton />}
      {children}
    </>
  );
}
