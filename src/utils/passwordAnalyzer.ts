/**
 * PasswordGuard - Educational Password Security Analysis Engine
 * 
 * NOTE: This analyzer is designed for educational heuristics in university coursework.
 * It runs 100% in the user's browser. It never transmits, logs, or persists input.
 */

export interface SecurityCheckItem {
  id: string;
  label: string;
  passed: boolean;
  type: 'requirement' | 'warning';
  detail?: string;
}

export interface CrackTimeEstimate {
  scenario: string;
  ratePerSecond: number;
  rateLabel: string;
  seconds: number;
  displayTime: string;
  assumption: string;
}

export interface PasswordAnalysisResult {
  passwordLength: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  characterPoolSize: number;
  diversityCount: number;
  hasRepeatedChars: boolean;
  hasSequentialPattern: boolean;
  hasCommonPattern: boolean;
  detectedPatternName?: string;
  score: number; // 0 - 100
  tier: 'Weak' | 'Medium' | 'Strong';
  tierColor: string;
  estimatedEntropyBits: number;
  searchSpaceCombinations: string; // Scientific or formatted string
  searchSpaceBigIntApprox: number; // For log-scale comparison
  checks: SecurityCheckItem[];
  warnings: string[];
  recommendations: string[];
  crackEstimates: CrackTimeEstimate[];
  scoreBreakdown: {
    lengthScore: number;
    varietyScore: number;
    diversityBonus: number;
    passphraseBonus: number;
    penalties: number;
    rawScore: number;
  };
}

const COMMON_PATTERNS = [
  'password', 'p@ssword', 'passw0rd', '123456', '12345678', '123456789',
  'qwerty', 'admin', 'administrator', 'welcome', 'letmein', 'monkey',
  'iloveyou', 'dragon', 'football', 'baseball', 'princess', 'sunshine',
  'master', 'shadow', 'superman', 'batman', 'trustno1', 'secret',
  'login', 'root', 'changeme', 'hello', 'default', 'test1234'
];

const SEQUENCES = [
  '0123', '1234', '2345', '3456', '4567', '5678', '6789', '7890',
  '9876', '8765', '7654', '6543', '5432', '4321', '3210',
  'abcd', 'bcde', 'cdef', 'defg', 'efgh', 'fghi', 'ghij', 'hijk',
  'ijkl', 'jklm', 'klmn', 'lmno', 'mnop', 'nopq', 'opqr', 'pqrs',
  'qrst', 'rstu', 'stuv', 'tuvw', 'uvwx', 'vwxy', 'wxyz',
  'qwerty', 'asdfgh', 'zxcvbn', 'qwertz', 'azerty'
];

/**
 * Format raw seconds into clear human-readable academic notation
 */
export function formatCrackDuration(seconds: number): string {
  if (Number.isNaN(seconds)) return 'Unknown duration';
  if (!Number.isFinite(seconds) || seconds >= 1e300) {
    return '> 1.00e+300 years (Astronomical/Centuries+)';
  }
  if (seconds <= 0.001) return '< 1 millisecond (Instant)';
  if (seconds < 1) return '< 1 second (Instant)';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${(seconds / 60).toFixed(1)} minutes`;
  if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} hours`;
  if (seconds < 31536000) return `${(seconds / 86400).toFixed(1)} days`;
  
  const years = seconds / 31536000;
  if (years < 1000) return `${Math.round(years)} years`;
  if (years < 1e6) return `${(years / 1000).toFixed(1)} thousand years`;
  if (years < 1e9) return `${(years / 1e6).toFixed(1)} million years`;
  if (years < 1e12) return `${(years / 1e9).toFixed(1)} billion years`;
  return `${years.toExponential(2)} years (Centuries+)`;
}

/**
 * Tier classification helper based on explicit boundary rules
 * 0–39   = Weak
 * 40–69  = Medium
 * 70–100 = Strong
 */
export function classifyScore(score: number): {
  tier: 'Weak' | 'Medium' | 'Strong';
  tierColor: string;
} {
  if (score >= 70) {
    return { tier: 'Strong', tierColor: '#10b981' };
  }
  if (score >= 40) {
    return { tier: 'Medium', tierColor: '#f59e0b' };
  }
  return { tier: 'Weak', tierColor: '#ef4444' };
}

