import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bootModules } from '../data/portfolioData';

const VISITED_KEY = 'neuron-visited';

export default function BootScreen({ onComplete }) {
  const [moduleIndex, setModuleIndex] = useState(0);
  const [progress, setProgress] = useState({}); // moduleId → 0-100
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showSkip, setShowSkip] = useState(false);

  // Show skip button after 500ms
  useEffect(() => {
    const t = setTimeout(() => setShowSkip(true), 500);
    return () => clearTimeout(t);
  }, []);

  // Drive progress for each module sequentially
  useEffect(() => {
    if (moduleIndex >= bootModules.length) {
      setDone(true);
      const t = setTimeout(handleComplete, 600);
      return () => clearTimeout(t);
    }

    const mod = bootModules[moduleIndex];
    const step = mod.duration / 40; // 40 increments
    let current = 0;

    const interval = setInterval(() => {
      current += 2.5; // 2.5% per step = 40 steps = 100%
      setProgress(prev => ({ ...prev, [mod.name]: Math.min(current, 100) }));
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setModuleIndex(i => i + 1), 120);
      }
    }, step);

    return () => clearInterval(interval);
  }, [moduleIndex]);

  function handleComplete() {
    localStorage.setItem(VISITED_KEY, 'true');
    setVisible(false);
    setTimeout(onComplete, 400);
  }

  function handleSkip() {
    handleComplete();
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="boot-content">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <div className="boot-logo">NEURON OS</div>
              <div className="boot-subtitle">Ramamoorthy S · Full-Stack AI Engineer</div>
            </motion.div>

            <div className="boot-divider" />

            {/* Module progress bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {bootModules.map((mod, i) => {
                const pct = progress[mod.name] ?? 0;
                const isActive = i === moduleIndex;
                const isComplete = i < moduleIndex || (i === moduleIndex && pct >= 100);

                return (
                  <motion.div
                    key={mod.name}
                    className="boot-line"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: i <= moduleIndex ? 1 : 0.3, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <span className="boot-module-name">
                      {mod.name}
                    </span>
                    <div className="boot-bar-wrap">
                      <div
                        className="boot-bar-fill"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="boot-status-ok" style={{ opacity: isComplete ? 1 : 0 }}>
                      OK
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Done state */}
            {done && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  marginTop: '24px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--active)',
                  letterSpacing: '0.08em',
                }}
              >
                Ready.
              </motion.p>
            )}

            {/* Skip button */}
            <AnimatePresence>
              {showSkip && !done && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <button className="boot-skip" onClick={handleSkip}>
                    Skip intro →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Check if the user has visited before */
export function hasVisited() {
  return localStorage.getItem(VISITED_KEY) === 'true';
}
