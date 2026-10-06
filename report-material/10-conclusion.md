# 10 - Conclusion and References

## IX. Conclusion

This project designed, implemented, and empirically evaluated **PasswordGuard**, an educational web application for Information Technology students exploring the foundational principles of password security and authentication defense.

By eliminating complex backend architectures and executing entirely within client-side browser memory, PasswordGuard achieves an optimal balance between technical rigor, educational clarity, and strict privacy by design. The interactive tool exposes the mathematical mechanisms governing password resilience:
- Character space scaling ($R^L$)
- Shannon theoretical entropy
- Illustrative crack times across online vs. offline attacker profiles
- One-way cryptographic hashing and salting via the browser Web Crypto API

Empirical evaluation on 150 synthetic passwords across five structural categories yielded findings consistent with the educational thesis: **length mathematically scales combinatorial search complexity**. Multi-word passphrases (averaging 31.1 characters) produced an average theoretical character-space entropy estimate of 182.9 bits under the uniform-character assumption with 21 of 30 samples (70.0%) classified as Strong, whereas superficially complex short passwords containing numbers and symbols scored an average of only 10.5 / 100 due to predictable pattern penalties. Finally, the project emphasized that passwords must not exist in isolation, highlighting modern defense-in-depth strategies including slow Key Derivation Functions (Argon2id), unique cryptographic salts, rate limiting, and Multi-Factor Authentication (MFA) [3].

---

## References

[1] Biryukov, A., Dinu, D., and Khovratovich, D. 2016. Argon2: New generation of memory-hard functions for password hashing and other applications. In *Proceedings of the 2016 IEEE European Symposium on Security and Privacy (EuroS&P '16)*. IEEE, 292–302. DOI: https://doi.org/10.1109/EuroSP.2016.31.

[2] Bonneau, J., Herley, C., van Oorschot, P. C., and Stajano, F. 2012. The quest to replace passwords: A framework for comparative evaluation of web authentication schemes. In *Proceedings of the 2012 IEEE Symposium on Security and Privacy (S&P '12)*. IEEE, 553–567. DOI: https://doi.org/10.1109/SP.2012.44.

[3] Grassi, P. A., Fenton, J. L., Newton, E. M., Perlner, R. A., Regenscheid, A. R., Burr, W. E., Richer, J. P., Lefkovitz, N. B., Dankner, J. M., and Choong, Y.-Y. 2017. Digital Identity Guidelines: Authentication and Lifecycle Management. NIST Special Publication 800-63B. National Institute of Standards and Technology. DOI: https://doi.org/10.6028/NIST.SP.800-63b.

[4] Hunt, T. 2018. Pwned Passwords and k-anonymity: Protecting users at scale. *Troy Hunt Research Publication*. https://www.troyhunt.com/ive-just-launched-pwned-passwords-version-2/

[5] Kaliski, B. 2000. PKCS #5: Password-Based Cryptography Specification Version 2.0. RFC 2898. Internet Engineering Task Force. DOI: https://doi.org/10.17487/RFC2898.

[6] Kenneally, E. and Dittrich, D. 2012. The Menlo Report: Ethical Principles Guiding Information and Communication Technology Research. Technical Report. U.S. Department of Homeland Security.

[7] Komanduri, S., Shay, R., Kelley, P. G., Mazurek, M. L., Bauer, L., Christin, N., Cranor, L. F., and Egelman, S. 2011. Of passwords and people: Measuring the effect of password-composition policies. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI '11)*. ACM, 2595–2604. DOI: https://doi.org/10.1145/1978942.1979321.

[8] National Institute of Standards and Technology. 2015. Secure Hash Standard (SHS). Federal Information Processing Standards Publication (FIPS PUB) 180-4. U.S. Department of Commerce. DOI: https://doi.org/10.6028/NIST.FIPS.180-4.

[9] Oechslin, P. 2003. Making a faster cryptanalytic time-memory trade-off. In *Advances in Cryptology — CRYPTO 2003*. Lecture Notes in Computer Science, vol. 2729. Springer, 617–630. DOI: https://doi.org/10.1007/978-3-540-45146-4_36.

[10] Percival, C. 2009. Stronger key derivation via sequential memory-hard functions. In *Proceedings of BSDCan 2009: The Technical BSD Conference*.

[11] Provos, N. and Mazières, D. 1999. A future-adaptable password scheme. In *Proceedings of the FREENIX Track: 1999 USENIX Annual Technical Conference*. USENIX Association, 81–91.

[12] Shannon, C. E. 1948. A mathematical theory of communication. *Bell System Technical Journal* 27, 3 (1948), 379–423. DOI: https://doi.org/10.1002/j.1538-7305.1948.tb01338.x.

[13] Steube, J. 2020. Hashcat: Advanced password recovery utility. Documentation and benchmark architecture. https://hashcat.net/hashcat/

[14] Thomas, K., Li, F., Zand, A., Barrett, J., Ranieri, G., Invernizzi, L., Markov, Y., Comanescu, O., Eranti, V., Moscicki, A., Margolis, D., Paxson, V., and Bursztein, E. 2017. Data breaches, phishing, or malware? Understanding the risks of stolen credentials. In *Proceedings of the 2017 ACM SIGSAC Conference on Computer and Communications Security (CCS '17)*. ACM, 1421–1434. DOI: https://doi.org/10.1145/3133956.3134067.

[15] Ur, B., Segreti, S. M., Bauer, L., Christin, N., Cranor, L. F., Komanduri, S., Kurilova, D., Mazurek, M. L., Melicher, W., and Shay, R. 2015. Measuring real-world accuracies and biases in modeling password guessability. In *Proceedings of the 24th USENIX Security Symposium (USENIX Security 15)*. USENIX Association, 463–481.

[16] Webster, A. F. and Tavares, S. E. 1985. On the design of S-boxes. In *Advances in Cryptology — CRYPTO '85*. Lecture Notes in Computer Science, vol. 218. Springer, 523–534. DOI: https://doi.org/10.1007/3-540-39799-X_41.

[17] Weir, M., Aggarwal, S., de Medeiros, B., and Glodek, B. 2009. Password cracking using probabilistic context-free grammars. In *Proceedings of the 2009 30th IEEE Symposium on Security and Privacy (S&P '09)*. IEEE, 391–405. DOI: https://doi.org/10.1109/SP.2009.8.
