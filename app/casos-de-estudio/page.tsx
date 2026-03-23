'use client'

import { useEffect } from 'react'
import CaseStudies from '@/components/sections/CaseStudiesOptimized'

export default function CaseStudiesPage() {
  useEffect(() => {
    document.title = 'Casos de Estudio | ELEVA CONSULTORA'
  }, [])

  return <CaseStudies />
}
