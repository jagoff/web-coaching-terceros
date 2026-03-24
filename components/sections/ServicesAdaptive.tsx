'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { Flame, Gem, CheckCircle2, ArrowRight, TrendingUp, Users, Target, Zap } from 'lucide-react'
import { scrollToElement } from '@/lib/scroll'
import { headerStagger, blurUp, dividerGrow } from '@/lib/animations'
import { useLanguage } from '@/contexts/LanguageContext'
import { useUserProfileAI } from '@/hooks/useUserProfileAI'

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 8, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      delay: 0.3 + i * 0.2,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const benefitStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.4 } },
}

const benefitItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

// Service configurations for different personas
const serviceConfigs = {
  founder: {
    priority: ['scaling', 'leadership', 'agile'],
    scaling: {
      title: "Escala sin Caos",
      subtitle: "De 5 a 50 empleados sin perder el alma del equipo",
      benefits: [
        "Sistemas que escalan contigo",
        "Procesos adaptativos vs rígidos", 
        "Métricas de crecimiento real",
        "Onboarding automático",
      ],
      icon: TrendingUp,
      cta: "Ver roadmap de escala",
      color: "from-green-600 to-emerald-600"
    },
    leadership: {
      title: "Liderazgo en Crecimiento",
      subtitle: "De founder a CEO: la transición que no te enseñaron",
      benefits: [
        "Delegación efectiva sin perder control",
        "Toma de decisiones bajo presión",
        "Comunicación que inspira acción",
        "Balance visión-ejecución",
      ],
      icon: Target,
      cta: "Transformar mi liderazgo",
      color: "from-purple-600 to-pink-600"
    },
    agile: {
      title: "Agile para Startups",
      subtitle: "Rápido sin romper todo: metodologías que crecen contigo",
      benefits: [
        "Sprints adaptativos a tu realidad",
        "MVPs que no se rompen en producción",
        "Feedback loops automatizados",
        "Escalabilidad técnica y humana",
      ],
      icon: Zap,
      cta: "Implementar agile real",
      color: "from-blue-600 to-cyan-600"
    }
  },
  ceo: {
    priority: ['leadership', 'scaling', 'agile'],
    leadership: {
      title: "Liderazgo de Alto Impacto",
      subtitle: "Resultados medibles desde el primer mes",
      benefits: [
        "Estrategia de liderazgo personalizada",
        "KPIs de equipo y crecimiento",
        "Cultura de alta performance",
        "Sucesión y desarrollo de talentos",
      ],
      icon: Target,
      cta: "Sesión estratégica gratuita",
      color: "from-purple-600 to-pink-600"
    },
    scaling: {
      title: "Escalación Organizacional",
      subtitle: "Estructuras que soportan crecimiento exponencial",
      benefits: [
        "Rediseño organizacional ágil",
        "Gobernanza para escala",
        "Expansión geográfica controlada",
        "M&A integration preparación",
      ],
      icon: TrendingUp,
      cta: "Plan de escalación",
      color: "from-green-600 to-emerald-600"
    },
    agile: {
      title: "Transformación Ágil Empresarial",
      subtitle: "Agile a nivel corporativo, no solo técnico",
      benefits: [
        "Agile portfolio management",
        "OKRs y rolling planning",
        "Budgets ágiles y dinámicos",
        "Cultura de experimentación",
      ],
      icon: Zap,
      cta: "Transformación corporativa",
      color: "from-blue-600 to-cyan-600"
    }
  },
  tech_lead: {
    priority: ['agile', 'leadership', 'scaling'],
    agile: {
      title: "Agile que Funciona de Verdad",
      subtitle: "Deja las ceremonias inútiles, enfócate en entregar valor",
      benefits: [
        "Sprints de 1 semana con entregas reales",
        "Code review automatizado",
        "CI/CD que no se rompe",
        "Technical debt management",
      ],
      icon: Zap,
      cta: "Optimizar mi proceso",
      color: "from-blue-600 to-cyan-600"
    },
    leadership: {
      title: "Liderazgo Técnico Efectivo",
      subtitle: "De senior a tech lead: el salto que nadie te enseña",
      benefits: [
        "Arquitectura que escala",
        "Mentoría sin micro-management",
        "Comunicación técnica con negocio",
        "Trade-offs decision framework",
      ],
      icon: Target,
      cta: "Convertirme en tech lead",
      color: "from-purple-600 to-pink-600"
    },
    scaling: {
      title: "Escalabilidad Técnica",
      subtitle: "Sistemas que soportan 10x el tráfico actual",
      benefits: [
        "Microservices architecture",
        "Auto-scaling strategies",
        "Performance optimization",
        "Disaster recovery planning",
      ],
      icon: TrendingUp,
      cta: "Arquitectura escalable",
      color: "from-green-600 to-emerald-600"
    }
  },
  manager: {
    priority: ['leadership', 'agile', 'scaling'],
    leadership: {
      title: "Liderazgo de Equipos",
      subtitle: "Multiplica resultados sin burnout",
      benefits: [
        "1:1s que transforman",
        "Feedback constructivo sistemático",
        "Gestión de conflictos proactiva",
        "Motivación intrínseca",
      ],
      icon: Target,
      cta: "Potenciar mi equipo",
      color: "from-purple-600 to-pink-600"
    },
    agile: {
      title: "Agile para Managers",
      subtitle: "Gestiona proyectos ágiles sin ser técnico",
      benefits: [
        "Stakeholder management ágil",
        "Resource allocation dinámica",
        "Risk management adaptativo",
        "Team velocity optimization",
      ],
      icon: Zap,
      cta: "Gestión ágil efectiva",
      color: "from-blue-600 to-cyan-600"
    },
    scaling: {
      title: "Crecimiento de Equipos",
      subtitle: "De 3 a 30 personas manteniendo la cultura",
      benefits: [
        "Hiring process optimization",
        "Onboarding sistemático",
        "Knowledge management",
        "Team structure evolution",
      ],
      icon: TrendingUp,
      cta: "Escalar mi equipo",
      color: "from-green-600 to-emerald-600"
    }
  },
  individual: {
    priority: ['leadership', 'agile', 'scaling'],
    leadership: {
      title: "Coaching de Liderazgo",
      subtitle: "Potencia tu impacto como líder",
      benefits: [
        "Autoconocimiento y propósito",
        "Comunicación influyente",
        "Resiliencia y adaptabilidad",
        "Visión estratégica personal",
      ],
      icon: Target,
      cta: "Sesión de diagnóstico",
      color: "from-purple-600 to-pink-600"
    },
    agile: {
      title: "Metodologías Ágiles",
      subtitle: "Trabaja más inteligente, no más duro",
      benefits: [
        "Productividad personal",
        "Gestión del tiempo efectiva",
        "Colaboración remota",
        "Continuous improvement",
      ],
      icon: Zap,
      cta: "Aprender agile",
      color: "from-blue-600 to-cyan-600"
    },
    scaling: {
      title: "Desarrollo Profesional",
      subtitle: "Plan de carrera acelerado",
      benefits: [
        "Skill gap analysis",
        "Networking estratégico",
        "Personal branding",
        "Negotiation skills",
      ],
      icon: TrendingUp,
      cta: "Plan de carrera",
      color: "from-green-600 to-emerald-600"
    }
  }
}

