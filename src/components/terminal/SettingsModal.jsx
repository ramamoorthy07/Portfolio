import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNeuron, THEMES } from '../../context/NeuronContext';
import { X, Palette, Tv, Sliders, Check } from 'lucide-react';

export const SettingsModal = () => {
  const {
    settingsOpen,
    setSettingsOpen,
    currentTheme,
    setTheme,
    scanlinesActive,
    toggleScanlines,
  } = useNeuron();

  if (!settingsOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(12px)',
          zIndex: 150,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
        }}
        onClick={() => setSettingsOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2 }}
          style={{
            width: '100%',
            maxWidth: '480px',
            backgroundColor: 'rgba(15, 17, 26, 0.95)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 212, 255, 0.15)',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-primary)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} color="var(--synapse)" />
              <span style={{ fontWeight: 800, fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
                System Customizer
              </span>
            </div>
            <button
              onClick={() => setSettingsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Theme Selector */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--synapse)', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Palette size={14} /> Color Scheme
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {THEMES.map((theme) => {
                const isSelected = currentTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => setTheme(theme.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: `1px solid ${isSelected ? theme.color : 'var(--border)'}`,
                      background: isSelected ? `${theme.color}20` : 'rgba(255, 255, 255, 0.03)',
                      color: isSelected ? '#FFF' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: theme.color }} />
                      {theme.name}
                    </div>
                    {isSelected && <Check size={14} color={theme.color} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CRT Scanlines Toggle */}
          <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
              <Tv size={16} color="var(--synapse)" />
              <span>CRT Scanlines Effect</span>
            </div>
            <button
              onClick={toggleScanlines}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${scanlinesActive ? 'var(--synapse)' : 'var(--border)'}`,
                background: scanlinesActive ? 'rgba(0, 212, 255, 0.2)' : 'transparent',
                color: scanlinesActive ? 'var(--synapse)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
              }}
            >
              {scanlinesActive ? 'ON' : 'OFF'}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
