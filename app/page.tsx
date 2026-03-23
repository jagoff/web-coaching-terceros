import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ELEVA CONSULTORA | Liderazgo Ágil y Transformación Organizacional',
  description:
    'Consultoría organizacional y coaching de liderazgo para líderes tech y startups. +20 años en tecnología, metodología ágil probada. Agendá tu sesión gratuita.',
  keywords:
    'coaching de liderazgo, consultoría organizacional, agile coaching, transformación ágil, scrum, liderazgo tech, startups, Argentina',
}

export default function Home() {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Loading...</h1>
        <p>Preparing your optimized experience...</p>
      </div>
    </div>
  )
}
