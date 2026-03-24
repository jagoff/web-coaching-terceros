'use client'

import { useEffect, useState, useCallback } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

interface UserBehavior {
  scrollDepth: number
  timeOnPage: number
  sectionsViewed: string[]
  interactions: {
    pricingClicked: boolean
    servicesClicked: boolean
    testimonialsViewed: boolean
    contactAttempts: number
  }
  deviceType: 'mobile' | 'desktop' | 'tablet'
  timeOfDay: 'morning' | 'afternoon' | 'evening'
  sessionDuration: number
  scrollVelocity: number
  skipPatterns: string[]
}

interface UserProfile {
  persona: 'ceo' | 'tech_lead' | 'founder' | 'manager' | 'individual'
  urgencyLevel: 'high' | 'medium' | 'low'
  budgetIndication: 'startup' | 'mid_market' | 'enterprise'
  preferredService: 'leadership' | 'agile' | 'team_building' | 'scaling'
  decisionStage: 'awareness' | 'consideration' | 'decision'
  confidence: number
}

export function useUserProfileAI() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [behavior, setBehavior] = useState<UserBehavior>({
    scrollDepth: 0,
    timeOnPage: 0,
    sectionsViewed: [],
    interactions: {
      pricingClicked: false,
      servicesClicked: false,
      testimonialsViewed: false,
      contactAttempts: 0,
    },
    deviceType: 'desktop',
    timeOfDay: 'morning',
    sessionDuration: 0,
    scrollVelocity: 0,
    skipPatterns: [],
  })
  const { language } = useLanguage()

  // Device detection
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth
      if (width < 768) return 'mobile'
      if (width < 1024) return 'tablet'
      return 'desktop'
    }

    const detectTimeOfDay = () => {
      const hour = new Date().getHours()
      if (hour < 12) return 'morning'
      if (hour < 18) return 'afternoon'
      return 'evening'
    }

    setBehavior(prev => ({
      ...prev,
      deviceType: detectDevice(),
      timeOfDay: detectTimeOfDay(),
    }))
  }, [])

  // Track scroll behavior with velocity
  useEffect(() => {
    let maxScroll = 0
    let lastScrollY = 0
    let lastScrollTime = Date.now()
    let velocities: number[] = []

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const currentTime = Date.now()
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = (currentScrollY / scrollHeight) * 100
      
      // Calculate velocity
      const timeDiff = currentTime - lastScrollTime
      const scrollDiff = Math.abs(currentScrollY - lastScrollY)
      const velocity = scrollDiff / timeDiff * 1000 // pixels per second
      velocities.push(velocity)
      
      maxScroll = Math.max(maxScroll, currentScroll)
      
      setBehavior(prev => ({
        ...prev,
        scrollDepth: maxScroll,
        timeOnPage: currentTime - window.performance.timing.navigationStart,
        scrollVelocity: velocities.reduce((a, b) => a + b, 0) / velocities.length,
      }))

      lastScrollY = currentScrollY
      lastScrollTime = currentTime
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track section views
  const trackSectionView = useCallback((sectionName: string) => {
    setBehavior(prev => {
      const newSections = [...prev.sectionsViewed, sectionName]
      
      // Detect skip patterns
      if (prev.sectionsViewed.length > 0) {
        const lastSection = prev.sectionsViewed[prev.sectionsViewed.length - 1]
        const skipped = prev.sectionsViewed.filter(s => s !== lastSection && s !== sectionName)
        if (skipped.length > 0) {
          return {
            ...prev,
            sectionsViewed: newSections,
            skipPatterns: [...prev.skipPatterns, ...skipped],
          }
        }
      }
      
      return {
        ...prev,
        sectionsViewed: newSections,
      }
    })
  }, [])

  // Track interactions
  const trackInteraction = useCallback((type: keyof UserBehavior['interactions']) => {
    setBehavior(prev => ({
      ...prev,
      interactions: {
        ...prev.interactions,
        [type]: type === 'contactAttempts' 
          ? prev.interactions.contactAttempts + 1 
          : true,
      },
    }))
  }, [])

  // AI Profile Analysis
  useEffect(() => {
    const analyzeProfile = () => {
      const { 
        scrollDepth, 
        sectionsViewed, 
        interactions, 
        timeOnPage, 
        deviceType, 
        timeOfDay, 
        scrollVelocity,
        skipPatterns 
      } = behavior
      
      // Persona Detection Algorithm
      let persona: UserProfile['persona'] = 'individual'
      let confidence = 0

      // Founder indicators - specific pattern
      if (
        timeOfDay === 'evening' &&
        deviceType === 'mobile' &&
        scrollVelocity > 200 &&
        skipPatterns.includes('about') &&
        sectionsViewed.includes('services')
      ) {
        persona = 'founder'
        confidence = 0.9
      }
      // CEO indicators
      else if (
        sectionsViewed.includes('pricing') && 
        sectionsViewed.includes('case-studies') &&
        timeOnPage > 120000 &&
        deviceType === 'desktop'
      ) {
        persona = 'ceo'
        confidence = 0.8
      }
      // Tech Lead indicators
      else if (
        sectionsViewed.includes('services') && 
        sectionsViewed.includes('process') &&
        interactions.pricingClicked &&
        scrollVelocity < 150
      ) {
        persona = 'tech_lead'
        confidence = 0.7
      }
      // Manager indicators
      else if (
        sectionsViewed.includes('testimonials') &&
        sectionsViewed.includes('about') &&
        timeOnPage > 180000
      ) {
        persona = 'manager'
        confidence = 0.6
      }

      // Urgency Detection
      let urgencyLevel: UserProfile['urgencyLevel'] = 'low'
      if (
        interactions.contactAttempts > 2 || 
        timeOnPage < 60000 ||
        (scrollVelocity > 250 && timeOfDay === 'evening')
      ) {
        urgencyLevel = 'high'
      } else if (
        interactions.pricingClicked || 
        scrollDepth > 60 ||
        (persona === 'founder' && deviceType === 'mobile')
      ) {
        urgencyLevel = 'medium'
      }

      // Budget Indication
      let budgetIndication: UserProfile['budgetIndication'] = 'startup'
      if (persona === 'ceo' && scrollDepth > 70) {
        budgetIndication = 'enterprise'
      } else if (persona === 'tech_lead' || persona === 'manager') {
        budgetIndication = 'mid_market'
      }

      // Decision Stage
      let decisionStage: UserProfile['decisionStage'] = 'awareness'
      if (interactions.contactAttempts > 0) {
        decisionStage = 'decision'
      } else if (sectionsViewed.length > 3) {
        decisionStage = 'consideration'
      }

      setProfile({
        persona,
        urgencyLevel,
        budgetIndication,
        preferredService: persona === 'tech_lead' ? 'agile' : 
                        persona === 'founder' ? 'scaling' : 'leadership',
        decisionStage,
        confidence,
      })
    }

    const timer = setTimeout(analyzeProfile, 3000)
    return () => clearTimeout(timer)
  }, [behavior])

  return {
    profile,
    behavior,
    trackSectionView,
    trackInteraction,
  }
}
