/**
 * This script runs in the page's MAIN world (window context)
 * to communicate directly with window.monaco if available.
 */
(function() {
  function hookMonaco() {
    if (window.monaco && window.monaco.editor) {
      window.__LEETSENSE_MONACO_AVAILABLE__ = true;

      // Intercept keydown in the page context for Enter and Tab when completion is visible
      window.addEventListener('keydown', (e) => {
        const widget = document.getElementById('leetsense-completion-widget');
        const isVisible = widget && !widget.classList.contains('hidden');

        if (isVisible && (e.key === 'Enter' || e.key === 'Tab')) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
      }, true);

      // Listen for text/cursor request or text insertion from content script
      window.addEventListener('message', (event) => {
        if (event.source !== window || !event.data) return;

        if (event.data.type === 'LEETSENSE_GET_STATE') {
          const editors = window.monaco.editor.getEditors();
          if (editors && editors.length > 0) {
            const activeEditor = editors.find(ed => ed.hasTextFocus()) || editors[0];
            const model = activeEditor.getModel();
            const position = activeEditor.getPosition();
            
            if (model && position) {
              const code = model.getValue();
              const offset = model.getOffsetAt(position);
              const coords = activeEditor.getScrolledVisiblePosition(position);

              window.postMessage({
                type: 'LEETSENSE_STATE_RESPONSE',
                code,
                offset,
                position,
                coords
              }, '*');
            }
          }
          return;
        }

        if (event.data.type === 'LEETSENSE_INSERT_TEXT') {
          const { text } = event.data;
          const editors = window.monaco.editor.getEditors();
          if (editors && editors.length > 0) {
            const activeEditor = editors.find(ed => ed.hasTextFocus()) || editors[0];
            const position = activeEditor.getPosition();
            const model = activeEditor.getModel();

            if (model && position) {
              const lineContent = model.getLineContent(position.lineNumber);
              
              // Scan backwards on current line to find the start of the token
              const textBefore = lineContent.substring(0, position.column - 1);
              const wordMatch = textBefore.match(/([a-zA-Z0-9_$]+)$/);
              const wordLen = wordMatch ? wordMatch[1].length : 0;
              const startCol = position.column - wordLen;

              // Read line indentation
              const indentMatch = lineContent.match(/^([ \t]*)/);
              const baseIndent = indentMatch ? indentMatch[1] : '';

              // Get editor tab size (e.g. 4 spaces)
              const tabSize = (model.getOptions && model.getOptions().tabSize) || 4;
              const innerIndent = baseIndent + ' '.repeat(tabSize);

              // Correctly format multiline text and braces according to baseIndent
              let formattedText = text;
              if (text.includes('\n')) {
                const rawLines = text.split('\n');
                const formattedLines = rawLines.map((line, idx) => {
                  if (idx === 0) {
                    return line; // First line keeps where startCol began
                  }
                  const trimmed = line.trim();
                  if (!trimmed) {
                    return '';
                  }
                  // Closing brace gets the exact same indentation as the opening line
                  if (trimmed.startsWith('}')) {
                    return baseIndent + trimmed;
                  }
                  // Body gets base indent + tab size
                  return innerIndent + trimmed;
                });
                formattedText = formattedLines.join('\n');
              }

              const range = new window.monaco.Range(
                position.lineNumber,
                startCol,
                position.lineNumber,
                position.column
              );

              // Execute edit in Monaco model
              activeEditor.executeEdits('leetsense', [{
                range: range,
                text: formattedText,
                forceMoveMarkers: true
              }]);

              // Place cursor inside the body if it's a multiline block
              if (text.includes('\n')) {
                const targetLine = position.lineNumber + 1;
                const targetCol = innerIndent.length + 1;
                activeEditor.setPosition({ lineNumber: targetLine, column: targetCol });
              } else {
                const targetCol = startCol + formattedText.length;
                activeEditor.setPosition({ lineNumber: position.lineNumber, column: targetCol });
              }

              activeEditor.focus();
            }
          }
        }
      });
    }
  }

  hookMonaco();
  const interval = setInterval(() => {
    if (window.monaco && window.monaco.editor) {
      hookMonaco();
      clearInterval(interval);
    }
  }, 1000);
})();
