export class SymbolTable {
  constructor() {
    this.variables = new Map(); // name -> { type, rawType, genericArgs, isArray }
  }

  set(name, typeInfo) {
    this.variables.set(name, typeInfo);
  }

  get(name) {
    return this.variables.get(name);
  }

  has(name) {
    return this.variables.has(name);
  }

  clear() {
    this.variables.clear();
  }

  getAll() {
    return Array.from(this.variables.entries()).map(([name, info]) => ({
      name,
      ...info
    }));
  }
}
