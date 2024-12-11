// Simple in-memory database for development
export class Database {
  private static instance: Database
  private store: Map<string, any>

  private constructor() {
    this.store = new Map()
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  set(key: string, value: any): void {
    this.store.set(key, value)
  }

  get(key: string): any {
    return this.store.get(key)
  }

  delete(key: string): boolean {
    return this.store.delete(key)
  }

  clear(): void {
    this.store.clear()
  }
}

export const db = Database.getInstance()