"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import { useLanguage } from "@/contexts/LanguageContext";

const DynamicNavbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
  loading: () => <div className="h-16 bg-dark-base/50 animate-pulse" />,
});

const AmbientParticles = dynamic(() => import("@/components/AmbientParticles"), {
  ssr: false,
  loading: () => null,
});

const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), {
  ssr: false,
  loading: () => null,
});

/**
 * Mantiene `document.documentElement.lang` sincronizado con el contexto de idioma.
 * Importante para screen readers y SEO cuando el usuario navega a `/en`.
 */
function HtmlLangSync() {
  const { language } = useLanguage();
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);
  return null;
}

/**
 * Smooth scroll con respeto a `prefers-reduced-motion`. Si el usuario lo pidió,
 * no inicializamos Lenis para evitar movimiento innecesario y mantener la API
 * nativa de scroll del navegador.
 */
function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Exponer la instancia para que los handlers de Navbar puedan usarla
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as Record<string, unknown>).__lenis;
    };
  }, []);

  return <>{children}</>;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Diferir componentes no críticos hasta que el navegador esté idle.
    let cancel: (() => void) | undefined;
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        () => setIsLoaded(true),
        { timeout: 2000 }
      );
      cancel = () => (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => setIsLoaded(true), 500);
      cancel = () => clearTimeout(timer);
    }
    return cancel;
  }, []);

  return (
    <SmoothScrollProvider>
      <HtmlLangSync />
      {isLoaded && <AmbientParticles />}
      <div className="noise-overlay" aria-hidden="true" />
      <DynamicNavbar />
      {isLoaded && <WhatsAppButton />}
      {children}
    </SmoothScrollProvider>
  );
}
