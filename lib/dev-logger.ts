/**
 * Development Logger
 * Utility for logging in development environment
 */

const isDev = process.env.NODE_ENV === 'development'

const devLog = {
  log: (message: string, data?: any) => {
    if (isDev) {
      console.log(`[DEV] ${message}`, data || '')
    }
  },
  error: (message: string, error?: any) => {
    if (isDev) {
      console.error(`[DEV ERROR] ${message}`, error || '')
    }
  },
  warn: (message: string, data?: any) => {
    if (isDev) {
      console.warn(`[DEV WARN] ${message}`, data || '')
    }
  },
  info: (message: string, data?: any) => {
    if (isDev) {
      console.info(`[DEV INFO] ${message}`, data || '')
    }
  },
}

export default devLog
