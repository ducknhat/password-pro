# PasswordGuard Project Audit

**Project:** PasswordGuard: An Experimental Analysis of Password Strength and Authentication Security  
**Course:** English Writing and Presentation Skills (Kỹ năng viết và thuyết trình bằng Tiếng Anh)  
**Date:** 2026-10-06  
**Status:** AUDITED, CORRECTED, AND FEATURE-FROZEN  

---

## 1. Existing Architecture

PasswordGuard is implemented as a 100% client-side Single-Page Application (SPA) using React 19, TypeScript, and Vite. Its core architectural components are:

1. **Authoritative Analysis Engine (`src/utils/passwordAnalyzer.ts`):**
   - Implements `analyzePassword()`, evaluating length, character set inclusion, diversity counts, and pattern vulnerabilities.
   - Computes theoretical character-space entropy estimate ($E = L \times \log_2 R$ under uniform assumption) and combinatorial search space ($R^L$).
   - Computes illustrative brute-force time estimates across 3 assumed guessing rate profiles.
   - Computes granular score breakdown (`lengthScore`, `varietyScore`, `diversityBonus`, `passphraseBonus`, `penalties`, `rawScore`).
   - Implements pure tier boundary classification `classifyScore(score)` (0–39: Weak, 40–69: Medium, 70–100: Strong).

2. **Web Crypto Demonstration Sandbox (`src/utils/cryptoDemo.ts`):**
   - Utilizes browser-native `crypto.subtle.digest('SHA-256')` and `crypto.getRandomValues(16)` to demonstrate one-way hashing and cryptographic salting.
   - Contrasts unsalted vs. salted digests to illustrate protection against precomputed rainbow table lookups.
   - Emphasizes that general-purpose SHA-256 is an educational demonstration only and that production environments require memory-hard KDFs (Argon2id, bcrypt, scrypt, PBKDF2).

3. **Experiment Pipeline (`scripts/runExperiment.mjs`):**
   - Evaluates a controlled synthetic dataset of 150 passwords across 5 structural categories (30 samples each).
   - Imports `analyzePassword()` directly from `src/utils/passwordAnalyzer.ts` as the single source of truth.
   - Derives category-wise statistics, length distributions, diversity distributions, and conclusions dynamically without manual hardcoding.
   - Generates `data/results.json`, `data/results.csv`, and `src/data/experimentalResults.json`.

4. **User Interface (`src/components/`):**
   - `AnalyzerView.tsx`: Interactive candidate password testing, meter, breakdown tags, composition checklist, vulnerabilities, entropy, and assumed crack-time projections.
   - `HowPasswordsWorkView.tsx`: Educational prover-verifier authentication model, character spaces, and the passphrase paradigm.
   - `CommonThreatsView.tsx`: Real-world attack vectors (weak passwords, reuse, credential stuffing, phishing, offline cracking) and multi-layered defenses (MFA, password managers, slow hashing).
   - `HashingSaltingView.tsx`: Interactive Web Crypto hashing and salting sandbox with clear production disclaimers.
   - `ExperimentView.tsx`: Visualized experimental outcomes via Recharts, interactive tables, and JSON/CSV data export.
   - `AboutView.tsx`: Course context, zero-storage privacy guarantee, and academic limitations disclosure.

---

## 2. Problems Identified

During our systematic repository audit, the following issues were cataloged:

1. **Risk of Scoring Inconsistency:**
   - Need to verify that the experiment pipeline strictly imports the TypeScript analyzer rather than maintaining parallel heuristic scoring logic.
2. **Experiment Conclusion Hardcoding:**
   - Previous versions of experimental runner scripts contained static or unlinked numerical conclusion strings (e.g., stale average scores from older iterations), creating discrepancies with actual aggregated data.
3. **Score Breakdown Completeness:**
   - The breakdown math needed verification to ensure that `passphraseBonus` is explicitly included in the exposed breakdown interface, that `rawScore` exactly matches the component sum, and that clamping behavior is transparent.
4. **Unit Test Boundary Clarity:**
   - Tier boundary tests needed explicit assertions covering exact edge values (39 Weak, 40 Medium, 69 Medium, 70 Strong).
5. **Academic Overclaims in UI & Material:**
   - Instances of overly strong terminology (e.g., "proves security", "validates real-world resistance", "accurately reflects Hashcat cracking") were present in report drafts and notes.