export default function ServicesAdaptive() {
  const { t } = useLanguage()
  const { profile, trackInteraction, trackSectionView } = useUserProfileAI()
  const [services, setServices] = useState<any[]>([])
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      trackSectionView('services')
    }
  }, [isInView, trackSectionView])

  useEffect(() => {
    if (profile && profile.confidence > 0.7) {
      const config = serviceConfigs[profile.persona as keyof typeof serviceConfigs]
      const orderedServices = config.priority.map((serviceKey: string) => ({
        key: serviceKey,
        ...config[serviceKey as keyof typeof config]
      }))
      setServices(orderedServices)
    } else {
      // Default services
      const defaultConfig = serviceConfigs.individual
      const orderedServices = defaultConfig.priority.map((serviceKey: string) => ({
        key: serviceKey,
        ...defaultConfig[serviceKey as keyof typeof defaultConfig]
      }))
      setServices(orderedServices)
    }
  }, [profile])

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerStagger}
          className="text-center mb-16"
        >
          <motion.h2
            variants={blurUp}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            {profile?.persona === 'founder' 
              ? "Servicios para tu etapa de crecimiento"
              : profile?.persona === 'ceo'
              ? "Soluciones estratégicas para líderes"
              : profile?.persona === 'tech_lead'
              ? "Herramientas para liderazgo técnico"
              : "Transformación integral para líderes"
            }
          </motion.h2>
          
          <motion.p
            variants={blurUp}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {profile?.persona === 'founder'
              ? "Hemos acompañado a 50+ startups en su transición de 5 a 50 empleados. Conocemos exactamente los desafíos que enfrentas."
              : profile?.persona === 'ceo'
              ? "Estrategia probada en empresas Fortune 500 y startups unicornio. Resultados medibles desde el primer mes."
              : profile?.persona === 'tech_lead'
              ? "Dejemos las ceremonias inútiles. Implementa agile que realmente entrega valor y escala con tu equipo."
              : "Más de 20 años transformando líderes y equipos en América Latina. Metodologías ágiles comprobadas."
            }
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={service.key}
                custom={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={cardReveal}
                className="relative group"
              >
                <div
                  className={`relative p-8 rounded-2xl bg-gradient-to-br ${service.color} bg-opacity-10 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20`}
                >
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} mb-6`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.subtitle}
                  </p>

                  {/* Benefits */}
                  <motion.div
                    variants={benefitStagger}
                    initial="hidden"
                    animate="visible"
                    className="space-y-3 mb-6"
                  >
                    {service.benefits.map((benefit: string, i: number) => (
                      <motion.div
                        key={i}
                        variants={benefitItem}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{benefit}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* CTA */}
                  <motion.button
                    onClick={() => {
                      trackInteraction('servicesClicked')
                      scrollToElement('contact')
                    }}
                    className="group flex items-center gap-2 text-white font-semibold hover:text-purple-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {service.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
