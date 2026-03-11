"use client";

import { useState, useEffect } from "react";

export default function TestPage() {
  const [info, setInfo] = useState({
    mounted: false,
    width: 0,
    isMobile: false,
    time: new Date().toLocaleTimeString()
  });

  useEffect(() => {
    const update = () => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 0;
      setInfo({
        mounted: true,
        width,
        isMobile: width <= 1024,
        time: new Date().toLocaleTimeString()
      });
      console.log('TestPage - Updated:', { width, isMobile: width <= 1024 });
    };

    update();
    const interval = setInterval(update, 1000);
    window.addEventListener('resize', update);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(45deg, #FF0000, #00FF00, #0000FF)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      overflow: 'hidden'
    }}>
      <div style={{
        background: 'rgba(0,0,0,0.8)',
        padding: '40px',
        borderRadius: '20px',
        border: '5px solid white',
        maxWidth: '500px',
        position: 'relative',
        zIndex: 1
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px', color: '#FFD700' }}>
          🚨 TEST PAGE 🚨
        </h1>
        
        <div style={{ marginBottom: '20px', fontSize: '20px' }}>
          <div>🕐 Time: {info.time}</div>
          <div>📱 Width: {info.width}px</div>
          <div>📊 Mobile: {info.isMobile ? 'YES ✅' : 'NO ❌'}</div>
          <div>🔄 Mounted: {info.mounted ? 'YES ✅' : 'NO ❌'}</div>
        </div>

        <div style={{
          background: '#FFD700',
          color: '#000',
          padding: '20px',
          borderRadius: '10px',
          margin: '20px 0',
          fontSize: '28px',
          fontWeight: '900'
        }}>
          {info.isMobile ? '📱 MOBILE DETECTED' : '🖥️ DESKTOP DETECTED'}
        </div>

        <button
          style={{
            background: '#FFFFFF',
            color: '#000',
            border: '3px solid #FFD700',
            padding: '15px 30px',
            borderRadius: '10px',
            fontSize: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            margin: '10px',
            position: 'relative',
            zIndex: 10
          }}
          onClick={() => alert('Button clicked! Width: ' + info.width + ' - Mobile: ' + (info.width <= 1024))}
        >
          🎯 RELATIVE BUTTON
        </button>

        <div style={{ fontSize: '16px', marginTop: '20px', opacity: 0.8 }}>
          If you see this page, the build is working.<br/>
          Position: relative (not fixed)
        </div>
      </div>
    </div>
  );
}
