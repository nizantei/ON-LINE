import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Users } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatOptions from './ChatOptions';
import TypingIndicator from './TypingIndicator';
import GlitchText from './GlitchText';

import { CHARACTERS } from './gameData';

export default function Chat({ 
  activeCharacter, 
  setActiveCharacter,
  chatHistory,
  pendingMessage,
  onSelectOption,
  characterStates,
  typingCharacters,
  unreadMessages,
  onCharacterInteract
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleCharacterSelect = (charId) => {
    setActiveCharacter(charId);
    if (onCharacterInteract) {
      onCharacterInteract(charId);
    }
  };

  const character = CHARACTERS[activeCharacter];
  const history = chatHistory[activeCharacter] || [];

  return (
    <div className="h-full flex bg-[#0d0d0d]">
      {/* Sidebar - Character List */}
      <div className="md:w-64 w-16 flex-shrink-0 border-r border-[#989ad5] bg-[#0d0d0d] flex flex-col glow-purple">
        <div className="md:p-4 p-2 border-b border-[#989ad5]">
          <div className="font-mono md:text-xs text-[8px] text-[#989ad5] uppercase md:block hidden">
            CONTACTS
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {Object.values(CHARACTERS).map((char) => {
            const state = characterStates[char.id];
            const isActive = activeCharacter === char.id;
            const hasUnread = (unreadMessages?.[char.id] || 0) > 0;
            
            return (
              <button
                key={char.id}
                onClick={() => handleCharacterSelect(char.id)}
                className={`w-full md:px-3 px-1 md:py-3 py-2 text-left border-b border-[#989ad5]/30 transition-all ${
                  isActive ? 'bg-[#989ad5]/10' : 'hover:bg-[#989ad5]/5'
                }`}
              >
                <div className="flex items-center md:gap-3 gap-1">
                  <div className="md:w-8 md:h-8 w-10 h-10 flex items-center justify-center border border-[#989ad5] overflow-hidden flex-shrink-0">
                    {char.id === 'mom' ? (
                      <img 
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6969f72c821e326ef2d8ca69/be1b11625_mom.jpg" 
                        alt={char.name}
                        className="w-full h-full object-cover"
                      />
                    ) : char.id === 'boyfriend' ? (
                      <img 
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6969f72c821e326ef2d8ca69/a04452180_boyfriend.jpg" 
                        alt={char.name}
                        className="w-full h-full object-cover"
                      />
                    ) : char.id === 'bestie' ? (
                      <img 
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6969f72c821e326ef2d8ca69/efd74e3bb_bestie.png" 
                        alt={char.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-lg">{char.avatar}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 md:block hidden">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm truncate text-[#989ad5] uppercase">
                        {char.id === 'boyfriend' ? 'My Love' : char.id === 'bestie' ? 'Bestie' : char.id === 'mom' ? 'Mom' : char.name}
                      </span>
                      {hasUnread && !state?.isDeceased && (
                        <span className="w-2 h-2 bg-[#989ad5] animate-pulse" />
                      )}
                    </div>
                    <span className="text-xs font-mono text-[#989ad5]/60 uppercase">
                      {state?.isDeceased && !state?.pendingDeath ? 'OFFLINE' : 'ONLINE'}
                    </span>
                  </div>
                  {/* Mobile: show unread indicator */}
                  {hasUnread && !state?.isDeceased && (
                    <span className="w-2 h-2 bg-[#989ad5] animate-pulse md:hidden absolute top-1 right-1" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Status */}
        <div className="md:p-4 p-2 border-t border-[#989ad5] md:text-xs text-[8px] font-mono text-[#989ad5] uppercase md:block hidden">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#989ad5]" />
            <span>3 contacts</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col glow-purple">
        {/* Chat Header */}
        <div className="flex-shrink-0 md:px-6 px-3 md:py-4 py-2 border-b border-[#989ad5] bg-[#0d0d0d]">
          <div className="flex items-center justify-between">
            <div className="flex items-center md:gap-3 gap-2">
              <div className="md:w-10 md:h-10 w-8 h-8 flex items-center justify-center border border-[#989ad5] overflow-hidden">
                {activeCharacter === 'mom' ? (
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6969f72c821e326ef2d8ca69/be1b11625_mom.jpg" 
                    alt={character.name}
                    className="w-full h-full object-cover"
                  />
                ) : activeCharacter === 'boyfriend' ? (
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6969f72c821e326ef2d8ca69/a04452180_boyfriend.jpg" 
                    alt={character.name}
                    className="w-full h-full object-cover"
                  />
                ) : activeCharacter === 'bestie' ? (
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6969f72c821e326ef2d8ca69/efd74e3bb_bestie.png" 
                    alt={character.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl">{character.avatar}</span>
                )}
              </div>
              <div>
                <div className="font-mono md:text-sm text-xs text-[#989ad5] uppercase">
                  {activeCharacter === 'boyfriend' ? 'My Love' : activeCharacter === 'bestie' ? 'Bestie' : activeCharacter === 'mom' ? 'Mom' : character.name}
                </div>
                <div className="md:text-xs text-[10px] font-mono text-[#989ad5]/60 uppercase">
                  {characterStates[activeCharacter]?.isDeceased && !characterStates[activeCharacter]?.pendingDeath ? 'OFFLINE' : 'ACTIVE NOW'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages - WhatsApp style history */}
        <div className="flex-1 overflow-y-auto md:p-4 p-2 md:space-y-4 space-y-2 scrollbar-thin">
          <AnimatePresence>
            {history.map((item, index) => {
              // Day divider
              if (item.type === 'divider') {
                return (
                  <motion.div
                    key={`divider-${item.day}`}
                    className="flex items-center justify-center py-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-px bg-[#989ad5] flex-1 w-16" />
                      <span className="font-mono text-xs text-[#989ad5] tracking-wider uppercase">
                        DAY {item.day}
                      </span>
                      <div className="h-px bg-[#989ad5] flex-1 w-16" />
                    </div>
                  </motion.div>
                );
              }
              
              // Regular message
              return (
                <ChatMessage 
                  key={`${item.id}-${index}`}
                  message={item}
                  isPlayer={item.isPlayer}
                  characterColor={character.color}
                />
              );
            })}
          </AnimatePresence>
          
          {/* Typing indicator */}
          {typingCharacters?.[activeCharacter] && (
            <TypingIndicator characterColor={character.color} />
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Response Options */}
        {pendingMessage?.[activeCharacter] && (
          (!characterStates[activeCharacter]?.isDeceased && !characterStates[activeCharacter]?.pendingDeath) || 
          (characterStates[activeCharacter]?.isDeceased && pendingMessage[activeCharacter]?.isPlayerInitiated)
        ) && (
          <ChatOptions
            options={pendingMessage[activeCharacter].options}
            onSelect={onSelectOption}
          />
        )}


      </div>
    </div>
  );
}