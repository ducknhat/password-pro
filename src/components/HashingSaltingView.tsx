import React, { useState, useEffect } from 'react';
import { 
  Lock, RefreshCw, AlertTriangle, ShieldAlert, Cpu, 
  Key, Database 
} from 'lucide-react';
import { runHashAndSaltDemo, generateRandomSalt, type HashDemoResult } from '../utils/cryptoDemo';

export const HashingSaltingView: React.FC = () => {
  const [inputPassword, setInputPassword] = useState('ExamplePassword123!');
  const [salt, setSalt] = useState(() => generateRandomSalt(16));
  const [demoResult, setDemoResult] = useState<HashDemoResult | null>(null);

  // Compute live hash on password or salt change
  useEffect(() => {
    let isMounted = true;
    runHashAndSaltDemo(inputPassword, salt).then(res => {
      if (isMounted) setDemoResult(res);
    });
    return () => { isMounted = false; };
  }, [inputPassword, salt]);

  const handleRegenerateSalt = () => {
    const newSalt = generateRandomSalt(16);
    setSalt(newSalt);
  };

  return (
    <div>
      {/* Critical Security Disclaimer Banner */}
      <div className="alert-box alert-danger" style={{ marginBottom: '1.5rem', alignItems: 'flex-start' }}>
        <AlertTriangle size={22} style={{ flexShrink: 0, marginTop: '2px', color: '#f87171' }} />
        <div>
          <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.2rem', color: '#fecaca' }}>
            CRITICAL ACADEMIC & SECURITY NOTICE: SHA-256 is for Educational Demonstration Only
          </div>
          <div style={{ fontSize: '0.85rem', color: '#fca5a5' }}>
            SHA-256 is demonstrated here solely to illustrate one-way hashing and salting concepts. Computing <code>SHA-256(password + salt)</code> does <strong>not</strong> constitute a production password-storage architecture. General-purpose hashes are fast, allowing high-performance cracking rigs to test billions of guesses per second. Production authentication systems must exclusively employ dedicated, slow, memory-hard Key Derivation Functions (KDFs) such as <strong>Argon2id</strong>, <strong>bcrypt</strong>, or <strong>scrypt</strong>.
          </div>
        </div>
      </div>

      {/* Interactive Hashing & Salting Playground */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 className="card-title">
          <Lock size={20} color="#00f2fe" />
          Interactive One-Way Hashing & Salting Demonstration
        </h2>
        <p className="card-desc">
          Using the browser's native Web Crypto API (<code style={{ fontFamily: 'var(--font-mono)' }}>crypto.subtle.digest('SHA-256')</code>) to demonstrate one-way functions, digest uniqueness, and the role of cryptographic salting.
        </p>

        {/* Input Controls */}
        <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Plaintext Password (Input):
            </label>
            <div className="input-group">
              <input
                id="crypto-password-input"
                type="text"
                className="password-field"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                placeholder="Type a password..."
                spellCheck="false"
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Cryptographic Salt (16 Random Bytes in Hex):
              </label>
              <button
                id="generate-salt-btn"
                className="icon-btn"
                onClick={handleRegenerateSalt}
                title="Generate fresh random salt"
                style={{ fontSize: '0.78rem', color: '#00f2fe', display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.5rem' }}
                type="button"
              >
                <RefreshCw size={14} /> New Salt
              </button>
            </div>
            <div className="input-group">
              <input
                id="crypto-salt-input"
                type="text"
                className="password-field"
                value={salt}
                onChange={(e) => setSalt(e.target.value)}
                placeholder="16-byte random hex salt..."
                spellCheck="false"
              />
            </div>
          </div>
        </div>

        {/* Live Comparison Cards */}
        {demoResult && (
          <div className="grid-2">
            {/* Unsalted Output */}
            <div style={{ background: 'rgba(239, 68, 68, 0.04)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1.25rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.92rem' }}>
                <Database size={16} />
                Unsalted SHA-256 Digest (Vulnerable)
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                <code style={{ color: '#cbd5e1' }}>SHA-256(password)</code> — Identical passwords always produce the identical hash, exposing users to precomputed Rainbow Table lookups.
              </p>
              <div className="mono-snippet" style={{ color: '#f87171', fontSize: '0.78rem' }}>
                {demoResult.unsaltedHash}
              </div>
            </div>

            {/* Salted Output */}
            <div style={{ background: 'rgba(16, 185, 129, 0.04)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '1.25rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.92rem' }}>
                <Key size={16} />
                Salted SHA-256 Digest (Unique)
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                <code style={{ color: '#cbd5e1' }}>SHA-256(password + salt)</code> — Every user receives a unique cryptographic salt. Salting ensures unique hash outputs even for identical passwords, invalidating precomputed Rainbow Table lookups.
              </p>
              <div className="mono-snippet" style={{ color: '#34d399', fontSize: '0.78rem' }}>
                {demoResult.saltedHash}
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '1.25rem', fontSize: '0.82rem', color: 'var(--text-dim)', textAlign: 'right' }}>
          Browser Web Crypto Execution Time: {demoResult?.executionTimeMs ?? 0} ms
        </div>
      </div>

      {/* Hashing vs Encryption & Why Production Uses Slow KDFs */}
      <div className="grid-2">
        {/* Hashing vs Encryption Card */}
        <div className="card">
          <h3 className="card-title">
            <ShieldAlert size={18} color="#00f2fe" />
            Hashing vs. Encryption
          </h3>
          <p className="card-desc">Crucial distinction frequently tested in university IT exams.</p>

          <table className="data-table" style={{ fontSize: '0.84rem' }}>
            <thead>
              <tr>
                <th>Property</th>
                <th>Cryptographic Hashing</th>
                <th>Symmetric / Asymmetric Encryption</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Direction</td>
                <td style={{ color: '#34d399', fontWeight: 600 }}>One-way (irreversible)</td>
                <td style={{ color: '#60a5fa', fontWeight: 600 }}>Two-way (reversible with key)</td>
              </tr>
              <tr>
                <td>Output Length</td>
                <td>Fixed (e.g. 256 bits)</td>
                <td>Variable (matches plaintext + padding)</td>
              </tr>
              <tr>
                <td>Key Required?</td>
                <td>No key needed (deterministic)</td>
                <td>Requires private/secret decryption key</td>
              </tr>
              <tr>
                <td>Primary Purpose</td>
                <td>Integrity, password verification</td>
                <td>Confidentiality in transit/at rest</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modern KDF Algorithms */}
        <div className="card">
          <h3 className="card-title">
            <Cpu size={18} color="#a855f7" />
            Production Key Derivation Functions (KDFs)
          </h3>
          <p className="card-desc">Algorithms approved for real-world authentication storage.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.85rem', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
              <div style={{ fontWeight: 700, color: '#34d399', fontSize: '0.9rem' }}>Argon2id (Modern Gold Standard)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Winner of the Password Hashing Competition (PHC). Memory-hard and time-configurable, neutralizing GPU and ASIC cracking parallelism.
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.85rem', borderRadius: '8px', borderLeft: '3px solid #00f2fe' }}>
              <div style={{ fontWeight: 700, color: '#00f2fe', fontSize: '0.9rem' }}>bcrypt (Proven Workhorse)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Based on the Blowfish cipher. Highly resilient with configurable work factor (cost parameter 12+), supported across nearly all backend platforms.
              </div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.85rem', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
              <div style={{ fontWeight: 700, color: '#f59e0b', fontSize: '0.9rem' }}>scrypt & PBKDF2 (Legacy & Standards)</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                PBKDF2 is NIST-standardized (requiring 600,000+ HMAC iterations today). scrypt introduced memory-hardness before Argon2.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
