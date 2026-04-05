export default function ForWhoSimple() {
  const profiles = [
    {
      icon: '🚀',
      title: 'Nuevo en el rol de liderazgo',
      description: 'Pasaste de escribir código a liderar personas y nadie te enseñó cómo. Técnicamente sos muy bueno, pero la parte humana y organizacional todavía te pesa.',
      pain: 'Líder sin preparación',
    },
    {
      icon: '⚡',
      title: 'Tu empresa crece pero los procesos no acompañan',
      description: 'Lo que funcionaba con 5 personas ya no alcanza con 20. El equipo se descoordina, las prioridades se chocan y la velocidad que tenías antes se perdió.',
      pain: 'Escalar sin caos',
    },
    {
      icon: '🎯',
      title: 'Tenés el equipo pero no los resultados',
      description: 'Hay talento, pero no entrega. Aparecen silos, falta de ownership y decisiones que nadie toma. Sabés que el problema no es técnico — y eso lo hace más difícil de resolver.',
      pain: 'Talento sin resultados',
    },
  ];

  return (
    <section style={{ padding: '4rem 2rem', background: '#0f0f0f', color: '#ffffff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ 
          display: 'inline-block', 
          padding: '0.5rem 1rem', 
          background: 'linear-gradient(45deg, #f59e0b, #d97706)', 
          borderRadius: '2rem',
          fontSize: '0.875rem',
          fontWeight: '600',
          marginBottom: '2rem'
        }}>
          ¿Esto es para vos?
        </div>

        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          background: 'linear-gradient(45deg, #f59e0b, #d97706)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ¿Te encontrás en alguna de estas situaciones?
        </h2>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#a0a0a0', 
          maxWidth: '600px', 
          margin: '0 auto 3rem',
          lineHeight: '1.6'
        }}>
          Acompaño a líderes tech y founders que están en momentos clave. Si alguna de estas situaciones te resuena, podemos trabajar juntos.
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          marginTop: '3rem'
        }}>
          {profiles.map((profile, index) => (
            <div
              key={index}
              style={{
                padding: '2rem',
                background: '#1a1a1a',
                border: '1px solid #333',
                borderRadius: '1rem',
                textAlign: 'left'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                {profile.icon}
              </div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '1rem',
                color: '#ffffff'
              }}>
                {profile.title}
              </h3>
              <p style={{ 
                color: '#a0a0a0', 
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                {profile.description}
              </p>
              <div style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                color: '#f59e0b',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%'
              }}>
                {profile.pain}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
