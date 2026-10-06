# PasswordGuard: Comprehensive Q&A Preparation

**Course:** English Presentation Skills for Information Technology Students  
**Context:** Preparation for university lecturer questions and classmate inquiries during oral defense.  
**Structure:** Each question contains:
1. **Simple English Answer:** Short, direct, easy to speak aloud.
2. **Technical Answer:** Deeper, academic explanation with technical vocabulary.

---

### Question 1: Why did you choose this topic?
- **Simple English Answer:**  
  "We chose this topic because almost every person uses passwords every single day, but most people do not understand how computers actually crack them. We wanted to build a visual, hands-on tool that makes password math and hashing easy to understand."
- **Technical Answer:**  
  "Password authentication is the primary attack surface in modern access control. Despite decades of security guidelines, credential-based breaches remain the leading entry vector for corporate network intrusions. We wanted to build an educational tool that demonstrates the disparity between human perceptions of complexity and combinatorial search-space mathematics."

---

### Question 2: How does your password scoring algorithm work?
- **Simple English Answer:**  
  "Our algorithm gives a score from 0 to 100. It starts with points for length and character types. Then, it subtracts points if it finds common patterns like '1234', 'qwerty', or dictionary words. The final score places the password into Weak, Medium, or Strong."
- **Technical Answer:**  
  "The algorithm implements a transparent heuristic. It awards base points up to 40 for length, up to 35 for character diversity, and up to 15 for pool variety. It then applies subtractive penalty weights for structural vulnerabilities, such as consecutive repetitions (-15), keyboard sequences (-15), and known dictionary patterns (-25). The resulting raw score is clamped to the range [0, 100]."

---

### Question 3: What is password hashing?
- **Simple English Answer:**  
  "Password hashing is a one-way mathematical function. You put a password in, and you get a scrambled fixed-length string out. It is computationally infeasible to invert that scrambled string back into the original password without guessing."
- **Technical Answer:**  
  "Cryptographic hashing is a deterministic, one-way algorithm that maps an arbitrary-length message to a fixed-size bit string (a digest). It provides strong pre-image resistance and collision resistance, meaning it is computationally infeasible to invert the function or find two distinct inputs yielding the same digest."

---

### Question 4: What is a salt?
- **Simple English Answer:**  
  "A salt is a random string of data added to the password before hashing. Because every user has a different salt, two users with the same password will have completely different hashes. This stops attackers from using precomputed tables to crack thousands of passwords at once."
- **Technical Answer:**  
  "A cryptographic salt is a cryptographically random byte sequence (typically 128 bits) appended to the plaintext password prior to key derivation. Salting ensures digest uniqueness across identical credentials, neutralizing precomputed lookup attacks such as Rainbow Tables and forcing attackers to crack each stolen hash individually."

---

### Question 5: Why should passwords not be stored in plain text?
- **Simple English Answer:**  
  "If a company stores passwords in plain text and hackers break into the database, the hackers immediately have everyone's actual password. They can immediately log into users' email, social media, and bank accounts."
- **Technical Answer:**  
  "Plaintext credential storage violates the fundamental security principle of defense in depth. If a database is dumped via SQL injection or unauthorized access, plaintext credentials result in immediate total compromise across the target platform and enable secondary credential-stuffing attacks across the entire internet."

---

### Question 6: What is the difference between hashing and encryption?
- **Simple English Answer:**  
  "Hashing is one-way: you cannot decrypt it. Encryption is two-way: you scramble data with a secret key, and anyone with the key can unscramble it back to the original text. We hash passwords, but we encrypt sensitive files and messages."
- **Technical Answer:**  
  "Encryption is a reversible cryptographic operation designed for confidentiality, requiring a key to decrypt the ciphertext back into plaintext. Hashing is an irreversible, one-way transformation designed for data integrity and identity verification. Storing passwords with reversible encryption introduces unnecessary risk because the decryption key itself can be stolen."

---

### Question 7: Why is SHA-256 not ideal for production password storage?
- **Simple English Answer:**  
  "SHA-256 is designed to be fast, which makes large-scale password guessing substantially cheaper for attackers. Modern graphics cards can test billions of SHA-256 guesses per second. For password storage, we need slow, memory-hard functions like Argon2id or bcrypt."
- **Technical Answer:**  
  "SHA-256 is a general-purpose cryptographic hash optimized for maximum throughput and low latency. Because it requires negligible CPU memory and simple arithmetic logic, it can be parallelized massively on consumer GPUs and custom ASICs. Storing passwords requires deliberate computational latency and high memory bandwidth, provided only by memory-hard Key Derivation Functions like Argon2id, bcrypt, or scrypt."

---

### Question 8: What is Multi-Factor Authentication (MFA)?
- **Simple English Answer:**  
  "MFA means you need more than just a password to log in. Usually, you need your password plus a code sent to your phone or a hardware key. Even if an attacker steals your password, they still cannot access your account."
