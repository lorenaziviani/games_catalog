import { FavoritesService } from '@/store/favorites/FavoritesService'
import { LocalStorageFavoritesRepository } from '@/store/favorites/repositories/LocalStorageFavoritesRepository'
import { GameService } from './GameService'
import { MetadataService } from './metadataService'
import { ObservabilityService } from './observability/ObservabilityService'
import { ServiceContainer } from './ServiceContainer'

jest.mock('./GameService')
jest.mock('./metadataService')
jest.mock('./observability/ObservabilityService')
jest.mock('@/store/favorites/FavoritesService')
jest.mock('@/store/favorites/repositories/LocalStorageFavoritesRepository')

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
  })),
  getRetryConfig: jest.fn(() => ({
    attempts: 3,
    delay: 1000
  }))
}))

jest.mock('./observability/providers/LogRocketProvider', () => ({
  LogRocketProvider: jest.fn().mockImplementation(() => ({
    initialize: jest.fn(),
    captureError: jest.fn(),
    captureEvent: jest.fn(),
    capturePerformance: jest.fn(),
    identify: jest.fn()
  }))
}))

describe('ServiceContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Singleton Pattern', () => {
    it('deve retornar a mesma instância sempre', () => {
      const instance1 = ServiceContainer.getInstance()
      const instance2 = ServiceContainer.getInstance()

      expect(instance1).toBe(instance2)
    })

    it('deve criar apenas uma instância', () => {
      ;(ServiceContainer as any).instance = undefined

      const instance1 = ServiceContainer.getInstance()
      const instance2 = ServiceContainer.getInstance()

      expect(instance1).toBe(instance2)
    })
  })

  describe('Inicialização', () => {
    it('deve inicializar todos os serviços corretamente', () => {
      const container = ServiceContainer.getInstance()

      expect(container).toBeDefined()
      expect(container.getGameService()).toBeDefined()
      expect(container.getMetadataService()).toBeDefined()
      expect(container.getFavoritesService()).toBeDefined()
    })

    it('deve criar ObservabilityService com configuração correta', () => {
      ;(ServiceContainer as any).instance = undefined

      const container = ServiceContainer.getInstance()

      expect(container).toBeDefined()
      expect(ObservabilityService).toHaveBeenCalledWith({
        enabled: true,
        providers: expect.any(Array)
      })
    })

    it('deve criar GameService com ObservabilityService', () => {
      ;(ServiceContainer as any).instance = undefined

      const container = ServiceContainer.getInstance()

      expect(container).toBeDefined()
      expect(GameService).toHaveBeenCalledWith(expect.any(ObservabilityService))
    })

    it('deve criar MetadataService', () => {
      ;(ServiceContainer as any).instance = undefined

      const container = ServiceContainer.getInstance()

      expect(container).toBeDefined()
      expect(MetadataService).toHaveBeenCalled()
    })

    it('deve criar FavoritesService com LocalStorageFavoritesRepository', () => {
      ;(ServiceContainer as any).instance = undefined

      const container = ServiceContainer.getInstance()

      expect(container).toBeDefined()
      expect(FavoritesService).toHaveBeenCalledWith(
        expect.any(LocalStorageFavoritesRepository)
      )
    })
  })

  describe('getGameService', () => {
    it('deve retornar instância do GameService', () => {
      ;(ServiceContainer as any).instance = undefined

      const container = ServiceContainer.getInstance()
      const gameService = container.getGameService()

      expect(gameService).toBeDefined()
      expect(GameService).toHaveBeenCalled()
    })

    it('deve retornar a mesma instância sempre', () => {
      const container = ServiceContainer.getInstance()
      const gameService1 = container.getGameService()
      const gameService2 = container.getGameService()

      expect(gameService1).toBe(gameService2)
    })
  })

  describe('getMetadataService', () => {
    it('deve retornar instância do MetadataService', () => {
      ;(ServiceContainer as any).instance = undefined

      const container = ServiceContainer.getInstance()
      const metadataService = container.getMetadataService()

      expect(metadataService).toBeDefined()
      expect(MetadataService).toHaveBeenCalled()
    })

    it('deve retornar a mesma instância sempre', () => {
      const container = ServiceContainer.getInstance()
      const metadataService1 = container.getMetadataService()
      const metadataService2 = container.getMetadataService()

      expect(metadataService1).toBe(metadataService2)
    })
  })

  describe('getFavoritesService', () => {
    it('deve retornar instância do FavoritesService', () => {
      ;(ServiceContainer as any).instance = undefined

      const container = ServiceContainer.getInstance()
      const favoritesService = container.getFavoritesService()

      expect(favoritesService).toBeDefined()
      expect(FavoritesService).toHaveBeenCalled()
    })

    it('deve retornar a mesma instância sempre', () => {
      const container = ServiceContainer.getInstance()
      const favoritesService1 = container.getFavoritesService()
      const favoritesService2 = container.getFavoritesService()

      expect(favoritesService1).toBe(favoritesService2)
    })
  })

  describe('Integração', () => {
    it('deve fornecer todos os serviços necessários', () => {
      const container = ServiceContainer.getInstance()

      const gameService = container.getGameService()
      const metadataService = container.getMetadataService()
      const favoritesService = container.getFavoritesService()

      expect(gameService).toBeDefined()
      expect(metadataService).toBeDefined()
      expect(favoritesService).toBeDefined()
    })

    it('deve manter referências consistentes', () => {
      const container = ServiceContainer.getInstance()

      const gameService1 = container.getGameService()
      const metadataService1 = container.getMetadataService()
      const favoritesService1 = container.getFavoritesService()

      const gameService2 = container.getGameService()
      const metadataService2 = container.getMetadataService()
      const favoritesService2 = container.getFavoritesService()

      expect(gameService1).toBe(gameService2)
      expect(metadataService1).toBe(metadataService2)
      expect(favoritesService1).toBe(favoritesService2)
    })
  })

  describe('Edge Cases', () => {
    it('deve lidar com múltiplas chamadas de getInstance', () => {
      const instances: ServiceContainer[] = []

      for (let i = 0; i < 5; i++) {
        instances.push(ServiceContainer.getInstance())
      }

      instances.forEach(instance => {
        expect(instance).toBe(instances[0])
      })
    })

    it('deve lidar com chamadas simultâneas de serviços', () => {
      ;(ServiceContainer as any).instance = undefined

      const container = ServiceContainer.getInstance()

      for (let i = 0; i < 3; i++) {
        container.getGameService()
        container.getMetadataService()
        container.getFavoritesService()
      }

      expect(GameService).toHaveBeenCalledTimes(1)
      expect(MetadataService).toHaveBeenCalledTimes(1)
      expect(FavoritesService).toHaveBeenCalledTimes(1)
    })
  })

  describe('Performance', () => {
    it('deve ser eficiente em múltiplas chamadas', () => {
      const container = ServiceContainer.getInstance()
      const startTime = performance.now()

      for (let i = 0; i < 100; i++) {
        container.getGameService()
        container.getMetadataService()
        container.getFavoritesService()
      }

      const endTime = performance.now()
      const duration = endTime - startTime

      expect(duration).toBeLessThan(10)
    })
  })
})
