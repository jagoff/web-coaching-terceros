'use client'

import { useEffect } from 'react'
import { useUserProfileAI } from '@/hooks/useUserProfileAI'

interface TrackingWrapperProps {
  sectionName: string
  children: React.ReactNode
  onInView?: () => void
}

export default function TrackingWrapper({ sectionName, children, onInView }: TrackingWrapperProps) {
  const { trackSectionView, trackInteraction } = useUserProfileAI()

  useEffect(() => {
    // Track when component mounts
    trackSectionView(sectionName)
    
    // Track hover for pricing sections
    if (sectionName === 'pricing') {
      const handleHover = () => trackInteraction('pricingClicked')
      const element = document.querySelector('[data-pricing-section]')
      element?.addEventListener('mouseenter', handleHover)
      
      return () => {
        element?.removeEventListener('mouseenter', handleHover)
      }
    }
  }, [sectionName, trackSectionView, trackInteraction])

  return <>{children}</>
}
