import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ELEVA Coaching | Agile Leadership and Organizational Transformation',
  description:
    'Leadership coaching and organizational consulting for tech leaders and startups. +20 years in technology, proven agile methodology. Book your free session.',
}

export default function EnglishPage() {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center' }}>
      <div>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>ELEVA Coaching</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Agile Leadership and Organizational Transformation</p>
        <p style={{ opacity: 0.7 }}>English version coming soon...</p>
        <p style={{ opacity: 0.5, fontSize: '0.9rem' }}>Please visit the Spanish version for the full experience</p>
      </div>
    </div>
  )
}
