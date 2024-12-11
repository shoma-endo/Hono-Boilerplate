import { Hono } from 'hono'

const spApp = new Hono()

spApp.get('/health', (c) => {
  return c.json({ status: 'ok' })
})

export { spApp }