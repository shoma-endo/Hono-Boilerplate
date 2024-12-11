import { Context } from 'hono'

export const sendSuccess = (c: Context, data: unknown, status = 200) => {
  return c.json({
    success: true,
    data
  }, status)
}

export const sendError = (c: Context, message: string, status = 400) => {
  return c.json({
    success: false,
    error: message
  }, status)
}