import React, { useState, useEffect } from 'react';

export default function GlitchText({ 
  children, 
  className = '', 
  intensity = 'normal',
  continuous = false,
  color = '#00ff41'
}) {
  const [isGlitching, setIsGlitching] = useState(continuous);
  
  useEffect(() => {
    if (continuous) {
      const interval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }, 3000 + Math.random() * 2000);
      return () => clearInterval(interval);
    }
  }, [continuous]);

  const glitchStyles = isGlitching ? {
    textShadow: `
      ${intensity === 'high' ? '3px' : '2px'} 0 ${color}, 
      ${intensity === 'high' ? '-3px' : '-2px'} 0 #ff0040,
      0 0 ${intensity === 'high' ? '10px' : '5px'} ${color}
    `,
    transform: `translateX(${Math.random() * 4 - 2}px)`,
    filter: 'brightness(1.2)'
  } : {};

  return (
    <span 
      className={`inline-block transition-all duration-75 ${className}`}
      style={glitchStyles}
      onMouseEnter={() => !continuous && setIsGlitching(true)}
      onMouseLeave={() => !continuous && setIsGlitching(false)}
    >
      {children}
    </span>
  );
}