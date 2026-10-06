# PasswordGuard: Speaker Cue Cards (Pocket Reference)

**Course:** English Writing and Presentation Skills (AV3)  
**Format:** Glanceable bullet cues for natural delivery (no full sentences).  
**Pacing:** ~50–55s per slide (~8:45 total, safe buffer within 8–10 min).  

---

### Slide 1: Title & Opening Question (~0:55)
- Greet lecturer & class; introduce PasswordGuard.
- Ask audience: `P@ssw0rd123` vs `correct-horse-battery-staple`.
- Intuition prefers Option A due to symbols.
- Simple math model: Option B has vastly larger search space.
- Security also needs hashing, rate limiting, MFA.
- *Transition:* Why passwords remain a challenge.

---

### Slide 2: Problem & Motivation (~0:50)
- 50+ accounts per user; hard to remember random strings.
- Predictable shortcuts: reuse, simple substitutions (`@`).
- Attackers use automated tools with leaked wordlists.
- Old complexity rules (`Summer2024!`) are tested early.
- *Transition:* Basic math of search spaces.

---

### Slide 3: Search Spaces & $R^L$ Formula (~0:55)
- Prover-verifier model: server stores verifier, not plaintext.
- Formula: Combinations $S = R^L$.
- Length $L$ is the exponent $\rightarrow$ exponential effect.
- Comparison:
  - 8-char complex: $\approx 6.6 \times 10^{15}$ combinations.
  - 28-char passphrase: $\approx 1.2 \times 10^{40}$ combinations.
- Guessing times are assumed illustrative rates, not benchmarks.
- *Transition:* Real attack threats and defenses.

---

### Slide 4: Threats & Defense in Depth (~0:50)
- Attacks: wordlists, credential stuffing, offline hash cracking, phishing.
- Password strength alone is not enough.
- Defense in depth:
  - Password managers for unique credentials.
  - Multi-Factor Authentication (MFA).
  - Slow memory-hard hashing + rate limiting.
  - *Transition:* Introducing PasswordGuard app.

---

### Slide 5: PasswordGuard Architecture (~0:45)
- Single-page app: React 19, TypeScript, Vite.
- Local processing: runs entirely in browser.
- No password-submission backend, no database, no tracking.
- Web Crypto API for client-side hashing.
- Diagram: state flows to scoring and hashing components.
- *Transition:* How scoring works.

---

### Slide 6: Scoring Heuristic & Theoretical Entropy (~0:55)
- 0–100 heuristic score:
  - Length brackets: up to 40 pts (20 for 8–11 chars, 40 for $\ge 16$).
  - Variety: up to 35 pts (lower 8, upper 8, digits 9, symbols 10).
  - Diversity bonus: up to 15 pts.
  - Passphrase bonus: up to 20 pts (long strings / word separators).
- Penalties: sequences (-15), repeated chars (-15), common roots (-25), length.
- Tiers: Weak (0–39), Medium (40–69), Strong (70–100).
- Theoretical entropy: $E = L \times \log_2(R)$ bits (uniform assumption).
- *Transition:* Password hashing and salts.

---

### Slide 7: Hashing, Salts & Production Security (~0:55)
- One-way hashing: fixed output, irreversible.
- Avalanche effect: small change alters roughly half the output bits.
- Salt: unique random value per user.
  - Same password produces different stored hashes.
  - Makes precomputed rainbow tables impractical across users.
- Educational note: SHA-256 used for browser demo only.
- Production systems need slow functions: Argon2id, bcrypt, scrypt, PBKDF2.
- *Transition:* Controlled experiment setup.

---

### Slide 8: Experimental Design (~0:50)
- 150 synthetic passwords across 5 categories ($n = 30$ each).
- No real or breached credentials used (research ethics).
- 5 categories:
  - Cat A: Short Simple (`cat`, `red2`)
  - Cat B: Common Pattern (`password123`, `admin2024!`)
  - Cat C: Medium Complexity (`BlueSky#49`)
  - Cat D: Long Passphrase (`correct-horse-battery-staple`)
  - Cat E: Long Random (`7$zW#9!kLp&2Qx@m`)
- Automated test script evaluated all 150 samples.
- *Transition:* Quantitative findings.

---

### Slide 9: Results & Observations (~0:55)
- Total: Weak = 59, Medium = 12, Strong = 79.
- Cat E (Long Random): highest score (90.0 / 100), 100% Strong.
- Cat D (Passphrases): highest theoretical entropy (182.9 bits), 70% Strong.
- Cat C (Medium Complexity): avg score 80.8 / 100, 93.3% Strong.
- Cat B (Common Pattern): collapsed to 10.5 / 100 (96.7% Weak) due to pattern penalties!
- Cat A (Short Simple): avg 2.0 / 100 (100% Weak).
- *Transition:* Limitations and conclusions.

---

### Slide 10: Limitations & Takeaways (~0:50)
- Limitations:
  - Circularity: tests internal heuristic consistency, not real cracking.
  - Synthetic dataset: does not capture all human variations.
  - Entropy assumes uniform random selection.
- Key takeaways:
  - Length provides an exponential advantage ($R^L$).
  - Superficial complexity fails against pattern matching.
  - Defense in depth: Passphrases + Password Managers + Argon2id + MFA.
- Closing: Thank teacher and audience; invite questions!
