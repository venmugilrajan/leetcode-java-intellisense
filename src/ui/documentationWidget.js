export class DocumentationWidget {
  constructor(container) {
    this.container = container;
  }

  render(item) {
    if (!item) {
      this.container.innerHTML = '';
      return;
    }

    const signature = item.signature || item.detail || item.label;
    const doc = item.documentation || 'No documentation available.';

    this.container.innerHTML = `
      <div class="leetsense-doc-signature">${this.escapeHtml(signature)}</div>
      <div class="leetsense-doc-content">${this.escapeHtml(doc)}</div>
    `;
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
