/**
 * Development Logger - Only logs in development, completely removed in production
 * This utility ensures zero console output in production builds
 */

const isDev = process.env.NODE_ENV === 'development';

export const devLog = {
  log: isDev ? console.log.bind(console) : () => {},
  warn: isDev ? console.warn.bind(console) : () => {},
  error: isDev ? console.error.bind(console) : () => {},
  info: isDev ? console.info.bind(console) : () => {},
  debug: isDev ? console.debug.bind(console) : () => {},
  table: isDev ? console.table.bind(console) : () => {},
  group: isDev ? console.group.bind(console) : () => {},
  groupEnd: isDev ? console.groupEnd.bind(console) : () => {},
  groupCollapsed: isDev ? console.groupCollapsed.bind(console) : () => {},
};

export default devLog;
