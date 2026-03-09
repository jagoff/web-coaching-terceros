// Google Analytics / Tag Manager tracking utilities
import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Initialize dataLayer
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(...args: any[]) {
    window.dataLayer.push(arguments);
  };
}

// Page view tracking
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-MMR8L48T', {
      page_path: url,
    });
  }
};

// Event tracking
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Specific tracking functions for the coaching site
export const analytics = {
  // Navigation tracking
  trackNavigation: (section: string) => {
    trackEvent('navigation', 'user_interaction', `navigate_to_${section}`);
  },

  // CTA tracking
  trackCTAClick: (cta: string, location: string) => {
    trackEvent('cta_click', 'engagement', `${cta}_${location}`);
  },

  // Form tracking
  trackFormStart: () => {
    trackEvent('form_start', 'engagement', 'contact_form');
  },

  trackFormSubmit: () => {
    trackEvent('form_submit', 'conversion', 'contact_form');
  },

  trackFormSuccess: () => {
    trackEvent('form_success', 'conversion', 'contact_form');
  },

  trackFormError: (error: string) => {
    trackEvent('form_error', 'error', `contact_form_${error}`);
  },

  // Instagram carousel tracking
  trackCarouselSwipe: (direction: 'left' | 'right') => {
    trackEvent('carousel_swipe', 'engagement', `instagram_${direction}`);
  },

  trackCarouselAutoAdvance: () => {
    trackEvent('carousel_auto_advance', 'engagement', 'instagram');
  },

  trackCarouselDotClick: (imageIndex: number) => {
    trackEvent('carousel_dot_click', 'engagement', `instagram_image_${imageIndex}`);
  },

  // Instagram link tracking
  trackInstagramClick: (source: 'carousel' | 'link') => {
    trackEvent('instagram_click', 'social', `instagram_${source}`);
  },

  // WhatsApp tracking
  trackWhatsAppClick: () => {
    trackEvent('whatsapp_click', 'social', 'whatsapp_button');
  },

  // Language toggle tracking
  trackLanguageToggle: (from: 'es' | 'en', to: 'es' | 'en') => {
    trackEvent('language_toggle', 'user_preference', `${from}_to_${to}`);
  },

  // Mobile vs desktop tracking
  trackDeviceType: () => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    trackEvent('device_type', 'technical', isMobile ? 'mobile' : 'desktop');
  },

  // Session duration tracking
  trackSessionDuration: (duration: number) => {
    trackEvent('session_duration', 'engagement', 'session_time', Math.round(duration / 1000));
  },

  // Scroll depth tracking
  trackScrollDepth: (depth: number) => {
    trackEvent('scroll_depth', 'engagement', `scroll_${depth}%`);
  },
};

// Custom hook for tracking page views
export const usePageTracking = () => {
  useEffect(() => {
    // Track initial page view
    trackPageView(window.location.pathname);

    // Track device type
    analytics.trackDeviceType();

    // Track scroll depth at 25%, 50%, 75%, 100%
    let hasTracked25 = false;
    let hasTracked50 = false;
    let hasTracked75 = false;
    let hasTracked100 = false;

    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercentage >= 25 && !hasTracked25) {
        hasTracked25 = true;
        analytics.trackScrollDepth(25);
      }
      if (scrollPercentage >= 50 && !hasTracked50) {
        hasTracked50 = true;
        analytics.trackScrollDepth(50);
      }
      if (scrollPercentage >= 75 && !hasTracked75) {
        hasTracked75 = true;
        analytics.trackScrollDepth(75);
      }
      if (scrollPercentage >= 90 && !hasTracked100) {
        hasTracked100 = true;
        analytics.trackScrollDepth(100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};
