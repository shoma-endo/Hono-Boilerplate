import { config } from './config.js'

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

export const logger = {
  info: (message: string, ...args: unknown[]) => {
    if (config.environment !== 'test') {
      console.log(`[INFO] ${message}`, ...args)
    }
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${message}`, error)
  },
  warn: (message: string, ...args: unknown[]) => {
    console.warn(`[WARN] ${message}`, ...args)
  },
  debug: (message: string, ...args: unknown[]) => {
    if (config.environment === 'development') {
      console.debug(`[DEBUG] ${message}`, ...args)
    }
  }
}