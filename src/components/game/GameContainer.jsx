import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, MessageCircle, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import CRTOverlay from './CRTOverlay';
import IntroModal from './IntroModal';
import EndingScreen from './EndingScreen';
import DayTransition from './DayTransition';
import OfflineModal from './OfflineModal';
import Feed from './Feed';
import Chat from './Chat';
import Clock from './Clock';
import GlitchText from './GlitchText';
import { useCsvData } from '@/contexts/CsvDataProvider';
import { CHARACTERS, GAME_CONFIG } from './gameData';
import SoundManager from './SoundManager';

function GameContent() {
  const { feedPosts, chatData } = useCsvData();

  // Audio state
  const [isMuted, setIsMuted] = useState(false);

  // Sync mute state to global
  useEffect(() => {
    window.gameAudioMuted = isMuted;
    if (isMuted) {
      window.gameSounds?.stopAll();
    }
  }, [isMuted]);

  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [activeTab, setActiveTab] = useState('feed');
  const [activeCharacter, setActiveCharacter] = useState('mom');
  const [showDayTransition, setShowDayTransition] = useState(true); // Show on Day 1
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const [typingCharacters, setTypingCharacters] = useState({});
  const [debugMode, setDebugMode] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const initialized = useRef(false);
  const feedScrollRef = useRef(0);
  const [visiblePostCount, setVisiblePostCount] = useState(3);
  const [hasNewFeedPosts, setHasNewFeedPosts] = useState(false);
  const activeTabRef = useRef(activeTab);
  const activeCharacterRef = useRef(activeCharacter);
  
  // Data state
  const [unlockedPosts, setUnlockedPosts] = useState([]);
  const [chatHistory, setChatHistory] = useState({
    mom: [],
    boyfriend: [],
    bestie: []
  });
  const [pendingMessages, setPendingMessages] = useState({
    mom: null,
    boyfriend: null,
    bestie: null
  });
  const [characterStates, setCharacterStates] = useState({
    mom: { anxiety: CHARACTERS.mom.baseAnxiety, isDeceased: false, dayDeceased: null, pendingDeath: false },
    boyfriend: { anxiety: CHARACTERS.boyfriend.baseAnxiety, isDeceased: false, dayDeceased: null, pendingDeath: false },
    bestie: { anxiety: CHARACTERS.bestie.baseAnxiety, isDeceased: false, dayDeceased: null, pendingDeath: false }
  });
  const [interactedCharacters, setInteractedCharacters] = useState({
    mom: false,
    boyfriend: false,
    bestie: false
  });
  const [unreadMessages, setUnreadMessages] = useState({
    mom: 0,
    boyfriend: 0,
    bestie: 0
  });
  const [finalMessagesCompleted, setFinalMessagesCompleted] = useState({
    mom: false,
    boyfriend: false,
    bestie: false
  });
  const finalCompletionCountRef = useRef(0);



  // Keep refs in sync with state
  useEffect(() => {
    activeTabRef.current = activeTab;
    activeCharacterRef.current = activeCharacter;
  }, [activeTab, activeCharacter]);

  // Debug mode toggle (Shift+D)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.shiftKey && e.key === 'D') {
        setDebugMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Debug mode toggle (Shift+D)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.shiftKey && e.key === 'D') {
        setShowDebug(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Keyboard shortcuts: E for ending screen, R for restart
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'e' || e.key === 'E') {
        setGameEnded(true);
      }
      if (e.key === 'r' || e.key === 'R') {
        handleRestart();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Check if all characters are completed for current day
  const checkDayCompletion = useCallback(() => {
    console.log(`[Day Completion Check] Count: ${finalCompletionCountRef.current}`);
    
    if (finalCompletionCountRef.current === 3) {
      console.log(`[Day ${currentDay}] All 3 characters completed their final sequences`);
      
      // Reset counter
      finalCompletionCountRef.current = 0;
      setFinalMessagesCompleted({ mom: false, boyfriend: false, bestie: false });
      
      if (currentDay < 3) {
        console.log(`[Day ${currentDay}] Triggering transition to Day ${currentDay + 1}`);
        setShowDayTransition(true);
      } else {
        console.log('[Day 3] Game complete, showing offline modal');
        setShowOfflineModal(true);
      }
    }
  }, [currentDay]);

  // Monitor for day completion
  useEffect(() => {
    if (gameStarted && !gameEnded && !showDayTransition && !showOfflineModal) {
      checkDayCompletion();
    }
  }, [gameStarted, gameEnded, showDayTransition, showOfflineModal, finalMessagesCompleted, checkDayCompletion]);

  // Reset visible post count when day changes
  useEffect(() => {
    if (gameStarted && !showDayTransition) {
      setVisiblePostCount(3);
    }
  }, [currentDay, gameStarted, showDayTransition]);

  // Progressive post loading timer
  useEffect(() => {
    if (!gameStarted || gameEnded || showDayTransition || showOfflineModal) return;

    const currentDayPosts = unlockedPosts.filter(p => p.day === currentDay);
    
    if (currentDayPosts.length <= visiblePostCount) return;

    const timer = setTimeout(() => {
      setVisiblePostCount(prev => prev + 1);
      // Set notification if user is not on feed tab
      if (activeTab !== 'feed') {
        setHasNewFeedPosts(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [gameStarted, gameEnded, showDayTransition, showOfflineModal, unlockedPosts, currentDay, visiblePostCount, activeTab]);

  // Send initial messages on game start
  const sendInitialMessages = useCallback(() => {
    const dayKey = `day${currentDay}`;

    console.log(`[sendInitialMessages] Loading messages for Day ${currentDay}`);

    Object.keys(CHARACTERS).forEach(charId => {
      // Check for deceased or no messages
      const isDead = characterStates[charId]?.isDeceased;
      const messages = chatData[charId]?.[dayKey];
      const hasNoMessages = !messages || messages.length === 0;
      
      // Check for player-initiated actions
      const playerActions = chatData[charId]?.playerInitiatedActions?.[dayKey];
      
      // Check if player-initiated action condition is met
      if (playerActions && playerActions.length > 0) {
        const action = playerActions[0];
        if (action.condition) {
          const conditionMatch = action.condition.match(/lethal_day_(\d+)/);
          if (conditionMatch) {
            const triggerDay = parseInt(conditionMatch[1]);
            const dayDeceased = characterStates[charId]?.dayDeceased;
            
            // If character died on triggerDay, show player options
            if (dayDeceased === triggerDay) {
              console.log(`[sendInitialMessages] ${charId}: Showing player-initiated options for Day ${currentDay}`);
              setPendingMessages(prev => ({
                ...prev,
                [charId]: {
                  id: action.actionId,
                  text: '',
                  options: action.options,
                  isPlayerInitiated: true
                }
              }));
              
              setFinalMessagesCompleted(prev => {
                if (!prev[charId]) {
                  finalCompletionCountRef.current += 1;
                  console.log(`[Auto-Complete] ${charId} done (player-initiated). Count: ${finalCompletionCountRef.current}/3`);
                  return { ...prev, [charId]: true };
                }
                return prev;
              });
              return;
            }
          }
        }
      }

      // Auto-complete deceased or empty characters
      if (isDead || hasNoMessages) {
        console.log(`[sendInitialMessages] ${charId}: Auto-completing (Dead: ${isDead}, NoMsgs: ${hasNoMessages})`);
        
        setFinalMessagesCompleted(prev => {
          // Only increment if not already marked for this day
          if (!prev[charId]) {
            finalCompletionCountRef.current += 1;
            console.log(`[Auto-Complete] ${charId} done. Count: ${finalCompletionCountRef.current}/3`);
            return { ...prev, [charId]: true };
          }
          return prev;
        });
        return;
      }

      console.log(`[sendInitialMessages] ${charId}: ${messages.length} messages available`);

      // Send first message with triggerTime or without
      const firstMessage = messages.find(m => m.triggerTime === null || m.triggerTime === undefined) || messages[0];

      if (firstMessage && !chatHistory[charId].some(m => m.id === firstMessage.id)) {
        setTimeout(() => {
          setTypingCharacters(prev => ({ ...prev, [charId]: true }));

          setTimeout(() => {
            setTypingCharacters(prev => ({ ...prev, [charId]: false }));

            setChatHistory(prev => ({
              ...prev,
              [charId]: [...prev[charId], { ...firstMessage, isPlayer: false }]
            }));

            window.gameSounds?.play('messageReceived');

            // Mark as unread if not on chat tab or not active character
            if (activeTabRef.current !== 'chat' || activeCharacterRef.current !== charId) {
              console.log('[Unread] Incrementing unread for:', charId, 'activeTab:', activeTabRef.current, 'activeChar:', activeCharacterRef.current);
              window.gameSounds?.play('notification');
              setUnreadMessages(prev => ({
                ...prev,
                [charId]: (prev[charId] || 0) + 1
              }));
            }

            if (firstMessage.options) {
              setPendingMessages(prev => ({
                ...prev,
                [charId]: firstMessage
              }));
            }
          }, 1000);
        }, 500);
      }
    });
  }, [currentDay, chatData, chatHistory, activeTab, activeCharacter, characterStates]);

  // Initialize game - prevent double initialization
  useEffect(() => {
    if (gameStarted && !gameEnded && !initialized.current && !showDayTransition && currentDay > 0) {
      initialized.current = true;
      
      console.log(`[Initialize] Day ${currentDay} initialization started`);
      
      // Load initial feed posts for this day
      const initialPosts = feedPosts.filter(p => p.day === currentDay && !p.unlockCondition);
      setUnlockedPosts(initialPosts);
      
      // Send initial messages after a short delay
      setTimeout(() => {
        console.log(`[Initialize] Day ${currentDay} sending initial messages`);
        sendInitialMessages();
      }, 300);
    }
  }, [gameStarted, gameEnded, showDayTransition, currentDay, feedPosts, sendInitialMessages]);

  // Handle day transition completion
  const handleDayTransitionComplete = useCallback(() => {
    // If this is the initial Day 1 transition, don't increment
    if (currentDay === 1 && chatHistory.mom.length === 0) {
      console.log('[Day Transition] Starting Day 1');
      setShowDayTransition(false);
      return;
    }

    // Otherwise, we're transitioning to the next day
    const nextDay = currentDay + 1;
    console.log(`[Day Transition] Advancing from Day ${currentDay} to Day ${nextDay}`);

    // Convert pending deaths to actual deaths
    setCharacterStates(prev => {
      const newStates = { ...prev };
      Object.keys(newStates).forEach(charId => {
        if (newStates[charId].pendingDeath && !newStates[charId].isDeceased) {
          newStates[charId] = {
            ...newStates[charId],
            isDeceased: true,
            pendingDeath: false
          };
        }
      });
      return newStates;
    });

    // Add day dividers BEFORE changing day
    setChatHistory(prev => {
      const newHistory = { ...prev };
      Object.keys(newHistory).forEach(charId => {
        newHistory[charId] = [
          ...newHistory[charId],
          { type: 'divider', day: nextDay }
        ];
      });
      return newHistory;
    });

    // Reset interaction tracking for new day
    setInteractedCharacters({
      mom: false,
      boyfriend: false,
      bestie: false
    });

    // Reset final message completion tracking
    setFinalMessagesCompleted({
      mom: false,
      boyfriend: false,
      bestie: false
    });
    finalCompletionCountRef.current = 0;

    // Reset initialized flag for new day
    initialized.current = false;

    // Update day AFTER divider is added
    setCurrentDay(nextDay);

    // Load new day posts
    const newDayPosts = feedPosts.filter(p => p.day === nextDay && !p.unlockCondition);
    setUnlockedPosts(newDayPosts);

    // Hide transition to trigger useEffect
    setShowDayTransition(false);
  }, [currentDay, feedPosts, chatHistory, characterStates]);

  // Find next message by trigger
  const findMessageByTrigger = useCallback((charId, trigger) => {
    for (let d = 1; d <= 3; d++) {
      const dayKey = `day${d}`;
      const messages = chatData[charId]?.[dayKey];
      if (!messages) continue;
      
      const found = messages.find(m => m.id === trigger);
      if (found) return found;
    }
    return null;
  }, [chatData]);

  // Handle option selection
  const handleSelectOption = useCallback((option, charId = activeCharacter, isAutoResolved = false) => {
    if (!charId) charId = activeCharacter;
    
    // Get the current pending message to check if it's final or player-initiated
    const currentMessage = pendingMessages[charId];
    const isFinalMessage = currentMessage?.isFinal === true;
    const isPlayerInitiated = currentMessage?.isPlayerInitiated === true;
    
    // 1. Add player response to history
    const responseText = isAutoResolved ? `[No response - auto-selected: ${option.text}]` : option.text;
    setChatHistory(prev => ({
      ...prev,
      [charId]: [...prev[charId], { id: option.id, text: responseText, isPlayer: true, meta: option.meta }]
    }));

    // 2. Update anxiety (after player choice) - skip for player-initiated messages
    if (!isPlayerInitiated) {
      setCharacterStates(prev => ({
        ...prev,
        [charId]: {
          ...prev[charId],
          anxiety: Math.max(0, Math.min(100, prev[charId].anxiety + (option.anxietyScore || 0))),
          isDeceased: (option.isLethal && currentDay === 3) ? true : prev[charId].isDeceased,
          pendingDeath: (option.isLethal && currentDay < 3) ? true : prev[charId].pendingDeath,
          dayDeceased: (option.isLethal && !prev[charId].isDeceased) ? currentDay : prev[charId].dayDeceased
        }
      }));
    }

    // Clear pending message
    setPendingMessages(prev => ({
      ...prev,
      [charId]: null
    }));

    // Unlock related feed posts (skip for player-initiated messages)
    if (!isPlayerInitiated) {
      const relatedPosts = feedPosts.filter(p => 
        p.unlockCondition === option.id && 
        !unlockedPosts.find(up => up.id === p.id)
      );
      if (relatedPosts.length > 0) {
        setUnlockedPosts(prev => [...prev, ...relatedPosts]);
      }
    }

    // 3. For player-initiated messages, we're done - no reaction or next message
    if (isPlayerInitiated) {
      return;
    }

    // 4. Show typing indicator then add reaction (if exists)
    const randomDelay = Math.floor(Math.random() * 2000) + 1000; // 1000-3000ms
    setTimeout(() => {
      if (option.reaction) {
        setTypingCharacters(prev => ({ ...prev, [charId]: true }));

        setTimeout(() => {
          setTypingCharacters(prev => ({ ...prev, [charId]: false }));

          // Add character reaction to history
          setChatHistory(prev => ({
            ...prev,
            [charId]: [...prev[charId], { text: option.reaction, isPlayer: false }]
          }));

          window.gameSounds?.play('messageReceived');

          // If this was a final message, start 5-second timer
          if (isFinalMessage) {
            console.log(`[Final Message] ${charId}: Starting 5-second completion timer`);
            setTimeout(() => {
              console.log(`[Final Message] ${charId}: Timer complete, marking as finished`);
              setFinalMessagesCompleted(prev => {
                if (!prev[charId]) {
                  finalCompletionCountRef.current += 1;
                  console.log(`[Final Message] Completion count: ${finalCompletionCountRef.current}`);
                  return { ...prev, [charId]: true };
                }
                return prev;
              });
            }, 5000);
          }

          // After reaction, find and send next message if it exists
          if (option.nextMessageId && option.nextMessageId !== 'NULL') {
            const nextRandomDelay = Math.floor(Math.random() * 2000) + 1000;
            setTimeout(() => {
              const nextMessage = findMessageByTrigger(charId, option.nextMessageId);

              if (nextMessage) {
                setTypingCharacters(prev => ({ ...prev, [charId]: true }));

                setTimeout(() => {
                  setTypingCharacters(prev => ({ ...prev, [charId]: false }));

                  setChatHistory(prev => ({
                    ...prev,
                    [charId]: [...prev[charId], { ...nextMessage, isPlayer: false }]
                  }));

                  window.gameSounds?.play('messageReceived');

                  // Mark as unread if not on chat tab or not active character
                  if (activeTabRef.current !== 'chat' || activeCharacterRef.current !== charId) {
                    console.log('[Unread] Incrementing unread for:', charId, 'activeTab:', activeTabRef.current, 'activeChar:', activeCharacterRef.current);
                    window.gameSounds?.play('notification');
                    setUnreadMessages(prev => ({
                      ...prev,
                      [charId]: (prev[charId] || 0) + 1
                    }));
                  }

                  if (nextMessage.options) {
                    setPendingMessages(prev => ({
                      ...prev,
                      [charId]: nextMessage
                    }));
                  }
                }, 1000);
              }
            }, nextRandomDelay);
          }
        }, 1000);
      } else if (option.nextMessageId && option.nextMessageId !== 'NULL') {
        // No reaction, go straight to next message
        const nextMessage = findMessageByTrigger(charId, option.nextMessageId);

        if (nextMessage) {
          setTypingCharacters(prev => ({ ...prev, [charId]: true }));

          setTimeout(() => {
            setTypingCharacters(prev => ({ ...prev, [charId]: false }));

            setChatHistory(prev => ({
              ...prev,
              [charId]: [...prev[charId], { ...nextMessage, isPlayer: false }]
            }));

            window.gameSounds?.play('messageReceived');

            // Mark as unread if not on chat tab or not active character
            if (activeTabRef.current !== 'chat' || activeCharacterRef.current !== charId) {
              console.log('[Unread] Incrementing unread for:', charId, 'activeTab:', activeTabRef.current, 'activeChar:', activeCharacterRef.current);
              window.gameSounds?.play('notification');
              setUnreadMessages(prev => ({
                ...prev,
                [charId]: (prev[charId] || 0) + 1
              }));
            }

            if (nextMessage.options) {
              setPendingMessages(prev => ({
                ...prev,
                [charId]: nextMessage
              }));
            }
          }, 1000);
        }
      } else if (isFinalMessage && !option.reaction) {
        // No reaction and no next message, but it's final - start timer immediately
        console.log(`[Final Message] ${charId}: Starting 5-second completion timer (no reaction)`);
        setTimeout(() => {
          console.log(`[Final Message] ${charId}: Timer complete, marking as finished`);
          setFinalMessagesCompleted(prev => {
            if (!prev[charId]) {
              finalCompletionCountRef.current += 1;
              console.log(`[Final Message] Completion count: ${finalCompletionCountRef.current}`);
              return { ...prev, [charId]: true };
            }
            return prev;
          });
        }, 5000);
      }
    }, randomDelay);
  }, [activeCharacter, findMessageByTrigger, unlockedPosts, feedPosts, activeTab, pendingMessages, currentDay]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    // Clear unread count for active character when switching to chat
    if (tab === 'chat') {
      setUnreadMessages(prev => ({
        ...prev,
        [activeCharacter]: 0
      }));
    }
    // Clear feed notification when switching to feed
    if (tab === 'feed') {
      setHasNewFeedPosts(false);
    }
  };

  const handleRestart = () => {
    // Clear any cached state
    sessionStorage.clear();
    // Force a hard reload from the server
    window.location.reload(true);
  };



  if (!gameStarted) {
    return <IntroModal onConfirm={() => setGameStarted(true)} />;
  }

  if (gameEnded) {
    return <EndingScreen characterStates={characterStates} onRestart={handleRestart} />;
  }

  if (showOfflineModal) {
    return <OfflineModal onConfirm={() => setGameEnded(true)} />;
  }

  if (showDayTransition) {
    // For initial Day 1, show currentDay. For transitions to next day, show currentDay + 1
    const displayDay = (currentDay === 1 && chatHistory.mom.length === 0) ? currentDay : currentDay + 1;
    return <DayTransition day={displayDay} onComplete={handleDayTransitionComplete} />;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#1a1a1a] md:p-8 p-0">
      <style>{`
        @keyframes flash {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
      <div 
        className="relative bg-[#0d0d0d] text-[#ce923a] overflow-hidden flex flex-col border-2 border-[#ce923a] w-full h-full md:w-auto md:h-auto"
        style={{
          width: '1920px',
          height: '1080px',
          maxWidth: 'calc(100vw - 4rem)',
          maxHeight: 'calc(100vh - 4rem)',
          aspectRatio: '16 / 9',
          boxShadow: '0 0 8px rgba(206, 146, 58, 0.3), inset 0 0 8px rgba(206, 146, 58, 0.05)'
        }}
      >

        {/* Debug Overlay */}
        {showDebug && (
          <div className="fixed top-20 right-4 z-50 bg-[#0d0d0d] border border-[#ce923a] p-4 font-mono text-xs glow-amber">
            <div className="text-[#ce923a] mb-2">DEBUG MODE (Shift+D to toggle)</div>
            <div className="text-[#ce923a]">Day: {currentDay}/3</div>
            <div className="mt-2 space-y-1">
              {Object.keys(characterStates).map(charId => (
                <div key={charId} className="text-[#ce923a]">
                  {CHARACTERS[charId].name}: {characterStates[charId].anxiety.toFixed(0)} 
                  {characterStates[charId].isDeceased && ' [DECEASED]'}
                  {pendingMessages[charId] && ' [PENDING]'}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Bar */}
        <header className="flex-shrink-0 border-b-2 border-[#ce923a] bg-[#0d0d0d] md:px-4 px-2 md:py-2 py-1.5 z-40">
          <div className="flex items-center justify-between md:gap-6 gap-2">
            {/* Day Counter with decorative elements */}
            <div className="flex items-center md:gap-3 gap-1.5">
              <span className="font-mono md:text-base text-xs text-[#ce923a] uppercase tracking-widest glow-amber font-bold">
                Day {currentDay}
              </span>
              <div className="w-0.5 md:h-6 h-4 bg-[#ce923a] glow-amber"></div>
            </div>

            {/* Tabs - Center */}
            <div className="flex items-center md:gap-3 gap-1.5">
              <button
                onClick={() => handleTabSwitch('feed')}
                className={`md:px-3 px-2 md:py-1 py-0.5 font-mono md:text-sm text-xs border-2 border-[#ce923a] transition-all uppercase tracking-wider no-hover-invert flex items-center justify-center md:gap-2 gap-1 relative md:w-28 w-20 ${
                  activeTab === 'feed'
                    ? 'bg-[#ce923a] text-[#0d0d0d]'
                    : 'bg-[#0d0d0d] text-[#ce923a]'
                }`}
              >
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6969f72c821e326ef2d8ca69/b30a0d08a_feed.png" 
                  alt="Feed"
                  className="md:w-4 md:h-4 w-3 h-3"
                  style={{
                    filter: activeTab === 'feed' ? 'brightness(0)' : 'brightness(0) saturate(100%) invert(68%) sepia(35%) saturate(537%) hue-rotate(349deg) brightness(92%) contrast(86%)'
                  }}
                />
                <span className="md:inline hidden">FEED</span>
                {activeTab !== 'feed' && hasNewFeedPosts && (
                  <span 
                    className="w-2 h-2 bg-[#9cdce5] ml-auto"
                    style={{ animation: 'flash 2s ease-in-out infinite' }}
                  />
                )}
              </button>
              <button
                onClick={() => handleTabSwitch('chat')}
                className={`md:px-3 px-2 md:py-1 py-0.5 font-mono md:text-sm text-xs border-2 border-[#ce923a] transition-all uppercase tracking-wider no-hover-invert flex items-center justify-center md:gap-2 gap-1 relative md:w-28 w-20 ${
                  activeTab === 'chat'
                    ? 'bg-[#ce923a] text-[#0d0d0d]'
                    : 'bg-[#0d0d0d] text-[#ce923a]'
                }`}
              >
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6969f72c821e326ef2d8ca69/db698134a_chat.png" 
                  alt="Chat"
                  className="md:w-4 md:h-4 w-3 h-3"
                  style={{
                    filter: activeTab === 'chat' ? 'brightness(0)' : 'brightness(0) saturate(100%) invert(68%) sepia(35%) saturate(537%) hue-rotate(349deg) brightness(92%) contrast(86%)'
                  }}
                />
                <span className="md:inline hidden">CHAT</span>
                {(() => {
                  // Show badge if on Feed tab with any unreads, OR on Chat tab with unreads for non-active characters
                  const hasUnread = activeTab === 'feed' 
                    ? Object.values(unreadMessages).some(count => count > 0)
                    : Object.entries(unreadMessages).some(([charId, count]) => charId !== activeCharacter && count > 0);

                  return hasUnread && (
                    <span 
                      className={`w-2 h-2 ml-auto ${activeTab === 'chat' ? 'bg-[#0d0d0d]' : 'bg-[#989ad5]'}`}
                      style={{ animation: 'flash 2s ease-in-out infinite' }}
                    />
                  );
                })()}
              </button>
            </div>

            {/* Status indicator and Volume - Right */}
            <div className="flex items-center md:gap-3 gap-1.5">
              <div className="w-0.5 md:h-6 h-4 bg-[#ce923a] glow-amber md:block hidden"></div>
              <div className="md:flex hidden items-center gap-1">
                <div className="flex gap-1">
                  <div className={`w-2 h-2 bg-[#ce923a] ${currentDay === 3 && Object.values(interactedCharacters).some(val => val) ? 'animate-[pulse_0.3s_ease-in-out_infinite]' : 'animate-pulse'}`}></div>
                  <div className="w-2 h-2 bg-[#ce923a]/60"></div>
                  <div className="w-2 h-2 bg-[#ce923a]/30"></div>
                </div>
                <span className="font-mono text-xs text-[#ce923a] uppercase tracking-wider glow-amber">
                  ONLINE
                </span>
              </div>
              <div className="w-0.5 md:h-6 h-4 bg-[#ce923a] glow-amber"></div>
              <button
                onClick={() => {
                  window.gameSounds?.play('click');
                  setIsMuted(prev => !prev);
                }}
                className="md:p-1 p-0.5 text-[#ce923a] hover:bg-[#ce923a] hover:text-[#0d0d0d] transition-all"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="md:w-4 md:h-4 w-3 h-3" /> : <Volume2 className="md:w-4 md:h-4 w-3 h-3" />}
              </button>
            </div>
          </div>
        </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'feed' ? (
            <motion.div
              key="feed"
              className="h-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Feed 
                posts={unlockedPosts.filter(p => p.day === currentDay).slice(0, visiblePostCount)} 
                currentDay={currentDay} 
                feedScrollRef={feedScrollRef} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              className="h-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Chat
                activeCharacter={activeCharacter}
                setActiveCharacter={(charId) => {
                  setActiveCharacter(charId);
                  setUnreadMessages(prev => ({ ...prev, [charId]: 0 }));
                }}
                chatHistory={chatHistory}
                pendingMessage={pendingMessages}
                onSelectOption={handleSelectOption}
                characterStates={characterStates}
                typingCharacters={typingCharacters}
                unreadMessages={unreadMessages}
                onCharacterInteract={(charId) => setInteractedCharacters(prev => ({ ...prev, [charId]: true }))}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Status Bar */}
      <footer className="flex-shrink-0 border-t-2 border-[#ce923a] bg-[#0d0d0d] md:px-6 px-2 md:py-2 py-1 z-40">
        <div className="flex items-center justify-between md:text-[10px] text-[8px] font-mono text-[#ce923a] uppercase tracking-wider glow-amber">
          <span>UPNF SPEC</span>
          <span className="md:inline hidden">SIGNAL: {currentDay === 3 ? 'DEGRADED' : 'STABLE'}</span>
          <span>10.4001.24</span>
        </div>
      </footer>
      </div>


        </div>
        );
        }

export default function GameContainer() {
  return (
    <>
      <SoundManager />
      <GameContent />
      <CRTOverlay />
    </>
  );
}