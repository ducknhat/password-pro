# PasswordGuard: Oral Presentation Speaking Script

**Course:** English Writing and Presentation Skills (AV3)  
**Project Title:** PasswordGuard: An Experimental Analysis of Password Strength and Authentication Security  
**Authors:** Nguyen Duc Nhat (22001594), Hoang Minh Duc (22002598), Pham Tuan Phong (22002621)  
**Total Presentation Time:** 8–10 minutes (approximately 50–60 seconds per slide)  

---

## Presentation Overview & Timing Breakdown

| Slide | Topic | Target Time | Cumulative Time |
| :---: | :--- | :---: | :---: |
| **Slide 1** | Title & Opening Audience Interaction | 60 sec | 1:00 |
| **Slide 2** | The Problem: Memory vs. Search Spaces | 55 sec | 1:55 |
| **Slide 3** | Authentication Mathematics & $R^L$ Formula | 60 sec | 2:55 |
| **Slide 4** | Attack Vectors & Defense in Depth | 55 sec | 3:50 |
| **Slide 5** | PasswordGuard Architecture & Privacy Design | 50 sec | 4:40 |
| **Slide 6** | Scoring Heuristic & Theoretical Entropy | 60 sec | 5:40 |
| **Slide 7** | Hashing, Cryptographic Salts & Argon2id | 60 sec | 6:40 |
| **Slide 8** | Experimental Design: Synthetic Dataset | 55 sec | 7:35 |
| **Slide 9** | Experimental Results & Observations | 60 sec | 8:35 |
| **Slide 10** | Limitations, Key Takeaways & Q&A Invite | 55 sec | 9:30 |

*Pacing Tip:* Speak at a steady, calm tempo (around 120–130 words per minute). Pause briefly for 1–2 seconds at slide transitions.

---

## Pronunciation Guide for Technical Terms

- **Heuristic:** /hjuːˈrɪstɪk/ (*hyoo-RIS-tik*) — A practical rule-of-thumb method.
- **Entropy:** /ˈentrəpi/ (*EN-truh-pee*) — A mathematical measure of uncertainty or randomness.
- **Combinatorial:** /kəmˌbaɪnəˈtɔːriəl/ (*kuhm-by-nuh-TOR-ee-uhl*) — Relating to combinations.
- **Exponent:** /ɪkˈspoʊnənt/ (*ik-SPOH-nuhnt*) — The mathematical power in $R^L$.
- **Verifier:** /ˈverɪfaɪər/ (*VEH-rih-fy-er*) — Stored cryptographic credential on a server.
- **Argon2id:** /ˈɑːrɡɒn tuː aɪ diː/ (*AR-gon two eye dee*) — Memory-hard key derivation function.
- **Rainbow Table:** /ˈreɪnboʊ ˈteɪbəl/ (*RAYN-boh TAY-buhl*) — Precomputed hash lookup table.

---

## Slide 1: Title & Opening Audience Interaction

**Target Duration:** 55–65 seconds  
**Slide Title:** PasswordGuard: An Experimental Analysis of Password Strength and Authentication Security  

### What to Say:

> "Good morning, respected teacher and fellow classmates.
>
> Today, my teammates and I are honored to present our project: **PasswordGuard: An Experimental Analysis of Password Strength and Authentication Security**.
>
> Before we look at any slides, I would like to ask our audience a quick question:
>
> **Which of these two passwords do you believe is stronger against a computer attack?**
>
> **Option A:** `P@ssw0rd123` — with an uppercase letter, a number, and a symbol.  
> Or **Option B:** `correct-horse-battery-staple` — four simple, common lowercase words?
>
> Most people immediately guess Option A because they were taught that special characters make a password secure. However, from a mathematical perspective, Option B is vastly harder for an adversary to guess exhaustively.
>
> *[Optional if running low on time]* This surprising difference is the central reason we built PasswordGuard.
>
> Let us begin by looking at why password security is still such a difficult challenge for ordinary users."

**Transition:**  
*"Let us turn to Slide 2 to examine the conflict between human memory and computer search power."*

---

