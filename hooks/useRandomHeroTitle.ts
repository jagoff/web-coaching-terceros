import { useMemo } from 'react'

const heroTitleCombinations = [
  {
    title1: 'Menos gestión.',
    title2: 'Más liderazgo.',
  },
  {
    title1: 'Tu equipo ya tiene',
    title2: 'lo que necesita.',
  },
  {
    title1: 'Líderes que inspiran.',
    title2: 'Equipos que perduran.',
  },
  {
    title1: 'El cambio empieza',
    title2: 'por quien lidera.',
  },
  {
    title1: 'Transformá tu equipo.',
    title2: 'Liderá con propósito.',
  },
  {
    title1: 'Menos reuniones.',
    title2: 'Más acción.',
  },
]

export function useRandomHeroTitle() {
  // Use useMemo to ensure random selection on every render
  return useMemo(() => {
    const randomIndex = Math.floor(Math.random() * heroTitleCombinations.length)
    return heroTitleCombinations[randomIndex]
  }, [])
}
