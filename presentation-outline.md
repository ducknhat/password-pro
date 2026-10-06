# PasswordGuard: Oral Presentation Outline

**Course:** English Presentation Skills for Information Technology Students  
**Project:** PasswordGuard — Password Security and Authentication  
**Target Duration:** 8–10 minutes (approximately 1 minute per slide)  

---

## Slide 1: Title Slide
- **Slide Title:** PasswordGuard: Password Security & Authentication
- **Bullet Points:**
  - Understanding password strength and common weaknesses
  - Exploring mathematical entropy and search complexity
  - Demonstrating one-way hashing and cryptographic salting
  - A client-side educational tool for IT students
- **Recommended Visual:**
  - PasswordGuard logo, clean title layout, screenshot of the main application interface.
- **Speaker Notes (Simple English):**
  > "Hello everyone, and welcome to our presentation. Today, we are excited to introduce our project called PasswordGuard. 
  > In modern computer systems, passwords are the most common way to protect our personal accounts. 
  > However, many people do not know what truly makes a password strong. 
  > Our project is an educational web application that helps students visually understand password strength, entropy, brute-force cracking, and hashing. 
  > Let us begin by looking at why this problem is so important."

---

## Slide 2: Problem & Motivation
- **Slide Title:** The Problem: Human Memory vs. Password Security
- **Bullet Points:**
  - Users have dozens of online accounts
  - Complex passwords are hard to remember
  - People reuse simple passwords and predictable patterns
  - Powerful computers can guess billions of passwords every second
- **Recommended Visual:**
  - Illustration of a user overwhelmed by passwords, or a comparison graphic showing "123456" vs a computer cracking rig.
- **Speaker Notes (Simple English):**
  > "Why is password security such a big problem? 
  > Most people have more than thirty different online accounts. 
  > Because it is hard to remember complex strings, people choose simple words like 'password123' or their pet's name. 
  > Even worse, people reuse the same password for email, banking, and games. 
  > Meanwhile, modern computers with strong graphics cards can test billions of guesses every second. 
  > If one website gets hacked, attackers can easily open all of your accounts. 
  > We built PasswordGuard to help users see this danger clearly."

---

## Slide 3: How Passwords Work
- **Slide Title:** The Shared Secret and Search Space
- **Bullet Points:**
  - A password is a "shared secret" between user and server
  - Search space formula: Total Combinations = $R^L$
  - $R$ is the character pool size; $L$ is the password length
  - Length is the exponent, so length increases strength exponentially
- **Recommended Visual:**
  - A simple diagram showing $R^L$ formula with a small chart comparing alphabet size versus length.
- **Speaker Notes (Simple English):**
  > "Now, how does password authentication work mathematically? 
  > A password is a shared secret. When you log in, the system checks if your secret matches what it remembers. 
  > If an attacker wants to guess your password, the total number of combinations is $R$ to the power of $L$. 
  > Here, $R$ is the number of possible characters, and $L$ is the length. 
  > Notice that length is the exponent! 
  > That means making a password longer is much more powerful than just adding a symbol or a number. 
  > Length is the real secret to strength."

---

## Slide 4: Common Authentication Threats
- **Slide Title:** Common Threats & Best Protection Methods
- **Bullet Points:**
  - **Threat 1:** Weak passwords and dictionary words
  - **Threat 2:** Password reuse and credential stuffing
  - **Threat 3:** Phishing and social engineering
  - **Protection:** Password managers, unique passphrases, and Multi-Factor Authentication (MFA)
- **Recommended Visual:**
  - Two-column slide: Threats on the left (with warning icons), Defenses on the right (with green shield icons).
- **Speaker Notes (Simple English):**
  > "Let us look at the top threats to authentication today. 
  > First, weak passwords: attackers use dictionary lists of common words to guess them instantly. 
  > Second, credential stuffing: attackers take passwords stolen from old leaks and test them automatically on other websites. 
  > Third, phishing: fake emails trick people into typing their passwords. 
  > How do we protect ourselves? 
  > We should use a password manager to create unique passwords. 
  > And most importantly, we must turn on Multi-Factor Authentication, or MFA. 
  > With MFA, even if someone steals your password, they still cannot log in without your phone or security key."

---

## Slide 5: PasswordGuard Overview
- **Slide Title:** Introducing PasswordGuard
- **Bullet Points:**
  - Fast, modern single-page web application
  - Built using React, Vite, TypeScript, and CSS
  - Runs 100% in the user's web browser
  - Zero server storage: passwords are never saved, logged, or sent over the internet
- **Recommended Visual:**
  - High-resolution screenshot of the PasswordGuard main screen with the cyan and emerald dashboard.
- **Speaker Notes (Simple English):**
  > "To make these concepts easy to learn, we created PasswordGuard. 
  > PasswordGuard is a fast, clean web application built with React, Vite, and TypeScript. 
  > We made a very important design decision: privacy by design. 
  > Password analysis happens completely inside your web browser. 
  > We do not have a backend server. 
  > We never save, log, or send any password over the network. 
  > You can safely test passwords without worrying about your privacy."

---

## Slide 6: Password Analysis Method
- **Slide Title:** Transparent Scoring & Entropy Estimation
- **Bullet Points:**
  - Clear score from 0 to 100: Weak (0–39), Medium (40–69), Strong (70–100)
  - Checks length, character sets, repetitions, and common patterns
  - Penalizes predictable patterns (e.g. '1234', 'qwerty', 'admin')
  - Calculates estimated Shannon entropy in bits ($E = L \times \log_2 R$)
