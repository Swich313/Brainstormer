import crypto from 'crypto'

export const getPasswordHash = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex')
}
