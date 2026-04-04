"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "@/contexts/LanguageContext";

// Client-side dynamic imports for page sections
export const Hero          = dynamic(() => import("@/components/sections/HeroServer"), { 
  ssr: true,
});
export const About         = dynamic(() => import("@/components/sections/About"), { ssr: false });
export const Services      = dynamic(() => import("@/components/sections/Services"), { ssr: false });
export const Process       = dynamic(() => import("@/components/sections/Process"), { ssr: false });
export const Results       = dynamic(() => import("@/components/sections/Results"), { ssr: false });
export const Pricing       = dynamic(() => import("@/components/sections/PlanCarousel"), { ssr: false });
export const Contact       = dynamic(() => import("@/components/sections/Contact"), { ssr: false });

// Loading component with translations
const CalendarLoadingFallback = () => {
  const { t } = useLanguage();
  return (
    <div className="section flex items-center justify-center">
      <div className="text-white text-xl">{t.loading.calendar}</div>
    </div>
  );
};

export const CalBooking    = dynamic(() => import("@/components/sections/CalBookingSimple"), { 
  ssr: false,
  loading: () => <CalendarLoadingFallback />,
});
export const FAQ           = dynamic(() => import("@/components/sections/FAQ"), { ssr: false });
export const Footer        = dynamic(() => import("@/components/sections/Footer"), { ssr: true });
export const CaseStudies    = dynamic(() => import("@/components/sections/CaseStudies"), { ssr: false });
export const ForWho         = dynamic(() => import("@/components/sections/ForWho"), { ssr: false });
export const Clients        = dynamic(() => import("@/components/sections/Clients"), { ssr: false });