- **Recommended Visual:**
  - Screenshot of the PasswordGuard Strength Meter, Security Checklist, and Recommendations card.
- **Speaker Notes (Simple English):**
  > "How does PasswordGuard analyze a password? 
  > We use a transparent scoring system from zero to one hundred. 
  > From 0 to 39 is Weak, 40 to 69 is Medium, and 70 to 100 is Strong. 
  > Our algorithm checks length and character variety, but it also looks for bad patterns. 
  > If someone writes 'qwerty' or 'admin123', the system detects the sequence and deducts points. 
  > We also calculate estimated entropy in bits. 
  > Entropy tells us how much randomness is inside the password. 
  > Next, our app shows the estimated crack time under different computer speeds."

---

## Slide 7: Cryptographic Hashing & Salting
- **Slide Title:** Password Hashing and the Power of Salt
- **Bullet Points:**
  - Servers never store passwords in plaintext
  - Hashes are one-way functions: input produces output, cannot be reversed
  - Live demo using browser Web Crypto SHA-256
  - **Salt:** Random bytes added to each password to stop Rainbow Table attacks
  - Production warning: SHA-256 is too fast; real servers use Argon2id or bcrypt
- **Recommended Visual:**
  - Flow diagram: Password + Random Salt -> Hash Function -> Unique Digest, alongside the live comparison screenshot.
- **Speaker Notes (Simple English):**
  > "Next, let us talk about how servers store passwords safely. 
  > Servers should never save passwords as plain text. 
  > Instead, they use a hash function. A hash is a one-way mathematical function. 
  > It is easy to compute forward, but impossible to reverse. 
  > Our application includes a live demonstration using the browser's Web Crypto API. 
  > We also demonstrate a salt. A salt is a random string added to the password. 
  > If two users have the same password, their hashes will look completely different because of the salt. 
  > Please note: our app uses SHA-256 only for demonstration. 
  > Real production systems must use slower, memory-hard algorithms like Argon2id or bcrypt."

---

## Slide 8: The Experiment Setup
- **Slide Title:** Experimental Evaluation on Synthetic Passwords
- **Bullet Points:**
  - 150 synthetic passwords tested across 5 categories (30 per group)
  - **Category A:** Short simple (e.g. 'cat', 'red2')
  - **Category B:** Common pattern (e.g. 'Password123!', 'admin2024!')
  - **Category C:** Medium complexity (e.g. 'BlueSky#49')
  - **Category D:** Long passphrases (e.g. 'correct-horse-battery-staple')
  - **Category E:** Long random (e.g. '7$zW#9!kLp&2Qx@m')
- **Recommended Visual:**
  - Table or cards showing the 5 categories and example passwords for each category.
- **Speaker Notes (Simple English):**
  > "To verify our analyzer, we conducted a reproducible experiment. 
  > For ethical reasons, we did not use any real leaked passwords. 
  > Instead, we created 150 synthetic test passwords. 
  > We divided them into five categories of thirty passwords each. 
  > Category A has short words. 
  > Category B has common patterns like 'Password123!'. 
  > Category C has medium complexity. 
  > Category D has long multi-word passphrases. 
  > And Category E has long randomly generated passwords. 
  > We ran all 150 passwords through our engine and recorded the results."

---

## Slide 9: Experimental Results
- **Slide Title:** Results: Why Length Beats Complexity
- **Bullet Points:**
  - **Category E (Random):** Highest score (90.0/100), 100% Strong
  - **Category D (Passphrase):** Highest entropy (182.9 bits), 70% Strong
  - **Category B (Common):** Failed with 10.5/100 avg score despite symbols
  - **Category A (Short):** Lowest score (2.0/100), cracked instantly
- **Recommended Visual:**
  - The bar chart showing Average Strength by Category and the pie chart of the Weak/Medium/Strong distribution.
- **Speaker Notes (Simple English):**
  > "Here are the actual results from our experiment! 
  > As you can see in the bar chart, Category E had the highest score, averaging 90 out of 100. 
  > But look closely at Category D, the long passphrases. 
  > Even though they only used lowercase letters and hyphens, they achieved the highest entropy: 182.9 bits! 
  > On the other hand, look at Category B. 
  > Even though Category B had capital letters, numbers, and exclamation marks, our analyzer gave it an average score of only 10.5. 
  > Why? Because predictable patterns like '123!' or 'admin' do not fool modern security tools. 
  > This clearly shows how our heuristic rewards length and penalizes predictable patterns."

---

## Slide 10: Conclusion & Takeaways
- **Slide Title:** Key Takeaways & Recommendations
- **Bullet Points:**
  - Length is the single most effective defense against brute force
  - Use passphrases or random passwords stored in a password manager
  - Never store plain text: use modern slow hashes like Argon2id with unique salts
  - Always enable Multi-Factor Authentication (MFA)
  - Try the PasswordGuard demo locally!
- **Recommended Visual:**
  - A summary checklist with icons, repository link, and a "Thank You & Q&A" closing banner.
- **Speaker Notes (Simple English):**
  > "In conclusion, here are the main lessons from our project: 
  > First, length is your best friend. A long passphrase is easy to remember and extremely hard for computers to guess. 
  > Second, avoid common patterns—adding '123' at the end does not make a password safe. 
  > Third, use a password manager so you can have a unique, strong password for every account. 
  > And fourth, always turn on Multi-Factor Authentication. 
  > Thank you very much for your time and attention. 
  > We are now ready and happy to answer any questions!"
