export default function ProcessSimple() {
  const steps = [
    {
      title: 'Diagnóstico',
      description: 'Analizo tu organización, equipo o liderazgo actual. Identifico fricciones, oportunidades y el punto de partida real.'
    },
    {
      title: 'Diseño',
      description: 'Co-creo una hoja de ruta a medida: objetivos claros, métricas de avance y estrategia ágil adaptada a tu contexto.'
    },
    {
      title: 'Ejecución',
      description: 'Sesiones de coaching y acompañamiento en el día a día. Itero, remuevo impedimentos y mantenemos el foco.'
    },
    {
      title: 'Autonomía',
      description: 'Consolido prácticas, transfiero herramientas y construís la capacidad interna para seguir evolucionando sin depender de mí.'
    }
  ];

  const stats = [
    { label: 'Años en tecnología', value: '20+', description: 'Desde infraestructura hasta liderazgo' },
    { label: 'Años de coaching ágil', value: '10+', description: 'Transformando startups y empresas tech' },
    { label: 'Certificaciones activas', value: '8+', description: 'Scrum, UX, Management 3.0, Security' },
    { label: 'Empresas co-fundadas', value: '3', description: 'Mascabo, Nodok.AI, AyP' }
  ];

  return (
    <section style={{ padding: '4rem 2rem', background: '#1a1a1a', color: '#ffffff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 
          style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            background: 'linear-gradient(45deg, #f59e0b, #d97706)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            maxWidth: '380px',
            margin: '0 auto 1rem auto',
            lineHeight: '1.2'
          }}
        >
          Estos son mis 4 pasos hacia la transformación positiva
        </h2>
        
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#a0a0a0', 
          maxWidth: '600px', 
          margin: '0 auto 3rem',
          lineHeight: '1.6'
        }}>
          Un proceso estructurado pero flexible, adaptado a tu realidad y objetivos específicos.
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                padding: '2rem',
                background: '#0f0f0f',
                border: '1px solid #333',
                borderRadius: '1rem',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-1rem',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '2rem',
                height: '2rem',
                background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.875rem'
              }}>
                {index + 1}
              </div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                marginBottom: '1rem',
                color: '#ffffff',
                marginTop: '0.5rem'
              }}>
                {step.title}
              </h3>
              <p style={{ 
                color: '#a0a0a0', 
                lineHeight: '1.6'
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem',
          marginTop: '4rem'
        }}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center'
              }}
            >
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                color: '#f59e0b',
                marginBottom: '0.5rem'
              }}>
                {stat.value}
              </div>
              <h4 style={{ 
                fontSize: '1rem', 
                fontWeight: '600', 
                marginBottom: '0.5rem',
                color: '#ffffff'
              }}>
                {stat.label}
              </h4>
              <p style={{ 
                fontSize: '0.875rem',
                color: '#a0a0a0',
                lineHeight: '1.4'
              }}>
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
