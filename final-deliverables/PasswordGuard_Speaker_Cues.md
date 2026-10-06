# PasswordGuard: Speaker Cue Cards (Pocket Reference)

**Course:** English Writing and Presentation Skills (AV3)  
**Format:** Quick bullet cues to speak naturally without reading full text verbatim.  
**Target Pacing:** ~1 minute per slide (Total: 8–10 minutes).  

---

### Slide 1: Title & Opening Audience Interaction (1:00)
- **Welcome:** Greet lecturer & class; introduce PasswordGuard team.
- **Audience Question:** Ask which is stronger:
  - Option A: `P@ssw0rd123` (symbols, digits, 11 chars)
  - Option B: `correct-horse-battery-staple` (4 lowercase words, 28 chars)
- **Hook:** Most guess A, but math proves B has vastly larger search space.
- *Transition:* "Let's see why this problem matters to every user."

---

### Slide 2: Problem & Motivation (0:55)
- **Cognitive overload:** 50–100 accounts per user; hard to memorize random strings.
- **Human shortcuts:** Predictable words, reuse, `@` substitutions.
- **Attacker advantage:** Leaked lists (RockYou 32M+), GPU cracking, stuffing botnets.
- **Complexity myth:** Legacy rules (`Summer2024!`) give false security.
- *Transition:* "Let's examine the mathematical formula behind guessing."

---

### Slide 3: Authentication Mathematics & $R^L$ (1:00)
- **Prover-Verifier:** User proves secret; server stores verifier, never plaintext.
- **Formula:** Total Combinations $S = R^L$; Entropy $E = L \times \log_2(R)$.
- **Key Insight:** Length $L$ is the **exponent** $\rightarrow$ exponential growth!
- **Comparison:**
  - 8-char complex: $6.6 \times 10^{15}$ combos $\rightarrow$ ~9 hours at $10^{11}$/s.
  - 28-char passphrase: $1.2 \times 10^{40}$ combos $\rightarrow$ over $10^{21}$ years!
- *Transition:* "Real attackers use smarter methods than uniform guessing."

---

### Slide 4: Common Threats & Defense in Depth (0:55)
- **Threat vectors:** Wordlists, credential stuffing, offline cracking, phishing.
- **Core concept:** Password strength $\neq$ authentication security!
- **Defense in depth triad:**
  - Password Managers (unique credentials per site).
  - Multi-Factor Authentication (MFA stops credential reuse).
  - Slow memory-hard hashing + rate limiting.
- *Transition:* "Here is the tool we built: PasswordGuard."

---

### Slide 5: System Architecture & Privacy Design (0:50)
- **Tech stack:** React 19, TypeScript, Vite, Vanilla CSS.
- **Client-side model:** All calculations execute in local browser RAM.
- **Privacy guarantee:** No backend, no database, no network transmission.
- **Web Crypto API:** Native browser hashing (`crypto.subtle.digest`) and salts.
- *Transition:* "How does the evaluation engine actually work?"

---

### Slide 6: Scoring Heuristic & Theoretical Entropy (1:00)
- **0–100 Heuristic Score:**
  - Base points: Length (up to 40), Pools (up to 35), Diversity (up to 15), Passphrase (+10).
  - Penalties: Sequences (-15), Repetitions (-15), Dictionary roots (-25).
  - Tiers: Weak (0–39), Medium (40–69), Strong (70–100).
- **Theoretical Entropy:** $E = L \times \log_2(R)$ bits (uniform assumption).
- **Illustrative Guessing Rates:** 100 / $10^7$ / $10^{11}$ guesses/sec (educational projections, not benchmarks).
- *Transition:* "Now let's examine server-side password storage."

---

### Slide 7: Hashing, Cryptographic Salts & Argon2id (1:00)
- **One-way hashing:** Fixed digest, irreversible, avalanche effect.
- **Salt (16 bytes):** Unique per user $\rightarrow$ identical passwords get different hashes.
  - Completely stops precomputed Rainbow Tables!
- **Production Warning:** SHA-256 is an educational demo only.
- **Production Standard:** Memory-hard KDFs: Argon2id, bcrypt, scrypt.
- *Transition:* "To verify our heuristic, we ran a controlled experiment."

---

### Slide 8: Experimental Design: Synthetic Dataset (0:55)
- **Sample size:** $N = 150$ synthetic passwords (5 categories $\times$ 30 each).
- **Ethics:** Zero real or breached credentials used (Menlo Report).
- **5 Categories:**
  - Cat A: Short Simple (`cat`, `red2`)
  - Cat B: Common Pattern (`password123`, `admin2024!`)
  - Cat C: Medium Complexity (`BlueSky#49`)
  - Cat D: Long Passphrases (`correct-horse-battery-staple`)
  - Cat E: Long Random (`7$zW#9!kLp&2Qx@m`)
- *Transition:* "Here are the quantitative findings."

---

### Slide 9: Experimental Results & Observations (1:00)
- **Overall tiers:** Weak = 59, Medium = 12, Strong = 79.
- **Category E (Random):** Top score (90.0 / 100), 100% Strong.
- **Category D (Passphrase):** Top theoretical entropy (182.9 bits), 70% Strong.
- **Category C (Complex):** Avg score 80.8 / 100, 93.3% Strong.
- **Category B (Common Pattern):** Collapsed to 10.5 / 100 (96.7% Weak) due to pattern penalties!
- **Category A (Short):** Avg score 2.0 / 100 (100% Weak).
- *Transition:* "Let us conclude with our limitations and takeaways."

---

### Slide 10: Limitations, Key Takeaways & Q&A (0:55)
- **Academic Limitations:**
  - Circularity: Evaluates internal heuristic consistency, not physical cracking.
  - Synthetic dataset: Does not capture all human variations.
  - Entropy assumes uniform selection.
- **Core Takeaways:**
  - Length dominates ($R^L$).
  - Superficial complexity fails.
  - Defense in depth: Passphrases + Password Managers + Argon2id + MFA.
- **Closing:** Thank audience and invite questions!
