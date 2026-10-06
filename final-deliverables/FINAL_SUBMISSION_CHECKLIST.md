# PasswordGuard: Final Submission & Readiness Checklist

**Course:** English Writing and Presentation Skills (AV3)  
**Project:** PasswordGuard: An Experimental Analysis of Password Strength and Authentication Security  
**Repository:** `ducknhat/password-pro`  
**Date:** October 6, 2026  

---

## 1. Application & Implementation Verification

- [x] **Application Runs Cleanly:** Built with React 19, Vite, and TypeScript. Starts locally via `npm run dev` with zero errors.
- [x] **Linting & Code Quality:** All TypeScript and React components pass `npm run lint` with 0 warnings and 0 errors.
- [x] **Automated Test Suite:** All 17 automated tests pass cleanly via `npm test` (`vitest run`).
- [x] **Feature Freeze Enforced:** No unauthorized architecture, UI, or algorithm changes made during artifact generation.
- [x] **Client-Side Privacy:** No application backend, no remote database, zero network transmission of passwords, zero telemetry.
- [x] **Cryptographic Lab:** Native Web Crypto API functions properly (`crypto.subtle.digest` and 16-byte random salt generation).

---

## 2. Experimental Data & Consistency Verification

- [x] **Frozen Dataset:** Exactly $N = 150$ synthetic passwords across 5 controlled categories ($n = 30$ each).
- [x] **Category A (Short Simple):** Average score = 2.0 / 100 | 100% Weak.
- [x] **Category B (Common Pattern):** Average score = 10.5 / 100 | 96.7% Weak (29/30 Weak, 1/30 Medium).
- [x] **Category C (Medium Complexity):** Average score = 80.8 / 100 | 93.3% Strong, 6.7% Medium.
- [x] **Category D (Long Passphrase):** Average score = 75.8 / 100 | 70.0% Strong, 30.0% Medium | Theoretical character-space entropy = 182.9 bits.
- [x] **Category E (Long Random):** Average score = 90.0 / 100 | 100% Strong.
- [x] **Overall Tiers:** Weak = 59 (39.3%), Medium = 12 (8.0%), Strong = 79 (52.7%).
- [x] **Batch Runner Reproducibility:** `npm run experiment` executes deterministically and updates `data/results.json`.
- [x] **Research Ethics Compliance:** Zero real user credentials and zero breached passwords used.

---

## 3. Academic Paper Deliverables (DOCX & PDF)

- [x] **Template Baseline:** Strictly formatted using lecturer-provided ACM Word template (`Paper_Template_EN.docx`).
- [x] **Layout Architecture:** Title & Abstract in single-column banner; Authors in 3-column block; Main body in 2-column layout.
- [x] **Typography & Styles:** 18pt Helvetica bold title; 9pt Times New Roman body text; bold headings; justified text.
- [x] **DOCX File Generated:** `final-deliverables/PasswordGuard_Report.docx`.
- [x] **PDF File Generated:** `final-deliverables/PasswordGuard_Report.pdf` (converted via Microsoft Word COM).
- [x] **Visual PDF Inspection:** All 5 pages inspected page-by-page. Zero text overlaps, zero truncated figures, zero orphaned headings.
- [x] **Clean Mathematical Notation:** All formulas use clean Unicode symbols ($R^L$, $\approx$, $\times$, $\le$, $\ge$, $\log_2$) without raw LaTeX backslashes.
- [x] **Table 1 Formatting:** High-density experimental summary table fits 2-column layout with clean cell borders.
- [x] **References:** Exactly 17 academic references verified against bibliography inventory, cited in order, zero duplicates, zero fabricated citations. Current NIST SP 800-63B-4 standard correctly cited.

---

## 4. PowerPoint Presentation Deliverable (PPTX)

- [x] **Presentation File:** `final-deliverables/PasswordGuard_Presentation.pptx`.
- [x] **Slide Count:** Exactly 10 slides, targeted for 8–10 minutes total.
- [x] **Widescreen 16:9 Aspect Ratio:** High-definition 13.333" $\times$ 7.5" slide canvas.
- [x] **Slide 1 Opening Interaction:** Includes explicit audience question comparing `P@ssw0rd123` with `correct-horse-battery-staple`.
- [x] **Visual Quality & Design:** Executive cyber theme (deep slate navy, modern cards, electric cyan/yellow/green accents, high contrast).
- [x] **Embedded Visuals:** High-resolution figures embedded into clean card widgets:
  - System architecture diagram (`fig_architecture.png`).
  - Score distribution by category chart (`fig_category_scores.png`).
- [x] **Speaker Notes:** Embedded in PowerPoint notes pane for all 10 slides.
- [x] **Visual Slide Inspection:** All 10 exported slide images inspected. Text colors, padding, and alignments verified.

---

## 5. Spoken Presentation & Defense Materials

- [x] **Speaking Script:** `final-deliverables/PasswordGuard_Speaking_Script.md`.
  - Simple, natural English sentences optimized for pronunciation confidence.
  - Phonetic pronunciation guides included for key terms (*heuristic*, *entropy*, *Argon2id*).
  - Clear slide-by-slide time budgets (50–60s per slide) and natural transitions.
  - Optional sentences clearly marked with `[Optional if running low on time]`.
- [x] **Speaker Cues:** `final-deliverables/PasswordGuard_Speaker_Cues.md`.
  - Concise bullet points and keywords per slide to facilitate natural speaking without reading word-for-word.
- [x] **Oral Defense Q&A Document:** `final-deliverables/PasswordGuard_QA.md`.
  - 20 high-probability lecturer defense questions.
  - Two-level answers provided: 1–3 sentence Simple Answer and rigorous Technical Follow-up.
  - Academic honesty preserved: openly addresses heuristic circularity and theoretical entropy assumptions.
- [x] **Live Demo Strategy:** 60–90 second interactive walkthrough planned with static fallback slides ready.

---

## 6. Directory Structure & Cleanliness

- [x] **Separated Output Directory:** All deliverables stored in `final-deliverables/`.
  - `PasswordGuard_Report.docx`
  - `PasswordGuard_Report.pdf`
  - `PasswordGuard_Presentation.pptx`
  - `PasswordGuard_Speaking_Script.md`
  - `PasswordGuard_Speaker_Cues.md`
  - `PasswordGuard_QA.md`
  - `FINAL_SUBMISSION_CHECKLIST.md`
  - `figures/` (high-res publication assets)
- [x] **Zero Temporary / Debug Files:** No temporary build artifacts or lock files committed.
- [x] **Zero Sensitive Data:** No real passwords, no API tokens, no personal credentials.
