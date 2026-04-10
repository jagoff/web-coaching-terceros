/**
 * Development Logger
 * Utility for logging in development environment
 */

const isDev = process.env.NODE_ENV === 'development'

const devLog = {
  log: (message: string, data?: unknown) => {
    if (isDev) {
      // Development logging - replaced in production
      // eslint-disable-next-line no-console
      console.log(`[DEV] ${message}`, data || '')
    }
  },
  error: (message: string, error?: unknown) => {
    if (isDev) {
      // Development error logging - replaced in production
      // eslint-disable-next-line no-console
      console.error(`[DEV ERROR] ${message}`, error || '')
    }
  },
  warn: (message: string, data?: unknown) => {
    if (isDev) {
      // Development warning logging - replaced in production
      // eslint-disable-next-line no-console
      console.warn(`[DEV WARN] ${message}`, data || '')
    }
  },
  debug: (message: string, data?: unknown) => {
    if (isDev) {
      // Development debug logging - replaced in production
      // eslint-disable-next-line no-console
      console.debug(`[DEV DEBUG] ${message}`, data || '')
    }
  }
}

export default devLog
