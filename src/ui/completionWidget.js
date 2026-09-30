import { DocumentationWidget } from './documentationWidget.js';

export class CompletionWidget {
  constructor({ onSelect }) {
    this.onSelect = onSelect;
    this.items = [];
    this.selectedIndex = 0;
    this.isVisible = false;

    this.initDOM();
  }

  initDOM() {
    this.widget = document.createElement('div');
    this.widget.id = 'leetsense-completion-widget';
    this.widget.className = 'hidden';

    this.listContainer = document.createElement('div');
    this.listContainer.className = 'leetsense-list-container';

    this.docPanel = document.createElement('div');
    this.docPanel.className = 'leetsense-doc-panel';
    this.docWidget = new DocumentationWidget(this.docPanel);

    this.widget.appendChild(this.listContainer);
    this.widget.appendChild(this.docPanel);

    document.body.appendChild(this.widget);

    // Prevent clicking widget from losing editor focus
    this.widget.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  }

  show(items, coords) {
    if (!items || items.length === 0) {
      this.hide();
      return;
    }

    this.items = items;
    this.selectedIndex = 0;
    this.isVisible = true;

    this.renderList();
    this.position(coords);
    this.widget.classList.remove('hidden');
  }

  hide() {
    if (!this.isVisible) return;
    this.isVisible = false;
    this.widget.classList.add('hidden');
    this.items = [];
    this.selectedIndex = 0;
  }

  position(coords) {
    if (!coords) return;
    const { top, left, height = 20 } = coords;

    // Boundary detection
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let posX = left;
    let posY = top + height + 2;

    if (posX + 620 > viewportWidth) {
      posX = Math.max(10, viewportWidth - 630);
    }
    if (posY + 260 > viewportHeight) {
      posY = Math.max(10, top - 270);
    }

    this.widget.style.top = `${posY}px`;
    this.widget.style.left = `${posX}px`;
  }

  renderList() {
    this.listContainer.innerHTML = '';

    this.items.forEach((item, index) => {
      const el = document.createElement('div');
      el.className = `leetsense-item ${index === this.selectedIndex ? 'selected' : ''}`;
      
      const icon = this.getKindIcon(item.kind);
      const safeLabel = this.escapeHtml(item.label || '');
      el.innerHTML = `
        <span class="leetsense-icon ${item.kind || 'method'}">${icon}</span>
        <span class="leetsense-label">${safeLabel}</span>
      `;

      el.addEventListener('click', () => {
        this.selectedIndex = index;
        this.acceptSelected();
      });

      this.listContainer.appendChild(el);
    });

    this.updateSelection();
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  updateSelection() {
    const children = this.listContainer.children;
    for (let i = 0; i < children.length; i++) {
      if (i === this.selectedIndex) {
        children[i].classList.add('selected');
        children[i].scrollIntoView({ block: 'nearest' });
      } else {
        children[i].classList.remove('selected');
      }
    }

    const currentItem = this.items[this.selectedIndex];
    this.docWidget.render(currentItem);
  }

  selectNext() {
    if (!this.isVisible || this.items.length === 0) return;
    this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
    this.updateSelection();
  }

  selectPrevious() {
    if (!this.isVisible || this.items.length === 0) return;
    this.selectedIndex = (this.selectedIndex - 1 + this.items.length) % this.items.length;
    this.updateSelection();
  }

  acceptSelected() {
    if (!this.isVisible || this.items.length === 0) return;
    const selected = this.items[this.selectedIndex];
    this.hide();
    if (this.onSelect) {
      this.onSelect(selected);
    }
  }

  getKindIcon(kind) {
    switch (kind) {
      case 'method': return '🔷';
      case 'field': return '🔹';
      case 'class': return '🔶';
      case 'variable': return '🟣';
      case 'snippet': return '✂️';
      case 'keyword': return '🔑';
      default: return '▫️';
    }
  }
}
