# PasswordGuard: Oral Defense Q&A Preparation

**Course:** English Writing and Presentation Skills (AV3)  
**Project:** PasswordGuard: An Experimental Analysis of Password Strength and Authentication Security  
**Target Audience:** University Lecturer and Classmates during Oral Defense  
**Format:** Each question provides:
- **Simple Answer:** 1–3 clear, concise sentences in natural spoken English.
- **Technical Follow-up:** Rigorous, academically precise explanation with cybersecurity terminology.

---

### Question 1: Why did you choose this topic?
- **Simple Answer:**  
  "We chose this topic because passwords remain the primary access control for everyday online accounts, yet most users do not understand the math behind how passwords are attacked. We wanted to build an interactive, transparent tool that demonstrates search-space mathematics and cryptographic hashing."
- **Technical Follow-up:**  
  "Credential-based vulnerabilities remain the predominant initial access vector in corporate breaches. Despite decades of security guidelines, users still suffer from cognitive retention bottlenecks that lead to predictable credential reuse. PasswordGuard bridges the gap between theoretical combinatorial security ($R^L$) and practical user perception."

---

### Question 2: What is new or original about PasswordGuard compared to existing meters?
- **Simple Answer:**  
  "Unlike commercial meters that give a black-box percentage, PasswordGuard is fully transparent, explaining every point gained or penalty lost in real time. In addition, it integrates an interactive Web Crypto hashing lab directly into the browser to show how salts defeat rainbow tables."
- **Technical Follow-up:**  
  "Many client-side meters rely on opaque regular expressions or cloud APIs that send password hashes over the internet. PasswordGuard provides a client-side educational architecture with deterministic, open scoring weights, explicit theoretical character-space entropy bounds ($L \times \log_2 R$), illustrative cracking projections, and an educational cryptographic salting demonstration."

---

### Question 3: Is PasswordGuard a commercial security auditing tool?
- **Simple Answer:**  
  "No, PasswordGuard is strictly an educational web application and research prototype. Its score is a heuristic model designed to help students understand password structures, not a certified security compliance standard."
- **Technical Follow-up:**  
  "PasswordGuard makes no claim to be an enterprise penetration-testing platform or audited commercial product. Its 0–100 score is a deterministic rule-based heuristic designed for educational illustration. It does not replace industrial password auditing suites or formal policy validation frameworks."

---

### Question 4: How is the PasswordGuard heuristic score calculated?
- **Simple Answer:**  
  "The score starts from zero and awards points for length and character sets, plus bonuses for diversity and long passphrases. Then, it subtracts heavy penalties if it detects sequential numbers, repeated characters, or dictionary words, clamping the final result between 0 and 100."
- **Technical Follow-up:**  
  "The scoring heuristic implements an additive-subtractive model:
  - Base length score up to 40 points (+4 pts/char up to 6, +2.5 pts/char up to 10, +1 pt/char beyond 10).
  - Character set variety up to 35 points (lowercase +5, uppercase +10, digits +10, symbols +10).
  - Character diversity bonus up to 15 points (5 pts for 2 pools, 10 for 3, 15 for 4).
  - Passphrase bonus of +10 points for strings $\ge 16$ characters with whitespace or hyphen word delimiters.
  - Subtractive penalties: sequential runs (-15), repeated characters (-15), and known dictionary roots (-25). Raw scores are clamped to $[0, 100]$."

---

### Question 5: Why did you choose the thresholds 0–39 for Weak, 40–69 for Medium, and 70–100 for Strong?
- **Simple Answer:**  
  "We chose these three tiers to align with common three-tier user interface models and modern NIST guidelines. A score below 40 reflects short or pattern-heavy strings, while a score of 70 or higher requires either significant length or multi-pool entropy."
- **Technical Follow-up:**  
  "The 40 and 70 boundary thresholds divide the 0–100 score into three distinct structural security postures:
  - Scores below 40 (Weak) fail minimum length standards ($\le 8$ characters) or suffer severe pattern deductions.
  - Scores from 40 to 69 (Medium) meet basic length criteria (8–12 characters) with moderate pool diversity, representing acceptable non-critical accounts.
  - Scores 70 and above (Strong) require either length $\ge 16$ characters, multi-word passphrase structure, or complete character-set diversity, aligning with NIST SP 800-63B guidance."

---

### Question 6: Is the entropy displayed in your application real password entropy?
- **Simple Answer:**  
  "No, it is a theoretical character-space entropy estimate calculated under the assumption that all characters are chosen randomly and uniformly. Human passwords are usually much more predictable than this theoretical upper bound."
