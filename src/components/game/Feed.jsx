import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Radio, RefreshCw } from 'lucide-react';
import FeedPost from './FeedPost';
import GlitchText from './GlitchText';

export default function Feed({ posts, currentDay, feedScrollRef }) {
  const scrollContainerRef = useRef(null);

  // Restore scroll position on mount
  useLayoutEffect(() => {
    if (scrollContainerRef.current && feedScrollRef) {
      scrollContainerRef.current.scrollTop = feedScrollRef.current;
    }
  }, [feedScrollRef]);

  // Save scroll position on scroll
  const handleScroll = (e) => {
    if (feedScrollRef) {
      feedScrollRef.current = e.target.scrollTop;
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0d0d0d]">
      {/* Feed Content */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto md:p-6 p-3 scrollbar-thin"
      >
        <div className="max-w-2xl mx-auto md:space-y-4 space-y-3">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="font-mono text-[#444] text-sm">
                <p>Waiting for updates...</p>
                <p className="mt-2 animate-pulse">▌</p>
              </div>
            </div>
          ) : (
            <>
              {posts.map((post, index) => (
                <FeedPost key={post.id} post={post} index={index} />
              ))}
            
              {/* End marker */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}