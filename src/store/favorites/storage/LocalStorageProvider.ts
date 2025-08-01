import type { StorageProvider } from './types'

export class LocalStorageProvider implements StorageProvider {
  private prefix: string

  constructor(prefix = 'heroes_catalog_') {
    this.prefix = prefix
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }

  async save(key: string, data: unknown): Promise<void> {
    try {
      const fullKey = this.getKey(key)
      localStorage.setItem(fullKey, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
      throw error
    }
  }

  async load(key: string): Promise<unknown> {
    try {
      const fullKey = this.getKey(key)
      const data = localStorage.getItem(fullKey)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Failed to load from localStorage:', error)
      return null
    }
  }

  async remove(key: string): Promise<void> {
    try {
      const fullKey = this.getKey(key)
      localStorage.removeItem(fullKey)
    } catch (error) {
      console.error('Failed to remove from localStorage:', error)
      throw error
    }
  }

  async clear(): Promise<void> {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error('Failed to clear localStorage:', error)
      throw error
    }
  }

  async has(key: string): Promise<boolean> {
    try {
      const fullKey = this.getKey(key)
      return localStorage.getItem(fullKey) !== null
    } catch (error) {
      console.error('Failed to check localStorage:', error)
      return false
    }
  }
}
