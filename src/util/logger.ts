/* eslint-disable @typescript-eslint/no-explicit-any */
import { InspectOptions } from 'util';

type LogFn = (message?: any, ...optionalParams: any[]) => void;

const logLevels = [
  'log' as const,
  'warn' as const,
  'error' as const,
  'off' as const,
];
type LogLevel = (typeof logLevels)[number];

export class Logger {
  static for(prefix?: string) {
    return new Logger(prefix);
  }

  private logPrefix = '';
  logLevel: LogLevel = 'log';
  constructor(logPrefix?: string, logLevel?: LogLevel) {
    this.logLevel = logLevel ?? 'log';
    if (logPrefix) {
      this.logPrefix = `[${logPrefix}]: `;
    }
  }

  private shouldLog(logLevel: LogLevel) {
    const current = logLevels.indexOf(this.logLevel);
    const wanted = logLevels.indexOf(logLevel);
    return current <= wanted;
  }

  get log(): LogFn {
    if (!this.shouldLog('log')) {
      return () => void 0;
    }
    const logPrefix = this.logPrefix;
    if (logPrefix.length) {
      return console.log.bind(console, logPrefix);
    } else {
      return console.log.bind(console);
    }
  }

  get warn(): LogFn {
    if (!this.shouldLog('warn')) {
      return () => void 0;
    }
    const logPrefix = this.logPrefix;
    if (logPrefix.length) {
      return console.warn.bind(console, logPrefix);
    } else {
      return console.warn.bind(console);
    }
  }

  get dir(): (obj?: any, options?: InspectOptions) => void {
    if (!this.shouldLog('log')) {
      return () => void 0;
    }
    const logPrefix = this.logPrefix;
    if (logPrefix.length) {
      return console.dir.bind(console, logPrefix);
    } else {
      return console.dir.bind(console);
    }
  }

  get error(): LogFn {
    if (!this.shouldLog('error')) {
      return () => void 0;
    }
    const logPrefix = this.logPrefix;
    if (logPrefix.length) {
      return console.error.bind(console, logPrefix);
    } else {
      return console.error.bind(console);
    }
  }
}
