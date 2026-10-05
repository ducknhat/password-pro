import { describe, it, expect } from 'vitest';
import { analyzePassword, formatCrackDuration } from './passwordAnalyzer';

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
    expect(medRes.score).toBeLessThanOrEqual(80);

    // 70-100: Strong
    const strongRes = analyzePassword('Kx9#vP2@mQ4$zL7!');
    expect(strongRes.score).toBeGreaterThanOrEqual(70);
    expect(strongRes.tier).toBe('Strong');
  });

  it('formats crack durations realistically', () => {
    expect(formatCrackDuration(0.0001)).toContain('Instant');
    expect(formatCrackDuration(45)).toBe('45 seconds');
    expect(formatCrackDuration(120)).toBe('2.0 minutes');
    expect(formatCrackDuration(7200)).toBe('2.0 hours');
    expect(formatCrackDuration(86400 * 5)).toBe('5.0 days');
    expect(formatCrackDuration(31536000 * 50)).toBe('50 years');
  });
});
