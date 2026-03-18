import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugins de GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimationConfig {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  scrollTrigger?: boolean | ScrollTrigger.Vars;
  stagger?: number;
  delay?: number;
}

export const useGSAPAnimation = () => {
  const timelineRef = useRef<any>(null);
  const elementsRef = useRef<{ [key: string]: Element | Element[] | null }>({});

  // Función para registrar elementos
  const registerElements = useCallback((elements: { [key: string]: Element | Element[] | null }) => {
    elementsRef.current = { ...elementsRef.current, ...elements };
  }, []);

  // Función para crear timeline
  const createTimeline = useCallback((config?: any) => {
    timelineRef.current = gsap.timeline(config);
    return timelineRef.current;
  }, []);

  // Función para animar elementos
  const animate = useCallback((
    selector: string | Element | Element[],
    config: AnimationConfig
  ) => {
    const elements = typeof selector === 'string' 
      ? elementsRef.current[selector] || document.querySelectorAll(selector)
      : selector;

    if (!elements || (Array.isArray(elements) && elements.length === 0)) {
      console.warn(`No elements found for selector: ${selector}`);
      return null;
    }

    const { from, to, scrollTrigger, stagger, delay } = config;

    // Configurar ScrollTrigger si es necesario
    const scrollTriggerConfig = scrollTrigger ? {
      trigger: Array.isArray(elements) ? elements[0] : elements,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...(typeof scrollTrigger === 'object' ? scrollTrigger : {})
    } : undefined;

    // Crear animación
    const tween = gsap.fromTo(
      elements,
      from || { opacity: 0, y: 50 },
      {
        ...to,
        opacity: 1,
        y: 0,
        duration: to?.duration || 0.8,
        ease: to?.ease || 'power3.out',
        delay: delay || 0,
        stagger: stagger,
        scrollTrigger: scrollTriggerConfig,
      }
    );

    return tween;
  }, []);

  // Función para animación secuencial (stagger)
  const staggerAnimate = useCallback((
    elements: (string | Element)[],
    config: AnimationConfig
  ) => {
    const tl = gsap.timeline();
    
    elements.forEach((element, index) => {
      const el = typeof element === 'string' 
        ? elementsRef.current[element] || document.querySelector(element)
        : element;

      if (el) {
        tl.fromTo(
          el,
          config.from || { opacity: 0, y: 30 },
          {
            ...config.to,
            opacity: 1,
            y: 0,
            duration: config.to?.duration || 0.6,
            ease: config.to?.ease || 'power2.out',
          },
          index * (config.stagger || 0.1)
        );
      }
    });

    return tl;
  }, []);

  // Función para animar con ScrollTrigger
  const animateOnScroll = useCallback((
    selector: string | Element | Element[],
    config: AnimationConfig
  ) => {
    return animate(selector, { ...config, scrollTrigger: true });
  }, [animate]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return {
    registerElements,
    createTimeline,
    animate,
    staggerAnimate,
    animateOnScroll,
    timeline: timelineRef.current,
  };
};

// Configuraciones de animación predefinidas
export const animationPresets = {
  fadeInUp: {
    from: { opacity: 0, y: 40, filter: 'blur(8px)' },
    to: { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
  },
  fadeInScale: {
    from: { opacity: 0, scale: 0.9, filter: 'blur(6px)' },
    to: { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'back.out(1.2)' }
  },
  slideInLeft: {
    from: { opacity: 0, x: -60, filter: 'blur(4px)' },
    to: { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' }
  },
  slideInRight: {
    from: { opacity: 0, x: 60, filter: 'blur(4px)' },
    to: { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' }
  },
  lineGrow: {
    from: { scaleX: 0, opacity: 0 },
    to: { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.inOut' }
  },
  textReveal: {
    from: { opacity: 0, y: 20, filter: 'blur(2px)' },
    to: { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: 'power2.out' }
  }
};
