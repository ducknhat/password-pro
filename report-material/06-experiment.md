# 06 - Experimental Design and Setup

## V. Experimental Design and Setup

### 6.1 Objective of the Experiment
The primary purpose of the experimental evaluation is to assess whether the implemented PasswordGuard heuristic behaves consistently with its design rules across controlled synthetic password categories. By systematically structuring password length, character diversity, and structural patterns, the experiment evaluates:
1. How the heuristic score responds to increasing password length across synthetic categories.
2. The impact of heuristic penalty deductions on passwords possessing superficial complexity but predictable structures.
3. The response of the scoring engine and theoretical entropy calculations to multi-word passphrases.

Importantly, this experiment evaluates heuristic consistency on controlled synthetic samples; it does not serve as an independent real-world cracking benchmark.

### 6.2 Synthetic Dataset Construction
To eliminate privacy risks associated with handling compromised personal credentials [5, 14], a reproducible dataset of 150 intentionally constructed synthetic passwords was established, partitioned equally into five categories ($n = 30$ per category):

- **Category A: Short Simple Passwords ($L \in [3, 5]$)**
  - Composed primarily of lowercase 3–5 letter words, occasionally with a single digit (e.g., `cat`, `dog`, `sun`, `red2`, `sky1`, `tree`).
- **Category B: Common-Pattern Passwords ($L \in [8, 12]$)**
  - Constructed using widespread dictionary patterns, capitalized first letters, sequential suffixes, and standard punctuation (e.g., `password123`, `admin2024!`, `qwerty12345`, `welcome1`, `iloveyou99`).
- **Category C: Medium-Complexity Passwords ($L \in [11, 15]$)**
  - Synthetic mixed alphanumeric passwords with symbols adhering to common enterprise composition mandates (e.g., `BlueSky#49`, `Silver!Fox82`, `GreenForest9$`, `AutumnLeaf$62`).
- **Category D: Long Passphrases ($L \in [25, 36]$)**
  - Synthetic multi-word phrases separated by hyphens, following the XKCD/NIST passphrase model (e.g., `correct-horse-battery-staple`, `blue-mountains-whisper-softly`, `golden-sunlight-warms-the-ocean`).
- **Category E: Long Random Passwords ($L = 16$)**
  - High-entropy pseudo-random strings generated across all 4 character pools (e.g., `7$zW#9!kLp&2Qx@m`, `xK9#m$L2!vP8@qRt`, `B9#mK$2!xP8@qRtW`).

The dataset is explicitly synthetic and does not represent the statistical distribution of passwords selected by the general human population.

### 6.3 Evaluation Metrics
Each candidate password $p_i$ was evaluated programmatically using the authoritative analyzer (`src/utils/passwordAnalyzer.ts`), recording:
- Character length ($L_i$)
- Diversity count ($D_i \in [1, 4]$)
- Heuristic score ($S_i \in [0, 100]$)
- Theoretical character-space entropy estimate ($E_i$ bits under uniform assumption)
- Categorical classification tier ($T_i \in \{\text{Weak}, \text{Medium}, \text{Strong}\}$)

Aggregated group statistics were computed directly by `scripts/runExperiment.mjs` and serialized into `data/results.json` and `data/results.csv`.
