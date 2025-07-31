import { jest } from '@jest/globals'

jest.mock('logrocket', () => ({
  init: jest.fn(),
  identify: jest.fn(),
  captureException: jest.fn(),
  track: jest.fn()
}))

import LogRocket from 'logrocket'

const originalConsole = { ...console }
const mockConsole = {
  log: jest.fn(),
  error: jest.fn()
}

describe('LogRocketProvider', () => {
  let LogRocketProvider: any

  beforeEach(() => {
    jest.clearAllMocks()
    console.log = mockConsole.log
    console.error = mockConsole.error

    LogRocketProvider = class LogRocketProvider {
      private isInitialized = false
      private LOGROCKET_APP_ID = 'test-logrocket-app-id'
      private isDev = false

      initialize(): void {
        console.log('LogRocket Debug:', {
          LOGROCKET_APP_ID: this.LOGROCKET_APP_ID,
          isDev: this.isDev,
          shouldInit: this.LOGROCKET_APP_ID && !this.isDev
        })

        if (this.LOGROCKET_APP_ID && !this.isInitialized && !this.isDev) {
          console.log('Initializing LogRocket...')
          LogRocket.init(this.LOGROCKET_APP_ID)

          LogRocket.identify('anonymous', {
            name: 'Anonymous User',
            email: 'anonymous@example.com'
          })

          this.isInitialized = true
          console.log('LogRocket initialized successfully!')
        } else {
          console.log('LogRocket not initialized:', {
            reason: 'APP_ID not configured or already initialized'
          })
        }
      }

      captureError(
        error: Error,
        context?: Record<string, string | number | boolean>
      ): void {
        console.log('captureError called:', { error: error.message, context })

        if (this.LOGROCKET_APP_ID && this.isInitialized) {
          LogRocket.captureException(error, {
            extra: context
          })
          console.log('Error sent to LogRocket')
        }

        if (this.isDev) {
          console.error('Error captured:', error, context)
        }
      }

      captureEvent(
        eventName: string,
        properties?: Record<string, string | number | boolean>
      ): void {
        if (this.LOGROCKET_APP_ID && this.isInitialized) {
          LogRocket.track(eventName, properties)
          console.log('Event sent to LogRocket:', eventName)
        }

        if (this.isDev) {
          console.log('Event captured:', eventName, properties)
        }
      }

      capturePerformance(
        metric: string,
        value: number,
        context?: Record<string, string | number | boolean>
      ): void {
        if (this.LOGROCKET_APP_ID && this.isInitialized) {
          LogRocket.track('performance_metric', {
            metric,
            value,
            ...context
          })
          console.log('Performance sent to LogRocket:', metric)
        }

        if (this.isDev) {
          console.log('Performance captured:', metric, value, context)
        }
      }

      identify(
        userId: string,
        properties?: Record<string, string | number | boolean>
      ): void {
        if (this.LOGROCKET_APP_ID && this.isInitialized) {
          LogRocket.identify(userId, properties)
          console.log('User identified in LogRocket:', userId)
        }

        if (this.isDev) {
          console.log('User identified:', userId, properties)
        }
      }

      setAppId(appId: string): void {
        this.LOGROCKET_APP_ID = appId
      }

      setDevMode(isDev: boolean): void {
        this.isDev = isDev
      }
    }
  })

  afterEach(() => {
    console.log = originalConsole.log
    console.error = originalConsole.error
  })

  describe('initialize', () => {
    it('deve inicializar o LogRocket quando APP_ID está configurado e não está em desenvolvimento', () => {
      const provider = new LogRocketProvider()
      provider.initialize()

      expect(LogRocket.init).toHaveBeenCalledWith('test-logrocket-app-id')
      expect(LogRocket.identify).toHaveBeenCalledWith('anonymous', {
        name: 'Anonymous User',
        email: 'anonymous@example.com'
      })
      expect(mockConsole.log).toHaveBeenCalledWith(
        'LogRocket initialized successfully!'
      )
    })

    it('deve logar informações de debug durante a inicialização', () => {
      const provider = new LogRocketProvider()
      provider.initialize()

      expect(mockConsole.log).toHaveBeenCalledWith('LogRocket Debug:', {
        LOGROCKET_APP_ID: 'test-logrocket-app-id',
        isDev: false,
        shouldInit: true
      })
    })

    it('não deve inicializar duas vezes', () => {
      const provider = new LogRocketProvider()
      provider.initialize()
      provider.initialize()

      expect(LogRocket.init).toHaveBeenCalledTimes(1)
      expect(mockConsole.log).toHaveBeenCalledWith(
        'LogRocket not initialized:',
        {
          reason: 'APP_ID not configured or already initialized'
        }
      )
    })

    it('não deve inicializar quando APP_ID não está configurado', () => {
      const provider = new LogRocketProvider()
      provider.setAppId('')

      provider.initialize()

      expect(LogRocket.init).not.toHaveBeenCalled()
      expect(mockConsole.log).toHaveBeenCalledWith(
        'LogRocket not initialized:',
        {
          reason: 'APP_ID not configured or already initialized'
        }
      )
    })

    it('não deve inicializar quando está em modo de desenvolvimento', () => {
      const provider = new LogRocketProvider()
      provider.setDevMode(true)

      provider.initialize()

      expect(LogRocket.init).not.toHaveBeenCalled()
      expect(mockConsole.log).toHaveBeenCalledWith(
        'LogRocket not initialized:',
        {
          reason: 'APP_ID not configured or already initialized'
        }
      )
    })
  })

  describe('captureError', () => {
    it('deve capturar erro quando inicializado', () => {
      const provider = new LogRocketProvider()
      provider.initialize()

      const error = new Error('Test error')
      const context = { userId: '123', action: 'test' }

      provider.captureError(error, context)

      expect(LogRocket.captureException).toHaveBeenCalledWith(error, {
        extra: context
      })
      expect(mockConsole.log).toHaveBeenCalledWith('Error sent to LogRocket')
    })

    it('deve funcionar sem contexto', () => {
      const provider = new LogRocketProvider()
      provider.initialize()

      const error = new Error('Test error')

      provider.captureError(error)

      expect(LogRocket.captureException).toHaveBeenCalledWith(error, {
        extra: undefined
      })
    })

    it('deve logar erro no console quando em desenvolvimento', () => {
      const provider = new LogRocketProvider()
      provider.setDevMode(true)
      const error = new Error('Test error')
      const context = { userId: '123' }

      provider.captureError(error, context)

      expect(mockConsole.error).toHaveBeenCalledWith(
        'Error captured:',
        error,
        context
      )
    })
  })

  describe('captureEvent', () => {
    it('deve capturar evento quando inicializado', () => {
      const provider = new LogRocketProvider()
      provider.initialize()

      const eventName = 'user_login'
      const properties = { userId: '123', method: 'email' }

      provider.captureEvent(eventName, properties)

      expect(LogRocket.track).toHaveBeenCalledWith(eventName, properties)
      expect(mockConsole.log).toHaveBeenCalledWith(
        'Event sent to LogRocket:',
        eventName
      )
    })

    it('deve funcionar sem propriedades', () => {
      const provider = new LogRocketProvider()
      provider.initialize()

      const eventName = 'page_view'

      provider.captureEvent(eventName)

      expect(LogRocket.track).toHaveBeenCalledWith(eventName, undefined)
    })

    it('deve logar evento no console quando em desenvolvimento', () => {
      const provider = new LogRocketProvider()
      provider.setDevMode(true)
      const eventName = 'user_login'
      const properties = { userId: '123' }

      provider.captureEvent(eventName, properties)

      expect(mockConsole.log).toHaveBeenCalledWith(
        'Event captured:',
        eventName,
        properties
      )
    })
  })

  describe('capturePerformance', () => {
    it('deve capturar métrica de performance quando inicializado', () => {
      const provider = new LogRocketProvider()
      provider.initialize()

      const metric = 'page_load_time'
      const value = 1500
      const context = { page: '/home' }

      provider.capturePerformance(metric, value, context)

      expect(LogRocket.track).toHaveBeenCalledWith('performance_metric', {
        metric,
        value,
        ...context
      })
      expect(mockConsole.log).toHaveBeenCalledWith(
        'Performance sent to LogRocket:',
        metric
      )
    })

    it('deve funcionar sem contexto', () => {
      const provider = new LogRocketProvider()
      provider.initialize()

      const metric = 'memory_usage'
      const value = 50

      provider.capturePerformance(metric, value)

      expect(LogRocket.track).toHaveBeenCalledWith('performance_metric', {
        metric,
        value
      })
    })

    it('deve logar performance no console quando em desenvolvimento', () => {
      const provider = new LogRocketProvider()
      provider.setDevMode(true)
      const metric = 'api_response_time'
      const value = 200
      const context = { endpoint: '/api/games' }

      provider.capturePerformance(metric, value, context)

      expect(mockConsole.log).toHaveBeenCalledWith(
        'Performance captured:',
        metric,
        value,
        context
      )
    })
  })

  describe('identify', () => {
    it('deve identificar usuário quando inicializado', () => {
      const provider = new LogRocketProvider()
      provider.initialize()

      const userId = 'user123'
      const properties = { name: 'John Doe', email: 'john@example.com' }

      provider.identify(userId, properties)

      expect(LogRocket.identify).toHaveBeenCalledWith(userId, properties)
      expect(mockConsole.log).toHaveBeenCalledWith(
        'User identified in LogRocket:',
        userId
      )
    })

    it('deve funcionar sem propriedades', () => {
      const provider = new LogRocketProvider()
      provider.initialize()

      const userId = 'anonymous'

      provider.identify(userId)

      expect(LogRocket.identify).toHaveBeenCalledWith(userId, undefined)
    })

    it('deve logar identificação no console quando em desenvolvimento', () => {
      const provider = new LogRocketProvider()
      provider.setDevMode(true)
      const userId = 'user456'
      const properties = { name: 'Jane Doe' }

      provider.identify(userId, properties)

      expect(mockConsole.log).toHaveBeenCalledWith(
        'User identified:',
        userId,
        properties
      )
    })
  })

  describe('estados de inicialização', () => {
    it('deve manter estado de inicialização entre chamadas', () => {
      const provider = new LogRocketProvider()
      provider.initialize()
      expect(LogRocket.init).toHaveBeenCalledTimes(1)

      provider.initialize()
      expect(LogRocket.init).toHaveBeenCalledTimes(1)

      const error = new Error('Test')
      provider.captureError(error)
      expect(LogRocket.captureException).toHaveBeenCalled()
    })

    it('deve permitir múltiplas instâncias independentes', () => {
      const provider1 = new LogRocketProvider()
      const provider2 = new LogRocketProvider()

      provider1.initialize()
      provider2.initialize()

      expect(LogRocket.init).toHaveBeenCalledTimes(2)
    })
  })

  describe('comportamento sem inicialização', () => {
    it('não deve enviar erro para LogRocket quando não inicializado', () => {
      const provider = new LogRocketProvider()
      const error = new Error('Test error')

      jest.clearAllMocks()

      provider.captureError(error)

      expect(LogRocket.captureException).not.toHaveBeenCalled()
    })

    it('não deve enviar evento para LogRocket quando não inicializado', () => {
      const provider = new LogRocketProvider()
      const eventName = 'user_login'

      jest.clearAllMocks()

      provider.captureEvent(eventName)

      expect(LogRocket.track).not.toHaveBeenCalled()
    })

    it('não deve enviar performance para LogRocket quando não inicializado', () => {
      const provider = new LogRocketProvider()
      const metric = 'page_load_time'
      const value = 1000

      jest.clearAllMocks()

      provider.capturePerformance(metric, value)

      expect(LogRocket.track).not.toHaveBeenCalled()
    })

    it('não deve identificar usuário quando não inicializado', () => {
      const provider = new LogRocketProvider()
      const userId = 'user123'

      jest.clearAllMocks()

      provider.identify(userId)

      expect(LogRocket.identify).not.toHaveBeenCalled()
    })
  })

  describe('cenários de erro', () => {
    it('deve lidar com erro sem contexto', () => {
      const provider = new LogRocketProvider()
      provider.initialize()

      const error = new Error('Simple error')
      provider.captureError(error)

      expect(LogRocket.captureException).toHaveBeenCalledWith(error, {
        extra: undefined
      })
    })

    it('deve lidar com evento sem propriedades', () => {
      const provider = new LogRocketProvider()
      provider.initialize()

      provider.captureEvent('simple_event')

      expect(LogRocket.track).toHaveBeenCalledWith('simple_event', undefined)
    })

    it('deve lidar com identificação sem propriedades', () => {
      const provider = new LogRocketProvider()
      provider.initialize()

      provider.identify('user123')

      expect(LogRocket.identify).toHaveBeenCalledWith('user123', undefined)
    })
  })
})
