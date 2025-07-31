import { ConsoleProvider } from './ConsoleProvider'

describe('ConsoleProvider', () => {
  let consoleProvider: ConsoleProvider
  let consoleSpy: jest.SpyInstance

  beforeEach(() => {
    consoleProvider = new ConsoleProvider()
    consoleSpy = jest.spyOn(console, 'log').mockImplementation()
  })

  afterEach(() => {
    consoleSpy.mockRestore()
    jest.clearAllMocks()
  })

  describe('initialize', () => {
    it('deve inicializar o provider corretamente', () => {
      consoleProvider.initialize()

      expect(consoleSpy).toHaveBeenCalledWith(
        'Console Provider initialized for development'
      )
    })

    it('deve ser chamado múltiplas vezes sem erro', () => {
      consoleProvider.initialize()
      consoleProvider.initialize()

      expect(consoleSpy).toHaveBeenCalledTimes(2)
    })
  })

  describe('captureError', () => {
    let errorSpy: jest.SpyInstance

    beforeEach(() => {
      errorSpy = jest.spyOn(console, 'error').mockImplementation()
    })

    afterEach(() => {
      errorSpy.mockRestore()
    })

    it('deve capturar erro com contexto', () => {
      const error = new Error('Test error')
      const context = { userId: '123', action: 'test' }

      consoleProvider.captureError(error, context)

      expect(errorSpy).toHaveBeenCalledWith('Error captured:', {
        message: 'Test error',
        stack: error.stack,
        context
      })
    })

    it('deve capturar erro sem contexto', () => {
      const error = new Error('Test error')

      consoleProvider.captureError(error)

      expect(errorSpy).toHaveBeenCalledWith('Error captured:', {
        message: 'Test error',
        stack: error.stack,
        context: undefined
      })
    })

    it('deve lidar com diferentes tipos de contexto', () => {
      const error = new Error('Test error')
      const context = {
        userId: '123',
        count: 42,
        isActive: true,
        description: 'test description'
      }

      consoleProvider.captureError(error, context)

      expect(errorSpy).toHaveBeenCalledWith('Error captured:', {
        message: 'Test error',
        stack: error.stack,
        context
      })
    })

    it('deve lidar com erro sem stack trace', () => {
      const error = new Error('Test error')
      error.stack = undefined

      consoleProvider.captureError(error)

      expect(errorSpy).toHaveBeenCalledWith('Error captured:', {
        message: 'Test error',
        stack: undefined,
        context: undefined
      })
    })
  })

  describe('captureEvent', () => {
    it('deve capturar evento com propriedades', () => {
      const eventName = 'user_click'
      const properties = { button: 'submit', page: 'home' }

      consoleProvider.captureEvent(eventName, properties)

      expect(consoleSpy).toHaveBeenCalledWith('Event captured:', {
        event: eventName,
        properties
      })
    })

    it('deve capturar evento sem propriedades', () => {
      const eventName = 'page_view'

      consoleProvider.captureEvent(eventName)

      expect(consoleSpy).toHaveBeenCalledWith('Event captured:', {
        event: eventName,
        properties: undefined
      })
    })

    it('deve lidar com diferentes tipos de propriedades', () => {
      const eventName = 'form_submit'
      const properties = {
        formId: 'login',
        fieldCount: 5,
        isValid: true,
        timestamp: '2024-01-01'
      }

      consoleProvider.captureEvent(eventName, properties)

      expect(consoleSpy).toHaveBeenCalledWith('Event captured:', {
        event: eventName,
        properties
      })
    })

    it('deve lidar com propriedades vazias', () => {
      const eventName = 'empty_event'
      const properties = {}

      consoleProvider.captureEvent(eventName, properties)

      expect(consoleSpy).toHaveBeenCalledWith('Event captured:', {
        event: eventName,
        properties
      })
    })
  })

  describe('capturePerformance', () => {
    it('deve capturar métrica de performance com contexto', () => {
      const metric = 'page_load_time'
      const value = 1500
      const context = { page: 'home', browser: 'chrome' }

      consoleProvider.capturePerformance(metric, value, context)

      expect(consoleSpy).toHaveBeenCalledWith('⚡ Performance captured:', {
        metric,
        value,
        context
      })
    })

    it('deve capturar métrica de performance sem contexto', () => {
      const metric = 'api_response_time'
      const value = 250

      consoleProvider.capturePerformance(metric, value)

      expect(consoleSpy).toHaveBeenCalledWith('⚡ Performance captured:', {
        metric,
        value,
        context: undefined
      })
    })

    it('deve lidar com diferentes tipos de valores', () => {
      const metric = 'memory_usage'
      const value = 1024.5
      const context = { unit: 'MB', threshold: 1000 }

      consoleProvider.capturePerformance(metric, value, context)

      expect(consoleSpy).toHaveBeenCalledWith('⚡ Performance captured:', {
        metric,
        value,
        context
      })
    })

    it('deve lidar com valores zero', () => {
      const metric = 'error_count'
      const value = 0

      consoleProvider.capturePerformance(metric, value)

      expect(consoleSpy).toHaveBeenCalledWith('⚡ Performance captured:', {
        metric,
        value,
        context: undefined
      })
    })

    it('deve lidar com valores negativos', () => {
      const metric = 'time_difference'
      const value = -50

      consoleProvider.capturePerformance(metric, value)

      expect(consoleSpy).toHaveBeenCalledWith('⚡ Performance captured:', {
        metric,
        value,
        context: undefined
      })
    })
  })

  describe('identify', () => {
    it('deve identificar usuário com propriedades', () => {
      const userId = 'user123'
      const properties = { name: 'John Doe', email: 'john@example.com' }

      consoleProvider.identify(userId, properties)

      expect(consoleSpy).toHaveBeenCalledWith('👤 User identified:', {
        userId,
        properties
      })
    })

    it('deve identificar usuário sem propriedades', () => {
      const userId = 'anonymous'

      consoleProvider.identify(userId)

      expect(consoleSpy).toHaveBeenCalledWith('👤 User identified:', {
        userId,
        properties: undefined
      })
    })

    it('deve lidar com diferentes tipos de propriedades', () => {
      const userId = 'user456'
      const properties = {
        name: 'Jane Smith',
        age: 30,
        isPremium: true,
        lastLogin: '2024-01-01'
      }

      consoleProvider.identify(userId, properties)

      expect(consoleSpy).toHaveBeenCalledWith('👤 User identified:', {
        userId,
        properties
      })
    })

    it('deve lidar com userId vazio', () => {
      const userId = ''

      consoleProvider.identify(userId)

      expect(consoleSpy).toHaveBeenCalledWith('👤 User identified:', {
        userId,
        properties: undefined
      })
    })
  })

  describe('Integração', () => {
    it('deve funcionar com todos os métodos em sequência', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation()

      consoleProvider.initialize()

      const error = new Error('Integration test error')
      consoleProvider.captureError(error, { test: true })

      consoleProvider.captureEvent('integration_test', { step: 1 })

      consoleProvider.capturePerformance('integration_time', 100)

      consoleProvider.identify('test_user', { role: 'tester' })

      expect(consoleSpy).toHaveBeenCalledTimes(4)
      expect(errorSpy).toHaveBeenCalledTimes(1)

      errorSpy.mockRestore()
    })

    it('deve manter estado consistente entre chamadas', () => {
      const eventName = 'consistency_test'
      const userId = 'consistent_user'

      consoleProvider.captureEvent(eventName)
      consoleProvider.identify(userId)

      consoleProvider.captureEvent(eventName)
      consoleProvider.identify(userId)

      expect(consoleSpy).toHaveBeenCalledTimes(4)
    })
  })

  describe('Edge Cases', () => {
    it('deve lidar com strings muito longas', () => {
      const longString = 'a'.repeat(1000)
      const eventName = longString

      consoleProvider.captureEvent(eventName)

      expect(consoleSpy).toHaveBeenCalledWith('Event captured:', {
        event: eventName,
        properties: undefined
      })
    })

    it('deve lidar com caracteres especiais', () => {
      const eventName = 'test_évént_ñáme'
      const userId = 'user@test.com'

      consoleProvider.captureEvent(eventName)
      consoleProvider.identify(userId)

      expect(consoleSpy).toHaveBeenCalledTimes(2)
    })

    it('deve lidar com valores numéricos extremos', () => {
      const metric = 'extreme_value'
      const value = Number.MAX_SAFE_INTEGER

      consoleProvider.capturePerformance(metric, value)

      expect(consoleSpy).toHaveBeenCalledWith('⚡ Performance captured:', {
        metric,
        value,
        context: undefined
      })
    })
  })
})
