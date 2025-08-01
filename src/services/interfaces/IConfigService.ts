export interface ApiConfig {
  baseUrl: string
  apiKey: string
  defaultPageSize: number
  maxPageSize: number
}

export interface CacheConfig {
  staleTime: number
  cacheTime: number
}

export interface RetryConfig {
  attempts: number
  delay: number
}

export interface TimeoutConfig {
  requestTimeout: number
  responseTimeout: number
}

export interface IConfigService {
  getApiConfig(): ApiConfig
  getCacheConfig(): CacheConfig
  getRetryConfig(): RetryConfig
  getTimeoutConfig(): TimeoutConfig
  isDevelopment(): boolean
  isProduction(): boolean
}
