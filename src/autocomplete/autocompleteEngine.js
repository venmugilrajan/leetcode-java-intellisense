import { JavaProvider } from '../languages/java/JavaProvider.js';

export class AutocompleteEngine {
  constructor() {
    this.providers = new Map();
    this.registerProvider('java', new JavaProvider());
    this.currentLanguage = 'java';
  }

  registerProvider(lang, provider) {
    this.providers.set(lang.toLowerCase(), provider);
  }

  setLanguage(lang) {
    this.currentLanguage = (lang || 'java').toLowerCase();
  }

  getCompletions(code, offset) {
    const provider = this.providers.get(this.currentLanguage);
    if (!provider) {
      return [];
    }
    return provider.provideCompletions(code, offset);
  }
}
