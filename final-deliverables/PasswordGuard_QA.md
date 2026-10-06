# PasswordGuard: Oral Defense Q&A Preparation

**Course:** English Writing and Presentation Skills (AV3)  
**Project:** PasswordGuard: An Experimental Analysis of Password Strength and Authentication Security  
**Format:** Each question provides:
- **Simple Answer:** 1–3 short sentences in clear, natural spoken English.
- **Technical Follow-up:** A concise, academically defensible explanation without exaggerated claims.

---

### Question 1: Why did you choose this topic?
- **Simple Answer:**  
  "We chose this topic because passwords are used every day, but many people do not understand how computers actually test them. We wanted to build an interactive tool that makes password search spaces and hashing easy to learn."
- **Technical Follow-up:**  
  "Passwords remain a primary access control mechanism, yet user choices are constrained by human memory limits. This leads to common predictable patterns. We wanted to build an educational tool to demonstrate the difference between superficial complexity and exponential search-space growth ($R^L$)."

---

### Question 2: What is new or original about PasswordGuard compared to standard meters?
- **Simple Answer:**  
  "Unlike meters that only show a percentage bar, PasswordGuard explains every scoring point and penalty in real time. It also includes an educational hashing lab directly in the browser to show how salts work."
- **Technical Follow-up:**  
  "Many commercial meters use opaque rules or send data to cloud APIs. PasswordGuard provides a client-side architecture with deterministic scoring rules, theoretical character-space entropy bounds ($L \times \log_2 R$), illustrative guessing models, and an educational cryptographic salting demonstration."

---

### Question 3: Is PasswordGuard a real commercial security product?
- **Simple Answer:**  
  "No, PasswordGuard is an educational student project and prototype. Its score is a heuristic rule set created for teaching, not a commercial security standard."
- **Technical Follow-up:**  
  "PasswordGuard makes no claim to be a commercial auditing suite or certified compliance validator. Its 0–100 score is a deterministic heuristic designed to illustrate structural attributes and search-space concepts."

---

### Question 4: How is the PasswordGuard heuristic score calculated?
- **Simple Answer:**  
  "The score awards points for length, character types, diversity bonuses, and long passphrases. Then it subtracts penalties for repeated characters, sequential patterns, and dictionary words, giving a final score from 0 to 100."
- **Technical Follow-up:**  
  "The scoring heuristic implements an additive-subtractive model:
  - Length points up to 40, using tiered brackets (20 pts for 8–11 chars, 40 pts for $\ge 16$ chars).
  - Variety points up to 35 (lowercase +8, uppercase +8, digits +9, symbols +10).
  - Diversity bonus up to 15 (2 pools: +3, 3 pools: +8, 4 pools: +15).
  - Passphrase bonus up to 20 points for long strings with diverse characters or word delimiters.
  - Subtractive penalties: length under 12 (-8 or -20), repeated chars (-15), sequential runs (-15), common dictionary roots (-25), and single-pool strings (-15). The raw score is clamped to $[0, 100]$."

---

### Question 5: Why did you choose 0–39 for Weak, 40–69 for Medium, and 70–100 for Strong?
- **Simple Answer:**  
  "We chose these three tiers to give users clear feedback. Scores below 40 represent short or predictable passwords, while scores 70 and above require either strong length or diverse character sets."
- **Technical Follow-up:**  
  "The thresholds divide scores into three intuitive tiers:
  - Weak (0–39): strings that fail basic length recommendations ($< 8$ characters) or trigger heavy pattern deductions.
  - Medium (40–69): passwords of moderate length (8–11 characters) with partial diversity.
  - Strong (70–100): passwords with substantial length ($\ge 16$ characters), passphrase structure, or multi-pool diversity, aligning with modern guidance such as NIST SP 800-63B-4."

---

### Question 6: Is the entropy shown in your application real password entropy?
- **Simple Answer:**  
  "No, it is a theoretical character-space estimate based on a uniform-character assumption. Human-made passwords usually have lower actual randomness because people choose predictable words and patterns."
