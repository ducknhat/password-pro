import React from 'react';
import { BookOpen, Key, Binary, Layers, Brain, CheckCircle, ShieldCheck } from 'lucide-react';

export const HowPasswordsWorkView: React.FC = () => {
  return (
    <div>
      {/* Overview Card */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 className="card-title">
          <BookOpen size={20} color="#00f2fe" />
          How Password Authentication Works
        </h2>
        <p className="card-desc">
          Password authentication is based on a "shared secret" protocol. The user proves their identity by presenting a secret string known only to the user and the authenticating server.
        </p>

        <div className="grid-3" style={{ marginTop: '1.25rem' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#00f2fe', fontWeight: 700, marginBottom: '0.5rem' }}>
              <Key size={18} />
              1. Shared Secret
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              The client enters a secret string. If the secret matches the stored cryptographic record, access is granted.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontWeight: 700, marginBottom: '0.5rem' }}>
              <Binary size={18} />
              2. Search Space (R^L)
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              Security relies on making the number of possible secrets mathematically astronomical, so guessing is computationally unfeasible.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontWeight: 700, marginBottom: '0.5rem' }}>
              <ShieldCheck size={18} />
              3. One-Way Verification
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              Servers never store passwords in plaintext. Instead, they store a salted cryptographic hash to verify without knowing the plain text.
            </p>
          </div>
        </div>
      </div>

      {/* The Mathematics of Password Search Space */}
      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        <div className="card">
          <h3 className="card-title">
            <Layers size={18} color="#00f2fe" />
            Character Spaces & Base Multipliers
          </h3>
          <p className="card-desc">
            The size of the character pool (R) determines the base of the exponential complexity equation.
          </p>

          <table className="data-table">
            <thead>
              <tr>
                <th>Character Class</th>
                <th>Set Definition</th>
                <th>Size (R)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Digits</td>
                <td><code className="mono-snippet">0-9</code></td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>10</td>
              </tr>
              <tr>
                <td>Lowercase Letters</td>
                <td><code className="mono-snippet">a-z</code></td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>26</td>
              </tr>
              <tr>
                <td>Uppercase Letters</td>
                <td><code className="mono-snippet">A-Z</code></td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>26</td>
              </tr>
              <tr>
                <td>Common Special Symbols</td>
                <td><code className="mono-snippet">!@#$%^&*()_+-=[]...</code></td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>33</td>
              </tr>
              <tr style={{ background: 'rgba(0, 242, 254, 0.05)', fontWeight: 700 }}>
                <td>Full Printable ASCII Space</td>
                <td>All combined pools</td>
                <td style={{ fontFamily: 'var(--font-mono)', color: '#00f2fe' }}>95</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <h3 className="card-title">
            <Brain size={18} color="#a855f7" />
            Theoretical vs. Human Cognitive Entropy
          </h3>
          <p className="card-desc">
            Why mathematical entropy formulas can overestimate human password safety.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.9rem', borderRadius: '8px', borderLeft: '3px solid #00f2fe' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#00f2fe' }}>Shannon Entropy Formula</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', margin: '0.3rem 0', color: '#cbd5e1' }}>
                Entropy (bits) = Length × log₂(Character Pool Size)
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                This assumes every character has an equal probability (uniform distribution) of being picked.
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.9rem', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f59e0b' }}>The Human Factor (Cognitive Biases)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                Humans do not pick uniform random characters. They pick capital letters first, put numbers at the end (e.g. <code>Password123!</code>), and use keyboard paths (<code>qwerty</code>). Attackers exploit these biases with dictionary and rule-based cracking engines.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Passphrase Principle */}
      <div className="card">
        <h3 className="card-title">
          <CheckCircle size={18} color="#10b981" />
          The Passphrase Paradigm: Length Beats Complexity
        </h3>
        <p className="card-desc">
          Comparing traditional complex short passwords vs. modern multi-word passphrases.
        </p>

        <div className="grid-2">
          <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1.25rem', borderRadius: '12px' }}>
            <div style={{ fontWeight: 700, color: '#f87171', marginBottom: '0.5rem' }}>
              ❌ Complex Short Password: <code style={{ fontFamily: 'var(--font-mono)' }}>Tr0ub4dor&3</code>
            </div>
            <ul style={{ fontSize: '0.85rem', color: '#cbd5e1', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <li>Length: 11 characters</li>
              <li>High cognitive load: Difficult for humans to remember accurately</li>
              <li>Prone to post-it notes and insecure re-use</li>
              <li>Guess space: ~72¹¹ ≈ 3.7 × 10²⁰ combinations</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1.25rem', borderRadius: '12px' }}>
            <div style={{ fontWeight: 700, color: '#34d399', marginBottom: '0.5rem' }}>
              ✓ Multi-Word Passphrase: <code style={{ fontFamily: 'var(--font-mono)' }}>correct-horse-battery-staple</code>
            </div>
            <ul style={{ fontSize: '0.85rem', color: '#cbd5e1', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <li>Length: 28 characters</li>
              <li>Easy for humans to visualize and remember</li>
              <li>Immense brute-force search space: ~28 × log₂(27) ≈ 133 bits of theoretical entropy</li>
              <li>Recommended by NIST SP 800-63B guidelines</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
