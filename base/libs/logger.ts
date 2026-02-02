/**
 * Sanitizes a value to prevent log injection attacks
 * Escapes newlines, carriage returns, tabs, and removes control characters
 */
const sanitizeForLog = (value: any): any => {
  if (value === null || value === undefined) {
    return value;
  }

  if (typeof value === 'string') {
    const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;
    const CR = String.fromCodePoint(13);
    const LF = String.fromCodePoint(10);
    const TAB = String.fromCodePoint(9);
    return value
      .replaceAll(CR, String.raw`\\r`)
      .replaceAll(LF, String.raw`\\n`)
      .replaceAll(TAB, String.raw`\\t`)
      .replace(CONTROL_CHARS, ''); // Remove other control characters
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeForLog);
  }

  if (typeof value === 'object') {
    const sanitized: any = {};
    const recordValue = value as Record<string, unknown>;
    for (const key in recordValue) {
      if (Object.prototype.hasOwnProperty.call(recordValue, key)) {
        const sanitizedKey = typeof key === 'string' ? sanitizeForLog(key) : key;
        sanitized[sanitizedKey] = sanitizeForLog(recordValue[key]);
      }
    }
    return sanitized;
  }

  return value;
};

const logWith =
  (method: 'debug' | 'info' | 'warn' | 'error') =>
  (...args: any[]) => {
    const sanitizedArgs = args.map(sanitizeForLog);
    const fn = (console as any)[method] || console.log;
    fn(...sanitizedArgs);
  };

/**
 * Console-based logger with automatic sanitization.
 * Keeps the same `Log` API used across the app.
 */
export const Log = {
  debug: logWith('debug'),
  info: logWith('info'),
  warn: logWith('warn'),
  error: logWith('error'),
};
