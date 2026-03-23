export type Language = 'es' | 'en'

export interface Translations {
  // Navigation
  nav: {
    sobreMi: string
    servicios: string
    metodo: string
    testimonios: string
    precios: string
    sesionGratuita: string
    preguntasFrecuentes: string
  }

  // Hero
  hero: {
    title1: string
    title2: string
    title3: string
    subtitle: string
    cta: string
  }

  // About
  about: {
    badge: string
    title1: string
    title2: string
    title3: string
    intro: string
    approach: string
    certificaciones: string
    stats: {
      tecnologia: string
      coaching: string
      certificaciones: string
      empresas: string
    }
  }

  // Services
  services: {
    badge: string
    title: string
    subtitle: string
    items: {
      liderazgo: {
        title: string
        description: string
        benefits: string[]
      }
      organizacional: {
        title: string
        description: string
        benefits: string[]
      }
      ambos: {
        title: string
        description: string
        benefits: string[]
      }
    }
  }

  // Process
  process: {
    badge: string
    title: string
    title2: string
    title3: string
    subtitle: string
    linkedinButton: string
    steps: {
      diagnostico: {
        title: string
        description: string
      }
      diseno: {
        title: string
        description: string
      }
      ejecucion: {
        title: string
        description: string
      }
      autonomia: {
        title: string
        description: string
      }
    }
  }

  // Testimonials
  testimonials: {
    badge: string
    title: string
    title2: string
    subtitle: string
  }

  // Pricing
  pricing: {
    badge: string
    title: string
    title2: string
    subtitle: string
    plans: {
      liderazgo: {
        name: string
        price: string
        period: string
        description: string
        features: string[]
        cta: string
      }
      organizacional: {
        name: string
        price: string
        period: string
        description: string
        features: string[]
        cta: string
      }
      personalizado: {
        name: string
        price: string
        period: string
        description: string
        features: string[]
        cta: string
      }
    }
  }

  // Contact
  contact: {
    badge: string
    title: string
    title2: string
    subtitle: string
    booking: {
      title: string
      subtitle: string
      instantBooking: string
      instantBookingDesc: string
      autoReminder: string
      autoReminderDesc: string
      confirmationText: string
    }
    form: {
      nombre: {
        label: string
        placeholder: string
      }
      email: {
        label: string
        placeholder: string
      }
      empresa: {
        label: string
        placeholder: string
      }
      servicio: {
        label: string
        placeholder: string
        options: {
          liderazgo: string
          organizacional: string
          ambos: string
          otros: string
        }
      }
      mensaje: {
        label: string
        placeholder: string
      }
      submit: string
    }
    success: {
      title: string
      message: string
    }
  }

  // Case Studies
  caseStudies: {
    badge: string
    title: string
    title2: string
    subtitle: string
  }

  // FAQ
  faq: {
    badge: string
    title: string
    title2: string
    items: {
      question: string
      answer: string
    }[]
  }

  // Footer
  footer: {
    description: string
    navLinks: {
      sobreMi: string
      servicios: string
      metodo: string
      testimonios: string
      precios: string
      preguntasFrecuentes: string
    }
    rights: string
  }
}

