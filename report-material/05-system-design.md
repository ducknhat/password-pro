# 05 - System Design and Implementation

## IV. System Design and Implementation

### 5.1 Architecture Overview
The PasswordGuard system was designed as a modern, responsive Single-Page Application (SPA) leveraging React 19, TypeScript, and Vite. The architecture maintains a strict separation of concerns between heuristic analysis, cryptographic simulation, and user presentation.

```
+-------------------------------------------------------------+
|                       User Interface                        |
|   (Analyzer, Concepts, Common Threats, Hashing, Experiment) |
+------------------------------+------------------------------+
                               |
            +------------------+------------------+
            |                                     |
            v                                     v
+-----------------------+             +-----------------------+
|   Password Analyzer   |             |   Web Crypto Engine   |
| - Heuristic Scoring   |             | - SHA-256 Digest      |
| - Pattern Detection   |             | - 128-bit CSPRNG Salt |
| - Character Entropy   |             | - Salting Simulator   |
| - Search Space (R^L)  |             +-----------------------+
+-----------------------+
```

### 5.2 Core Modules

#### 1. Analysis Engine (`src/utils/passwordAnalyzer.ts`)
The analyzer module exports `analyzePassword()`, a pure TypeScript function that parses an input string and returns a deterministic data structure containing:
- Boolean flags for character set membership ($a-z, A-Z, 0-9, \text{symbols}$)
- Character pool size $R$ and diversity count (1 to 4)
- Boolean flags for pattern vulnerabilities (consecutive repetition, dictionary substrings, keyboard sequences)
- Numeric heuristic score ($0$ to $100$) and categorical tier (Weak, Medium, Strong)
- Theoretical character-space entropy estimate in bits (under uniform assumption)
- Array of passed/failed security requirements
- Actionable improvement recommendations
- Estimated exhaustive search times across three illustrative assumed guessing rates
- Complete score breakdown including `passphraseBonus` and `rawScore`

#### 2. Cryptographic Sandbox (`src/utils/cryptoDemo.ts`)
To illustrate one-way cryptographic hashing without external server dependencies, PasswordGuard interacts directly with the browser's hardware-accelerated Web Crypto API:
```typescript
async function computeSha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  return bufferToHex(hashBuffer);
}
```
A 16-byte random salt is generated via `window.crypto.getRandomValues()`. The UI performs dynamic computations of both $\text{SHA-256}(\text{password})$ and $\text{SHA-256}(\text{password} \parallel \text{salt})$, providing a live side-by-side view demonstrating how unique salting produces distinct hash outputs across identical passwords and makes precomputed rainbow-table lookups impractical across many users.

#### 3. Data Visualization & UI Layer
The visual presentation is styled using a modern, cybersecurity-focused dark theme in Vanilla CSS, ensuring high contrast, clean typography (using Plus Jakarta Sans and JetBrains Mono), and responsive multi-column grid layouts. Statistical visualizations are rendered through Recharts, including:
- Category-wise average score bar charts
- Length versus score correlation lines
- Tier distribution donut diagrams
