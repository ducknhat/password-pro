# 09 - Limitations

## VIII. Limitations

Academic integrity demands a transparent disclosure of the technical, mathematical, and practical limitations of this research and application:

### 9.1 Heuristic Nature of the Scoring Engine
The 0–100 scoring algorithm implemented in PasswordGuard is an educational heuristic rather than a formal mathematical proof or certified compliance framework (such as FIPS 140-3 or ISO/IEC 27001). While it accurately penalizes widespread sequences and rewards length and variety, it cannot account for all permutations of personalized context (e.g., a user's street name, family members, or company terminology) [CITATION REQUIRED].

### 9.2 Upper-Bound Character Space Assumption
The theoretical Shannon entropy ($E = L \times \log_2 R$) calculated by PasswordGuard assumes that every character in the active character pool has an equal, independent probability of being chosen. Because natural human language exhibits severe statistical biases (e.g., zipfian distributions, word collocations, common keyboard paths), theoretical entropy acts as an upper-bound estimate and significantly overestimates the true cognitive entropy of human-generated strings [CITATION REQUIRED].

### 9.3 Brute-Force Attacker Modeling
The crack time estimations provided in the application assume an idealized exhaustive search traversing through 50% of the entire combinatorial search space ($R^L / 2$). In real-world intrusions, adversaries rarely begin with pure brute-force searches against unknown alphabets. Instead, they deploy hybrid attacks:
- Targeted wordlists (e.g., RockYou, breach dumps)
- Rule-based mutations (`leetspeak` replacements, numeric appending)
- Mask attacks targeting specific known password structural policies [CITATION REQUIRED].
Hence, crack times are strictly illustrative of combinatorial scale rather than guaranteed real-world survival times.

### 9.4 Fast Hash Demonstration Boundary
The Web Crypto demonstration employs SHA-256 exclusively to explain the concepts of one-way transforms, cryptographic salts, and the avalanche effect. As emphasized throughout the application interface and documentation, general-purpose SHA-256 alone is **unsuitable for production password storage**. Real-world authentication systems must utilize memory-hard key derivation functions such as Argon2id [CITATION REQUIRED].

### 9.5 Synthetic Dataset Scope
To ensure strict privacy standards and avoid handling sensitive private credentials, the empirical experiment was conducted on 150 synthetic passwords. While these synthetic samples represent five key structural archetypes, they do not encompass the full statistical diversity or nuanced behavioral variations observed in real-world authentication datasets [CITATION REQUIRED].
