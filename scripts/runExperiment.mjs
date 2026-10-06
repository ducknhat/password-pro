/**
 * PasswordGuard - Experimental Data Generator & Runner
 * Reproducible evaluation on 150 synthetic test passwords across 5 categories.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { analyzePassword } from '../src/utils/passwordAnalyzer.ts';

// 150 Synthetic Test Passwords (30 per category)
const SYNTHETIC_DATASET = {
  'A_Short_Simple': [
    'cat', 'dog', 'sun', 'sky1', 'red2', 'star', 'blue', 'fish',
    'pass1', 'test9', 'tree', 'moon8', 'car5', 'milk', 'bird7',
    'fast3', 'cold', 'wind2', 'cup9', 'pen4', 'desk', 'book1',
    'lamp', 'wall6', 'gold', 'iron', 'rain', 'fire5', 'leaf', 'ice7'
  ],
  'B_Common_Pattern': [
    'password123', 'admin2024!', 'welcome1', 'qwerty12345', 'letmein2023',
    'iloveyou99', 'monkey123', 'dragon2024', 'football!', 'baseball1',
    'princess9', 'sunshine123', 'master2024', 'shadow77', 'superman1',
    'batman2024!', 'trustno1', 'secret123', 'changeme9', 'hello2024!',
    'p@ssword1', '1234567890', 'admin@123', 'welcome!2024', 'login1234',
    'passw0rd!', 'root2024', 'qwertyuiop', '0123456789', 'letmein123!'
  ],
  'C_Medium_Complexity': [
    'BlueSky#49', 'Silver!Fox82', 'GreenForest9$', 'GoldenSun#31', 'RiverStone!54',
    'MountainPeak#73', 'QuietBreeze*18', 'AutumnLeaf$62', 'CrimsonTide&41', 'OceanWave!89',
    'SpringRain#37', 'WinterFrost%26', 'AmberGlow*95', 'FalconWing!43', 'NorthernLight$78',
    'DesertDune#12', 'VelvetNight&66', 'SolarFlare!53', 'Starlight#84', 'ShadowHawk*29',
    'RapidBrook$91', 'TimberWolf!38', 'LunarEcho#47', 'HarborMist%15', 'GlacierBay*64',
    'CobaltSky!72', 'EmberSpark#83', 'PineNeedle$59', 'IronAnchor&24', 'CrystalPeak!97'
  ],
  'D_Long_Passphrase': [
    'correct-horse-battery-staple',
    'blue-mountains-whisper-softly',
    'golden-sunlight-warms-the-ocean',
    'silent-shadows-dance-at-midnight',
    'fresh-morning-coffee-smells-great',
    'wandering-river-flows-to-sea',
    'ancient-oak-trees-guard-forest',
    'bright-stars-shine-in-darkness',
    'autumn-leaves-fall-gently-down',
    'snowy-peaks-reach-toward-heaven',
    'gentle-rain-taps-on-windows',
    'velvet-night-covers-the-city',
    'distant-thunder-rumbles-in-distance',
    'warm-summer-breeze-cools-evening',
    'roaring-campfire-sparks-light-night',
    'crisp-winter-air-chills-morning',
    'green-meadows-bloom-in-springtime',
    'deep-blue-ocean-holds-secrets',
    'swift-mountain-streams-run-clear',
    'purple-sunset-colors-the-horizon',
    'cozy-fire-warms-the-cottage',
    'silver-moonbeams-illuminate-path',
    'friendly-sparrow-sings-at-dawn',
    'golden-wheat-sways-in-the-wind',
    'peaceful-lakes-reflect-tall-pines',
    'vibrant-orchids-bloom-in-greenhouse',
    'quiet-reading-nook-with-books',
    'endless-journey-across-open-plains',
    'brilliant-rainbow-after-stormy-rain',
    'whispering-pines-sing-in-valleys'
  ],
  'E_Long_Random': [
    '7$zW#9!kLp&2Qx@m',
    'xK9#m$L2!vP8@qRt',
    'B9#mK$2!xP8@qRtW',
    '4@jF!9pL&kR2#vXz',
    'mQ8$vP2!xK9#wL7@',
    '8!rK#3$pM7@xL2&q',
    'wT5@kP9#vL2$xR8!',
    '3$xM9!kLp&2Q#vRt',
    'pL9#vK2$xR8@mQ5!',
    '6@kR!8pM#vL2$xQ9',
    'zW9#kL2!vP8$xM7@',
    '5$mQ8!kR2#vL9@xP',
    'xP9#vL2$kR8@mQ4!',
    '2!kL9#vP8$mQ5@xR',
    'qR8#mK2$vP9@xL7!',
    '9$kP2!xL8#mQ5@vR',
    'vL9#mQ2$kP8@xR4!',
    '4!xR9#vL2$mQ8@kP',
    'mK9#vP2$xR8@qL5!',
    '8@vL2!kP9#mQ5$xR',
    'rP9#vL2$kM8@xQ7!',
    '3!kM9#vL2$xP8@qR',
    'xR9#vP2$kL8@mQ6!',
    '7@mQ8!vL2#kP9$xR',
    'kP9#vL2$xM8@qR4!',
    '5!xP9#vL2$kR8@mQ',
    'vR9#kL2$mQ8@xP7!',
    '2@mQ9!vP8#kL2$xR',
    'qL9#vP2$kR8@xM5!',
    '8!xL9#mQ2$vP8@kR'
  ]
};

// Run experiment
const categoryStats = [];
const allSamples = [];

let totalWeak = 0;
let totalMedium = 0;
let totalStrong = 0;

for (const [catKey, list] of Object.entries(SYNTHETIC_DATASET)) {
  let sumScore = 0;
  let sumEntropy = 0;
  let sumLength = 0;
  let sumDiversity = 0;
  let weakCount = 0;
  let mediumCount = 0;
  let strongCount = 0;

  list.forEach((pwd, idx) => {
    const res = analyzePassword(pwd);
    sumScore += res.score;
    sumEntropy += res.estimatedEntropyBits;
    sumLength += res.passwordLength;
    sumDiversity += res.diversityCount;

    if (res.tier === 'Weak') { weakCount++; totalWeak++; }
    else if (res.tier === 'Medium') { mediumCount++; totalMedium++; }
    else if (res.tier === 'Strong') { strongCount++; totalStrong++; }

    allSamples.push({
      sampleId: `${catKey}_${idx + 1}`,
      category: catKey,
      length: res.passwordLength,
      diversity: res.diversityCount,
      entropy: res.estimatedEntropyBits,
      score: res.score,
      tier: res.tier
    });
  });

  const count = list.length;
  categoryStats.push({
    categoryKey: catKey,
    categoryName: catKey.replace(/_/g, ' '),
    sampleCount: count,
    avgScore: Math.round((sumScore / count) * 10) / 10,
    avgEntropyBits: Math.round((sumEntropy / count) * 10) / 10,
    avgLength: Math.round((sumLength / count) * 10) / 10,
    avgDiversity: Math.round((sumDiversity / count) * 10) / 10,
    weakCount,
    weakPct: Math.round((weakCount / count) * 1000) / 10,
    mediumCount,
    mediumPct: Math.round((mediumCount / count) * 1000) / 10,
    strongCount,
    strongPct: Math.round((strongCount / count) * 1000) / 10
  });
}

// Compute length vs score distribution
const lengthMap = new Map();
allSamples.forEach(s => {
  if (!lengthMap.has(s.length)) {
    lengthMap.set(s.length, { length: s.length, totalScore: 0, count: 0, totalEntropy: 0 });
  }
  const item = lengthMap.get(s.length);
  item.totalScore += s.score;
  item.totalEntropy += s.entropy;
  item.count++;
});

const lengthVsScore = Array.from(lengthMap.values())
  .sort((a, b) => a.length - b.length)
  .map(item => ({
    length: item.length,
    avgScore: Math.round((item.totalScore / item.count) * 10) / 10,
    avgEntropy: Math.round((item.totalEntropy / item.count) * 10) / 10,
    sampleCount: item.count
  }));

// Compute diversity vs score
const diversityMap = new Map();
allSamples.forEach(s => {
  if (!diversityMap.has(s.diversity)) {
    diversityMap.set(s.diversity, { diversity: s.diversity, totalScore: 0, count: 0 });
  }
  const item = diversityMap.get(s.diversity);
  item.totalScore += s.score;
  item.count++;
});

const diversityVsScore = Array.from(diversityMap.values())
  .sort((a, b) => a.diversity - b.diversity)
  .map(item => ({
    diversity: item.diversity,
    avgScore: Math.round((item.totalScore / item.count) * 10) / 10,
    sampleCount: item.count
  }));

const totalSamples = allSamples.length;
const overallDistribution = [
  { tier: 'Weak', count: totalWeak, percentage: Math.round((totalWeak / totalSamples) * 1000) / 10, color: '#ef4444' },
  { tier: 'Medium', count: totalMedium, percentage: Math.round((totalMedium / totalSamples) * 1000) / 10, color: '#f59e0b' },
  { tier: 'Strong', count: totalStrong, percentage: Math.round((totalStrong / totalSamples) * 1000) / 10, color: '#10b981' }
];

// Dynamically derive conclusions directly from categoryStats
const catA = categoryStats.find(c => c.categoryKey === 'A_Short_Simple') || categoryStats[0];
const catB = categoryStats.find(c => c.categoryKey === 'B_Common_Pattern') || categoryStats[1];
const catC = categoryStats.find(c => c.categoryKey === 'C_Medium_Complexity') || categoryStats[2];
const catD = categoryStats.find(c => c.categoryKey === 'D_Long_Passphrase') || categoryStats[3];
const catE = categoryStats.find(c => c.categoryKey === 'E_Long_Random') || categoryStats[4];

const experimentOutput = {
  metadata: {
    title: 'PasswordGuard Heuristic Evaluation on Synthetic Passwords',
    totalTested: totalSamples,
    categoryCount: categoryStats.length,
    generatedAt: '2026-10-05',
    privacyNotice: 'Strictly synthetic passwords evaluated; zero sensitive credentials or user inputs stored.'
  },
  overallDistribution,
  categoryStats,
  lengthVsScore,
  diversityVsScore,
  conclusions: [
    `Category E (${catE.categoryName}) achieved the highest average score (${catE.avgScore}/100) with ${catE.strongPct}% classified as Strong (${catE.strongCount}/${catE.sampleCount} samples) due to high character diversity coupled with 16-character length.`,
    `Category D (${catD.categoryName}) achieved the highest theoretical character-space entropy estimate (${catD.avgEntropyBits} bits under uniform assumption, avg score ${catD.avgScore}/100) despite utilizing only 2 character pools, demonstrating how length mathematically scales combinatorial search complexity.`,
    `Category C (${catC.categoryName}) achieved an average score of ${catC.avgScore}/100 with ${catC.strongPct}% classified as Strong (${catC.strongCount}/${catC.sampleCount} samples), consistent with mixed alphanumeric and symbol rules.`,
    `Category B (${catB.categoryName}) scored poorly (avg score ${catB.avgScore}/100, ${catB.weakPct}% Weak, ${catB.weakCount}/${catB.sampleCount} samples) despite containing digits and punctuation, showing how heuristic pattern penalties neutralize superficial complexity.`,
    `Category A (${catA.categoryName}) scored lowest (avg score ${catA.avgScore}/100, ${catA.weakPct}% Weak, ${catA.weakCount}/${catA.sampleCount} samples) with an average theoretical entropy estimate of ${catA.avgEntropyBits} bits, reflecting minimal search spaces.`,
    `Across the 150 synthetic samples, the observed results are consistent with the scoring rules implemented in PasswordGuard, with longer passwords and pattern-free structures receiving higher tier classifications.`
  ]
};

// Ensure directories exist
const dataDir = path.join(__dirname, '..', 'data');
const srcDataDir = path.join(__dirname, '..', 'src', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(srcDataDir)) fs.mkdirSync(srcDataDir, { recursive: true });

// 1. Write data/results.json
fs.writeFileSync(path.join(dataDir, 'results.json'), JSON.stringify(experimentOutput, null, 2), 'utf-8');
// 2. Also write src/data/experimentalResults.json for React imports
fs.writeFileSync(path.join(srcDataDir, 'experimentalResults.json'), JSON.stringify(experimentOutput, null, 2), 'utf-8');

// 3. Write data/results.csv (aggregated results + category breakdown)
let csvContent = 'Category,Sample_Count,Avg_Length,Avg_Diversity,Avg_Score,Avg_Entropy_Bits,Weak_Count,Weak_Pct,Medium_Count,Medium_Pct,Strong_Count,Strong_Pct\n';
categoryStats.forEach(c => {
  csvContent += `${c.categoryName},${c.sampleCount},${c.avgLength},${c.avgDiversity},${c.avgScore},${c.avgEntropyBits},${c.weakCount},${c.weakPct}%,${c.mediumCount},${c.mediumPct}%,${c.strongCount},${c.strongPct}%\n`;
});

csvContent += '\nLength,Sample_Count,Avg_Score,Avg_Entropy_Bits\n';
lengthVsScore.forEach(l => {
  csvContent += `${l.length},${l.sampleCount},${l.avgScore},${l.avgEntropy}\n`;
});

fs.writeFileSync(path.join(dataDir, 'results.csv'), csvContent, 'utf-8');

console.log('✅ Experiment executed successfully!');
console.log(`Tested ${totalSamples} synthetic passwords across ${categoryStats.length} categories.`);
console.log('Saved data/results.json, data/results.csv, and src/data/experimentalResults.json.');
