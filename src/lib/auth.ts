import jwt from 'jsonwebtoken'
import { config } from './config'

export type JWTPayload = {
  userId: string
  email: string
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '24h' })
}

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, config.jwtSecret) as JWTPayload
}