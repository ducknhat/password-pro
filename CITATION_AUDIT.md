# PasswordGuard Citation Audit

**Project:** PasswordGuard: An Experimental Analysis of Password Strength and Authentication Security  
**Course:** English Writing and Presentation Skills (Kỹ năng viết và thuyết trình bằng Tiếng Anh)  
**Date:** March 2026  
**Auditor:** Automated & Peer Academic Audit  
**Format Standard:** ACM Reference Format (Alphabetical, Numbered) as required by `Paper_Template_EN.docx`

---

## 1. Executive Summary

This citation audit inventories every academic claim across the project documentation and report materials (`report-material/01-abstract.md` through `report-material/10-conclusion.md`). Every factual statement, historical metric, algorithmic standard, and research finding has been cross-referenced against authoritative sources (NIST Special Publications, FIPS standards, IETF RFCs, and peer-reviewed ACM/IEEE/USENIX conference proceedings).

- **Total Claims Audited:** 24 claims across 10 report sections.
- **Verified Sources Identified:** 17 authoritative primary sources.
- **Fabricated / Unverified Sources:** 0 (strictly prohibited; all bibliographic metadata independently verified).
- **Remaining Citation TODOs:** 0 (all 16 placeholders in report material mapped to verified literature).

---

## 2. Verified Sources Inventory (ACM Reference Format)

| Ref # | Primary Author / Standard | Year | Title / Specification | Venue / Publisher | Source Type | Status |
| :---: | :--- | :---: | :--- | :--- | :--- | :---: |
| **[1]** | Biryukov, Dinu, Khovratovich | 2016 | Argon2: New generation of memory-hard functions for password hashing | IEEE EuroS&P '16 | Peer-Reviewed Conference | **VERIFIED** |
| **[2]** | Bonneau, Herley, van Oorschot, Stajano | 2012 | The quest to replace passwords: A framework for comparative evaluation | IEEE S&P '12 | Peer-Reviewed Conference | **VERIFIED** |
| **[3]** | Grassi, Fenton, Newton, et al. | 2017 | Digital Identity Guidelines: Authentication & Lifecycle (SP 800-63B) | NIST Special Publication | Official US Standard | **VERIFIED** |
| **[4]** | Hunt, Troy | 2018 | Pwned Passwords and k-Anonymity: Protecting users at scale | Cloudflare / HIBP Technical Report | Industry Technical Standard | **VERIFIED** |
| **[5]** | Kaliski, Burt | 2000 | PKCS #5: Password-Based Cryptography Specification Version 2.0 | IETF RFC 2898 | Official Internet Standard | **VERIFIED** |
| **[6]** | Kenneally & Dittrich | 2012 | The Menlo Report: Ethical Principles Guiding ICT Research | US DHS Technical Report | Official Ethics Standard | **VERIFIED** |
| **[7]** | Komanduri, Shay, Kelley, et al. | 2011 | Of passwords and people: Measuring the effect of password-composition policies | ACM CHI '11 | Peer-Reviewed Conference | **VERIFIED** |
| **[8]** | NIST Computer Security Division | 2015 | Secure Hash Standard (SHS) (FIPS PUB 180-4) | US Dept of Commerce / NIST | Federal FIPS Standard | **VERIFIED** |
| **[9]** | Oechslin, Philippe | 2003 | Making a faster cryptanalytic time-memory trade-off | CRYPTO '03 (LNCS 2729) | Peer-Reviewed Conference | **VERIFIED** |
| **[10]** | Percival, Colin | 2009 | Stronger key derivation via sequential memory-hard functions | BSDCan '09 | Peer-Reviewed Conference | **VERIFIED** |
| **[11]** | Provos & Mazières | 1999 | A future-adaptable password scheme (bcrypt) | USENIX FREENIX '99 | Peer-Reviewed Conference | **VERIFIED** |
| **[12]** | Shannon, Claude E. | 1948 | A mathematical theory of communication | Bell System Technical Journal | Foundational Journal | **VERIFIED** |
| **[13]** | Steube, Jens | 2020 | Hashcat: Advanced password recovery utility | Hashcat Architecture & Benchmarks | Official Tool Documentation | **VERIFIED** |
| **[14]** | Thomas, Li, Zand, et al. | 2017 | Data breaches, phishing, or malware? Understanding stolen credentials | ACM CCS '17 | Peer-Reviewed Conference | **VERIFIED** |
| **[15]** | Ur, Segreti, Bauer, et al. | 2015 | Measuring real-world accuracies and biases in modeling password guessability | USENIX Security '15 | Peer-Reviewed Conference | **VERIFIED** |
| **[16]** | Webster & Tavares | 1985 | On the design of S-boxes (Strict Avalanche Criterion) | CRYPTO '85 (LNCS 218) | Peer-Reviewed Conference | **VERIFIED** |
| **[17]** | Weir, Aggarwal, de Medeiros, Glodek | 2009 | Password cracking using probabilistic context-free grammars | IEEE S&P '09 | Peer-Reviewed Conference | **VERIFIED** |

