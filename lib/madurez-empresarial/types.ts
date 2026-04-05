import { ReactNode } from 'react'

export interface Question {
  id: string
  category: string
  icon: ReactNode
  question: string
  options: Option[]
}

export interface Option {
  value: string
  label: string
  score: number
}

export interface TestResults {
  level: string
  description: string
  recommendations: string[]
  percentage: number
  totalScore: number
  maxScore: number
}

export interface MadurezDimension {
  id: string
  name: string
  description: string
  weight: number
  key: string
}

export const MADUREZ_DIMENSIONS: MadurezDimension[] = [
  {
    id: 'organizacion',
    name: 'Organización',
    description: 'Estructura, roles y responsabilidades',
    weight: 0.2,
    key: 'estructura',
  },
  {
    id: 'comunicacion',
    name: 'Comunicación',
    description: 'Flujo de información y canales',
    weight: 0.2,
    key: 'comunicacion',
  },
  {
    id: 'procesos',
    name: 'Procesos',
    description: 'Metodologías y flujos de trabajo',
    weight: 0.25,
    key: 'procesos',
  },
  {
    id: 'tecnologia',
    name: 'Tecnología',
    description: 'Herramientas y automatización',
    weight: 0.2,
    key: 'tecnologia',
  },
  {
    id: 'liderazgo',
    name: 'Liderazgo',
    description: 'Estilo y cultura de liderazgo',
    weight: 0.15,
    key: 'liderazgo',
  },
]

export type MadurezLevel = 'inicial' | 'desarrollo' | 'maduro' | 'excelencia'

export interface MadurezProfile {
  level: MadurezLevel
  percentage: number
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
  nextSteps: string[]
}
