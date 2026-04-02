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
    
    // AGGRESSIVE: Prevent any scroll for first 2 seconds
    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      return false;
    };
    
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Clear any hash that might cause auto-scroll
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    // Block ALL scroll events temporarily
    const scrollEvents = ['scroll', 'wheel', 'touchmove'];
    scrollEvents.forEach(event => {
      window.addEventListener(event, preventScroll, { passive: false });
      document.addEventListener(event, preventScroll, { passive: false });
    });
    
    // Remove scroll blocking after 2 seconds
    const timeout = setTimeout(() => {
      scrollEvents.forEach(event => {
        window.removeEventListener(event, preventScroll);
        document.removeEventListener(event, preventScroll);
      });
    }, 2000);
    
    // Delay non-critical components for FCP optimization
    const timer = setTimeout(() => setIsLoaded(true), 500);
    
    return () => {
      clearTimeout(timeout);
      clearTimeout(timer);
      scrollEvents.forEach(event => {
        window.removeEventListener(event, preventScroll);
        document.removeEventListener(event, preventScroll);
      });
    };
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