6. **Entropy Interpretation:**
   - Shannon entropy formulas ($E = L \times \log_2 R$) were occasionally described as "actual entropy" rather than "theoretical character-space entropy estimate under a uniform-character assumption".
7. **Guessing Rate & Hardware Claims:**
   - Guessing rates (100, 10^7, 10^11 guesses/sec) required explicit framing as "illustrative assumed guessing rates" rather than universal hardware benchmarks.
8. **Hashing Demo & Avalanche Effect Framing:**
   - Educational SHA-256 usage required explicit distinction from production password storage (Argon2id/bcrypt). The salting demo needed clean framing as hashing and salting rather than an avalanche effect test.
9. **Authentication Prover-Verifier Model:**
   - Documentation required clear prover-verifier phrasing rather than implying servers store plaintext credentials.
10. **Synthetic Dataset & Methodology Framing:**
    - The experiment needed transparent framing as an evaluation of heuristic behavior and consistency across controlled synthetic categories, rather than a universal empirical proof of password security laws.
11. **Results vs. Discussion Separation:**
    - `report-material/07-results.md` and `report-material/08-discussion.md` required clean separation between numerical observations and interpretative discussion.
12. **Stale Project Metadata:**
    - `package-lock.json` contained leftover references to `task-management-project`.
13. **Lint Warnings:**
    - Unused variable in experiment script and non-lazy state initialization in `HashingSaltingView.tsx`.

---

## 3. Changes Made

1. **Single Source of Truth Confirmed:**
   - Verified that `scripts/runExperiment.mjs` directly imports `analyzePassword` from `src/utils/passwordAnalyzer.ts` via Node 24 native type stripping. No duplicate scoring logic exists.
2. **Dynamic Conclusion Derivation in Experiment Runner:**
   - Updated `scripts/runExperiment.mjs` so all numerical conclusions for Categories A, B, C, D, and E are dynamically derived from `categoryStats`.
   - Eliminated the unused variable lint warning by actively integrating Category C statistics into conclusion generation.
3. **Transparent Score Breakdown:**
   - Confirmed `passphraseBonus` is present in `ScoreBreakdown` interface and displayed in `AnalyzerView.tsx`.
   - Verified formula: $\text{rawScore} = \text{lengthScore} + \text{varietyScore} + \text{diversityBonus} + \text{passphraseBonus} - \text{penalties}$.
4. **Unit Test Boundaries Hardened:**
   - Verified and maintained boundary assertions in `src/utils/passwordAnalyzer.test.ts` for exact threshold values (0, 39, 40, 69, 70, 100). All 13 unit tests pass.
5. **UI & Report Academic Claims Refined:**
   - Replaced strong claims ("proves", "validated", "accurately predicts") with defensive phrasing ("shows how the heuristic responds", "consistent with scoring rules", "educational structural evaluation").
   - Added explicit disclaimers: "The result does not guarantee real-world security."
6. **Corrected Entropy Terminology:**
   - Standardized on "theoretical character-space entropy estimate under a uniform-character assumption" across UI, README, and `report-material`.
   - Explicitly clarified that human passwords suffer from cognitive patterns, making actual guessability substantially higher.
7. **Corrected Crack-Time Terminology:**
   - Clarified that rates ($100$, $10^7$, $10^{11}$ guesses/sec) are illustrative assumed scenarios, not universal hardware benchmarks.
8. **Hashing & Salting Demarcation:**
   - Emphasized that SHA-256 is strictly an educational tool to demonstrate one-way hashing and salting. Production systems require Argon2id, bcrypt, or scrypt.
   - Refined documentation to remove inaccurate "avalanche effect" claims for the salting comparison.
9. **Authentication Prover-Verifier Standard:**
   - Formulated authentication descriptions around the prover-verifier model where servers store password verifiers/hashes.
10. **Experiment Framing & Synthetic Dataset Integrity:**
    - Explicitly stated across documentation that the dataset contains 150 intentionally constructed synthetic passwords and does not reflect general population password distributions.
11. **Results and Discussion Separated:**
    - Replaced interpretative hypothesis-validation claims in `07-results.md` with objective numerical observations. Preserved thematic explanations in `08-discussion.md`.
12. **Metadata & Project Naming Cleaned:**
    - Updated `package-lock.json` package names from `task-management-project` to `passwordguard`.
