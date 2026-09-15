import React from 'react';
import { motion } from 'framer-motion';
import { useNeuron } from '../../context/NeuronContext';
import { Terminal, User, GitBranch, Clock, Layers, Mail, Sliders, Sparkles } from 'lucide-react';

export const MacDock = () => {
  const {
    activeModule,
    setModule,
    toggleSettings,
    matrixActive,
    toggleMatrix,
  } = useNeuron();

  const DOCK_ITEMS = [
    { id: 'terminal', label: 'Terminal OS / Neofetch', Icon: Terminal, color: '#00D4FF' },
    { id: 'profile', label: 'Engineering Profile', Icon: User, color: '#3B82F6' },
    { id: 'graph', label: 'Engineering Graph', Icon: GitBranch, color: '#8B5CF6' },
    { id: 'history', label: 'Execution History', Icon: Clock, color: '#10B981' },
    { id: 'systems', label: 'Deployed Systems', Icon: Layers, color: '#F59E0B' },
    { id: 'contact', label: 'Contact Endpoint', Icon: Mail, color: '#EC4899' },
    { id: 'matrix', label: 'Matrix Code Rain', Icon: Sparkles, color: '#10B981', action: toggleMatrix, active: matrixActive },
    { id: 'settings', label: 'System Customizer', Icon: Sliders, color: '#94A3B8', action: toggleSettings },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 12px',
        backgroundColor: 'rgba(15, 17, 26, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '24px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 212, 255, 0.1)',
      }}
    >
      {DOCK_ITEMS.map((item) => {
        const isActive = activeModule === item.id || item.active;
        const Icon = item.Icon;

        return (
          <motion.div
            key={item.id}
            whileHover={{ y: -8, scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <button
              onClick={() => {
                if (item.action) {
                  item.action();
                } else {
                  setModule(item.id);
                }
              }}
              title={item.label}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: isActive ? `${item.color}25` : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${isActive ? item.color : 'rgba(255, 255, 255, 0.1)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.2s, background 0.2s',
                boxShadow: isActive ? `0 0 14px ${item.color}40` : 'none',
              }}
            >
              <Icon size={20} color={isActive ? item.color : '#94A3B8'} />
            </button>

            {/* Active Indicator Dot */}
            {isActive && (
              <span
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: item.color,
                  boxShadow: `0 0 6px ${item.color}`,
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
