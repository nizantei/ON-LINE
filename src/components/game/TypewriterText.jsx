import React, { useState, useEffect, useRef } from 'react';

export default function TypewriterText({ text, delay = 0, speed = 20, onComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const typingIntervalRef = useRef(null);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    // Start continuous typing sound on first character
    if (displayedText.length === 0 && !hasStartedTyping && text.length > 0) {
      setHasStartedTyping(true);
      
      typingIntervalRef.current = setInterval(() => {
        window.gameSounds?.play('textTyping');
      }, 80);
    }

    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timer);
    } else if (displayedText.length === text.length && displayedText.length > 0) {
      // Stop typing sound
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
      
      if (onComplete) {
        onComplete();
      }
    }
  }, [displayedText, text, started, speed, onComplete, hasStartedTyping]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  return <>{displayedText}</>;
}