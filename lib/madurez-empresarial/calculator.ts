import { MADUREZ_DIMENSIONS, MadurezProfile, MadurezLevel } from "./types";

export interface Answer {
  questionId: string;
  value: string;
  score: number;
}

export class MadurezCalculator {
  static calculateProfile(answers: Answer[]): MadurezProfile {
    const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
    const maxScore = answers.length * 5;
    const percentage = (totalScore / maxScore) * 100;

    const level = this.getLevel(percentage);
    const strengths = this.identifyStrengths(answers);
    const weaknesses = this.identifyWeaknesses(answers);
    const recommendations = this.generateRecommendations(level, weaknesses);
    const nextSteps = this.generateNextSteps(level, percentage);

    return {
      level,
      percentage,
      strengths,
      weaknesses,
      recommendations,
      nextSteps
    };
  }

  private static getLevel(percentage: number): MadurezLevel {
    if (percentage <= 40) return "inicial";
    if (percentage <= 60) return "desarrollo";
    if (percentage <= 80) return "maduro";
    return "excelencia";
  }

  private static identifyStrengths(answers: Answer[]): string[] {
    const strengths: string[] = [];
    
    answers.forEach(answer => {
      if (answer.score >= 4) {
        const dimension = MADUREZ_DIMENSIONS.find(d => d.key === answer.questionId);
        if (dimension) {
          strengths.push(dimension.name);
        }
      }
    });

    return strengths;
  }

  private static identifyWeaknesses(answers: Answer[]): string[] {
    const weaknesses: string[] = [];
    
    answers.forEach(answer => {
      if (answer.score <= 2) {
        const dimension = MADUREZ_DIMENSIONS.find(d => d.key === answer.questionId);
        if (dimension) {
          weaknesses.push(dimension.name);
        }
      }
    });

    return weaknesses;
  }

  private static generateRecommendations(level: MadurezLevel, weaknesses: string[]): string[] {
    const baseRecommendations = {
      inicial: [
        "Establecer una estructura organizacional básica",
        "Definir roles y responsabilidades claras",
        "Implementar canales de comunicación fundamentales",
        "Documentar procesos esenciales",
        "Adoptar herramientas tecnológicas básicas",
        "Desarrollar habilidades de liderazgo fundamentales"
      ],
      desarrollo: [
        "Optimizar procesos existentes",
        "Mejorar la comunicación interdepartamental",
        "Integrar mejor las herramientas tecnológicas",
        "Desarrollar liderazgo colaborativo",
        "Establecer métricas de desempeño",
        "Fomentar la toma de decisiones descentralizada"
      ],
      maduro: [
        "Implementar mejora continua sistemática",
        "Fomentar la innovación y experimentación",
        "Desarrollar liderazgo estratégico",
        "Optimizar la automatización de procesos",
        "Crear una cultura de aprendizaje organizacional",
        "Expandir hacia nuevas oportunidades de mercado"
      ],
      excelencia: [
        "Mantener la cultura de mejora continua",
        "Compartir conocimientos y mejores prácticas",
        "Explorar nuevas fronteras de innovación",
        "Mentorear a otras organizaciones",
        "Escalar el modelo de éxito a nuevos mercados",
        "Desarrollar capacidades de transformación digital"
      ]
    };

    let recommendations = baseRecommendations[level];

    // Add specific recommendations based on weaknesses
    weaknesses.forEach(weakness => {
      switch (weakness.toLowerCase()) {
        case "organización":
          recommendations.push("Reestructurar el equipo para mayor agilidad");
          break;
        case "comunicación":
          recommendations.push("Implementar herramientas de comunicación colaborativa");
          break;
        case "procesos":
          recommendations.push("Adoptar metodologías ágiles");
          break;
        case "tecnología":
          recommendations.push("Modernizar el stack tecnológico");
          break;
        case "liderazgo":
          recommendations.push("Desarrollar programas de liderazgo");
          break;
      }
    });

    return recommendations.slice(0, 6); // Limit to 6 recommendations
  }

  private static generateNextSteps(level: MadurezLevel, percentage: number): string[] {
    if (percentage < 30) {
      return [
        "Contratar un consultor para diagnóstico inicial",
        "Formar un equipo de transformación",
        "Establecer KPIs básicos",
        "Comenzar con cambios pequeños y visibles"
      ];
    }

    if (percentage < 50) {
      return [
        "Implementar un programa de mejora de 90 días",
        "Capacitar al equipo en metodologías ágiles",
        "Automatizar procesos manuales críticos",
        "Establecer reuniones de seguimiento semanales"
      ];
    }

    if (percentage < 70) {
      return [
        "Desarrollar un roadmap de transformación digital",
        "Implementar dashboards de métricas en tiempo real",
        "Crear programas de desarrollo de liderazgo",
        "Establecer alianzas estratégicas tecnológicas"
      ];
    }

    return [
      "Expandir el modelo a otras áreas de la organización",
      "Desarrollar capacidades de innovación disruptiva",
      "Crear un centro de excelencia interna",
      "Explorar oportunidades de mercado internacionales"
    ];
  }

  static getLevelInfo(level: MadurezLevel): {
    title: string;
    description: string;
    color: string;
    icon: string;
  } {
    const levelInfo = {
      inicial: {
        title: "Nivel Inicial",
        description: "Tu organización está comenzando su journey de madurez. Hay grandes oportunidades de mejora.",
        color: "red",
        icon: "🌱"
      },
      desarrollo: {
        title: "En Desarrollo",
        description: "Tu organización tiene bases sólidas y está en proceso de optimización continua.",
        color: "yellow",
        icon: "🌿"
      },
      maduro: {
        title: "Nivel Maduro",
        description: "Tu organización opera con eficiencia y está lista para alcanzar la excelencia.",
        color: "blue",
        icon: "🌳"
      },
      excelencia: {
        title: "Nivel de Excelencia",
        description: "Tu organización es referente en el sector y opera en su máximo potencial.",
        color: "purple",
        icon: "🌟"
      }
    };

    return levelInfo[level];
  }
}
