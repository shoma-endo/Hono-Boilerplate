import { config as dotenvConfig } from 'dotenv'
dotenvConfig()

export const config = {
  port: process.env.PORT || 8787,
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  environment: process.env.NODE_ENV || 'development'
} as const