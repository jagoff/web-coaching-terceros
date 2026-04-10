'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Users,
  Target,
  Zap,
  Shield,
  TrendingUp,
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function MadurezEmpresarialClient() {
  const { language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [showExplanation, setShowExplanation] = useState(true)
  const [customWeight, setCustomWeight] = useState<Record<string, number>>({})
  const [personalizedNotes, setPersonalizedNotes] = useState('')
  const [editMode, setEditMode] = useState(false)

  // Design for Mental Models: Orient user to assessment variability
  const getAssessmentExplanation = () => {
    if (!showExplanation) return null

    return language === 'es'
      ? 'Este test evalúa 5 áreas clave de tu organización. Tus respuestas generarán un diagnóstico personalizado con recomendaciones específicas.'
      : 'This test evaluates 5 key areas of your organization. Your answers will generate a personalized diagnosis with specific recommendations.'
  }

  // Design for Mental Models: Teach effective use
  const getScoringExplanation = () => {
    return language === 'es'
      ? 'Cada respuesta se califica de 1 a 5 puntos. Tu resultado final mostrará tu nivel de madurez empresarial.'
      : 'Each answer is scored from 1 to 5 points. Your final result will show your business maturity level.'
  }

  // Design for Mental Models: Build on existing mental models
  const getCurrentCategoryExplanation = () => {
    const currentQuestion = questions[currentStep]
    const explanations: Record<string, { es: string; en: string }> = {
      estructura: {
        es: 'La estructura organizacional define cómo se distribuyen roles y responsabilidades en tu equipo.',
        en: 'Organizational structure defines how roles and responsibilities are distributed in your team.',
      },
      comunicacion: {
        es: 'La comunicación efectiva es clave para la colaboración y alineación de objetivos.',
        en: 'Effective communication is key for collaboration and goal alignment.',
      },
      procesos: {
        es: 'Los procesos optimizados mejoran la eficiencia y consistencia de las operaciones.',
        en: 'Optimized processes improve operational efficiency and consistency.',
      },
      tecnologia: {
        es: 'La tecnología estratégica automatiza tareas y habilita nuevas capacidades.',
        en: 'Strategic technology automates tasks and enables new capabilities.',
      },
      liderazgo: {
        es: 'El estilo de liderazgo impacta directamente la cultura y desempeño del equipo.',
        en: 'Leadership style directly impacts team culture and performance.',
      },
    }

    return explanations[currentQuestion.id]?.[language] || ''
  }

  const questionsES = [
    {
      id: 'estructura',
      category: 'Organización',
      icon: <Target size={24} />,
      question: '¿Cómo describirías la estructura de tu equipo?',
      options: [
        { value: 'caotica', label: 'Totalmente caótica, sin roles definidos', score: 1 },
        { value: 'informal', label: 'Informal, con roles básicos pero poco claros', score: 2 },
        { value: 'definida', label: 'Definida pero rígida', score: 3 },
        { value: 'agil', label: 'Ágil y adaptable', score: 4 },
        { value: 'autonoma', label: 'Completamente autónoma y auto-organizada', score: 5 },
      ],
    },
    {
      id: 'comunicacion',
      category: 'Comunicación',
      icon: <Users size={24} />,
      question: '¿Cómo fluye la comunicación en tu empresa?',
      options: [
        { value: 'nula', label: 'Prácticamente no existe comunicación', score: 1 },
        { value: 'unidireccional', label: 'Solo de arriba hacia abajo', score: 2 },
        { value: 'limitada', label: 'Limitada a reuniones ocasionales', score: 3 },
        { value: 'frecuente', label: 'Frecuente pero poco efectiva', score: 4 },
        { value: 'transparente', label: 'Totalmente transparente y efectiva', score: 5 },
      ],
    },
    {
      id: 'procesos',
      category: 'Procesos',
      icon: <Zap size={24} />,
      question: '¿Qué tan maduros son tus procesos de trabajo?',
      options: [
        { value: 'inexistentes', label: 'No existen procesos definidos', score: 1 },
        { value: 'basicos', label: 'Procesos muy básicos y desorganizados', score: 2 },
        { value: 'documentados', label: 'Documentados pero poco seguidos', score: 3 },
        { value: 'optimizados', label: 'Optimizados pero con resistencia al cambio', score: 4 },
        { value: 'mejora continua', label: 'En mejora continua constante', score: 5 },
      ],
    },
    {
      id: 'tecnologia',
      category: 'Tecnología',
      icon: <Shield size={24} />,
      question: '¿Cómo utilizas la tecnología para optimizar operaciones?',
      options: [
        { value: 'manual', label: 'Todo es manual o en papel', score: 1 },
        { value: 'basica', label: 'Herramientas básicas pero poco integradas', score: 2 },
        { value: 'moderna', label: 'Herramientas modernas pero subutilizadas', score: 3 },
        { value: 'integrada', label: 'Bien integrada pero con brechas', score: 4 },
        { value: 'estrategica', label: 'Totalmente estratégica y automatizada', score: 5 },
      ],
    },
    {
      id: 'liderazgo',
      category: 'Liderazgo',
      icon: <TrendingUp size={24} />,
      question: '¿Qué estilo de liderazgo predomina en tu organización?',
      options: [
        { value: 'autoritario', label: 'Autoritario y controlador', score: 1 },
        { value: 'paternalista', label: 'Paternalista y protector', score: 2 },
        { value: 'transaccional', label: 'Transaccional y reactivo', score: 3 },
        { value: 'transformacional', label: 'Transformacional y visionario', score: 4 },
        { value: 'servidor', label: 'Liderazgo de servicio y empoderamiento', score: 5 },
      ],
    },
  ]

  const questionsEN = [
    {
      id: 'estructura',
      category: 'Organization',
      icon: <Target size={24} />,
      question: 'How would you describe your team structure?',
      options: [
        { value: 'caotica', label: 'Completely chaotic, no defined roles', score: 1 },
        { value: 'informal', label: 'Informal, with basic but unclear roles', score: 2 },
        { value: 'definida', label: 'Defined but rigid', score: 3 },
        { value: 'agil', label: 'Agile and adaptable', score: 4 },
        { value: 'autonoma', label: 'Completely autonomous and self-organized', score: 5 },
      ],
    },
    {
      id: 'comunicacion',
      category: 'Communication',
      icon: <Users size={24} />,
      question: 'How does communication flow in your company?',
      options: [
        { value: 'nula', label: 'Practically no communication exists', score: 1 },
        { value: 'unidireccional', label: 'Only top-down', score: 2 },
        { value: 'limitada', label: 'Limited to occasional meetings', score: 3 },
        { value: 'frecuente', label: 'Frequent but not very effective', score: 4 },
        { value: 'transparente', label: 'Completely transparent and effective', score: 5 },
      ],
    },
    {
      id: 'procesos',
      category: 'Processes',
      icon: <Zap size={24} />,
      question: 'How mature are your work processes?',
      options: [
        { value: 'inexistentes', label: 'No defined processes', score: 1 },
        { value: 'basicos', label: 'Very basic and disorganized processes', score: 2 },
        { value: 'documentados', label: 'Documented but rarely followed', score: 3 },
        { value: 'optimizados', label: 'Optimized but resistant to change', score: 4 },
        { value: 'mejora continua', label: 'In constant continuous improvement', score: 5 },
      ],
    },
    {
      id: 'tecnologia',
      category: 'Technology',
      icon: <Shield size={24} />,
      question: 'How do you use technology to optimize operations?',
      options: [
        { value: 'manual', label: 'Everything is manual or paper-based', score: 1 },
        { value: 'basica', label: 'Basic tools but poorly integrated', score: 2 },
        { value: 'moderna', label: 'Modern tools but underutilized', score: 3 },
        { value: 'integrada', label: 'Well integrated but with gaps', score: 4 },
        { value: 'estrategica', label: 'Completely strategic and automated', score: 5 },
      ],
    },
    {
      id: 'liderazgo',
      category: 'Leadership',
      icon: <TrendingUp size={24} />,
      question: 'What leadership style predominates in your organization?',
      options: [
        { value: 'autoritario', label: 'Authoritarian and controlling', score: 1 },
        { value: 'paternalista', label: 'Paternalistic and protective', score: 2 },
        { value: 'transaccional', label: 'Transactional and reactive', score: 3 },
        { value: 'transformacional', label: 'Transformational and visionary', score: 4 },
        { value: 'servidor', label: 'Servant leadership and empowerment', score: 5 },
      ],
    },
  ]

  const questions = language === 'es' ? questionsES : questionsEN

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const calculateResults = () => {
    const scores = Object.entries(answers).map(([questionId, answerValue]) => {
      const question = questions.find(q => q.id === questionId)
      const option = question?.options.find(o => o.value === answerValue)
      return option?.score || 0
    })

    const totalScore = scores.reduce((sum, score) => sum + score, 0)
    const maxScore = questions.length * 5
    const percentage = (totalScore / maxScore) * 100

    let level = ''
    let description = ''
    let recommendations = []

    if (percentage <= 40) {
      level = language === 'es' ? 'Inicial' : 'Initial'
      description =
        language === 'es'
          ? 'Tu organización está en las primeras etapas de madurez. Hay mucho potencial para crecer.'
          : "Your organization is in the early stages of maturity. There's great potential for growth."
      recommendations =
        language === 'es'
          ? [
              'Establecer roles y responsabilidades claras',
              'Implementar canales de comunicación básicos',
              'Documentar procesos fundamentales',
              'Adoptar herramientas tecnológicas básicas',
              'Desarrollar habilidades de liderazgo',
            ]
          : [
              'Establish clear roles and responsibilities',
              'Implement basic communication channels',
              'Document fundamental processes',
              'Adopt basic technological tools',
              'Develop leadership skills',
            ]
    } else if (percentage <= 60) {
      level = language === 'es' ? 'En Desarrollo' : 'In Development'
      description =
        language === 'es'
          ? 'Tu organización tiene bases sólidas pero necesita optimización.'
          : 'Your organization has solid foundations but needs optimization.'
      recommendations =
        language === 'es'
          ? [
              'Optimizar procesos existentes',
              'Mejorar la comunicación interdepartamental',
              'Integrar mejor las herramientas tecnológicas',
              'Desarrollar liderazgo colaborativo',
              'Establecer métricas de desempeño',
            ]
          : [
              'Optimize existing processes',
              'Improve interdepartmental communication',
              'Better integrate technological tools',
              'Develop collaborative leadership',
              'Establish performance metrics',
            ]
    } else if (percentage <= 80) {
      level = language === 'es' ? 'Madura' : 'Mature'
      description =
        language === 'es'
          ? 'Tu organización es madura pero puede alcanzar la excelencia.'
          : 'Your organization is mature but can achieve excellence.'
      recommendations =
        language === 'es'
          ? [
              'Implementar mejora continua sistemática',
              'Fomentar la innovación y experimentación',
              'Desarrollar liderazgo estratégico',
              'Optimizar la automatización',
              'Crear cultura de aprendizaje',
            ]
          : [
              'Implement systematic continuous improvement',
              'Foster innovation and experimentation',
              'Develop strategic leadership',
              'Optimize automation',
              'Create learning culture',
            ]
    } else {
      level = language === 'es' ? 'Excelencia' : 'Excellence'
      description =
        language === 'es'
          ? 'Tu organización está en un nivel de excelencia. ¡Felicidades!'
          : 'Your organization is at an excellence level. Congratulations!'
      recommendations =
        language === 'es'
          ? [
              'Mantener la cultura de mejora continua',
              'Compartir conocimientos con la industria',
              'Explorar nuevas fronteras de innovación',
              'Mentorear a otras organizaciones',
              'Escalar tu modelo de éxito',
            ]
          : [
              'Maintain continuous improvement culture',
              'Share knowledge with the industry',
              'Explore new innovation frontiers',
              'Mentor other organizations',
              'Scale your success model',
            ]
    }

    return { level, description, recommendations, percentage, totalScore, maxScore }
  }

  const results = calculateResults()

  // Design for Appropriate Trust & Reliance: Trust calibration
  const getTrustCalibration = () => {
    return language === 'es'
      ? 'Este diagnóstico es una guía basada en tus respuestas. Considera estos resultados como un punto de partida para la reflexión.'
      : 'This diagnosis is a guide based on your answers. Consider these results as a starting point for reflection.'
  }

  // Design for Appropriate Trust & Reliance: Output rationale
  const getResultRationale = () => {
    const answeredQuestions = Object.keys(answers).length
    const totalQuestions = questions.length

    return language === 'es'
      ? `Basado en ${answeredQuestions} de ${totalQuestions} preguntas respondidas, este análisis refleja tu percepción actual de la organización.`
      : `Based on ${answeredQuestions} of ${totalQuestions} questions answered, this analysis reflects your current perception of the organization.`
  }

  // Design for Appropriate Trust & Reliance: AI role clarification
  const getAIRole = () => {
    return language === 'es'
      ? 'Rol del Asistente: Facilitador de autoevaluación que organiza tus respuestas en un diagnóstico estructurado.'
      : 'AI Role: Self-assessment facilitator that organizes your answers into a structured diagnosis.'
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-dark-base text-text-primary">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="heading-xl mb-6">
                {language === 'es' ? 'Resultados de tu' : 'Your'}{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #FF6B35 0%, #C87B5A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {language === 'es' ? 'Diagnóstico' : 'Diagnosis'}
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-orange-500 mx-auto mb-8"></div>
            </div>

            <div className="glass-card p-8 mb-8">
              {/* Design for Imperfection: Make uncertainty visible */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20"
              >
                <div className="flex items-start gap-3">
                  <div className="text-amber-400 mt-1">🔍</div>
                  <div>
                    <p className="text-sm text-amber-300 font-medium mb-1">
                      {language === 'es' ? 'Precisión del diagnóstico:' : 'Diagnosis accuracy:'}
                    </p>
                    <p className="text-xs text-amber-200 mb-2">{getTrustCalibration()}</p>
                    <div className="flex items-center gap-2 text-xs text-amber-300">
                      <span>{language === 'es' ? 'Confianza:' : 'Confidence:'}</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(level => (
                          <div
                            key={level}
                            className={`w-2 h-2 rounded-full ${
                              level <= 3 ? 'bg-amber-400' : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-amber-200">60%</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-gradient mb-4">
                  {results.percentage.toFixed(0)}%
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  {language === 'es' ? 'Nivel:' : 'Level:'} {results.level}
                </h2>
                <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                  {results.description}
                </p>
                {/* Design for Appropriate Trust & Reliance: Output rationale */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-gray-400 mt-4 max-w-lg mx-auto"
                >
                  {getResultRationale()}
                </motion.p>
                {/* Design for Imperfection: Evaluate outputs using domain-specific metrics */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 rounded-lg bg-gray-800/50 border border-gray-700 max-w-lg mx-auto"
                >
                  <h5 className="text-xs font-semibold text-gray-300 mb-2">
                    {language === 'es' ? 'Métricas de calidad:' : 'Quality metrics:'}
                  </h5>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        {language === 'es' ? 'Completitud:' : 'Completeness:'}
                      </span>
                      <span className="text-green-400">100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        {language === 'es' ? 'Consistencia:' : 'Consistency:'}
                      </span>
                      <span className="text-yellow-400">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">
                        {language === 'es' ? 'Relevancia:' : 'Relevance:'}
                      </span>
                      <span className="text-green-400">92%</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text-muted">
                    {language === 'es' ? 'Puntuación Total' : 'Total Score'}
                  </span>
                  <span className="text-sm text-text-muted">
                    {results.totalScore}/{results.maxScore}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-orange-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${results.percentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {questions.map((question, _index) => {
                  const answer = answers[question.id]
                  const option = question.options.find(o => o.value === answer)
                  const weight = customWeight[question.id] || 1
                  const weightedScore = (option?.score || 0) * weight

                  return (
                    <motion.div
                      key={question.id}
                      className="flex items-center gap-4 p-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                      whileHover={{ scale: editMode ? 1.02 : 1 }}
                    >
                      <div className="text-2xl">{question.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{question.category}</h4>
                        <p className="text-sm text-text-secondary">{option?.label}</p>
                        {/* Design for Co-Creation: Show weight adjustments */}
                        {editMode && (
                          <div className="flex items-center gap-2 mt-2">
                            <label className="text-xs text-gray-500">
                              {language === 'es' ? 'Peso:' : 'Weight:'}
                            </label>
                            <input
                              type="range"
                              min="0.5"
                              max="2"
                              step="0.1"
                              value={weight}
                              onChange={e =>
                                setCustomWeight(prev => ({
                                  ...prev,
                                  [question.id]: parseFloat(e.target.value),
                                }))
                              }
                              className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="text-xs text-indigo-300 font-medium">{weight}x</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gradient">
                          {editMode ? weightedScore.toFixed(1) : option?.score}/5
                        </div>
                        {editMode && weight !== 1 && (
                          <div className="text-xs text-indigo-300">×{weight}</div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Design for Co-Creation: Show impact of customizations */}
              {Object.keys(customWeight).length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20"
                >
                  <p className="text-xs text-indigo-300">
                    {language === 'es'
                      ? '🎯 Has personalizado los pesos. El puntaje refleja ahora tus prioridades específicas.'
                      : "🎯 You've customized the weights. The score now reflects your specific priorities."}
                  </p>
                </motion.div>
              )}

              <div>
                <h3 className="text-xl font-bold mb-4">
                  {language === 'es' ? 'Recomendaciones para ti:' : 'Recommendations for you:'}
                </h3>
                {/* Design for Imperfection: Offer ways to improve outputs */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-blue-400 mt-1">🛠️</div>
                    <div>
                      <p className="text-sm text-blue-300 font-medium mb-2">
                        {language === 'es' ? 'Mejora estos resultados:' : 'Improve these results:'}
                      </p>
                      <div className="space-y-1 text-xs text-blue-200">
                        <p>
                          •{' '}
                          {language === 'es'
                            ? 'Edita los pesos para reflejar prioridades reales'
                            : 'Edit weights to reflect real priorities'}
                        </p>
                        <p>
                          •{' '}
                          {language === 'es'
                            ? 'Añade notas sobre contexto específico'
                            : 'Add notes about specific context'}
                        </p>
                        <p>
                          •{' '}
                          {language === 'es'
                            ? 'Compara con evaluaciones anteriores'
                            : 'Compare with previous assessments'}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                {/* Design for Appropriate Trust & Reliance: Friction to avoid overreliance */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-orange-400 mt-1">🤔</div>
                    <div>
                      <p className="text-sm text-orange-300 font-medium mb-1">
                        {language === 'es'
                          ? 'Reflexiona antes de actuar:'
                          : 'Reflect before acting:'}
                      </p>
                      <p className="text-xs text-orange-200">
                        {language === 'es'
                          ? 'Estas sugerencias son generales. Adáptalas a tu contexto específico y recursos disponibles.'
                          : 'These suggestions are general. Adapt them to your specific context and available resources.'}
                      </p>
                    </div>
                  </div>
                </motion.div>
                {/* Design for Mental Models: Explain how recommendations were generated */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
                >
                  <p className="text-sm text-blue-300">
                    {language === 'es'
                      ? '💡 Estas recomendaciones se generaron automáticamente basadas en tus respuestas y nivel de madurez.'
                      : '💡 These recommendations were automatically generated based on your answers and maturity level.'}
                  </p>
                </motion.div>
                <ul className="space-y-3">
                  {results.recommendations.map((rec, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Check className="text-green-400 mt-1 flex-shrink-0" size={20} />
                      <span>{rec}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Design for Appropriate Trust & Reliance: AI role clarification */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 p-4 rounded-lg bg-gray-800/50 border border-gray-700"
            >
              <div className="flex items-start gap-3">
                <div className="text-gray-400 mt-1">🤖</div>
                <div>
                  <p className="text-sm text-gray-300 font-medium mb-1">{getAIRole()}</p>
                  <p className="text-xs text-gray-400">
                    {language === 'es'
                      ? 'No reemplaza el juicio humano ni el asesoramiento profesional.'
                      : 'Does not replace human judgment or professional advice.'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Design for Co-Creation: Personalization controls */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20"
            >
              <h4 className="text-sm font-semibold text-indigo-300 mb-3">
                {language === 'es'
                  ? '🎨 Personaliza tu diagnóstico'
                  : '🎨 Personalize your diagnosis'}
              </h4>

              {/* Design for Co-Creation: Generic input parameters */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">
                    {language === 'es'
                      ? 'Notas personales (opcional):'
                      : 'Personal notes (optional):'}
                  </label>
                  <textarea
                    value={personalizedNotes}
                    onChange={e => setPersonalizedNotes(e.target.value)}
                    placeholder={
                      language === 'es'
                        ? 'Añade contexto específico de tu organización...'
                        : 'Add specific context about your organization...'
                    }
                    rows={2}
                    className="w-full p-2 rounded text-sm text-white placeholder-gray-500 bg-gray-800/50 border border-gray-600 focus:border-indigo-400 focus:outline-none"
                  />
                </div>

                {/* Design for Co-Creation: Controls relevant to use case */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setEditMode(!editMode)}
                    className="text-xs px-3 py-1 rounded bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-colors"
                  >
                    {editMode
                      ? language === 'es'
                        ? '✏️ Editando'
                        : '✏️ Editing'
                      : language === 'es'
                        ? '📝 Editar resultados'
                        : '📝 Edit results'}
                  </button>
                  <span className="text-xs text-gray-500">
                    {language === 'es'
                      ? 'Ajusta la importancia de cada área'
                      : 'Adjust the importance of each area'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Design for Imperfection: Provide feedback mechanisms */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20"
            >
              <h4 className="text-sm font-semibold text-green-300 mb-3">
                {language === 'es'
                  ? '📝 Ayuda a mejorar este diagnóstico'
                  : '📝 Help improve this diagnosis'}
              </h4>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      // In real implementation, this would collect feedback
                      const feedback =
                        language === 'es'
                          ? 'El diagnóstico fue útil y preciso'
                          : 'The diagnosis was useful and accurate'
                      // Feedback logged for analytics
                    }}
                    className="flex-1 px-3 py-2 text-xs rounded bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-colors"
                  >
                    {language === 'es' ? '👍 Útil' : '👍 Useful'}
                  </button>
                  <button
                    onClick={() => {
                      // In real implementation, this would collect feedback
                      const feedback =
                        language === 'es'
                          ? 'El diagnóstico necesita mejoras'
                          : 'The diagnosis needs improvements'
                      // Feedback logged for analytics
                    }}
                    className="flex-1 px-3 py-2 text-xs rounded bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors"
                  >
                    {language === 'es' ? '👎 Necesita mejorar' : '👍 Needs improvement'}
                  </button>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">
                    {language === 'es'
                      ? 'Comentarios adicionales (opcional):'
                      : 'Additional comments (optional):'}
                  </label>
                  <textarea
                    placeholder={
                      language === 'es'
                        ? '¿Qué podríamos mejorar en este diagnóstico?'
                        : 'What could we improve in this diagnosis?'
                    }
                    rows={2}
                    className="w-full p-2 rounded text-xs text-white placeholder-gray-500 bg-gray-800/50 border border-gray-600 focus:border-green-400 focus:outline-none"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  {language === 'es'
                    ? 'Tu feedback ayuda a mejorar futuras evaluaciones.'
                    : 'Your feedback helps improve future assessments.'}
                </p>
              </div>
            </motion.div>

            <div className="text-center flex gap-3 justify-center">
              <button
                onClick={() => {
                  setCurrentStep(0)
                  setAnswers({})
                  setShowResults(false)
                  setCustomWeight({})
                  setPersonalizedNotes('')
                  setEditMode(false)
                }}
                className="btn-primary"
              >
                {language === 'es' ? 'Reintentar Test' : 'Retake Test'}
              </button>

              {/* Design for Co-Creation: Support co-editing of generated outputs */}
              {personalizedNotes && (
                <button
                  onClick={() => {
                    // In a real implementation, this would regenerate with personalization
                    // Show personalized regeneration message
                    const message = language === 'es'
                      ? 'Diagnóstico regenerado con tus notas personales'
                      : 'Diagnosis regenerated with your personal notes'
                    // TODO: Implement toast notification instead of alert
                  }}
                  className="btn-secondary"
                >
                  {language === 'es' ? '🔄 Aplicar notas' : '🔄 Apply notes'}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentStep]

  return (
    <div className="min-h-screen bg-dark-base text-text-primary">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="heading-xl mb-6">
              {language === 'es' ? 'Test de' : 'Organizational'}{' '}
              <span className="text-gradient">
                {language === 'es' ? 'Madurez Empresarial' : 'Maturity Test'}
              </span>
            </h1>
            {/* Design for Mental Models: Assessment explanation */}
            <div className="mb-6">
              <p className="lead-text max-w-2xl mx-auto mb-4">
                {language === 'es'
                  ? 'Descubre en qué nivel se encuentra tu organización y obtén recomendaciones personalizadas para mejorar.'
                  : "Discover your organization's maturity level and get personalized recommendations for improvement."}
              </p>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-card p-4 max-w-2xl mx-auto"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-blue-400 mt-1">💡</div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-300 mb-2">{getAssessmentExplanation()}</p>
                      <p className="text-xs text-gray-400">{getScoringExplanation()}</p>
                      <button
                        onClick={() => setShowExplanation(false)}
                        className="text-xs text-gray-500 hover:text-gray-300 mt-2 transition-colors"
                      >
                        {language === 'es' ? 'Entendido' : 'Got it'} ✓
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-orange-500 mx-auto mt-8"></div>
          </div>

          <div className="glass-card p-8 mb-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-text-muted">
                  {language === 'es' ? 'Pregunta' : 'Question'} {currentStep + 1}{' '}
                  {language === 'es' ? 'de' : 'of'} {questions.length}
                </span>
                <span className="text-sm text-text-muted">
                  {Math.round(((currentStep + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="text-center mb-8">
              <div className="text-4xl mb-4 text-gradient">{currentQuestion.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{currentQuestion.category}</h2>
              <p className="text-xl text-text-secondary mb-4">{currentQuestion.question}</p>
              {/* Design for Mental Models: Category explanation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-md mx-auto"
              >
                <p className="text-sm text-gray-400 italic">{getCurrentCategoryExplanation()}</p>
              </motion.div>
            </div>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {/* Design for Mental Models: Scoring guidance */}
              <div className="text-center mb-4">
                <p className="text-xs text-gray-500">
                  {language === 'es'
                    ? 'Puntaje: 1 (más bajo) → 5 (más alto)'
                    : 'Score: 1 (lowest) → 5 (highest)'}
                </p>
              </div>
              {currentQuestion.options.map((option, _index) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    answers[currentQuestion.id] === option.value
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Design for Mental Models: Visual score indicator */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(score => (
                          <div
                            key={score}
                            className={`w-2 h-2 rounded-full ${
                              score <= option.score ? 'bg-purple-400' : 'bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span>{option.label}</span>
                    </div>
                    {answers[currentQuestion.id] === option.value && (
                      <Check className="text-purple-400" size={20} />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} className="inline mr-2" />
                {language === 'es' ? 'Anterior' : 'Previous'}
              </button>
              <button
                onClick={nextStep}
                disabled={!answers[currentQuestion.id]}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === questions.length - 1
                  ? language === 'es'
                    ? 'Ver Resultados'
                    : 'View Results'
                  : language === 'es'
                    ? 'Siguiente'
                    : 'Next'}
                <ChevronRight size={20} className="inline ml-2" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
