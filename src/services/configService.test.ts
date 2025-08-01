import { env, getCacheConfig, getRetryConfig } from '@/config/env'
import { EnvironmentsType } from '@/types/common'
import { configService } from './configService'

jest.mock('@/config/env', () => ({
  env: {
    RAWG_API_BASE_URL: 'https://api.rawg.io/api',
    RAWG_API_KEY: 'test-api-key',
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 50,
    APP_ENV: 'development',
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000
  },
  getCacheConfig: jest.fn(() => ({
    duration: 300000,
    maxSize: 100
  })) as jest.MockedFunction<() => { duration: number; maxSize: number }>,
  getRetryConfig: jest.fn(() => ({
    attempts: 3,
    delay: 1000
  })) as jest.MockedFunction<() => { attempts: number; delay: number }>
}))

describe('configService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getApiConfig', () => {
    it('deve retornar configuração da API corretamente', () => {
      const config = configService.getApiConfig()

      expect(config).toEqual({
        baseUrl: 'https://api.rawg.io/api',
        apiKey: 'test-api-key',
        defaultPageSize: 20,
        maxPageSize: 50
      })
    })

    it('deve usar valores das variáveis de ambiente', () => {
      const config = configService.getApiConfig()

      expect(config.baseUrl).toBe('https://api.rawg.io/api')
      expect(config.apiKey).toBe('test-api-key')
      expect(config.defaultPageSize).toBe(20)
      expect(config.maxPageSize).toBe(50)
    })
  })

  describe('getCacheConfig', () => {
    it('deve retornar configuração de cache', () => {
      const config = configService.getCacheConfig()

      expect(config).toEqual({
        duration: 300000,
        maxSize: 100
      })
    })

    it('deve chamar getCacheConfig do env', () => {
      ;(getCacheConfig as any).mockClear()
      configService.getCacheConfig()
      expect(getCacheConfig).toHaveBeenCalled()
    })
  })

  describe('getRetryConfig', () => {
    it('deve retornar configuração de retry', () => {
      const config = configService.getRetryConfig()

      expect(config).toEqual({
        attempts: 3,
        delay: 1000
      })
    })

    it('deve chamar getRetryConfig do env', () => {
      ;(getRetryConfig as any).mockClear()
      configService.getRetryConfig()
      expect(getRetryConfig).toHaveBeenCalled()
    })
  })

  describe('getTimeoutConfig', () => {
    it('deve retornar configuração de timeout para desenvolvimento', () => {
      const config = configService.getTimeoutConfig()

      expect(config).toEqual({
        timeout: 5000,
        retryAttempts: 3,
        retryDelay: 1000
      })
    })

    it('deve usar timeout maior para produção', () => {
      env.APP_ENV = EnvironmentsType.PRODUCTION
      const config = configService.getTimeoutConfig()
      expect(config.timeout).toBe(10000)
      env.APP_ENV = 'development'
    })
  })

  describe('isDevelopment', () => {
    it('deve retornar true para ambiente de desenvolvimento', () => {
      const isDev = configService.isDevelopment()

      expect(isDev).toBe(true)
    })

    it('deve retornar false para ambiente de produção', () => {
      env.APP_ENV = EnvironmentsType.PRODUCTION
      const isDev = configService.isDevelopment()
      expect(isDev).toBe(false)
      env.APP_ENV = 'development'
    })
  })

  describe('isProduction', () => {
    it('deve retornar false para ambiente de desenvolvimento', () => {
      const isProd = configService.isProduction()

      expect(isProd).toBe(false)
    })

    it('deve retornar true para ambiente de produção', () => {
      env.APP_ENV = EnvironmentsType.PRODUCTION
      const isProd = configService.isProduction()
      expect(isProd).toBe(true)
      env.APP_ENV = 'development'
    })
  })

  describe('Integração', () => {
    it('deve fornecer configurações consistentes', () => {
      const apiConfig = configService.getApiConfig()
      const cacheConfig = configService.getCacheConfig()
      const retryConfig = configService.getRetryConfig()
      const timeoutConfig = configService.getTimeoutConfig()

      expect(apiConfig).toBeDefined()
      expect(cacheConfig).toBeDefined()
      expect(retryConfig).toBeDefined()
      expect(timeoutConfig).toBeDefined()

      expect(apiConfig.defaultPageSize).toBe(20)
      expect(retryConfig.attempts).toBe(timeoutConfig.retryAttempts)
      expect(retryConfig.delay).toBe(timeoutConfig.retryDelay)
    })

    it('deve detectar ambiente corretamente', () => {
      const isDev = configService.isDevelopment()
      const isProd = configService.isProduction()

      expect(isDev).toBe(!isProd)
    })
  })

  describe('Edge Cases', () => {
    it('deve lidar com valores undefined nas configurações', () => {
      const originalApiKey = env.RAWG_API_KEY
      const originalPageSize = env.DEFAULT_PAGE_SIZE

      ;(env as any).RAWG_API_KEY = undefined
      ;(env as any).DEFAULT_PAGE_SIZE = undefined

      const config = configService.getApiConfig()

      expect(config.apiKey).toBeUndefined()
      expect(config.defaultPageSize).toBeUndefined()

      env.RAWG_API_KEY = originalApiKey
      env.DEFAULT_PAGE_SIZE = originalPageSize
    })

    it('deve lidar com valores numéricos como strings', () => {
      const originalPageSize = env.DEFAULT_PAGE_SIZE
      const originalMaxPageSize = env.MAX_PAGE_SIZE

      ;(env as any).DEFAULT_PAGE_SIZE = '25'
      ;(env as any).MAX_PAGE_SIZE = '100'

      const config = configService.getApiConfig()

      expect(config.defaultPageSize).toBe('25')
      expect(config.maxPageSize).toBe('100')

      env.DEFAULT_PAGE_SIZE = originalPageSize
      env.MAX_PAGE_SIZE = originalMaxPageSize
    })
  })
})
