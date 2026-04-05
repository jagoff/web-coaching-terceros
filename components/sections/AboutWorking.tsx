"use client";

import React from "react";

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

export default function AboutWorking() {
  return (
    <div id="sobre-mi" style={{ padding: '4rem 2rem', background: 'var(--surface)', color: 'var(--text-primary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem', color: 'var(--text-primary)' }}>
          De la tecnología
          <br />
          <span style={{ background: 'linear-gradient(45deg, var(--gold-primary), var(--gold-secondary)), WebkitBackgroundClip: text, WebkitTextFillColor: transparent' }}>a transformar</span>
          <br />
          equipos
        </h2>
        
        <div style={{ width: '100px', height: '4px', background: 'var(--gold-primary)', margin: '2rem auto' }} />
        
        <div style={{ fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
          Con más de 10 años de experiencia en tecnología y liderazgo, ayudé a decenas de líderes y equipos a alcanzar su máximo potencial a través de coaching personalizado y consultoría en metodologías ágiles.
        </div>

        <p style={{ fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '3rem', color: 'var(--text-secondary)' }}>
          Mi enfoque combina la experiencia práctica en desarrollo de software con certificaciones internacionales en agilidad y coaching, acompañando a organizaciones en su transformación cultural y operativa.
        </p>

        <h3 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '2rem', color: 'var(--text-primary)' }}>
          <span style={{ background: 'linear-gradient(45deg, var(--gold-primary), var(--gold-secondary)), WebkitBackgroundClip: text, WebkitTextFillColor: transparent' }}>Certificaciones</span>
        </h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
          {credentials.map((credential) => (
            <div
              key={credential}
              style={{ 
                padding: '0.75rem 1.25rem', 
                background: 'var(--background-secondary)', 
                borderRadius: '2rem',
                border: '1px solid var(--border-primary)',
                fontSize: '0.9rem',
                color: 'var(--text-primary)'
              }}
            >
              <span>{credential}</span>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--text-primary)' }}>
            <span style={{ background: 'linear-gradient(45deg, var(--gold-primary), var(--gold-secondary)), WebkitBackgroundClip: text, WebkitTextFillColor: transparent' }}>
              Conocé mi enfoque
            </span>
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            ¿Queres pasar por YouTube? <a 
              href="https://www.youtube.com/watch?v=JIkgdtUAfGM&list=PLj8LyKdT6vm6V5h635rO3OCOsPBOsLYMH&index=3" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--gold-primary)', textDecoration: 'underline', fontWeight: '500' }}
            >
              ¡Te espero!
            </a>
          </p>
        </div>
        
        <div style={{ padding: '2rem', background: 'var(--background-secondary)', borderRadius: '1rem', textAlign: 'center', border: '1px solid var(--border-primary)' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>YouTube Thumbnail</h4>
          <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Video: Fernando Ferrari - Coaching de Liderazgo</p>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--gold-primary)' }}>✅ BIO COMPLETA ESTÁ FUNCIONANDO</p>
        </div>
      </div>
    </div>
  );
}
