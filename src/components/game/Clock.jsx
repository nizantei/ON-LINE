import React, { useEffect, useState } from 'react';
import { Clock as ClockIcon } from 'lucide-react';
import { GAME_CONFIG } from './gameData';

export default function Clock({ gameTime, isUrgent = false }) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (isUrgent) {
      const interval = setInterval(() => setBlink(b => !b), 500);
      return () => clearInterval(interval);
    }
  }, [isUrgent]);

  const formatTime = (time) => {
    const hours = Math.floor(time);
    return `${hours.toString().padStart(2, '0')}:00`;
  };

  return (
    <span className="font-mono text-xs text-[#ce923a] uppercase glow-amber">
      {formatTime(gameTime)}
    </span>
  );
}