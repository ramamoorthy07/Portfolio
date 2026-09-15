import React, { useState } from 'react';
import { Bio, getLiveStats } from '../../data/portfolioData';
import { useNeuron } from '../../context/NeuronContext';
import { Terminal, User, FolderGit2, GitBranch, Clock, Mail, Cpu, ArrowRight, ShieldCheck } from 'lucide-react';

export const NeofetchView = () => {
  const stats = getLiveStats();
  const { setModule, toggleRAM } = useNeuron();
  const [showSpecs, setShowSpecs] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(Bio.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const specs = [
    { label: 'OS Kernel', value: 'Terminal OS v2.4 (arm64-ai)' },
    { label: 'Infrastructure', value: 'Postqode // Azure Cloud // AWS' },
    { label: 'AI Frameworks', value: 'LangGraph · CrewAI · LangChain · FastAPI' },
    { label: 'Primary Role', value: 'AI Engineer @ Postqode' },
    { label: 'Direct Email', value: Bio.email },
    { label: 'Core Experience', value: 'Autonomous Multi-Agent Systems & Deployment' },
    { label: 'Shell Environment', value: 'zsh 5.9 (x86_64-apple-darwin23.0)' },
    { label: 'Deployed Systems', value: `${stats.systemsDeployed} Production AI Systems Shipped` },
  ];

  const colorBlocks = [
    'var(--synapse)', 'var(--synapse)', 'var(--synapse)', 'var(--synapse)',
    'var(--synapse)', 'var(--synapse)', 'var(--synapse)', 'var(--synapse)',
  ];

  const navItems = [
    {
      cmd: '/about',
      title: 'About & Profile',
      desc: 'Technical identity, principles & experience',
      action: () => setModule('profile'),
      Icon: User,
      badge: 'Identity',
    },
    {
      cmd: '/projects',
      title: 'Deployed Systems',
      desc: 'Postqode Extension, City 360 & AI Agents',
      action: () => setModule('systems'),
      Icon: FolderGit2,
      badge: `${stats.systemsDeployed} Systems`,
    },
    {
      cmd: '/skills',
      title: 'Knowledge Graph',
      desc: 'Interactive node map of AI & cloud stack',
      action: () => setModule('graph'),
      Icon: GitBranch,
      badge: 'Interactive',
    },
    {
      cmd: '/experience',
      title: 'Execution History',
      desc: 'Postqode AI Engineer career timeline',
      action: () => setModule('history'),
      Icon: Clock,
      badge: 'Timeline',
    },
    {
      cmd: '/contact',
      title: 'Contact Endpoint',
      desc: 'Send direct message or email directly',
      action: () => setModule('contact'),
      Icon: Mail,
      badge: 'Direct',
    },
    {
      cmd: '/ai-lab',
      title: 'RAM AI Assistant',
      desc: 'Interactive reasoning & agentic bot',
      action: () => toggleRAM(),
      Icon: Cpu,
      badge: 'Live Bot',
    },
  ];

  return (
    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }} className="space-y-6">
      
      {/* 1. Cyber Title Header Banner */}
      <div style={{
        position: 'relative',
        padding: '24px 20px',
        background: 'var(--synapse-dim)',
        border: '1px solid var(--border-active)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 0 30px var(--synapse-dim)',
        textAlign: 'center',
        overflow: 'hidden',
      }}>
        {/* Subtle grid pattern background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(var(--synapse-glow) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
          pointerEvents: 'none',
        }} />

        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 900,
          letterSpacing: '0.12em',
          color: 'var(--synapse)',
          textShadow: '0 0 25px var(--synapse-glow)',
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 2,
        }}>
          RAMAMOORTHY S
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginTop: '6px',
          position: 'relative',
          zIndex: 2,
          flexWrap: 'wrap',
        }}>
          <span style={{
            fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
            color: 'var(--synapse)',
            letterSpacing: '0.2em',
            fontWeight: 700,
          }}>
            FULL-STACK AI ENGINEER
          </span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
          <span style={{
            fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
            color: 'var(--synapse)',
            letterSpacing: '0.18em',
            fontWeight: 700,
          }}>
            POSTQODE
          </span>
        </div>
      </div>

      {/* 2. Main Two-Column View */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px',
        alignItems: 'stretch',
      }}>
        
        {/* LEFT COLUMN: Clean Developer Profile & Bio */}
        <div style={{
          background: 'rgba(13, 18, 28, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--border-active)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '20px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
        }}>
          <div>
            {/* Status Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 14px',
              background: 'var(--synapse-dim)',
              border: '1px solid var(--border-active)',
              borderRadius: '20px',
              fontSize: '0.7rem',
              fontWeight: 700,
              color: 'var(--synapse)',
              letterSpacing: '0.06em',
              marginBottom: '18px',
            }}>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--synapse)',
                boxShadow: '0 0 10px var(--synapse)',
              }} />
              STATUS: OPEN FOR AI & AGENTIC ROLES
            </div>

            {/* Profile Header Block */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '18px' }}>
              {/* Round Profile Photo - Dynamic Theme Color Ring */}
              <div style={{
                position: 'relative',
                width: '78px',
                height: '78px',
                borderRadius: '50%',
                padding: '2px',
                background: 'var(--synapse)',
                boxShadow: '0 0 20px var(--synapse-glow)',
                flexShrink: 0,
                zIndex: 50,
                isolation: 'isolate',
              }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden' }}>
                  <img
                    src="/ram-portrait.jpg"
                    alt="Ramamoorthy S"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 15%',
                      display: 'block',
                    }}
                  />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: 2,
                  right: 2,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: 'var(--synapse)',
                  border: '2px solid #0D1117',
                  boxShadow: '0 0 8px var(--synapse)',
                }} title="Available for hire" />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#FFF', fontWeight: 800, fontSize: '1.2rem', fontFamily: 'var(--font-display)' }}>
                    Ramamoorthy S
                  </span>
                  <ShieldCheck size={18} color="var(--synapse)" title="Verified AI Engineer" />
                </div>
                <div style={{ color: 'var(--synapse)', fontSize: '0.82rem', fontWeight: 700, marginTop: '2px' }}>
                  AI Engineer @ Postqode
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>📍 India</span>
                  <span>·</span>
                  <button
                    onClick={copyEmail}
                    title="Click to copy email"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: copiedEmail ? 'var(--active)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      padding: 0,
                      textDecoration: 'underline',
                    }}
                  >
                    {copiedEmail ? '✓ Copied!' : Bio.email}
                  </button>
                </div>
              </div>
            </div>

            {/* Bio Narrative */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.65',
              marginBottom: '18px',
            }}>
              Specialist in building autonomous multi-agent workflows using <strong style={{ color: 'var(--synapse)' }}>LangGraph</strong> & <strong style={{ color: 'var(--synapse)' }}>CrewAI</strong>, production RAG pipelines with <strong style={{ color: '#FFF' }}>LangChain</strong>, high-speed <strong style={{ color: '#FFF' }}>FastAPI</strong> microservices, and enterprise cloud deployments on <strong style={{ color: 'var(--synapse)' }}>Azure</strong> & <strong style={{ color: 'var(--synapse)' }}>AWS</strong>.
            </p>

            {/* Core Specialization Pills - Dynamic Theme Colors */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '8px',
              marginBottom: '10px',
            }}>
              <div style={{
                padding: '8px 12px',
                background: 'var(--synapse-dim)',
                border: '1px solid var(--border-active)',
                borderRadius: '6px',
              }}>
                <div style={{ color: 'var(--synapse)', fontSize: '0.72rem', fontWeight: 700 }}>🤖 Agentic Systems</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem', marginTop: '2px' }}>LangGraph · CrewAI</div>
              </div>

              <div style={{
                padding: '8px 12px',
                background: 'var(--synapse-dim)',
                border: '1px solid var(--border-active)',
                borderRadius: '6px',
              }}>
                <div style={{ color: 'var(--synapse)', fontSize: '0.72rem', fontWeight: 700 }}>☁️ Azure & AWS</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem', marginTop: '2px' }}>Cloud Architecture</div>
              </div>

              <div style={{
                padding: '8px 12px',
                background: 'var(--synapse-dim)',
                border: '1px solid var(--border-active)',
                borderRadius: '6px',
              }}>
                <div style={{ color: 'var(--synapse)', fontSize: '0.72rem', fontWeight: 700 }}>⚡ RAG & FastAPI</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem', marginTop: '2px' }}>LangChain · Python</div>
              </div>
            </div>
          </div>

          {/* Quick Link Buttons: Resume, LinkedIn, GitHub - Dynamic Theme Colors */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            paddingTop: '14px',
            borderTop: '1px dashed var(--border-active)',
          }}>
            <a
              href={Bio.resume}
              target="_blank"
              rel="noreferrer"
              style={{
                textAlign: 'center',
                padding: '8px 10px',
                background: 'var(--synapse-dim)',
                border: '1px solid var(--border-active)',
                borderRadius: '6px',
                color: 'var(--synapse)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              📄 Resume
            </a>
            <a
              href={Bio.linkedin}
              target="_blank"
              rel="noreferrer"
              style={{
                textAlign: 'center',
                padding: '8px 10px',
                background: 'var(--synapse-dim)',
                border: '1px solid var(--border-active)',
                borderRadius: '6px',
                color: 'var(--synapse)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              💼 LinkedIn
            </a>
            <a
              href={Bio.github}
              target="_blank"
              rel="noreferrer"
              style={{
                textAlign: 'center',
                padding: '8px 10px',
                background: 'var(--synapse-dim)',
                border: '1px solid var(--border-active)',
                borderRadius: '6px',
                color: 'var(--synapse)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              🐙 GitHub
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive System Modules */}
        <div style={{
          background: 'rgba(13, 18, 28, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--border-active)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
        }}>
          <div style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            color: 'var(--synapse)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '6px',
            borderBottom: '1px solid var(--border)',
          }}>
            <span>INTERACTIVE MODULE NAVIGATION</span>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 500 }}>click to switch view ➔</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {navItems.map((item) => {
              const Icon = item.Icon;
              return (
                <button
                  key={item.cmd}
                  onClick={item.action}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--synapse-dim)';
                    e.currentTarget.style.borderColor = 'var(--border-active)';
                    e.currentTarget.style.boxShadow = '0 0 15px var(--synapse-dim)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '6px',
                      background: 'var(--synapse-dim)',
                      border: '1px solid var(--border-active)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={16} color="var(--synapse)" />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#FFF', fontWeight: 700, fontSize: '0.85rem' }}>
                          {item.title}
                        </span>
                        <span style={{
                          color: 'var(--synapse)',
                          background: 'var(--synapse-dim)',
                          border: '1px solid var(--border-active)',
                          fontSize: '0.62rem',
                          padding: '1px 6px',
                          borderRadius: '3px',
                          fontWeight: 700,
                        }}>
                          {item.badge}
                        </span>
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '2px' }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  <ArrowRight size={16} color="var(--synapse)" />
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. System Telemetry Drawer */}
      <div style={{
        padding: '14px 18px',
        background: 'rgba(0, 0, 0, 0.35)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
        }} onClick={() => setShowSpecs(!showSpecs)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--synapse)' }}>
            <Terminal size={15} />
            SYSTEM TELEMETRY & SPECIFICATIONS ({showSpecs ? 'HIDE DETAILS' : 'EXPAND DETAILS'})
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {colorBlocks.map((c, i) => (
              <span key={i} style={{ width: 10, height: 10, borderRadius: 2, background: c, display: 'inline-block' }} />
            ))}
          </div>
        </div>

        {showSpecs && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '8px 18px',
            marginTop: '14px',
            paddingTop: '14px',
            borderTop: '1px dashed var(--border)',
            fontSize: '0.74rem',
          }}>
            {specs.map(s => (
              <div key={s.label} style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--synapse)', fontWeight: 700, width: '120px' }}>{s.label}:</span>
                <span style={{ color: 'var(--text-secondary)' }}>{s.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
