# PasswordGuard: Oral Presentation Speaking Script

**Course:** English Writing and Presentation Skills (AV3)  
**Project Title:** PasswordGuard: An Experimental Analysis of Password Strength and Authentication Security  
**Authors:** Nguyen Duc Nhat (22001594), Hoang Minh Duc (22002598), Pham Tuan Phong (22002621)  
**Target Duration:** 8 to 10 minutes (approximately 50 to 55 seconds per slide, planned for ~8:45 total with comfortable pauses)  

---

## Presentation Pacing & Pronunciation Tips

- **Pacing:** Speak at a comfortable speed of about 120 words per minute. Do not rush.
- **Pauses:** Take a 1 to 2 second breath when switching slides.
- **Key Pronunciations:**
  - **Heuristic:** /hjuːˈrɪstɪk/ (*hyoo-RIS-tik*) — A practical rule-of-thumb method.
  - **Entropy:** /ˈentrəpi/ (*EN-truh-pee*) — A mathematical measure of randomness.
  - **Exponent:** /ɪkˈspoʊnənt/ (*ik-SPOH-nuhnt*) — The power $L$ in $R^L$.
  - **Verifier:** /ˈverɪfaɪər/ (*VEH-rih-fy-er*) — What the server stores instead of plaintext.
  - **Argon2id:** /ˈɑːrɡɒn tuː aɪ diː/ (*AR-gon two eye dee*) — A modern password-hashing function.

---

## Slide 1: Title & Opening Question

**Target Duration:** 55 seconds  
**Slide Title:** PasswordGuard: An Experimental Analysis of Password Strength and Authentication Security  

### What to Say:

> "Good morning, teacher and classmates.
>
> Today, our team is happy to present our project: **PasswordGuard**.
>
> Before we start, I want to ask everyone a quick question:
>
> **Which of these two passwords do you think is stronger against a computer attack?**
>
> - **Option A:** `P@ssw0rd123` — with an uppercase letter, a number, and a symbol.  
> - Or **Option B:** `correct-horse-battery-staple` — four simple lowercase words?
>
> Many people choose Option A because we are used to rules about special characters.
>
> But under a simple exhaustive search-space model, Option B actually has a much larger theoretical search space.
>
> However, real password security also depends on predictability, hashing, rate limiting, and other defenses.
>
> *[Optional if running low on time]* This difference between intuition and math is why we built PasswordGuard.
>
> Let us look at why passwords are still such a big challenge."

**Transition:**  
*"Let us turn to Slide 2 to see the main problem users face."*

---

## Slide 2: The Problem: Human Memory vs. Password Guessing

**Target Duration:** 50 seconds  
**Slide Title:** The Problem: Human Memory vs. Combinatorial Search Spaces  

### What to Say:

> "Why are passwords still broken so often?
>
> First, users have too many accounts—often 50 or more. Random strings are very hard for people to remember, so users take shortcuts. They pick simple words, reuse passwords, or make simple changes like replacing the letter 'a' with an at-sign (`@`).
>
> Second, attackers do not just guess one letter at a time. They use automated tools with wordlists of millions of leaked passwords.
>
> Third, old complexity rules created a false sense of security. Asking for one capital letter and one number taught people to create passwords like `Summer2024!`. Password-guessing tools can test these predictable patterns very early.
>
> *[Optional if running low on time]* PasswordGuard helps students see these risks through an interactive web tool."

**Transition:**  
*"On Slide 3, let us look at the basic math behind password search spaces."*

---

## Slide 3: Search Spaces & The Prover-Verifier Model

**Target Duration:** 55 seconds  
**Slide Title:** Mathematical Foundations: Search Spaces & the Prover-Verifier Model  

### What to Say:

> "To understand password defense, we can look at a simple mathematical model.
>
> In modern systems, the user is the prover and the server is the verifier. The server does not store plaintext; it stores a cryptographic verifier.
>
> If an attacker tries every possible combination, the total search space is:
>
> **Total Combinations equals $R$ to the power of $L$** ($S = R^L$).
>
> Here, $R$ is the size of the character pool, and $L$ is the password length.
>
> In this theoretical search-space model, increasing length has an exponential effect because length is the exponent.
>
> Look at the examples on the right: an 8-character password using all printable characters has about $6.6 \times 10^{15}$ combinations.
>
> But a 28-character passphrase using only lowercase letters and hyphens has about $1.2 \times 10^{40}$ combinations.
>
> *[Optional if running low on time]* Notice that the guessing times shown on this slide are illustrative assumed rates, not a hardware benchmark."

