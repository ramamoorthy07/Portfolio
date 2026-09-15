import { motion } from 'framer-motion';
import { Database, Cpu, Cloud, GraduationCap } from 'lucide-react';
import { Bio, philosophy, education } from '../../data/portfolioData';

const PHIL_ICONS = { database: Database, cpu: Cpu, cloud: Cloud };

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item      = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } };

export default function EngineeringProfile() {
  return (
    <section id="profile" className="module-wrapper section" aria-label="Engineering Profile">
      <motion.div variants={container} initial="hidden" animate="show">

        {/* ── Module Header ───────────────────────────────── */}
        <motion.div variants={item} className="module-header">
          <div className="module-eyebrow">Engineering Profile</div>
          <h2 className="module-title">Who I Am & How I Build</h2>
          <p className="module-subtitle">
            Technical identity, engineering convictions, and background.
          </p>
        </motion.div>

        {/* ── Identity JSON Block ─────────────────────────── */}
        <motion.div variants={item} style={{ marginBottom: 'var(--space-10)' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-3)',
          }}>
            Identity
          </div>
          <div className="identity-block">
            <span className="ib-brace">{'{'}</span>
            {[
              { key: '"name"',           val: `"${Bio.name}"`,           type: 'string' },
              { key: '"title"',          val: '"Full-Stack AI Engineer"', type: 'string' },
              { key: '"specializations"',val: `["RAG", "LLMs", "Agentic AI", "Cloud Deployment"]`, type: 'array' },
              { key: '"stack_core"',     val: `["Python", "LangChain", "LangGraph", "CrewAI", "AWS"]`, type: 'array' },
              { key: '"status"',         val: `"${Bio.status}"`,          type: 'string' },
            ].map(({ key, val, type }) => (
              <div key={key} style={{ paddingLeft: '20px' }}>
                <span className="ib-key">{key}</span>
                <span className="ib-sep">: </span>
                <span className={type === 'array' ? 'ib-array' : 'ib-string'}>{val}</span>
                <span className="ib-sep">,</span>
              </div>
            ))}
            <span className="ib-brace">{'}'}</span>
          </div>
        </motion.div>

        {/* ── Engineering Philosophy ──────────────────────── */}
        <motion.div variants={item} style={{ marginBottom: 'var(--space-10)' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-5)',
          }}>
            Engineering Principles
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-4)',
          }}>
            {philosophy.map((p, i) => {
              const Icon = PHIL_ICONS[p.icon] || Cpu;
              return (
                <motion.div
                  key={p.id}
                  variants={item}
                  className="card"
                  style={{ borderLeft: '3px solid var(--synapse)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                    <div style={{
                      width: '32px', height: '32px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--synapse-dim)',
                      border: '1px solid rgba(0,212,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={16} color="var(--synapse)" />
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--synapse)',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                    }}>
                      0{i + 1}
                    </div>
                  </div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                    {p.title}
                  </h4>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>{p.body}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Education Timeline ──────────────────────────── */}
        <motion.div variants={item}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}>
            <GraduationCap size={13} color="var(--text-muted)" />
            Education
          </div>
          <div className="timeline">
            {education.map((e) => (
              <div key={e.id} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-date">
                  {e.startYear} – {e.endYear}
                </div>
                <div className="timeline-title">{e.institution}</div>
                <div className="timeline-subtitle">{e.degree}</div>
                {e.grade && (
                  <div style={{
                    marginTop: 'var(--space-2)',
                    display: 'inline-block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--active)',
                    background: 'var(--active-dim)',
                    border: '1px solid rgba(61,220,132,0.2)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '2px 10px',
                  }}>
                    {e.grade}
                  </div>
                )}
                <div style={{
                  marginTop: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--text-muted)',
                }}>
                  {e.location}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
