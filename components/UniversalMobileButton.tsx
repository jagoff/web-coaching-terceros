"use client";

import { useState, useEffect } from "react";

export default function UniversalMobileButton() {
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState({ width: 0, mobile: false });

  useEffect(() => {
    const update = () => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 0;
      setInfo({ width, mobile: width <= 1024 });
      setShow(width <= 1024);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '200px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999999,
        background: '#FF1493',
        padding: '30px',
        borderRadius: '20px',
        border: '5px solid #FFD700',
        boxShadow: '0 0 50px rgba(255,20,147,0.9)',
        textAlign: 'center'
      }}
    >
      <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>
        🚨 UNIVERSAL MOBILE BUTTON 🚨
      </div>
      <div style={{ color: 'white', fontSize: '18px', marginBottom: '20px' }}>
        Width: {info.width}px | Mobile: {info.mobile ? 'YES' : 'NO'}
      </div>
      <button
        style={{
          background: '#FFFFFF',
          color: '#FF1493',
          border: '3px solid #FFD700',
          padding: '20px 40px',
          borderRadius: '15px',
          fontSize: '24px',
          fontWeight: '900',
          cursor: 'pointer'
        }}
        onClick={() => alert('UNIVERSAL BUTTON WORKS! Width: ' + info.width)}
      >
        🎯 CLICK ME!
      </button>
    </div>
  );
}
