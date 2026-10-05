# 07 - Experimental Results

## VI. Experimental Results

The experimental run processed all 150 synthetic samples without error. The aggregated numerical findings are documented in Table 1 below.

### Table 1: Aggregated Results by Password Category
| Category Key | Category Description | Sample Size ($n$) | Mean Length | Mean Diversity | Mean Score (0–100) | Mean Entropy (bits) | Weak (%) | Medium (%) | Strong (%) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **A** | Short Simple | 30 | 4.2 | 1.5 | 2.0 | 20.8 | 100.0% | 0.0% | 0.0% |
| **B** | Common Pattern | 30 | 9.6 | 2.2 | 10.5 | 51.2 | 96.7% | 3.3% | 0.0% |
| **C** | Medium Complexity | 30 | 13.0 | 4.0 | 80.8 | 85.4 | 0.0% | 6.7% | 93.3% |
| **D** | Long Passphrase | 30 | 31.1 | 2.0 | 75.8 | 182.9 | 0.0% | 30.0% | 70.0% |
| **E** | Long Random | 30 | 16.0 | 4.0 | 90.0 | 105.1 | 0.0% | 0.0% | 100.0% |

### 7.1 Overall Tier Distribution
Across the entire 150-sample dataset:
- **Weak Tier:** 59 passwords ($39.3\%$)
- **Medium Tier:** 12 passwords ($8.0\%$)
- **Strong Tier:** 79 passwords ($52.7\%$)

### 7.2 Analysis of Category Findings

#### 1. Category A (Short Simple)
Category A yielded an average score of only 2.0 / 100 and an average theoretical entropy of 20.8 bits. With an average length of 4.2 characters, the combinatorial space is tiny ($R^L \approx 26^4 \approx 4.5 \times 10^5$), rendering these passwords cracked in under a millisecond even under modest computing rates. All 30 samples (100%) were classified as Weak.

#### 2. Category B (Common Pattern)
Category B passwords demonstrated the effectiveness of the heuristic penalty engine. Despite having an average length of 9.6 characters and often containing uppercase letters, numbers, and symbols (e.g., `admin2024!`, `Password123!`), the presence of sequential runs and known dictionary roots triggered major deductions (-25 pts for common pattern, -15 pts for sequences). Consequently, 29 out of 30 passwords (96.7%) were classified as Weak, with an average score of just 10.5 / 100.

#### 3. Category C (Medium Complexity)
Category C passwords reflected the traditional enterprise policy of combining uppercase, lowercase, numbers, and special symbols over a 12–15 character length. With maximum diversity (4.0/4) and an average length of 13.0, the group attained an average score of 80.8 / 100 and 85.4 bits of entropy. 28 of the 30 samples (93.3%) achieved Strong classification.

#### 4. Category D (Long Passphrase)
Category D comprised multi-word phrases averaging 31.1 characters in length with an average diversity of 2.0 (lowercase letters plus hyphens). Despite using only two character pools, the sheer length generated the highest average theoretical entropy in the study: **182.9 bits**. 21 of 30 samples (70.0%) were classified as Strong, with the remainder classified as Medium (average score 75.8 / 100).

#### 5. Category E (Long Random)
Category E passwords represented ideal machine-generated secrets: 16 characters in length, utilizing all 4 character pools ($R = 95$) without predictable sequences or repetitions. This group achieved the highest average score (90.0 / 100) and an average entropy of 105.1 bits, with 100% of samples classified in the Strong tier.

### 7.3 Correlation Between Length and Strength Score
Evaluating score across discrete length thresholds showed a steep logistic growth curve:
- Length 3–5: Average score 1.8 / 100
- Length 8–10: Average score 10.5 / 100
- Length 12–15: Average score 80.8 / 100
- Length 16: Average score 90.0 / 100
- Length > 25 (passphrases): Average score 75.8 / 100

This validates the hypothesis that length is the most significant structural determinant of resistance against brute-force search.
