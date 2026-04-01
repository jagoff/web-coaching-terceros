/**
 * Simple logging system for tracking errors and events
 */

export type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  component?: string;
  details?: any;
  userAgent?: string;
  url?: string;
  stackTrace?: string;
  errorType?: string;
  resolved?: boolean;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000; // Keep last 1000 logs
  private unresolvedErrors: Map<string, LogEntry[]> = new Map();
  private instantFixCallback?: (error: LogEntry) => void;

  // Set instant fix callback
  setInstantFixCallback(callback: (error: LogEntry) => void): void {
    this.instantFixCallback = callback;
  }

  // Global error handler setup
  setupGlobalErrorHandlers(): void {
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 Setting up global error handlers...');
    }
    
    // Catch all unhandled errors
    if (typeof window !== 'undefined') {
      window.addEventListener('error', (event) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('🚨 Global error detected:', event.message);
        }
        this.error(
          event.message || 'Unknown error',
          'GlobalErrorHandler',
          {
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            stack: event.error?.stack
          },
          'UNHANDLED_ERROR',
          event.error?.stack
        );
      });

      // Catch all unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('🚨 Promise rejection detected:', event.reason);
        }
        this.error(
          event.reason?.message || 'Unhandled promise rejection',
          'GlobalErrorHandler',
          {
            reason: event.reason,
            stack: event.reason?.stack
          },
          'UNHANDLED_PROMISE_REJECTION',
          event.reason?.stack
        );
      });

      // Catch React hydration errors specifically
      const originalConsoleError = console.error;
      console.error = (...args: any[]) => {
        originalConsoleError.apply(console, args);
        
        const message = args.join(' ');
        if (process.env.NODE_ENV === 'development') {
          console.log('🔍 Console error intercepted:', message);
        }
        
        if (message.includes('hydrated') || 
            message.includes('hydration') || 
            message.includes('Hydration') ||
            message.includes('server rendered HTML')) {
          if (process.env.NODE_ENV === 'development') {
            console.log('💧 Hydration error detected');
          }
          this.error(
            message,
            'ReactHydrationDetector',
            { originalArgs: args },
            'HYDRATION_MISMATCH'
          );
        }

        // Catch React hooks errors
        if (message.includes('Hooks') || 
            message.includes('hooks') ||
            message.includes('order of Hooks') ||
            message.includes('Rendered more hooks')) {
          if (process.env.NODE_ENV === 'development') {
            console.log('🪝 React hooks error detected');
          }
          this.error(
            message,
            'ReactHooksDetector',
            { originalArgs: args },
            'REACT_HOOKS_ERROR'
          );
        }

        // Catch React render errors
        if (message.includes('Render') ||
            message.includes('render') ||
            message.includes('Cannot read propert')) {
          if (process.env.NODE_ENV === 'development') {
            console.log('🎨 React render error detected');
          }
          this.error(
            message,
            'ReactRenderDetector',
            { originalArgs: args },
            'REACT_RENDER_ERROR'
          );
        }
      };

      // Catch Next.js specific errors
      const originalConsoleWarn = console.warn;
      console.warn = (...args: any[]) => {
        originalConsoleWarn.apply(console, args);
        
        const message = args.join(' ');
        if (process.env.NODE_ENV === 'development') {
          console.log('⚠️ Console warning intercepted:', message);
        }
        
        if (message.includes('Next.js') ||
            message.includes('Turbopack') ||
            message.includes('build error')) {
          this.warn(
            message,
            'NextJSDetector',
            { originalArgs: args }
          );
        }
      };
      
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Global error handlers setup complete');
      }
    }
  }

  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private createEntry(level: LogLevel, message: string, component?: string, details?: any, errorType?: string, stackTrace?: string): LogEntry {
    return {
      timestamp: this.formatTimestamp(),
      level,
      message,
      component,
      details,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      stackTrace,
      errorType,
      resolved: false
    };
  }

  addLog(level: LogLevel, message: string, component?: string, details?: any, errorType?: string, stackTrace?: string): void {
    const entry = this.createEntry(level, message, component, details, errorType, stackTrace);
    
    // Add to logs array
    this.logs.push(entry);
    
    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
    
    // Track unresolved errors
    if (level === 'ERROR') {
      const key = `${component || 'Unknown'}-${message}`;
      if (!this.unresolvedErrors.has(key)) {
        this.unresolvedErrors.set(key, []);
      }
      this.unresolvedErrors.get(key)!.push(entry);
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`📝 Error logged: ${key}`, entry);
      }
      
      // Trigger instant fix callback if set
      if (this.instantFixCallback) {
        if (process.env.NODE_ENV === 'development') {
          console.log('⚡ Triggering instant fix callback...');
        }
        setTimeout(() => {
          this.instantFixCallback!(entry);
        }, 100);
      } else {
        if (process.env.NODE_ENV === 'development') {
          console.warn('⚠️ No instant fix callback set');
        }
      }
    }
    
    // Console output
    this.logToConsole(entry);
  }

  private logToConsole(entry: LogEntry): void {
    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      const consoleMethod = entry.level === 'ERROR' ? 'error' : 
                          entry.level === 'WARN' ? 'warn' : 
                          entry.level === 'INFO' ? 'info' : 'debug';
      
      console[consoleMethod](`[${entry.level}] ${entry.component ? `[${entry.component}]` : ''} ${entry.message}`, entry.details || '');
    }
  }

  error(message: string, component?: string, details?: any, errorType?: string, stackTrace?: string): void {
    this.addLog('ERROR', message, component, details, errorType, stackTrace);
  }

  warn(message: string, component?: string, details?: any): void {
    this.addLog('WARN', message, component, details);
  }

  info(message: string, component?: string, details?: any): void {
    this.addLog('INFO', message, component, details);
  }

  debug(message: string, component?: string, details?: any): void {
    this.addLog('DEBUG', message, component, details);
  }

  // Get logs for debugging
  getLogs(level?: LogLevel, component?: string, limit?: number): LogEntry[] {
    let filtered = this.logs;

    if (level) {
      filtered = filtered.filter(log => log.level === level);
    }

    if (component) {
      filtered = filtered.filter(log => log.component === component);
    }

    if (limit) {
      filtered = filtered.slice(-limit);
    }

    return filtered;
  }

  // Get error summary
  getErrorSummary(): { [component: string]: number } {
    const errors = this.logs.filter(log => log.level === 'ERROR');
    const summary: { [component: string]: number } = {};

    errors.forEach(error => {
      const comp = error.component || 'Unknown';
      summary[comp] = (summary[comp] || 0) + 1;
    });

    return summary;
  }

  // Export logs to JSON (for debugging)
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  // Clear logs
  clear(): void {
    this.logs = [];
    this.unresolvedErrors.clear();
  }

  // Mark error as resolved
  resolveError(component: string, message: string): void {
    const key = `${component}:${message}`;
    const errors = this.unresolvedErrors.get(key);
    if (errors) {
      errors.forEach(error => {
        error.resolved = true;
      });
      this.unresolvedErrors.delete(key);
      this.info(`Error resolved: ${message}`, component, { resolvedCount: errors.length });
    }
  }
}

// Create singleton instance
export const logger = new Logger();

// Helper function for React components
export const logError = (message: string, component: string, details?: any, errorType?: string, stackTrace?: string) => {
  logger.error(message, component, details, errorType, stackTrace);
};

export const logWarn = (message: string, component: string, details?: any) => {
  logger.warn(message, component, details);
};

export const logInfo = (message: string, component: string, details?: any) => {
  logger.info(message, component, details);
};

export const logDebug = (message: string, component: string, details?: any) => {
  logger.debug(message, component, details);
};
