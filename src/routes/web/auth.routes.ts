import { Hono } from 'hono'
import { authMiddleware } from '../../middleware/authMiddleware.js'
import { loginHandler, getMeHandler } from '../../controllers/auth.controller.js'

const authRouter = new Hono()

authRouter.post('/login', loginHandler)
authRouter.get('/me', authMiddleware, getMeHandler)

export { authRouter }