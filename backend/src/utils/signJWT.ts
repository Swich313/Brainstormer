import jwt from 'jsonwebtoken'

export const signJWT = (userId: string): string => {
  return jwt.sign(userId, 'your-secret-key')
}
