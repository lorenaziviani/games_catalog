import type { StorageConfig, StorageProvider } from './types'

export class StorageService {
  private provider: StorageProvider
  private prefix: string

  constructor(config: StorageConfig) {
    this.provider = config.provider
    this.prefix = config.prefix || ''
  }

  async save(key: string, data: any): Promise<void> {
    const fullKey = this.prefix ? `${this.prefix}_${key}` : key
    await this.provider.save(fullKey, data)
  }

  async load(key: string): Promise<any> {
    const fullKey = this.prefix ? `${this.prefix}_${key}` : key
    return await this.provider.load(fullKey)
  }

  async remove(key: string): Promise<void> {
    const fullKey = this.prefix ? `${this.prefix}_${key}` : key
    await this.provider.remove(fullKey)
  }

  async clear(): Promise<void> {
    await this.provider.clear()
  }

  async has(key: string): Promise<boolean> {
    const fullKey = this.prefix ? `${this.prefix}_${key}` : key
    return await this.provider.has(fullKey)
  }

  setProvider(provider: StorageProvider): void {
    this.provider = provider
  }

  async migrateToProvider(
    newProvider: StorageProvider,
    keys: string[]
  ): Promise<void> {
    const oldProvider = this.provider

    for (const key of keys) {
      const fullKey = this.prefix ? `${this.prefix}_${key}` : key
      const data = await oldProvider.load(fullKey)
      if (data !== null) {
        await newProvider.save(fullKey, data)
      }
    }

    this.provider = newProvider
  }
}
