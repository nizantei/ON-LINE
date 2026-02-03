import React from 'react';
import { motion } from 'framer-motion';

export default function ChatOptions({ options, onSelect }) {
  const handleSelect = (option) => {
    window.gameSounds?.play('click');
    onSelect(option);
  };

  return (
    <motion.div
      className="md:space-y-2 space-y-1.5 md:p-4 p-2 border-t border-[#989ad5] bg-[#0d0d0d]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {options.map((option, index) => (
        <motion.button
          key={option.id}
          onClick={() => handleSelect(option)}
          className="w-full text-left md:px-4 px-3 md:py-3 py-2 border border-[#989ad5] font-mono md:text-sm text-xs
                     transition-all duration-200 group hover:border-[#989ad5] hover:bg-[#989ad5]/10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ x: 5 }}
        >
          <div className="flex items-center md:gap-3 gap-2">
            <span className="md:text-xs text-[10px] text-[#989ad5]">
              [{index + 1}]
            </span>
            <span className="text-[#989ad5] group-hover:text-[#fff] transition-colors">
              {option.text}
            </span>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}