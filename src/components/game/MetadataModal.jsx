import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';
export default function MetadataModal({ isOpen, onClose, data }) {

  if (!data || !data.content) return null;

  const getReliabilityColor = (reliability) => {
    if (reliability.includes('High') || reliability.includes('Verified')) return '#00ff41';
    if (reliability.includes('Moderate')) return '#ffb000';
    if (reliability.includes('FAKE') || reliability.includes('Unverif')) return '#ff3333';
    return '#888';
  };

  const getReliabilityIcon = (reliability) => {
    if (reliability.includes('High') || reliability.includes('Verified')) {
      return <CheckCircle className="w-4 h-4" />;
    }
    if (reliability.includes('FAKE')) {
      return <AlertTriangle className="w-4 h-4" />;
    }
    return <HelpCircle className="w-4 h-4" />;
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl bg-[#0d0d0d] border-2 border-[#9cdce5] z-50 glow-blue"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#9cdce5] bg-[#0d0d0d]">
              <div className="font-mono text-sm text-[#9cdce5] uppercase tracking-wider">
                {data.title || 'RAW DATA'}
              </div>
              <button
                onClick={handleClose}
                className="text-[#9cdce5] border border-[#9cdce5] bg-transparent w-6 h-6 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content - Raw Text Only */}
            <div className="p-6 font-mono text-sm text-[#9cdce5] leading-relaxed max-h-[60vh] overflow-y-auto scrollbar-thin">
              <p className="whitespace-pre-wrap">{data.content}</p>
            </div>


          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}