import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// Shared audio context
let audioContext = null;
let activeSources = [];

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Resume context if suspended
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
};

const stopAllSounds = () => {
  activeSources.forEach(source => {
    try {
      source.stop();
    } catch (e) {
      // Already stopped
    }
  });
  activeSources = [];
};

// Generate retro beep sounds
const generateBeep = (frequency, duration, type = 'sine') => {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
  
  activeSources.push(oscillator);
  setTimeout(() => {
    activeSources = activeSources.filter(s => s !== oscillator);
  }, duration * 1000);
};

// Generate static/white noise
const generateStatic = (duration, volume = 0.02) => {
  const ctx = getAudioContext();
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * volume;
  }
  
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start();
  
  activeSources.push(source);
  setTimeout(() => {
    activeSources = activeSources.filter(s => s !== source);
  }, duration * 1000);
};

export const playSound = {
  messageReceived: () => generateBeep(750, 0.12),
  click: () => generateBeep(550, 0.06),
  dayTransition: () => {
    generateBeep(150, 0.3, 'square');
    setTimeout(() => generateBeep(180, 0.35, 'square'), 300);
    setTimeout(() => generateBeep(220, 0.4, 'square'), 600);
  },
  notification: () => {
    generateBeep(950, 0.12);
    setTimeout(() => generateBeep(1150, 0.12), 100);
  },
  textTypingStart: () => generateBeep(350, 0.08),
  textTypingEnd: () => generateBeep(500, 0.1),
  textTyping: () => generateBeep(400, 0.03),
  ambient: () => generateStatic(2, 0.008),
  error: () => {
    generateBeep(200, 0.15);
    setTimeout(() => generateBeep(180, 0.15), 150);
  }
};

export default function SoundManager({ enabled = true }) {
  const ambientIntervalRef = useRef(null);

  // Ambient CRT hum loop with external mute check
  useEffect(() => {
    if (enabled) {
      // Play ambient every 2 seconds for continuous background
      ambientIntervalRef.current = setInterval(() => {
        if (!window.gameAudioMuted) {
          playSound.ambient();
        }
      }, 2000);
      
      // Play initial ambient
      if (!window.gameAudioMuted) {
        playSound.ambient();
      }
    }

    return () => {
      if (ambientIntervalRef.current) {
        clearInterval(ambientIntervalRef.current);
      }
    };
  }, [enabled]);

  // Stop all sounds when muted
  useEffect(() => {
    if (window.gameAudioMuted) {
      stopAllSounds();
    }
  }, []);

  // Expose global sound control with external mute control
  useEffect(() => {
    const checkExternalMute = () => {
      return window.gameAudioMuted || false;
    };

    window.gameSounds = {
      play: (soundName) => {
        if (!checkExternalMute() && playSound[soundName]) {
          playSound[soundName]();
        }
      },
      stopAll: stopAllSounds,
      muted: checkExternalMute()
    };
  }, []);

  return null;
}