## Slide 2: The Problem: Human Memory vs. Combinatorial Search Spaces

**Target Duration:** 50–55 seconds  
**Slide Title:** The Problem: Human Memory vs. Combinatorial Search Spaces  

### What to Say:

> "Why are passwords still broken so often?
>
> In daily life, an average person manages between 50 and 100 online accounts. Because random, complex strings are almost impossible for human memory to retain, users take predictable shortcuts. They pick simple words, reuse the exact same password across multiple services, or make predictable substitutions, such as changing the letter 'a' to an at-sign (`@`).
>
> At the same time, attackers do not guess passwords one letter at a time. They use automated tools with leaked wordlists containing tens of millions of breached passwords, like the RockYou dataset.
>
> Even worse, traditional password policies created a false sense of security. Demanding one uppercase letter and one number simply taught users to write `Summer2024!`, which modern attack programs crack almost instantly.
>
> *[Optional if running low on time]* PasswordGuard was created as an educational platform to make this mathematical reality clear and interactive."

**Transition:**  
*"Next, on Slide 3, let us look at the mathematical formula that governs password guessing."*

---

## Slide 3: Mathematical Foundations: Search Spaces & the Prover-Verifier Model

**Target Duration:** 55–60 seconds  
**Slide Title:** Mathematical Foundations: Search Spaces & the Prover-Verifier Model  

### What to Say:

> "To understand password defense, we must understand the math behind exhaustive brute-force search.
>
> In computer authentication, we follow the **prover-verifier model**. The user proves they know the secret, while the server verifies it against a stored cryptographic verifier without keeping plaintext.
>
> If an attacker tries to guess every combination, the total search space is calculated by the formula:
>
> **Total Combinations equals $R$ to the power of $L$** ($S = R^L$).
>
> Here, $R$ represents the character pool size, and $L$ represents the password length.
>
> Notice that length $L$ is in the exponent! Because length is an exponent, adding characters expands the search space **exponentially**, while adding character sets only increases the base.
>
> Look at the examples on the right: an 8-character password with letters, digits, and symbols has roughly $6.6 \times 10^{15}$ combinations. At an assumed rate of 100 billion guesses per second, that could be searched in roughly 9 hours.
>
> But a 28-character passphrase using only lowercase letters and hyphens yields $1.2 \times 10^{40}$ combinations. Searching that would take more than $10^{21}$ years!
>
> Length is the most decisive mathematical factor."

**Transition:**  
*"However, real attackers do not only use brute force. Let us examine common attack threats on Slide 4."*

---

## Slide 4: Common Password Threats & Defense in Depth

**Target Duration:** 50–55 seconds  
**Slide Title:** Common Password Threats & Defense in Depth  

### What to Say:

> "Real-world attackers exploit human predictability.
>
> As shown on the left side of this slide, attackers use:
> 1. **Wordlists and mutation rules** to test common phrases.
> 2. **Credential stuffing**, replaying username-password pairs stolen from one breach across hundreds of other websites.
> 3. **Offline hash cracking**, testing leaked database hashes at high speeds without triggering website lockouts.
> 4. And **phishing**, which bypasses password complexity entirely.
>
> Because of these threats, **password security is not the same as authentication security**. A complex password alone cannot protect a user against phishing or database leaks.
>
> True security requires **Defense in Depth**, shown on the right:
> - Users must use **password managers** to keep credentials unique.
> - Organizations must enforce **Multi-Factor Authentication (MFA)**, so a stolen password alone is useless.
> - And servers must implement **slow, memory-hard hashing** and rate limiting."

**Transition:**  
*"Now, let us introduce the tool we designed to demonstrate these concepts: PasswordGuard on Slide 5."*

---

## Slide 5: PasswordGuard Application Architecture & Privacy Design

**Target Duration:** 45–50 seconds  
**Slide Title:** PasswordGuard: Application Architecture & Privacy Design  

### What to Say:

