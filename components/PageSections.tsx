'use client'

import dynamic from 'next/dynamic'
import LoadingFallback from '@/components/ui/LoadingFallback'

// Client-side dynamic imports for page sections
export const Hero = dynamic(() => import('@/components/sections/Hero'), {
  ssr: false,
  loading: () => <LoadingFallback />,
})

// Critical sections - load immediately but without SSR
export const About = dynamic(() => import('@/components/sections/About'), { ssr: false })
export const Services = dynamic(() => import('@/components/sections/Services'), { ssr: false })

// Below-fold sections - lazy load with intersection observer
export const Process = dynamic(() => import('@/components/sections/Process'), { 
  ssr: false,
  loading: () => <LoadingFallback />
})
export const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), {
  ssr: false,
  loading: () => <LoadingFallback />
})
export const Pricing = dynamic(() => import('@/components/sections/Pricing'), { 
  ssr: false,
  loading: () => <LoadingFallback />
})
export const Contact = dynamic(() => import('@/components/sections/Contact'), { 
  ssr: false,
  loading: () => <LoadingFallback />
})
export const FAQ = dynamic(() => import('@/components/sections/FAQ'), { 
  ssr: false,
  loading: () => <LoadingFallback />
})
export const Footer = dynamic(() => import('@/components/sections/Footer'), { ssr: false })
export const CaseStudies = dynamic(() => import('@/components/sections/CaseStudies'), {
  ssr: false,
  loading: () => <LoadingFallback />
})
