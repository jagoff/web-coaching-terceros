"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, X, BarChart3, Users, Target, Zap, Shield, TrendingUp } from "lucide-react";
import { headerStagger, blurUp } from "@/lib/animations";

export default function MadurezEmpresarial() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: "estructura",
      category: "Organización",
      icon: <Target size={24} />,
      question: "¿Cómo describirías la estructura de tu equipo?",
      options: [
        { value: "caotica", label: "Totalmente caótica, sin roles definidos", score: 1 },
        { value: "informal", label: "Informal, con roles básicos pero poco claros", score: 2 },
        { value: "definida", label: "Definida pero rígida", score: 3 },
        { value: "agil", label: "Ágil y adaptable", score: 4 },
        { value: "autonoma", label: "Completamente autónoma y auto-organizada", score: 5 }
      ]
    },
    {
      id: "comunicacion",
      category: "Comunicación",
      icon: <Users size={24} />,
      question: "¿Cómo fluye la comunicación en tu empresa?",
      options: [
        { value: "nula", label: "Prácticamente no existe comunicación", score: 1 },
        { value: "unidireccional", label: "Solo de arriba hacia abajo", score: 2 },
        { value: "limitada", label: "Limitada a reuniones ocasionales", score: 3 },
        { value: "frecuente", label: "Frecuente pero poco efectiva", score: 4 },
        { value: "transparente", label: "Totalmente transparente y efectiva", score: 5 }
      ]
    },
    {
      id: "procesos",
      category: "Procesos",
      icon: <Zap size={24} />,
      question: "¿Qué tan maduros son tus procesos de trabajo?",
      options: [
        { value: "inexistentes", label: "No existen procesos definidos", score: 1 },
        { value: "basicos", label: "Procesos muy básicos y desorganizados", score: 2 },
        { value: "documentados", label: "Documentados pero poco seguidos", score: 3 },
        { value: "optimizados", label: "Optimizados pero con resistencia al cambio", score: 4 },
        { value: "mejora continua", label: "En mejora continua constante", score: 5 }
      ]
    },
    {
      id: "tecnologia",
      category: "Tecnología",
      icon: <Shield size={24} />,
      question: "¿Cómo utilizas la tecnología para optimizar operaciones?",
      options: [
        { value: "manual", label: "Todo es manual o en papel", score: 1 },
        { value: "basica", label: "Herramientas básicas pero poco integradas", score: 2 },
        { value: "moderna", label: "Herramientas modernas pero subutilizadas", score: 3 },
        { value: "integrada", label: "Bien integrada pero con brechas", score: 4 },
        { value: "estrategica", label: "Totalmente estratégica y automatizada", score: 5 }
      ]
    },
    {
      id: "liderazgo",
      category: "Liderazgo",
      icon: <TrendingUp size={24} />,
      question: "¿Qué estilo de liderazgo predomina en tu organización?",
      options: [
        { value: "autoritario", label: "Autoritario y controlador", score: 1 },
        { value: "paternalista", label: "Paternalista y protector", score: 2 },
        { value: "transaccional", label: "Transaccional y reactivo", score: 3 },
        { value: "transformacional", label: "Transformacional y visionario", score: 4 },
        { value: "servidor", label: "Liderazgo de servicio y empoderamiento", score: 5 }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateResults = () => {
    const scores = Object.entries(answers).map(([questionId, answerValue]) => {
      const question = questions.find(q => q.id === questionId);
      const option = question?.options.find(o => o.value === answerValue);
      return option?.score || 0;
    });

    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 5;
    const percentage = (totalScore / maxScore) * 100;

    let level = "Inicial";
    let description = "";
    let recommendations = [];

    if (percentage <= 40) {
      level = "Inicial";
      description = "Tu organización está en las primeras etapas de madurez. Hay mucho potencial para crecer.";
      recommendations = [
        "Establecer roles y responsabilidades claras",
        "Implementar canales de comunicación básicos",
        "Documentar procesos fundamentales",
        "Adoptar herramientas tecnológicas básicas",
        "Desarrollar habilidades de liderazgo"
      ];
    } else if (percentage <= 60) {
      level = "En Desarrollo";
      description = "Tu organización tiene bases sólidas pero necesita optimización.";
      recommendations = [
        "Optimizar procesos existentes",
        "Mejorar la comunicación interdepartamental",
        "Integrar mejor las herramientas tecnológicas",
        "Desarrollar liderazgo colaborativo",
        "Establecer métricas de desempeño"
      ];
    } else if (percentage <= 80) {
      level = "Madura";
      description = "Tu organización es madura pero puede alcanzar la excelencia.";
      recommendations = [
        "Implementar mejora continua sistemática",
        "Fomentar la innovación y experimentación",
        "Desarrollar liderazgo estratégico",
        "Optimizar la automatización",
        "Crear cultura de aprendizaje"
      ];
    } else {
      level = "Excelencia";
      description = "Tu organización está en un nivel de excelencia. ¡Felicidades!";
      recommendations = [
        "Mantener la cultura de mejora continua",
        "Compartir conocimientos con la industria",
        "Explorar nuevas fronteras de innovación",
        "Mentorear a otras organizaciones",
        "Escalar tu modelo de éxito"
      ];
    }

    return { level, description, recommendations, percentage, totalScore, maxScore };
  };

  const results = calculateResults();

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
                Resultados de tu
                <span style={{
                  background: "linear-gradient(135deg, #FF6B35 0%, #C87B5A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}> Diagnóstico</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-orange-500 mx-auto mb-8"></div>
            </div>

            <div className="glass-card p-8 mb-8">
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-gradient mb-4">
                  {results.percentage.toFixed(0)}%
                </div>
                <h2 className="text-3xl font-bold mb-4">Nivel: {results.level}</h2>
                <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                  {results.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-text-muted">Puntuación Total</span>
                  <span className="text-sm text-text-muted">{results.totalScore}/{results.maxScore}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-orange-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${results.percentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {questions.map((question, index) => {
                  const answer = answers[question.id];
                  const option = question.options.find(o => o.value === answer);
                  return (
                    <div key={question.id} className="flex items-center gap-4">
                      <div className="text-2xl">{question.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{question.category}</h4>
                        <p className="text-sm text-text-secondary">{option?.label}</p>
                      </div>
                      <div className="text-lg font-bold text-gradient">
                        {option?.score}/5
                      </div>
                    </div>
                  );
                })}
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Recomendaciones para ti:</h3>
                <ul className="space-y-3">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="text-green-400 mt-1 flex-shrink-0" size={20} />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setCurrentStep(0);
                  setAnswers({});
                  setShowResults(false);
                }}
                className="btn-primary"
              >
                Reintentar Test
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];

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
              Test de
              <span className="text-gradient"> Madurez Empresarial</span>
            </h1>
            <p className="lead-text max-w-2xl mx-auto">
              Descubre en qué nivel se encuentra tu organización y obtén recomendaciones personalizadas para mejorar.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-orange-500 mx-auto mt-8"></div>
          </div>

          <div className="glass-card p-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-text-muted">Pregunta {currentStep + 1} de {questions.length}</span>
                <span className="text-sm text-text-muted">{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
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
              <div className="text-4xl mb-4 text-gradient">
                {currentQuestion.icon}
              </div>
              <h2 className="text-2xl font-bold mb-2">{currentQuestion.category}</h2>
              <p className="text-xl text-text-secondary mb-8">{currentQuestion.question}</p>
            </div>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    answers[currentQuestion.id] === option.value
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {answers[currentQuestion.id] === option.value && (
                      <Check className="text-purple-400" size={20} />
                    )}
                  </div>
                </button>
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
                Anterior
              </button>
              <button
                onClick={nextStep}
                disabled={!answers[currentQuestion.id]}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === questions.length - 1 ? 'Ver Resultados' : 'Siguiente'}
                <ChevronRight size={20} className="inline ml-2" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
