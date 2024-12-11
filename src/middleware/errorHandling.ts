import { Context, Next } from 'hono'
import { sendError } from '../utils/response.js'

export const errorHandling = async (c: Context, next: Next) => {
  try {
    await next()
  } catch (error) {
    console.error(error)
    
    if (error instanceof Error) {
      return sendError(c, error.message, 500)
    }
    
    return sendError(c, 'Internal Server Error', 500)
  }
}