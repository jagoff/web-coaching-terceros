"use client";

import dynamic from "next/dynamic";

export const About        = dynamic(() => import("@/components/sections/About"),        { ssr: false });
export const Services     = dynamic(() => import("@/components/sections/Services"),     { ssr: false });
export const Process      = dynamic(() => import("@/components/sections/Process"),      { ssr: false });
export const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), { ssr: false });
export const Results      = dynamic(() => import("@/components/sections/Results"),      { ssr: false });
export const Pricing      = dynamic(() => import("@/components/sections/Pricing"),      { ssr: false });
export const Contact      = dynamic(() => import("@/components/sections/Contact"),      { ssr: false });
export const Footer       = dynamic(() => import("@/components/sections/Footer"),       { ssr: false });
export const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"),      { ssr: false });
export const Hero = dynamic(() => import("@/components/sections/Hero"), { ssr: false });
export const DynamicNavbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
export const SmoothScroll  = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });
