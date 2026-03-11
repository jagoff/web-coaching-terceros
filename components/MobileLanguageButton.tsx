"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MobileLanguageButton() {
  const { language, setLanguage } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [info, setInfo] = useState({ width: 0, isMobile: false });

  useEffect(() => {
    const updateInfo = () => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 0;
      const isMobile = width <= 1024;
      setInfo({ width, isMobile });
      setVisible(isMobile);
      
      console.log('MobileLanguageButton - Width:', width, 'Mobile:', isMobile, 'Visible:', visible);
    };

    updateInfo();
    window.addEventListener('resize', updateInfo);
    return () => window.removeEventListener('resize', updateInfo);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999999,
        background: '#FF1493',
        padding: '20px',
        borderRadius: '15px',
        border: '4px solid #FFD700',
        boxShadow: '0 0 30px rgba(255,20,147,0.8)'
      }}
    >
      <div style={{ color: 'white', textAlign: 'center', marginBottom: '10px' }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>MOBILE LANGUAGE BUTTON</div>
        <div style={{ fontSize: '12px' }}>Width: {info.width}px</div>
        <div style={{ fontSize: '12px' }}>Mobile: {info.isMobile ? 'YES' : 'NO'}</div>
      </div>
      
      <button
        style={{
          background: '#FFFFFF',
          color: '#FF1493',
          border: '2px solid #FFD700',
          padding: '15px 25px',
          borderRadius: '10px',
          fontSize: '18px',
          fontWeight: '900',
          cursor: 'pointer',
          minWidth: '150px',
          height: '60px'
        }}
        onClick={() => {
          console.log('SEPARATE BUTTON CLICKED!');
          setLanguage(language === 'es' ? 'en' : 'es');
        }}
      >
        <div style={{ fontSize: '24px' }}>{language === 'es' ? '🇺🇸' : '🇪🇸'}</div>
        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
          {language === 'es' ? 'ENGLISH' : 'ESPAÑOL'}
        </div>
      </button>
    </div>
  );
}
