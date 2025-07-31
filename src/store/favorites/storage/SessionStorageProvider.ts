import type { StorageProvider } from './types'

export class SessionStorageProvider implements StorageProvider {
  private prefix: string

  constructor(prefix = 'heroes_catalog_') {
    this.prefix = prefix
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`
  }

  async save(key: string, data: any): Promise<void> {
    try {
      const fullKey = this.getKey(key)
      sessionStorage.setItem(fullKey, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save to sessionStorage:', error)
      throw error
    }
  }

  async load(key: string): Promise<any> {
    try {
      const fullKey = this.getKey(key)
      const data = sessionStorage.getItem(fullKey)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Failed to load from sessionStorage:', error)
      return null
    }
  }

  async remove(key: string): Promise<void> {
    try {
      const fullKey = this.getKey(key)
      sessionStorage.removeItem(fullKey)
    } catch (error) {
      console.error('Failed to remove from sessionStorage:', error)
      throw error
    }
  }

  async clear(): Promise<void> {
    try {
      const keys = Object.keys(sessionStorage)
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          sessionStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.error('Failed to clear sessionStorage:', error)
      throw error
    }
  }

  async has(key: string): Promise<boolean> {
    try {
      const fullKey = this.getKey(key)
      return sessionStorage.getItem(fullKey) !== null
    } catch (error) {
      console.error('Failed to check sessionStorage:', error)
      return false
    }
  }
}
