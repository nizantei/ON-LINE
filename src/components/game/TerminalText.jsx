import React, { useState, useEffect, useRef } from 'react';

export default function TerminalText({ text, speed = 50, onComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const typingIntervalRef = useRef(null);

  useEffect(() => {
    if (!hasStarted && text.length > 0) {
      setHasStarted(true);
      
      // Start continuous typing sound
      typingIntervalRef.current = setInterval(() => {
        window.gameSounds?.play('textTyping');
      }, 80);
    }
  }, [hasStarted, text]);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else if (displayedText.length === text.length && displayedText.length > 0) {
      // Stop typing sound
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
      
      if (onComplete) {
        onComplete();
      }
    }
  }, [displayedText, text, speed, onComplete]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, []);

  return <span>{displayedText}</span>;
}