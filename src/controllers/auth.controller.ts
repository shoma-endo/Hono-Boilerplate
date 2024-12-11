import { Context } from 'hono'
import { loginSchema } from '../schema/auth.schema.js'
import { validateRequest } from '../utils/validator.js'
import { authService } from '../services/auth.service.js'
import { sendSuccess, sendError } from '../utils/response.js'
import { logger } from '../lib/logger.js'

export const loginHandler = async (c: Context) => {
  try {
    const body = await c.req.json()
    const result = await validateRequest(loginSchema, body)
    
    if (!result.success) {
      return sendError(c, 'Invalid input', 400)
    }

    const { user, token } = await authService.login(result.data)
    return sendSuccess(c, { user, token })
  } catch (error) {
    logger.error('Login failed', error)
    return sendError(c, 'Login failed', 500)
  }
}

export const getMeHandler = async (c: Context) => {
  try {
    const user = c.get('user')
    const userData = await authService.getUser(user.userId)
    return sendSuccess(c, userData)
  } catch (error) {
    logger.error('Get user failed', error)
    return sendError(c, 'Failed to get user data', 500)
  }
}