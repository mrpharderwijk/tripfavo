import bcrypt from 'bcryptjs'

/**
 * Generate a random salt
 */
function generateSalt(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(16))
}

/**
 * Convert Uint8Array to hex string
 */
function toHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * Convert hex string to Uint8Array
 */
function fromHex(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16)
  }
  return bytes
}

/**
 * Check if a hash is in bcrypt format
 */
function isBcryptHash(hash: string): boolean {
  return hash.startsWith('$2')
}

/**
 * Hash a password using PBKDF2 (similar to bcrypt's approach)
 * This is Edge-compatible and secure
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = generateSalt()
  const encoder = new TextEncoder()
  const passwordData = encoder.encode(password)

  // Use PBKDF2 with 100,000 iterations (similar to bcrypt's work factor)
  const key = await crypto.subtle.importKey('raw', passwordData, 'PBKDF2', false, ['deriveBits'])

  const hash = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    key,
    256, // 32 bytes
  )

  // Store salt and hash together
  const saltHex = toHex(salt)
  const hashHex = toHex(new Uint8Array(hash))
  return `pbkdf2:${saltHex}:${hashHex}`
}

/**
 * Verify a password against a hash
 * This is Edge-compatible and secure
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  // Handle bcrypt hashes
  if (isBcryptHash(storedHash)) {
    return bcrypt.compare(password, storedHash)
  }

  // Handle PBKDF2 hashes
  const [algorithm, saltHex, hashHex] = storedHash.split(':')
  if (algorithm !== 'pbkdf2') {
    throw new Error('Unsupported hash algorithm')
  }

  const salt = fromHex(saltHex)
  const encoder = new TextEncoder()
  const passwordData = encoder.encode(password)

  const key = await crypto.subtle.importKey('raw', passwordData, 'PBKDF2', false, ['deriveBits'])

  const hash = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    key,
    256, // 32 bytes
  )

  const computedHashHex = toHex(new Uint8Array(hash))
  return computedHashHex === hashHex
}
