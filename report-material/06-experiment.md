# 06 - Experimental Design and Setup

## V. Experimental Design and Setup

### 6.1 Objective of the Experiment
The primary purpose of the experimental evaluation is to empirically test the PasswordGuard heuristic analysis engine across a structured dataset of synthetic passwords representing common user construction paradigms. By systematically controlling password length, character diversity, and structural patterns, the experiment assesses:
1. The correlation between password length and resulting strength scores.
2. The impact of heuristic penalties on passwords possessing superficial complexity but predictable structures.
3. The validity of multi-word passphrases in achieving strong classification and high entropy.

### 6.2 Synthetic Dataset Construction
To eliminate privacy risks associated with leaked password compilations [CITATION REQUIRED], a reproducible dataset of 150 synthetic passwords was constructed, partitioned equally into five categories ($n = 30$ per category):

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

### 6.3 Evaluation Metrics
Each candidate password $p_i$ was evaluated programmatically, recording:
- Character length ($L_i$)
- Diversity count ($D_i \in [1, 4]$)
- Heuristic score ($S_i \in [0, 100]$)
- Theoretical Shannon entropy ($E_i$ bits)
- Categorical classification tier ($T_i \in \{\text{Weak}, \text{Medium}, \text{Strong}\}$)

Aggregated group statistics were computed and serialized into `data/results.json` and `data/results.csv`.
