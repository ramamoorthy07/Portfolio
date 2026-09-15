import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, FileText, Copy, Check, Send } from 'lucide-react';
import { Bio } from '../../data/portfolioData';
import emailjs from '@emailjs/browser';

// EmailJS config — set these in .env file at the project root:
// VITE_EMAILJS_SERVICE_ID=your_service_id
// VITE_EMAILJS_TEMPLATE_ID=your_template_id
// VITE_EMAILJS_PUBLIC_KEY=your_public_key
const EMAILJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || '';
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PK       = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || '';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function Contact() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ from_name: '', from_email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [copied, setCopied] = useState(null);

  function validate() {
    const e = {};
    if (!form.from_name.trim())  e.from_name  = 'Name is required';
    if (!form.from_email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.from_email))
      e.from_email = 'Valid email required';
    if (!form.subject.trim())    e.subject    = 'Subject is required';
    if (!form.message.trim())    e.message    = 'Message is required';
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }


  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    if (!EMAILJS_SERVICE || !EMAILJS_TEMPLATE || !EMAILJS_PK) {
      alert('Contact form not configured yet. Please email directly at ' + (Bio.email || 'kts.ramamoorthy07@gmail.com'));
      return;
    }

    setStatus('sending');
    try {
      // EmailJS v4 sendForm — 4th arg is options object with publicKey
      await emailjs.sendForm(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        formRef.current,
        { publicKey: EMAILJS_PK }
      );
      setStatus('sent');
      setForm({ from_name: '', from_email: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  }

  function handleCopy(field, value) {
    navigator.clipboard.writeText(value);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  }

  const channels = [
    {
      id: 'email',
      label: 'Email',
      value: Bio.email || 'kts.ramamoorthy07@gmail.com',
      Icon: Mail,
      href: `mailto:${Bio.email || 'kts.ramamoorthy07@gmail.com'}`,
      color: 'var(--synapse)',
      copyable: true,
    },
    {
      id: 'github',
      label: 'GitHub',
      value: 'github.com/ramamoorthy07',
      Icon: Github,
      href: Bio.github,
      color: 'var(--deep)',
      copyable: false,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/ramamoorthy07/',
      Icon: Linkedin,
      href: Bio.linkedin,
      color: 'var(--active)',
      copyable: false,
    },
    {
      id: 'resume',
      label: 'Resume',
      value: 'View / Download PDF',
      Icon: FileText,
      href: Bio.resume,
      color: 'var(--warning)',
      copyable: false,
    },
  ];

  return (
    <section id="contact" className="module-wrapper section" aria-label="Contact">
      <motion.div variants={container} initial="hidden" animate="show">

        <motion.div variants={item} className="module-header">
          <div className="module-eyebrow">Contact</div>
          <h2 className="module-title">Get in Touch</h2>
          <p className="module-subtitle">
            Open to AI/ML projects, freelance work, and full-time opportunities.
            Fast response guaranteed.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)', gap: 'var(--space-8)', alignItems: 'start' }}>

          {/* Direct channels */}
          <motion.div variants={item}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 'var(--space-4)',
            }}>
              Direct Channels
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {channels.map(ch => (
                <div
                  key={ch.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-4)',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    transition: 'border-color var(--transition-fast)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-active)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', minWidth: 0 }}>
                    <div style={{
                      width: '36px', height: '36px',
                      borderRadius: 'var(--radius-md)',
                      background: `${ch.color}18`,
                      border: `1px solid ${ch.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <ch.Icon size={16} color={ch.color} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}>
                        {ch.label}
                      </div>
                      <a
                        href={ch.href}
                        target={ch.id !== 'email' ? '_blank' : undefined}
                        rel="noreferrer"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.8125rem',
                          fontWeight: 600,
                          color: ch.color,
                          textDecoration: 'none',
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {ch.value}
                      </a>
                    </div>
                  </div>
                  {ch.copyable && (
                    <button
                      onClick={() => handleCopy(ch.id, ch.value)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: copied === ch.id ? 'var(--active)' : 'var(--text-muted)',
                        padding: '4px', display: 'flex', flexShrink: 0,
                        transition: 'color var(--transition-fast)',
                      }}
                      title="Copy to clipboard"
                    >
                      {copied === ch.id ? <Check size={15} /> : <Copy size={15} />}
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 'var(--space-6)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span className="status-dot animate-pulse-dot" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--active)' }}>
                {Bio.status} · Fast response
              </span>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div variants={item}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 'var(--space-4)',
            }}>
              Send a Message
            </div>

            {status === 'sent' ? (
              <div style={{
                background: 'var(--active-dim)',
                border: '1px solid rgba(61,220,132,0.3)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-8)',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: 'var(--space-3)' }}>✓</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--active)', marginBottom: 'var(--space-2)' }}>
                  Message sent
                </div>
                <p style={{ fontSize: '0.875rem' }}>
                  Ram will get back to you soon.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {[
                    { name: 'from_name',    label: 'Your Name',    type: 'text',  placeholder: 'Jane Smith' },
                    { name: 'from_email',   label: 'Email',        type: 'email', placeholder: 'jane@company.com' },
                    { name: 'subject',      label: 'Subject',      type: 'text',  placeholder: 'AI project collaboration' },
                  ].map(({ name, label, type, placeholder }) => (
                    <div key={name} className="contact-field">
                      <label className="contact-label" htmlFor={`contact-${name}`}>{label}</label>
                      <input
                        id={`contact-${name}`}
                        name={name}
                        type={type}
                        className="contact-input"
                        placeholder={placeholder}
                        value={form[name]}
                        onChange={handleChange}
                        aria-invalid={!!errors[name]}
                        aria-describedby={errors[name] ? `error-${name}` : undefined}
                      />
                      {errors[name] && (
                        <span id={`error-${name}`} style={{ fontSize: '0.75rem', color: 'var(--fire)' }}>
                          {errors[name]}
                        </span>
                      )}
                    </div>
                  ))}

                  <div className="contact-field">
                    <label className="contact-label" htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className="contact-textarea"
                      placeholder="Tell me about your project or opportunity..."
                      value={form.message}
                      onChange={handleChange}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--fire)' }}>{errors.message}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <>Sending...</>
                    ) : (
                      <><Send size={15} /> Send Message</>
                    )}
                  </button>

                  {status === 'error' && (
                    <p style={{ fontSize: '0.8125rem', color: 'var(--fire)', textAlign: 'center' }}>
                      Something went wrong. Try emailing directly.
                    </p>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}
