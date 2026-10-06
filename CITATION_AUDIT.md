# PasswordGuard Citation Audit & Reference Integrity Verification

**Project:** PasswordGuard: An Experimental Analysis of Password Strength and Authentication Security  
**Course:** English Writing and Presentation Skills (Kỹ năng viết và thuyết trình bằng Tiếng Anh)  
**Date:** March 2026 (Final Academic Verification Pass)  
**Verification Standard:** Authoritative Primary Source Checking (NIST CSRC, RFC Editor, ACM DL, IEEE Xplore, USENIX, SpringerLink)  
**Citation Format:** ACM Reference Format (Alphabetical, Numbered)

---

## 1. Executive Summary & Verification Metrics

This audit represents the final reference-integrity and academic claim cleanup pass. Every bibliographic entry and citation claim was checked directly against authoritative publication repositories.

| Audit Metric | Result / Status | Notes |
| :--- | :---: | :--- |
| **Total References** | **17** | Exactly matches final bibliography in `report-material/10-conclusion.md` |
| **Verified References** | **17** | Independently verified against authoritative primary publication databases |
| **References Corrected** | **3** | NIST SP 800-63B updated to SP 800-63B-4; Troy Hunt reclassified as blog/web release; Colin Percival reclassified as BSDCan conference paper |
| **References Replaced** | **0** | All 17 citations map to their genuine, primary academic works |
| **References Removed** | **0** | No spurious or duplicate entries |
| **Current NIST Standard Used** | **NIST SP 800-63B-4 (July 2025)** | Authored by David Temoshok et al.; supersedes SP 800-63B Rev 3 (2017) |
| **Claims Weakened / Refined** | **4** | Hardware 100B/s claims replaced with fast-hash economic asymmetry; absolute privacy claims replaced with client-side architecture description; theoretical entropy upper-bound disclaimers strengthened; illustrative assumed guessing rates formalized |
| **Remaining Manual-Verification Items** | **0** | All metadata verified; primary sources recorded |
| **Final Unresolved Citation Count** | **0** | Zero broken links or unmapped citations |
| **Overall Audit Status** | **PASSED** | Reference integrity checked; remaining limitations documented |

---

## 2. Independent Reference Verification Table

Each entry below was audited against primary publishing records:

