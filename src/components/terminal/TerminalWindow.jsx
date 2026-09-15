import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NeofetchView } from './NeofetchView';
import { useNeuron } from '../../context/NeuronContext';
import { Bio, skillCategories, experiences, education, projects } from '../../data/portfolioData';
import { Terminal, CornerDownLeft, Sparkles, Code, Cpu, FolderGit2, Mail, Layers, CheckCircle2 } from 'lucide-react';

const SUGGESTIONS = [
  'neofetch',
  'cat resume.txt',
  'skills',
  'projects',
  'experience',
  'contact',
  'matrix',
  'clear',
  'help',
];

export const TerminalWindow = () => {
  const { setModule, setTheme, toggleMatrix, setMatrixActive } = useNeuron();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'neofetch', content: null },
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    const tokens = raw.toLowerCase().split(/\s+/);
    const cmd = tokens[0];
    const arg = tokens[1];

    setCmdHistory((prev) => [raw, ...prev]);
    setHistoryIdx(-1);

    const newHistoryItem = { type: 'cmd', command: raw };

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let responseContent = null;

    switch (cmd) {
      case 'neofetch':
        responseContent = <NeofetchView />;
        break;

      case 'help':
        responseContent = (
          <div className="space-y-2 text-xs font-mono text-gray-300">
            <div style={{ color: 'var(--synapse)', fontWeight: 600 }}>AVAILABLE SYSTEM COMMANDS:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
              <div><span style={{ color: 'var(--active)' }}>neofetch</span> - System specs & ASCII avatar</div>
              <div><span style={{ color: 'var(--active)' }}>cat resume.txt</span> - Render full terminal resume</div>
              <div><span style={{ color: 'var(--active)' }}>skills</span> - List core technical competencies</div>
              <div><span style={{ color: 'var(--active)' }}>projects</span> - View shipped & deployed systems</div>
              <div><span style={{ color: 'var(--active)' }}>experience</span> - View work history & roles</div>
              <div><span style={{ color: 'var(--active)' }}>education</span> - View academic qualifications</div>
              <div><span style={{ color: 'var(--active)' }}>contact</span> - Display contact endpoints</div>
              <div><span style={{ color: 'var(--active)' }}>matrix</span> - Toggle cyberpunk matrix code rain</div>
              <div><span style={{ color: 'var(--active)' }}>theme &lt;name&gt;</span> - Switch theme (cyber, matrix, nord, dracula, solarized)</div>
              <div><span style={{ color: 'var(--active)' }}>clear</span> - Clear output buffer</div>
              <div><span style={{ color: 'var(--active)' }}>whoami</span> - Identity diagnostic</div>
              <div><span style={{ color: 'var(--active)' }}>sudo hire</span> - Executive override</div>
            </div>
          </div>
        );
        break;

      case 'cat':
      case 'resume':
        if (arg === 'resume.txt' || cmd === 'resume') {
          responseContent = (
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
            }} className="space-y-4">
              <div style={{ borderBottom: '1px dashed var(--border)', paddingBottom: '8px' }}>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--synapse)' }}>{Bio.name}</div>
                <div style={{ color: 'var(--text-secondary)' }}>{Bio.roles.join(' | ')}</div>
                <div style={{ color: 'var(--text-muted)' }}>Location: {Bio.location} · Status: {Bio.status}</div>
              </div>

              <div>
                <div style={{ color: 'var(--synapse)', fontWeight: 700, marginBottom: '4px' }}>// SUMMARY</div>
                <p style={{ color: 'var(--text-secondary)' }}>{Bio.description}</p>
              </div>

              <div>
                <div style={{ color: 'var(--synapse)', fontWeight: 700, marginBottom: '4px' }}>// EXPERIENCE</div>
                {experiences.map((exp) => (
                  <div key={exp.id} style={{ marginBottom: '8px' }}>
                    <div style={{ color: '#FFF', fontWeight: 600 }}>{exp.role} @ {exp.company}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{exp.startDate} - {exp.endDate || 'Present'}</div>
                    <div style={{ color: 'var(--text-secondary)' }}>{exp.description}</div>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ color: 'var(--synapse)', fontWeight: 700, marginBottom: '4px' }}>// EDUCATION</div>
                {education.map((edu) => (
                  <div key={edu.id} style={{ marginBottom: '6px' }}>
                    <div style={{ color: '#FFF', fontWeight: 600 }}>{edu.degree}</div>
                    <div style={{ color: 'var(--text-secondary)' }}>{edu.institution} ({edu.startYear} - {edu.endYear}) {edu.grade ? `· ${edu.grade}` : ''}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        } else {
          responseContent = <div style={{ color: 'var(--fire)' }}>cat: {arg || 'file'}: No such file or directory. Try 'cat resume.txt'</div>;
        }
        break;

      case 'skills':
        responseContent = (
          <div className="space-y-3 font-mono text-xs">
            <div style={{ color: 'var(--synapse)', fontWeight: 600 }}>CORE AI & ENGINEERING SKILLS:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillCategories.map((cat) => (
                <div key={cat.id} style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px',
                }}>
                  <div style={{ color: cat.color, fontWeight: 700, marginBottom: '6px' }}>{cat.label}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {cat.skills.map((s) => (
                      <span key={s.name} style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        color: 'var(--text-primary)',
                      }}>
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'projects':
      case 'systems':
        responseContent = (
          <div className="space-y-3 font-mono text-xs">
            <div style={{ color: 'var(--synapse)', fontWeight: 600 }}>DEPLOYED SYSTEMS & PROJECTS:</div>
            <div className="space-y-2">
              {projects.map((p) => (
                <div key={p.id} style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#FFF', fontWeight: 700, fontSize: '0.85rem' }}>{p.title}</span>
                    <span style={{ color: 'var(--synapse)', fontSize: '0.7rem' }}>{p.date}</span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '2px', marginBottom: '6px' }}>{p.description}</div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {p.tags.map((t) => (
                      <span key={t} style={{
                        color: 'var(--active)',
                        background: 'rgba(16, 185, 129, 0.1)',
                        padding: '1px 6px',
                        borderRadius: '3px',
                        fontSize: '0.65rem',
                      }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '8px' }}>
              <button
                onClick={() => setModule('systems')}
                style={{
                  color: 'var(--synapse)',
                  textDecoration: 'underline',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                }}
              >
                ➔ Switch to Visual Deployed Systems Module
              </button>
            </div>
          </div>
        );
        break;

      case 'experience':
        responseContent = (
          <div className="space-y-3 font-mono text-xs">
            <div style={{ color: 'var(--synapse)', fontWeight: 600 }}>EXECUTION HISTORY / EXPERIENCE:</div>
            {experiences.map((exp) => (
              <div key={exp.id} style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
              }}>
                <div style={{ color: '#FFF', fontWeight: 700 }}>{exp.role} — {exp.company}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginBottom: '4px' }}>{exp.startDate} - {exp.endDate || 'Present'}</div>
                <div style={{ color: 'var(--text-secondary)' }}>{exp.description}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'education':
        responseContent = (
          <div className="space-y-2 font-mono text-xs">
            <div style={{ color: 'var(--synapse)', fontWeight: 600 }}>ACADEMIC QUALIFICATIONS:</div>
            {education.map((edu) => (
              <div key={edu.id} style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
              }}>
                <div style={{ color: '#FFF', fontWeight: 700 }}>{edu.degree}</div>
                <div style={{ color: 'var(--synapse)' }}>{edu.institution}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{edu.location} ({edu.startYear} - {edu.endYear}) {edu.grade ? `| ${edu.grade}` : ''}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        responseContent = (
          <div className="space-y-3 font-mono text-xs">
            <div style={{ color: 'var(--synapse)', fontWeight: 600 }}>CONTACT ENDPOINTS:</div>
            <div style={{ color: 'var(--text-secondary)' }}>GitHub: <a href={Bio.github} target="_blank" rel="noreferrer" style={{ color: 'var(--synapse)' }}>{Bio.github}</a></div>
            <div style={{ color: 'var(--text-secondary)' }}>LinkedIn: <a href={Bio.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--synapse)' }}>{Bio.linkedin}</a></div>
            <div style={{ color: 'var(--text-secondary)' }}>Resume: <a href={Bio.resume} target="_blank" rel="noreferrer" style={{ color: 'var(--synapse)' }}>Download PDF</a></div>
            <button
              onClick={() => setModule('contact')}
              style={{
                color: 'var(--active)',
                textDecoration: 'underline',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.75rem',
                marginTop: '4px',
              }}
            >
              ➔ Open Interactive Contact Form Module
            </button>
          </div>
        );
        break;

      case 'matrix':
        toggleMatrix();
        responseContent = <div style={{ color: 'var(--active)' }}>[MATRIX ENGINE TOGGLED] Digital rain canvas effect updated.</div>;
        break;

      case 'theme':
        if (['cyber', 'matrix', 'nord', 'dracula', 'solarized'].includes(arg)) {
          setTheme(arg);
          responseContent = <div style={{ color: 'var(--synapse)' }}>Theme switched to: <strong>{arg}</strong></div>;
        } else {
          responseContent = (
            <div style={{ color: 'var(--fire)' }}>
              Invalid theme. Available themes: cyber, matrix, nord, dracula, solarized.
            </div>
          );
        }
        break;

      case 'whoami':
        responseContent = (
          <div style={{ color: 'var(--synapse)' }}>
            guest@visitor-terminal (Access Level: Authorized Recruiter / Engineer)
          </div>
        );
        break;

      case 'sudo':
        if (tokens[1] === 'hire') {
          responseContent = (
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid var(--active)',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              color: '#FFF',
            }}>
              🎉 <strong>ACCESS GRANTED!</strong> Excellent choice. Ramamoorthy S is ready to bring high-impact RAG pipelines, LLM systems, and AWS cloud solutions to your team!
              <div style={{ marginTop: '8px' }}>
                <a href={Bio.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--synapse)', textDecoration: 'underline' }}>
                  Connect on LinkedIn ➔
                </a>
              </div>
            </div>
          );
        } else {
          responseContent = <div style={{ color: 'var(--fire)' }}>sudo: permission granted for 'sudo hire' only.</div>;
        }
        break;

      default:
        responseContent = (
          <div style={{ color: 'var(--fire)' }}>
            zsh: command not found: {raw}. Type <span style={{ color: 'var(--synapse)' }}>help</span> to see available commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'cmd_res', command: raw, response: responseContent },
    ]);

    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(nextIdx);
      setInputVal(cmdHistory[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx <= 0) {
        setHistoryIdx(-1);
        setInputVal('');
      } else {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx] || '');
      }
    }
  };

  return (
    <div style={{ width: '100%', minHeight: '100%' }} className="space-y-6">
      {/* Output list */}
      {history.map((item, idx) => (
        <div key={idx} className="space-y-2">
          {item.type === 'neofetch' && <NeofetchView />}
          {item.type === 'cmd_res' && (
            <div className="space-y-2">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600 }}>
                <span style={{ color: 'var(--synapse)' }}>ramamoorthy@neuron-os</span>
                <span style={{ color: 'var(--text-muted)' }}>~ %</span>
                <span style={{ color: '#FFF' }}>{item.command}</span>
              </div>
              <div style={{ paddingLeft: '12px', borderLeft: '2px solid rgba(0, 212, 255, 0.2)' }}>
                {item.response}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Input prompt line */}
      <div style={{
        marginTop: '24px',
        paddingTop: '16px',
        borderTop: '1px dashed var(--border)',
      }}>
        {/* Suggestion Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', alignSelf: 'center', marginRight: '4px' }}>
            Quick Commands:
          </span>
          {SUGGESTIONS.map((sug) => (
            <button
              key={sug}
              onClick={() => handleCommand(sug)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--synapse)',
                background: 'rgba(0, 212, 255, 0.05)',
                border: '1px solid rgba(0, 212, 255, 0.2)',
                borderRadius: 'var(--radius-sm)',
                padding: '3px 8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 212, 255, 0.15)';
                e.currentTarget.style.borderColor = 'var(--synapse)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 212, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
              }}
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Input Field */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)' }}>
          <span style={{ color: 'var(--synapse)', fontWeight: 600, fontSize: '0.85rem' }}>ramamoorthy@neuron-os</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>~ %</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type 'help' or click a command..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#FFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              caretColor: 'var(--synapse)',
            }}
          />
          <button
            onClick={() => handleCommand(inputVal)}
            style={{
              background: 'var(--synapse)',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              padding: '4px 8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 700,
              fontSize: '0.7rem',
            }}
          >
            <CornerDownLeft size={12} /> Run
          </button>
        </div>
      </div>

      <div ref={bottomRef} />
    </div>
  );
};
