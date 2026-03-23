import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ELEVA Coaching | Agile Leadership and Organizational Transformation',
  description:
    'Leadership coaching and organizational consulting for tech leaders and startups. +20 years in technology, proven agile methodology. Book your free session.',
  keywords:
    'leadership coaching, organizational consulting, agile coaching, agile transformation, scrum, tech leadership, startups',
}

export default function EnglishPage() {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Loading English Version...</h1>
        <p>Please wait while we prepare the content.</p>
      </div>
    </div>
  )
}
