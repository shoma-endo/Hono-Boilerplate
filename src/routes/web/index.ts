import { Hono } from 'hono'
import { authRouter } from './auth.routes.js'

const webApp = new Hono()

webApp.route('/auth', authRouter)

export { webApp }