- **Technical Answer:**  
  "Multi-Factor Authentication requires two or more independent credential categories to authorize access: knowledge (passwords/PINs), possession (TOTP authenticator tokens or FIDO2/WebAuthn hardware keys), and inherence (biometrics). MFA mitigates the risk of credential theft because an adversary possessing only the knowledge factor remains unauthorized."

---

### Question 9: Is PasswordGuard a real security product?
- **Simple English Answer:**  
  "No. It is an educational tool. Its score is a heuristic designed to demonstrate how password structure affects our scoring model."
- **Technical Answer:**  
  "PasswordGuard is strictly an educational tool and prototype. The 0–100 score is a rule-based heuristic designed to illustrate structural password attributes and combinatorial principles. It is not an audited commercial product, a mathematical proof, or a certified compliance validation engine."

---

### Question 10: How did you ensure user passwords are safe in your application?
- **Simple English Answer:**  
  "PasswordGuard is designed to analyze passwords locally in the browser. It has no backend server and does not transmit entered text over the network. The application does not intentionally persist entered passwords after the session."
- **Technical Answer:**  
  "We implemented client-side local evaluation using TypeScript and React state. No network requests are dispatched, no telemetry is loaded, and no persistent browser storage APIs (such as localStorage, IndexedDB, or cookies) are utilized for password retention."

---

### Question 11: What is a passphrase, and why is it better than a complex short password?
- **Simple English Answer:**  
  "A passphrase is made of several random words, like 'correct-horse-battery-staple'. It is better because it is very long, which gives it a massive combinatorial search space that is computationally infeasible for attackers to guess exhaustively, yet easy for a human to remember as a mental picture."
- **Technical Answer:**  
  "A passphrase combines four or more independent dictionary words. Because search space scales exponentially with length ($R^L$), a 28-character passphrase provides vastly superior combinatorial resistance compared to an 8-character string with symbols. Furthermore, passphrases reduce cognitive fatigue, eliminating the user tendency to write credentials on insecure post-it notes."

---

### Question 12: What is the Avalanche Effect in hashing?
- **Simple English Answer:**  
  "The Avalanche Effect means that if you change just one single letter or symbol in your password, the resulting hash output changes completely. It prevents attackers from guessing whether they are getting closer to the right password."
- **Technical Answer:**  
  "The avalanche effect is an essential property of cryptographic hash functions where a minimal change in the input (such as flipping a single bit) causes a significant, pseudorandom change in the output digest (typically affecting over 50% of the output bits). This eliminates correlation attacks and ensures inputs cannot be deduced incrementally."

---

### Question 13: What is Credential Stuffing?
- **Simple English Answer:**  
  "Credential stuffing is when hackers take millions of usernames and passwords stolen from one website and use automated bots to test them on hundreds of other popular websites."
- **Technical Answer:**  
  "Credential stuffing is an automated cyberattack where adversaries use botnets to replay vast databases of compromised username/password pairs against unrelated web services. It exploits widespread human password reuse across personal and corporate platforms."

---

### Question 14: How does an attacker crack password hashes offline?
- **Simple English Answer:**  
  "If hackers steal a database of hashes, they use fast programs like Hashcat on high-end computers. The computer guesses billions of passwords, hashes each guess, and checks if it matches any stolen hash in the database."
- **Technical Answer:**  
  "Offline hash recovery occurs when an attacker obtains an exported database table containing user hashes. Because the attack runs locally without network rate limits or lockout controls, attackers employ tools like Hashcat or John the Ripper to run dictionary words, rule mutations, and brute-force masks across GPU clusters at speeds exceeding billions of hashes per second."

---

### Question 15: What is a Rainbow Table?
- **Simple English Answer:**  
  "A Rainbow Table is a huge precomputed lookup table of passwords and their corresponding hashes. Hackers can look up a hash in the table and find the plain password instantly without doing any math."
- **Technical Answer:**  
  "A Rainbow Table is a precomputed data structure that exchanges memory storage for time complexity to reverse unsalted cryptographic hash functions. By storing reduction function chains of plaintext-hash pairs, an attacker can search for a stolen hash and recover the original plaintext in constant time. Generating a unique salt for each user completely neutralizes rainbow tables."

---

### Question 16: What is Shannon Entropy, and how does your app calculate it?
- **Simple English Answer:**  
  "Entropy measures the amount of randomness in a password, measured in bits. Our app calculates it using the formula: Length times the base-2 logarithm of the character pool size."
- **Technical Answer:**  
  "Shannon entropy quantifies the theoretical information density or uncertainty of a discrete random variable. In PasswordGuard, entropy is estimated as $E = L \times \log_2(R)$, where $L$ is string length and $R$ is the aggregate size of the detected character sets. This represents an upper-bound estimate assuming independent uniform character selection."

---

### Question 17: Why did Category B score so low in your experiment even though it had numbers and symbols?
- **Simple English Answer:**  
  "Category B had passwords like 'Password123!'. Even though it looked complex, it used common dictionary words and predictable patterns. Our algorithm penalized those predictable patterns because real hacking tools guess them in seconds."
