import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Casos de Estudio | ELEVA CONSULTORA',
  description: 'Transformaciones reales de equipos y organizaciones con nuestra metodología ágil.',
}

export default function CaseStudiesPage() {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center' }}>
      <div>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Casos de Estudio</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Transformaciones Reales</p>
        <p style={{ opacity: 0.7 }}>Content loading...</p>
        <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>Please visit the main page for the full experience</p>
      </div>
    </div>
  )
}
