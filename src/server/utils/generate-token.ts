import crypto from 'crypto'

export function generateToken(tokenLength: number): string {
  let token = ''
  for (let i = 0; i < tokenLength; i++) {
    const randomNumber = crypto.randomInt(0, 10) // Generate a random number between 0 and 9
    token += randomNumber.toString()
  }
  return token
}
