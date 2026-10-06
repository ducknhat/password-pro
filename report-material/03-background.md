# 03 - Background and Related Concepts

## II. Background and Related Concepts

### 2.1 The Prover-Verifier Paradigm
Password authentication is fundamentally a prover-verifier protocol. A client establishes an identity identifier (username) and a secret password ($S$). Upon subsequent authentication attempts, the client presents $S$. The server does not need to store the plaintext secret; rather, it validates whether the presented password produces a digest matching the stored cryptographic verifier (salted hash) [TODO: Citation needed - NIST SP 800-63B].

### 2.2 Character Spaces and Combinatorial Complexity
The mathematical difficulty of an exhaustive brute-force search against a random password depends on two parameters:
- **Alphabet Size ($R$):** The number of discrete symbols available in the candidate character pool (e.g., numeric digits $R=10$, lowercase ASCII $R=26$, alphanumeric $R=62$, printable ASCII $R=95$).
- **Length ($L$):** The total character count.

The total search space size $N$ is expressed exponentially:
$$N = R^L$$

Because length appears as an exponent while alphabet size acts only as the base, increasing length yields exponential increases in search complexity. For example, expanding an 8-character password from lowercase ($26^8 \approx 2.08 \times 10^{11}$) to full printable ASCII ($95^8 \approx 6.63 \times 10^{15}$) multiplies the space by roughly $3 \times 10^4$. Conversely, simply increasing a lowercase password from 8 to 16 characters ($26^{16} \approx 4.36 \times 10^{22}$) multiplies the search space by more than $2 \times 10^{11}$, highlighting the definitive advantage of length over alphabet diversity [TODO: Citation needed - Information theory fundamentals, Shannon 1948].

### 2.3 Information-Theoretic Entropy
In classical information theory, Claude Shannon defined entropy as the measure of average information content or uncertainty produced by an information source [TODO: Citation needed - Shannon, 1948]. Assuming characters are chosen independently and uniformly at random from an alphabet of size $R$, the theoretical character-space entropy estimate $E$ in bits is given by:
$$E = L \times \log_2(R)$$

While this calculation provides an upper-bound baseline under a uniform-character assumption, human users exhibit pronounced cognitive biases: they adhere to phonological constraints, capitalize initial characters, append sequential years or exclamation marks at the tail, and reuse common dictionary words [TODO: Citation needed - Password usability & bias studies, e.g., Ur et al., 2015]. Consequently, educational heuristic analyzers must penalize predictable patterns rather than presenting character-space formulas as actual entropy of human-generated strings.

### 2.4 Cryptographic Hashing and Salting
To mitigate risks if an authentication database is breached, passwords must never be stored in plaintext. Cryptographic hash functions provide a deterministic, one-way transformation mapping arbitrary-length inputs into fixed-length digests:
- **Pre-image Resistance:** Computationally infeasible to reverse $H(S) \rightarrow S$ [TODO: Citation needed - FIPS 180-4 Secure Hash Standard].
- **Avalanche Effect:** A minimal change in input bits produces an uncorrelated, pseudorandom shift across the output digest bits [TODO: Citation needed - Feistel, 1973; Webster & Tavares, 1985].

#### The Role of Salt
Without salt, identical passwords produce identical hash digests, enabling adversaries to conduct precomputed dictionary lookups using Rainbow Tables [TODO: Citation needed - Oechslin, 2003 on rainbow table trade-offs]. A cryptographic salt is a unique, cryptographically random value (typically 16 bytes or 128 bits) appended to the password prior to hashing:
$$\text{Stored Digest} = H(\text{Password} \parallel \text{Salt})$$
A unique salt forces an attacker to crack each stolen credential individually, completely neutralizing precomputed multi-target attacks [TODO: Citation needed - NIST SP 800-63B on unique salting].

### 2.5 Fast Hashes vs. Memory-Hard Key Derivation Functions
General-purpose cryptographic hash functions (such as MD5, SHA-1, and SHA-256) were designed for maximum throughput in digital signatures and file integrity verification [TODO: Citation needed - Cryptographic hash design goals]. However, this very speed makes them disastrous for password storage: modern commodity GPU rigs execute billions of SHA-256 operations per second. Modern standards—such as NIST SP 800-63B—mandate specialized Key Derivation Functions designed to be deliberately slow and resource-intensive:
- **Argon2id:** Winner of the Password Hashing Competition (PHC), optimized to resist GPU and custom ASIC cracking by combining data-dependent and data-independent memory-hard iterations [TODO: Citation needed - Biryukov et al., 2016].
- **bcrypt:** Based on the Blowfish cipher with an adaptable cost factor [TODO: Citation needed - Provos & Mazières, 1999].
- **scrypt:** An early memory-hard algorithm designed to thwart hardware parallelism [TODO: Citation needed - Percival, 2009].
- **PBKDF2:** NIST-recommended HMAC-based iterative function requiring hundreds of thousands of rounds [TODO: Citation needed - Kaliski, RFC 2898].
