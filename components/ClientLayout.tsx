"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Import dynamic components with loading states and priority
const DynamicNavbar = dynamic(() => import("@/components/Navbar"), { 
  loading: () => <div className="h-16 bg-dark-base/50 animate-pulse" />
});

const AmbientParticles = dynamic(() => import("@/components/OptimizedParticles"), { 
  ssr: false,
  loading: () => null
});

const CursorGlow = dynamic(() => import("@/components/CursorGlow"), { 
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
    // Delay non-critical components for FCP optimization
    const timer = setTimeout(() => setIsLoaded(true), 500); // Increased from 100ms to 500ms
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Remove particles completely for FCP */}
      <div className="noise-overlay" aria-hidden="true" />
      {isLoaded && <CursorGlow />}
      
      <DynamicNavbar />
      {/* {isLoaded && <ThemeToggle />} */}
      {children}
    </>
  );
}
