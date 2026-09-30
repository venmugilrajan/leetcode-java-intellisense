import { JAVA_CLASSES } from './javaClasses.js';
import { JAVA_KEYWORDS, JAVA_SNIPPETS } from './javaSnippets.js';
import { TypeResolver } from '../../autocomplete/typeResolver.js';
import { JavaParser } from '../../autocomplete/parser.js';

export class JavaProvider {
  constructor() {
    this.name = 'java';
  }

  /**
   * Main completion entry point.
   */
  provideCompletions(code, offset) {
    if (JavaParser.isInsideCommentOrString(code, offset)) {
      return [];
    }

    const textBeforeCursor = code.slice(0, offset);

    // Check dot access: e.g. "map." or "map.pu" or "Arrays." or "Math.ab"
    const dotMatch = textBeforeCursor.match(/([a-zA-Z0-9_$]+)\.([a-zA-Z0-9_$]*)$/);
    if (dotMatch) {
      const targetName = dotMatch[1];
      const memberPrefix = dotMatch[2] || '';
      return this.resolveMemberCompletions(code, offset, targetName, memberPrefix);
    }

    // Check word prefix for keywords, snippets, classes, local variables
    const wordMatch = textBeforeCursor.match(/([a-zA-Z0-9_$]+)$/);
    const prefix = wordMatch ? wordMatch[1] : '';

    return this.resolveGeneralCompletions(code, offset, prefix);
  }

  resolveMemberCompletions(code, offset, targetName, memberPrefix) {
    const isTargetCapitalized = targetName[0] >= 'A' && targetName[0] <= 'Z';

    if (isTargetCapitalized && JAVA_CLASSES[targetName]) {
      const members = TypeResolver.getMembersForType(targetName, true);
      return this.filterAndFormatMembers(members, memberPrefix);
    }

    const symbols = JavaParser.extractSymbols(code, offset);
    const varInfo = symbols.get(targetName);

    if (varInfo) {
      const typeName = varInfo.rawType;
      const members = TypeResolver.getMembersForType(typeName, false);
      return this.filterAndFormatMembers(members, memberPrefix);
    }

    if (JAVA_CLASSES[targetName]) {
      const members = TypeResolver.getMembersForType(targetName, false);
      return this.filterAndFormatMembers(members, memberPrefix);
    }

    return [];
  }

  filterAndFormatMembers(members, memberPrefix) {
    const prefixLower = memberPrefix.toLowerCase();
    const filtered = members.filter(m => m.name.toLowerCase().startsWith(prefixLower));

    return filtered.map(m => ({
      label: m.name,
      kind: m.kind,
      signature: m.signature,
      detail: m.detail,
      documentation: m.documentation,
      insertText: m.insertText
    }));
  }

  resolveGeneralCompletions(code, offset, prefix) {
    if (!prefix) return [];
    const prefixLower = prefix.toLowerCase();
    const suggestions = [];

    // 1. Snippets (e.g. sout, syso, fori, forr, foreach, psvm, if, try, collections)
    for (const snippet of JAVA_SNIPPETS) {
      if (snippet.prefix.toLowerCase().startsWith(prefixLower)) {
        suggestions.push({
          label: snippet.label,
          kind: 'snippet',
          signature: snippet.detail,
          detail: 'Snippet: ' + snippet.detail,
          documentation: snippet.documentation,
          insertText: snippet.insertText
        });
      }
    }

    // 2. Local variables in scope
    const symbols = JavaParser.extractSymbols(code, offset);
    for (const v of symbols.getAll()) {
      if (v.name.toLowerCase().startsWith(prefixLower) && v.name !== prefix) {
        suggestions.push({
          label: v.name,
          kind: 'variable',
          signature: `${v.originalType} ${v.name}`,
          detail: `Local variable: ${v.originalType}`,
          documentation: `Variable '${v.name}' of type ${v.originalType}`,
          insertText: v.name
        });
      }
    }

    // 3. Known Java classes
    for (const [className, classDef] of Object.entries(JAVA_CLASSES)) {
      if (className.toLowerCase().startsWith(prefixLower)) {
        suggestions.push({
          label: className,
          kind: 'class',
          signature: `class ${className}`,
          detail: `${classDef.package ? classDef.package + '.' : ''}${className}`,
          documentation: classDef.description || '',
          insertText: className
        });
      }
    }

    // 4. Java keywords
    for (const kw of JAVA_KEYWORDS) {
      if (kw.startsWith(prefixLower) && kw !== prefix) {
        suggestions.push({
          label: kw,
          kind: 'keyword',
          signature: `keyword ${kw}`,
          detail: `Java keyword`,
          documentation: `Java reserved keyword '${kw}'.`,
          insertText: kw
        });
      }
    }

    return suggestions;
  }
}
