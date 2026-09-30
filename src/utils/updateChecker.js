import { Logger } from './logger.js';

export class UpdateChecker {
  /**
   * Configure repository and check interval.
   * Default repository: update this with your actual GitHub username/repo
   */
  static GITHUB_REPO = 'leetcode-java-intellisense';
  static GITHUB_OWNER = 'ruthr'; // Can be adjusted or configured
  static STORAGE_KEY = 'leetsense_last_update_check';
  static CHECK_INTERVAL_MS = 6 * 60 * 60 * 1000; // Check once every 6 hours

  static async checkForUpdates() {
    try {
      const now = Date.now();
      const lastCheck = parseInt(localStorage.getItem(this.STORAGE_KEY) || '0', 10);

      // Only check once per interval to avoid hitting GitHub rate limits
      if (now - lastCheck < this.CHECK_INTERVAL_MS) {
        return;
      }
      localStorage.setItem(this.STORAGE_KEY, String(now));

      const manifest = chrome.runtime.getManifest();
      const currentVersion = manifest.version;

      // Check GitHub releases or tags
      const apiUrl = `https://api.github.com/repos/${this.GITHUB_OWNER}/${this.GITHUB_REPO}/releases/latest`;
      const res = await fetch(apiUrl, {
        headers: { 'Accept': 'application/vnd.github.v3+json' }
      });

      if (!res.ok) {
        return;
      }

      const data = await res.json();
      const latestTag = data.tag_name || data.name || '';
      const latestVersion = latestTag.replace(/^v/, '').trim();
      const releaseUrl = data.html_url || `https://github.com/${this.GITHUB_OWNER}/${this.GITHUB_REPO}/releases`;

      if (latestVersion && this.isNewerVersion(latestVersion, currentVersion)) {
        Logger.info(`New version available: v${latestVersion} (current: v${currentVersion})`);
        this.showUpdateBanner(latestVersion, releaseUrl);
      }
    } catch (e) {
      Logger.warn('Unable to check for GitHub updates:', e?.message || e);
    }
  }

  static isNewerVersion(remote, local) {
    const rParts = remote.split('.').map(n => parseInt(n, 10) || 0);
    const lParts = local.split('.').map(n => parseInt(n, 10) || 0);
    const maxLen = Math.max(rParts.length, lParts.length);

    for (let i = 0; i < maxLen; i++) {
      const r = rParts[i] || 0;
      const l = lParts[i] || 0;
      if (r > l) return true;
      if (r < l) return false;
    }
    return false;
  }

  static showUpdateBanner(newVersion, releaseUrl) {
    if (document.getElementById('leetsense-update-banner')) {
      return;
    }

    const banner = document.createElement('div');
    banner.id = 'leetsense-update-banner';
    banner.innerHTML = `
      <div class="leetsense-update-content">
        <span class="leetsense-update-icon">⚡</span>
        <span class="leetsense-update-text">
          <strong>LeetCode IntelliSense update available (v${newVersion})!</strong>
        </span>
        <a href="${releaseUrl}" target="_blank" rel="noopener noreferrer" class="leetsense-update-btn">
          View & Update
        </a>
        <button type="button" class="leetsense-update-close" aria-label="Dismiss">&times;</button>
      </div>
    `;

    banner.querySelector('.leetsense-update-close').addEventListener('click', () => {
      banner.remove();
    });

    document.body.appendChild(banner);
  }
}