- **Technical Follow-up:**  
  "Our formula, $E = L \times \log_2(R)$ bits, calculates the maximum theoretical Hartley information capacity across the detected character alphabet $R$. Real human-generated passwords possess significantly lower empirical entropy because human word choices, grammatical rules, and keyboard layouts follow highly biased distributions."

---

### Question 7: Did you physically crack passwords using a GPU cracking rig?
- **Simple Answer:**  
  "No, we did not perform physical password cracking. The crack times shown in our app are illustrative mathematical projections based on assumed guessing rates."
- **Technical Follow-up:**  
  "PasswordGuard conducts no physical cryptanalysis or GPU benchmarking. Crack-time projections are calculated using the expected search-space traversal equation $T = (R^L / 2) / V_{\text{guess}}$ across three standardized educational attack rates: 100 guesses/sec (rate-limited online), $10^7$ guesses/sec (CPU offline), and $10^{11}$ guesses/sec (GPU offline). Actual real-world cracking performance depends heavily on the specific KDF work factor, salt configuration, and adversary hardware."

---

### Question 8: Why did you use synthetic passwords instead of real leaked password dumps?
- **Simple Answer:**  
  "We used synthetic passwords to protect privacy and follow academic research ethics. Generating controlled synthetic passwords allowed us to test specific structural rules safely and reproducibly."
- **Technical Follow-up:**  
  "In accordance with cybersecurity research ethics (such as the Menlo Report), handling live user credentials or breached personal databases creates significant ethical and legal liabilities. Synthetic password generation enabled controlled experimental isolation of structural variables—such as length, alphabet composition, and dictionary roots—ensuring complete reproducibility without privacy risks."

---

### Question 9: Why did you use SHA-256 in the application?
- **Simple Answer:**  
  "We used SHA-256 because it is natively supported by modern web browsers through the Web Crypto API, allowing fast, zero-dependency hashing demonstrations without installing external libraries."
- **Technical Follow-up:**  
  "The W3C Web Cryptography API (`window.crypto.subtle`) provides native, hardware-accelerated access to SHA-256 within the browser sandbox. Because modern browsers do not natively provide standardized Web Crypto interfaces for Argon2id or bcrypt, SHA-256 served as the ideal primitive to demonstrate deterministic digest generation, the avalanche effect, and salt mechanics."

---

### Question 10: Why is SHA-256 NOT recommended for production password storage?
- **Simple Answer:**  
  "SHA-256 was designed to be as fast as possible, which makes it cheap for attackers to guess billions of hashes per second using modern graphics cards. Production password storage requires slow, memory-intensive functions."
- **Technical Follow-up:**  
  "General-purpose hash functions like SHA-256 and MD5 require minimal memory and simple 32-bit arithmetic operations. When a database dump leaks, attackers can parallelize SHA-256 cracking across consumer GPU arrays and custom ASICs, evaluating tens of billions of guesses per second. Production credential storage demands slow, memory-hard Key Derivation Functions that impose substantial hardware costs per guess."

---

### Question 11: What is a cryptographic salt, and why is it necessary?
- **Simple Answer:**  
  "A salt is a unique random string added to each user's password before hashing. It ensures that two users with the same password have completely different hashes, which prevents attackers from using precomputed Rainbow Tables."
- **Technical Follow-up:**  
  "A cryptographic salt is a cryptographically secure pseudo-random byte sequence (typically 128 bits) generated per user and concatenated with the plaintext password prior to key derivation. Salting guarantees digest uniqueness across identical credentials, neutralizing precomputed lookup structures such as Rainbow Tables and forcing adversaries to conduct an independent exhaustive search for each individual account."

---

### Question 12: Why is Argon2id recommended for production systems?
- **Simple Answer:**  
  "Argon2id is the winner of the Password Hashing Competition because it requires large amounts of both memory and processor time. This makes it extremely expensive for attackers to build specialized cracking hardware."
- **Technical Follow-up:**  
  "Standardized under IETF RFC 9106, Argon2id combines Argon2d (data-dependent memory access resisting GPU acceleration) and Argon2i (data-independent memory access resisting side-channel timing attacks). Its configurable time cost, memory cost (often 64MB+ per hash), and degree of parallelism ensure that offline attacks cannot be parallelized efficiently on GPU or ASIC architectures."

---

### Question 13: What is the biggest limitation of your project?
- **Simple Answer:**  
  "Our biggest limitation is experimental circularity: our experiment evaluates how our heuristic responds to password structures, rather than proving independent real-world security against actual hacking tools."