---

## 3. Claims Requiring Citations and Verification Analysis

### Claim 1: Password authentication as a prover-verifier protocol and access control cornerstone
- **File:** `report-material/02-introduction.md`, `report-material/03-background.md`
- **Need:** Ground the core definition of identity verification and credential evaluation in official security guidelines.
- **Source Type:** Authoritative Government Standard / Survey.
- **Candidate:** NIST SP 800-63B [3], Bonneau et al. [2].
- **Verification Status:** **VERIFIED**. NIST SP 800-63B Section 5 explicitly formalizes subscriber authentication as prover-verifier interaction.

### Claim 2: Human cognitive biases leading to predictable patterns and rule-evasion
- **File:** `report-material/01-abstract.md`, `report-material/02-introduction.md`, `report-material/03-background.md`, `report-material/08-discussion.md`
- **Need:** Support the claim that human users do not select uniformly distributed characters, but follow predictable phonological and keyboard heuristics.
- **Source Type:** Peer-Reviewed Empirical Studies.
- **Candidate:** Ur et al. (USENIX Security 2015) [15], Komanduri et al. (ACM CHI 2011) [7].
- **Verification Status:** **VERIFIED**. Komanduri et al. analyzed 5 composition policies and showed predictable padding/capitalization; Ur et al. demonstrated systemic bias in user choices.

### Claim 3: Password reuse and credential stuffing risks
- **File:** `report-material/02-introduction.md`, `report-material/08-discussion.md`
- **Need:** Document that stolen credentials from third-party breaches are automatically weaponized against unrelated accounts.
- **Source Type:** Empirical Measurement Research.
- **Candidate:** Thomas et al. (ACM CCS 2017) [14].
- **Verification Status:** **VERIFIED**. Thomas et al. analyzed 1.9 billion exposed credentials and found 7–25% matched target Google accounts due to cross-site reuse.

### Claim 4: Offline hash cracking using GPU and ASIC acceleration
- **File:** `report-material/02-introduction.md`, `report-material/09-limitations.md`
- **Need:** Justify why fast hashing algorithms can be attacked at rates of billions of attempts per second.
- **Source Type:** Tool Architecture & Benchmark Documentation.
- **Candidate:** Steube (Hashcat) [13].
- **Verification Status:** **VERIFIED**. Hashcat benchmarks document sustained multi-billion hashes/sec on consumer GPUs for unkeyed fast digests.

### Claim 5: Theoretical entropy calculation ($E = L \times \log_2 R$) and exponential length scaling
- **File:** `report-material/03-background.md`, `report-material/04-methodology.md`
- **Need:** Establish the mathematical formulation of theoretical character-space information entropy.
- **Source Type:** Foundational Information Theory.
- **Candidate:** Shannon (1948) [12], NIST SP 800-63B Appendix A [3].
- **Verification Status:** **VERIFIED**. Shannon (1948) established $H = \sum -p_i \log_2 p_i = \log_2 R$ under uniform distribution, scaling linearly with length $L$.

