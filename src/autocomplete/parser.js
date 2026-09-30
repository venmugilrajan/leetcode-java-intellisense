import { SymbolTable } from './symbolTable.js';

export class JavaParser {
  /**
   * Cleans code of comments and string literals so that completions
   * and type extractions don't get triggered falsely inside strings/comments.
   */
  static sanitizeCode(code) {
    let result = '';
    let inBlockComment = false;
    let inLineComment = false;
    let inString = false;
    let inChar = false;

    for (let i = 0; i < code.length; i++) {
      const ch = code[i];
      const next = i + 1 < code.length ? code[i + 1] : '';

      if (inBlockComment) {
        if (ch === '*' && next === '/') {
          inBlockComment = false;
          i++; // skip /
          result += '  ';
        } else {
          result += ch === '\n' ? '\n' : ' ';
        }
      } else if (inLineComment) {
        if (ch === '\n') {
          inLineComment = false;
          result += '\n';
        } else {
          result += ' ';
        }
      } else if (inString) {
        if (ch === '\\') {
          result += '  ';
          i++; // skip escaped char
        } else if (ch === '"') {
          inString = false;
          result += ' ';
        } else {
          result += ch === '\n' ? '\n' : ' ';
        }
      } else if (inChar) {
        if (ch === '\\') {
          result += '  ';
          i++; // skip escaped char
        } else if (ch === '\'') {
          inChar = false;
          result += ' ';
        } else {
          result += ' ';
        }
      } else {
        if (ch === '/' && next === '*') {
          inBlockComment = true;
          result += '  ';
          i++;
        } else if (ch === '/' && next === '/') {
          inLineComment = true;
          result += '  ';
          i++;
        } else if (ch === '"') {
          inString = true;
          result += ' ';
        } else if (ch === '\'') {
          inChar = true;
          result += ' ';
        } else {
          result += ch;
        }
      }
    }

    return result;
  }

  /**
   * Checks if a cursor offset in the original code falls inside a comment or string.
   */
  static isInsideCommentOrString(code, offset) {
    let inBlockComment = false;
    let inLineComment = false;
    let inString = false;
    let inChar = false;

    for (let i = 0; i < Math.min(offset, code.length); i++) {
      const ch = code[i];
      const next = i + 1 < code.length ? code[i + 1] : '';

      if (inBlockComment) {
        if (ch === '*' && next === '/') {
          inBlockComment = false;
          i++;
        }
      } else if (inLineComment) {
        if (ch === '\n') {
          inLineComment = false;
        }
      } else if (inString) {
        if (ch === '\\') {
          i++;
        } else if (ch === '"') {
          inString = false;
        }
      } else if (inChar) {
        if (ch === '\\') {
          i++;
        } else if (ch === '\'') {
          inChar = false;
        }
      } else {
        if (ch === '/' && next === '*') {
          inBlockComment = true;
          i++;
        } else if (ch === '/' && next === '/') {
          inLineComment = true;
          i++;
        } else if (ch === '"') {
          inString = true;
        } else if (ch === '\'') {
          inChar = true;
        }
      }
    }

    return inBlockComment || inLineComment || inString || inChar;
  }

  /**
   * Parse Java variable declarations, parameters, fields from code up to offset
   * or the whole file, returning a populated SymbolTable.
   */
  static extractSymbols(code, upToOffset = code.length) {
    const symbols = new SymbolTable();
    const cleanCode = this.sanitizeCode(code.slice(0, upToOffset));

    // Regex 1: Generic or Type declarations:
    // e.g. HashMap<Integer, String> map = ...;
    // Map<String, List<Integer>> map;
    // ArrayList<Integer> list = new ArrayList<>();
    // ListNode node;
    // int[] nums;
    // String s = "hello";
    // int a = 5, b = 10;
    
    // Pattern breakdown:
    // Group 1: Raw Type Name (e.g. HashMap, List, int, String, ListNode)
    // Group 2: Generics part including <...> (e.g. <Integer, String>)
    // Group 3: Array brackets []
    // Group 4: Variable name
    const declRegex = /\b([A-Z][a-zA-Z0-9_]*|int|long|double|float|boolean|char|byte|short)\s*(<[^>]+>)?\s*(\[\s*\])?\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;

    let match;
    while ((match = declRegex.exec(cleanCode)) !== null) {
      const rawType = match[1];
      const genericStr = match[2] || '';
      const isArrayBracket = !!match[3];
      const varName = match[4];

      // Ignore language keywords that look like types in certain syntax
      if (['return', 'class', 'public', 'private', 'protected', 'static', 'final', 'throw', 'new'].includes(rawType)) {
        continue;
      }
      if (['return', 'class', 'public', 'private', 'protected', 'static', 'final', 'throw', 'new', 'if', 'for', 'while'].includes(varName)) {
        continue;
      }

      const isArray = isArrayBracket || rawType.endsWith('[]');
      const effectiveType = isArray ? 'Array' : rawType;

      symbols.set(varName, {
        rawType: effectiveType,
        originalType: rawType + (isArray ? '[]' : '') + genericStr,
        genericArgs: genericStr,
        isArray
      });
    }

    // Method parameter extraction:
    // e.g. public int[] twoSum(int[] nums, int target)
    const paramRegex = /\(([^)]*)\)/g;
    while ((match = paramRegex.exec(cleanCode)) !== null) {
      const paramList = match[1];
      const params = paramList.split(',');
      for (let p of params) {
        p = p.trim();
        if (!p) continue;
        const pMatch = p.match(/([A-Z][a-zA-Z0-9_]*|int|long|double|float|boolean|char|byte|short)\s*(<[^>]+>)?\s*(\[\s*\])?\s+([a-zA-Z_$][a-zA-Z0-9_$]*)$/);
        if (pMatch) {
          const rawType = pMatch[1];
          const genericStr = pMatch[2] || '';
          const isArrayBracket = !!pMatch[3];
          const varName = pMatch[4];
          const isArray = isArrayBracket;

          symbols.set(varName, {
            rawType: isArray ? 'Array' : rawType,
            originalType: rawType + (isArray ? '[]' : '') + genericStr,
            genericArgs: genericStr,
            isArray
          });
        }
      }
    }

    return symbols;
  }
}
