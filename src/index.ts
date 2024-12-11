import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { adminApp } from './routes/admin/index.js'
import { webApp } from './routes/web/index.js'
import { spApp } from './routes/sp/index.js'
import { errorHandling } from './middleware/errorHandling.js'
import { config } from './lib/config.js'

const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', cors({
  origin: config.frontendOrigin,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization']
}))
app.use('*', errorHandling)

// Routes
app.route('/admin', adminApp)
app.route('/web', webApp)
app.route('/sp', spApp)

// Health check
app.get('/health', (c) => c.json({ status: 'ok' }))

serve(app, () => {
  console.log(`Server is running on port ${config.port}`)
})