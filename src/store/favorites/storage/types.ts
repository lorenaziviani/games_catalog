export interface StorageProvider {
  save(key: string, data: any): Promise<void>
  load(key: string): Promise<any>
  remove(key: string): Promise<void>
  clear(): Promise<void>
  has(key: string): Promise<boolean>
}

export interface StorageConfig {
  provider: StorageProvider
  prefix?: string
}
