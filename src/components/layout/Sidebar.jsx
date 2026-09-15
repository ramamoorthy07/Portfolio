import { motion } from 'framer-motion';
import {
  Home, User, GitBranch, Clock, Layers, Mail,
  Zap, Search, ChevronRight
} from 'lucide-react';
import { useNeuron } from '../../context/NeuronContext';
import { Bio } from '../../data/portfolioData';

const NAV_ITEMS = [
  { id: 'command-center', label: 'Command Center',      Icon: Home },
  { id: 'profile',        label: 'Engineering Profile', Icon: User },
  { id: 'graph',          label: 'Engineering Graph',   Icon: GitBranch },
  { id: 'history',        label: 'Execution History',   Icon: Clock },
  { id: 'systems',        label: 'Deployed Systems',    Icon: Layers },
  { id: 'contact',        label: 'Contact',             Icon: Mail },
];

export default function Sidebar() {
  const { activeModule, setModule, togglePalette } = useNeuron();

  return (
    <aside className="sidebar" role="navigation" aria-label="Main navigation">
      {/* Logo / Identity */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <div className="sidebar-logo">NEURON OS</div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.9375rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: '2px',
        }}>
          {Bio.name}
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--synapse)',
          letterSpacing: '0.06em',
        }}>
          Full-Stack AI Engineer
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginTop: '8px',
        }}>
          <span className="status-dot" />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--active)',
          }}>
            {Bio.status}
          </span>
        </div>
      </div>

      {/* Command Palette shortcut */}
      <button
        onClick={togglePalette}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          width: '100%',
          padding: '8px 12px',
          background: 'var(--elevated)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.8125rem',
          cursor: 'pointer',
          marginBottom: 'var(--space-5)',
          transition: 'all var(--transition-fast)',
        }}
        title="Open command palette (Ctrl+K)"
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--border-active)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.color = 'var(--text-muted)';
        }}
      >
        <Search size={14} />
        <span style={{ flex: 1, textAlign: 'left' }}>Search...</span>
        <kbd style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          padding: '2px 6px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          color: 'var(--text-muted)',
        }}>⌘K</kbd>
      </button>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ id, label, Icon }) => (
          <motion.button
            key={id}
            className={`nav-item ${activeModule === id ? 'active' : ''}`}
            onClick={() => setModule(id)}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Icon className="nav-item-icon" size={16} />
            <span>{label}</span>
            {activeModule === id && (
              <ChevronRight
                size={12}
                style={{ marginLeft: 'auto', color: 'var(--synapse)', opacity: 0.7 }}
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Footer links */}
      <div style={{
        marginTop: 'auto',
        paddingTop: 'var(--space-6)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
      }}>
        {[
          { label: 'GitHub',   href: Bio.github },
          { label: 'LinkedIn', href: Bio.linkedin },
          { label: 'Resume',   href: Bio.resume },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color var(--transition-fast)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--synapse)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Zap size={10} />
            {label}
          </a>
        ))}
      </div>
    </aside>
  );
}
