import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText, Image as ImageIcon, RotateCcw } from 'lucide-react';
import { useGameContent } from './GameContentContext';

export default function AdminOverlay({ isOpen, onClose }) {
  const { uploadFeedCSV, uploadChatCSV, uploadMedia, mediaFiles, resetAllData } = useGameContent();
  const [status, setStatus] = useState('');

  const handleFeedUpload = async (e, day) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setStatus(`Uploading Feed Day ${day}...`);
      const count = await uploadFeedCSV(file, day);
      setStatus(`✓ Uploaded ${count} feed posts for Day ${day}`);
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus(`✗ Error: ${error.message}`);
    }
  };

  const handleChatUpload = async (e, day) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setStatus(`Uploading Chat Day ${day}...`);
      const count = await uploadChatCSV(file, day);
      setStatus(`✓ Uploaded ${count} chat messages for Day ${day}`);
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus(`✗ Error: ${error.message}`);
    }
  };

  const handleMediaUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      setStatus(`Uploading ${files.length} media files...`);
      await uploadMedia(files);
      setStatus(`✓ Uploaded ${files.length} media files`);
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus(`✗ Error: ${error.message}`);
    }
  };

  const handleReset = async () => {
    if (!confirm('Reset all custom data? This cannot be undone.')) return;
    
    try {
      setStatus('Resetting all data...');
      await resetAllData();
      setStatus('✓ All data reset to defaults');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus(`✗ Error: ${error.message}`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/90 z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Overlay Panel */}
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="bg-[#0d0d0d] border-2 border-[#ce923a] w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#ce923a]">
                <h1 className="text-2xl text-[#ce923a] uppercase tracking-wider">Admin Dashboard</h1>
                <button
                  onClick={onClose}
                  className="text-[#ce923a] border border-[#ce923a] p-2 hover:bg-[#ce923a] hover:text-[#0d0d0d]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 text-[#ce923a]">
                {/* Status Message */}
                {status && (
                  <div className="mb-4 p-3 border border-[#ce923a] bg-[#ce923a]/10 font-mono text-sm">
                    {status}
                  </div>
                )}

                {/* Feed CSV Upload Section */}
                <div className="mb-8">
                  <h2 className="text-xl uppercase mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Feed Posts CSV
                  </h2>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map(day => (
                      <div key={day} className="border border-[#ce923a] p-4">
                        <label className="block">
                          <div className="text-sm uppercase mb-2">Day {day}</div>
                          <input
                            type="file"
                            accept=".csv"
                            onChange={(e) => handleFeedUpload(e, day)}
                            className="w-full text-xs border border-[#ce923a] p-2 bg-transparent"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat CSV Upload Section */}
                <div className="mb-8">
                  <h2 className="text-xl uppercase mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Chat Dialogues CSV (All Characters)
                  </h2>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map(day => (
                      <div key={day} className="border border-[#ce923a] p-4">
                        <label className="block">
                          <div className="text-sm uppercase mb-2">Day {day}</div>
                          <div className="text-xs text-[#ce923a]/60 mb-2">Upload CSV with "Char" column</div>
                          <input
                            type="file"
                            accept=".csv"
                            onChange={(e) => handleChatUpload(e, day)}
                            className="w-full text-xs border border-[#ce923a] p-2 bg-transparent"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Media Upload Section */}
                <div className="mb-8">
                  <h2 className="text-xl uppercase mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    Media Assets
                  </h2>
                  <div className="border border-[#ce923a] p-4">
                    <label className="block cursor-pointer">
                      <div className="text-sm uppercase mb-2">Upload Images</div>
                      <div className="border-2 border-dashed border-[#ce923a] p-8 text-center hover:bg-[#ce923a]/5">
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <div className="text-xs">Click or drag files here</div>
                      </div>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleMediaUpload}
                        className="hidden"
                      />
                    </label>
                    {mediaFiles.length > 0 && (
                      <div className="mt-4">
                        <div className="text-xs uppercase mb-2">Uploaded Files ({mediaFiles.length})</div>
                        <div className="space-y-1 max-h-32 overflow-y-auto text-xs">
                          {mediaFiles.map(file => (
                            <div key={file.name} className="text-[#ce923a]/60">{file.name}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reset Button */}
                <div className="border-t border-[#ce923a] pt-6">
                  <button
                    onClick={handleReset}
                    className="w-full px-6 py-3 border border-[#ce923a] bg-transparent text-[#ce923a] uppercase flex items-center justify-center gap-2 hover:bg-[#ce923a] hover:text-[#0d0d0d]"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset All Data to Defaults
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}