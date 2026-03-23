import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ELEVA CONSULTORA | Liderazgo Ágil y Transformación Organizacional',
  description:
    'Consultoría organizacional y coaching de liderazgo para líderes tech y startups. +20 años en tecnología, metodología ágil probada. Agendá tu sesión gratuita.',
}

export default function Home() {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center' }}>
      <div>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>ELEVA CONSULTORA</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Liderazgo Ágil y Transformación Organizacional</p>
        <p style={{ opacity: 0.7 }}>Loading optimized experience...</p>
        <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>Please wait while we prepare your content</p>
      </div>
    </div>
  )
}
