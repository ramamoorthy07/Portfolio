import { lazy, Suspense } from 'react';
import { NeuronProvider, useNeuron } from './context/NeuronContext';
import { AnimatePresence, motion } from 'framer-motion';
import BootScreen, { hasVisited } from './components/BootScreen';
import NeuralCanvas from './components/NeuralCanvas';
import CommandPalette from './components/CommandPalette';
import { RAMOrb } from './components/ram/RAMOrb';

import { MacMenuBar } from './components/terminal/MacMenuBar';
import { MacDock } from './components/terminal/MacDock';
import { TerminalWindow } from './components/terminal/TerminalWindow';
import { SettingsModal } from './components/terminal/SettingsModal';

// Lazy-load active modules
const EngineeringProfile = lazy(() => import('./components/modules/EngineeringProfile'));
const EngineeringGraph = lazy(() => import('./components/modules/EngineeringGraph'));
const ExecutionHistory = lazy(() => import('./components/modules/ExecutionHistory'));
const DeployedSystems  = lazy(() => import('./components/modules/DeployedSystems'));
const Contact          = lazy(() => import('./components/modules/Contact'));
const RAMPanel         = lazy(() => import('./components/ram/RAMPanel'));

function ModuleFallback() {
  return (
    <div style={{
      padding: 'clamp(40px, 7vw, 88px) clamp(20px, 5vw, 48px)',
      maxWidth: '1100px',
      margin: '0 auto',
    }}>
      <div style={{
        height: '320px',
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        animation: 'pulse-dot 1.5s ease-in-out infinite',
      }} />
    </div>
  );
}

const MODULE_MAP = {
  'terminal': TerminalWindow,
  'profile':  EngineeringProfile,
  'graph':    EngineeringGraph,
  'history':  ExecutionHistory,
  'systems':  DeployedSystems,
  'contact':  Contact,
};

function AppShell() {
  const {
    activeModule,
    bootDone,
    completeBoot,
    currentTheme,
    scanlinesActive,
    isMinimized,
    isMaximized,
    toggleMinimize,
    toggleMaximize,
    setModule,
  } = useNeuron();

  const skipBoot = hasVisited();

  if (skipBoot && !bootDone) {
    completeBoot();
  }

  const showBoot = !skipBoot && !bootDone;
  const ActiveModuleComponent = MODULE_MAP[activeModule] || TerminalWindow;

  return (
    <div
      data-theme={currentTheme}
      style={{
        minHeight: '100vh',
        position: 'relative',
        backgroundColor: 'var(--void)',
        color: 'var(--text-primary)',
        overflowX: 'hidden',
      }}
    >
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Top macOS Menu Bar */}
      {!showBoot && <MacMenuBar />}

      {/* Settings Modal */}
      <SettingsModal />

      {/* Background canvas */}
      {!showBoot && <NeuralCanvas />}

      {/* Boot screen */}
      {showBoot && <BootScreen onComplete={completeBoot} />}

      {/* Main OS Window Frame */}
      {!showBoot && (
        <div
          style={{
            paddingTop: '44px',
            paddingBottom: '88px',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingLeft: 'clamp(8px, 2vw, 24px)',
            paddingRight: 'clamp(8px, 2vw, 24px)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                width: '100%',
                maxWidth: isMaximized ? '100%' : '1240px',
                height: isMaximized ? 'calc(100vh - 120px)' : 'auto',
                minHeight: 'calc(100vh - 140px)',
                backgroundColor: 'rgba(13, 17, 23, 0.92)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: isMaximized ? '0px' : 'var(--radius-lg)',
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85), 0 0 30px rgba(0, 212, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* CRT Scanlines Overlay */}
              {scanlinesActive && <div className="scanlines-overlay" />}

              {/* macOS Window Titlebar Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 16px',
                  backgroundColor: 'rgba(20, 24, 33, 0.98)',
                  borderBottom: '1px solid var(--border)',
                  userSelect: 'none',
                  zIndex: 50,
                }}
              >
                {/* Traffic Lights */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => setModule('terminal')}
                    title="Reset to Terminal Home"
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: '#FF5F56',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  />
                  <button
                    onClick={toggleMinimize}
                    title="Minimize Window"
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: '#FFBD2E',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  />
                  <button
                    onClick={toggleMaximize}
                    title="Maximize / Restore Window"
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: '#27C93F',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  />
                </div>

                {/* Session Title */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.1em',
                    fontWeight: 600,
                  }}
                >
                  ramamoorthy@portfolio ~ /{activeModule}
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--synapse)', fontWeight: 700 }}>
                  zsh 5.9
                </div>
              </div>

              {/* Scrollable Viewport Container */}
              <main
                id="main-content"
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: 'clamp(16px, 3vw, 32px)',
                  position: 'relative',
                  zIndex: 20,
                }}
              >
                <h1 className="sr-only">Ramamoorthy S — Full-Stack AI Engineer Portfolio</h1>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeModule}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Suspense fallback={<ModuleFallback />}>
                      <ActiveModuleComponent />
                    </Suspense>
                  </motion.div>
                </AnimatePresence>
              </main>
            </motion.div>
          )}
        </div>
      )}

      {/* macOS Dock at bottom */}
      {!showBoot && <MacDock />}

      {/* Command Palette & Overlay items */}
      {!showBoot && (
        <>
          <CommandPalette />
          <RAMOrb />
          <Suspense fallback={null}>
            <RAMPanel />
          </Suspense>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <NeuronProvider>
      <AppShell />
    </NeuronProvider>
  );
}
