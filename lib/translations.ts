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
    preguntasFrecuentes: string;
  };
  
  // Hero
  hero: {
    title1: string;
    title2: string;
    title3: string;
    subtitle: string;
    cta: string;
    viewServices: string;
    // Frases rotativas
    rotatingPhrases: string[];
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
    personalizedServices: string;
    viewMore: string;
    knowMore: string;
    startHere: string;
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
    linkedinButton: string;
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
    subtitle: string;
  };
  
  // Pricing
  pricing: {
    badge: string;
    title: string;
    title2: string;
    subtitle: string;
    consultPlan: string;
    mostPopular: string;
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
    doubt: string;
    contactText: string;
  };
  
  // Newsletter
  newsletter: {
    title: string;
    subtitle: string;
    benefits: string[];
    emailPlaceholder: string;
    subscribeButton: string;
    note: string;
  };
  
  // Contact
  contact: {
    badge: string;
    title: string;
    title2: string;
    subtitle: string;
    limitedSpots: string;
    limitedSpotsText: string;
    submitButton: string;
    booking: {
      title: string;
      subtitle: string;
      calendly: string;
      instantBooking: string;
      instantBookingDesc: string;
      autoReminder: string;
      autoReminderDesc: string;
      confirmationText: string;
    };
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
    messageSent: string;
    willRespond: string;
    sending: string;
    retry: string;
  };
  
  // FAQ
  faq: {
    badge: string;
    title: string;
    title2: string;
    items: {
      question: string;
      answer: string;
    }[];
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
      preguntasFrecuentes: string;
    };
    rights: string;
  };
  
  // Test Card
  testCard: {
    title: string;
    subtitle: string;
    dimensions: string;
    instantResults: string;
    personalizedRecommendations: string;
    duration: string;
    estimatedTime: string;
    startTest: string;
  };
  
  // Scroll Progress
  scrollProgress: {
    inicio: string;
    sobreMi: string;
    servicios: string;
    proceso: string;
    testimonios: string;
    resultados: string;
    precios: string;
    faq: string;
    contacto: string;
    navigation: string;
    goToSection: string;
  };
  
  // Case Studies
  caseStudies: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    before: string;
    whileWorking: string;
    results: string;
    seeFullTransformation: string;
    analyzeYourCase: string;
    viewMoreCases: string;
    yourSpecificCase: string;
    // Datos de casos
    nexolab: {
      company: string;
      role: string;
      teamSize: string;
      duration: string;
      category: string;
      before: {
        title: string;
        points: string[];
      };
      intervention: {
        title: string;
        points: string[];
      };
      results: {
        title: string;
        points: string[];
      };
    };
  };
  
  // WhatsApp
  whatsapp: {
    message: string;
    buttonText: string;
    ariaLabel: string;
  };
  
  // Loading and UI
  loading: {
    calendar: string;
  };
  
  // Gestures and UI
  ui: {
    swiping: string;
    zoom2x: string;
    close: string;
  };
  
  // Video Section
  video: {
    badge: string;
    defaultTitle: string;
    defaultDescription: string;
  };
  
  // Loading states
  loadingStates: {
    loading: string;
    cargando: string;
  };
  
  // Testimonials navigation
  testimonialsNav: {
    previous: string;
    next: string;
    ariaPrevious: string;
    ariaNext: string;
  };

  // For Who section
  forWho: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    cta: string;
    profiles: {
      icon: string;
      title: string;
      description: string;
      pain: string;
    }[];
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    nav: {
      sobreMi: 'Sobre mí',
      servicios: 'Servicios',
      metodo: '¡Tenes que vivirlo!',
      testimonios: 'Testimonios',
      precios: 'Planes',
      sesionGratuita: 'Comenzar ahora',
      preguntasFrecuentes: 'Preguntas Frecuentes',
    },
    
    hero: {
      title1: 'Liderazgo ágil para',
      title2: 'organizaciones que escalan',
      title3: '',
      subtitle: 'De la tecnología a transformar organizaciones.',
      cta: 'Comenzar tu transformación',
      viewServices: 'Ver servicios',
      // Frases rotativas
      rotatingPhrases: [
        "Mi equipo no toma <span class='web-underline-orange'>decisiones</span> sin mí",
        "Las reuniones no llevan a <span class='web-underline-orange'>nada concreto</span>",
        "Estamos creciendo pero <span class='web-underline-orange'>todo se rompe</span>",
        "No logro <span class='web-underline-orange'>delegar</span> sin perder el control",
        "El equipo tiene <span class='web-underline-orange'>talento</span> pero no rinde",
        "Siempre apagamos incendios, nunca <span class='web-underline-orange'>prevenimos</span>",
        "Tengo <span class='web-underline-orange'>demasiadas prioridades</span> y no avanzo",
        "No sé si mi equipo está <span class='web-underline-orange'>alineado</span> con los objetivos",
        "Contrato bien pero la <span class='web-underline-orange'>gente se va</span> rápido",
        "Trabajamos mucho pero los <span class='web-underline-orange'>resultados no se ven</span>",
        "No hay tiempo para <span class='web-underline-orange'>pensar</span>, solo para reaccionar",
        "Cada área va por <span class='web-underline-orange'>su cuenta</span> y nadie coordina"
      ],
    },
    
    about: {
      badge: 'Sobre mí',
      title1: 'De la tecnología',
      title2: 'a transformar',
      title3: 'organizaciones.',
      intro: `<div style="line-height: 1.6; font-size: 0.9rem; max-width: 100%; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; hyphens: auto; margin: 0; padding: 0 1rem;">
  <p style="margin-bottom: 1.2rem;">
    <span style="font-family: var(--font-modern); font-weight: 600; font-size: 1.05rem; color: var(--text-primary);">¡Hola! Soy <span class="web-underline" style="background: linear-gradient(135deg, #7C6BC4 0%, #C87B5A 50%, #FF6B35 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; position: relative; display: inline;">Fernando Ferrari</span></span>
  </p>
  
  <p style="margin-bottom: 1rem;">
    <span style="font-family: var(--font-serif); font-weight: 500;">Llevo más de 20 años en tecnología — desde infraestructura y operaciones hasta liderazgo estratégico y transformación cultural.</span>
  </p>
  
  <p style="margin-bottom: 1rem;">
    <span style="font-family: var(--font-serif); font-weight: 500;">Fui técnico, sysadmin, CTO, Advanced Scrum Master, Product Owner, PM, Director de Operaciones.</span>
  </p>
  
  <p style="margin-bottom: 1rem;">
    <span style="font-family: var(--font-serif); font-weight: 500;">Lideré equipos en empresas de más de</span> <span style="font-family: var(--font-modern); font-weight: 700; color: #7C6BC4;">2500 personas</span> <span style="font-family: var(--font-serif); font-weight: 500;">como también en empresas de 4 personas, acompañé startups a escalar sin perder su identidad.</span>
  </p>
  
  <p style="margin-bottom: 1rem;">
    <span style="font-family: var(--font-serif); font-weight: 500;">Hoy gestiono infraestructura AWS Cloud en Avature, co-fundé</span> <span style="font-family: var(--font-modern); font-weight: 700; color: #7C6BC4;">Nodok.AI</span> <span style="font-family: var(--font-serif); font-weight: 500;">para proyectos de inteligencia artificial, y llevo +10 años como consultor ágil independiente.</span>
  </p>
  
  <p style="margin-top: 1.2rem; padding-left: 0.8rem; border-left: 3px solid var(--gold-primary);">
    <span style="font-family: var(--font-heading); font-style: italic; font-weight: 500; color: var(--text-primary);">Te acompaño a construir <span style="font-weight: 700;">equipos autónomos</span>, <span style="font-weight: 700;">procesos que escalen</span>, y una <span style="font-weight: 700;">cultura que retenga y desafíe al talento</span>.</span>
  </p>
</div>`,
      approach: '',
      certificaciones: 'Certificaciones internacionales comprobables',
      stats: {
        tecnologia: 'Años en tecnología',
        coaching: 'Años de coaching ágil',
        certificaciones: 'Certificaciones activas',
        empresas: 'Empresas co-fundadas',
      },
    },
    
    services: {
      badge: 'Servicios',
      title: 'Deja de apagar incendios',
      subtitle: 'Cada organización es única. Yo adapto mis servicios a tus necesidades específicas, combinando frameworks probados con enfoque personalizado.',
      personalizedServices: 'Servicios Personalizados',
      viewMore: 'Ver más',
      knowMore: '¿Queres saber más?',
      startHere: 'Empezá por acá',
      items: {
        liderazgo: {
          title: 'Coaching de Liderazgo',
          description: 'Para líderes y managers que quieren potenciar su impacto, desarrollar equipos de alto rendimiento y navegar la complejidad del entorno actual.',
          benefits: [
            'Liderazgo situacional y adaptativo',
            'Comunicación efectiva y feedback',
            'Gestión de conflictos y negociación',
            'Desarrollo de equipos autónomos',
            'Inteligencia emocional y empatía',
          ],
        },
        organizacional: {
          title: 'Consultoría Organizacional',
          description: 'Para startups y empresas que necesitan profesionalizar operaciones, adoptar agilidad real y construir una cultura que escale junto con el negocio. Yo te acompaño en este proceso.',
          benefits: [
            'Transformación ágil a medida',
            'Diseño de procesos escalables',
            'Estructura organizacional flexible',
            'Métricas y KPIs significativos',
            'Gestión del cambio cultural',
          ],
        },
        ambos: {
          title: 'Ambos servicios',
          description: 'Un enfoque integral que combina coaching de liderazgo con consultoría organizacional para tu transformación completa y sostenible. Yo te guío en todo el camino.',
          benefits: [
            'Todos los beneficios de coaching',
            'Todos los beneficios de consultoría',
            'Sinergia entre liderazgo y procesos',
            'Mayor impacto y velocidad',
            'Acompañamiento integral',
          ],
        },
      },
    },
    
    process: {
      badge: '¡Tenes que vivirlo!',
      title: 'Estos son mis 4 pasos hacia',
      title2: 'la transformación positiva',
      title3: '',
      subtitle: 'Un proceso estructurado pero flexible, adaptado a tu realidad y objetivos específicos.',
      linkedinButton: 'Ver certificaciones en LinkedIn',
      steps: {
        diagnostico: {
          title: 'Diagnóstico',
          description: 'Analizo tu organización, equipo o liderazgo actual. Identifico fricciones, oportunidades y el punto de partida real.',
        },
        diseno: {
          title: 'Diseño',
          description: 'Co-creo una hoja de ruta a medida: objetivos claros, métricas de avance y estrategia ágil adaptada a tu contexto.',
        },
        ejecucion: {
          title: 'Ejecución',
          description: 'Sesiones de coaching y acompañamiento en el día a día. Itero, remuevo impedimentos y mantenemos el foco.',
        },
        autonomia: {
          title: 'Autonomía',
          description: 'Consolido prácticas, transfiero herramientas y construís la capacidad interna para seguir evolucionando sin depender de mí.',
        },
      },
    },
    
    testimonials: {
      badge: 'Testimonios',
      title: 'Resultados que hablan solos',
      subtitle: 'La mejor medida del éxito es el impacto real en las personas y organizaciones que acompañé.',
    },
    
    pricing: {
      badge: 'Planes',
      title: 'Encuentra tu',
      title2: 'plan ideal',
      subtitle: 'Cada plan está diseñado para diferentes necesidades. Yo te ayudo a encontrar cuál se adapta mejor a vos.',
      consultPlan: 'Consultar plan',
      mostPopular: 'Más Popular',
      plans: {
        liderazgo: {
          name: 'Coaching de Liderazgo',
          price: 'USD 150',
          period: '/ sesión',
          description: 'Sesiones individuales de 60 minutos para desarrollo de liderazgo.',
          features: [
            'Sesión 1:1 de 1 hora',
            'Evaluación 360° inicial',
            'Plan de desarrollo personalizado',
            'Material y recursos exclusivos',
            'Soporte por Whatsapp entre sesiones',
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
          description: 'Soluciones integrales a medida para tu organización. Yo diseño el plan perfecto para vos.',
          features: [
            'Diagnóstico sin cargo',
            'Propuesta personalizada',
            'Combinación de servicios',
            'Flexibilidad de horarios',
          ],
          cta: 'Solicitar propuesta',
        },
      },
      doubt: '¿Tenés dudas sobre qué plan se adapta mejor a tu caso?',
      contactText: 'Escribime y lo hablamos sin compromiso.'
    },
    
    // Newsletter
    newsletter: {
      title: 'Newsletter Mensual',
      subtitle: 'Leadership, recursos ágiles y noticias directamente en tu inbox',
      benefits: [
        'Tips prácticos de leadership moderno',
        'Recursos ágiles para implementar ya',
        'Noticias y tendencias del mundo tech'
      ],
      emailPlaceholder: 'Tu email profesional',
      subscribeButton: 'Suscribirme Gratis',
      note: 'Sin spam. Un email mensual con valor real.'
    },
    
    contact: {
      badge: 'Contacto',
      title: 'Comencemos',
      title2: 'la conversación',
      subtitle: 'La primera sesión es completamente gratuita. Sin compromiso, solo para conocernos y ver cómo puedo ayudarte.',
      limitedSpots: '2 cupos disponibles',
      limitedSpotsText: 'este mes para acompañamiento personalizado',
      submitButton: 'AGENDA GRATIS TU SESIÓN',
      booking: {
        title: 'Agenda tu sesión gratuita',
        subtitle: 'Selecciona el horario que mejor te convenga y confirma en 2 minutos.',
        calendly: 'Agendar con Calendly',
        instantBooking: 'Agenda instantánea',
        instantBookingDesc: 'Sin esperas, confirmación inmediata',
        autoReminder: 'Recordatorio automático',
        autoReminderDesc: 'No te olvidarás de la sesión',
        confirmationText: 'Tu horario se guardará automáticamente. Recibirás un email de confirmación.',
      },
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
        title: '¡Mensaje enviado!',
        message: 'Gracias por contactarme. Te responderé dentro de las 24 horas hábiles. Aprovecha para agendar el día y la hora.',
      },
      messageSent: '¡Mensaje enviado!',
      willRespond: 'Te responderemos en menos de 24 horas.',
      sending: 'Enviando...',
      retry: 'Reintentar',
    },
    
    faq: {
      badge: 'Preguntas Frecuentes',
      title: 'Resolvé tus',
      title2: 'dudas',
      items: [
        {
          question: '¿Para quién es este servicio?',
          answer: 'Para líderes tech, founders de startups, CTOs y managers que sienten que su equipo podría rendir más, que las decisiones se estancan o que la cultura no escala al mismo ritmo que el negocio.',
        },
        {
          question: '¿Qué diferencia hay entre coaching y consultoría?',
          answer: 'El coaching te acompaña a encontrar tus propias respuestas y desarrollar habilidades de liderazgo. La consultoría aporta frameworks, procesos y estrategias concretas. Mi enfoque combina ambos según lo que necesites.',
        },
        {
          question: '¿Cuánto tiempo dura un proceso típico?',
          answer: 'Un proceso de coaching individual suele durar entre 8 y 12 sesiones (2-3 meses). La consultoría organizacional varía según la complejidad, pero los primeros resultados se ven en las primeras 4-6 semanas.',
        },
        {
          question: '¿La sesión de diagnóstico tiene algún costo?',
          answer: 'No. La primera sesión de 30 minutos es completamente gratuita y sin compromiso. Sirve para entender tu situación, definir objetivos y ver si tiene sentido trabajar juntos.',
        },
        {
          question: '¿Cuál es el proceso exacto para construir equipos autónomos?',
          answer: 'Fase 1: Evaluación (2 semanas) - Evaluación del nivel actual de autonomía con Team Autonomy Scorecard. Fase 2: Implementación de Frameworks (4 semanas) - Implementación de OKRs, ceremonias ágiles y matriz de decisiones. Fase 3: Escalamiento (6 semanas) - Escalamiento de prácticas y medición de ROI con dashboard de métricas.',
        },
        {
          question: '¿Qué métricas específicas se usan para medir la autonomía del equipo?',
          answer: 'Team Autonomy Score (0-100), Tiempo de Latencia de Decisiones, Ratio de Eficiencia de Reuniones, Tasa de Reducción de Dependencias, Índice de Velocidad de Innovación. Se mide línea base mensual y seguimiento semanal durante el proceso.',
        },
        {
          question: '¿Cuál es el ROI esperado de un programa de 12 semanas?',
          answer: 'Promedio histórico: 3x inversión en 6 meses. Reducción de reuniones 60%, velocidad de despliegue +200%, rotación de empleados -45%, satisfacción del equipo +40%. Métricas validadas con 50+ equipos.',
        },
        {
          question: '¿Qué herramientas y frameworks se implementan?',
          answer: 'OKRs (Objectives and Key Results), Ceremonias Ágiles (daily, retrospective, planning), Matriz de Decisiones (RACI, DACI), Team Topologies, Sociocracy 3.0, Dashboard de Métricas (KPIs personalizados), Herramientas de Automatización de Procesos.',
        },
        {
          question: '¿Cómo funciona el modelo de pricing para consultoría organizacional?',
          answer: 'Modelo basado en valor: USD 200/hora para diagnóstico, USD 150/hora para implementación, opción de retainer mensual USD 2,500 para equipos 5-10 personas. Precios ajustables según tamaño y complejidad.',
        },
        {
          question: '¿Qué certificaciones y experiencia tiene el coach?',
          answer: '20+ años en liderazgo tecnológico, Advanced Certified ScrumMaster, Advanced Certified Scrum Product Owner, Management 3.0, unFIX Foundation. Experiencia en empresas de 4 a 2500+ personas, co-fundador de Nodok.AI, +10 años como consultor ágil independiente.',
        },
        {
          question: '¿Qué resultados específicos se pueden esperar en 3 meses?',
          answer: 'Semana 1-4: Evaluación completa y diseño de framework. Semana 5-8: Primer ciclo de implementación con métricas base. Semana 9-12: Patrones de escalamiento y validación de ROI. Resultados típicos: 30% reducción en latencia de decisiones, 50% aumento en iniciativas del equipo.',
        }
      ],
    },
    
    footer: {
      description: 'Transformando líderes y organizaciones a través del coaching ágil y la transformación estratégica.',
      navLinks: {
        sobreMi: 'Sobre mí',
        servicios: 'Servicios',
        metodo: '¡Tenes que vivirlo!',
        testimonios: 'Testimonios',
        precios: 'Planes',
        preguntasFrecuentes: 'Preguntas Frecuentes',
      },
      rights: 'Todos los derechos reservados.',
    },
    
    testCard: {
      title: 'Test de',
      subtitle: 'Evalúa el nivel de madurez de tu organización en 5 áreas clave y obtén un plan de acción personalizado.',
      dimensions: '5 dimensiones críticas',
      instantResults: 'Resultados instantáneos',
      personalizedRecommendations: 'Recomendaciones personalizadas',
      duration: 'Solo 5 minutos',
      estimatedTime: 'Duración estimada: 5 minutos',
      startTest: 'Comenzar Test',
    },
    
    scrollProgress: {
      inicio: 'Inicio',
      sobreMi: 'Sobre mí',
      servicios: 'Servicios',
      proceso: 'Método',
      testimonios: 'Testimonios',
      resultados: 'Resultados',
      precios: 'Planes',
      faq: 'FAQ',
      contacto: 'Contacto',
      navigation: 'Navegación',
      goToSection: 'Ir a {section}',
    },
    
    caseStudies: {
      badge: 'CASOS DE ESTUDIO',
      title: 'Transformaciones',
      titleHighlight: 'Reales',
      subtitle: 'No solo mejoramos procesos, transformamos culturas y generamos resultados medibles. Estos son ejemplos concretos de equipos que pasaron del caos a la autonomía.',
      before: 'ANTES',
      whileWorking: 'MIENTRAS',
      results: 'RESULTADOS',
      seeFullTransformation: 'Ver transformación completa',
      analyzeYourCase: 'Analizar tu caso',
      viewMoreCases: 'Ver más casos de estudio',
      yourSpecificCase: 'Hablemos de tu caso específico.',
      nexolab: {
        company: 'NexoLab',
        role: 'CTO & Co-founder',
        teamSize: '15 devs',
        duration: '3 meses',
        category: 'Transformación Ágil',
        before: {
          title: 'Caos Organizacional',
          points: [
            'Sin estructura de trabajo definida',
            'Entregas inconsistentes y fuera de tiempo',
            'Alta rotación de talento',
            'Comunicación fragmentada entre equipos'
          ]
        },
        intervention: {
          title: 'Mientras',
          points: [
            'Implementación de Scrum real (no de manual)',
            'Definition of Done clara y medible',
            'Retrospectivas quincenales con acción concreta',
            'Daily meetings de 45→15 minutos'
          ]
        },
        results: {
          title: 'Resultados',
          points: [
            'Velocidad de entrega duplicada',
            'Deploy automation: 4hs→5 minutos',
            'Retención de talento +35%',
            'Equipos colaborativos vs silos'
          ]
        }
      },
    },
    
    whatsapp: {
      message: 'Hola! Quiero agendar una sesión gratuita de coaching. ¿Qué fechas y horarios tienes disponibles?',
      buttonText: 'Agendar por WhatsApp',
      ariaLabel: 'Agendar sesión por WhatsApp',
    },
    
    // Loading and UI
    loading: {
      calendar: 'Cargando calendario...',
    },
    
    // Gestures and UI
    ui: {
      swiping: 'Deslizando...',
      zoom2x: 'Zoom 2x',
      close: 'Cerrar',
    },
    
    // Video Section
    video: {
      badge: 'Video Presentación',
      defaultTitle: 'Conocé mi enfoque',
      defaultDescription: 'En este video te explico cómo ayudo a líderes y equipos a alcanzar su máximo potencial a través del coaching ágil y la transformación organizacional.',
    },
    
    // Loading states
    loadingStates: {
      loading: 'Cargando...',
      cargando: 'Cargando...',
    },
    
    // Testimonials navigation
    testimonialsNav: {
      previous: 'Anterior',
      next: 'Siguiente',
      ariaPrevious: 'Testimonio anterior',
      ariaNext: 'Siguiente testimonio',
    },

    forWho: {
      badge: '¿Esto es para vos?',
      title: '¿Te encontrás en alguna de estas situaciones?',
      titleHighlight: '',
      subtitle: 'Acompaño a líderes tech y founders que están en momentos clave. Si alguna de estas situaciones te resuena, podemos trabajar juntos.',
      cta: 'Quiero trabajar en esto',
      profiles: [
        {
          icon: '🚀',
          title: 'Nuevo en el rol de liderazgo',
          description: 'Pasaste de escribir código a liderar personas y nadie te enseñó cómo. Técnicamente sos muy bueno, pero la parte humana y organizacional todavía te pesa.',
          pain: 'Líder sin preparación',
        },
        {
          icon: '⚡',
          title: 'Tu empresa crece pero los procesos no acompañan',
          description: 'Lo que funcionaba con 5 personas ya no alcanza con 20. El equipo se descoordina, las prioridades se chocan y la velocidad que tenías antes se perdió.',
          pain: 'Escalar sin caos',
        },
        {
          icon: '🎯',
          title: 'Tenés el equipo pero no los resultados',
          description: 'Hay talento, pero no entrega. Aparecen silos, falta de ownership y decisiones que nadie toma. Sabés que el problema no es técnico — y eso lo hace más difícil de resolver.',
          pain: 'Talento sin resultados',
        },
      ],
    },
  },

  en: {
    nav: {
      sobreMi: 'About me',
      servicios: 'Services',
      metodo: 'You have to experience it!',
      testimonios: 'Testimonials',
      precios: 'Pricing',
      sesionGratuita: 'Get Started Now',
      preguntasFrecuentes: 'FAQ',
    },
    
    hero: {
      title1: 'Agile leadership for',
      title2: 'scaling organizations',
      title3: '',
      subtitle: 'I transform teams and business cultures through personalized coaching, agile methodologies, and a human-centric approach.',
      cta: 'Start your transformation',
      viewServices: 'View services',
      // Frases rotativas
      rotatingPhrases: [
        "My team doesn't make <span class='web-underline-orange'>decisions</span> without me",
        "Meetings don't lead to <span class='web-underline-orange'>anything concrete</span>",
        "We're growing but <span class='web-underline-orange'>everything breaks</span>",
        "I can't <span class='web-underline-orange'>delegate</span> without losing control",
        "The team has <span class='web-underline-orange'>talent</span> but doesn't perform",
        "We're always putting out fires, never <span class='web-underline-orange'>preventing</span>",
        "I have <span class='web-underline-orange'>too many priorities</span> and don't advance",
        "I don't know if my team is <span class='web-underline-orange'>aligned</span> with objectives",
        "I hire well but <span class='web-underline-orange'>people leave</span> quickly",
        "We work a lot but <span class='web-underline-orange'>results aren't visible</span>",
        "There's no time to <span class='web-underline-orange'>think</span>, only to react",
        "Each area goes <span class='web-underline-orange'>its own way</span> and nobody coordinates"
      ],
    },
    
    about: {
      badge: 'About me',
      title1: 'From technology',
      title2: 'to transforming',
      title3: 'organizations.',
      intro: "<div style=\"line-height: 1.6; font-size: 0.9rem; max-width: 100%; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; hyphens: auto; margin: 0; padding: 0 1rem;\"><p style=\"margin-bottom: 1.2rem;\"><span style=\"font-family: var(--font-modern); font-weight: 600; background: linear-gradient(135deg, #ff6b35, #f7931e, #ffcc00); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 1.05rem;\">I'm Fernando Ferrari.</span></p><p style=\"margin-bottom: 1rem;\"><span style=\"font-family: var(--font-modern); font-weight: 500;\">I've been in technology for over 20 years — from infrastructure and operations to strategic leadership and cultural transformation.</span></p><p style=\"margin-bottom: 1rem;\"><span style=\"font-family: var(--font-modern); font-weight: 500;\">I've been technician, sysadmin, CTO, Advanced Scrum Master, Product Owner, PM, Operations Director.</span></p><p style=\"margin-bottom: 1rem;\"><span style=\"font-family: var(--font-modern); font-weight: 500;\">I've led teams in companies with more than <span style=\"color: #7C6BC4; font-weight: 700;\">2500 people</span> as well as 4-person companies, helping startups scale without losing their identity.</span></p><p style=\"margin-bottom: 1rem;\"><span style=\"font-family: var(--font-modern); font-weight: 500;\">Today I manage AWS Cloud infrastructure at Avature, co-founded <span style=\"color: #7C6BC4; font-weight: 700;\">Nodok.AI</span> for AI projects, and have +10 years as an independent agile consultant.</span></p><p style=\"margin-top: 1.2rem; padding-left: 0.8rem; border-left: 3px solid var(--gold-primary);\"><span style=\"font-family: var(--font-heading); font-style: italic; color: var(--text-primary);\">I help you build <span style=\"font-weight: 700;\">autonomous teams</span>, <span style=\"font-weight: 700;\">scalable processes</span>, and a <span style=\"font-weight: 700;\">culture that retains talent</span>.</span></p></div>",
      approach: '',
      certificaciones: 'Verifiable international certifications',
      stats: {
        tecnologia: 'Years in technology',
        coaching: 'Years of agile coaching',
        certificaciones: 'Active certifications',
        empresas: 'Companies co-founded',
      },
    },
    
    services: {
      badge: 'Services',
      title: 'Stop putting out fires',
      subtitle: 'Every organization is unique. I adapt my services to your specific needs, combining proven frameworks with personalized approach.',
      personalizedServices: 'Personalized Services',
      viewMore: 'View more',
      knowMore: 'Want to know more?',
      startHere: 'Start here',
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
          description: 'For startups and companies that need to professionalize operations, adopt real agility, and build a culture that scales with the business. I accompany you in this process.',
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
          description: 'A comprehensive approach that combines leadership coaching with organizational consulting for your complete and sustainable transformation. I guide you through the entire journey.',
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
      badge: 'You have to experience it!',
      title: 'These are my 4 steps towards',
      title2: 'positive transformation',
      title3: '',
      subtitle: 'A structured but flexible process, adapted to your reality and specific objectives.',
      linkedinButton: 'View certifications on LinkedIn',
      steps: {
        diagnostico: {
          title: 'Diagnosis',
          description: 'I analyze your current organization, team, or leadership. I identify friction points, opportunities, and the real starting point.',
        },
        diseno: {
          title: 'Design',
          description: 'I co-create a tailored roadmap: clear objectives, progress metrics, and an agile strategy adapted to your context.',
        },
        ejecucion: {
          title: 'Execution',
          description: 'Coaching sessions and day-to-day support. I iterate, remove impediments, and maintain focus.',
        },
        autonomia: {
          title: 'Autonomy',
          description: 'I consolidate practices, transfer tools, and build internal capacity to continue evolving without depending on me.',
        },
      },
    },
    
    testimonials: {
      badge: 'Testimonials',
      title: 'Results that speak for themselves',
      subtitle: 'The best measure of success is the real impact on the people and organizations I\'ve accompanied.',
    },
    
    pricing: {
      badge: 'Plans',
      title: 'Find your',
      title2: 'ideal plan',
      subtitle: 'Each plan is designed for different needs. I help you find the best fit for you.',
      consultPlan: 'Consult plan',
      mostPopular: 'Most Popular',
      plans: {
        liderazgo: {
          name: 'Leadership Coaching',
          price: 'USD 150',
          period: '/ session',
          description: 'Individual 60-minute sessions for leadership development.',
          features: [
            '1-hour 1:1 session',
            'Initial 360° assessment',
            'Personalized development plan',
            'Exclusive materials and resources',
            'Whatsapp support between sessions',
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
          description: 'Comprehensive solutions tailored to your organization. I design the perfect plan for you.',
          features: [
            'No-charge diagnosis',
            'Personalized proposal',
            'Service combination',
            'Schedule flexibility',
          ],
          cta: 'Request proposal',
        },
      },
      doubt: 'Not sure which plan best fits your needs?',
      contactText: 'Write to me and we\'ll discuss it with no commitment.'
    },
    
    // Newsletter
    newsletter: {
      title: 'Monthly Newsletter',
      subtitle: 'Leadership, agile resources and news directly in your inbox',
      benefits: [
        'Practical tips for modern leadership',
        'Agile resources to implement now',
        'Tech world news and trends'
      ],
      emailPlaceholder: 'Your professional email',
      subscribeButton: 'Subscribe Free',
      note: 'No spam. One monthly email with real value.'
    },
    
    contact: {
      badge: 'Contact',
      title: 'Let\'s start',
      title2: 'the conversation',
      subtitle: 'The first session is completely free. No commitment, just to get to know each other and see how I can help you.',
      limitedSpots: '2 spots available',
      limitedSpotsText: 'this month for personalized coaching',
      submitButton: 'BOOK YOUR FREE SESSION →',
      booking: {
        title: 'Book your free session',
        subtitle: 'Select the time that works best for you and confirm in 2 minutes.',
        calendly: 'Book with Calendly',
        instantBooking: 'Instant booking',
        instantBookingDesc: 'No waiting, instant confirmation',
        autoReminder: 'Auto reminder',
        autoReminderDesc: 'You won\'t forget the session',
        confirmationText: 'Your schedule will be saved automatically. You will receive a confirmation email.',
      },
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
        message: 'Thank you for contacting me. I will respond within 24 business hours. Take advantage to schedule your day and time.',
      },
      messageSent: 'Message sent!',
      willRespond: 'We\'ll respond within 24 hours.',
      sending: 'Sending...',
      retry: 'Retry',
    },
    
    faq: {
      badge: 'Frequently Asked Questions',
      title: 'Resolve your',
      title2: 'doubts',
      items: [
        {
          question: 'Who is this service for?',
          answer: 'For tech leaders, startup founders, CTOs, and managers who feel their team could perform better, decisions are stuck, or culture doesn\'t scale at the same pace as the business.',
        },
        {
          question: 'What is the difference between coaching and consulting?',
          answer: 'Coaching helps you find your own answers and develop leadership skills. Consulting provides frameworks, processes, and concrete strategies. My approach combines both based on what you need.',
        },
        {
          question: 'How long does a typical process last?',
          answer: 'Individual coaching usually lasts between 8-12 sessions (2-3 months). Organizational consulting varies depending on complexity, but first results are seen in the first 4-6 weeks.',
        },
        {
          question: 'Is there any cost for the diagnosis session?',
          answer: 'No. The first 30-minute session is completely free and without commitment. It serves to understand your situation, define objectives, and see if it makes sense to work together.',
        },
      ],
    },
    
    footer: {
      description: 'Transforming leaders and organizations through agile coaching and strategic transformation.',
      navLinks: {
        sobreMi: 'About me',
        servicios: 'Services',
        metodo: 'You have to experience it!',
        testimonios: 'Testimonials',
        precios: 'Pricing',
        preguntasFrecuentes: 'FAQ',
      },
      rights: 'All rights reserved.',
    },
    
    testCard: {
      title: 'Maturity Test',
      subtitle: 'Evaluate your organization\'s maturity level in 5 key areas and get a personalized action plan.',
      dimensions: '5 critical dimensions',
      instantResults: 'Instant results',
      personalizedRecommendations: 'Personalized recommendations',
      duration: 'Only 5 minutes',
      estimatedTime: 'Estimated time: 5 minutes',
      startTest: 'Start Test',
    },
    
    scrollProgress: {
      inicio: 'Home',
      sobreMi: 'About Me',
      servicios: 'Services',
      proceso: 'Method',
      testimonios: 'Testimonials',
      resultados: 'Results',
      precios: 'Pricing',
      faq: 'FAQ',
      contacto: 'Contact',
      navigation: 'Navigation',
      goToSection: 'Go to {section}',
    },
    
    caseStudies: {
      badge: 'CASE STUDIES',
      title: 'Real',
      titleHighlight: 'Transformations',
      subtitle: 'We don\'t just improve processes, we transform cultures and generate measurable results. These are concrete examples of teams that went from chaos to autonomy.',
      before: 'BEFORE',
      whileWorking: 'WHILE',
      results: 'RESULTS',
      seeFullTransformation: 'See full transformation',
      analyzeYourCase: 'Analyze your case',
      viewMoreCases: 'View more cases',
      yourSpecificCase: 'Let\'s talk about your specific case.',
      // Datos de casos
      nexolab: {
        company: 'NexoLab',
        role: 'CTO & Co-founder',
        teamSize: '15 devs',
        duration: '3 months',
        category: 'Agile Transformation',
        before: {
          title: 'Organizational Chaos',
          points: [
            'No defined work structure',
            'Inconsistent and late deliveries',
            'High talent turnover',
            'Fragmented communication between teams'
          ]
        },
        intervention: {
          title: 'While',
          points: [
            'Real Scrum implementation (not textbook)',
            'Clear and measurable Definition of Done',
            'Biweekly retrospectives with concrete action',
            'Daily meetings 45→15 minutes'
          ]
        },
        results: {
          title: 'Results',
          points: [
            'Delivery speed doubled',
            'Deploy automation: 4hrs→5 minutes',
            'Talent retention +35%',
            'Collaborative teams vs silos'
          ]
        }
      },
    },
    
    whatsapp: {
      message: 'Hi! I want to schedule a free coaching session. What dates and times do you have available?',
      buttonText: 'Schedule on WhatsApp',
      ariaLabel: 'Schedule session via WhatsApp',
    },
    
    // Loading and UI
    loading: {
      calendar: 'Loading calendar...',
    },
    
    // Gestures and UI
    ui: {
      swiping: 'Swiping...',
      zoom2x: 'Zoom 2x',
      close: 'Close',
    },
    
    // Video Section
    video: {
      badge: 'Video Presentation',
      defaultTitle: 'See My Approach',
      defaultDescription: 'In this video I explain how I help leaders and teams reach their maximum potential through agile coaching and organizational transformation.',
    },
    
    // Loading states
    loadingStates: {
      loading: 'Loading...',
      cargando: 'Loading...',
    },
    
    // Testimonials navigation
    testimonialsNav: {
      previous: 'Previous',
      next: 'Next',
      ariaPrevious: 'Previous testimonial',
      ariaNext: 'Next testimonial',
    },

    forWho: {
      badge: 'Is this for you?',
      title: 'Do any of these sound familiar?',
      titleHighlight: '',
      subtitle: 'I work with tech leaders and founders at key moments. If any of these situations resonate with you, we can work together.',
      cta: 'I want to work on this',
      profiles: [
        {
          icon: '🚀',
          title: 'New to a leadership role',
          description: 'You went from writing code to leading people and nobody taught you how. Technically you\'re strong, but the human and organizational side still weighs on you.',
          pain: 'The IC-to-leader jump with no support',
        },
        {
          icon: '⚡',
          title: 'Your company grows but processes don\'t keep up',
          description: 'What worked with 5 people no longer cuts it with 20. The team loses coordination, priorities clash, and the speed you had before is gone.',
          pain: 'Scaling without losing speed or culture',
        },
        {
          icon: '🎯',
          title: 'You have the team but not the results',
          description: 'There\'s talent, but no delivery. Silos appear, ownership is missing, decisions don\'t get made. You know the problem isn\'t technical — and that makes it harder to solve.',
          pain: 'Talent that doesn\'t convert into results',
        },
      ],
    },
  },
};
