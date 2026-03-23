'use client'

export default function Home() {
  const handleContact = () => {
    const element = document.querySelector('#contacto')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleProcess = () => {
    const element = document.querySelector('#proceso')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textAlign: 'center', background: 'linear-gradient(135deg, #0c0a12 0%, #1d1a2a 100%)' }}>
      <div style={{ maxWidth: '600px', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #7c6bc4 0%, #c87b5a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          ELEVA CONSULTORA
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem', opacity: 0.9 }}>
          Liderazgo Ágil y Transformación Organizacional
        </p>
        <p style={{ fontSize: '1.1rem', marginBottom: '3rem', opacity: 0.7, lineHeight: '1.6' }}>
          Coaching y consultoría organizacional para líderes tech y startups que quieren crecer de forma ágil, humana y sostenible.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={handleContact}
            style={{ 
              background: 'linear-gradient(135deg, #7c6bc4 0%, #c87b5a 100%)',
              color: 'white',
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
          >
            Agendá tu sesión gratuita →
          </button>
          <button 
            onClick={handleProcess}
            style={{ 
              background: 'transparent',
              color: '#7c6bc4',
              padding: '1rem 2rem',
              border: '2px solid #7c6bc4',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Conocé nuestro método ↓
          </button>
        </div>
        <p style={{ marginTop: '3rem', fontSize: '0.9rem', opacity: 0.5 }}>
          Más de 20 años en tecnología · 11+ años de consultoría
        </p>
      </div>
    </div>
  )
}
