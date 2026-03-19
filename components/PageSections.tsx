"use client";

import dynamic from "next/dynamic";

// Client-side dynamic imports for page sections
export const Hero          = dynamic(() => import("@/components/sections/HeroGSAP"), { 
  ssr: false
});
export const About         = dynamic(() => import("@/components/sections/About"), { ssr: false });
export const Services      = dynamic(() => import("@/components/sections/Services"), { ssr: false });
export const Process       = dynamic(() => import("@/components/sections/Process"), { ssr: false });
export const Testimonials  = dynamic(() => import("@/components/sections/Testimonials"), { ssr: false });
export const Results       = dynamic(() => import("@/components/sections/Results"), { ssr: false });
export const Pricing       = dynamic(() => import("@/components/sections/Pricing"), { ssr: false });
export const Contact       = dynamic(() => import("@/components/sections/Contact"), { ssr: false });
export const CalBooking    = dynamic(() => import("@/components/sections/CalBookingSimple"), { 
  ssr: false
});
export const FAQ           = dynamic(() => import("@/components/sections/FAQ"), { ssr: false });
export const Footer        = dynamic(() => import("@/components/sections/Footer"), { ssr: false });
export const CaseStudies    = dynamic(() => import("@/components/sections/CaseStudies"), { ssr: false });
