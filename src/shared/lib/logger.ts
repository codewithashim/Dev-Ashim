/**
 * Logger Utility
 * Centralized logging with different log levels
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LoggerConfig {
  enabled: boolean
  level: LogLevel
  prefix?: string
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

class Logger {
  private config: LoggerConfig

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      enabled: process.env.NODE_ENV === 'development',
      level: (process.env.NEXT_PUBLIC_LOG_LEVEL as LogLevel) || 'info',
      ...config,
    }
  }

  private shouldLog(level: LogLevel): boolean {
    if (!this.config.enabled) return false
    return LOG_LEVELS[level] >= LOG_LEVELS[this.config.level]
  }

  private formatMessage(message: string): string {
    const prefix = this.config.prefix ? `[${this.config.prefix}]` : ''
    const timestamp = new Date().toISOString()
    return `${timestamp} ${prefix} ${message}`
  }

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.log(this.formatMessage(message), ...args)
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage(message), ...args)
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage(message), ...args)
    }
  }

  error(message: string, error?: Error | any, ...args: any[]): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage(message), error, ...args)
      
      // TODO: Send to error tracking service (e.g., Sentry)
      // if (error instanceof Error) {
      //   Sentry.captureException(error, { extra: { message, ...args } })
      // }
    }
  }

  group(label: string): void {
    if (this.config.enabled) {
      console.group(this.formatMessage(label))
    }
  }

  groupEnd(): void {
    if (this.config.enabled) {
      console.groupEnd()
    }
  }

  table(data: any): void {
    if (this.config.enabled && this.shouldLog('debug')) {
      console.table(data)
    }
  }
}

// Create default logger instance
export const logger = new Logger({ prefix: 'Ashim OS' })

// Export Logger class for custom instances
export { Logger }
export type { LogLevel, LoggerConfig }

