export interface StorageProvider {
  save(key: string, data: unknown): Promise<void>
  load(key: string): Promise<unknown>
  remove(key: string): Promise<void>
  clear(): Promise<void>
  has(key: string): Promise<boolean>
}

export interface StorageConfig {
  provider: StorageProvider
  prefix?: string
}
