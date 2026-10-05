/**
 * PasswordGuard - Web Crypto API Hashing & Salting Demonstrator
 * 
 * Demonstrates one-way cryptographic hashing (SHA-256) and the impact of salting.
 * Educational disclaimer: Fast hashes like SHA-256 alone are NOT safe for production password storage.
 */

export interface HashDemoResult {
  password: string;
  saltHex: string;
  unsaltedHash: string;
  saltedInput: string;
  saltedHash: string;
  executionTimeMs: number;
}

/**
 * Convert an ArrayBuffer to a hexadecimal string
 */
function bufferToHex(buffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(buffer);
  return Array.from(byteArray)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Generate a cryptographically random salt (16 bytes = 32 hex chars)
 */
export function generateRandomSalt(byteCount = 16): string {
  const randomBytes = new Uint8Array(byteCount);
  window.crypto.getRandomValues(randomBytes);
  return Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Compute SHA-256 hash using the native browser Web Crypto API
 */
export async function computeSha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  return bufferToHex(hashBuffer);
}

/**
 * Run hashing and salting comparison demonstration
 */
export async function runHashAndSaltDemo(password: string, customSalt?: string): Promise<HashDemoResult> {
  const startTime = performance.now();
  
  const salt = customSalt !== undefined && customSalt !== '' 
    ? customSalt 
    : generateRandomSalt(16);

  const unsaltedHash = await computeSha256(password);
  const saltedInput = `${password}${salt}`;
  const saltedHash = await computeSha256(saltedInput);
  
  const endTime = performance.now();

  return {
    password,
    saltHex: salt,
    unsaltedHash,
    saltedInput,
    saltedHash,
    executionTimeMs: Math.round((endTime - startTime) * 100) / 100
  };
}
