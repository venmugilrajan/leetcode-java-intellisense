import { AutocompleteEngine } from '../autocomplete/autocompleteEngine.js';
import { EditorDetector } from './editorDetector.js';
import { LeetCodeObserver } from './leetcodeObserver.js';
import { CompletionWidget } from '../ui/completionWidget.js';
import { Logger } from '../utils/logger.js';
import { debounce } from '../utils/debounce.js';
import { JavaParser } from '../autocomplete/parser.js';
import { UpdateChecker } from '../utils/updateChecker.js';

class LeetSenseContent {
  constructor() {
    this.engine = new AutocompleteEngine();
    this.widget = null;
    this.currentEditor = null;
    this.observer = null;
    this.activeLanguage = 'java';
    this.lastQueryWord = '';

    this.init();
  }

  init() {
    Logger.info('Initializing LeetCode Java IntelliSense Extension...');

    // Run non-blocking check for GitHub updates
    UpdateChecker.checkForUpdates();

    this.widget = new CompletionWidget({
      onSelect: (item) => this.handleCompletionSelect(item)
    });

    this.observer = new LeetCodeObserver({
      onEditorFound: () => this.bindEditorEvents(),
      onUrlChange: () => this.handleUrlChange(),
      onLanguageChange: (lang) => this.setLanguage(lang)
    });
    this.observer.start();

    this.setupKeyboardListeners();
    this.bindEditorEvents();

    window.__LEETSENSE_DEBUG__ = false;
    window.__LEETSENSE__ = this;
  }

  handleUrlChange() {
    Logger.info('Handling URL/problem change...');
    this.widget.hide();
    this.currentEditor = null;
    setTimeout(() => this.bindEditorEvents(), 1000);
  }

  setLanguage(lang) {
    this.activeLanguage = lang;
    this.engine.setLanguage(lang);
    Logger.info('Language set to:', lang);
  }

  bindEditorEvents() {
    const editorInfo = EditorDetector.findMonacoEditor();
    if (!editorInfo || this.currentEditor?.container === editorInfo.container) {
      return;
    }

    this.currentEditor = editorInfo;
    Logger.info('Bound to editor instance:', editorInfo.type);

    const lang = EditorDetector.detectLanguage();
    this.setLanguage(lang);

    if (editorInfo.textarea) {
      const debouncedTrigger = debounce(() => this.triggerCompletion(), 80);

      editorInfo.textarea.addEventListener('input', () => {
        debouncedTrigger();
      });

      editorInfo.textarea.addEventListener('click', () => {
        this.widget.hide();
      });

      editorInfo.textarea.addEventListener('blur', () => {
        setTimeout(() => this.widget.hide(), 200);
      });
    }
  }

  setupKeyboardListeners() {
    // Intercept keyboard in capture phase to prevent Monaco from processing Enter/Tab
    window.addEventListener('keydown', (e) => {
      if (!this.widget || !this.widget.isVisible) {
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        this.widget.selectNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        this.widget.selectPrevious();
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        this.widget.acceptSelected();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        this.widget.hide();
      }
    }, true);
  }

  triggerCompletion() {
    if (this.activeLanguage !== 'java') {
      return;
    }

    const { code, offset } = this.getCurrentCodeAndOffset();
    if (offset < 0) return;

    if (window.__LEETSENSE_DEBUG__) {
      const symbols = JavaParser.extractSymbols(code, offset);
      console.log('%c[LeetSense Debug]', 'color: #38bdf8;', {
        language: this.activeLanguage,
        offset,
        symbols: symbols.getAll(),
        sampleBefore: code.slice(Math.max(0, offset - 20), offset)
      });
    }

    const completions = this.engine.getCompletions(code, offset);
    if (!completions || completions.length === 0) {
      this.widget.hide();
      return;
    }

    const textBefore = code.slice(0, offset);
    const memberMatch = textBefore.match(/\.([a-zA-Z0-9_$]*)$/);
    const wordMatch = textBefore.match(/([a-zA-Z0-9_$]+)$/);

    if (memberMatch) {
      this.lastQueryWord = memberMatch[1];
    } else if (wordMatch) {
      this.lastQueryWord = wordMatch[1];
    } else {
      this.lastQueryWord = '';
    }

    const coords = EditorDetector.getCursorCoordinates(this.currentEditor);
    if (coords) {
      this.widget.show(completions, coords);
    }
  }

  getCurrentCodeAndOffset() {
    if (this.currentEditor?.container) {
      const viewLines = this.currentEditor.container.querySelectorAll('.view-line');
      if (viewLines && viewLines.length > 0) {
        let code = '';
        let offset = 0;
        let foundCursor = false;

        const cursorEl = this.currentEditor.container.querySelector('.cursors-layer .cursor');
        const cursorRect = cursorEl ? cursorEl.getBoundingClientRect() : null;

        for (const lineEl of viewLines) {
          const lineText = lineEl.textContent || '';
          const lineRect = lineEl.getBoundingClientRect();

          if (!foundCursor && cursorRect && cursorRect.top >= lineRect.top - 2 && cursorRect.bottom <= lineRect.bottom + 6) {
            const colWidth = 8;
            const approxCol = Math.max(0, Math.min(lineText.length, Math.round((cursorRect.left - lineRect.left) / colWidth)));
            offset = code.length + approxCol;
            foundCursor = true;
          }

          code += lineText + '\n';
        }

        if (foundCursor) {
          return { code, offset };
        }
      }
    }

    if (this.currentEditor?.textarea) {
      const ta = this.currentEditor.textarea;
      return {
        code: ta.value || '',
        offset: ta.selectionEnd || (ta.value ? ta.value.length : 0)
      };
    }

    return { code: '', offset: -1 };
  }

  handleCompletionSelect(item) {
    Logger.info('Accepted completion:', item.label);
    const insertText = (item.insertText || '')
      .replace(/\$\{[0-9]+:([^}]*)\}/g, '$1')
      .replace(/\$[0-9]+/g, '');
    const replaceLength = this.lastQueryWord ? this.lastQueryWord.length : 0;

    // Send insertion request to Monaco MAIN world
    window.postMessage({
      type: 'LEETSENSE_INSERT_TEXT',
      text: insertText,
      replaceLength: replaceLength
    }, '*');

    // ONLY fallback if editor is not Monaco
    if (this.currentEditor?.type === 'textarea') {
      const ta = this.currentEditor.textarea;
      if (ta) {
        const val = ta.value;
        const start = ta.selectionStart - replaceLength;
        const end = ta.selectionEnd;
        if (start >= 0) {
          ta.value = val.substring(0, start) + insertText + val.substring(end);
          ta.selectionStart = ta.selectionEnd = start + insertText.length;
          ta.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    }
  }
}

new LeetSenseContent();
