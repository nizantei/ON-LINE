import React from 'react';
import { motion } from 'framer-motion';

export default function OfflineModal({ onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0d0d]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-[600px] border-2 border-[#ce923a] bg-[#1a1a1a] font-mono"
      >
        {/* Header */}
        <div className="bg-[#ce923a] px-6 py-3 flex items-center gap-3">
          <div className="w-4 h-4 bg-[#0d0d0d] border border-[#0d0d0d]"></div>
          <span className="text-[#0d0d0d] font-bold uppercase tracking-wider">ATTENTION</span>
        </div>

        {/* Content */}
        <div className="px-12 py-12 text-center space-y-6">
          <p className="text-[#ce923a] text-lg leading-relaxed">
            Our servers are currently offline.
          </p>
          <p className="text-[#ce923a] text-lg leading-relaxed">
            We are sorry for the inconvenience.
          </p>
          <p className="text-[#ce923a] text-lg leading-relaxed">
            We'll be back shortly.
          </p>

          {/* Confirm Button */}
          <div className="pt-6">
            <button
              onClick={onConfirm}
              className="px-8 py-2 border-2 border-[#ce923a] bg-transparent text-[#ce923a] uppercase tracking-wider font-mono text-sm hover:bg-[#ce923a] hover:text-[#0d0d0d] transition-all duration-200"
            >
              [CONFIRM]
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}