import React, { useState } from 'react';
import { 
  Shield, Eye, EyeOff, XCircle, AlertTriangle, CheckCircle2, 
  HelpCircle, Cpu, Zap, ArrowRight, Sparkles 
} from 'lucide-react';
import { analyzePassword } from '../utils/passwordAnalyzer';

export const AnalyzerView: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const result = analyzePassword(password);

  const presets = [
    { label: 'Short Simple', val: 'cat' },
    { label: 'Common Pattern', val: 'Password123!' },
    { label: 'Sequential', val: 'qwerty123456' },
    { label: 'Medium Complex', val: 'BlueSky#49' },
    { label: 'Long Passphrase', val: 'correct-horse-battery-staple' },
    { label: 'Strong Random', val: '7$zW#9!kLp&2Qx@m' }
  ];

  return (
    <div>
      {/* Privacy Notice Banner */}
      <div className="privacy-banner">
        <Shield size={18} />
        <div>
          <strong>Privacy Notice:</strong> PasswordGuard is designed to perform password analysis locally in the browser and does not include an application backend for password submission. Entered text is not intentionally persisted after the session.
        </div>
      </div>

      {/* Main Analyzer Card */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 className="card-title">
          <Sparkles size={20} color="#00f2fe" />
          Interactive Password Strength Evaluator
        </h2>
        <p className="card-desc">
          Type or paste a candidate password to inspect character space, heuristic score, entropy, and search complexity.
        </p>

        {/* Input Field */}
        <div className="input-group">
          <input
            id="password-input-field"
            type={showPassword ? 'text' : 'password'}
            className="password-field"
            placeholder="Enter password to analyze..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
          <div className="input-actions">
            {password.length > 0 && (
              <button 
                id="clear-password-btn"
                className="icon-btn" 
                onClick={() => setPassword('')}
                title="Clear input"
                type="button"
              >
                <XCircle size={18} />
              </button>
            )}
            <button
              id="toggle-visibility-btn"
              className="icon-btn"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? 'Hide password' : 'Show password'}
              type="button"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Preset Chips */}
        <div className="sample-presets">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>Quick Presets:</span>
          {presets.map(p => (
            <button
              key={p.label}
              className="preset-chip"
              onClick={() => setPassword(p.val)}
              type="button"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Strength Meter Bar */}
        <div className="meter-container">
          <div className="meter-header">
            <div>
              <span className="tier-badge" style={{ backgroundColor: `${result.tierColor}20`, color: result.tierColor, border: `1px solid ${result.tierColor}60` }}>
                {result.tier}
              </span>
              <span style={{ marginLeft: '0.75rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {result.passwordLength === 0 
                  ? 'Awaiting candidate password' 
                  : result.score < 40 
                    ? 'Weak according to PasswordGuard heuristic' 
                    : result.score < 70 
                      ? 'Medium according to PasswordGuard heuristic' 
                      : 'Strong according to PasswordGuard heuristic'}
              </span>
            </div>
            <div className="score-text" style={{ color: result.tierColor }}>
              {result.score} <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>/ 100</span>
            </div>
          </div>

          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ 
                width: `${Math.max(password ? 3 : 0, result.score)}%`, 
                backgroundColor: result.tierColor,
                boxShadow: `0 0 10px ${result.tierColor}80`
              }} 
            />
          </div>

          <p className="heuristic-note">
            * Note: Educational heuristic score reflecting structural complexity. The result does not guarantee real-world security.
          </p>
        </div>

        {/* Score Breakdown */}
        {password.length > 0 && (
          <div style={{ marginTop: '0.75rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
              <span className="check-detail-tag">Length: +{result.scoreBreakdown.lengthScore}</span>
              <span className="check-detail-tag">Variety: +{result.scoreBreakdown.varietyScore}</span>
              {result.scoreBreakdown.diversityBonus > 0 && (
                <span className="check-detail-tag" style={{ color: '#34d399' }}>Diversity Bonus: +{result.scoreBreakdown.diversityBonus}</span>
              )}
              {result.scoreBreakdown.passphraseBonus > 0 && (
                <span className="check-detail-tag" style={{ color: '#38bdf8' }}>Passphrase Bonus: +{result.scoreBreakdown.passphraseBonus}</span>
              )}
              {result.scoreBreakdown.penalties > 0 && (
                <span className="check-detail-tag" style={{ color: '#f87171' }}>Penalties: -{result.scoreBreakdown.penalties}</span>
              )}
              <span className="check-detail-tag" style={{ fontWeight: 700, borderColor: 'var(--border-color)', color: '#e2e8f0' }}>
                Raw Score: {result.scoreBreakdown.rawScore}
                {result.scoreBreakdown.rawScore !== result.score && ` (Clamped to ${result.score})`}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Grid: Security Checklist & Warnings / Recommendations */}
      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        {/* Security Checklist */}
        <div className="card">
          <h3 className="card-title">
            <CheckCircle2 size={18} color="#10b981" />
            Security Checklist
          </h3>
          <p className="card-desc">Evaluation of standard password composition rules.</p>
          <ul className="checklist">
            {result.checks.map(chk => (
              <li key={chk.id} className={`check-item ${chk.passed ? 'check-item-passed' : 'check-item-failed'}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {chk.passed ? (
                    <CheckCircle2 size={16} color="#10b981" />
                  ) : (
                    <XCircle size={16} color="#64748b" />
                  )}
                  <span>{chk.label}</span>
                </div>
                {chk.detail && <span className="check-detail-tag">{chk.detail}</span>}
              </li>
            ))}
          </ul>
        </div>

        {/* Warnings and Recommendations */}
        <div className="card">
          <h3 className="card-title">
            <AlertTriangle size={18} color="#f59e0b" />
            Vulnerabilities & Recommendations
          </h3>
          <p className="card-desc">Identified weaknesses and actionable improvement steps.</p>

          {/* Warnings */}
          {result.warnings.length > 0 ? (
            result.warnings.map((w, i) => (
              <div key={i} className="alert-box alert-warning">
                <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>{w}</div>
              </div>
            ))
          ) : (
            password.length >= 12 && (
              <div className="alert-box alert-info">
                <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px', color: '#60a5fa' }} />
                <div>No critical sequential or common dictionary patterns detected.</div>
              </div>
            )
          )}

          {/* Recommendations list */}
          <div style={{ marginTop: '1rem' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Recommendations:
            </h4>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.86rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {result.recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Grid: Entropy & Search Space */}
      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        {/* Estimated Entropy Card */}
        <div className="card">
          <h3 className="card-title">
            <Zap size={18} color="#00f2fe" />
            Theoretical Character-Space Entropy Estimate
          </h3>
          <p className="card-desc">Theoretical measure of uncertainty based on character pool size under a uniform-character assumption.</p>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2.4rem', fontWeight: 800, color: '#00f2fe', fontFamily: 'var(--font-mono)' }}>
              {result.estimatedEntropyBits}
            </span>
            <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>bits (theoretical estimate)</span>
          </div>

          <div className="mono-snippet" style={{ marginBottom: '1rem' }}>
            Formula: E = L × log₂(R)<br />
            L (Length) = {result.passwordLength} | R (Character Pool) = {result.characterPoolSize}
          </div>

          <div className="alert-box alert-info" style={{ fontSize: '0.82rem' }}>
            <HelpCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Academic Note:</strong> This calculation represents a theoretical character-space entropy estimate under a uniform-character assumption. Human-generated passwords are not uniformly random, so actual guessability may be substantially worse than this estimate suggests.
            </div>
          </div>
        </div>

        {/* Brute-force Search Space and Time Complexity */}
        <div className="card">
          <h3 className="card-title">
            <Cpu size={18} color="#a855f7" />
            Illustrative Search Space & Guessing Time
          </h3>
          <p className="card-desc">Theoretical time required under illustrative assumed guessing rates (not a hardware benchmark).</p>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Theoretical Combinations:</div>
            <div className="mono-snippet" style={{ color: '#c084fc', fontSize: '0.95rem' }}>
              {result.characterPoolSize}^{result.passwordLength} ≈ {result.searchSpaceCombinations} combinations
            </div>
          </div>

          <table className="data-table" style={{ fontSize: '0.82rem' }}>
            <thead>
              <tr>
                <th>Attack Scenario</th>
                <th>Illustrative Rate</th>
                <th>Avg. Guess Time</th>
              </tr>
            </thead>
            <tbody>
              {result.crackEstimates.map(est => (
                <tr key={est.scenario}>
                  <td>
                    <div style={{ fontWeight: 600, color: '#f1f5f9' }}>{est.scenario}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{est.assumption}</div>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {est.rateLabel}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: est.seconds < 60 ? '#f87171' : est.seconds < 86400 * 30 ? '#fbbf24' : '#34d399' }}>
                    {est.displayTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="heuristic-note">
            * Assumptions: Illustrative educational calculations based on exhaustive search (R^L / 2) under assumed rates. Real cracking speed depends heavily on password hashing algorithm, work factor, hardware, attack strategy, leaked information, and password structure.
          </p>
        </div>
      </div>

      {/* Exponential Growth Demonstration */}
      <div className="card">
        <h3 className="card-title">
          <ArrowRight size={18} color="#00f2fe" />
          The Exponential Power of Password Length
        </h3>
        <p className="card-desc">
          Comparing theoretical search space size as length increases using the active character pool size ({result.characterPoolSize || 26} characters).
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Length (L)</th>
                <th>Character Pool (R)</th>
                <th>Search Space (R^L)</th>
                <th>Theoretical Entropy</th>
                <th>Illustrative High-Speed Rate (10¹¹/s)</th>
              </tr>
            </thead>
            <tbody>
              {[6, 8, 10, 12, 14, 16].map(len => {
                const pool = result.characterPoolSize || 26;
                const combs = Math.pow(pool, len);
                const avgSec = (combs / 2) / 1e11;
                const entropy = Math.round(len * Math.log2(pool) * 10) / 10;
                
                let timeStr = '< 1 millisecond';
                if (avgSec >= 1 && avgSec < 60) timeStr = `${Math.round(avgSec)} seconds`;
                else if (avgSec >= 60 && avgSec < 3600) timeStr = `${(avgSec / 60).toFixed(1)} mins`;
                else if (avgSec >= 3600 && avgSec < 86400) timeStr = `${(avgSec / 3600).toFixed(1)} hours`;
                else if (avgSec >= 86400 && avgSec < 31536000) timeStr = `${(avgSec / 86400).toFixed(1)} days`;
                else if (avgSec >= 31536000) timeStr = `${(avgSec / 31536000).toExponential(2)} years`;

                const isCurrentLen = password.length === len;

                return (
                  <tr key={len} style={isCurrentLen ? { backgroundColor: 'rgba(0, 242, 254, 0.08)', fontWeight: 700 } : {}}>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>
                      {len} characters {isCurrentLen && <span style={{ color: '#00f2fe' }}>◀ Current</span>}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{pool}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: '#93c5fd' }}>
                      {combs < 1e6 ? Math.round(combs).toLocaleString() : combs.toExponential(2)}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)' }}>{entropy} bits</td>
                    <td style={{ fontFamily: 'var(--font-mono)', color: avgSec < 60 ? '#f87171' : avgSec < 86400 ? '#fbbf24' : '#34d399' }}>
                      {timeStr}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