> "To make these concepts tangible, we developed **PasswordGuard**.
>
> PasswordGuard is a single-page web application built with **React 19, TypeScript, and Vite**.
>
> From the very beginning, we prioritized a **client-side privacy model**:
> - All password analysis, heuristic scoring, and cryptographic calculations happen exclusively inside the user's local browser memory.
> - We have **no application backend, no database, and zero tracking telemetry**.
> - Passwords entered in the demo are never transmitted across the network.
>
> For cryptographic operations, we interact directly with the browser's native **Web Crypto API**.
>
> As shown in the diagram on the right, user input flows from reactive browser state directly to our analysis engine and visualization components without external network dependencies."

**Transition:**  
*"Let us look closer at how PasswordGuard evaluates passwords on Slide 6."*

---

## Slide 6: How PasswordGuard Evaluates Passwords: Heuristic & Entropy

**Target Duration:** 55–60 seconds  
**Slide Title:** How PasswordGuard Evaluates Passwords: Heuristic & Entropy  

### What to Say:

> "PasswordGuard implements two distinct evaluation metrics:
>
> First, a **transparent heuristic score from 0 to 100**.  
> It awards up to 40 base points for length, up to 35 points for character variety, and provides diversity bonuses up to 15 points. It also awards a special 10-point bonus for long passphrases.
>
> Crucially, our heuristic applies **subtractive penalties**:
> - Minus 15 points for sequential characters like `1234` or `qwerty`.
> - Minus 15 points for repeated characters.
> - And minus 25 points for known dictionary roots like `password` or `admin`.
>
> Passwords are then classified into **Weak (0–39)**, **Medium (40–69)**, or **Strong (70–100)**.
>
> Second, we calculate a **theoretical character-space entropy estimate** in bits:
> $E = L \times \log_2(R)$.  
> This value assumes uniform random character selection.
>
> To make this intuitive, we project illustrative search times across three assumed guessing scenarios: 100 guesses per second for rate-limited logins, 10 million for CPU attacks, and 100 billion for GPU clusters.
>
> *[Optional if running low on time]* We emphasize that these rates are educational mathematical projections, not physical hardware benchmarks."

**Transition:**  
*"Next, on Slide 7, let us look at how servers store passwords using hashing and salts."*

---

## Slide 7: Password Hashing, Cryptographic Salts & Production Security

**Target Duration:** 55–60 seconds  
**Slide Title:** Password Hashing, Cryptographic Salts, and Production Security  

### What to Say:

> "In secure systems, servers never store passwords in plain text. Instead, they compute a **cryptographic hash**.
>
> A hash function is deterministic and one-way: easy to calculate forward, but practically impossible to reverse. It also exhibits the **Avalanche Effect**: changing just one character flips over 50% of the output bits.
>
> However, raw hashes can be attacked using precomputed lookup tables called **Rainbow Tables**.
>
> To solve this, servers use a **cryptographic salt**—a 16-byte random value generated per user. Because every salt is unique, identical passwords produce completely different stored hashes, completely invalidating rainbow tables.
>
> **Important Academic Notice:** PasswordGuard demonstrates hashing using SHA-256 for browser performance and educational clarity.
>
> However, because SHA-256 is designed to be fast, **production systems must never use raw SHA-256 for password storage**. Production backends must use slow, memory-hard Key Derivation Functions like **Argon2id, bcrypt, or scrypt** to resist GPU acceleration."

**Transition:**  
*"To verify our heuristic scoring model, we conducted a controlled experiment, shown on Slide 8."*

---

## Slide 8: Experimental Design: Controlled Evaluation of Heuristic Behavior

**Target Duration:** 50–55 seconds  
**Slide Title:** Experimental Design: Controlled Evaluation of Heuristic Behavior  

### What to Say:

> "To evaluate how consistently our heuristic behaves across different password structures, we designed a reproducible experiment.
>
> Following computer science research ethics, we did **not** use real user credentials or breached password dumps.
>
> Instead, we constructed a **controlled synthetic dataset of 150 passwords**, divided into five structural categories of 30 samples each:
> - **Category A — Short Simple:** 3 to 5 characters, like `cat` or `red2`.
> - **Category B — Common Pattern:** 8 to 12 characters with dictionary roots and digits, like `password123` or `admin2024!`.
> - **Category C — Medium Complexity:** 11 to 15 characters following enterprise complexity rules, like `BlueSky#49`.
> - **Category D — Long Passphrases:** 25 to 36 characters with hyphens, like `correct-horse-battery-staple`.
> - **Category E — Long Random:** 16 pseudo-random characters across all 95 printable ASCII symbols.
>
> We evaluated all 150 samples through an automated test harness to observe scoring consistency."

