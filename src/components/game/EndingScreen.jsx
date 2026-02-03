import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CHARACTERS } from './gameData';
import TypewriterText from './TypewriterText';
import { useCsvData } from '@/contexts/CsvDataProvider';

export default function EndingScreen({ characterStates, onRestart }) {
  const [completedCharacters, setCompletedCharacters] = useState([]);
  const [endings, setEndings] = useState({});
  const [loading, setLoading] = useState(true);
  const [allBoxesVisible, setAllBoxesVisible] = useState(false);
  const { endings: allEndings } = useCsvData();

  useEffect(() => {
    if (!allEndings || allEndings.length === 0) {
      setLoading(false);
      return;
    }

    // Match endings for each character
    const matchedEndings = {};

    Object.keys(characterStates).forEach(charId => {
      const state = characterStates[charId];

      // Find matching ending
      const matching = allEndings.find(e => {
        // Match character ID
        if (e.character_id !== charId) return false;

        // Match death condition (CSV has "TRUE"/"FALSE" strings)
        const csvIsDeadCondition = e.isDead_condition === 'TRUE';
        if (csvIsDeadCondition !== state.isDeceased) return false;

        // Match anxiety level condition (CSV has "X>75", "X<=75", or "anything")
        const anxietyCondition = e.anxietyLevel_condition;
        if (anxietyCondition && anxietyCondition !== 'anything') {
          // Parse expressions like "X>75" or "X<=75"
          if (anxietyCondition.includes('>')) {
            const threshold = parseInt(anxietyCondition.split('>')[1]);
            if (state.anxiety <= threshold) return false;
          } else if (anxietyCondition.includes('<=')) {
            const threshold = parseInt(anxietyCondition.split('<=')[1]);
            if (state.anxiety > threshold) return false;
          }
        }

        // Match day died condition (CSV has "DAY1"/"DAY2"/"DAY3" or "NULL"/"anything")
        if (state.isDeceased && e.hasDiedDay_condition && e.hasDiedDay_condition !== 'NULL' && e.hasDiedDay_condition !== 'anything') {
          const dayNumber = parseInt(e.hasDiedDay_condition.replace('DAY', ''));
          if (dayNumber !== state.dayDeceased) return false;
        }

        return true;
      });

      if (matching) {
        matchedEndings[charId] = matching;
      }
    });

    setEndings(matchedEndings);
    setLoading(false);
  }, [characterStates, allEndings]);

  const getStatusText = (charId) => {
    const ending = endings[charId];
    
    if (!ending) {
      return {
        statusPart: 'UNKNOWN',
        restOfTitle: '.',
        description: 'Status unavailable.'
      };
    }
    
    return {
      statusPart: ending.headline_content,
      restOfTitle: '',
      description: ending.text_content
    };
  };

  const characterList = [
    { id: 'mom', name: 'Your Mom', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6969f72c821e326ef2d8ca69/0bfe9bfbc_mom_end.png' },
    { id: 'boyfriend', name: 'Your Partner', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6969f72c821e326ef2d8ca69/ca5d57472_boyfriend_end.png' },
    { id: 'bestie', name: 'Your Best Friend', image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6969f72c821e326ef2d8ca69/47e3baf47_bestie_end.png' }
  ];

  const handleCharacterComplete = (charId) => {
    if (!completedCharacters.includes(charId)) {
      setCompletedCharacters([...completedCharacters, charId]);
    }
  };

  // Wait for all boxes to appear before starting typing
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setAllBoxesVisible(true);
      }, 900); // All 3 boxes appear (0ms, 300ms, 600ms) + small buffer
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#1a1a1a]">
        <div className="text-[#ce923a] font-mono">LOADING...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#1a1a1a]">
      <div className="w-full max-w-3xl mx-8 relative z-[10003]">
        <div className="border-2 border-[#ce923a] bg-[#1a1a1a] font-mono">
          {/* Header */}
          <div className="bg-[#0d0d0d] px-6 py-3 border-b-2 border-[#ce923a]">
            <span className="text-[#ce923a] font-bold uppercase tracking-wider">STATUS</span>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {characterList.map((char, index) => {
              const status = getStatusText(char.id);
              const state = characterStates[char.id];

              const shouldStartTyping = allBoxesVisible && (index === 0 || completedCharacters.includes(characterList[index - 1].id));

              return (
                <motion.div
                  key={char.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.3 }}
                  className="border border-[#ce923a] bg-[#0d0d0d] p-4"
                >
                  <div className="flex gap-4 items-center">
                    {/* Portrait */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 border border-[#ce923a] bg-[#0a0a0a] overflow-hidden">
                        {char.image ? (
                          <img 
                            src={char.image} 
                            alt={char.name}
                            className={`w-full h-full object-contain object-center ${state?.isDeceased ? 'opacity-30 grayscale' : ''}`}
                          />
                        ) : (
                          <div className={`w-full h-full flex items-center justify-center text-3xl ${state?.isDeceased ? 'opacity-30 grayscale' : ''}`}>
                            {CHARACTERS[char.id].avatar}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status Text */}
                    <div className="flex-1">
                      <h3 className="text-[#ce923a] text-base mb-2">
                        {shouldStartTyping ? (
                          <>
                            <TypewriterText 
                              text={`${char.name} is `} 
                              delay={index * 300}
                              speed={30}
                            />
                            <span className="font-bold">
                              <TypewriterText 
                                text={status.statusPart} 
                                delay={index * 300 + (char.name.length + 4) * 30}
                                speed={30}
                              />
                            </span>
                            <TypewriterText 
                              text={status.restOfTitle} 
                              delay={index * 300 + (char.name.length + 4 + status.statusPart.length) * 30}
                              speed={30}
                            />
                          </>
                        ) : null}
                      </h3>
                      <p className="text-[#ce923a] text-xs leading-relaxed">
                        {shouldStartTyping && (
                          <TypewriterText 
                            text={status.description}
                            delay={index * 300 + (char.name.length + 4 + status.statusPart.length + status.restOfTitle.length) * 30 + 200}
                            speed={25}
                            onComplete={() => handleCharacterComplete(char.id)}
                          />
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Try Again Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center pt-4"
            >
              <button
                onClick={onRestart}
                className="px-8 py-2 border-2 border-[#ce923a] bg-transparent text-[#ce923a] uppercase tracking-wider font-mono text-sm hover:bg-[#ce923a] hover:text-[#0d0d0d] transition-all duration-200"
              >
                [TRY AGAIN?]
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}