13. **Code Optimization & Lint Cleanliness:**
    - Refactored `salt` state in `HashingSaltingView.tsx` to use a lazy initializer function `useState(() => generateRandomSalt(16))`, resolving the React compiler lint warning. `npm run lint` now completes with 0 errors and 0 warnings.

---

## 4. Scoring Algorithm

The PasswordGuard heuristic scoring engine produces a clamped score $S \in [0, 100]$:

$$\text{rawScore} = S_{\text{length}} + S_{\text{variety}} + B_{\text{diversity}} + B_{\text{passphrase}} - P_{\text{penalties}}$$
$$S = \max(0, \min(100, \text{round}(\text{rawScore})))$$

### Component Rules:
- **Length Score ($S_{\text{length}}$, max 40):**
  - $L < 6$: 4 pts | $6 \le L \le 7$: 10 pts | $8 \le L \le 11$: 20 pts | $12 \le L \le 15$: 32 pts | $L \ge 16$: 40 pts
- **Character Variety ($S_{\text{variety}}$, max 35):**
  - Lowercase: $+8$ | Uppercase: $+8$ | Digits: $+9$ | Special symbols: $+10$
- **Diversity Bonus ($B_{\text{diversity}}$, max 15):**
  - 4 pools: $+15$ | 3 pools: $+8$ | 2 pools: $+3$
- **Passphrase Bonus ($B_{\text{passphrase}}$, max 20):**
  - $L \ge 20$ with $\ge 10$ unique chars and no sequential patterns: $+20$
  - $L \ge 16$ with word delimiters (hyphens/spaces/underscores) and $\ge 8$ unique chars: $+15$
- **Penalties ($P_{\text{penalties}}$):**
  - $L < 8$: $-20$ | $L < 12$: $-8$
  - Repeated characters: $-15$
  - Sequential patterns: $-15$
  - Common dictionary patterns: $-25$
  - Single character pool only: $-15$

### Classification Tiers:
- **0–39:** Weak
- **40–69:** Medium
- **70–100:** Strong

---

## 5. Experiment Methodology

- **Sample Size:** 150 synthetic passwords (30 per category across 5 categories).
- **Categories:**
  - **A: Short Simple** ($L \in [3, 5]$, lowercase words, e.g., `cat`, `dog`, `sun`, `red2`)
  - **B: Common Pattern** ($L \in [8, 12]$, dictionary roots + numbers/symbols, e.g., `password123`, `admin2024!`)
  - **C: Medium Complexity** ($L \in [11, 15]$, mixed alphanumeric + symbols, e.g., `BlueSky#49`, `Silver!Fox82`)
  - **D: Long Passphrase** ($L \in [25, 36]$, multi-word phrases separated by hyphens, e.g., `correct-horse-battery-staple`)
  - **E: Long Random** ($L = 16$, 4-pool pseudo-random characters, e.g., `7$zW#9!kLp&2Qx@m`)
- **Evaluation Purpose:** Functional evaluation of the educational heuristic's internal consistency across controlled structural paradigms.
- **Privacy:** 100% synthetic dataset; no live credentials or breached personal data involved.

---

## 6. Final Experiment Results

Aggregated from the fresh execution of `scripts/runExperiment.mjs`:

| Category | Count ($n$) | Avg. Length | Avg. Diversity | Avg. Score | Avg. Theoretical Entropy | Weak (%) | Medium (%) | Strong (%) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **A. Short Simple** | 30 | 4.2 | 1.5 / 4 | 2.0 / 100 | 20.8 bits | 100.0% (30) | 0.0% (0) | 0.0% (0) |
| **B. Common Pattern** | 30 | 9.6 | 2.2 / 4 | 10.5 / 100 | 51.2 bits | 96.7% (29) | 3.3% (1) | 0.0% (0) |
| **C. Medium Complexity** | 30 | 13.0 | 4.0 / 4 | 80.8 / 100 | 85.4 bits | 0.0% (0) | 6.7% (2) | 93.3% (28) |
| **D. Long Passphrase** | 30 | 31.1 | 2.0 / 4 | 75.8 / 100 | 182.9 bits | 0.0% (0) | 30.0% (9) | 70.0% (21) |
| **E. Long Random** | 30 | 16.0 | 4.0 / 4 | 90.0 / 100 | 105.1 bits | 0.0% (0) | 0.0% (0) | 100.0% (30) |

### Overall Dataset Distribution ($N = 150$):
- **Weak:** 59 samples (39.3%)
- **Medium:** 12 samples (8.0%)
- **Strong:** 79 samples (52.7%)