**Transition:**  
*"Next, on Slide 4, let us look at real attack threats and defenses."*

---

## Slide 4: Common Password Threats & Defense in Depth

**Target Duration:** 50 seconds  
**Slide Title:** Common Password Threats & Defense in Depth  

### What to Say:

> "In the real world, attackers use several methods:
>
> 1. **Wordlists and rules** to guess common words and variations.
> 2. **Credential stuffing**, replaying stolen username and password pairs across many websites.
> 3. **Offline hash cracking**, testing leaked database hashes on fast hardware without server lockouts.
> 4. And **phishing**, which tricks users into typing their passwords directly.
>
> Because of these threats, password strength alone cannot guarantee security.
>
> We need **Defense in Depth**:
> - Users should use **password managers** so every account has a unique password.
> - Services must enforce **Multi-Factor Authentication (MFA)**, so a stolen password alone is not enough to log in.
> - And servers must use **slow, memory-hard hashing** and rate limiting."

**Transition:**  
*"Now, let us look at how PasswordGuard is designed on Slide 5."*

---

## Slide 5: PasswordGuard Architecture & Privacy Design

**Target Duration:** 45 seconds  
**Slide Title:** PasswordGuard: Application Architecture & Privacy Design  

### What to Say:

> "To demonstrate these ideas in an educational setting, we built **PasswordGuard**.
>
> PasswordGuard is a single-page web app built with **React 19, TypeScript, and Vite**.
>
> A key design choice is our local processing approach:
> - PasswordGuard is designed to process entered passwords locally in the browser.
> - It does not include an application backend for password submission, and it does not store passwords in a database or send tracking data.
> - For cryptographic hashing, the app uses the browser's built-in **Web Crypto API**.
>
> As shown in the diagram, user input stays in local browser state and flows directly to our scoring and hashing components."

**Transition:**  
*"On Slide 6, let us look at how PasswordGuard calculates scores."*

---

## Slide 6: How PasswordGuard Evaluates Passwords

**Target Duration:** 55 seconds  
**Slide Title:** How PasswordGuard Evaluates Passwords: Heuristic & Entropy  

### What to Say:

> "PasswordGuard evaluates passwords using two main metrics:
>
> First, a **transparent heuristic score from 0 to 100**.
> - **Length points:** up to 40 points, using tiered brackets. For example, 20 points for 8 to 11 characters, and 40 points for 16 characters or more.
> - **Character variety:** up to 35 points across lowercase, uppercase, digits, and symbols.
> - **Diversity bonus:** up to 15 bonus points when multiple character types are mixed.
> - **Passphrase bonus:** up to 20 bonus points for long passphrases with diverse characters or word separators.
>
> The heuristic also subtracts penalties:
> - Minus 15 points for sequential patterns like `1234` or `qwerty`.
> - Minus 15 points for repeated characters.
> - Minus 25 points for common dictionary roots like `password` or `admin`.
> - And length penalties for passwords under 12 characters.
>
> The final score classifies passwords into **Weak (0–39)**, **Medium (40–69)**, or **Strong (70–100)**.
>
> Second, the app calculates a **theoretical character-space entropy estimate** in bits, assuming uniform random selection."

**Transition:**  
*"Next, on Slide 7, let us look at password hashing and cryptographic salts."*

---

## Slide 7: Password Hashing, Cryptographic Salts & Production Security

**Target Duration:** 55 seconds  
**Slide Title:** Password Hashing, Cryptographic Salts, and Production Security  

### What to Say:

> "Servers should never store passwords in plain text. Instead, they store a cryptographic hash.
>
> A hash function is one-way: easy to compute forward, but practically impossible to reverse.
>
> A well-designed hash exhibits an **avalanche effect**: a small change in the input tends to change roughly half of the output bits.
>
> To protect stored hashes, servers add a **cryptographic salt**—a unique random value for each user.
>
> Because every user has a different salt, identical passwords produce completely different stored hashes. Unique salts make traditional precomputed rainbow-table attacks impractical across many users.
>
> **Important security distinction:**
> PasswordGuard uses SHA-256 only for educational demonstration in the browser.
>
> Because SHA-256 is a fast general-purpose hash, raw SHA-256 is not appropriate for production password storage.
>
> Production systems should use password-focused functions such as **Argon2id, bcrypt, scrypt, or PBKDF2** with appropriate parameters."

