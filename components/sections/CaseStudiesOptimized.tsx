'use client'

import { useRef, useState, useEffect } from 'react'
import { ArrowRight, TrendingUp, Users, Clock, CheckCircle2 } from 'lucide-react'
import { scrollToElement } from '@/lib/scroll'
import { useLanguage } from '@/contexts/LanguageContext'

const casesData = [
  {
    id: 1,
    company: 'TechStart S.A.',
    industry: 'Fintech',
    challenge: 'Escalamiento caótico con duplicación de funciones',
    solution: 'Implementación de squads ágiles y ceremonias efectivas',
    results: ['40% menos de reuniones', 'Lanzamiento 2x más rápido', '95% retención del equipo'],
    duration: '6 meses',
    teamSize: '25 personas',
    image: '/img/case-study-1.jpg'
  },
  {
    id: 2,
    company: 'DevLabs Inc.',
    industry: 'SaaS B2B',
    challenge: 'Problemas de comunicación entre frontend y backend',
    solution: 'Reorganización en feature teams y flujo CI/CD',
    results: ['60% reducción de bugs', 'Deploy diario', 'Satisfacción cliente 4.8/5'],
    duration: '4 meses',
    teamSize: '18 personas',
    image: '/img/case-study-2.jpg'
  },
  {
    id: 3,
    company: 'CloudTech Solutions',
    industry: 'Cloud Services',
    challenge: 'Líder técnico sobrecargado, equipo desmotivado',
    solution: 'Coaching de liderazgo y delegación efectiva',
    results: ['Liberación 30% tiempo líder', 'Autonomía equipo 80%', 'Promociones internas x3'],
    duration: '3 meses',
    teamSize: '12 personas',
    image: '/img/case-study-3.jpg'
  }
]

export default function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { language } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleContact = () => {
    scrollToElement('#contacto')
  }

  const content = {
    es: {
      title: 'Casos de Éxito',
      subtitle: 'Transformaciones reales, resultados medibles',
      challenge: 'Desafío',
      solution: 'Solución',
      results: 'Resultados',
      duration: 'Duración',
      team: 'Equipo',
      contactCTA: 'Transformá tu equipo →',
      viewDetails: 'Ver detalles'
    },
    en: {
      title: 'Success Stories',
      subtitle: 'Real transformations, measurable results',
      challenge: 'Challenge',
      solution: 'Solution',
      results: 'Results',
      duration: 'Duration',
      team: 'Team',
      contactCTA: 'Transform your team →',
      viewDetails: 'View details'
    }
  }

  const t = content[language as keyof typeof content]

  return (
    <section
      id="casos-de-estudio"
      ref={sectionRef}
      className="section py-20 lg:py-32"
      aria-label={t.title}
    >
      <div className="container">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            {t.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-orange-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {casesData.map((caseItem, index) => (
            <div
              key={caseItem.id}
              className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-violet-500/50 transition-all duration-500 cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => setSelectedCase(selectedCase === caseItem.id ? null : caseItem.id)}
            >
              {/* Company Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-1">{caseItem.company}</h3>
                <p className="text-violet-400 text-sm">{caseItem.industry}</p>
              </div>

              {/* Challenge */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">{t.challenge}:</h4>
                <p className="text-gray-300 text-sm">{caseItem.challenge}</p>
              </div>

              {/* Solution */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">{t.solution}:</h4>
                <p className="text-gray-300 text-sm">{caseItem.solution}</p>
              </div>

              {/* Key Metrics */}
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{caseItem.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{caseItem.teamSize}</span>
                </div>
              </div>

              {/* Results - Expandable */}
              <div className={`overflow-hidden transition-all duration-500 ${
                selectedCase === caseItem.id ? 'max-h-48' : 'max-h-0'
              }`}>
                <div className="pt-4 border-t border-gray-700">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">{t.results}:</h4>
                  <ul className="space-y-2">
                    {caseItem.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-center gap-2 text-sm text-green-400">
                        <CheckCircle2 size={14} />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* View Details Button */}
              <button className="text-violet-400 text-sm font-medium hover:text-violet-300 transition-colors flex items-center gap-1">
                {selectedCase === caseItem.id ? 'Ver menos' : t.viewDetails}
                <ArrowRight size={14} className={`transition-transform ${
                  selectedCase === caseItem.id ? 'rotate-90' : ''
                }`} />
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="text-2xl font-bold text-white mb-4">
            {language === 'es' ? '¿Listo para escribir tu propia historia de éxito?' : 'Ready to write your own success story?'}
          </h3>
          <button
            onClick={handleContact}
            className="btn-primary-gradient inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform"
          >
            {t.contactCTA}
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
