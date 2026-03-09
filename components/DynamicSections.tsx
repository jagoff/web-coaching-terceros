"use client";

import dynamic from "next/dynamic";

// SSR-enabled: these render meaningful HTML for SEO / FCP
export const Hero          = dynamic(() => import("@/components/sections/Hero"));
export const About         = dynamic(() => import("@/components/sections/About"));
export const Services      = dynamic(() => import("@/components/sections/Services"));
export const Process       = dynamic(() => import("@/components/sections/Process"));
export const Testimonials  = dynamic(() => import("@/components/sections/Testimonials"));
export const Results       = dynamic(() => import("@/components/sections/Results"));
export const Pricing       = dynamic(() => import("@/components/sections/Pricing"));
export const Contact       = dynamic(() => import("@/components/sections/Contact"));
export const CalBooking    = dynamic(() => import("@/components/sections/CalBookingSimple"));
export const FAQ           = dynamic(() => import("@/components/sections/FAQ"));
export const Footer        = dynamic(() => import("@/components/sections/Footer"));
export const DynamicNavbar = dynamic(() => import("@/components/Navbar"));

// Client-only: depend on window/DOM APIs at module level
export const ScrollProgress    = dynamic(() => import("@/components/ScrollProgress"),    { ssr: false });
export const SmoothScroll      = dynamic(() => import("@/components/SmoothScroll"),      { ssr: false });
export const CursorGlow        = dynamic(() => import("@/components/CursorGlow"),        { ssr: false });
export const AmbientParticles  = dynamic(() => import("@/components/AmbientParticles"),  { ssr: false });
export const SocialProofToast  = dynamic(() => import("@/components/SocialProofToast"),  { ssr: false });
export const WhatsAppButton    = dynamic(() => import("@/components/WhatsAppButton"),    { ssr: false });
