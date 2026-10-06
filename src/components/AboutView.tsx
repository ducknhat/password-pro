import React from 'react';
import { GraduationCap, FileCheck, AlertTriangle } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div>
      {/* Course Context Header */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 className="card-title">
          <GraduationCap size={22} color="#00f2fe" />
          Academic Project Overview
        </h2>
        <p className="card-desc">
          <strong>PasswordGuard:</strong> Password Security and Authentication — Common Threats and Protection Methods.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1rem', fontSize: '0.88rem', color: '#cbd5e1' }}>
          <div>
            <strong>Course:</strong> English Presentation Skills for Information Technology Students (University Level).
          </div>
          <div>
            <strong>Objective:</strong> Help IT undergraduates understand password strength dynamics, search-space mathematics, password hashing, salting, brute-force resistance, and modern defense architecture through a clean, demonstrative single-page web app.
          </div>
          <div>
            <strong>Deliverables:</strong>
            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.35rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <li>1. Working client-side software demonstration (React + Vite + TypeScript)</li>
              <li>2. Reproducible experimental results on 150 synthetic passwords</li>
              <li>3. Academic report drafts with formal research methodology</li>
              <li>4. 10-slide presentation outline with simple English speaker notes</li>
              <li>5. Comprehensive Q&A preparation guide (20+ technical and simple responses)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Academic Limitations & Transparency */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 className="card-title">
          <AlertTriangle size={20} color="#f59e0b" />
          Academic Honesty & Explicit Limitations
        </h3>
        <p className="card-desc">
          Rigorous science requires clear boundaries. This system acknowledges the following formal limitations:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.9rem', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
            <strong style={{ color: '#fde68a' }}>1. Heuristic Scoring, Not Formal Standard:</strong>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              The 0–100 score is an educational heuristic weighting length and character diversity. It does not certify compliance with NIST SP 800-63B or ISO/IEC 27001 standards.
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.9rem', borderRadius: '8px', borderLeft: '3px solid #00f2fe' }}>
            <strong style={{ color: '#93c5fd' }}>2. Theoretical Character-Space Entropy Assumption:</strong>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Entropy calculations represent theoretical character-space estimates under an assumption of uniform, independent character selection. Real human passwords suffer from cognitive patterns that make actual resistance lower than this theoretical upper bound.
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.9rem', borderRadius: '8px', borderLeft: '3px solid #ef4444' }}>
            <strong style={{ color: '#fca5a5' }}>3. Illustrative Brute-Force Models:</strong>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              The brute-force guessing times assume idealized uniform exhaustive searches (R^L / 2). In real breaches, attackers rarely begin with pure brute force; they prioritize targeted wordlists, rule-based transforms, and leaked password dumps.
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.9rem', borderRadius: '8px', borderLeft: '3px solid #a855f7' }}>
            <strong style={{ color: '#d8b4fe' }}>4. SHA-256 is for Educational Demonstration Only:</strong>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              The hashing section utilizes browser Web Crypto SHA-256 strictly to visually demonstrate one-way transforms and salting. SHA-256 is NOT recommended for production password storage, which requires dedicated memory-hard functions like Argon2id, bcrypt, or scrypt.
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.9rem', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
            <strong style={{ color: '#a7f3d0' }}>5. Synthetic Dataset & Heuristic Evaluation Boundary:</strong>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              The 150 experimental passwords were synthetically modeled to adhere to ethical standards. The experiment evaluates the internal consistency of the PasswordGuard heuristic across controlled structural categories rather than acting as a universal cracking benchmark.
            </div>
          </div>
        </div>
      </div>

      {/* Zero Storage Privacy Architecture */}
      <div className="card">
        <h3 className="card-title">
          <FileCheck size={20} color="#10b981" />
          Zero-Storage Privacy Architecture
        </h3>
        <p className="card-desc">
          Strict technical adherence to privacy by design.
        </p>

        <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          PasswordGuard operates exclusively on the client device. It communicates with no external telemetry, uses no tracking cookies, sets no persistent browser storage (localStorage / sessionStorage / IndexedDB), and sends zero network requests. Any candidate password entered is purged upon tab close or page reload.
        </div>
      </div>
    </div>
  );
};