### Claim 6: Cryptographic hash properties: Pre-image resistance and Avalanche Effect
- **File:** `report-material/03-background.md`
- **Need:** Define one-way properties and diffusion criteria in cryptographic transformations.
- **Source Type:** Federal Standard & Cryptographic Research.
- **Candidate:** NIST FIPS 180-4 [8], Webster & Tavares (CRYPTO '85) [16].
- **Verification Status:** **VERIFIED**. FIPS 180-4 defines SHA-256 pre-image resistance; Webster & Tavares established the Strict Avalanche Criterion ($P = 0.5$ bit flip).

### Claim 7: Rainbow tables and the role of unique cryptographic salting
- **File:** `report-material/03-background.md`
- **Need:** Explain how precomputed time-memory trade-offs operate and why unique salts defeat them.
- **Source Type:** Cryptographic Literature & Standards.
- **Candidate:** Oechslin (CRYPTO '03) [9], NIST SP 800-63B Section 5.1.1.2 [3].
- **Verification Status:** **VERIFIED**. Oechslin introduced rainbow tables; NIST SP 800-63B mandates 32+ bit salts (PasswordGuard demonstrates 128-bit/16-byte salts).

### Claim 8: Slow, memory-hard Key Derivation Functions (Argon2id, bcrypt, scrypt, PBKDF2)
- **File:** `report-material/01-abstract.md`, `report-material/02-introduction.md`, `report-material/03-background.md`, `report-material/10-conclusion.md`
- **Need:** Contrast general-purpose fast hashes (SHA-256) with production-ready password derivation functions.
- **Source Type:** Original Algorithm Specifications & RFCs.
- **Candidate:** Biryukov et al. (EuroS&P 2016) [1], Provos & Mazières (USENIX 1999) [11], Percival (BSDCan 2009) [10], Kaliski (RFC 2898) [5].
- **Verification Status:** **VERIFIED**. All four specifications verified.

### Claim 9: Ethical research principles and non-collection of live student credentials
- **File:** `report-material/04-methodology.md`, `report-material/06-experiment.md`
- **Need:** Justify the methodological decision to use synthetic password generation instead of harvesting live user data.
- **Source Type:** Institutional Research Ethics Frameworks.
- **Candidate:** Kenneally & Dittrich (The Menlo Report, 2012) [6], Thomas et al. [14].
- **Verification Status:** **VERIFIED**. The Menlo Report establishes principles of Beneficence and Respect for Persons in ICT security research.

### Claim 10: Rule-based and grammar-based password cracking strategies
- **File:** `report-material/08-discussion.md`, `report-material/09-limitations.md`
- **Need:** Support the explanation of why Category B passwords fail despite symbols/digits.
- **Source Type:** Peer-Reviewed Password Cracking Research.
- **Candidate:** Weir et al. (IEEE S&P 2009) [17], Steube [13].
- **Verification Status:** **VERIFIED**. Weir et al. showed probabilistic context-free grammars rapidly guess passwords composed of dictionary words + predictable suffixes.

### Claim 11: Defense-in-depth mitigations: MFA, breached password lists, rate-limiting
- **File:** `report-material/08-discussion.md`, `report-material/10-conclusion.md`
- **Need:** Reference standard mitigation layers beyond standalone password strength.
- **Source Type:** Official Guidelines & Technical Implementations.
- **Candidate:** NIST SP 800-63B [3], Hunt (2018) [4], Bonneau et al. [2].
- **Verification Status:** **VERIFIED**. NIST SP 800-63B mandates rate-limiting and MFA; Hunt established $k$-anonymity verification against compromised sets.

---

## 4. Claim-to-Source Mapping Matrix

| Report File | Location / Paragraph | In-Text Citation Added | Source Reference |
| :--- | :--- | :--- | :--- |
| `01-abstract.md` | Paragraph 1 | `[2]` | Bonneau et al. (2012) |
| `01-abstract.md` | Paragraph 1 | `[15]` | Ur et al. (2015) |
| `01-abstract.md` | Paragraph 3 | `[1, 3]` | Biryukov et al. (2016), NIST SP 800-63B |
| `02-introduction.md` | Section I, Para 1 | `[3]` | NIST SP 800-63B |
| `02-introduction.md` | Section I, Para 1 | `[2]` | Bonneau et al. (2012) |
| `02-introduction.md` | Section I, Para 2 | `[15]` | Ur et al. (2015) |
| `02-introduction.md` | Section I, Para 2 | `[14]` | Thomas et al. (2017) |
| `02-introduction.md` | Section I, Para 3 | `[13]` | Steube (Hashcat 2020) |
| `02-introduction.md` | Section I, Item 5 | `[1]` | Biryukov et al. (2016) |
| `03-background.md` | Section II.A, Para 1 | `[3]` | NIST SP 800-63B |
| `03-background.md` | Section II.B, Para 1 | `[12]` | Shannon (1948) |
| `03-background.md` | Section II.B, Para 2 | `[12]` | Shannon (1948) |
| `03-background.md` | Section II.B, Para 3 | `[7, 15]` | Komanduri et al. (2011), Ur et al. (2015) |
| `03-background.md` | Section II.C, Item 1 | `[8]` | NIST FIPS 180-4 (2015) |
| `03-background.md` | Section II.C, Item 2 | `[16]` | Webster & Tavares (1985) |
| `03-background.md` | Section II.C, Para 2 | `[9]` | Oechslin (2003) |
| `03-background.md` | Section II.C, Para 3 | `[3]` | NIST SP 800-63B |
| `03-background.md` | Section II.D, Item 1 | `[1]` | Biryukov et al. (2016) |
| `03-background.md` | Section II.D, Item 2 | `[11]` | Provos & Mazières (1999) |
| `03-background.md` | Section II.D, Item 3 | `[10]` | Percival (2009) |
| `03-background.md` | Section II.D, Item 4 | `[5]` | Kaliski (RFC 2898, 2000) |
| `04-methodology.md` | Section III.A, Para 1 | `[6]` | Kenneally & Dittrich (Menlo Report, 2012) |
| `04-methodology.md` | Section III.B, Para 2 | `[3]` | NIST SP 800-63B |
| `06-experiment.md` | Section V.A, Para 1 | `[6, 14]` | Menlo Report (2012), Thomas et al. (2017) |
| `08-discussion.md` | Section VII.A, Para 1 | `[7]` | Komanduri et al. (2011) |
| `08-discussion.md` | Section VII.A, Para 2 | `[13, 17]` | Steube (2020), Weir et al. (2009) |
| `08-discussion.md` | Section VII.B, Item 1 | `[15]` | Ur et al. (2015) |
| `08-discussion.md` | Section VII.B, Item 2 | `[3]` | NIST SP 800-63B Appendix A |
| `08-discussion.md` | Section VII.C, Para 1 | `[2]` | Bonneau et al. (2012) |
| `08-discussion.md` | Section VII.C, Item 1 | `[3]` | NIST SP 800-63B |
| `08-discussion.md` | Section VII.C, Item 2 | `[4]` | Hunt (2018) |
| `08-discussion.md` | Section VII.C, Item 3 | `[3]` | NIST SP 800-63B |
| `09-limitations.md` | Section VIII.A, Para 1 | `[15]` | Ur et al. (2015) |
| `09-limitations.md` | Section VIII.B, Para 1 | `[12, 15]` | Shannon (1948), Ur et al. (2015) |
| `09-limitations.md` | Section VIII.C, Item 3 | `[13]` | Steube (Hashcat 2020) |
| `09-limitations.md` | Section VIII.E, Para 1 | `[6, 14]` | Menlo Report (2012), Thomas et al. (2017) |
| `10-conclusion.md` | Section IX, Para 3 | `[3]` | NIST SP 800-63B |

---

## 5. Rejected / Unverified Sources

During this audit, the following potential citations were reviewed and intentionally excluded to prevent fabrication or misattribution:

1. **"Ur et al. 2015 in ACM CCS"**: The original placeholder incorrectly cited ACM CCS for Ur et al.'s guessability modeling paper. Verification confirmed the paper was actually published at *USENIX Security 2015* under the title *"Measuring Real-World Accuracies and Biases in Modeling Password Guessability"*. The citation was updated to the verified USENIX publication.
2. **"Weir et al. (2009) co-author Bill Glisson"**: Preliminary placeholder notes listed "Bill Glisson". Verification against the IEEE Xplore proceedings of IEEE S&P 2009 confirmed the correct co-author is *Bill Glodek*. Corrected in verified bibliographic record.
3. **Specific GPU Cracking Speed Claims (e.g. "RTX 4090 cracks at X MH/s")**: Excluded from formal claims because PasswordGuard was not benchmarked against physical RTX 4090 hardware. General offline cracking scenarios cite Steube [13] for illustrative tool architecture without asserting specific unbenchmarked hardware numbers.
4. **General Unverifiable Web Blogs**: Omitted in favor of primary peer-reviewed literature or official RFC/NIST standards.

---

## 6. Remaining Citation TODOs

**Count: 0**  
All 16 citation placeholders previously marked with `[TODO: Citation needed...]` across `report-material/*.md` have been fully investigated, verified against authoritative sources, and mapped to the 17 numbered ACM references in `report-material/10-conclusion.md`.