- **Technical Follow-up:**  
  "The formula $E = L \times \log_2(R)$ bits measures theoretical character space under an idealized uniform distribution. Real human passwords follow grammatical and keyboard habits, meaning actual guessability is higher than this theoretical upper bound."

---

### Question 7: Did you actually crack passwords on a GPU rig?
- **Simple Answer:**  
  "No, we did not perform physical password cracking. The guessing times in our app are illustrative mathematical projections based on assumed guessing rates."
- **Technical Follow-up:**  
  "We did not conduct physical hardware benchmarks or cracking experiments. Time projections are calculated as $T = (R^L / 2) / V_{\text{guess}}$ across three assumed educational rates: 100 guesses/sec (throttled online), $10^7$ guesses/sec (offline desktop), and $10^{11}$ guesses/sec (offline cluster). Real cracking speed depends on the password-hashing function, work factor, hardware, and attack dictionary."

---

### Question 8: Why did you use synthetic passwords instead of real leaked password dumps?
- **Simple Answer:**  
  "We used synthetic passwords for privacy and research ethics. Testing synthetic passwords allowed us to compare specific password structures safely and reproducibly."
- **Technical Follow-up:**  
  "Handling real user credentials or breached databases creates significant privacy and ethical liabilities. Using a controlled synthetic dataset ($N = 150$) allowed us to systematically isolate structural variables—such as length, character sets, and dictionary roots—without handling private user data."

---

### Question 9: Why did you use SHA-256 in the application?
- **Simple Answer:**  
  "We used SHA-256 because it is built directly into modern web browsers through the Web Crypto API. This allowed us to build a fast, client-side hashing demonstration without external libraries."
- **Technical Follow-up:**  
  "The W3C Web Cryptography API (`crypto.subtle.digest`) natively supports SHA-256 in all modern browsers. Because browsers do not include native APIs for Argon2id or bcrypt, SHA-256 was the most practical choice to demonstrate one-way hashing, the avalanche effect, and salting in a browser environment."

---

### Question 10: Why is SHA-256 NOT recommended for production password storage?
- **Simple Answer:**  
  "SHA-256 is designed to be fast. That is useful for data integrity, but it makes password guessing cheaper if hashes leak. Production password storage requires slow, memory-intensive functions."
- **Technical Follow-up:**  
  "General-purpose hashes like SHA-256 use minimal memory and simple arithmetic logic, making them vulnerable to parallel acceleration on GPUs and ASICs. Dedicated password-hashing functions such as Argon2id, bcrypt, scrypt, and PBKDF2 deliberately increase the memory and computational cost of each guess. Actual attack speed depends on the algorithm, parameters, and hardware."

---

### Question 11: What is a cryptographic salt, and why is it necessary?
- **Simple Answer:**  
  "A salt is a random value added before password hashing. Different salts make the same password produce different stored results and prevent direct reuse of precomputed lookup tables."
- **Technical Follow-up:**  
  "A sufficiently large random per-user salt (such as 16 bytes) makes identical passwords overwhelmingly likely to produce different stored verifiers. This prevents an attacker from using a single precomputed rainbow table across multiple accounts, forcing them to attack each account separately."

---

### Question 12: Why is Argon2id recommended for production systems?
- **Simple Answer:**  
  "Argon2id is recommended because it is memory-hard. It requires both processor time and computer memory, which makes large-scale offline guessing much more expensive for attackers."
- **Technical Follow-up:**  
  "Argon2id combines data-dependent and data-independent memory access, providing resistance against both GPU-based parallel guessing and side-channel timing attacks. Its configurable memory cost, time iterations, and parallelism allow administrators to tune the verification cost to server capacity."

---

### Question 13: What is the biggest limitation of your project?
- **Simple Answer:**  
  "The biggest limitation is that our experiment tests our own scoring rules. It shows that the heuristic reacts consistently to password structures, but it does not measure real-world cracking resistance."
