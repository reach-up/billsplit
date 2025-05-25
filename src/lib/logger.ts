/**
 * Structured logging utility for BillSplit
 * Provides consistent log formatting and levels for the entire application
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogOptions {
  // Additional context data to include with the log
  context?: Record<string, any>;
  // Whether to include a timestamp (default: true)
  timestamp?: boolean;
  // Tags to categorize the log
  tags?: string[];
}

const defaultOptions: LogOptions = {
  timestamp: true,
  tags: [],
};

// Environment detection
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Creates a formatted log message with timestamp, level, and context
 */
function formatLog(level: LogLevel, message: string, options: LogOptions = {}): string {
  const { timestamp = true, context = {}, tags = [] } = { ...defaultOptions, ...options };
  
  const timestamp_str = timestamp ? `[${new Date().toISOString()}]` : '';
  const level_str = `[${level.toUpperCase()}]`;
  const tags_str = tags.length > 0 ? `[${tags.join(',')}]` : '';
  
  let contextStr = '';
  if (Object.keys(context).length > 0) {
    try {
      contextStr = ` ${JSON.stringify(context)}`;
    } catch (e) {
      contextStr = ' [Context serialization error]';
    }
  }
  
  return `${timestamp_str}${level_str}${tags_str} ${message}${contextStr}`;
}

/**
 * Logs a message at the specified level
 */
function log(level: LogLevel, message: string, options?: LogOptions) {
  const formattedMessage = formatLog(level, message, options);
  
  switch (level) {
    case 'debug':
      if (!isProduction) console.debug(formattedMessage);
      break;
    case 'info':
      console.log(formattedMessage);
      break;
    case 'warn':
      console.warn(formattedMessage);
      break;
    case 'error':
      console.error(formattedMessage);
      break;
  }
  
  // In a real production app, you might send logs to a service like Sentry, LogRocket, etc.
  // if (isProduction && (level === 'error' || level === 'warn')) {
  //   sendToLogService(level, message, options);
  // }
}

/**
 * Logger API
 */
export const logger = {
  debug: (message: string, options?: LogOptions) => log('debug', message, options),
  info: (message: string, options?: LogOptions) => log('info', message, options),
  warn: (message: string, options?: LogOptions) => log('warn', message, options),
  error: (message: string, options?: LogOptions) => log('error', message, options),
  
  // Specialized loggers with pre-configured tags
  api: {
    debug: (message: string, options?: LogOptions) => 
      log('debug', message, { ...options, tags: [...(options?.tags || []), 'api'] }),
    info: (message: string, options?: LogOptions) => 
      log('info', message, { ...options, tags: [...(options?.tags || []), 'api'] }),
    warn: (message: string, options?: LogOptions) => 
      log('warn', message, { ...options, tags: [...(options?.tags || []), 'api'] }),
    error: (message: string, options?: LogOptions) => 
      log('error', message, { ...options, tags: [...(options?.tags || []), 'api'] }),
  },
  
  ocr: {
    debug: (message: string, options?: LogOptions) => 
      log('debug', message, { ...options, tags: [...(options?.tags || []), 'ocr'] }),
    info: (message: string, options?: LogOptions) => 
      log('info', message, { ...options, tags: [...(options?.tags || []), 'ocr'] }),
    warn: (message: string, options?: LogOptions) => 
      log('warn', message, { ...options, tags: [...(options?.tags || []), 'ocr'] }),
    error: (message: string, options?: LogOptions) => 
      log('error', message, { ...options, tags: [...(options?.tags || []), 'ocr'] }),
  },
  
  app: {
    startup: (context: Record<string, any> = {}) => {
      log('info', 'Application starting', { 
        tags: ['startup'],
        context: {
          environment: process.env.NODE_ENV,
          version: process.env.npm_package_version || 'unknown',
          ...context
        }
      });
    },
    ready: () => log('info', 'Application ready', { tags: ['startup'] }),
  }
};

export default logger;
