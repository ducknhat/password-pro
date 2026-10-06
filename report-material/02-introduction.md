# 02 - Introduction

## I. Introduction

Authentication is the cornerstone of information security, serving as the gateway that verifies whether an entity requesting access to a system is indeed authorized to do so [TODO: Citation needed - General security & access control literature, e.g., NIST SP 800-63B]. Among the primary authentication factors—knowledge ("something you know"), possession ("something you have"), and inherence ("something you are")—knowledge-based passwords remain the most widely deployed mechanism worldwide due to their legacy support, minimal implementation overhead, and intuitive conceptual model [TODO: Citation needed - Authentication taxonomy, e.g., Bonneau et al., 2012].

However, the human factors governing password selection introduce severe systemic vulnerabilities. Studies examining leaked credentials consistently reveal that users select predictable patterns, dictionary terms, common date sequences, and simple character substitutions (such as replacing 'a' with '@') to accommodate memorization constraints [TODO: Citation needed - Empirical password meter & pattern analyses, e.g., Ur et al., 2015]. Furthermore, users routinely reuse passwords across diverse services, magnifying the blast radius of single-site breaches through automated credential stuffing attacks [TODO: Citation needed - Credential stuffing and reuse studies].

At the same time, computing capabilities available to threat actors have expanded by multiple orders of magnitude. Commercial graphics processing units (GPUs) and specialized Application-Specific Integrated Circuits (ASICs) enable offline cracking rigs to test billions of fast hash candidates per second against captured authentication databases [TODO: Citation needed - Offline cracking benchmarks, e.g., Hashcat documentation]. Consequently, intuitive human conceptions of "complexity" fail to reflect the mathematical realities of cryptographic search spaces.

### Objectives of this Work
To bridge this educational gap for undergraduate students in Information Technology, this project develops **PasswordGuard**, an educational software platform and empirical evaluation framework with the following objectives:
1. Provide a transparent, client-side password analysis system that quantifies structural properties, character diversity, and vulnerability patterns.
2. Educate users on the mathematical relationship between password length ($L$), character pool size ($R$), and theoretical character-space entropy ($E$).
3. Illustrate brute-force search space complexity under educational online vs. offline guessing rate scenarios.
4. Provide an interactive demonstration of one-way cryptographic hashing (using browser-native Web Crypto SHA-256) and evaluate the necessity of cryptographic salts.
5. Contrast general-purpose fast hashing algorithms with production-grade, memory-hard Key Derivation Functions (KDFs) such as Argon2id [TODO: Citation needed - Argon2 reference, Biryukov et al., 2016].
6. Maintain strict ethical standards by operating completely client-side without storing, logging, or transmitting any user-entered text.
