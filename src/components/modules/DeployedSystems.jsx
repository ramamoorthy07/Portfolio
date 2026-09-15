import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { projects } from '../../data/portfolioData';

// Engineering Depth chip type → CSS class
const CHIP_CLASS = {
  ai:      'chip chip-ai',
  cloud:   'chip chip-cloud',
  backend: 'chip chip-backend',
  ml:      'chip chip-ml',
  decision:'chip chip-decision',
};

const TABS = ['Overview', 'Architecture', 'Decisions'];

function SystemCard({ project }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [decisionOpen, setDecisionOpen] = useState({});

  const toggleDecision = (idx) =>
    setDecisionOpen(prev => ({ ...prev, [idx]: !prev[idx] }));

  return (
    <motion.article
      className="system-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Card Header */}
      <div className="system-card-header">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-3)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: '4px' }}>
              {project.featured && (
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: 'var(--warning)',
                  background: 'var(--warning-dim)',
                  border: '1px solid rgba(255,179,71,0.25)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '2px 8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>
                  Featured
                </span>
              )}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                background: 'var(--elevated)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '2px 8px',
              }}>
                {project.date}
              </span>
            </div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
            }}>
              {project.title}
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--synapse)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
              {project.subtitle}
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexShrink: 0 }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer"
                style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', padding: '6px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', transition: 'all var(--transition-fast)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--synapse)'; e.currentTarget.style.borderColor = 'var(--border-active)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                title="GitHub repository"
              >
                <Github size={15} />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer"
                style={{ color: 'var(--active)', display: 'flex', alignItems: 'center', padding: '6px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(61,220,132,0.3)', transition: 'all var(--transition-fast)' }}
                title="Live demo"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>

        {/* Engineering Depth chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {project.engineeringDepth?.map(({ label, type }) => (
            <span key={label} className={CHIP_CLASS[type] || 'chip chip-backend'}>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="system-card-tabs">
        <div style={{ display: 'flex', gap: '0' }}>
          {TABS.map(tab => {
            const hasContent =
              (tab === 'Architecture' && project.architecture) ||
              (tab === 'Decisions'    && project.decisions?.length > 0) ||
              tab === 'Overview';

            if (!hasContent) return null;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 16px',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === tab ? '2px solid var(--synapse)' : '2px solid transparent',
                  color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8125rem',
                  fontWeight: activeTab === tab ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  marginBottom: '-1px',
                }}
              >
                {tab}
                {tab === 'Decisions' && project.decisions?.length > 0 && (
                  <span style={{
                    marginLeft: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: 'var(--fire)',
                    background: 'var(--fire-dim)',
                    border: '1px solid rgba(255,107,53,0.25)',
                    borderRadius: 'var(--radius-full)',
                    padding: '1px 6px',
                  }}>
                    {project.decisions.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="system-card-body">
        <AnimatePresence mode="wait">
          {activeTab === 'Overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p style={{ marginBottom: 'var(--space-5)' }}>{project.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--text-secondary)',
                    background: 'var(--elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '3px 10px',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'Architecture' && project.architecture && (
            <motion.div
              key="arch"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p style={{ marginBottom: 'var(--space-4)', fontSize: '0.875rem' }}>
                {project.architecture.description}
              </p>
              <pre className="arch-diagram">{project.architecture.diagram}</pre>
            </motion.div>
          )}

          {activeTab === 'Decisions' && project.decisions?.length > 0 && (
            <motion.div
              key="decisions"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--fire)',
                marginBottom: 'var(--space-4)',
                letterSpacing: '0.03em',
              }}>
                Engineering decisions — why this architecture was chosen, trade-offs considered.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {project.decisions.map((dec, idx) => (
                  <div key={idx} className="decisions-item">
                    <button
                      className="decisions-trigger"
                      onClick={() => toggleDecision(idx)}
                      aria-expanded={!!decisionOpen[idx]}
                    >
                      <span className="decisions-question">{dec.question}</span>
                      {decisionOpen[idx]
                        ? <ChevronUp size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                        : <ChevronDown size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                      }
                    </button>
                    <AnimatePresence>
                      {decisionOpen[idx] && (
                        <motion.div
                          className="decisions-body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                          {dec.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default function DeployedSystems() {
  return (
    <section id="systems" className="module-wrapper section" aria-label="Deployed Systems">
      <div className="module-header">
        <div className="module-eyebrow">Deployed Systems</div>
        <h2 className="module-title">AI Systems Built & Shipped</h2>
        <p className="module-subtitle">
          Each system includes an architecture view and engineering decisions explaining the why behind every technical choice.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {projects.map(project => (
          <SystemCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
