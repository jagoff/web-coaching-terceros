"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Import dynamic components with loading states and priority
const DynamicNavbar = dynamic(() => import("@/components/Navbar"), { 
  ssr: false,
  loading: () => <div className="h-16 bg-dark-base/50 animate-pulse" />
});

const AmbientParticles = dynamic(() => import("@/components/AmbientParticles"), { 
  ssr: false,
  loading: () => null
});

const CursorGlow = dynamic(() => import("@/components/CursorGlow"), { 
  ssr: false,
  loading: () => null
});

const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { 
  ssr: false,
  loading: () => null
});

const ThemeToggle = dynamic(() => import("@/components/ui/ThemeToggle"), { 
  ssr: false,
  loading: () => null
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Delay non-critical components
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoaded && <AmbientParticles />}
      <div className="noise-overlay" aria-hidden="true" />
      {isLoaded && <CursorGlow />}
      
      <DynamicNavbar />
      {isLoaded && <ThemeToggle />}
      {isLoaded && <WhatsAppButton />}
      {children}
    </>
  );
}
