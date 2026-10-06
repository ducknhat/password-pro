import { describe, it, expect } from 'vitest';
import { analyzePassword, formatCrackDuration, classifyScore } from './passwordAnalyzer';

describe('PasswordGuard Analyzer Unit Tests', () => {
  it('handles empty password correctly', () => {
    const result = analyzePassword('');
    expect(result.score).toBe(0);
    expect(result.tier).toBe('Weak');
    expect(result.estimatedEntropyBits).toBe(0);
    expect(result.checks.every(c => !c.passed)).toBe(true);
  });

  it('evaluates very short password as Weak with short warning', () => {
    const result = analyzePassword('ab1');
    expect(result.score).toBeLessThan(40);
    expect(result.tier).toBe('Weak');
    expect(result.warnings.some(w => w.includes('critically short'))).toBe(true);
  });

  it('evaluates lowercase-only password with diversity penalty', () => {
    const result = analyzePassword('helloworld');
    expect(result.hasLower).toBe(true);
    expect(result.hasUpper).toBe(false);
    expect(result.hasNumber).toBe(false);
    expect(result.hasSpecial).toBe(false);
    expect(result.characterPoolSize).toBe(26);
    expect(result.tier).toBe('Weak');
  });

  it('evaluates numeric-only password as Weak', () => {
    const result = analyzePassword('987654321');
    expect(result.characterPoolSize).toBe(10);
    expect(result.tier).toBe('Weak');
    expect(result.score).toBeLessThan(40);
  });

  it('detects predictable sequential patterns', () => {
    const result = analyzePassword('admin123456');
    expect(result.hasSequentialPattern).toBe(true);
    expect(result.hasCommonPattern).toBe(true);
    expect(result.warnings.some(w => w.toLowerCase().includes('sequential'))).toBe(true);
    expect(result.tier).toBe('Weak');
  });

  it('detects repeated characters', () => {
    const result = analyzePassword('aaaaabbbbb123!');
    expect(result.hasRepeatedChars).toBe(true);
    expect(result.warnings.some(w => w.toLowerCase().includes('repeated'))).toBe(true);
  });

  it('evaluates balanced mixed password as Medium or Strong', () => {
    const result = analyzePassword('Skyline#2024');
    expect(result.hasLower).toBe(true);
    expect(result.hasUpper).toBe(true);
    expect(result.hasNumber).toBe(true);
    expect(result.hasSpecial).toBe(true);
    expect(result.diversityCount).toBe(4);
    expect(result.score).toBeGreaterThanOrEqual(40);
  });

  it('evaluates long passphrase favorably', () => {
    const result = analyzePassword('correct-horse-battery-staple');
    expect(result.passwordLength).toBeGreaterThanOrEqual(20);
    expect(result.score).toBeGreaterThanOrEqual(70);
    expect(result.tier).toBe('Strong');
    expect(result.estimatedEntropyBits).toBeGreaterThan(80);
  });

  it('evaluates strong randomly generated password as Strong (70-100)', () => {
    const result = analyzePassword('7$zW#9!kLp&2Qx@m');
    expect(result.score).toBeGreaterThanOrEqual(70);
    expect(result.tier).toBe('Strong');
    expect(result.checks.every(c => c.passed)).toBe(true);
  });

  it('strictly adheres to tier boundaries', () => {
    // 0-39: Weak
    const weakRes = analyzePassword('pass');
    expect(weakRes.score).toBeLessThanOrEqual(39);
    expect(weakRes.tier).toBe('Weak');

    // 40-69: Medium
    const medRes = analyzePassword('Summer2026!');
    expect(medRes.score).toBeGreaterThanOrEqual(40);
    expect(medRes.score).toBeLessThanOrEqual(69);
    expect(medRes.tier).toBe('Medium');

    // 70-100: Strong
    const strongRes = analyzePassword('Kx9#vP2@mQ4$zL7!');
    expect(strongRes.score).toBeGreaterThanOrEqual(70);
    expect(strongRes.tier).toBe('Strong');
  });

  it('explicitly classifies scores at exact boundary points', () => {
    expect(classifyScore(0).tier).toBe('Weak');
    expect(classifyScore(39).tier).toBe('Weak');
    expect(classifyScore(40).tier).toBe('Medium');
    expect(classifyScore(69).tier).toBe('Medium');
    expect(classifyScore(70).tier).toBe('Strong');
    expect(classifyScore(100).tier).toBe('Strong');
  });

  it('verifies that scoreBreakdown correctly sums rawScore including passphraseBonus', () => {
    const res = analyzePassword('correct-horse-battery-staple');
    expect(res.scoreBreakdown.passphraseBonus).toBeGreaterThan(0);
    const expectedRaw = res.scoreBreakdown.lengthScore 
      + res.scoreBreakdown.varietyScore 
      + res.scoreBreakdown.diversityBonus 
      + res.scoreBreakdown.passphraseBonus 
      - res.scoreBreakdown.penalties;
    expect(res.scoreBreakdown.rawScore).toBe(expectedRaw);
  });

  it('formats crack durations realistically and safely handles extreme values', () => {
    expect(formatCrackDuration(0.0001)).toContain('Instant');
    expect(formatCrackDuration(45)).toBe('45 seconds');
    expect(formatCrackDuration(120)).toBe('2.0 minutes');
    expect(formatCrackDuration(7200)).toBe('2.0 hours');
    expect(formatCrackDuration(86400 * 5)).toBe('5.0 days');
    expect(formatCrackDuration(31536000 * 50)).toBe('50 years');
    expect(formatCrackDuration(Infinity)).not.toContain('Infinity');
    expect(formatCrackDuration(1e305)).not.toContain('Infinity');
    expect(formatCrackDuration(NaN)).toBe('Unknown duration');
  });

  describe('Numeric Stability & Extreme Password Length Tests', () => {
    it('handles normal strong password without numeric degradation', () => {
      const res = analyzePassword('7$zW#9!kLp&2Qx@m');
      expect(res.score).toBeGreaterThanOrEqual(70);
      expect(res.tier).toBe('Strong');
      expect(Number.isFinite(res.estimatedEntropyBits)).toBe(true);
      expect(Number.isFinite(res.searchSpaceLog10)).toBe(true);
      expect(res.searchSpaceCombinations).not.toContain('Infinity');
      expect(res.searchSpaceCombinations).not.toContain('NaN');
      res.crackEstimates.forEach(est => {
        expect(Number.isFinite(est.seconds)).toBe(true);
        expect(est.displayTime).not.toContain('Infinity');
        expect(est.displayTime).not.toContain('NaN');
      });
    });

    it('evaluates long passphrase with stable search space', () => {
      const res = analyzePassword('correct-horse-battery-staple');
      expect(res.passwordLength).toBe(28);
      expect(res.score).toBeGreaterThanOrEqual(70);
      expect(res.tier).toBe('Strong');
      expect(res.searchSpaceCombinations).not.toContain('Infinity');
      expect(res.searchSpaceCombinations).not.toContain('NaN');
      expect(Number.isFinite(res.searchSpaceLog10)).toBe(true);
      res.crackEstimates.forEach(est => {
        expect(Number.isFinite(est.seconds)).toBe(true);
        expect(est.displayTime).not.toContain('Infinity');
        expect(est.displayTime).not.toContain('NaN');
      });
    });

    it('gracefully handles extremely long password (500 chars) without Infinity or NaN', () => {
      // 500 characters using all 4 pools: would normally exceed 1e308 in Math.pow(95, 500)
      const longPwd = 'aA1!'.repeat(125);
      expect(longPwd.length).toBe(500);

      const res = analyzePassword(longPwd);
      expect(res.passwordLength).toBe(500);
      expect(res.score).toBeGreaterThanOrEqual(70);
      expect(res.tier).toBe('Strong');

      // Search space should be formatted in log-space scientific notation, NOT Infinity
      expect(res.searchSpaceCombinations).not.toContain('Infinity');
      expect(res.searchSpaceCombinations).not.toContain('NaN');
      expect(res.searchSpaceCombinations).toMatch(/^\d+\.\d{2}e\+\d+$/);

      // Log-space magnitude should be a finite positive number
      expect(Number.isFinite(res.searchSpaceLog10)).toBe(true);
      expect(res.searchSpaceLog10).toBeGreaterThan(900); // 500 * log10(95) ≈ 988.8

      // Entropy should be finite
      expect(Number.isFinite(res.estimatedEntropyBits)).toBe(true);
      expect(res.estimatedEntropyBits).toBeGreaterThan(3000);

      // Crack time estimates must not expose Infinity or NaN
      res.crackEstimates.forEach(est => {
        expect(Number.isFinite(est.seconds)).toBe(true);
        expect(est.displayTime).not.toContain('Infinity');
        expect(est.displayTime).not.toContain('NaN');
        expect(est.displayTime).toContain('years (Centuries+)');
      });
    });

    it('gracefully handles 1000-character input without crashing or throwing', () => {
      const megaPwd = 'Super-Passphrase-Word-Collection-'.repeat(30) + '2026!';
      expect(() => analyzePassword(megaPwd)).not.toThrow();

      const res = analyzePassword(megaPwd);
      expect(res.searchSpaceCombinations).not.toContain('Infinity');
      expect(res.searchSpaceCombinations).not.toContain('NaN');
      res.crackEstimates.forEach(est => {
        expect(est.displayTime).not.toContain('Infinity');
        expect(est.displayTime).not.toContain('NaN');
      });
    });
  });
});