- **Technical Follow-up:**  
  "The primary constraint is heuristic circularity: the batch harness evaluates the same heuristic model implemented in the application. As a result, the experiment verifies internal rule consistency across controlled synthetic categories, rather than measuring empirical resistance against real-world cryptanalysis."

---

### Question 14: Is your experiment circular?
- **Simple Answer:**  
  "Yes, the experiment has circularity because the evaluation uses the same heuristic rules that define the score. We explicitly acknowledge this in our paper."
- **Technical Follow-up:**  
  "We document this in our Discussion and Limitations sections. The experiment was designed to verify the functional behavior and sensitivity of the heuristic across structural groups, not to serve as an external security proof."

---

### Question 15: How would you improve PasswordGuard if you had more time?
- **Simple Answer:**  
  "If we continue the project, we would compare our heuristic with an independent password-strength model, add a safer common-password check, and improve the password-hashing demonstration."
- **Technical Follow-up:**  
  "Future work could explore:
  1. Comparing heuristic scores against an established model such as zxcvbn.
  2. Integrating a client-side common-password filter to check known weak passwords efficiently.
  3. Adding a demonstration of slow key derivation functions to illustrate memory-hardness parameters."

---

### Question 16: How do you protect user passwords in PasswordGuard?
- **Simple Answer:**  
  "PasswordGuard is designed to process entered passwords locally in the browser. The application does not include a backend endpoint for password submission."
- **Technical Follow-up:**  
  "All evaluation, scoring, and hashing logic executes within the browser's local JavaScript memory context. The application has no server backend, dispatches no password data over the network, and does not intentionally store entered passwords in browser storage (`localStorage` or cookies)."

---

### Question 17: What did your experiment actually demonstrate?
- **Simple Answer:**  
  "The experiment demonstrated that our heuristic reacts consistently to different password structures: it rewards long passwords and heavily penalizes common patterns."
- **Technical Follow-up:**  
  "The results confirmed the deterministic behavior of the scoring engine across 150 synthetic samples: Category E (Long Random) averaged 90.0, Category D (Long Passphrase) achieved the highest theoretical entropy (182.9 bits), and Category B (Common Pattern) dropped to an average of 10.5 due to pattern penalties despite containing symbols."

---

### Question 18: What is the difference between hashing and encryption?
- **Simple Answer:**  
  "Hashing is one-way: you cannot reverse the hash back to the original text. Encryption is two-way: you scramble data with a key, and anyone with the right key can decrypt it."
- **Technical Follow-up:**  
  "Encryption is a reversible transformation designed for confidentiality, requiring key management to restore plaintext. Hashing is a one-way transformation designed for verification and integrity. Passwords should be hashed rather than encrypted to avoid key compromise risks."

---

### Question 19: Why does password strength alone NOT replace Multi-Factor Authentication (MFA)?
- **Simple Answer:**  
  "Password strength alone does not protect against phishing or a server-side data breach. Multi-Factor Authentication adds an independent factor so a stolen password alone is not enough to log in."
- **Technical Follow-up:**  
  "Password complexity only mitigates offline brute-force guessing against stolen verifiers. It does not protect against credential interception, phishing, or malware. Multi-Factor Authentication enforces independent credential categories, ensuring that compromising the knowledge factor alone does not permit unauthorized account access."

---

### Question 20: Why did Category B score so low (10.5 / 100) despite containing numbers and symbols?
- **Simple Answer:**  
  "Category B used passwords like `password123` or `admin2024!`. Even though they had numbers and symbols, our heuristic detected predictable words and sequences, which triggered heavy pattern penalties."
- **Technical Follow-up:**  
  "Category B represents superficial complexity—dictionary words with appended years or symbols. While naive meters evaluate these positively, PasswordGuard applies targeted subtractive penalties (-25 for dictionary roots, -15 for sequences), correctly classifying 96.7% of Category B samples as Weak."