export const translations: Record<Language, Translations> = {
  es: {
    nav: {
      sobreMi: 'Sobre mí',
      servicios: 'Servicios',
      metodo: '¡Tenes que vivirlo!',
      testimonios: 'Testimonios',
      precios: 'Precios',
      sesionGratuita: 'Sesión gratuita',
      preguntasFrecuentes: 'Preguntas Frecuentes',
    },

    hero: {
      title1: 'Liderazgo ágil',
      title2: 'para',
      title3: 'organizaciones que escalan',
      subtitle:
        'Transformo equipos y culturas empresariales a través de coaching personalizado, metodologías ágiles y un enfoque human-centric.',
      cta: 'Agendá tu sesión gratuita',
    },

    about: {
      badge: 'Sobre mí',
      title1: 'De la tecnología',
      title2: 'a transformar',
      title3: 'organizaciones.',
      intro:
        'Soy Fernando. Más de 20 años en tecnología y 11+ como consultor ágil independiente. Empecé arreglando computadoras, pasé por administración de servidores, y hoy lidero operaciones y acompaño transformaciones culturales en startups y empresas tech. Mi enfoque combina metodologías ágiles, liderazgo estratégico y una mirada donde las personas van primero. No te digo qué hacer — te acompaño a construir equipos autónomos, procesos escalables y una cultura que impulse resultados.',
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
      subtitle:
        'Cada organización es única. Mis servicios se adaptan a tus necesidades específicas, combinando frameworks probados con enfoque personalizado.',
      items: {
        liderazgo: {
          title: 'Coaching de Liderazgo',
          description:
            'Para líderes y managers que quieren potenciar su impacto, desarrollar equipos de alto rendimiento y navegar la complejidad del entorno actual.',
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
          description:
            'Para startups y empresas que necesitan profesionalizar operaciones, adoptar agilidad real y construir una cultura que escale junto con el negocio.',
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
          description:
            'Un enfoque integral que combina coaching de liderazgo con consultoría organizacional para transformación completa y sostenible.',
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
      subtitle:
        'Un proceso estructurado pero flexible, adaptado a tu realidad y objetivos específicos.',
      linkedinButton: 'Ver certificaciones en LinkedIn',
      steps: {
        diagnostico: {
          title: 'Diagnóstico',
          description:
            'Analizamos tu organización, equipo o liderazgo actual. Identificamos fricciones, oportunidades y el punto de partida real.',
        },
        diseno: {
          title: 'Diseño',
          description:
            'Co-creamos una hoja de ruta a medida: objetivos claros, métricas de avance y estrategia ágil adaptada a tu contexto.',
        },
        ejecucion: {
          title: 'Ejecución',
          description:
            'Sesiones de coaching y acompañamiento en el día a día. Iteramos, removemos impedimentos y mantenemos el foco.',
        },
        autonomia: {
          title: 'Autonomía',
          description:
            'Consolidamos prácticas, transferimos herramientas y construís la capacidad interna para seguir evolucionando sin depender de mí.',
        },
      },
    },

    testimonials: {
      badge: 'Testimonios',
      title: 'Resultados que',
      title2: 'hablan solos',
      subtitle:
        'La mejor medida del éxito es el impacto real en las personas y organizaciones que acompañé.',
    },

    pricing: {
      badge: 'Planes',
      title: 'Encuentra tu',
      title2: 'plan ideal',
      subtitle:
        'Cada plan está diseñado para diferentes necesidades. Consultemos cuál se adapta mejor a vos.',
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
          cta: 'Comenzá ahora',
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
          cta: 'Consultá ahora',
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
          ],
          cta: 'Solicitá propuesta',
        },
      },
    },

    contact: {
      badge: 'Contacto',
      title: 'Comencemos',
      title2: 'la conversación',
      subtitle:
        'La primera sesión es completamente gratuita. Sin compromiso, solo para conocernos y ver cómo puedo ayudarte.',
      booking: {
        title: 'Agendá tu sesión gratuita',
        subtitle: 'Selecciona el horario que mejor te convenga y confirma en 2 minutos.',
        instantBooking: 'Agendá instantánea',
        instantBookingDesc: 'Sin esperas, confirmación inmediata',
        autoReminder: 'Recordatorio automático',
        autoReminderDesc: 'No te olvidarás de la sesión',
        confirmationText:
          'Tu horario se guardará automáticamente. Recibirás un email de confirmación.',
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
        message:
          'Gracias por contactarme. Te responderé dentro de las 24 horas hábiles. Aprovecha para agendar el día y la hora.',
      },
    },

    faq: {
      badge: 'Preguntas Frecuentes',
      title: 'Resolvé tus',
      title2: 'dudas',
      items: [
        {
          question: '¿Para quién es este servicio?',
          answer:
            'Para líderes tech, founders de startups, CTOs y managers que sienten que su equipo podría rendir más, que las decisiones se estancan o que la cultura no escala al mismo ritmo que el negocio.',
        },
        {
          question: '¿Qué diferencia hay entre coaching y consultoría?',
          answer:
            'El coaching te acompaña a encontrar tus propias respuestas y desarrollar habilidades de liderazgo. La consultoría aporta frameworks, procesos y estrategias concretas. Mi enfoque combina ambos según lo que necesites.',
        },
        {
          question: '¿Cuánto tiempo dura un proceso típico?',
          answer:
            'Un proceso de coaching individual suele durar entre 8 y 12 sesiones (2-3 meses). La consultoría organizacional varía según la complejidad, pero los primeros resultados se ven en las primeras 4-6 semanas.',
        },
        {
          question: '¿La sesión de diagnóstico tiene algún costo?',
          answer:
            'No. La primera sesión de 30 minutos es completamente gratuita y sin compromiso. Sirve para entender tu situación, definir objetivos y ver si tiene sentido trabajar juntos.',
        },
      ],
    },

    caseStudies: {
      badge: 'CASOS DE ESTUDIO',
      title: 'Transformaciones',
      title2: 'Reales',
      subtitle:
        'No solo mejoramos procesos, transformamos culturas y generamos resultados medibles. Estos son ejemplos concretos de equipos que pasaron del caos a la autonomía.',
    },

    footer: {
      description:
        'Transformando líderes y organizaciones a través del coaching ágil y la consultoría estratégica.',
      navLinks: {
        sobreMi: 'Sobre mí',
        servicios: 'Servicios',
        metodo: '¡Tenes que vivirlo!',
        testimonios: 'Testimonios',
        precios: 'Precios',
        preguntasFrecuentes: 'Preguntas Frecuentes',
      },
      rights: 'Todos los derechos reservados.',
    },
  },

  en: {
    nav: {
      sobreMi: 'About me',
      servicios: 'Services',
      metodo: 'You have to experience it!',
      testimonios: 'Testimonials',
      precios: 'Pricing',
      sesionGratuita: 'Free session',
      preguntasFrecuentes: 'FAQ',
    },

    hero: {
      title1: 'Agile leadership',
      title2: 'for',
      title3: 'scaling organizations',
      subtitle:
        'I transform teams and business cultures through personalized coaching, agile methodologies, and a human-centric approach.',
      cta: 'Book your free session',
    },

    about: {
      badge: 'About me',
      title1: 'From technology',
      title2: 'to transforming',
      title3: 'organizations.',
      intro:
        "I'm Fernando. Over 20 years in technology and 11+ as an independent agile consultant. I started fixing computers, went through server administration, and today I lead operations and accompany cultural transformations in startups and tech companies. My approach combines agile methodologies, strategic leadership, and a perspective where people come first. I don't tell you what to do — I accompany you to build autonomous teams, scalable processes, and a culture that drives results.",
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
      subtitle:
        'Every organization is unique. My services adapt to your specific needs, combining proven frameworks with personalized approach.',
      items: {
        liderazgo: {
          title: 'Leadership Coaching',
          description:
            "For leaders and managers who want to enhance their impact, develop high-performance teams, and navigate today's complex environment.",
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
          description:
            'For startups and companies that need to professionalize operations, adopt real agility, and build a culture that scales with the business.',
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
          description:
            'A comprehensive approach that combines leadership coaching with organizational consulting for complete and sustainable transformation.',
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
      subtitle:
        'A structured but flexible process, adapted to your reality and specific objectives.',
      linkedinButton: 'View certifications on LinkedIn',
      steps: {
        diagnostico: {
          title: 'Diagnosis',
          description:
            'We analyze your current organization, team, or leadership. We identify friction points, opportunities, and the real starting point.',
        },
        diseno: {
          title: 'Design',
          description:
            'We co-create a tailored roadmap: clear objectives, progress metrics, and an agile strategy adapted to your context.',
        },
        ejecucion: {
          title: 'Execution',
          description:
            'Coaching sessions and day-to-day support. We iterate, remove impediments, and maintain focus.',
        },
        autonomia: {
          title: 'Autonomy',
          description:
            'We consolidate practices, transfer tools, and build internal capacity to continue evolving without depending on me.',
        },
      },
    },

    testimonials: {
      badge: 'Testimonials',
      title: 'Results that',
      title2: 'speak for themselves',
      subtitle:
        "The best measure of success is the real impact on the people and organizations I've accompanied.",
    },

    pricing: {
      badge: 'Plans',
      title: 'Find your',
      title2: 'ideal plan',
      subtitle:
        'Each plan is designed for different needs. Let us help you find the best fit for you.',
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
          ],
          cta: 'Request proposal',
        },
      },
    },

    contact: {
      badge: 'Contact',
      title: "Let's start",
      title2: 'the conversation',
      subtitle:
        'The first session is completely free. No commitment, just to get to know each other and see how I can help you.',
      booking: {
        title: 'Book your free session',
        subtitle: 'Select the time that works best for you and confirm in 2 minutes.',
        instantBooking: 'Instant booking',
        instantBookingDesc: 'No waiting, instant confirmation',
        autoReminder: 'Auto reminder',
        autoReminderDesc: "You won't forget the session",
        confirmationText:
          'Your schedule will be saved automatically. You will receive a confirmation email.',
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
        message:
          'Thank you for contacting me. I will respond within 24 business hours. Take advantage to schedule your day and time.',
      },
    },

    faq: {
      badge: 'Frequently Asked Questions',
      title: 'Resolve your',
      title2: 'doubts',
      items: [
        {
          question: 'Who is this service for?',
          answer:
            "For tech leaders, startup founders, CTOs, and managers who feel their team could perform better, decisions are stuck, or culture doesn't scale at the same pace as the business.",
        },
        {
          question: 'What is the difference between coaching and consulting?',
          answer:
            'Coaching helps you find your own answers and develop leadership skills. Consulting provides frameworks, processes, and concrete strategies. My approach combines both based on what you need.',
        },
        {
          question: 'How long does a typical process last?',
          answer:
            'Individual coaching usually lasts between 8-12 sessions (2-3 months). Organizational consulting varies depending on complexity, but first results are seen in the first 4-6 weeks.',
        },
        {
          question: 'Is there any cost for the diagnosis session?',
          answer:
            'No. The first 30-minute session is completely free and without commitment. It serves to understand your situation, define objectives, and see if it makes sense to work together.',
        },
      ],
    },

    caseStudies: {
      badge: 'CASE STUDIES',
      title: 'Real',
      title2: 'Transformations',
      subtitle:
        "We don't just improve processes, we transform cultures and generate measurable results. These are concrete examples of teams that went from chaos to autonomy.",
    },

    footer: {
      description:
        'Transforming leaders and organizations through agile coaching and strategic consulting.',
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
  },
}
