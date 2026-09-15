import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { skillCategories, projects } from '../../data/portfolioData';
import { useNeuron } from '../../context/NeuronContext';

// Color per category
const CAT_COLORS = {
  'core-ai':  '#7B68EE',
  'ml':       '#FFB347',
  'backend':  '#3DDC84',
  'cloud':    '#00D4FF',
  'frontend': '#FF6B35',
};

// Legend items
const LEGEND = Object.entries(CAT_COLORS).map(([id, color]) => {
  const cat = skillCategories.find(c => c.id === id);
  return { id, label: cat?.label ?? id, color };
});

// Flatten all skills into nodes
function buildNodes() {
  const nodes = [];
  skillCategories.forEach(cat => {
    cat.skills.forEach(skill => {
      nodes.push({
        id:       skill.name,
        label:    skill.name,
        category: cat.id,
        color:    CAT_COLORS[cat.id] || '#8B9BAD',
        usedIn:   skill.usedIn || [],
        r:        skill.usedIn && skill.usedIn.length > 1 ? 10 : 7,
      });
    });
  });
  return nodes;
}

export default function EngineeringGraph() {
  const canvasRef = useRef(null);
  const nodesRef  = useRef([]);
  const rafRef    = useRef(null);
  const { selectedNode, setSelectedNode, setModule } = useNeuron();

  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const rawNodes = buildNodes();
    let W, H;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);

      // Position nodes in a force-like cluster per category
      const categoryPositions = {
        'core-ai':  { cx: W * 0.5,  cy: H * 0.5 },
        'ml':       { cx: W * 0.75, cy: H * 0.3 },
        'backend':  { cx: W * 0.25, cy: H * 0.6 },
        'cloud':    { cx: W * 0.7,  cy: H * 0.72 },
        'frontend': { cx: W * 0.25, cy: H * 0.25 },
      };

      rawNodes.forEach((n, i) => {
        const { cx, cy } = categoryPositions[n.category] || { cx: W/2, cy: H/2 };
        const angle = (i * 2.4) + (Object.keys(categoryPositions).indexOf(n.category) * 20);
        const radius = 55 + (i % 4) * 22;
        n.x  = cx + Math.cos(angle) * radius;
        n.y  = cy + Math.sin(angle) * radius;
        n.vx = 0;
        n.vy = 0;
      });

      nodesRef.current = rawNodes;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      const nodes = nodesRef.current;

      // Draw edges (nodes used in same projects)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          // Edge if both usedIn share a project
          const shared = a.usedIn.some(pid => b.usedIn.includes(pid));
          if (shared) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = 'rgba(0,212,255,0.15)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        const isSelected = selectedNode?.id === n.id;
        const isHovered  = hovered === n.id;
        const r = n.r + (isSelected || isHovered ? 4 : 0);

        // Glow for selected
        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 8, 0, Math.PI * 2);
          ctx.fillStyle = `${n.color}22`;
          ctx.fill();
        }

        // Node fill
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? n.color : `${n.color}CC`;
        ctx.fill();

        // Node border
        ctx.strokeStyle = isSelected ? '#fff' : `${n.color}66`;
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.stroke();

        // Label
        if (isHovered || isSelected || n.r > 8) {
          ctx.font = `${isSelected ? 600 : 500} 10px 'Inter', sans-serif`;
          ctx.fillStyle = isSelected ? '#fff' : 'rgba(230,237,243,0.85)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(n.label, n.x, n.y + r + 12);
        }
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    // Mouse interaction
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const nodes = nodesRef.current;
      let found = null;
      for (const n of nodes) {
        const d = Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2);
        if (d < n.r + 8) { found = n.id; break; }
      }
      setHovered(found);
      canvas.style.cursor = found ? 'pointer' : 'default';
    };

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      for (const n of nodesRef.current) {
        const d = Math.sqrt((n.x - mx) ** 2 + (n.y - my) ** 2);
        if (d < n.r + 8) {
          setSelectedNode(n);
          return;
        }
      }
      setSelectedNode(null);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    draw();

    canvas.addEventListener('mousemove', onMouseMove, { passive: true });
    canvas.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('click', onClick);
    };
  }, [selectedNode, hovered, setSelectedNode]);

  // Get project names for selected node
  const relatedProjects = selectedNode
    ? projects.filter(p => selectedNode.usedIn.includes(p.id))
    : [];

  return (
    <section id="graph" className="module-wrapper section" aria-label="Engineering Graph">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

        <div className="module-header">
          <div className="module-eyebrow">Engineering Graph</div>
          <h2 className="module-title">Skills & Connections</h2>
          <p className="module-subtitle">
            Each node is a technology. Edges connect skills used together in the same project. Click any node to explore.
          </p>
        </div>

        {/* Canvas */}
        <div className="graph-canvas-wrapper" style={{ height: 'clamp(340px, 50vh, 560px)' }}>
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%' }}
            aria-label="Interactive engineering skills graph"
          />
        </div>

        {/* Legend */}
        <div className="graph-legend">
          {LEGEND.map(({ id, label, color }) => (
            <div key={id} className="graph-legend-item">
              <div className="graph-legend-dot" style={{ background: color }} />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Node detail panel */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              className="graph-node-panel"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.25 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{
                    width: '12px', height: '12px',
                    borderRadius: '50%',
                    background: selectedNode.color,
                  }} />
                  <h4 style={{ color: 'var(--text-primary)' }}>{selectedNode.label}</h4>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: selectedNode.color,
                    background: `${selectedNode.color}18`,
                    border: `1px solid ${selectedNode.color}30`,
                    borderRadius: 'var(--radius-sm)',
                    padding: '2px 8px',
                  }}>
                    {LEGEND.find(l => l.id === selectedNode.category)?.label}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}
                >
                  <X size={16} />
                </button>
              </div>

              {relatedProjects.length > 0 ? (
                <div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: 'var(--space-3)',
                  }}>
                    Used in {relatedProjects.length} project{relatedProjects.length > 1 ? 's' : ''}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {relatedProjects.map(p => (
                      <button
                        key={p.id}
                        onClick={() => { setModule('systems'); setSelectedNode(null); }}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          color: 'var(--synapse)',
                          background: 'var(--synapse-dim)',
                          border: '1px solid rgba(0,212,255,0.2)',
                          borderRadius: 'var(--radius-md)',
                          padding: '6px 14px',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)',
                        }}
                      >
                        {p.title} →
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  This skill is part of Ram's stack — not yet linked to a published project.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </section>
  );
}
