import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Shield, AlertTriangle, User } from 'lucide-react';
import GlitchText from './GlitchText';
import MetadataModal from './MetadataModal';
import { useCsvData } from '@/contexts/CsvDataProvider';

export default function FeedPost({ post, index }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const { getMediaUrl } = useCsvData();

  const handleSourceClick = () => {
    const data = {
      title: 'Cross-Reference',
      content: post.factCheck?.content || 'No data available.'
    };
    
    setModalData(data);
    setModalOpen(true);
  };

  const isUrgent = post.author.includes('EMERGENCY') || post.author.includes('BROADCAST');
  const isSuspicious = post.factCheck?.reliability?.includes('FAKE') || 
                       post.factCheck?.reliability?.includes('Unverif');

  return (
    <>
      <motion.article
        className="border border-[#9cdce5] bg-[#0d0d0d] glow-blue"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        {/* Header */}
        <div className="md:px-4 px-3 md:py-4 py-3 border-b border-[#9cdce5]">
          <div className="flex items-center justify-between">
            <div className="flex items-center md:gap-3 gap-2">
              <span className="font-mono md:text-sm text-xs text-[#9cdce5] uppercase">
                {post.author}
              </span>
            </div>

            <span className="font-mono md:text-xs text-[10px] text-[#9cdce5]">{post.timestamp}</span>
          </div>
        </div>

        {/* Content */}
        <div className="md:p-4 p-3">
          <p className="font-mono md:text-sm text-xs leading-relaxed text-[#9cdce5] mb-3">
            {post.content}
          </p>

            {/* Post Image */}
            {post.imageUrl && (
              <div className="mb-3 md:w-4/5 w-full mx-auto aspect-video flex items-center justify-center overflow-hidden bg-[#1a1a1a] border border-[#9cdce5]/30">
                <img
                  src={getMediaUrl(post.imageUrl)}
                  alt="Post image"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Source URL - Clickable */}
          {post.sourceUrl && (
            <button
              onClick={handleSourceClick}
              className="flex items-center gap-1 text-[#9cdce5] font-mono md:text-xs text-[9px] group whitespace-nowrap overflow-hidden"
            >
              <span className="flex-shrink-0">Read More:</span>
              <span className="underline group-hover:no-underline truncate">
                {post.sourceUrl}
              </span>
            </button>
          )}
        </div>
      </motion.article>

      <MetadataModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={modalData}
      />
    </>
  );
}