import React from 'react';

export default function CRTOverlay() {
  return (
    <div 
      className="pointer-events-none fixed inset-0"
      style={{
        zIndex: 2147483647,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        background: `
          radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,0.6) 100%),
          repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0, 0, 0, 0.15) 3px, rgba(0, 0, 0, 0.15) 4px)
        `
      }}
    />
  );
}