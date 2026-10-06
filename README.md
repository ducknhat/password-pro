# PasswordGuard: Password Security & Authentication Analyzer

> **Course Context:** English Presentation Skills for Information Technology Students (University Level)  
> **Project Scope:** Educational password security analyzer, search-space complexity estimator, one-way hashing & salting demonstrator, and controlled functional evaluation of the PasswordGuard heuristic using synthetic passwords.

---

## 1. Project Overview
**PasswordGuard** is an interactive, privacy-first single-page web application developed to help computer science and IT students visually explore the mechanics of password security. Rather than treating password strength as an opaque guessing game, PasswordGuard exposes the underlying mathematics: character-space sizing, theoretical Shannon entropy, combinatorial brute-force search complexity, and one-way cryptographic hashing.

---

## 2. Objectives
- **Educational Clarity:** Demystify password complexity rules and explain *why* password length mathematically dominates character alphabet expansion.
- **Threat Awareness:** Detail the most prevalent real-world authentication attack vectors (weak passwords, password reuse, credential stuffing, phishing, and offline hash cracking).
- **Cryptographic Transparency:** Demonstrate the difference between reversible encryption and one-way hashing, the role of cryptographic salting in stopping rainbow tables, and why fast hashes like SHA-256 alone are insufficient for real-world password storage.
- **Privacy by Design:** Designed for 100% client-side password evaluation without application-level password storage or transmission.

---

## 3. Key Features
1. **Interactive Password Strength Evaluator:**
   - Real-time scoring heuristic from 0 to 100.
   - Categorization into **Weak (0–39)**, **Medium (40–69)**, and **Strong (70–100)**.
   - Composition checklist (length, lowercase, uppercase, numbers, special symbols).
   - Pattern vulnerability detection (repeated characters, sequential characters, common dictionary passwords).
   - Dynamic, actionable recommendations.
2. **Mathematical Entropy & Brute-Force Visualization:**
   - Theoretical character-space entropy calculation ($E = L \times \log_2 R$ under uniform assumption).
   - Combinatorial search-space calculation ($R^L$).
   - Illustrative crack times under three distinct threat scenarios (Rate-limited online service, fast offline single CPU, high-end multi-GPU cluster).
   - Exponential growth sensitivity table comparing lengths 6 through 16.
3. **Interactive Hashing & Salting Sandbox:**
   - Native browser Web Crypto API (`crypto.subtle.digest('SHA-256')`) execution.
   - Dynamic 16-byte cryptographically secure random salt generator.
   - Side-by-side comparison illustrating rainbow table vulnerability vs. salted output.
   - Deep dive into modern slow Key Derivation Functions: **Argon2id**, **bcrypt**, **scrypt**, and **PBKDF2**.
4. **Reproducible Controlled Evaluation:**
   - Evaluated against 150 synthetic passwords across 5 structural categories.
   - Interactive charts rendered via Recharts.
   - Exportable dataset in JSON and CSV formats.

---

## 4. Architecture
PasswordGuard follows a decoupled, modular, 100% client-side architecture:

```
[ User Input (Browser RAM only) ]
                │
    ┌───────────┴───────────┐
    ▼                       ▼
[ Heuristic Analyzer ]  [ Web Crypto API ]
- Pattern Detection     - SHA-256 Digest
- Entropy Math (R^L)    - CSPRNG Salt (16B)
- Checklist & Scoring   - Salting Demo
    │                       │
    └───────────┬───────────┘
                ▼
  [ Responsive React UI & Charts ]
  (Tabs: Analyzer, Concepts, Threats, Hashing, Experiment, About)
```

---

## 5. Technologies Used
- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Modular Vanilla CSS (Cybersecurity-inspired dark theme, custom responsive grid, glassmorphic cards)
- **Data Visualization:** Recharts
- **Icons:** Lucide React
- **Cryptography:** Native Browser Web Crypto API (`window.crypto.subtle`)
- **Testing:** Vitest
- **Data Generation:** Node.js ES Modules (direct import of TypeScript analyzer via native type stripping, Node 22.6+)

---

## 6. Installation

Ensure **Node.js (version 22.6+ or Node 24+ LTS)** is installed on your system.
*(Note: Node.js 22.6.0+ is required to execute the TypeScript-backed experiment runner natively via type-stripping without additional transpiler toolchains).*

```bash
# 1. Clone or extract the repository
cd PasswordGuard

# 2. Install dependencies
npm install
```

---

## 7. Running the Project

