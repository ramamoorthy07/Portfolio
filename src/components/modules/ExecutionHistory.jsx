import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../../data/portfolioData';

function getRuntimeDays(startDate) {
  const start = new Date(startDate);
  const now   = new Date();
  return Math.floor((now - start) / 86_400_000);
}

function formatDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end   = endDate ? new Date(endDate) : new Date();
  const months = Math.round((end - start) / (1000 * 60 * 60 * 24 * 30));
  if (months < 12) return `${months} months`;
  const years = Math.floor(months / 12);
  const rem   = months % 12;
  return rem > 0 ? `${years}y ${rem}m` : `${years} year${years > 1 ? 's' : ''}`;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item      = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } };

export default function ExecutionHistory() {
  const enriched = useMemo(() =>
    experiences.map(exp => ({
      ...exp,
      runtimeDays:    exp.status === 'active' ? getRuntimeDays(exp.startDate) : null,
      durationLabel:  formatDuration(exp.startDate, exp.endDate),
      dateRange:      `${new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} → ${
        exp.endDate
          ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
          : 'Present'
      }`,
    })),
  []);

  return (
    <section id="history" className="module-wrapper section" aria-label="Execution History">
      <motion.div variants={container} initial="hidden" animate="show">

        <motion.div variants={item} className="module-header">
          <div className="module-eyebrow">Execution History</div>
          <h2 className="module-title">Experience & Roles</h2>
          <p className="module-subtitle">
            Positions held, responsibilities owned, and skills applied in production.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {enriched.map((exp) => (
            <motion.div
              key={exp.id}
              variants={item}
              className={`process-card ${exp.status === 'active' ? 'active-process' : 'completed-process'}`}
            >
              {/* Header */}
              <div className="process-header">
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '4px',
                  }}>
                    {exp.role}
                  </h3>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                  }}>
                    {exp.company}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    marginTop: '4px',
                  }}>
                    {exp.dateRange} · {exp.durationLabel}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 'var(--space-2)', flexShrink: 0 }}>
                  <div className={`process-status ${exp.status === 'active' ? '' : ''}`}>
                    <span className={exp.status === 'active' ? 'status-dot animate-pulse-dot' : ''}
                      style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                        background: exp.status === 'active' ? 'var(--active)' : 'var(--text-muted)' }}
                    />
                    <span style={{ color: exp.status === 'active' ? 'var(--active)' : 'var(--text-muted)' }}>
                      {exp.status === 'active' ? 'ACTIVE' : 'COMPLETED'}
                    </span>
                  </div>

                  {exp.runtimeDays !== null && (
                    <div className="process-runtime">
                      active {exp.runtimeDays} days
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.875rem', marginBottom: 'var(--space-5)' }}>
                {exp.description}
              </p>

              {/* Skills */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 'var(--space-3)',
                }}>
                  Stack in use
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {exp.skills.map(skill => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--text-secondary)',
                        background: 'var(--elevated)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '3px 10px',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
