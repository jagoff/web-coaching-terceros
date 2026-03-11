"use client";

import { useState, useEffect } from "react";

export default function ForceVisibleButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('ForceVisibleButton mounted');
  }, []);

  if (!mounted) return null;

  return (
    <div 
      id="force-visible-button"
      style={{
        position: 'absolute',
        top: '300px',
        left: '20px',
        right: '20px',
        zIndex: 2147483647, // Maximum possible z-index
        display: 'block !important',
        visibility: 'visible !important',
        opacity: '1 !important',
        pointerEvents: 'auto !important',
        background: '#FF0000',
        padding: '40px',
        borderRadius: '20px',
        border: '8px solid #FFFF00',
        boxShadow: '0 0 100px rgba(255,0,0,1)',
        textAlign: 'center',
        transform: 'none !important',
        clip: 'auto !important',
        clipPath: 'none !important',
        mask: 'none !important',
        webkitMask: 'none !important'
      }}
      onClick={() => {
        console.log('FORCE VISIBLE BUTTON CLICKED!');
        alert('FORCE VISIBLE BUTTON WORKS!');
      }}
    >
      <div style={{
        color: '#FFFFFF',
        fontSize: '32px',
        fontWeight: '900',
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        marginBottom: '20px',
        display: 'block !important',
        visibility: 'visible !important'
      }}>
        🚨 FORCE VISIBLE 🚨
      </div>
      <div style={{
        color: '#FFFFFF',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '30px',
        display: 'block !important',
        visibility: 'visible !important'
      }}>
        This button CANNOT be hidden by CSS
      </div>
      <div style={{
        background: '#FFFFFF',
        color: '#FF0000',
        padding: '20px 40px',
        borderRadius: '15px',
        fontSize: '28px',
        fontWeight: '900',
        cursor: 'pointer',
        display: 'inline-block !important',
        visibility: 'visible !important',
        border: '4px solid #FFFF00'
      }}>
        🎯 CLICK ME!
      </div>
    </div>
  );
}
