import { useState, useCallback, useRef } from 'react';
import { ramResponses, matchIntent } from '../data/ramKnowledge';

const WELCOME_MSG = {
  id: 'welcome',
  role: 'ram',
  text: `Hello! I'm **RAM** — Reasoning & Architecture Module.

Ask me about Ram's projects, AI stack, engineering decisions, or how to get in touch.`,
};

export function useRAM() {
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [isTyping, setIsTyping] = useState(false);
  const idRef = useRef(1);

  const sendMessage = useCallback(async (userText) => {
    if (!userText.trim() || isTyping) return;

    const userMsg = {
      id: `user-${idRef.current++}`,
      role: 'user',
      text: userText.trim(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate thinking delay (50–150ms) — feels natural without being annoying
    await new Promise(r => setTimeout(r, 80 + Math.random() * 100));

    const intent = matchIntent(userText);
    const responseText = ramResponses[intent] ?? ramResponses.default;

    const ramMsg = {
      id: `ram-${idRef.current++}`,
      role: 'ram',
      text: responseText,
    };

    setIsTyping(false);
    setMessages(prev => [...prev, ramMsg]);
  }, [isTyping]);

  const reset = useCallback(() => {
    setMessages([WELCOME_MSG]);
    setIsTyping(false);
  }, []);

  return { messages, isTyping, sendMessage, reset };
}
