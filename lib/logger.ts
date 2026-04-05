/**
 * Unified logging utility - simplified and production-ready
 */

const isDev = process.env.NODE_ENV === 'development'

type LogLevel = 'error' | 'warn' | 'info' | 'debug'

interface LogOptions {
  component?: string
  data?: unknown
}

class Logger {
  private log(level: LogLevel, message: string, options?: LogOptions): void {
    if (!isDev && level === 'debug') return

    const prefix = options?.component ? `[${options.component}]` : ''
    const logFn = console[level] || console.log

    if (options?.data) {
      logFn(`${prefix} ${message}`, options.data)
    } else {
      logFn(`${prefix} ${message}`)
    }
  }

  error(message: string, options?: LogOptions): void {
    this.log('error', message, options)
  }

  warn(message: string, options?: LogOptions): void {
    this.log('warn', message, options)
  }

  info(message: string, options?: LogOptions): void {
    this.log('info', message, options)
  }

  debug(message: string, options?: LogOptions): void {
    this.log('debug', message, options)
  }
}

export const logger = new Logger()

export default logger
