import { Home, User, Layers, Mail, Bot } from 'lucide-react';
import { useNeuron } from '../../context/NeuronContext';

const TABS = [
  { id: 'command-center', label: 'Home',     Icon: Home },
  { id: 'profile',        label: 'Profile',  Icon: User },
  { id: 'systems',        label: 'Systems',  Icon: Layers },
  { id: 'contact',        label: 'Contact',  Icon: Mail },
];

export default function BottomNav() {
  const { activeModule, setModule, toggleRAM } = useNeuron();

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      <div className="bottom-nav-inner">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`bottom-nav-item ${activeModule === id ? 'active' : ''}`}
            onClick={() => setModule(id)}
            aria-current={activeModule === id ? 'page' : undefined}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
        {/* RAM trigger on mobile */}
        <button
          className="bottom-nav-item"
          onClick={toggleRAM}
          aria-label="Open RAM assistant"
        >
          <Bot size={20} />
          <span>RAM</span>
        </button>
      </div>
    </nav>
  );
}
