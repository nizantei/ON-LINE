import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TerminalText from './TerminalText';

export default function IntroModal({ onConfirm }) {
  const [typingComplete, setTypingComplete] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState(0);

  return (
    <motion.div 
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#1a1a1a]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-xl w-full mx-4 relative z-[10003]">
        <div 
          className="border-2 border-[#ce923a] bg-[#0d0d0d] p-6"
          style={{
            boxShadow: '0 0 20px rgba(206, 146, 58, 0.3)',
            width: '600px',
            maxWidth: '90vw'
          }}
        >
          {/* Header */}
          <div className="flex items-end gap-3 mb-4 pb-3 border-b-2 border-[#ce923a]">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6969f72c821e326ef2d8ca69/d81a60c45_warning.png"
              alt="Warning"
              className="w-7 h-7 animate-[pulse_2s_ease-in-out_infinite]"
            />
            <span className="text-[#ce923a] font-mono text-sm tracking-wider uppercase glow-amber">
              NATIONAL ALERT
            </span>
          </div>

          {/* Message */}
          <div className="space-y-4 font-mono text-[#ce923a]">
            <div className="text-sm uppercase tracking-wide glow-amber">
              PUBLIC HEALTH NOTICE:
            </div>
            
            <div className="text-sm">
              {[
                "Due to a seasonal spike in flu cases, a mandatory 3-Day Lockdown is in effect starting today.",
                "This is a standard measure to help relieve hospital congestion.",
                "Please limit non-essential travel and remain indoors.",
                "Schools and offices will reopen on Monday."
              ].map((line, index) => (
                <div key={index} className="mb-3">
                  {index < activeLineIndex ? (
                    <span>{line}</span>
                  ) : index === activeLineIndex ? (
                    <TerminalText 
                      text={line}
                      speed={30}
                      onComplete={() => {
                        if (index === 3) {
                          setTypingComplete(true);
                        } else {
                          setActiveLineIndex(prev => prev + 1);
                        }
                      }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Confirm Button */}
          {typingComplete && (
            <motion.div 
              className="mt-6 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                onClick={onConfirm}
                className="px-8 py-3 border-2 border-[#ce923a] bg-transparent 
                         text-[#ce923a] font-mono text-sm tracking-widest uppercase
                         hover:bg-[#ce923a] hover:text-[#0d0d0d] transition-all duration-200 glow-amber"
              >
                [CONFIRM]
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}