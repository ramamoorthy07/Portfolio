import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { useRAM } from '../../hooks/useRAM';
import { useNeuron } from '../../context/NeuronContext';

// Minimal markdown renderer for bold text
function RamText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**')
          ? <strong key={i} style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{p.slice(2, -2)}</strong>
          : <span key={i}>{p}</span>
      )}
    </span>
  );
}

const QUICK_PROMPTS = [
  'Tell me about the projects',
  'Why RAG over fine-tuning?',
  'What is Ram\'s AI stack?',
  'How to get in touch?',
];

export default function RAMPanel() {
  const { ramOpen, closeRAM } = useNeuron();
  const { messages, isTyping, sendMessage } = useRAM();
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function handleSend() {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }


  return (
    <>

      <AnimatePresence>
        {ramOpen && (
          <motion.div
            className="ram-panel"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            role="dialog"
            aria-label="RAM AI Assistant"
            aria-modal="true"
          >
            {/* Header */}
            <div className="ram-panel-header">
              <div className="ram-identity">
                <div className="ram-orb-mini" />
                <div>
                  <div className="ram-name">RAM</div>
                  <div className="ram-tagline">Reasoning & Architecture Module</div>
                  <div className="ram-status">
                    <span className="status-dot animate-pulse-dot" style={{ width: 6, height: 6 }} />
                    ONLINE
                  </div>
                </div>
              </div>
              <button
                onClick={closeRAM}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', padding: '4px' }}
                aria-label="Close RAM assistant"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div
              className="ram-messages"
              role="log"
              aria-live="polite"
              aria-label="Conversation with RAM"
            >
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`ram-msg ${msg.role === 'ram' ? 'ram-msg-ram' : 'ram-msg-user'}`}
                >
                  {msg.role === 'ram'
                    ? <RamText text={msg.text} />
                    : msg.text
                  }
                </div>
              ))}

              {isTyping && (
                <div className="ram-msg ram-msg-ram" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: 6, height: 6,
                      borderRadius: '50%',
                      background: 'var(--synapse)',
                      opacity: 0.5,
                      animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick prompts */}
            {messages.length <= 1 && (
              <div className="ram-quick-prompts">
                {QUICK_PROMPTS.map(p => (
                  <button
                    key={p}
                    className="ram-quick-btn"
                    onClick={() => sendMessage(p)}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="ram-input-wrap">
              <input
                className="ram-input"
                placeholder="Ask about Ram's work..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Message to RAM"
              />
              <button
                className="ram-send-btn"
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
