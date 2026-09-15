import { createContext, useContext, useReducer, useCallback } from 'react';

const NeuronContext = createContext(null);

export const MODULES = ['terminal', 'command-center', 'profile', 'graph', 'history', 'systems', 'contact'];

export const THEMES = [
  { id: 'cyber', name: 'Neuron Cyber', color: '#00D4FF', bg: '#0A0B10' },
  { id: 'matrix', name: 'Matrix Green', color: '#10B981', bg: '#051109' },
  { id: 'nord', name: 'Nordic Frost', color: '#88C0D0', bg: '#0F172A' },
  { id: 'dracula', name: 'Dracula Night', color: '#BD93F9', bg: '#181528' },
  { id: 'solarized', name: 'Solarized Retro', color: '#B58900', bg: '#120F08' },
];

const initialState = {
  activeModule: 'terminal', // default to terminal view for terminal resume experience!
  bootDone: false,
  ramOpen: false,
  paletteOpen: false,
  selectedNode: null,
  currentTheme: 'cyber',
  matrixActive: false,
  scanlinesActive: false,
  isMinimized: false,
  isMaximized: false,
  settingsOpen: false,
  closeOverlayOpen: false,
};

function neuronReducer(state, action) {
  switch (action.type) {
    case 'SET_MODULE':
      return { ...state, activeModule: action.payload, isMinimized: false };
    case 'BOOT_DONE':
      return { ...state, bootDone: true };
    case 'TOGGLE_RAM':
      return { ...state, ramOpen: !state.ramOpen };
    case 'OPEN_RAM':
      return { ...state, ramOpen: true };
    case 'CLOSE_RAM':
      return { ...state, ramOpen: false };
    case 'TOGGLE_PALETTE':
      return { ...state, paletteOpen: !state.paletteOpen };
    case 'CLOSE_PALETTE':
      return { ...state, paletteOpen: false };
    case 'SET_NODE':
      return { ...state, selectedNode: action.payload };
    case 'SET_THEME':
      return { ...state, currentTheme: action.payload };
    case 'TOGGLE_MATRIX':
      return { ...state, matrixActive: !state.matrixActive };
    case 'SET_MATRIX':
      return { ...state, matrixActive: action.payload };
    case 'TOGGLE_SCANLINES':
      return { ...state, scanlinesActive: !state.scanlinesActive };
    case 'SET_SCANLINES':
      return { ...state, scanlinesActive: action.payload };
    case 'TOGGLE_MINIMIZE':
      return { ...state, isMinimized: !state.isMinimized };
    case 'SET_MINIMIZE':
      return { ...state, isMinimized: action.payload };
    case 'TOGGLE_MAXIMIZE':
      return { ...state, isMaximized: !state.isMaximized, isMinimized: false };
    case 'TOGGLE_SETTINGS':
      return { ...state, settingsOpen: !state.settingsOpen };
    case 'SET_SETTINGS':
      return { ...state, settingsOpen: action.payload };
    case 'TOGGLE_CLOSE_OVERLAY':
      return { ...state, closeOverlayOpen: !state.closeOverlayOpen };
    case 'SET_CLOSE_OVERLAY':
      return { ...state, closeOverlayOpen: action.payload };
    default:
      return state;
  }
}

export function NeuronProvider({ children }) {
  const [state, dispatch] = useReducer(neuronReducer, initialState);

  const setModule = useCallback(
    (id) => dispatch({ type: 'SET_MODULE', payload: id }),
    []
  );
  const completeBoot     = useCallback(() => dispatch({ type: 'BOOT_DONE' }), []);
  const toggleRAM        = useCallback(() => dispatch({ type: 'TOGGLE_RAM' }), []);
  const openRAM          = useCallback(() => dispatch({ type: 'OPEN_RAM' }), []);
  const closeRAM         = useCallback(() => dispatch({ type: 'CLOSE_RAM' }), []);
  const togglePalette    = useCallback(() => dispatch({ type: 'TOGGLE_PALETTE' }), []);
  const closePalette     = useCallback(() => dispatch({ type: 'CLOSE_PALETTE' }), []);
  const setSelectedNode  = useCallback((node) => dispatch({ type: 'SET_NODE', payload: node }), []);
  const setTheme         = useCallback((themeId) => dispatch({ type: 'SET_THEME', payload: themeId }), []);
  const toggleMatrix     = useCallback(() => dispatch({ type: 'TOGGLE_MATRIX' }), []);
  const setMatrixActive  = useCallback((val) => dispatch({ type: 'SET_MATRIX', payload: val }), []);
  const toggleScanlines  = useCallback(() => dispatch({ type: 'TOGGLE_SCANLINES' }), []);
  const setScanlines     = useCallback((val) => dispatch({ type: 'SET_SCANLINES', payload: val }), []);
  const toggleMinimize   = useCallback(() => dispatch({ type: 'TOGGLE_MINIMIZE' }), []);
  const setMinimized     = useCallback((val) => dispatch({ type: 'SET_MINIMIZE', payload: val }), []);
  const toggleMaximize   = useCallback(() => dispatch({ type: 'TOGGLE_MAXIMIZE' }), []);
  const toggleSettings   = useCallback(() => dispatch({ type: 'TOGGLE_SETTINGS' }), []);
  const setSettingsOpen  = useCallback((val) => dispatch({ type: 'SET_SETTINGS', payload: val }), []);
  const toggleCloseOverlay = useCallback(() => dispatch({ type: 'TOGGLE_CLOSE_OVERLAY' }), []);
  const setCloseOverlay  = useCallback((val) => dispatch({ type: 'SET_CLOSE_OVERLAY', payload: val }), []);

  return (
    <NeuronContext.Provider
      value={{
        ...state,
        MODULES,
        THEMES,
        setModule,
        completeBoot,
        toggleRAM,
        openRAM,
        closeRAM,
        togglePalette,
        closePalette,
        setSelectedNode,
        setTheme,
        toggleMatrix,
        setMatrixActive,
        toggleScanlines,
        setScanlines,
        toggleMinimize,
        setMinimized,
        toggleMaximize,
        toggleSettings,
        setSettingsOpen,
        toggleCloseOverlay,
        setCloseOverlay,
      }}
    >
      {children}
    </NeuronContext.Provider>
  );
}

export function useNeuron() {
  const ctx = useContext(NeuronContext);
  if (!ctx) throw new Error('useNeuron must be used within NeuronProvider');
  return ctx;
}