- **Technical Follow-up:**  
  "The primary methodological constraint is the coupling between the heuristic model and the evaluation metric. Because the scoring rules and the batch evaluation harness share the same underlying scoring philosophy, the experiment demonstrates internal rule consistency across synthetic categories rather than independent empirical immunity against physical cracking suites or neural-network guessing algorithms."

---

### Question 14: Is your experiment circular?
- **Simple Answer:**  
  "Yes, to some extent it is circular. We openly acknowledge that the experiment measures the consistency of our heuristic rules rather than testing external cracking success."
- **Technical Follow-up:**  
  "We explicitly document this circularity in our paper's Discussion and Limitations sections. The experiment was intentionally designed as a functional behavioral verification of the heuristic engine across controlled structural groups, rather than an external cryptanalytic benchmark against real-world attack distributions."

---

### Question 15: How would you improve PasswordGuard if you had more time?
- **Simple Answer:**  
  "If we had more time, we would add a client-side Bloom filter to check the top 100,000 breached passwords, an Argon2 Web Worker simulator to demonstrate memory hardness, and an EFF-based passphrase generator."
- **Technical Follow-up:**  
  "Future work would incorporate:
  1. A client-side Bloom filter loaded with 100,000 common breached passwords to evaluate dictionary vulnerability in $O(1)$ memory.
  2. A WebAssembly-compiled Argon2id benchmarking worker to dynamically illustrate CPU and RAM exhaustion under varying work factors.
  3. Integration of the Electronic Frontier Foundation (EFF) long wordlist to generate cryptographically random multi-word passphrases."

---

### Question 16: How do you ensure users' passwords are safe when using PasswordGuard?
- **Simple Answer:**  
  "PasswordGuard executes entirely inside the user's browser memory. We have no backend server, no database, and no network tracking, so passwords are never sent over the internet."
- **Technical Follow-up:**  
  "PasswordGuard employs a strict client-side architecture. Password analysis, heuristic scoring, and cryptographic hashing routines execute entirely within the browser's local JavaScript execution context. The application contains no server-side backend, dispatches zero asynchronous network requests containing credential data, and does not persist entered credentials in local browser storage (`localStorage`, IndexedDB, or cookies)."

---

### Question 17: What did your experiment actually demonstrate?
- **Simple Answer:**  
  "Our experiment demonstrated that our heuristic consistently rewards long passwords and heavily penalizes common predictable patterns, exactly as we designed it to do."
- **Technical Follow-up:**  
  "The experiment proved that the heuristic engine functions deterministically and sensitively across structural boundaries: Category E (Long Random) achieved a top average of 90.0, Category D (Long Passphrase) achieved the highest theoretical entropy (182.9 bits), while Category B (Common Pattern) collapsed to an average of 10.5 due to pattern deductions despite containing uppercase letters and symbols."

---

### Question 18: What is the difference between hashing and encryption?
- **Simple Answer:**  
  "Hashing is one-way: you cannot reverse it back to plaintext. Encryption is two-way: you scramble data with a secret key, and someone with the key can decrypt it back."
- **Technical Follow-up:**  
  "Encryption is a reversible cryptographic transformation designed for data confidentiality, requiring a matching cryptographic key to decrypt ciphertext back into plaintext. Hashing is a non-reversible, one-way function designed for data integrity and credential verification. Storing passwords with reversible encryption introduces catastrophic key management risk because compromising the decryption key exposes all credentials simultaneously."

---

### Question 19: Why does a strong password NOT replace Multi-Factor Authentication (MFA)?
- **Simple Answer:**  
  "Even the strongest password in the world cannot stop phishing or database leaks. MFA ensures that even if an attacker steals your password, they still cannot access your account without your phone or security key."
- **Technical Follow-up:**  
  "Password complexity only mitigates offline brute-force guessing against stolen hashes. It provides zero protection against credential harvesting through phishing, malware keyloggers, or session hijacking. Multi-Factor Authentication enforces independent credential categories (knowledge, possession, inherence), ensuring that compromising the knowledge factor alone does not permit unauthorized session authorization."

---

### Question 20: Why did Category B score so low (10.5 / 100) despite containing uppercase, digits, and symbols?
- **Simple Answer:**  
  "Category B contained passwords like `password123` or `admin2024!`. Even though they looked complex to humans, they contained predictable dictionary roots and sequences, which triggered our heuristic's subtractive penalties."
- **Technical Follow-up:**  
  "Category B represents superficial complexity—capitalizing the initial character and appending sequential numbers or symbols to common dictionary roots. While naive regular-expression meters evaluate these positively, PasswordGuard applies targeted subtractive penalties (-25 for common dictionary roots, -15 for sequential runs), reflecting modern attack tool capabilities and correctly classifying 96.7% of Category B samples as Weak."
