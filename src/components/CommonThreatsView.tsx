import React from 'react';
import { 
  AlertOctagon, ShieldAlert, RefreshCw, KeyRound, Globe, 
  Smartphone, Lock, EyeOff, FileText, CheckCircle2 
} from 'lucide-react';

export const CommonThreatsView: React.FC = () => {
  const threats = [
    {
      id: 'weak',
      title: '1. Weak & Predictable Passwords',
      icon: <EyeOff size={20} color="#f87171" />,
      desc: 'Users frequently choose short, easily guessable words, sequential numbers, or personal information (birthdays, pet names).',
      impact: 'Allows instant compromise via standard dictionary wordlists (e.g. RockYou).'
    },
    {
      id: 'reuse',
      title: '2. Password Reuse Across Services',
      icon: <RefreshCw size={20} color="#fbbf24" />,
      desc: 'Using the exact same password for email, banking, social networks, and casual discussion boards.',
      impact: 'A breach at a single low-security forum compromises the user’s critical financial and personal accounts.'
    },
    {
      id: 'bruteforce',
      title: '3. Brute-Force & Dictionary Attacks',
      icon: <ShieldAlert size={20} color="#ef4444" />,
      desc: 'Automated tools (Hashcat, John the Ripper) exhaustively testing millions of combinations or common word mutations.',
      impact: 'Fast hash functions make large-scale offline password guessing substantially cheaper for attackers than memory-hard functions.'
    },
    {
      id: 'stuffing',
      title: '4. Credential Stuffing',
      icon: <AlertOctagon size={20} color="#f97316" />,
      desc: 'Attackers use botnets to test billions of username/password pairs leaked from past third-party data breaches against new services.',
      impact: 'Automated large-scale takeovers requiring minimal effort from attackers.'
    },
    {
      id: 'phishing',
      title: '5. Phishing & Social Engineering',
      icon: <Globe size={20} color="#ec4899" />,
      desc: 'Deceptive emails, fake login interfaces, or spoofed domains tricking users into volunteering their credentials.',
      impact: 'Bypasses password complexity entirely because the user willingly gives away the secret.'
    }
  ];

  const defenses = [
    {
      title: 'Strong, Unique Passwords',
      icon: <KeyRound size={18} color="#34d399" />,
      desc: 'Every account has an independent, non-overlapping secret, neutralizing credential stuffing across services.'
    },
    {
      title: 'Password Managers',
      icon: <Lock size={18} color="#00f2fe" />,
      desc: 'Tools like Bitwarden or 1Password generate, store, and auto-fill 20+ character random credentials in encrypted vaults.'
    },
    {
      title: 'Slow Hashing & Unique Salts',
      icon: <FileText size={18} color="#a855f7" />,
      desc: 'Use Argon2id or bcrypt with unique cryptographic salts to make offline cracking computationally infeasible.'
    },
    {
      title: 'Multi-Factor Authentication (MFA)',
      icon: <Smartphone size={18} color="#38bdf8" />,
      desc: 'Requires a secondary factor (TOTP authenticator app, FIDO2 hardware security key), neutralizing stolen passwords.'
    },
    {
      title: 'Rate Limiting & Lockouts',
      icon: <ShieldAlert size={18} color="#f59e0b" />,
      desc: 'Web applications restrict failed login attempts, enforce IP throttling, and present CAPTCHAs against bots.'
    },
    {
      title: 'Breached Password Checking',
      icon: <CheckCircle2 size={18} color="#10b981" />,
      desc: 'Integrating APIs (such as HaveIBeenPwned k-Anonymity model) to block compromised passwords at registration.'
    },
    {
      title: 'HTTPS & Transport Security',
      icon: <Globe size={18} color="#60a5fa" />,
      desc: 'TLS encryption prevents interception and man-in-the-middle eavesdropping between client and server.'
    },
    {
      title: 'Secure Password Reset Flows',
      icon: <RefreshCw size={18} color="#c084fc" />,
      desc: 'Cryptographically random single-use time-limited tokens sent through verified out-of-band channels.'
    }
  ];

  return (
    <div>
      {/* Title */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 className="card-title">
          <AlertOctagon size={20} color="#ef4444" />
          Common Authentication Threats
        </h2>
        <p className="card-desc">
          Modern authentication vulnerabilities rarely originate from flaws in mathematics—they stem from human behavior, reuse, and weak storage.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1rem' }}>
          {threats.map(t => (
            <div key={t.id} style={{ display: 'flex', gap: '1rem', background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ marginTop: '2px', flexShrink: 0 }}>{t.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff', marginBottom: '0.2rem' }}>
                  {t.title}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  {t.desc}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#fca5a5', background: 'rgba(239, 68, 68, 0.08)', padding: '0.3rem 0.6rem', borderRadius: '6px', display: 'inline-block' }}>
                  <strong>Impact:</strong> {t.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Defense Mechanisms */}
      <div className="card">
        <h2 className="card-title">
          <ShieldAlert size={20} color="#10b981" />
          Essential Protection & Defense Mechanisms
        </h2>
        <p className="card-desc">
          Industry-standard security layers that protect authentication systems from end-to-end.
        </p>

        <div className="grid-2" style={{ marginTop: '1.25rem' }}>
          {defenses.map(d => (
            <div key={d.title} style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem 1.15rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.35rem', fontSize: '0.92rem' }}>
                {d.icon}
                {d.title}
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                {d.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
