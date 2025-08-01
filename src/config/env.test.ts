import { jest } from '@jest/globals'
import {
  env,
  getCacheConfig,
  getRetryConfig,
  getTimeoutConfig,
  isDevelopment,
  isProduction,
  isTest,
  validateEnv
} from './env.mock'

const originalConsole = { ...console }
const mockConsole = {
  warn: jest.fn(),
  error: jest.fn()
}

describe('env', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    console.warn = mockConsole.warn
    console.error = mockConsole.error
  })

  afterEach(() => {
    console.warn = originalConsole.warn
    console.error = originalConsole.error
  })

  describe('configuração de API', () => {
    it('deve carregar RAWG_API_KEY corretamente', () => {
      expect(env.RAWG_API_KEY).toBe('test-api-key')
    })

    it('deve carregar RAWG_API_BASE_URL corretamente', () => {
      expect(env.RAWG_API_BASE_URL).toBe('https://api.rawg.io/api')
    })
  })

  describe('configuração da aplicação', () => {
    it('deve carregar APP_NAME corretamente', () => {
      expect(env.APP_NAME).toBe('Test App')
    })

    it('deve carregar APP_VERSION corretamente', () => {
      expect(env.APP_VERSION).toBe('2.0.0')
    })

    it('deve carregar APP_ENV corretamente', () => {
      expect(env.APP_ENV).toBe('development')
    })
  })

  describe('feature flags', () => {
    it('deve carregar ENABLE_DEBUG corretamente', () => {
      expect(env.ENABLE_DEBUG).toBe(true)
    })

    it('deve carregar ENABLE_DEVTOOLS corretamente', () => {
      expect(env.ENABLE_DEVTOOLS).toBe(true)
    })
  })

  describe('configuração de performance', () => {
    it('deve carregar CACHE_DURATION corretamente', () => {
      expect(env.CACHE_DURATION).toBe(300000)
    })

    it('deve carregar DEBOUNCE_DELAY corretamente', () => {
      expect(env.DEBOUNCE_DELAY).toBe(500)
    })

    it('deve carregar RETRY_ATTEMPTS corretamente', () => {
      expect(env.RETRY_ATTEMPTS).toBe(3)
    })

    it('deve carregar RETRY_DELAY corretamente', () => {
      expect(env.RETRY_DELAY).toBe(1000)
    })
  })

  describe('configuração de paginação', () => {
    it('deve carregar DEFAULT_PAGE_SIZE corretamente', () => {
      expect(env.DEFAULT_PAGE_SIZE).toBe(20)
    })

    it('deve carregar MAX_PAGE_SIZE corretamente', () => {
      expect(env.MAX_PAGE_SIZE).toBe(50)
    })
  })
})

describe('validateEnv', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    console.warn = mockConsole.warn
  })

  afterEach(() => {
    console.warn = originalConsole.warn
  })

  it('deve emitir warning quando RAWG_API_KEY não está configurada', () => {
    const originalApiKey = env.RAWG_API_KEY
    Object.defineProperty(env, 'RAWG_API_KEY', {
      value: '',
      configurable: true
    })

    validateEnv()

    expect(mockConsole.warn).toHaveBeenCalledWith(
      'RAWG_API_KEY não configurada. Algumas funcionalidades podem não funcionar.'
    )

    Object.defineProperty(env, 'RAWG_API_KEY', {
      value: originalApiKey,
      configurable: true
    })
  })

  it('deve emitir warning quando DEBUG está habilitado em produção', () => {
    const originalAppEnv = env.APP_ENV
    const originalEnableDebug = env.ENABLE_DEBUG

    Object.defineProperty(env, 'APP_ENV', {
      value: 'production',
      configurable: true
    })
    Object.defineProperty(env, 'ENABLE_DEBUG', {
      value: true,
      configurable: true
    })

    validateEnv()

    expect(mockConsole.warn).toHaveBeenCalledWith(
      'DEBUG habilitado em produção. Considere desabilitar.'
    )

    Object.defineProperty(env, 'APP_ENV', {
      value: originalAppEnv,
      configurable: true
    })
    Object.defineProperty(env, 'ENABLE_DEBUG', {
      value: originalEnableDebug,
      configurable: true
    })
  })

  it('deve emitir warning quando DEVTOOLS está habilitado em produção', () => {
    const originalAppEnv = env.APP_ENV
    const originalEnableDevtools = env.ENABLE_DEVTOOLS

    Object.defineProperty(env, 'APP_ENV', {
      value: 'production',
      configurable: true
    })
    Object.defineProperty(env, 'ENABLE_DEVTOOLS', {
      value: true,
      configurable: true
    })

    validateEnv()

    expect(mockConsole.warn).toHaveBeenCalledWith(
      'DEVTOOLS habilitado em produção. Considere desabilitar.'
    )

    Object.defineProperty(env, 'APP_ENV', {
      value: originalAppEnv,
      configurable: true
    })
    Object.defineProperty(env, 'ENABLE_DEVTOOLS', {
      value: originalEnableDevtools,
      configurable: true
    })
  })

  it('não deve emitir warnings quando tudo está configurado corretamente', () => {
    validateEnv()

    expect(mockConsole.warn).not.toHaveBeenCalled()
  })
})

describe('funções de ambiente', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('isDevelopment', () => {
    it('deve retornar true quando APP_ENV é development', () => {
      expect(isDevelopment()).toBe(true)
    })
  })

  describe('isProduction', () => {
    it('deve retornar false quando APP_ENV não é production', () => {
      expect(isProduction()).toBe(false)
    })
  })

  describe('isTest', () => {
    it('deve retornar false quando APP_ENV não é test', () => {
      expect(isTest()).toBe(false)
    })
  })
})

describe('configurações de cache', () => {
  describe('getCacheConfig', () => {
    it('deve retornar configuração padrão para desenvolvimento', () => {
      const config = getCacheConfig()

      expect(config.duration).toBe(300000)
      expect(config.staleTime).toBe(5 * 60 * 1000)
    })
  })
})

describe('configurações de retry', () => {
  describe('getRetryConfig', () => {
    it('deve retornar configuração padrão para desenvolvimento', () => {
      const config = getRetryConfig()

      expect(config.attempts).toBe(3)
      expect(config.delay).toBe(1000)
    })
  })
})

describe('configurações de timeout', () => {
  describe('getTimeoutConfig', () => {
    it('deve retornar configuração padrão para desenvolvimento', () => {
      const config = getTimeoutConfig()

      expect(config.timeout).toBe(5000)
      expect(config.retryAttempts).toBe(3)
      expect(config.retryDelay).toBe(1000)
    })
  })
})
