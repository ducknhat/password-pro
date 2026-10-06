# PasswordGuard Project Plan & Roadmap

**Course:** English Writing and Presentation Skills (Kỹ năng viết và thuyết trình bằng Tiếng Anh)  
**Project:** PasswordGuard: Password Security and Authentication  
**Status:** IMPLEMENTATION FROZEN — REPORT & PRESENTATION PREPARATION PHASE  

---

## 1. Overview & Current Milestone

The software implementation, scoring heuristic, cryptographic demonstration, test suite, and experimental benchmarking pipeline are **100% complete and feature-frozen**. The current baseline is internally consistent, clean of lint errors, and verified against all academic and technical requirements.

---

## 2. Completed Tasks (Audit & Stabilization Phase)

- [x] **Repository Audit:** Re-inspected all files, dependencies, tests, scripts, data, and documentation.
- [x] **Single Source of Truth:** Verified `scripts/runExperiment.mjs` directly imports `analyzePassword` from `src/utils/passwordAnalyzer.ts`.
- [x] **Dynamic Conclusion Derivation:** Replaced stale hard-coded conclusion numbers in experiment runner with programmatic derivations from `categoryStats`.
- [x] **Score Breakdown Integrity:** Verified that `scoreBreakdown` includes `passphraseBonus` and strictly sums to `rawScore`.
- [x] **Unit Test Suite Hardening:** Validated all 17 unit tests in Vitest covering core heuristics, pattern detectors, exact tier boundaries (0, 39, 40, 69, 70, 100), numeric stability on 500/1000 char inputs, and safe duration formatting.
- [x] **Numeric Overflow & Stability:** Replaced naive `Math.pow()` with log-space derivations ($\log_{10} R^L$) for search space and crack times, eliminating `Infinity` and `NaN` risks on long passwords.
- [x] **Node Runtime Compatibility:** Set `"engines": { "node": ">=22.6.0" }` and updated `package.json` and `README.md` to reflect native TypeScript type-stripping support.
- [x] **Presentation Outline Synchronized:** Aligned all 10 slides and speaker notes in `presentation-outline.md` with defensive academic framing (entropy as theoretical character-space estimate, no real-world cracking overclaims).
- [x] **Academic Claims Refinement:** Eliminated overclaims ("proves", "validated", "secure") across UI, documentation, and report materials.
- [x] **Entropy Terminology Correction:** Standardized terminology to "theoretical character-space entropy estimate under a uniform-character assumption".
- [x] **Crack-Time Terminology Correction:** Clarified that attack models use "illustrative assumed guessing rates" rather than fixed hardware benchmarks.
- [x] **Hashing & Salting Demarcation:** Clarified that SHA-256 is an educational demonstration only and that production environments require slow memory-hard KDFs (Argon2id, bcrypt).
- [x] **Avalanche Claim Correction:** Corrected phrasing around salting to emphasize digest uniqueness and rainbow table invalidation.
- [x] **Authentication Explanation:** Formulated authentication concepts around the prover-verifier paradigm.
- [x] **Experiment Framing:** Accurately framed the experiment as a controlled functional evaluation of the educational heuristic on 150 synthetic samples.
- [x] **Results vs. Discussion Separation:** Kept numerical observations in `07-results.md` and moved interpretative synthesis to `08-discussion.md`.
- [x] **Metadata Cleanup:** Removed stale template references (`task-management-project`) in `package-lock.json`.
- [x] **Lint & Build Pass:** `oxlint` passes with 0 errors and 0 warnings; TypeScript build `tsc -b && vite build` succeeds.
- [x] **Fresh Experiment Run:** Regenerated `data/results.csv`, `data/results.json`, and `src/data/experimentalResults.json`.

---

## 3. Remaining Tasks

### Phase A: Citation Verification (Academic Paper Preparation)
- [ ] Cross-check each inventory item in `PROJECT_AUDIT.md` Section 9.
- [ ] Confirm bibliography details (authors, publication years, conference titles) for candidate papers.
- [ ] Finalize standard BibTeX / APA citation format for the manuscript.

### Phase B: Scientific Report Finalization
- [ ] Compile `report-material/01-abstract.md` through `10-conclusion.md` into the IEEE/University template format (`Paper_Template_EN.docx`).
- [ ] Capture high-resolution application screenshots for figures:
  - Figure 1: Password Analyzer UI with score breakdown and checklist.
  - Figure 2: Interactive Hashing & Salting demonstration.
  - Figure 3: Average Strength Score by Category (Recharts bar chart).
  - Figure 4: Overall Tier Distribution (donut chart).
- [ ] Review English academic register, ensuring accessible technical English suitable for an undergraduate defense.

### Phase C: Presentation Preparation
- [ ] Build 10-slide PowerPoint slide deck based on `presentation-outline.md`.
- [ ] Incorporate screenshots and data charts from the frozen results snapshot.
- [ ] Practice speaking script (8–10 minutes target duration, ~1 minute per slide).
- [ ] Rehearse Q&A responses using `qa-preparation.md` (21 structured questions with simple and technical responses).

---

## 4. Status by Component

| Component | Status | Notes |
| :--- | :---: | :--- |
| **Application UI** | **FROZEN** | Clean, responsive, dark theme, zero storage |
| **Scoring Heuristic** | **FROZEN** | Single source of truth in `passwordAnalyzer.ts` |
| **Web Crypto Sandbox** | **FROZEN** | SHA-256 + 16B salt, educational framing |
| **Unit Tests** | **PASSING** | 17/17 passing in Vitest (including numeric stability) |
| **Experiment Data** | **FROZEN** | 150 synthetic samples, all files match |
| **Linter / Build** | **PASSING** | 0 errors, 0 warnings; TS build OK |
| **Report Drafts** | **REVIEWED** | 10 markdown chapters ready for compilation |
| **Citations** | **INVENTORY READY** | 16 placeholders cataloged, awaiting verification |
| **Presentation Outline** | **READY** | 10 slides with speaker notes in simple English |
| **Q&A Guide** | **READY** | 21 questions with Simple & Technical answers |

---

## 5. Final Submission Checklist

- [ ] Software runs locally via `npm run dev` with zero console errors.
- [ ] Unit tests pass via `npm test`.
- [ ] Experiment runs reproducibly via `npm run experiment`.
- [ ] Production build succeeds via `npm run build`.
- [ ] Final paper DOCX compiled according to course guidelines.
- [ ] Final slide deck PPTX ready with presenter view notes.
- [ ] Practice defense session completed.
