import React, { useState, useEffect, useRef } from 'react';
import { useNeuron, THEMES } from '../../context/NeuronContext';
import { Palette, Sliders, Zap, Check } from 'lucide-react';

export const MacMenuBar = () => {
  const {
    activeModule,
    setModule,
    currentTheme,
    setTheme,
    toggleSettings,
  } = useNeuron();

  const [timeStr, setTimeStr] = useState('');
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setThemeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentThemeObj = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

  const menuLinks = [
    { id: 'terminal', label: 'Terminal OS' },
    { id: 'profile',  label: 'About' },
    { id: 'systems',  label: 'Projects' },
    { id: 'graph',    label: 'Skills' },
    { id: 'history',  label: 'Experience' },
    { id: 'contact',  label: 'Contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '34px',
        backgroundColor: 'rgba(10, 11, 16, 0.94)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--text-primary)',
        userSelect: 'none',
        overflow: 'visible',
      }}
    >
      {/* Left side: System Branding & Navigation Menus */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Developer Branding */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
          onClick={() => setModule('terminal')}
        >
          <Zap size={14} color="var(--synapse)" />
          <span style={{ fontWeight: 800, letterSpacing: '0.05em', color: '#FFF' }}>RAMAMOORTHY S</span>
        </div>

        <div style={{ height: '14px', width: '1px', background: 'var(--border)' }} />

        {/* Navigation Items */}
        {menuLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setModule(link.id)}
            style={{
              background: 'none',
              border: 'none',
              color: activeModule === link.id ? 'var(--synapse)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: activeModule === link.id ? 700 : 400,
              fontSize: '0.75rem',
              padding: '4px 6px',
              borderRadius: '4px',
              transition: 'all 0.15s ease',
            }}
          >
            {link.label}
          </button>
        ))}

        {/* Themes Dropdown */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
            style={{
              background: themeDropdownOpen ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              padding: '3px 8px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.72rem',
              fontWeight: 600,
            }}
          >
            <Palette size={13} color="var(--synapse)" />
            <span>Theme: <strong style={{ color: currentThemeObj.color }}>{currentThemeObj.name}</strong></span>
          </button>

          {themeDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '32px',
                left: 0,
                background: 'rgba(13, 17, 23, 0.96)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--border-active)',
                borderRadius: 'var(--radius-md)',
                padding: '8px',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.8), 0 0 15px var(--synapse-dim)',
                minWidth: '180px',
                zIndex: 300,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div style={{
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                fontWeight: 700,
                padding: '2px 8px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                SELECT SYSTEM THEME:
              </div>
              {THEMES.map((theme) => {
                const isSelected = currentTheme === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setTheme(theme.id);
                      setThemeDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      background: isSelected ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      border: isSelected ? `1px solid ${theme.color}60` : '1px solid transparent',
                      borderRadius: '6px',
                      padding: '7px 10px',
                      color: isSelected ? '#FFF' : 'var(--text-secondary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.color = '#FFF';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: theme.color,
                        boxShadow: `0 0 8px ${theme.color}`,
                        display: 'inline-block',
                      }} />
                      <span>{theme.name}</span>
                    </div>

                    {isSelected && <Check size={13} color={theme.color} />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Right side: Status Indicators & Clock */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* AI System Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem' }}>
          <span className="status-dot animate-pulse-dot" style={{ width: '6px', height: '6px' }} />
          <span style={{ color: 'var(--active)', fontWeight: 600 }}>AI ONLINE</span>
        </div>

        {/* Settings button */}
        <button
          onClick={toggleSettings}
          title="Open System Customizer"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
          }}
        >
          <Sliders size={14} />
        </button>

        {/* Live Clock */}
        <div style={{ fontWeight: 600, color: 'var(--synapse)', fontSize: '0.75rem' }}>
          {timeStr}
        </div>
      </div>
    </header>
  );
};
