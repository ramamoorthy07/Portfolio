import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Hash, GitBranch, Layers, User } from 'lucide-react';
import { useCommandPalette } from '../hooks/useCommandPalette';

const TYPE_ICONS = {
  section: Hash,
  project: Layers,
  skill:   GitBranch,
};

export default function CommandPalette() {
  const {
    paletteOpen,
    query,
    setQuery,
    results,
    highlighted,
    setHighlighted,
    inputRef,
    handleKeyDown,
    selectItem,
    closePalette,
  } = useCommandPalette();

  return (
    <AnimatePresence>
      {paletteOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="palette-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={closePalette}
          >
            {/* Panel — stop propagation so clicks inside don't close */}
            <motion.div
              className="palette-panel"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-label="Command palette"
              aria-modal="true"
            >
              {/* Input */}
              <div className="palette-input-wrap">
                <Search size={16} color="var(--text-muted)" />
                <input
                  ref={inputRef}
                  className="palette-input"
                  placeholder="Go to section, search projects or skills..."
                  value={query}
                  onChange={e => { setQuery(e.target.value); setHighlighted(0); }}
                  onKeyDown={handleKeyDown}
                  aria-label="Search"
                />
                <button
                  onClick={closePalette}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Results */}
              <div className="palette-results" role="listbox">
                {results.length === 0 && (
                  <div style={{
                    padding: '24px',
                    textAlign: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    color: 'var(--text-muted)',
                  }}>
                    No results for "{query}"
                  </div>
                )}

                {results.length > 0 && (
                  <>
                    {!query && (
                      <div className="palette-group-label">Sections</div>
                    )}
                    {results.map((item, idx) => {
                      const Icon = TYPE_ICONS[item.type] || Hash;
                      return (
                        <div
                          key={item.id}
                          className={`palette-result-item ${idx === highlighted ? 'highlighted' : ''}`}
                          onClick={() => selectItem(item)}
                          onMouseEnter={() => setHighlighted(idx)}
                          role="option"
                          aria-selected={idx === highlighted}
                        >
                          <Icon size={15} color="var(--text-muted)" />
                          <span className="palette-result-label">{item.label}</span>
                          {item.meta && (
                            <span className="palette-result-meta">{item.meta}</span>
                          )}
                          <span className="palette-result-meta" style={{ marginLeft: 0 }}>
                            {item.type}
                          </span>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>

              {/* Footer hint */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '8px 16px',
                borderTop: '1px solid var(--border)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
              }}>
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>Esc close</span>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
