"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutComplete() {
  const { t } = useLanguage();
  const credentials = [
    "Advanced Certified ScrumMaster",
    "Advanced Certified Scrum Product Owner (ACSPO)",
    "Professional Scrum™ with UX (PSU I)",
    "Agile Coach",
    "Management 3.0 Metrics & OKR's",
    "unFIX Foundation Workshop",
    "Energizing People",
    "Fundamentals Online Workshop",
  ];

  return (
    <section className="about-section" style={{ padding: '4rem 2rem', background: '#0f0f0f', color: '#ffffff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          background: 'linear-gradient(45deg, #f59e0b, #d97706)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          De la tecnología a transformar organizaciones
        </h2>
        
        <div style={{ 
          fontSize: '1.25rem', 
          color: '#a0a0a0', 
          maxWidth: '800px', 
          margin: '0 auto 3rem',
          lineHeight: '1.6'
        }}>
          <h3 style={{ color: '#ffffff', marginBottom: '1rem' }}>¡Hola! Soy Fernando Ferrari</h3>
          <p>
            Llevo más de 20 años en tecnología — desde infraestructura y operaciones hasta liderazgo estratégico y transformación cultural.
          </p>
          <p>
            Fui técnico, sysadmin, CTO, Advanced Scrum Master, Product Owner, PM, Director de Operaciones.
          </p>
          <p>
            Lideré equipos en empresas de más de 2500 personas como también en empresas de 4 personas, acompañé startups a escalar sin perder su identidad.
          </p>
          <p>
            Hoy gestiono infraestructura AWS Cloud en Avature, co-fundé Nodok.AI para proyectos de inteligencia artificial, y llevo +10 años como consultor ágil independiente.
          </p>
          <p>
            Te acompaño a construir equipos autónomos, procesos que escalen, y una cultura que retenga y desafie al talento.
          </p>
        </div>

        <h3 
          style={{ 
            fontSize: '2rem', 
            fontWeight: '600', 
            marginBottom: '2rem',
            color: '#ffffff'
          }}
        >
          <span style={{
            background: 'linear-gradient(135deg, #7C6BC4 0%, #C87B5A 50%, #FF6B35 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            position: 'relative',
            display: 'inline'
          }}>Certificaciones internacionales comprobables</span>
        </h3>
        
        <div style={{ marginBottom: '2rem' }}>
          <a
            href="https://www.linkedin.com/in/fernandolferrari/details/certifications/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(45deg, #f59e0b, #d97706)',
              color: 'white',
              textDecoration: 'none',
              fontWeight: '600',
              borderRadius: '0.5rem'
            }}
          >
            Ver certificaciones en LinkedIn
          </a>
        </div>

        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '1rem', 
          justifyContent: 'center', 
          marginBottom: '3rem' 
        }}>
          {credentials.map((credential) => (
            <div
              key={credential}
              style={{ 
                padding: '0.75rem 1.25rem', 
                background: '#1a1a1a', 
                borderRadius: '2rem',
                border: '1px solid #333',
                fontSize: '0.9rem',
                color: '#ffffff'
              }}
            >
              <span>{credential}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
