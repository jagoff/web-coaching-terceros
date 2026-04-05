export default function ContactSimple() {
  return (
    <section style={{ padding: '4rem 2rem', background: '#0f0f0f', color: '#ffffff' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          background: 'linear-gradient(45deg, #f59e0b, #d97706)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Comenzá tu Transformación
        </h2>
        
        <div style={{ 
          fontSize: '1.25rem', 
          color: '#a0a0a0', 
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          <p style={{ marginBottom: '1rem', fontStyle: 'italic' }}>
            "Pasamos de micromanagement a equipos autónomos en 3 meses. Cambió completamente nuestra dinámica."
          </p>
          <p>
            Cada día que pasa sin actuar es un día que tu equipo sigue lidiando con los mismos problemas.
          </p>
          <p>
            La primera sesión es gratis. No tienes nada que perder, pero tu equipo y tu empresa tiene todo por ganar.
          </p>
        </div>

        <div style={{ 
          background: '#1a1a1a', 
          padding: '2rem', 
          borderRadius: '1rem',
          border: '1px solid #333',
          marginTop: '2rem'
        }}>
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            marginBottom: '1.5rem',
            color: '#ffffff'
          }}>
            ¿Cómo te llamas?
          </h3>
          <p style={{ color: '#a0a0a0', marginBottom: '1.5rem' }}>
            Empecemos por conocernos
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Tu nombre"
              style={{
                padding: '0.75rem 1rem',
                background: '#0f0f0f',
                border: '1px solid #333',
                borderRadius: '0.5rem',
                color: '#ffffff',
                fontSize: '1rem'
              }}
            />
            <input
              type="email"
              placeholder="Tu email"
              style={{
                padding: '0.75rem 1rem',
                background: '#0f0f0f',
                border: '1px solid #333',
                borderRadius: '0.5rem',
                color: '#ffffff',
                fontSize: '1rem'
              }}
            />
            <textarea
              placeholder="¿Cuál es tu principal desafío?"
              rows={4}
              style={{
                padding: '0.75rem 1rem',
                background: '#0f0f0f',
                border: '1px solid #333',
                borderRadius: '0.5rem',
                color: '#ffffff',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
            <button
              style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Enviar mensaje
            </button>
          </div>
        </div>

        <div style={{ 
          marginTop: '3rem', 
          padding: '2rem 0', 
          borderTop: '1px solid #333',
          textAlign: 'center'
        }}>
          <p style={{ color: '#666', fontSize: '0.875rem' }}>
            © 2026 ELEVA CONSULTORIA
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '2rem', 
            marginTop: '1rem',
            fontSize: '0.875rem'
          }}>
            <a href="/sobre-mi" style={{ color: '#a0a0a0', textDecoration: 'none' }}>Sobre mí</a>
            <a href="/servicios" style={{ color: '#a0a0a0', textDecoration: 'none' }}>Servicios</a>
            <a href="/testimonios" style={{ color: '#a0a0a0', textDecoration: 'none' }}>Testimonios</a>
            <a href="/faq" style={{ color: '#a0a0a0', textDecoration: 'none' }}>Preguntas Frecuentes</a>
          </div>
        </div>
      </div>
    </section>
  );
}
