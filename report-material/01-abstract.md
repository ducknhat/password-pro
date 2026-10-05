# 01 - Abstract

**Title:** PasswordGuard: Password Security and Authentication — Common Threats and Protection Methods  
**Author:** IT Student Research Team  
**Course:** English Presentation Skills for Information Technology Students  

### Abstract
Password-based authentication remains the foundational access control mechanism across modern computing systems despite decades of known vulnerabilities [CITATION REQUIRED]. Users consistently balance security requirements against cognitive retention limitations, frequently producing passwords susceptible to automated dictionary attacks, credential stuffing, and offline hash recovery [CITATION REQUIRED]. 

This project presents **PasswordGuard**, an educational, client-side web application designed to evaluate password strength, illustrate combinatorial search complexity, and demonstrate the mechanics of cryptographic hashing and salting. The application incorporates a transparent heuristic scoring algorithm (0–100), theoretical Shannon entropy estimation, and illustrative brute-force search time projections under varied attacker capability profiles. Crucially, the system operates under a strict privacy-by-design model, executing entirely within local browser memory without persistent storage or network transmission. 

To empirically validate the analyzer, an experiment was conducted on a reproducible dataset of 150 synthetic passwords divided into five distinct structural categories. The findings demonstrate that password length mathematically dominates character alphabet expansion: multi-word passphrases achieved an average theoretical entropy of 182.9 bits and a 70% Strong rating despite utilizing only two character sets, whereas superficially complex short passwords incorporating digits and symbols collapsed under sequential pattern penalties (averaging only 10.5 out of 100). Furthermore, this paper discusses why general-purpose hashes such as SHA-256 are inadequate for password storage and highlights modern memory-hard key derivation functions, including Argon2id and bcrypt [CITATION REQUIRED].
