"use client";

import dynamic from "next/dynamic";

// Client-side dynamic imports for page sections
export const Hero          = dynamic(() => import("@/components/sections/HeroGSAP"), { 
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center">
    <div className="text-white text-xl">Cargando...</div>
  </div>
});
export const About         = dynamic(() => import("@/components/sections/AboutGSAP"), { ssr: false });
export const Services      = dynamic(() => import("@/components/sections/ServicesGSAP"), { ssr: false });
export const Process       = dynamic(() => import("@/components/sections/ProcessGSAP"), { ssr: false });
export const Testimonials  = dynamic(() => import("@/components/sections/TestimonialsGSAP"), { ssr: false });
export const Results       = dynamic(() => import("@/components/sections/ResultsGSAP"), { ssr: false });
export const Pricing       = dynamic(() => import("@/components/sections/PricingGSAP"), { ssr: false });
export const Contact       = dynamic(() => import("@/components/sections/ContactGSAP"), { ssr: false });
export const CalBooking    = dynamic(() => import("@/components/sections/CalBookingSimple"), { 
  ssr: false,
  loading: () => <div className="section flex items-center justify-center">
    <div className="text-white text-xl">Cargando calendario...</div>
  </div>
});
export const FAQ           = dynamic(() => import("@/components/sections/FAQGSAP"), { ssr: false });
export const Footer        = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
export const CaseStudies    = dynamic(() => import("@/components/sections/CaseStudies"), { ssr: false });
