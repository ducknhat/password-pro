# 04 - Methodology

## III. Materials and Methods

### 4.1 Ethical and Privacy Framework
Conducting security research on user credentials carries significant privacy and ethical liabilities [6]. To ensure compliance with academic research standards and user privacy:
1. **Zero External Communication:** The analysis engine is executed exclusively within the user's local web browser execution context via TypeScript.
2. **Zero In-Browser Storage:** No persistent state mechanisms (such as `localStorage`, `sessionStorage`, cookies, or `IndexedDB`) are utilized.
3. **Purely Synthetic Evaluation Data:** Experimental evaluations are conducted strictly on synthetically generated test strings. No breached passwords, leaked database collections, or live student credentials were collected or stored.

### 4.2 Heuristic Scoring Formulation
PasswordGuard calculates an educational heuristic score $S \in [0, 100]$ based on additive complexity rewards and subtractive pattern penalties:

$$S = \text{clamp}_{[0, 100]}\left( S_{\text{length}} + S_{\text{variety}} + B_{\text{diversity}} + B_{\text{passphrase}} - P_{\text{penalties}} \right)$$

#### 1. Length Component ($S_{\text{length}}$, max 40 points)
- $L < 6$: 4 points
- $6 \le L \le 7$: 10 points
- $8 \le L \le 11$: 20 points
- $12 \le L \le 15$: 32 points
- $L \ge 16$: 40 points

#### 2. Character Set Variety ($S_{\text{variety}}$, max 35 points)
- Lowercase alphabet detected ($[a-z]$): $+8$ points
- Uppercase alphabet detected ($[A-Z]$): $+8$ points
- Numeric digits detected ($[0-9]$): $+9$ points
- Printable symbols detected ($[^a-zA-Z0-9]$): $+10$ points

#### 3. Diversity Bonus ($B_{\text{diversity}}$, max 15 points)
- All 4 character classes present: $+15$ points
- 3 character classes present: $+8$ points
- 2 character classes present: $+3$ points

#### 4. Passphrase Bonus ($B_{\text{passphrase}}$, max 20 points)
- $L \ge 20$ with $\ge 10$ unique characters and absence of sequential patterns: $+20$ points
- $L \ge 16$ containing word delimiters (hyphens, spaces, underscores): $+15$ points

#### 5. Pattern Penalties ($P_{\text{penalties}}$)
- Critically short length ($L < 8$): $-20$ points ($L < 12$: $-8$ points)
- Repetitive characters ($\ge 3$ consecutive identical chars or low unique ratio): $-15$ points
- Predictable sequences (numeric like `1234`, alphabetic like `abcd`, or keyboard like `qwerty`): $-15$ points
- Common dictionary pattern (e.g., `password`, `admin`, `welcome`): $-25$ points
- Single character pool only: $-15$ points

#### Score Tiers
- **0–39:** Weak (readily breakable by automated or dictionary attacks according to heuristic)
- **40–69:** Medium (moderate defense according to heuristic, lacking complete structural safeguards)
- **70–100:** Strong (high resistance against exhaustive search according to heuristic)

### 4.3 Brute-Force Time Estimation Model
Search space calculations assume an idealized exhaustive search testing on average half of the combinatorial domain:
$$T = \frac{R^L / 2}{V_{\text{guess}}}$$
Where $V_{\text{guess}}$ represents an illustrative assumed guessing rate across three educational threat profiles:
1. **Online Throttled Guessing:** $V_1 = 100$ guesses/sec (illustrative rate modeling service-level throttling, CAPTCHA, or lockout).
2. **Offline Fast Desktop Guessing:** $V_2 = 10^7$ (10 million) guesses/sec (illustrative rate modeling desktop recovery of unsalted fast hashes).
3. **High-Performance Cluster Guessing:** $V_3 = 10^{11}$ (100 billion) guesses/sec (illustrative rate modeling high-end hardware targeting fast hash algorithms).

All guessing time displays explicitly state that they are illustrative upper-bound calculations assuming uniform brute-force searches [3]. Real cracking speed depends heavily on password hashing algorithm, work factor, hardware, attack strategy, leaked information, and password structure.
