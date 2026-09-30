import { Logger } from '../utils/logger.js';

export class LeetCodeObserver {
  constructor({ onEditorFound, onUrlChange, onLanguageChange }) {
    this.onEditorFound = onEditorFound;
    this.onUrlChange = onUrlChange;
    this.onLanguageChange = onLanguageChange;

    this.lastUrl = location.href;
    this.observer = null;
    this.pollInterval = null;
  }

  start() {
    Logger.info('Starting LeetCode observer for SPA navigation and editor creation...');

    // 1. Observe DOM mutations for SPA route changes and Monaco creation
    this.observer = new MutationObserver(() => {
      this.checkUrl();
    });

    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // 2. Periodic poll for editor detection / reloads
    this.pollInterval = setInterval(() => {
      this.checkUrl();
      if (this.onEditorFound) {
        this.onEditorFound();
      }
    }, 1000);
  }

  checkUrl() {
    if (location.href !== this.lastUrl) {
      Logger.info('SPA URL changed:', location.href);
      this.lastUrl = location.href;
      if (this.onUrlChange) {
        this.onUrlChange(location.href);
      }
    }
  }

  stop() {
    if (this.observer) this.observer.disconnect();
    if (this.pollInterval) clearInterval(this.pollInterval);
  }
}
