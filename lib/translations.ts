export type Language = 'es' | 'en';

export interface Translations {
  // Navigation
  nav: {
    sobreMi: string;
    servicios: string;
    metodo: string;
    testimonios: string;
    precios: string;
    sesionGratuita: string;
  };
  
  // Hero
  hero: {
    title1: string;
    title2: string;
    title3: string;
    subtitle: string;
    cta: string;
  };
  
  // About
  about: {
    badge: string;
    title1: string;
    title2: string;
    title3: string;
    intro: string;
    approach: string;
    certificaciones: string;
    stats: {
      tecnologia: string;
      coaching: string;
      certificaciones: string;
      empresas: string;
    };
  };
  
  // Services
  services: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      liderazgo: {
        title: string;
        description: string;
        benefits: string[];
      };
      organizacional: {
        title: string;
        description: string;
        benefits: string[];
      };
      ambos: {
        title: string;
        description: string;
        benefits: string[];
      };
    };
  };
  
  // Process
  process: {
    badge: string;
    title: string;
    title2: string;
    title3: string;
    subtitle: string;
    steps: {
      diagnostico: {
        title: string;
        description: string;
      };
      diseno: {
        title: string;
        description: string;
      };
      ejecucion: {
        title: string;
        description: string;
      };
      autonomia: {
        title: string;
        description: string;
      };
    };
  };
  
  // Testimonials
  testimonials: {
    badge: string;
    title: string;
    title2: string;
    subtitle: string;
  };
  
  // Pricing
  pricing: {
    badge: string;
    title: string;
    title2: string;
    subtitle: string;
    plans: {
      liderazgo: {
        name: string;
        price: string;
        period: string;
        description: string;
        features: string[];
        cta: string;
      };
      organizacional: {
        name: string;
        price: string;
        period: string;
        description: string;
        features: string[];
        cta: string;
      };
      personalizado: {
        name: string;
        price: string;
        period: string;
        description: string;
        features: string[];
        cta: string;
      };
    };
  };
  
  // Contact
  contact: {
    badge: string;
    title: string;
    title2: string;
    subtitle: string;
    form: {
      nombre: {
        label: string;
        placeholder: string;
      };
      email: {
        label: string;
        placeholder: string;
      };
      empresa: {
        label: string;
        placeholder: string;
      };
      servicio: {
        label: string;
        placeholder: string;
        options: {
          liderazgo: string;
          organizacional: string;
          ambos: string;
          otros: string;
        };
      };
      mensaje: {
        label: string;
        placeholder: string;
      };
      submit: string;
    };
    success: {
      title: string;
      message: string;
    };
  };
  
  // Footer
  footer: {
    description: string;
    navLinks: {
      sobreMi: string;
      servicios: string;
      metodo: string;
      testimonios: string;
      precios: string;
    };
    rights: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    nav: {
      sobreMi: 'Sobre mí',
      servicios: 'Servicios',
      metodo: 'Mi Método',
      testimonios: 'Testimonios',
      precios: 'Precios',
      sesionGratuita: 'Sesión gratuita',
    },
    
    hero: {
      title1: 'De líder sobrecargado',
      title2: 'a líder',
      title3: 'transformador.',
      subtitle: 'Acompaño a líderes tech y founders a duplicar su impacto, construir equipos autónomos y escalar sin perder el control (ni la salud).',
      cta: 'Agenda tu sesión gratuita',
    },
    
    about: {
      badge: 'Conoce a tu guía',
      title1: 'De código',
      title2: 'a cultura',
      title3: 'organizacional.',
      intro: 'Soy Fernando. Pasé de 20 años escribiendo código y liderando equipos técnicos a transformar organizaciones completas. Sé exactamente lo que sientes cuando el crecimiento se vuelve caos.',
      approach: 'Mi superpoder: traducir problemas técnicos en soluciones de liderazgo. No vendo frameworks, te entrego herramientas prácticas que funcionan en el mundo real de startups y empresas tech.',
      certificaciones: 'Certificaciones que respaldan',
      stats: {
        tecnologia: 'Años en el mundo tech',
        coaching: 'Años transformando equipos',
        certificaciones: 'Certificaciones activas',
        empresas: 'Empresas co-fundadas',
      },
    },
    
    services: {
      badge: 'Transformación Real',
      title: 'Deja de apagar incendios',
      subtitle: 'Soluciones prácticas para líderes que quieren resultados medibles, no más teoría.',
      items: {
        liderazgo: {
          title: 'Coaching 1:1 para Líderes',
          description: 'Sesiones semanales para transformarte en el líder que tu equipo necesita. Deja de ser el cuello de botella y conviértete en el multiplicador.',
          benefits: [
            'Toma mejores decisiones bajo presión',
            'Comunica visión y ejecuta sin fricción',
            'Construye equipos que no dependen de ti',
            'Lidera con empatía sin perder autoridad',
            'Duplica tu impacto sin duplicar tus horas',
          ],
        },
        organizacional: {
          title: 'Consultoría de Equipo & Cultura',
          description: 'Reestructuramos cómo trabajan juntos. De silos individuales a máquina colaborativa que escala sola.',
          benefits: [
            'Implementamos ágil que funciona (no teórico)',
            'Diseñamos procesos que eliminan el caos',
            'Creamos cultura que retiene talento',
            'Métricas que muestran progreso real',
            'Autonomía sin anarquía',
          ],
        },
        ambos: {
          title: 'Transformación Completa',
          description: 'El paquete integral: te transformamos como líder mientras transformamos tu equipo. Sinergia máxima, resultados exponenciales.',
          benefits: [
            'Todos los beneficios de coaching 1:1',
            'Todos los beneficios de consultoría',
            'Alineación perfecta líder-equipo',
            'Transformación 3x más rápida',
            'ROI medible desde el primer mes',
          ],
        },
      },
    },
    
    process: {
      badge: 'Mi Método',
      title: '4 pasos hacia',
      title2: '',
      title3: 'la transformación',
      subtitle: 'Un proceso estructurado pero flexible, adaptado a tu realidad y objetivos específicos.',
      steps: {
        diagnostico: {
          title: 'Diagnóstico',
          description: 'Analizamos tu organización, equipo o liderazgo actual. Identificamos fricciones, oportunidades y el punto de partida real.',
        },
        diseno: {
          title: 'Diseño',
          description: 'Co-creamos una hoja de ruta a medida: objetivos claros, métricas de avance y estrategia ágil adaptada a tu contexto.',
        },
        ejecucion: {
          title: 'Ejecución',
          description: 'Sesiones de coaching y acompañamiento en el día a día. Iteramos, removemos impedimentos y mantenemos el foco.',
        },
        autonomia: {
          title: 'Autonomía',
          description: 'Consolidamos prácticas, transferimos herramientas y construís la capacidad interna para seguir evolucionando sin depender de mí.',
        },
      },
    },
    
    testimonials: {
      badge: 'Testimonios',
      title: 'Resultados que',
      title2: 'hablan solos',
      subtitle: 'La mejor medida del éxito es el impacto real en las personas y organizaciones que acompañé.',
    },
    
    pricing: {
      badge: 'Precios',
      title: 'Inversión que',
      title2: 'multiplica valor',
      subtitle: 'Planes flexibles adaptados a diferentes necesidades y etapas de crecimiento.',
      plans: {
        liderazgo: {
          name: 'Coaching de Liderazgo',
          price: 'USD 150',
          period: '/ sesión',
          description: 'Sesiones individuales de 60 minutos para desarrollo de liderazgo.',
          features: [
            'Sesión 1:1 de 60 minutos',
            'Evaluación 360° inicial',
            'Plan de desarrollo personalizado',
            'Material y recursos exclusivos',
            'Soporte por email entre sesiones',
          ],
          cta: 'Comenzar ahora',
        },
        organizacional: {
          name: 'Consultoría Organizacional',
          price: 'USD 200',
          period: '/ hora',
          description: 'Consultoría para transformación ágil y optimización de procesos.',
          features: [
            'Diagnóstico organizacional',
            'Diseño de procesos ágiles',
            'Capacitación para equipos',
            'Métricas y seguimiento',
            'Documentación completa',
          ],
          cta: 'Consultar ahora',
        },
        personalizado: {
          name: 'Plan Personalizado',
          price: 'A convenir',
          period: '',
          description: 'Soluciones integrales a medida para tu organización.',
          features: [
            'Diagnóstico sin cargo',
            'Propuesta personalizada',
            'Combinación de servicios',
            'Flexibilidad de horarios',
            'Resultados garantizados',
          ],
          cta: 'Solicitar propuesta',
        },
      },
    },
    
    contact: {
      badge: 'Contacto',
      title: 'Comencemos',
      title2: 'la transformación',
      subtitle: 'La primera sesión es completamente gratuita. Sin compromiso, solo para conocernos y ver cómo puedo ayudarte a duplicar tu impacto.',
      form: {
        nombre: {
          label: 'Nombre completo',
          placeholder: 'Tu nombre',
        },
        email: {
          label: 'Email',
          placeholder: 'tu@email.com',
        },
        empresa: {
          label: 'Empresa (opcional)',
          placeholder: 'Nombre de tu empresa',
        },
        servicio: {
          label: '¿Qué estás buscando? *',
          placeholder: 'Selecciona una opción',
          options: {
            liderazgo: 'Coaching de Liderazgo',
            organizacional: 'Consultoría Organizacional',
            ambos: 'Ambos servicios',
            otros: 'Otros',
          },
        },
        mensaje: {
          label: 'Mensaje',
          placeholder: 'Cuéntame más sobre tu situación...',
        },
        submit: 'Enviar mensaje',
      },
      success: {
        title: '¡Todo listo!',
        message: 'Gracias por contactarme. Te responderé dentro de las 24 horas hábiles con disponibilidad para tu sesión gratuita.',
      },
    },
    
    footer: {
      description: 'Transformando líderes y organizaciones a través del coaching ágil y la consultoría estratégica.',
      navLinks: {
        sobreMi: 'Sobre mí',
        servicios: 'Servicios',
        metodo: 'Mi Método',
        testimonios: 'Testimonios',
        precios: 'Precios',
      },
      rights: 'Todos los derechos reservados.',
    },
  },
  
  en: {
    nav: {
      sobreMi: 'About me',
      servicios: 'Services',
      metodo: 'My Method',
      testimonios: 'Testimonials',
      precios: 'Pricing',
      sesionGratuita: 'Free session',
    },
    
    hero: {
      title1: 'Agile leadership',
      title2: 'for',
      title3: 'scaling organizations',
      subtitle: 'I transform teams and business cultures through personalized coaching, agile methodologies, and a human-centric approach.',
      cta: 'Book your free session',
    },
    
    about: {
      badge: 'About me',
      title1: 'From technology',
      title2: 'to transforming',
      title3: 'organizations.',
      intro: "I'm Fernando, with over 20 years in technology and 11+ years as an independent agile consultant. I went from managing servers to leading operations and transforming organizational cultures in startups and tech companies.",
      approach: 'My approach combines agile methodologies, strategic leadership, and a human-centric approach. I don\'t tell you what to do — I accompany you to build autonomous teams, scalable processes, and a culture that drives results.',
      certificaciones: 'International certifications',
      stats: {
        tecnologia: 'Years in technology',
        coaching: 'Years of agile coaching',
        certificaciones: 'Active certifications',
        empresas: 'Companies co-founded',
      },
    },
    
    services: {
      badge: 'Services',
      title: 'Tailored solutions',
      subtitle: 'Every organization is unique. My services adapt to your specific needs, combining proven frameworks with personalized approach.',
      items: {
        liderazgo: {
          title: 'Leadership Coaching',
          description: 'For leaders and managers who want to enhance their impact, develop high-performance teams, and navigate today\'s complex environment.',
          benefits: [
            'Situational and adaptive leadership',
            'Effective communication and feedback',
            'Conflict management and negotiation',
            'Autonomous team development',
            'Emotional intelligence and empathy',
          ],
        },
        organizacional: {
          title: 'Organizational Consulting',
          description: 'For startups and companies that need to professionalize operations, adopt real agility, and build a culture that scales with the business.',
          benefits: [
            'Custom agile transformation',
            'Scalable process design',
            'Flexible organizational structure',
            'Meaningful metrics and KPIs',
            'Cultural change management',
          ],
        },
        ambos: {
          title: 'Both services',
          description: 'A comprehensive approach that combines leadership coaching with organizational consulting for complete and sustainable transformation.',
          benefits: [
            'All coaching benefits',
            'All consulting benefits',
            'Synergy between leadership and processes',
            'Greater impact and speed',
            'Comprehensive support',
          ],
        },
      },
    },
    
    process: {
      badge: 'My Method',
      title: '4 steps towards',
      title2: '',
      title3: 'transformation',
      subtitle: 'A structured but flexible process, adapted to your reality and specific objectives.',
      steps: {
        diagnostico: {
          title: 'Diagnosis',
          description: 'We analyze your current organization, team, or leadership. We identify friction points, opportunities, and the real starting point.',
        },
        diseno: {
          title: 'Design',
          description: 'We co-create a tailored roadmap: clear objectives, progress metrics, and an agile strategy adapted to your context.',
        },
        ejecucion: {
          title: 'Execution',
          description: 'Coaching sessions and day-to-day support. We iterate, remove impediments, and maintain focus.',
        },
        autonomia: {
          title: 'Autonomy',
          description: 'We consolidate practices, transfer tools, and build internal capacity to continue evolving without depending on me.',
        },
      },
    },
    
    testimonials: {
      badge: 'Testimonials',
      title: 'Results that',
      title2: 'speak for themselves',
      subtitle: 'The best measure of success is the real impact on the people and organizations I\'ve accompanied.',
    },
    
    pricing: {
      badge: 'Pricing',
      title: 'Investment that',
      title2: 'multiplies value',
      subtitle: 'Flexible plans adapted to different needs and growth stages.',
      plans: {
        liderazgo: {
          name: 'Leadership Coaching',
          price: 'USD 150',
          period: '/ session',
          description: 'Individual 60-minute sessions for leadership development.',
          features: [
            '60-minute 1:1 session',
            'Initial 360° assessment',
            'Personalized development plan',
            'Exclusive materials and resources',
            'Email support between sessions',
          ],
          cta: 'Get started now',
        },
        organizacional: {
          name: 'Organizational Consulting',
          price: 'USD 200',
          period: '/ hour',
          description: 'Consulting for agile transformation and process optimization.',
          features: [
            'Organizational diagnosis',
            'Agile process design',
            'Team training',
            'Metrics and tracking',
            'Complete documentation',
          ],
          cta: 'Inquire now',
        },
        personalizado: {
          name: 'Custom Plan',
          price: 'To be agreed',
          period: '',
          description: 'Comprehensive solutions tailored to your organization.',
          features: [
            'No-charge diagnosis',
            'Personalized proposal',
            'Service combination',
            'Schedule flexibility',
            'Guaranteed results',
          ],
          cta: 'Request proposal',
        },
      },
    },
    
    contact: {
      badge: 'Contact',
      title: 'Let\'s start',
      title2: 'the conversation',
      subtitle: 'The first session is completely free. No commitment, just to get to know each other and see how I can help you.',
      form: {
        nombre: {
          label: 'Full name',
          placeholder: 'Your name',
        },
        email: {
          label: 'Email',
          placeholder: 'your@email.com',
        },
        empresa: {
          label: 'Company (optional)',
          placeholder: 'Your company name',
        },
        servicio: {
          label: 'What are you looking for? *',
          placeholder: 'Select an option',
          options: {
            liderazgo: 'Leadership Coaching',
            organizacional: 'Organizational Consulting',
            ambos: 'Both services',
            otros: 'Other',
          },
        },
        mensaje: {
          label: 'Message',
          placeholder: 'Tell me more about your situation...',
        },
        submit: 'Send message',
      },
      success: {
        title: 'Message sent!',
        message: 'Thank you for contacting me. I will respond within 24 business hours.',
      },
    },
    
    footer: {
      description: 'Transforming leaders and organizations through agile coaching and strategic consulting.',
      navLinks: {
        sobreMi: 'About me',
        servicios: 'Services',
        metodo: 'My Method',
        testimonios: 'Testimonials',
        precios: 'Pricing',
      },
      rights: 'All rights reserved.',
    },
  },
};
