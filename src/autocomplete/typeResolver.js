import { JAVA_CLASSES } from '../languages/java/javaClasses.js';

export class TypeResolver {
  /**
   * Resolves members (methods, fields) for a given class or primitive type.
   * Walks up inheritance chains (e.g. HashMap -> Map).
   */
  static getMembersForType(typeName, isStatic = false) {
    const members = [];
    const visited = new Set();

    let current = typeName;
    while (current && !visited.has(current)) {
      visited.add(current);
      const classDef = JAVA_CLASSES[current];
      if (!classDef) break;

      // Add fields
      if (classDef.fields) {
        for (const [fieldName, fieldInfo] of Object.entries(classDef.fields)) {
          members.push({
            name: fieldName,
            kind: 'field',
            signature: fieldInfo.sig || fieldName,
            detail: `${current}.${fieldName}`,
            documentation: fieldInfo.doc || '',
            insertText: fieldName
          });
        }
      }

      // Add methods
      if (classDef.methods) {
        for (const [methodName, methodInfo] of Object.entries(classDef.methods)) {
          if (isStatic && !methodInfo.isStatic) continue;
          if (!isStatic && methodInfo.isStatic) continue;

          members.push({
            name: methodName,
            kind: 'method',
            signature: methodInfo.sig || `${methodName}()`,
            detail: `${current}.${methodName}`,
            documentation: methodInfo.doc || '',
            insertText: `${methodName}($0)`
          });
        }
      }

      current = classDef.inherits;
    }

    return members;
  }
}
