export default function ServicesSimple() {
  const services = [
    {
      title: 'Coaching de Liderazgo',
      description: 'Para líderes y managers que quieren potenciar su impacto, desarrollar equipos de alto rendimiento y navegar la complejidad del entorno actual.',
      features: [
        'Liderazgo situacional y adaptativo',
        'Comunicación efectiva y feedback',
        'Gestión de conflictos y negociación',
        'Desarrollo de equipos autónomos',
        'Inteligencia emocional y empatía'
      ]
    },
    {
      title: 'Consultoría Organizacional',
      description: 'Para startups y empresas que necesitan profesionalizar operaciones, adoptar agilidad real y construir una cultura que escale junto con el negocio.',
      features: [
        'Transformación ágil a medida',
        'Diseño de procesos escalables',
        'Estructura organizacional flexible',
        'Métricas y KPIs significativos',
        'Gestión del cambio cultural'
      ]
    }
  ];

  return (
    <section style={{ padding: '4rem 2rem', background: '#1a1a1a', color: '#ffffff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          background: 'linear-gradient(45deg, #f59e0b, #d97706)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Deja de apagar incendios
        </h2>
        
        <div style={{ width: '100px', height: '4px', background: '#f59e0b', margin: '2rem auto' }} />

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '3rem',
          marginTop: '3rem'
        }}>
          {services.map((service, index) => (
            <div
              key={index}
              style={{
                padding: '2rem',
                background: '#0f0f0f',
                border: '1px solid #333',
                borderRadius: '1rem',
                textAlign: 'left'
              }}
            >
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '600', 
                marginBottom: '1rem',
                color: '#ffffff'
              }}>
                {service.title}
              </h3>
              <p style={{ 
                color: '#a0a0a0', 
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                {service.description}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '0.75rem',
                    color: '#a0a0a0'
                  }}>
                    <span style={{ 
                      color: '#f59e0b', 
                      marginRight: '0.75rem',
                      fontSize: '1.2rem'
                    }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            marginBottom: '1rem',
            color: '#ffffff'
          }}>
            Conocé mi enfoque
          </h3>
          <p style={{ color: '#a0a0a0' }}>
            ¿Queres pasar por YouTube?{' '}
            <a 
              href="https://www.youtube.com/watch?v=JIkgdtUAfGM&list=PLj8LyKdT6vm6V5h635rO3OCOsPBOsLYMH&index=3" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#f59e0b', textDecoration: 'underline', fontWeight: '500' }}
            >
              ¡Te espero!
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