**Transition:**  
*"To see how our heuristic behaves, we ran a controlled experiment on Slide 8."*

---

## Slide 8: Experimental Design: Synthetic Dataset

**Target Duration:** 50 seconds  
**Slide Title:** Experimental Design: Controlled Evaluation of Heuristic Behavior  

### What to Say:

> "To test whether our scoring rules behave consistently, we ran a controlled experiment.
>
> To follow research ethics, we did **not** use real user credentials or leaked databases.
>
> Instead, we tested a **controlled synthetic dataset of 150 passwords**, divided into five categories of 30 passwords each:
> - **Category A — Short Simple:** 3 to 5 characters, like `cat` or `red2`.
> - **Category B — Common Pattern:** 8 to 12 characters with dictionary roots and digits, like `password123` or `admin2024!`.
> - **Category C — Medium Complexity:** 11 to 15 characters with mixed character types, like `BlueSky#49`.
> - **Category D — Long Passphrases:** 25 to 36 characters with hyphens, like `correct-horse-battery-staple`.
> - **Category E — Long Random:** 16 random characters across all printable symbols.
>
> We ran all 150 passwords through our analyzer using an automated test script."

**Transition:**  
*"Let us examine the results on Slide 9."*

---

## Slide 9: Experimental Results & Observations

**Target Duration:** 55 seconds  
**Slide Title:** Experimental Results: Quantitative Observations Across Categories  

### What to Say:

> "Here are the empirical results from our experiment.
>
> Across all 150 synthetic passwords, our heuristic classified **59 as Weak, 12 as Medium, and 79 as Strong**.
>
> Looking at the chart:
> - **Category E (Long Random)** had the highest average score of **90.0 out of 100**, with 100% rated Strong.
> - **Category D (Long Passphrases)** had the highest theoretical entropy estimate of **182.9 bits**, with 70% Strong and 30% Medium.
> - **Category C (Medium Complexity)** averaged **80.8 out of 100**, with 93.3% Strong.
>
> Now look at **Category B**: even though these passwords contained uppercase letters, digits, and symbols, their average score collapsed to **10.5 out of 100**, and **96.7% were rated Weak**.
>
> This demonstrates that our heuristic heavily penalizes common patterns rather than looking only at character types.
>
> Category A averaged **2.0 out of 100**, reflecting its minimal length."

**Transition:**  
*"Finally, let us review our limitations and key takeaways on Slide 10."*

---

## Slide 10: Limitations, Key Takeaways & Conclusion

**Target Duration:** 50 seconds  
**Slide Title:** Academic Limitations, Core Takeaways, and Conclusion  

### What to Say:

> "To be academically honest, we must acknowledge our project's limitations:
> - **First, circularity:** The experiment evaluates the internal consistency of our heuristic rules, rather than testing real-world cracking resistance.
> - **Second, synthetic dataset:** 150 synthetic samples isolate structural rules, but they do not capture the full variety of real user passwords.
> - **Third, theoretical entropy:** Our entropy estimate assumes uniform random selection, while real human passwords have predictable habits.
>
> Despite these limitations, our core security takeaways are clear:
> 1. In simple search-space models, **length provides an exponential advantage**, making passphrases an effective, memorable approach.
> 2. **Superficial complexity fails:** Adding `123!` to a dictionary word does not protect against modern attack tools.
> 3. **Defense in Depth is essential:** Real protection requires password managers, slow memory-hard hashing like Argon2id, and Multi-Factor Authentication.
>
> Thank you very much for your time.
> We are now ready to answer your questions!"

---

## Live Demo Fallback Plan (60–90 Seconds)

If the lecturer requests a quick demo:

1. **Weak Example:** Type `password123`. Show that the score drops to Weak (~10/100) due to dictionary penalties.
2. **Passphrase Example:** Type `correct-horse-battery-staple`. Show that the passphrase bonus activates, theoretical entropy reaches over 130 bits, and score reaches Strong.
3. **Hashing Demo:** Open the Hashing view. Type any word to show instant SHA-256 output. Click 'Generate Random Salt' to show that adding a unique salt produces a completely different hash digest.
4. **Fallback:** If technology fails, refer to the architecture diagram on Slide 5 and the results chart on Slide 9.