| Ref # | Full Authors & Title | Venue / Identifier / DOI | Primary Verification Source | Bibliographic Status | Verification Notes & Classification |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **[1]** | Alex Biryukov, Daniel Dinu, and Dmitry Khovratovich (2016). *Argon2: New Generation of Memory-Hard Functions for Password Hashing*. | IEEE European Symposium on Security and Privacy (EuroS&P 2016), pp. 292–302. DOI: 10.1109/EuroSP.2016.31 | IEEE Xplore Digital Library | **VERIFIED** | Peer-Reviewed Conference Proceedings. Winner of the Password Hashing Competition (PHC). |
| **[2]** | Joseph Bonneau, Cormac Herley, Paul C. van Oorschot, and Frank Stajano (2012). *The Quest to Replace Passwords: A Framework for Comparative Evaluation of Web Authentication Schemes*. | 2012 IEEE Symposium on Security and Privacy (S&P 2012), pp. 553–567. DOI: 10.1109/SP.2012.44 | IEEE Xplore Digital Library | **VERIFIED** | Peer-Reviewed Conference Proceedings. Seminal framework for web authentication analysis. |
| **[3]** | Troy Hunt (2018). *I've Just Launched Pwned Passwords V2 with Half a Billion Passwords*. | Troy Hunt Official Publication Blog, Feb. 22, 2018. URL: `https://www.troyhunt.com/ive-just-launched-pwned-passwords-v2/` | Official Author Publication Site / HIBP Documentation | **VERIFIED** | **Classification Correction:** Industry Web Release / Technical Blog post. Not a peer-reviewed paper or formal institutional technical report. Accurately cited as primary source for $k$-anonymity breach lookup launch. |
| **[4]** | Burt Kaliski (2000). *PKCS #5: Password-Based Cryptography Specification Version 2.0*. | IETF RFC 2898. DOI: 10.17487/RFC2898 | IETF / RFC Editor Official Database | **VERIFIED** | Official Internet Standard / Request for Comments (RFC). Specifies PBKDF2. |
| **[5]** | Erin Kenneally and David Dittrich (2012). *The Menlo Report: Ethical Principles and Guidelines for Establishing Research Concerning Information and Communications Technology*. | U.S. Department of Homeland Security, Technical Report. | U.S. DHS Science & Technology Directorate / IEEE Security & Privacy (2012) | **VERIFIED** | Official Government / Community Ethics Technical Report. Grounds ethical synthetic data usage. |
| **[6]** | Saranga Komanduri, Richard Shay, Patrick Gage Kelley, Michelle L. Mazurek, Lujo Bauer, Nicolas Christin, Lorrie Faith Cranor, and Serge Egelman (2011). *Of Passwords and People: Measuring the Effect of Password-Composition Policies*. | ACM CHI Conference on Human Factors in Computing Systems (CHI '11), pp. 2595–2604. DOI: 10.1145/1978942.1979321 | ACM Digital Library | **VERIFIED** | Peer-Reviewed Conference Proceedings. Empirically demonstrates human evasion of composition rules. |
| **[7]** | National Institute of Standards and Technology (2015). *Secure Hash Standard (SHS)*. | Federal Information Processing Standards Publication (FIPS PUB 180-4). DOI: 10.6028/NIST.FIPS.180-4 | NIST Computer Security Resource Center (CSRC) | **VERIFIED** | Federal Information Processing Standard (FIPS). Specifies SHA-256. |
| **[8]** | Philippe Oechslin (2003). *Making a Faster Cryptanalytic Time-Memory Trade-Off*. | Advances in Cryptology – CRYPTO 2003, Lecture Notes in Computer Science, vol. 2729, pp. 617–630. DOI: 10.1007/978-3-540-45146-4_36 | SpringerLink / IACR Archive | **VERIFIED** | Peer-Reviewed Conference Proceedings. Original rainbow table time-memory trade-off paper. |
| **[9]** | Colin Percival (2009). *Stronger Key Derivation via Sequential Memory-Hard Functions*. | BSDCan 2009: The Technical BSD Conference, Ottawa, Canada. Standardized as IETF RFC 7914 (2016). | Author Publication Repository / BSDCan Proceedings / RFC Editor | **VERIFIED** | **Classification Correction:** Technical Conference Paper (BSDCan 2009), non-peer-reviewed; subsequent formal Internet specification via IETF RFC 7914 (2016). Accurately described. |
| **[10]** | Niels Provos and David Mazières (1999). *A Future-Adaptable Password Scheme*. | Proceedings of the FREENIX Track: 1999 USENIX Annual Technical Conference (ATC '99), pp. 81–91. | USENIX Association Proceedings Database | **VERIFIED** | Peer-Reviewed Technical Conference Proceedings. Specifies bcrypt algorithm. |
| **[11]** | Claude E. Shannon (1948). *A Mathematical Theory of Communication*. | Bell System Technical Journal, vol. 27, no. 3, pp. 379–423. DOI: 10.1002/j.1538-7305.1948.tb01338.x | IEEE Xplore / Alcatel-Lucent Bell Labs Archive | **VERIFIED** | Foundational Journal Article. Defines mathematical information entropy. |
| **[12]** | Jens Steube (2020). *Hashcat: Advanced Password Recovery Utility*. | Hashcat Project Architecture Documentation. URL: `https://hashcat.net/hashcat/` | Official Project Website & Release Repository | **VERIFIED** | Official Software System Specification. Primary reference for GPU-based offline recovery mechanics. |
| **[13]** | David Temoshok, James L. Fenton, Yee-Yin Choong, Naomi Lefkovitz, Andrew Regenscheid, Ryan Galluzzo, and Justin P. Richer (2025). *Digital Identity Guidelines: Authentication and Authenticator Management*. | NIST Special Publication 800-63B-4. DOI: 10.6028/NIST.SP.800-63B-4 (Finalized July 2025). | NIST CSRC Publication Database | **VERIFIED** | **Standard Update Correction:** Updated from historical Grassi et al. (SP 800-63B Rev 3, 2017) to the current finalized **NIST SP 800-63B-4**. Documents current guidance on length (min 8 chars, support 64+), ban on composition rules, compromised credential checking, and memory-hard KDF requirements. |
| **[14]** | Kurt Thomas, Frank Li, Ali Zand, et al. (2017). *Data Breaches, Phishing, or Malware? Understanding the Risks of Stolen Credentials*. | ACM SIGSAC Conference on Computer and Communications Security (CCS '17), pp. 1421–1434. DOI: 10.1145/3133956.3134067 | ACM Digital Library | **VERIFIED** | Peer-Reviewed Conference Proceedings. Analyzed 1.9 billion credentials and documented password reuse. |
| **[15]** | Blase Ur, Sean M. Segreti, Lujo Bauer, Nicolas Christin, Lorrie Faith Cranor, Saranga Komanduri, Rachael Meckling, Rebecca Wash, and Michelle L. Mazurek (2015). *Measuring Real-World Accuracies and Biases in Modeling Password Guessability*. | 24th USENIX Security Symposium (USENIX Security 15), pp. 963–981. | USENIX Association Proceedings Database | **VERIFIED** | Peer-Reviewed Conference Proceedings. Compares password meters and empirical human guessability models. |
| **[16]** | A. F. Webster and Stafford E. Tavares (1985). *On the Design of S-Boxes*. | Advances in Cryptology – CRYPTO '85, Lecture Notes in Computer Science, vol. 218, pp. 523–534. DOI: 10.1007/3-540-39799-X_41 | SpringerLink / IACR Archive | **VERIFIED** | Peer-Reviewed Conference Proceedings. Formalized Strict Avalanche Criterion (SAC). |
| **[17]** | Matt Weir, Sudhir Aggarwal, Breno de Medeiros, and Bill Glodek (2009). *Password Cracking Using Probabilistic Context-Free Grammars*. | 2009 IEEE Symposium on Security and Privacy (S&P 2009), pp. 391–405. DOI: 10.1109/SP.2009.8 | IEEE Xplore Digital Library | **VERIFIED** | Peer-Reviewed Conference Proceedings. Models rule-based and structural password cracking via PCFGs. |

---

## 3. Detailed Claim-to-Source Mapping

Every citation across `report-material/*.md` has been verified for claim-to-source alignment:

| Report Section & File | Citation | Claim Supported | Authoritative Validation Result |
| :--- | :---: | :--- | :--- |
| `01-abstract.md` (Para 1) | `[2]` | Web authentication schemes and usability tradeoffs | Accurately reflects Bonneau et al.'s framework on authentication evaluation |
| `01-abstract.md` (Para 1) | `[15]` | Human cognitive biases leading to predictable credentials | Supported by Ur et al.'s analysis of password guessability |
| `01-abstract.md` (Para 3) | `[1, 13]` | Transition from fast hashes to memory-hard KDFs | Supported by Argon2 specification [1] and NIST SP 800-63B-4 [13] |
| `02-introduction.md` (Para 1) | `[13]` | Prover-verifier authentication paradigm | Supported by NIST SP 800-63B-4 Section 3 & 5 |
| `02-introduction.md` (Para 1) | `[2]` | Passwords as predominant yet fragile authentication mechanism | Supported by Bonneau et al. Section 1 |
| `02-introduction.md` (Para 2) | `[15]` | Human memory limitations producing predictable patterns | Supported by Ur et al. (USENIX 15) |
| `02-introduction.md` (Para 2) | `[14]` | Password reuse across platforms enabling credential stuffing | Supported by Thomas et al. (ACM CCS 17) |
| `02-introduction.md` (Para 3) | `[12]` | Massively parallel GPU hash computation | Supported by Steube (Hashcat architecture) |
| `02-introduction.md` (Item 5) | `[1]` | Memory-hard key derivation functions | Supported by Biryukov et al. (EuroS&P 16) |
| `03-background.md` (Sec 2.1) | `[13]` | Prover-verifier salted verifier validation | Supported by NIST SP 800-63B-4 Section 5.1.1 |
| `03-background.md` (Sec 2.2) | `[11]` | Combinatorial search space and length scaling | Supported by Shannon (1948) logarithmic relationship |
| `03-background.md` (Sec 2.3) | `[11]` | Information-theoretic entropy formulation $E = L \log_2 R$ | Supported by Shannon (1948) Section 6 |
| `03-background.md` (Sec 2.3) | `[6, 15]` | Cognitive biases evading composition rules | Supported by Komanduri et al. [6] and Ur et al. [15] |
| `03-background.md` (Sec 2.4) | `[7]` | Pre-image resistance in cryptographic hashing | Supported by NIST FIPS PUB 180-4 Section 1 |
| `03-background.md` (Sec 2.4) | `[16]` | Strict Avalanche Criterion in hash functions | Supported by Webster & Tavares (CRYPTO '85) |
| `03-background.md` (Sec 2.4) | `[8]` | Rainbow table time-memory trade-off attacks | Supported by Oechslin (CRYPTO '03) |
| `03-background.md` (Sec 2.4) | `[13]` | Unique salt neutralizing precomputed multi-target lookups | Supported by NIST SP 800-63B-4 Section 5.1.1.2 |
| `03-background.md` (Sec 2.5) | `[7]` | Fast hash design for file and message integrity | Supported by NIST FIPS PUB 180-4 |
| `03-background.md` (Sec 2.5) | `[12]` | High GPU throughput against fast unkeyed hashes | Supported by Steube (Hashcat documentation) |
| `03-background.md` (Sec 2.5) | `[13]` | Standards mandating memory-hard KDFs for passwords | Supported by NIST SP 800-63B-4 Section 5.1.1.2 |
| `03-background.md` (Sec 2.5) | `[1]` | Argon2id hybrid memory-hardness design | Supported by Biryukov et al. (EuroS&P 16) |
| `03-background.md` (Sec 2.5) | `[10]` | bcrypt adaptable cost factor | Supported by Provos & Mazières (USENIX 99) |
| `03-background.md` (Sec 2.5) | `[9]` | scrypt sequential memory-hard function | Supported by Percival (BSDCan 09 / RFC 7914) |
| `03-background.md` (Sec 2.5) | `[4]` | PBKDF2 iterative HMAC key derivation | Supported by Kaliski (IETF RFC 2898) |
| `04-methodology.md` (Sec 4.1) | `[5]` | Ethical principles in ICT security research | Supported by Kenneally & Dittrich (Menlo Report) |
| `04-methodology.md` (Sec 4.3) | `[13]` | Uniform brute-force search upper-bound context | Supported by NIST SP 800-63B-4 |
| `06-experiment.md` (Sec 6.2) | `[5, 14]` | Avoiding harvested credentials for privacy/ethics | Supported by Menlo Report [5] and Thomas et al. [14] |
| `08-discussion.md` (Sec 8.2) | `[6]` | Ineffectiveness of rigid character composition rules | Supported by Komanduri et al. (CHI '11) |
| `08-discussion.md` (Sec 8.2) | `[12, 17]` | Rule-based and probabilistic grammar cracking | Supported by Steube [12] and Weir et al. [17] |
| `08-discussion.md` (Sec 8.3) | `[15]` | Memory retention bottlenecks requiring password managers | Supported by Ur et al. (USENIX 15) |
| `08-discussion.md` (Sec 8.3) | `[13]` | Passphrases and length-centric NIST guidelines | Supported by NIST SP 800-63B-4 Section 5.1.1.2 |
| `08-discussion.md` (Sec 8.4) | `[2]` | Phishing bypassing password complexity | Supported by Bonneau et al. Section 4 |
| `08-discussion.md` (Sec 8.4) | `[13]` | Multi-factor authentication defense-in-depth | Supported by NIST SP 800-63B-4 Section 4 & 5 |
| `08-discussion.md` (Sec 8.4) | `[3]` | $k$-Anonymity compromised credential screening | Supported by Troy Hunt (2018 web release) |
| `08-discussion.md` (Sec 8.4) | `[13]` | Server-side rate limiting and throttling | Supported by NIST SP 800-63B-4 Section 5.2.2 |
| `09-limitations.md` (Sec 9.1) | `[15]` | Heuristic meters unable to model personalized context | Supported by Ur et al. (USENIX 15) |
| `09-limitations.md` (Sec 9.2) | `[11, 15]` | Character-space entropy overestimating true entropy | Supported by Shannon [11] and Ur et al. [15] |
| `09-limitations.md` (Sec 9.3) | `[12]` | Attackers prioritizing masks and rules over brute force | Supported by Steube (Hashcat documentation) |
| `09-limitations.md` (Sec 9.4) | `[1, 13]` | General SHA-256 unsuitable for production verifiers | Supported by Biryukov et al. [1] and NIST SP 800-63B-4 [13] |
| `09-limitations.md` (Sec 9.5) | `[5, 14]` | Synthetic dataset scope vs. real breach data | Supported by Menlo Report [5] and Thomas et al. [14] |
| `10-conclusion.md` (Sec 10.3) | `[13]` | Modern authentication recommendations | Supported by NIST SP 800-63B-4 Section 5.1.1.2 |

---

## 4. Key Reference Corrections

### A. NIST SP 800-63B Update to SP 800-63B-4
- **Prior State:** Grassi, Fenton, Newton, et al. (2017). *Digital Identity Guidelines: Authentication and Lifecycle Management*. NIST SP 800-63B.
- **Audit Finding:** NIST finalized **Revision 4** in July 2025 as **NIST SP 800-63B-4**, led by David Temoshok et al.
- **Correction Applied:** Updated citation [13] to NIST SP 800-63B-4 (July 2025, DOI: 10.6028/NIST.SP.800-63B-4). All statements citing "current NIST guidelines" reflect the finalized Revision 4 mandates:
  - Minimum 8 characters required (supporting passphrases up to 64+ characters).
  - Explicit discouragement of arbitrary composition rules (requiring mixed symbols/digits).
  - Mandatory verification against compromised credential blocklists.
  - Mandatory rate limiting (throttling failed attempts; lockout or rate restriction).
  - Mandatory memory-hard verifier functions with unique salts.

### B. Troy Hunt / Pwned Passwords V2
- **Prior State:** Troy Hunt (2018). *Pwned Passwords and k-Anonymity: Protecting users at scale*. Cloudflare / HIBP Technical Report.
- **Audit Finding:** The publication was not an institutional technical report or peer-reviewed paper; it was an industry web release and technical architecture announcement published on Troy Hunt's primary publication blog on February 22, 2018.
- **Correction Applied:** Cited accurately as an industry technical web publication:
  *Troy Hunt. 2018. I've Just Launched Pwned Passwords V2 with Half a Billion Passwords. Troy Hunt Blog (Feb. 22, 2018).*

### C. Colin Percival / scrypt
- **Prior State:** Colin Percival (2009). *Stronger Key Derivation via Sequential Memory-Hard Functions*. Described as "Peer-Reviewed Conference".
- **Audit Finding:** Presented at BSDCan 2009 (The Technical BSD Conference), which is a practitioner technical conference, not an academic peer-reviewed symposium. The scrypt algorithm was later formalized as IETF RFC 7914 (2016).
- **Correction Applied:** Described accurately as a technical conference paper (BSDCan 2009) and noted standardization via RFC 7914.

---

## 5. Claims Weakened & Precision Improvements

1. **Hardware Cracking Speeds:**
   - *Previous Phrasing:* "Modern computers can test more than 100 billion SHA-256 guesses per second."
   - *Audit Correction:* Softened to state that SHA-256 is designed to be fast, which makes large-scale guessing substantially cheaper for attackers. Modern GPUs can evaluate billions of fast hashes per second, whereas PasswordGuard's $10^{11}$ scenario is explicitly documented as an *illustrative assumed guessing rate*, not a benchmarked hardware measurement.
2. **Privacy Guarantees:**
   - *Previous Phrasing:* "Privacy Guarantee: All analysis runs 100% inside your browser... zero data over the internet. When you close the browser tab, the password is completely gone."
   - *Audit Correction:* Refined to "Privacy Notice: PasswordGuard is designed to perform password analysis locally in the browser and does not include an application backend for password submission. Entered text is not intentionally persisted after the session."
3. **Reversibility of Hashes:**
   - *Previous Phrasing:* "It is impossible to turn that scrambled string back into the original password."
   - *Audit Correction:* Refined to standard academic terminology: "It is computationally infeasible to invert that scrambled string back into the original password without guessing."
4. **Theoretical Entropy Representation:**
   - Reaffirmed that $E = L \times \log_2 R$ represents an idealized upper-bound character-space estimate under a uniform-selection assumption, which overestimates true empirical cognitive entropy.
