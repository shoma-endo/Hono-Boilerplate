import { Hono } from 'hono'
import { authMiddleware } from '../../middleware/authMiddleware'

const adminApp = new Hono()

adminApp.use('*', authMiddleware)

adminApp.get('/dashboard', (c) => {
  return c.json({ message: 'Admin Dashboard' })
})

export { adminApp }