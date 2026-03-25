import { Question } from "./types";

export const MADUREZ_QUESTIONS: Question[] = [
  {
    id: "estructura",
    category: "Organización",
    icon: "🎯",
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
    icon: "👥",
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
    icon: "⚡",
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
    icon: "🛡️",
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
    icon: "📈",
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

export const getQuestionById = (id: string): Question | undefined => {
  return MADUREZ_QUESTIONS.find(q => q.id === id);
};

export const getQuestionsByCategory = (category: string): Question[] => {
  return MADUREZ_QUESTIONS.filter(q => q.category === category);
};
