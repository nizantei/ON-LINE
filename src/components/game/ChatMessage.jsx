import React from 'react';
import { motion } from 'framer-motion';
import { SquareX } from 'lucide-react';

export default function ChatMessage({ message, isPlayer, characterColor }) {
  const isFailed = message.meta?.statusIcon === 'failed';
  
  return (
    <motion.div
      className={`flex ${isPlayer ? 'justify-end' : 'justify-start'} px-4`}
      initial={{ opacity: 0, y: 10, x: isPlayer ? 10 : -10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
    >
      <div className={`flex items-start gap-2 ${isPlayer ? 'flex-row-reverse' : 'flex-row'}`}>
        {isFailed && isPlayer && (
          <div className="w-4 h-4 border border-[#989ad5] flex items-center justify-center flex-shrink-0 text-[#989ad5] text-xs font-bold mt-1">!</div>
        )}
        <div
          className={`md:px-4 px-3 md:py-3 py-2 font-mono md:text-sm text-xs ${
            isPlayer 
              ? 'bg-[#989ad5] border border-[#989ad5] text-[#0d0d0d]' 
              : 'bg-[#0d0d0d] border border-[#989ad5] text-[#989ad5]'
          } ${isFailed ? 'opacity-70' : ''}`}
          style={{ maxWidth: '80%' }}
        >
          <p className="leading-relaxed break-words">{message.text}</p>
        </div>
      </div>
    </motion.div>
  );
}