import { Context } from 'hono'
import { StatusCode } from 'hono/utils/http-status'

export const sendSuccess = (c: Context, data: unknown, status: StatusCode = 200) => {
  return c.json({
    success: true,
    data
  }, status)
}

export const sendError = (c: Context, message: string, status: StatusCode = 400) => {
  return c.json({
    success: false,
    error: message
  }, status)
}