import React from 'react';
import { motion } from 'framer-motion';

export default function TypingIndicator({ characterColor }) {
  return (
    <motion.div
      className="flex justify-start"
      initial={{ opacity: 0, y: 10, x: -10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
    >
      <div className="px-4 py-3 font-mono text-sm bg-[#0d0d0d] border border-[#989ad5]">
        <div className="flex items-center gap-1">
          <motion.span
            className="w-2 h-2 bg-[#989ad5] rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="w-2 h-2 bg-[#989ad5] rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span
            className="w-2 h-2 bg-[#989ad5] rounded-full"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
}