**Transition:**  
*"Let us look at the quantitative results on Slide 9."*

---

## Slide 9: Experimental Results: Quantitative Observations Across Categories

**Target Duration:** 55–60 seconds  
**Slide Title:** Experimental Results: Quantitative Observations Across Categories  

### What to Say:

> "Here are the empirical results from our controlled experiment.
>
> Across the 150 synthetic samples, our heuristic classified **59 as Weak, 12 as Medium, and 79 as Strong**.
>
> Looking at the bar chart on the left:
> - **Category E (Long Random)** achieved the highest average score of **90.0 out of 100**, with 100% rated Strong.
> - **Category D (Long Passphrase)** achieved the highest theoretical entropy estimate of **182.9 bits**, with 70% Strong and 30% Medium.
> - **Category C (Medium Complexity)** achieved an average score of **80.8**, with 93.3% Strong.
>
> Now, look closely at **Category B**: even though Category B passwords contained uppercase letters, numbers, and exclamation marks, their average score collapsed to **10.5 out of 100**, and **96.7% were classified as Weak**.
>
> This demonstrates that our heuristic successfully penalizes predictable patterns rather than being misled by superficial symbols.
>
> Category A averaged only **2.0 out of 100**, accurately reflecting tiny search spaces."

**Transition:**  
*"Finally, let us discuss our project's limitations and core takeaways on Slide 10."*

---

## Slide 10: Academic Limitations, Core Takeaways & Conclusion

**Target Duration:** 50–55 seconds  
**Slide Title:** Academic Limitations, Core Takeaways, and Conclusion  

### What to Say:

> "To maintain academic honesty, we must explicitly acknowledge our project's limitations:
> - **First, the Circularity Constraint:** Our experiment evaluates the internal consistency of the heuristic, not real-world cracking resistance.
> - **Second, Synthetic Dataset:** Our 150 synthetic samples isolate structural rules, but do not capture the full diversity of real user behavior.
> - **Third, Theoretical Entropy:** Our entropy metric assumes an ideal uniform distribution, whereas human-created passwords have natural language patterns.
>
> Despite these limitations, our core security takeaways remain powerful:
> 1. **Length dominates the exponent:** Expanding password length provides exponential search-space growth ($R^L$), making memorable passphrases a superior choice.
> 2. **Superficial complexity fails:** Appending digits or symbols to common words does not protect against modern attack tools.
> 3. **Defense in Depth is essential:** True security requires combining password managers, slow memory-hard hashing like Argon2id, and universal Multi-Factor Authentication.
>
> Thank you very much for your time and kind attention.
> We are now ready and excited to answer your questions!"

---

## Live Demo Plan (Optional 60–90 Second Fallback)

If the lecturer requests a live demonstration:

1. **Step 1 (Weak Pattern):** Type `password123`.  
   *Point out:* Score collapses to Weak (~10/100) due to dictionary and sequence penalties.
2. **Step 2 (Superficial Complexity):** Type `Password123!`.  
   *Point out:* Shows why adding an uppercase and symbol still triggers pattern warnings.
3. **Step 3 (Passphrase Strength):** Type `correct-horse-battery-staple`.  
   *Point out:* Length reaches 28 characters, passphrase bonus activates, theoretical entropy jumps above 130 bits, score reaches Strong.
4. **Step 4 (Hashing & Salting Lab):** Click into Hashing Demo.  
   *Point out:* Type a word, show instant SHA-256 digest; click 'Generate Random Salt' to show that the identical password produces a completely distinct hash.
5. **Fallback:** If browser crashes or projector fails, refer directly to Slide 5 and Slide 9 figures already embedded in the presentation.
