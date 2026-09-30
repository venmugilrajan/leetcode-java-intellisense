export class Logger {
  static get isDebug() {
    return !!window.__LEETSENSE_DEBUG__;
  }

  static log(...args) {
    if (this.isDebug) {
      console.log('%c[LeetSense]', 'color: #38bdf8; font-weight: bold;', ...args);
    }
  }

  static info(...args) {
    console.info('%c[LeetSense]', 'color: #34d399; font-weight: bold;', ...args);
  }

  static warn(...args) {
    console.warn('%c[LeetSense]', 'color: #fbbf24; font-weight: bold;', ...args);
  }

  static error(...args) {
    console.error('%c[LeetSense]', 'color: #f87171; font-weight: bold;', ...args);
  }
}