- **Technical Answer:**  
  "Category B exhibited superficial complexity: capitalization at index 0, followed by dictionary words and appended sequential numbers or punctuation. While naive regular-expression meters evaluate this favorably, PasswordGuard applies targeted pattern penalties (-25 for common dictionary roots, -15 for sequential numbers), correctly classifying 96.7% of these passwords as Weak."

---

### Question 18: What is a Password Manager, and why is it recommended?
- **Simple English Answer:**  
  "A password manager is an encrypted app that creates and stores complex, unique passwords for every website. You only need to remember one strong master password, and the manager handles the rest."
- **Technical Answer:**  
  "A password manager is a zero-knowledge encrypted vault application that generates, stores, and autofills high-entropy pseudorandom passwords (e.g. 20+ characters with $R=95$). It solves the human cognitive retention bottleneck, ensuring users maintain completely unique credentials across every individual online service."

---

### Question 19: What is the Web Crypto API, and why did you use it?
- **Simple English Answer:**  
  "The Web Crypto API is a built-in feature of modern web browsers that lets JavaScript perform real cryptographic operations securely and quickly without downloading external libraries."
- **Technical Answer:**  
  "The W3C Web Cryptography API (`window.crypto.subtle`) provides an asynchronous low-level interface to native, browser-hardened cryptographic primitives. We used `crypto.subtle.digest('SHA-256')` and `crypto.getRandomValues()` because it executes directly in the browser's optimized native runtime with zero external third-party dependencies."

---

### Question 20: If you had more time, how would you improve this project?
- **Simple English Answer:**  
  "If we had more time, we would add a fast dictionary check with the top 100,000 common passwords, an interactive Argon2 simulator to show memory hardness, and a passphrase generator based on the EFF wordlist."
- **Technical Answer:**  
  "Future enhancements would include: integrating a client-side Bloom filter loaded with the 100,000 most common breached passwords; implementing a Web Worker-based Argon2id benchmarking simulator to demonstrate the CPU and memory trade-offs of modern KDFs; and integrating a cryptographically secure passphrase generator utilizing the EFF large wordlist."

---

### Question 21 (Bonus): How do modern websites check if a password was breached without sending the password?
- **Simple English Answer:**  
  "They use a clever technique called $k$-Anonymity. The website hashes the password, sends only the first 5 characters of the hash to the breach database, and gets back a list of matching hashes to compare privately on the user's computer."
- **Technical Answer:**  
  "Services like 'Have I Been Pwned' utilize $k$-anonymity via hash prefixes. The client hashes the password and transmits only the first 5 hexadecimal characters of the digest. The API responds with the set of all known breached hash suffixes matching that 5-character prefix. The client then searches the returned list locally, ensuring the full hash never leaves the client."

---

### Question 22: Why does your experiment prove anything if your own algorithm scores the passwords?
- **Simple English Answer:**  
  "Our experiment does not claim to prove real-world cracking resistance. It is a controlled evaluation to check if our heuristic responds consistently across different password types as designed."
- **Technical Answer:**  
  "The experiment assesses the internal functional consistency and sensitivity of the heuristic across controlled structural categories. Because the scoring rules and evaluation engine share the same heuristic, we do not present the results as an independent real-world cracking benchmark, but rather as a verified measurement of how the heuristic model penalizes predictable patterns and rewards length."

---

### Question 23: Does entropy mean the password is actually random?
- **Simple English Answer:**  
  "No. It is a theoretical character-space estimate under a uniform-selection assumption. Human-created passwords are usually more predictable."
- **Technical Answer:**  
  "The metric calculated in PasswordGuard ($E = L \times \log_2 R$) is an upper-bound theoretical character-space estimate under an ideal uniform-character distribution. It does not measure true empirical cognitive entropy. Human-generated passwords suffer from heavy natural language collocations and keyboard habits, making actual guessability substantially higher than the theoretical upper bound."

---

### Question 24: Did you actually crack these passwords with a GPU rig?
- **Simple English Answer:**  
  "No. We did not perform password cracking. The application uses theoretical search-space calculations and illustrative guessing-rate assumptions."
- **Technical Answer:**  
  "No physical cracking attacks or hardware benchmarks were conducted. The crack time displays are educational mathematical projections calculated as $(R^L / 2) / V_{\text{guess}}$ across three standardized illustrative guessing rates (100, $10^7$, and $10^{11}$ guesses/sec). Real cracking speeds depend heavily on the target KDF work factor, salt configuration, dictionary rules, and adversary hardware."

---

### Question 25: Why did you use synthetic passwords instead of real leaked password dumps?
- **Simple English Answer:**  
  "We wanted a controlled experiment without collecting real credentials. However, synthetic data also limits how well the results represent real users."
- **Technical Answer:**  
  "In accordance with ICT research ethics guidelines like the Menlo Report, handling live user credentials or breached personal databases introduces severe privacy liabilities and ethical risks. Synthetic sampling allowed us to systematically isolate structural variables—such as length, composition, and dictionary substrings—in a safe, fully reproducible, and ethically sound manner."

