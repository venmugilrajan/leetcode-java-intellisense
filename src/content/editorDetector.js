import { Logger } from '../utils/logger.js';

/**
 * EditorDetector searches for the active Monaco editor or textarea
 * in LeetCode's DOM, tracking both the editor container and cursor coordinates.
 */
export class EditorDetector {
  static findMonacoEditor() {
    // Check Monaco editor DOM elements
    const monacoContainers = document.querySelectorAll('.monaco-editor');
    if (monacoContainers.length > 0) {
      // Find the one that is currently visible or inside the main coding panel
      for (const container of monacoContainers) {
        if (container.offsetParent !== null) {
          const textarea = container.querySelector('textarea.inputarea');
          const cursor = container.querySelector('.cursors-layer .cursor');
          return {
            container,
            textarea,
            cursor,
            type: 'monaco'
          };
        }
      }
    }

    // Fallback: standard textarea if Monaco is not rendered yet
    const anyTextarea = document.querySelector('textarea');
    if (anyTextarea) {
      return {
        container: anyTextarea,
        textarea: anyTextarea,
        cursor: null,
        type: 'textarea'
      };
    }

    return null;
  }

  static detectLanguage() {
    // LeetCode UI usually displays selected language in a dropdown button
    // e.g. [data-cy="lang-select"], buttons with text "Java", "C++", etc.
    const buttons = document.querySelectorAll('button');
    for (const btn of buttons) {
      const text = btn.innerText?.trim()?.toLowerCase();
      if (text === 'java' || text === 'c++' || text === 'python' || text === 'python3' || text === 'javascript') {
        return text;
      }
    }

    // Check language selectors or attributes
    const langBtn = document.querySelector('[id*="headlessui-listbox-button"]');
    if (langBtn && langBtn.innerText) {
      const text = langBtn.innerText.trim().toLowerCase();
      if (text.includes('java')) return 'java';
      if (text.includes('python')) return 'python';
      if (text.includes('c++')) return 'cpp';
    }

    return 'java'; // Default target is Java
  }

  static getCursorCoordinates(editorInfo) {
    if (!editorInfo) return null;

    // 1. Monaco real visual cursor element
    if (editorInfo.cursor) {
      const rect = editorInfo.cursor.getBoundingClientRect();
      if (rect.width > 0 || rect.height > 0 || rect.top > 0) {
        return {
          top: rect.top,
          left: rect.left,
          height: rect.height || 18
        };
      }
    }

    // 2. Cursor element anywhere in editor container
    if (editorInfo.container) {
      const cursor = editorInfo.container.querySelector('.cursors-layer .cursor');
      if (cursor) {
        const rect = cursor.getBoundingClientRect();
        if (rect.top > 0 && rect.left > 0) {
          return {
            top: rect.top,
            left: rect.left,
            height: rect.height || 18
          };
        }
      }

      // 3. Fallback to active line or container
      const activeLine = editorInfo.container.querySelector('.view-line.current-line');
      if (activeLine) {
        const rect = activeLine.getBoundingClientRect();
        return {
          top: rect.top,
          left: rect.left + 80,
          height: rect.height || 18
        };
      }

      const rect = editorInfo.container.getBoundingClientRect();
      return {
        top: rect.top + 60,
        left: rect.left + 60,
        height: 20
      };
    }

    return null;
  }
}