All generated experiment files (`data/results.csv`, `data/results.json`, `src/data/experimentalResults.json`), UI components, README, and report materials are in 100% numerical agreement.

---

## 7. Tests and Validation

- **Unit Test Suite:** `vitest run` executes 13 unit tests covering:
  - Empty input handling
  - Short password penalties
  - Lowercase-only and numeric-only pool deductions
  - Sequential and keyboard pattern detection
  - Repeated character detection
  - Balanced mixed password evaluation
  - Passphrase scoring and bonus allocation
  - Random password validation
  - Explicit boundary classifications: 0, 39, 40, 69, 70, 100
  - Score breakdown sum integrity (`rawScore`)
  - Crack duration formatting
- **Test Result:** 13 / 13 tests PASSED (100%).
- **Linter Status:** `oxlint` executed across 13 files: 0 errors, 0 warnings.
- **TypeScript Build:** `tsc -b && vite build` succeeded with 0 errors.

---

## 8. Academic Limitations

1. **Heuristic Scope:** The 0–100 scoring model represents an educational heuristic; it does not replace professional auditing or formal compliance frameworks.
2. **Uniform Entropy Assumption:** Character-space entropy assumes uniform, independent character selection. Human passwords exhibit cognitive biases that make real-world guessability higher.
3. **Illustrative Brute-Force Models:** Guessing rates assume idealized exhaustive searches ($R^L / 2$); real adversaries prioritize dictionary wordlists, rule mutations, and leaked hashes.
4. **Educational Hashing:** SHA-256 is demonstrated solely to illustrate one-way transforms and salting. Production systems require memory-hard KDFs (Argon2id, bcrypt).
5. **Synthetic Dataset:** The 150 test passwords represent five intentional structural categories rather than the statistical distribution of general human populations.

---

## 9. Remaining Citation TODOs

The report materials contain structured citation placeholders to avoid unverified or fabricated references. A dedicated verification phase should address:

1. `[TODO: Citation needed - General security & access control literature, e.g., NIST SP 800-63B]` (02-introduction.md)
2. `[TODO: Citation needed - Authentication taxonomy, e.g., Bonneau et al., 2012]` (02-introduction.md)
3. `[TODO: Citation needed - Empirical password meter & pattern analyses, e.g., Ur et al., 2015]` (02-introduction.md, 03-background.md, 09-limitations.md)
4. `[TODO: Citation needed - Credential stuffing and reuse studies]` (02-introduction.md)
5. `[TODO: Citation needed - Offline cracking benchmarks, e.g., Hashcat documentation]` (02-introduction.md)
6. `[TODO: Citation needed - FIPS 180-4 Secure Hash Standard]` (03-background.md)
7. `[TODO: Citation needed - Feistel, 1973; Webster & Tavares, 1985 on avalanche effect]` (03-background.md)
8. `[TODO: Citation needed - Oechslin, 2003 on rainbow table trade-offs]` (03-background.md)
9. `[TODO: Citation needed - Research ethics frameworks, e.g., The Menlo Report, 2012]` (04-methodology.md)
10. `[TODO: Citation needed - Combinatorial search modeling, NIST SP 800-63B Appendix A]` (04-methodology.md, 08-discussion.md)
11. `[TODO: Citation needed - Ethical handling of credential datasets in research, e.g., Thomas et al., 2017]` (06-experiment.md, 09-limitations.md)
12. `[TODO: Citation needed - Composition policy studies, e.g., Komanduri et al., 2011]` (08-discussion.md)
13. `[TODO: Citation needed - Rule-based password cracking, e.g., Weir et al., 2009 / Hashcat documentation]` (08-discussion.md)
14. `[TODO: Citation needed - Password usability & manager studies, e.g., Ur et al., 2015]` (08-discussion.md)
15. `[TODO: Citation needed - Breached password checking, e.g., Hunt, 2018]` (08-discussion.md)
16. `[TODO: Citation needed - Mask attacks and cracking strategies, Hashcat documentation]` (09-limitations.md)

*Note: Canonical entries (NIST SP 800-63B, Shannon 1948, Argon2 PHC, bcrypt, scrypt, PBKDF2) are present in the reference list and matched where directly cited.*

---

## 10. Final Project Status

Feature Freeze: The PasswordGuard application contains sufficient functionality for the course assignment. Further work should prioritize academic reporting and presentation preparation rather than feature expansion.
