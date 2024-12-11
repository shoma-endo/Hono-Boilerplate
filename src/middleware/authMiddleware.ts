import { Context, Next } from 'hono'
import { verifyToken } from '../lib/auth'

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }

  try {
    const token = authHeader.split(' ')[1]
    const payload = verifyToken(token)
    c.set('user', payload)
    await next()
  } catch (error) {
    return c.json({ message: 'Invalid token' }, 401)
  }
}