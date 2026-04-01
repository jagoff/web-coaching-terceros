/**
 * Debug Logger - Sistema centralizado de logging con niveles y control por ambiente
 * Solo muestra logs en desarrollo, silencioso en producción
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogConfig {
  enabled: boolean;
  level: LogLevel;
  timestamp: boolean;
  component: boolean;
}

class DebugLogger {
  private config: LogConfig;
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.config = {
      enabled: this.isDevelopment,
      level: 'debug',
      timestamp: true,
      component: true,
    };
  }

  private shouldLog(level: LogLevel): boolean {
    if (!this.config.enabled) return false;
    
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this.config.level);
    const messageLevelIndex = levels.indexOf(level);
    
    return messageLevelIndex >= currentLevelIndex;
  }

  private formatMessage(level: LogLevel, component: string, message: string, data?: any): string {
    const parts: string[] = [];
    
    if (this.config.timestamp) {
      parts.push(`[${new Date().toISOString()}]`);
    }
    
    parts.push(`[${level.toUpperCase()}]`);
    
    if (this.config.component && component) {
      parts.push(`[${component}]`);
    }
    
    parts.push(message);
    
    return parts.join(' ');
  }

  debug(component: string, message: string, data?: any) {
    if (!this.shouldLog('debug')) return;
    
    const formattedMessage = this.formatMessage('debug', component, message, data);
    console.log(formattedMessage, data || '');
  }

  info(component: string, message: string, data?: any) {
    if (!this.shouldLog('info')) return;
    
    const formattedMessage = this.formatMessage('info', component, message, data);
    console.info(formattedMessage, data || '');
  }

  warn(component: string, message: string, data?: any) {
    if (!this.shouldLog('warn')) return;
    
    const formattedMessage = this.formatMessage('warn', component, message, data);
    console.warn(formattedMessage, data || '');
  }

  error(component: string, message: string, error?: any) {
    if (!this.shouldLog('error')) return;
    
    const formattedMessage = this.formatMessage('error', component, message, error);
    console.error(formattedMessage, error || '');
    
    // En producción, aquí podrías enviar a un servicio de error tracking
    // como Sentry, LogRocket, etc.
  }

  // Método especial para performance tracking
  performance(component: string, label: string, callback: () => void) {
    if (!this.isDevelopment) {
      callback();
      return;
    }

    const start = performance.now();
    callback();
    const end = performance.now();
    
    this.debug(component, `Performance: ${label}`, { duration: `${(end - start).toFixed(2)}ms` });
  }

  // Método para agrupar logs relacionados
  group(component: string, label: string, callback: () => void) {
    if (!this.isDevelopment) {
      callback();
      return;
    }

    console.group(this.formatMessage('info', component, label));
    callback();
    console.groupEnd();
  }
}

// Exportar instancia singleton
export const logger = new DebugLogger();

// Exports de conveniencia
export const debugLog = (component: string, message: string, data?: any) => 
  logger.debug(component, message, data);

export const infoLog = (component: string, message: string, data?: any) => 
  logger.info(component, message, data);

export const warnLog = (component: string, message: string, data?: any) => 
  logger.warn(component, message, data);

export const errorLog = (component: string, message: string, error?: any) => 
  logger.error(component, message, error);
