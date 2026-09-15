import { Bot } from 'lucide-react';
import { useNeuron } from '../../context/NeuronContext';

export function RAMOrb() {
  const { ramOpen, openRAM } = useNeuron();
  if (ramOpen) return null;
  return (
    <div className="ram-orb-container">
      <div style={{ position: 'relative' }}>
        <button
          className="ram-orb animate-ram-float"
          onClick={openRAM}
          aria-label="Open RAM — Reasoning & Architecture Module"
          title="RAM — Reasoning & Architecture Module"
        >
          <Bot size={20} color="rgba(0,0,0,0.8)" />
        </button>
        <div className="ram-orb-ring" />
      </div>
    </div>
  );
}
