import { ObservabilityService } from './ObservabilityService'
import type { ObservabilityConfig, ObservabilityProvider } from './types'

const mockProvider: jest.Mocked<ObservabilityProvider> = {
  initialize: jest.fn(),
  captureError: jest.fn(),
  captureEvent: jest.fn(),
  capturePerformance: jest.fn(),
  identify: jest.fn()
}

const mockProvider2: jest.Mocked<ObservabilityProvider> = {
  initialize: jest.fn(),
  captureError: jest.fn(),
  captureEvent: jest.fn(),
  capturePerformance: jest.fn(),
  identify: jest.fn()
}

describe('ObservabilityService', () => {
  let observabilityService: ObservabilityService
  let config: ObservabilityConfig

  beforeEach(() => {
    jest.clearAllMocks()
    config = {
      enabled: true,
      providers: [mockProvider, mockProvider2]
    }
    observabilityService = new ObservabilityService(config)
  })

  describe('Inicialização', () => {
    it('deve inicializar com configuração correta', () => {
      expect(observabilityService).toBeDefined()
    })

    it('deve inicializar todos os providers', () => {
      observabilityService.initialize()

      expect(mockProvider.initialize).toHaveBeenCalled()
      expect(mockProvider2.initialize).toHaveBeenCalled()
    })

    it('deve evitar inicialização múltipla', () => {
      observabilityService.initialize()
      observabilityService.initialize()

      expect(mockProvider.initialize).toHaveBeenCalledTimes(1)
      expect(mockProvider2.initialize).toHaveBeenCalledTimes(1)
    })

    it('deve lidar com erro na inicialização do provider', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      mockProvider.initialize.mockImplementation(() => {
        throw new Error('Provider initialization failed')
      })

      observabilityService.initialize()

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to initialize observability provider:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })

    it('deve logar número de providers inicializados', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

      observabilityService.initialize()

      expect(consoleSpy).toHaveBeenCalledWith(
        'ObservabilityService initialized with 2 providers'
      )

      consoleSpy.mockRestore()
    })
  })

  describe('captureError', () => {
    it('deve capturar erro em todos os providers', () => {
      const error = new Error('Test error')
      const context = { userId: '123', action: 'test' }

      observabilityService.captureError(error, context)

      expect(mockProvider.captureError).toHaveBeenCalledWith(error, context)
      expect(mockProvider2.captureError).toHaveBeenCalledWith(error, context)
    })

    it('deve lidar com erro no provider', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const error = new Error('Test error')
      mockProvider.captureError.mockImplementation(() => {
        throw new Error('Provider error')
      })

      observabilityService.captureError(error)

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to capture error in provider:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })

    it('deve capturar erro sem contexto', () => {
      const error = new Error('Test error')

      observabilityService.captureError(error)

      expect(mockProvider.captureError).toHaveBeenCalledWith(error, undefined)
      expect(mockProvider2.captureError).toHaveBeenCalledWith(error, undefined)
    })
  })

  describe('captureEvent', () => {
    it('deve capturar evento em todos os providers', () => {
      const eventName = 'user_click'
      const properties = { button: 'submit', page: 'home' }

      observabilityService.captureEvent(eventName, properties)

      expect(mockProvider.captureEvent).toHaveBeenCalledWith(
        eventName,
        properties
      )
      expect(mockProvider2.captureEvent).toHaveBeenCalledWith(
        eventName,
        properties
      )
    })

    it('deve lidar com erro no provider', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      mockProvider.captureEvent.mockImplementation(() => {
        throw new Error('Provider error')
      })

      observabilityService.captureEvent('test_event')

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to capture event in provider:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })

    it('deve capturar evento sem propriedades', () => {
      const eventName = 'page_view'

      observabilityService.captureEvent(eventName)

      expect(mockProvider.captureEvent).toHaveBeenCalledWith(
        eventName,
        undefined
      )
      expect(mockProvider2.captureEvent).toHaveBeenCalledWith(
        eventName,
        undefined
      )
    })
  })

  describe('capturePerformance', () => {
    it('deve capturar métrica de performance em todos os providers', () => {
      const metric = 'api_response_time'
      const value = 150.5
      const context = { endpoint: '/api/games', method: 'GET' }

      observabilityService.capturePerformance(metric, value, context)

      expect(mockProvider.capturePerformance).toHaveBeenCalledWith(
        metric,
        value,
        context
      )
      expect(mockProvider2.capturePerformance).toHaveBeenCalledWith(
        metric,
        value,
        context
      )
    })

    it('deve lidar com erro no provider', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      mockProvider.capturePerformance.mockImplementation(() => {
        throw new Error('Provider error')
      })

      observabilityService.capturePerformance('test_metric', 100)

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to capture performance in provider:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })

    it('deve capturar performance sem contexto', () => {
      const metric = 'page_load_time'
      const value = 2000

      observabilityService.capturePerformance(metric, value)

      expect(mockProvider.capturePerformance).toHaveBeenCalledWith(
        metric,
        value,
        undefined
      )
      expect(mockProvider2.capturePerformance).toHaveBeenCalledWith(
        metric,
        value,
        undefined
      )
    })
  })

  describe('identify', () => {
    it('deve identificar usuário em todos os providers', () => {
      const userId = 'user_123'
      const properties = { name: 'John Doe', email: 'john@example.com' }

      observabilityService.identify(userId, properties)

      expect(mockProvider.identify).toHaveBeenCalledWith(userId, properties)
      expect(mockProvider2.identify).toHaveBeenCalledWith(userId, properties)
    })

    it('deve lidar com erro no provider', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      mockProvider.identify.mockImplementation(() => {
        throw new Error('Provider error')
      })

      observabilityService.identify('user_123')

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to identify user in provider:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })

    it('deve identificar usuário sem propriedades', () => {
      const userId = 'anonymous_user'

      observabilityService.identify(userId)

      expect(mockProvider.identify).toHaveBeenCalledWith(userId, undefined)
      expect(mockProvider2.identify).toHaveBeenCalledWith(userId, undefined)
    })
  })

  describe('captureApiError', () => {
    it('deve capturar erro de API com contexto', () => {
      const endpoint = '/api/games'
      const status = 500
      const error = new Error('Internal Server Error')

      observabilityService.captureApiError(endpoint, status, error)

      expect(mockProvider.captureError).toHaveBeenCalledWith(
        expect.any(Error),
        {
          endpoint,
          status: '500',
          error: 'Internal Server Error'
        }
      )
    })

    it('deve lidar com erro que não é Error', () => {
      const endpoint = '/api/games'
      const status = 404
      const error = 'Not Found'

      observabilityService.captureApiError(endpoint, status, error)

      expect(mockProvider.captureError).toHaveBeenCalledWith(
        expect.any(Error),
        {
          endpoint,
          status: '404',
          error: 'Not Found'
        }
      )
    })
  })

  describe('captureApiPerformance', () => {
    it('deve capturar performance de API', () => {
      const endpoint = '/api/games'
      const duration = 150.5
      const status = 200

      observabilityService.captureApiPerformance(endpoint, duration, status)

      expect(mockProvider.capturePerformance).toHaveBeenCalledWith(
        'api_response_time',
        duration,
        {
          endpoint,
          status: '200'
        }
      )
    })

    it('deve lidar com status de erro', () => {
      const endpoint = '/api/games'
      const duration = 5000
      const status = 500

      observabilityService.captureApiPerformance(endpoint, duration, status)

      expect(mockProvider.capturePerformance).toHaveBeenCalledWith(
        'api_response_time',
        duration,
        {
          endpoint,
          status: '500'
        }
      )
    })
  })

  describe('Integração', () => {
    it('deve funcionar com múltiplos providers', () => {
      const error = new Error('Test error')
      const eventName = 'test_event'
      const metric = 'test_metric'
      const userId = 'test_user'

      observabilityService.captureError(error)
      observabilityService.captureEvent(eventName)
      observabilityService.capturePerformance(metric, 100)
      observabilityService.identify(userId)

      expect(mockProvider.captureError).toHaveBeenCalled()
      expect(mockProvider.captureEvent).toHaveBeenCalled()
      expect(mockProvider.capturePerformance).toHaveBeenCalled()
      expect(mockProvider.identify).toHaveBeenCalled()

      expect(mockProvider2.captureError).toHaveBeenCalled()
      expect(mockProvider2.captureEvent).toHaveBeenCalled()
      expect(mockProvider2.capturePerformance).toHaveBeenCalled()
      expect(mockProvider2.identify).toHaveBeenCalled()
    })

    it('deve continuar funcionando mesmo se um provider falhar', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      mockProvider.captureError.mockImplementation(() => {
        throw new Error('Provider error')
      })

      const error = new Error('Test error')
      observabilityService.captureError(error)

      expect(mockProvider2.captureError).toHaveBeenCalledWith(error, undefined)

      consoleSpy.mockRestore()
    })
  })

  describe('Edge Cases', () => {
    it('deve lidar com providers vazios', () => {
      const emptyConfig: ObservabilityConfig = {
        enabled: true,
        providers: []
      }
      const emptyService = new ObservabilityService(emptyConfig)

      const error = new Error('Test error')
      emptyService.captureError(error)

      expect(() => emptyService.captureError(error)).not.toThrow()
    })

    it('deve lidar com provider que retorna undefined', () => {
      mockProvider.captureError.mockReturnValue(undefined as any)

      const error = new Error('Test error')
      expect(() => observabilityService.captureError(error)).not.toThrow()
    })

    it('deve lidar com valores undefined/null', () => {
      observabilityService.captureError(undefined as any)
      observabilityService.captureEvent('')
      observabilityService.capturePerformance('', 0)
      observabilityService.identify('')

      expect(mockProvider.captureError).toHaveBeenCalled()
      expect(mockProvider.captureEvent).toHaveBeenCalled()
      expect(mockProvider.capturePerformance).toHaveBeenCalled()
      expect(mockProvider.identify).toHaveBeenCalled()
    })
  })
})
