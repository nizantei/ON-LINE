import React, { createContext, useContext, useState, useEffect } from 'react';
import Papa from 'papaparse';

const CsvDataContext = createContext(null);

export function CsvDataProvider({ children }) {
  const [feedPosts, setFeedPosts] = useState([]);
  const [chatData, setChatData] = useState({});
  const [endings, setEndings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      // Load all CSV files in parallel
      const [postsData, chatsData, endingsData] = await Promise.all([
        loadCsv('/data/posts.csv'),
        loadCsv('/data/chats.csv'),
        loadCsv('/data/endings.csv')
      ]);

      // Transform and set feed posts
      const transformedPosts = transformFeedPosts(postsData);
      setFeedPosts(transformedPosts);

      // Transform and set chat data
      const transformedChats = transformChatMessages(chatsData);
      setChatData(transformedChats);

      // Set endings (no transformation needed, just parse conditions)
      setEndings(endingsData);

      setLoading(false);
    } catch (err) {
      console.error('Error loading CSV data:', err);
      setError(err);
      setLoading(false);
    }
  };

  const loadCsv = async (path) => {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.statusText}`);
    }
    const text = await response.text();
    return new Promise((resolve, reject) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data),
        error: reject
      });
    });
  };

  const transformFeedPosts = (posts) => {
    // Sort by ID numerically
    const sorted = posts.sort((a, b) => {
      const numA = parseInt(a.ID) || 0;
      const numB = parseInt(b.ID) || 0;
      return numA - numB;
    });

    return sorted.map(post => ({
      id: post.ID,
      day: parseInt(post.Day) || 1,
      author: post.Publisher || '',
      timestamp: '08:00', // Default timestamp
      content: post.Post_Text || '',
      imageUrl: post.Media || null,
      sourceUrl: post.Source || null,
      unlockCondition: null,
      factCheck: {
        publisher: post.FC_Pub || post.Publisher || '', // Use Publisher as fallback
        content: post.FC_Cont || '', // Empty if not provided
        source: post.FC_Src || ''
      }
    }));
  };

  const transformChatMessages = (messages) => {
    // Sort messages by day, character, then sequence number
    const sorted = messages.sort((a, b) => {
      // Extract sequence number from ID (e.g., "mom_1_2" -> 2)
      const getSeq = (id) => {
        const parts = id.split('_');
        return parseInt(parts[parts.length - 1]) || 0;
      };

      // First sort by day
      const dayA = parseInt(a.Day) || 0;
      const dayB = parseInt(b.Day) || 0;
      if (dayA !== dayB) return dayA - dayB;

      // Then by character (lowercase for comparison)
      const charA = (a.Char || '').toLowerCase();
      const charB = (b.Char || '').toLowerCase();
      if (charA !== charB) return charA.localeCompare(charB);

      // Finally by sequence number in ID
      return getSeq(a.ID) - getSeq(b.ID);
    });

    const transformedChat = {
      mom: { playerInitiatedActions: {} },
      boyfriend: { playerInitiatedActions: {} },
      bestie: { playerInitiatedActions: {} }
    };

    sorted.forEach(msg => {
      // Convert character name to lowercase (Mom -> mom)
      const character = (msg.Char || '').toLowerCase();
      if (!character || !transformedChat[character]) return;

      const dayKey = `day${msg.Day}`;

      // Handle player-initiated messages (Type = 'player_start')
      if (msg.Type === 'player_start') {
        if (!transformedChat[character].playerInitiatedActions[dayKey]) {
          transformedChat[character].playerInitiatedActions[dayKey] = [];
        }

        const options = [];
        if (msg.Option_A) {
          options.push({
            id: `${msg.ID}_A`,
            text: msg.Option_A,
            meta: { statusIcon: msg.Msg_Status || null }
          });
        }
        if (msg.Option_B) {
          options.push({
            id: `${msg.ID}_B`,
            text: msg.Option_B,
            meta: { statusIcon: msg.Msg_Status || null }
          });
        }

        transformedChat[character].playerInitiatedActions[dayKey].push({
          actionId: msg.ID,
          type: 'lethal_follow_up',
          condition: msg.Condition || null,
          options
        });
        return;
      }

      // Handle regular NPC messages
      if (!transformedChat[character][dayKey]) {
        transformedChat[character][dayKey] = [];
      }

      const message = {
        id: msg.ID,
        text: msg.Message_Text || '',
        triggerTime: null,
        isFinal: !msg.Next_ID || msg.Next_ID === 'NULL' || msg.Next_ID === ''
      };

      const options = [];
      if (msg.Option_A) {
        options.push({
          id: `${msg.ID}_A`,
          text: msg.Option_A,
          anxietyScore: parseInt(msg.Anx_A) || 0,
          reaction: msg.Reaction_A || null,
          nextMessageId: (msg.Next_ID && msg.Next_ID !== 'NULL') ? msg.Next_ID : null,
          isLethal: msg.Lethal_A === 'TRUE' || msg.Lethal_A === 'true'
        });
      }

      if (msg.Option_B) {
        options.push({
          id: `${msg.ID}_B`,
          text: msg.Option_B,
          anxietyScore: parseInt(msg.Anx_B) || 0,
          reaction: msg.Reaction_B || null,
          nextMessageId: (msg.Next_ID && msg.Next_ID !== 'NULL') ? msg.Next_ID : null,
          isLethal: msg.Lethal_B === 'TRUE' || msg.Lethal_B === 'true'
        });
      }

      if (options.length > 0) {
        message.options = options;
      }

      transformedChat[character][dayKey].push(message);
    });

    return transformedChat;
  };

  const getMediaUrl = (filename) => {
    if (!filename) return null;
    // Return URL path for assets in public folder
    return `/assets/${filename}`;
  };

  const value = {
    feedPosts,
    chatData,
    endings,
    loading,
    error,
    getMediaUrl
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0d0d0d]">
        <div className="text-[#ce923a] font-mono">Loading game data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0d0d0d]">
        <div className="text-red-500 font-mono">Error loading game data: {error.message}</div>
      </div>
    );
  }

  return (
    <CsvDataContext.Provider value={value}>
      {children}
    </CsvDataContext.Provider>
  );
}

export function useCsvData() {
  const context = useContext(CsvDataContext);
  if (!context) {
    throw new Error('useCsvData must be used within a CsvDataProvider');
  }
  return context;
}