/**
 * Main Analysis Function
 */
export function analyzePassword(pwd: string): PasswordAnalysisResult {
  const length = pwd.length;

  if (length === 0) {
    const { tier, tierColor } = classifyScore(0);
    return {
      passwordLength: 0,
      hasLower: false,
      hasUpper: false,
      hasNumber: false,
      hasSpecial: false,
      characterPoolSize: 0,
      diversityCount: 0,
      hasRepeatedChars: false,
      hasSequentialPattern: false,
      hasCommonPattern: false,
      score: 0,
      tier,
      tierColor,
      estimatedEntropyBits: 0,
      searchSpaceCombinations: '0',
      searchSpaceBigIntApprox: 0,
      checks: [
        { id: 'len', label: 'At least 12 characters', passed: false, type: 'requirement' },
        { id: 'lower', label: 'Contains lowercase letters', passed: false, type: 'requirement' },
        { id: 'upper', label: 'Contains uppercase letters', passed: false, type: 'requirement' },
        { id: 'number', label: 'Contains numbers', passed: false, type: 'requirement' },
        { id: 'special', label: 'Contains special characters', passed: false, type: 'requirement' },
      ],
      warnings: [],
      recommendations: ['Enter a password to begin heuristic security evaluation.'],
      crackEstimates: [],
      scoreBreakdown: { lengthScore: 0, varietyScore: 0, diversityBonus: 0, passphraseBonus: 0, penalties: 0, rawScore: 0 }
    };
  }

  const hasLower = /[a-z]/.test(pwd);
  const hasUpper = /[A-Z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);
  const hasSpecial = /[^a-zA-Z0-9]/.test(pwd);

  let poolSize = 0;
  let diversity = 0;
  if (hasLower) { poolSize += 26; diversity++; }
  if (hasUpper) { poolSize += 26; diversity++; }
  if (hasNumber) { poolSize += 10; diversity++; }
  if (hasSpecial) { poolSize += 33; diversity++; } // Standard printable ASCII symbol count
  if (poolSize === 0) poolSize = 1;

  // 1. Repeated characters check (3 or more consecutive identical characters or high repetition)
  const hasRepeatedConsecutive = /(.)\1\1/.test(pwd);
  const uniqueCharRatio = new Set(pwd.split('')).size / length;
  const hasRepeatedChars = hasRepeatedConsecutive || (length > 6 && uniqueCharRatio < 0.45);

  // 2. Sequential patterns check
  const lowerPwd = pwd.toLowerCase();
  let hasSequentialPattern = false;
  for (const seq of SEQUENCES) {
    if (lowerPwd.includes(seq)) {
      hasSequentialPattern = true;
      break;
    }
  }

  // 3. Common password patterns check
  let hasCommonPattern = false;
  let detectedPatternName = '';
  for (const common of COMMON_PATTERNS) {
    if (lowerPwd.includes(common)) {
      hasCommonPattern = true;
      detectedPatternName = common;
      break;
    }
  }

  // Transparent Scoring Calculation (0 to 100)
  // Length points (max 40)
  let lengthScore = 0;
  if (length >= 16) {
    lengthScore = 40;
  } else if (length >= 12) {
    lengthScore = 32;
  } else if (length >= 8) {
    lengthScore = 20;
  } else if (length >= 6) {
    lengthScore = 10;
  } else {
    lengthScore = 4;
  }

  // Character Variety Points (max 35)
  let varietyScore = 0;
  if (hasLower) varietyScore += 8;
  if (hasUpper) varietyScore += 8;
  if (hasNumber) varietyScore += 9;
  if (hasSpecial) varietyScore += 10;

  // Diversity Bonus (max 15)
  let diversityBonus = 0;
  if (diversity === 4) diversityBonus = 15;
  else if (diversity === 3) diversityBonus = 8;
  else if (diversity === 2) diversityBonus = 3;

  // Long passphrase bonus (e.g. 20+ chars or 16+ chars with hyphens/spaces and diverse letter count)
  let passphraseBonus = 0;
  const uniqueCount = new Set(pwd.split('')).size;
  if (length >= 20 && uniqueCount >= 10 && !hasSequentialPattern) {
    passphraseBonus = 20;
  } else if (length >= 16 && (pwd.includes('-') || pwd.includes(' ') || pwd.includes('_')) && uniqueCount >= 8) {
    passphraseBonus = 15;
  }

  // Penalties
  let penalties = 0;
  if (length < 8) penalties += 20;
  else if (length < 12) penalties += 8;

  if (hasRepeatedChars) penalties += 15;
  if (hasSequentialPattern) penalties += 15;
  if (hasCommonPattern) penalties += 25;
  if (diversity <= 1 && length < 16) penalties += 15;

  let rawScore = lengthScore + varietyScore + diversityBonus + passphraseBonus - penalties;
  const score = Math.max(0, Math.min(100, Math.round(rawScore)));

  // Tier assignment via authoritative classification helper
  const { tier, tierColor } = classifyScore(score);

  // Estimated Entropy (Bits): E = L * log2(R)
  const estimatedEntropyBits = poolSize > 0 ? Math.round(length * Math.log2(poolSize) * 10) / 10 : 0;

  // Search Space Combinations
  // Calculate in log10 space for numerical stability across arbitrarily long passwords
  const log10Combinations = poolSize > 0 && length > 0 ? length * Math.log10(poolSize) : 0;
  let combinationsString = '';

  if (log10Combinations < 6) {
    const approxCombinations = Math.pow(poolSize, length);
    combinationsString = Math.round(approxCombinations).toLocaleString();
  } else if (log10Combinations < 300) {
    const approxCombinations = Math.pow(poolSize, length);
    combinationsString = approxCombinations.toExponential(2);
  } else {
    // Exact mantissa/exponent representation derived in log-space to prevent Infinity
    let exponent = Math.floor(log10Combinations);
    let mantissa = Math.pow(10, log10Combinations - exponent);
    if (mantissa >= 9.995) {
      mantissa /= 10;
      exponent += 1;
    }
    combinationsString = `${mantissa.toFixed(2)}e+${exponent}`;
  }

  // Checks checklist
  const checks: SecurityCheckItem[] = [
    {
      id: 'len',
      label: 'At least 12 characters',
      passed: length >= 12,
      type: 'requirement',
      detail: `Current: ${length} character${length === 1 ? '' : 's'}`
    },
    {
      id: 'lower',
      label: 'Contains lowercase letters',
      passed: hasLower,
      type: 'requirement',
      detail: hasLower ? 'Detected' : 'Missing'
    },
    {
      id: 'upper',
      label: 'Contains uppercase letters',
      passed: hasUpper,
      type: 'requirement',
      detail: hasUpper ? 'Detected' : 'Missing'
    },
    {
      id: 'number',
      label: 'Contains numbers',
      passed: hasNumber,
      type: 'requirement',
      detail: hasNumber ? 'Detected' : 'Missing'
    },
    {
      id: 'special',
      label: 'Contains special characters',
      passed: hasSpecial,
      type: 'requirement',
      detail: hasSpecial ? 'Detected' : 'Missing (!@#$)'
    }
  ];

  // Warnings
  const warnings: string[] = [];
  if (length < 8) warnings.push('Password is critically short (< 8 characters).');
  else if (length < 12) warnings.push('Password is shorter than modern 12-character baseline.');
  if (hasRepeatedChars) warnings.push('Repeated character patterns detected.');
  if (hasSequentialPattern) warnings.push('Sequential character or keyboard pattern detected.');
  if (hasCommonPattern) warnings.push(`Common password pattern detected ("${detectedPatternName}").`);

  // Actionable Recommendations
  const recommendations: string[] = [];
  if (length < 12) {
    recommendations.push('Increase the password length to at least 12 characters (16+ recommended).');
  }
  if (!hasLower || !hasUpper) {
    recommendations.push('Combine both uppercase (A-Z) and lowercase (a-z) letters to increase search space.');
  }
  if (!hasNumber) {
    recommendations.push('Add numerical digits (0-9) at non-predictable positions.');
  }
  if (!hasSpecial) {
    recommendations.push('Incorporate punctuation and symbols (!@#$%^&*) to maximize character diversity.');
  }
  if (hasRepeatedChars) {
    recommendations.push('Avoid consecutive repeating characters (such as "aaa" or "111").');
  }
  if (hasSequentialPattern) {
    recommendations.push('Do not reuse predictable alphabetical or keyboard sequences (such as "1234" or "qwerty").');
  }
  if (hasCommonPattern) {
    recommendations.push('Avoid dictionary words and common phrases. Consider using a 4-word random passphrase.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Excellent structure! Consider saving this password in a secure password manager and enabling Multi-Factor Authentication (MFA).');
  }

  // Illustrative Crack Time Estimates under 3 Assumed Rates
  // Note: These are illustrative educational calculations based on exhaustive uniform search space / 2 (average search)
  const scenarios = [
    {
      scenario: 'Online Throttled Guessing',
      ratePerSecond: 100,
      rateLabel: '100 guesses/sec (illustrative)',
      assumption: 'Illustrative rate assuming service-level throttling, rate-limiting, CAPTCHA, or lockout mechanisms.'
    },
    {
      scenario: 'Offline Fast Desktop Guessing',
      ratePerSecond: 1e7, // 10 million / sec
      rateLabel: '10,000,000 guesses/sec (illustrative)',
      assumption: 'Illustrative rate modeling offline search on desktop hardware against fast unsalted hashes.'
    },
    {
      scenario: 'Offline High-Speed Cluster Guessing',
      ratePerSecond: 1e11, // 100 billion / sec
      rateLabel: '100,000,000,000 guesses/sec (illustrative)',
      assumption: 'Illustrative high-throughput rate against fast unsalted hashes. Real cracking depends heavily on hashing algorithm, work factor, hardware, attack strategy, and password structure.'
    }
  ];

  const crackEstimates: CrackTimeEstimate[] = scenarios.map(sc => {
    let rawSec: number;
    let displayTime: string;

    if (log10Combinations < 300) {
      const avgCombinations = Math.pow(poolSize, length) / 2;
      rawSec = avgCombinations / sc.ratePerSecond;
      displayTime = formatCrackDuration(rawSec);
    } else {
      // Safe log-space derivation for astronomical values exceeding standard Number limits:
      // avgCombinations = (R^L) / 2 -> log10(avgCombinations) = log10Combinations - log10(2)
      // seconds = avgCombinations / rate -> log10(seconds) = log10(avgCombinations) - log10(rate)
      const log10AvgCombinations = log10Combinations - Math.log10(2);
      const log10Sec = log10AvgCombinations - Math.log10(sc.ratePerSecond);
      const log10Years = log10Sec - Math.log10(31536000); // 31,536,000 seconds/year

      rawSec = log10Sec < 308 ? Math.pow(10, log10Sec) : Number.MAX_VALUE;

      let exp = Math.floor(log10Years);
      let mant = Math.pow(10, log10Years - exp);
      if (mant >= 9.995) {
        mant /= 10;
        exp += 1;
      }
      displayTime = `${mant.toFixed(2)}e+${exp} years (Centuries+)`;
    }

    return {
      scenario: sc.scenario,
      ratePerSecond: sc.ratePerSecond,
      rateLabel: sc.rateLabel,
      seconds: rawSec,
      displayTime,
      assumption: sc.assumption
    };
  });

  return {
    passwordLength: length,
    hasLower,
    hasUpper,
    hasNumber,
    hasSpecial,
    characterPoolSize: poolSize,
    diversityCount: diversity,
    hasRepeatedChars,
    hasSequentialPattern,
    hasCommonPattern,
    detectedPatternName: hasCommonPattern ? detectedPatternName : undefined,
    score,
    tier,
    tierColor,
    estimatedEntropyBits,
    searchSpaceCombinations: combinationsString,
    searchSpaceBigIntApprox: log10Combinations,
    checks,
    warnings,
    recommendations,
    crackEstimates,
    scoreBreakdown: {
      lengthScore,
      varietyScore,
      diversityBonus,
      passphraseBonus,
      penalties,
      rawScore
    }
  };
}
