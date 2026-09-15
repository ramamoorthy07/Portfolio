import { useState, useEffect, useCallback, useRef } from 'react';
import { projects, skillCategories } from '../data/portfolioData';
import { useNeuron } from '../context/NeuronContext';

const SECTIONS = [
  { id: 'command-center', label: 'Command Center',      type: 'section' },
  { id: 'profile',        label: 'Engineering Profile', type: 'section' },
  { id: 'graph',          label: 'Engineering Graph',   type: 'section' },
  { id: 'history',        label: 'Execution History',   type: 'section' },
  { id: 'systems',        label: 'Deployed Systems',    type: 'section' },
  { id: 'contact',        label: 'Contact',             type: 'section' },
];

function buildSearchIndex() {
  const index = [...SECTIONS];

  // Projects
  projects.forEach(p => {
    index.push({
      id: p.id,
      label: p.title,
      meta: p.subtitle,
      type: 'project',
      moduleId: 'systems',
    });
  });

  // Skills
  skillCategories.forEach(cat => {
    cat.skills.forEach(skill => {
      index.push({
        id: `skill-${skill.name}`,
        label: skill.name,
        meta: cat.label,
        type: 'skill',
        moduleId: 'graph',
      });
    });
  });

  return index;
}

const searchIndex = buildSearchIndex();

function fuzzyMatch(query, item) {
  const q = query.toLowerCase();
  const l = item.label.toLowerCase();
  const m = (item.meta || '').toLowerCase();
  return l.includes(q) || m.includes(q) ||
    q.split('').every(char => l.includes(char));
}

export function useCommandPalette() {
  const { paletteOpen, togglePalette, closePalette, setModule } = useNeuron();
  const [query, setQuery] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef(null);

  const results = query
    ? searchIndex.filter(item => fuzzyMatch(query, item))
    : SECTIONS;

  // Keyboard shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        togglePalette();
      }
      if (e.key === 'Escape' && paletteOpen) {
        closePalette();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [paletteOpen, togglePalette, closePalette]);

  // Focus input when opened
  useEffect(() => {
    if (paletteOpen) {
      setQuery('');
      setHighlighted(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [paletteOpen]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted(h => Math.min(h + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted(h => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      const item = results[highlighted];
      if (item) selectItem(item);
    }
  }, [results, highlighted]);

  const selectItem = useCallback((item) => {
    const targetModule = item.moduleId || item.id;
    setModule(targetModule);
    closePalette();
  }, [setModule, closePalette]);

  return {
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
  };
}