```bash
# Start local development server
npm run dev

# Run unit test suite (17 tests via Vitest)
npm test

# Run synthetic experiment & regenerate data files
npm run experiment

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 8. Password Scoring Methodology
The scoring engine implements an educational heuristic (0 to 100) combining additive complexity points and penalty deductions:

- **Length Base Score (Max 40 pts):**
  - $<6$ chars: 4 pts | $6–7$ chars: 10 pts | $8–11$ chars: 20 pts | $12–15$ chars: 32 pts | $16+$ chars: 40 pts
- **Character Variety (Max 35 pts):**
  - Lowercase: 8 pts | Uppercase: 8 pts | Digits: 9 pts | Special characters: 10 pts
- **Diversity Bonus (Max 15 pts):**
  - 4 pools: +15 pts | 3 pools: +8 pts | 2 pools: +3 pts
- **Passphrase Bonus (Max 20 pts):**
  - $\ge 20$ characters with diverse character set and no sequential pattern.
- **Penalties:**
  - Length $<8$: -20 pts | Length $<12$: -8 pts
  - Repeated characters ($\ge 3$ consecutive or low unique ratio): -15 pts
  - Sequential patterns (`1234`, `abcd`, `qwerty`): -15 pts
  - Common dictionary patterns (`password`, `admin`, `welcome`): -25 pts
  - Single character pool only: -15 pts

*Clamped strictly to $[0, 100]$.*

---

## 9. Experimental Methodology
To evaluate whether the heuristic behaves consistently across distinct structural paradigms without handling sensitive private credentials, an experiment was executed on **150 intentionally constructed synthetic passwords** evenly partitioned across 5 categories (30 samples each):
1. **Category A: Short Simple** (e.g., `cat`, `dog`, `sun`, `red2`)
2. **Category B: Common Pattern** (e.g., `password123`, `admin2024!`, `qwerty12345`)
3. **Category C: Medium Complexity** (e.g., `BlueSky#49`, `Silver!Fox82`, `AutumnLeaf$62`)
4. **Category D: Long Passphrases** (e.g., `correct-horse-battery-staple`, `blue-mountains-whisper-softly`)
5. **Category E: Long Random** (e.g., `7$zW#9!kLp&2Qx@m`, `xK9#m$L2!vP8@qRt`)

Each sample was evaluated for length, diversity count, heuristic score, tier classification, and theoretical character-space entropy estimate. Aggregated metrics were written to `data/results.json` and `data/results.csv`.

---

## 10. Experimental Results Summary

| Category | Sample Count | Avg. Length | Avg. Diversity | Avg. Score | Avg. Entropy | Weak (%) | Medium (%) | Strong (%) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **A. Short Simple** | 30 | 4.2 | 1.5 / 4 | 2.0 / 100 | 20.8 bits | 100% | 0% | 0% |
| **B. Common Pattern** | 30 | 9.6 | 2.2 / 4 | 10.5 / 100 | 51.2 bits | 96.7% | 3.3% | 0% |
| **C. Medium Complexity** | 30 | 13.0 | 4.0 / 4 | 80.8 / 100 | 85.4 bits | 0% | 6.7% | 93.3% |
| **D. Long Passphrase** | 30 | 31.1 | 2.0 / 4 | 75.8 / 100 | 182.9 bits | 0% | 30.0% | 70.0% |
| **E. Long Random** | 30 | 16.0 | 4.0 / 4 | 90.0 / 100 | 105.1 bits | 0% | 0% | 100% |

**Key Conclusions:**
1. **Length Dominance:** Long passphrases (Category D) achieved the highest theoretical character-space entropy estimate (182.9 bits under uniform assumption) despite using only 2 character pools (lowercase + hyphens).
2. **Superficial Complexity Failure:** Category B passwords containing numbers and exclamation marks still received low scores (10.5 average score) due to predictable structural sequences and pattern penalties.
3. **Random Password Performance:** Category E achieved the highest consistency (90.0 avg score, 100% Strong) due to maximal character diversity coupled with recommended length.

---

## 11. Security Considerations
- **No Remote Transmission:** All computation executes purely in the browser thread using standard JavaScript and the Web Crypto API.
- **No Persistence:** Passwords entered in the UI are held only in local component state (`useState`) and are discarded when cleared or navigated away.
- **CSPRNG Salting:** Salts are generated using `window.crypto.getRandomValues()`, providing cryptographically secure pseudo-randomness.

---

## 12. Academic Limitations
1. **Heuristic Nature:** The score reflects structural rules, not an exhaustive or dynamic vulnerability audit.
2. **Entropy Assumptions:** Theoretical entropy assumes uniform random distribution; real human passwords exhibit cognitive bias.
3. **Brute-Force Idealization:** Crack times represent mathematical exhaustive search; real adversaries employ dictionary mutations, precomputed tables, and breached databases first.
4. **Educational SHA-256:** SHA-256 is demonstrated for clarity; production systems must use memory-hard KDFs (Argon2id, bcrypt).
5. **Synthetic Data:** The dataset is synthetic to adhere to ethical privacy standards.

---

## 13. Future Work
- Integration of client-side Bloom filters containing the top 100,000 common passwords.
- Implementation of a Web Worker-based Argon2id benchmarking simulator to demonstrate the computation cost of memory hardness.
- Extension to support passphrase generation directly from the EFF large wordlist.
