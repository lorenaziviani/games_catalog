import { jest } from '@jest/globals'

jest.mock('@/infrastructure/repositories/GameRepository', () => {
  return {
    GameRepository: jest.fn().mockImplementation(() => ({
      getGames: jest.fn(),
      getGameById: jest.fn(),
      searchGames: jest.fn()
    }))
  }
})

jest.mock('@/infrastructure/repositories/FavoritesRepository', () => {
  return {
    FavoritesRepository: jest.fn().mockImplementation(() => ({
      getFavorites: jest.fn(),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn()
    }))
  }
})

jest.mock('@/domain/services/GameDomainService', () => {
  return {
    GameDomainService: jest.fn().mockImplementation(() => ({
      getGames: jest.fn(),
      getGameById: jest.fn(),
      searchGames: jest.fn(),
      getFavorites: jest.fn(),
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn()
    }))
  }
})

import { dddContainer } from './DDDContainer'

// Mock das implementações dos repositórios
jest.mock('@/infrastructure/repositories/GameRepository', () => ({
  GameRepository: jest.fn().mockImplementation(() => ({
    findPopularGames: jest.fn(),
    searchGames: jest.fn(),
    findGamesByCriteria: jest.fn(),
    findGameById: jest.fn(),
    findGamesByGenre: jest.fn(),
    findGamesByGenres: jest.fn(),
    findGamesByPlatforms: jest.fn(),
    findGamesByStores: jest.fn(),
    findGamesByTags: jest.fn(),
    findTopRatedGames: jest.fn(),
    findRecentlyReleasedGames: jest.fn(),
    findGamesWithHighMetacriticScore: jest.fn(),
    getGameStatistics: jest.fn()
  }))
}))

jest.mock('@/infrastructure/repositories/FavoritesRepository', () => ({
  FavoritesRepository: jest.fn().mockImplementation(() => ({
    addToFavorites: jest.fn(),
    removeFromFavorites: jest.fn(),
    clearAllFavorites: jest.fn(),
    findAllFavorites: jest.fn(),
    findFavoriteById: jest.fn(),
    isFavorite: jest.fn(),
    findFavoritesByGenres: jest.fn(),
    findFavoritesByPlatforms: jest.fn(),
    findFavoritesByStores: jest.fn(),
    findFavoritesByTags: jest.fn(),
    searchFavorites: jest.fn(),
    findTopRatedFavorites: jest.fn(),
    findRecentlyAddedFavorites: jest.fn(),
    getFavoritesStatistics: jest.fn(),
    getAvailableGenres: jest.fn(),
    getAvailablePlatforms: jest.fn(),
    getAvailableStores: jest.fn(),
    getAvailableTags: jest.fn()
  }))
}))

jest.mock('@/domain/services/GameDomainService', () => ({
  GameDomainService: jest.fn().mockImplementation(() => ({
    searchGamesWithFavorites: jest.fn(),
    getPopularGamesWithFavorites: jest.fn(),
    getRecommendedGames: jest.fn(),
    getUserGamingProfile: jest.fn(),
    compareGames: jest.fn(),
    getGamingInsights: jest.fn()
  }))
}))

// Mock do ServiceContainer
jest.mock('@/services/ServiceContainer', () => ({
  serviceContainer: {
    getGameService: jest.fn(() => ({
      getPopularGames: jest.fn(),
      searchGames: jest.fn(),
      getGamesWithFilters: jest.fn(),
      getGameById: jest.fn(),
      getGamesByGenre: jest.fn(),
      getGamesByGenres: jest.fn(),
      getGamesByPlatforms: jest.fn(),
      getGamesByStores: jest.fn(),
      getGamesByTags: jest.fn(),
      getTopRatedGames: jest.fn(),
      getRecentlyReleasedGames: jest.fn(),
      getGamesWithHighMetacriticScore: jest.fn(),
      getGameStatistics: jest.fn()
    }))
  }
}))

// Mock do favoritesStorage
jest.mock('@/store/favorites/utils', () => ({
  favoritesStorage: {
    save: jest.fn(),
    load: jest.fn(),
    clear: jest.fn()
  }
}))

const DDDContainer = (dddContainer as any).constructor

describe('DDDContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Singleton Pattern', () => {
    it('deve retornar a mesma instância quando getInstance() é chamado múltiplas vezes', () => {
      ;(DDDContainer as any).instance = undefined

      const instance1 = DDDContainer.getInstance()
      const instance2 = DDDContainer.getInstance()

      expect(instance1).toBe(instance2)
      expect(instance1).toBeInstanceOf(DDDContainer)
    })

    it('deve exportar uma instância singleton como dddContainer', () => {
      expect(dddContainer).toBeInstanceOf(DDDContainer)
      expect(typeof dddContainer.getRepository).toBe('function')
      expect(typeof dddContainer.getService).toBe('function')
    })
  })

  describe('Inicialização', () => {
    it('deve inicializar repositórios corretamente', () => {
      ;(DDDContainer as any).instance = undefined

      DDDContainer.getInstance()

      expect(dddContainer.getGameRepository()).toBeDefined()
      expect(dddContainer.getFavoritesRepository()).toBeDefined()
    })

    it('deve inicializar serviços corretamente', () => {
      ;(DDDContainer as any).instance = undefined

      DDDContainer.getInstance()

      expect(dddContainer.getGameDomainService()).toBeDefined()
    })
  })

  describe('getRepository', () => {
    it('deve retornar GameRepository quando solicitado', () => {
      const repository = dddContainer.getRepository('GameRepository') as any

      expect(repository).toBeDefined()
      expect(typeof repository.findPopularGames).toBe('function')
      expect(typeof repository.findGameById).toBe('function')
      expect(typeof repository.searchGames).toBe('function')
      expect(typeof repository.findGamesByCriteria).toBe('function')
    })

    it('deve retornar FavoritesRepository quando solicitado', () => {
      const repository = dddContainer.getRepository(
        'FavoritesRepository'
      ) as any

      expect(repository).toBeDefined()
      expect(typeof repository.findAllFavorites).toBe('function')
      expect(typeof repository.addToFavorites).toBe('function')
      expect(typeof repository.removeFromFavorites).toBe('function')
      expect(typeof repository.isFavorite).toBe('function')
      expect(typeof repository.searchFavorites).toBe('function')
    })

    it('deve lançar erro quando repositório não existe', () => {
      expect(() => {
        dddContainer.getRepository('NonExistentRepository')
      }).toThrow('Repository NonExistentRepository not found')
    })
  })

  describe('getService', () => {
    it('deve retornar GameDomainService quando solicitado', () => {
      const service = dddContainer.getService('GameDomainService') as any

      expect(service).toBeDefined()
      expect(typeof service.searchGamesWithFavorites).toBe('function')
      expect(typeof service.getPopularGamesWithFavorites).toBe('function')
      expect(typeof service.getRecommendedGames).toBe('function')
      expect(typeof service.getUserGamingProfile).toBe('function')
      expect(typeof service.compareGames).toBe('function')
      expect(typeof service.getGamingInsights).toBe('function')
    })

    it('deve lançar erro quando serviço não existe', () => {
      expect(() => {
        dddContainer.getService('NonExistentService')
      }).toThrow('Service NonExistentService not found')
    })
  })

  describe('Métodos específicos de getter', () => {
    it('deve retornar GameRepository através de getGameRepository()', () => {
      const repository = dddContainer.getGameRepository()

      expect(repository).toBeDefined()
      expect(typeof repository.findPopularGames).toBe('function')
      expect(typeof repository.findGameById).toBe('function')
      expect(typeof repository.searchGames).toBe('function')
      expect(typeof repository.findGamesByCriteria).toBe('function')
    })

    it('deve retornar FavoritesRepository através de getFavoritesRepository()', () => {
      const repository = dddContainer.getFavoritesRepository()

      expect(repository).toBeDefined()
      expect(typeof repository.findAllFavorites).toBe('function')
      expect(typeof repository.addToFavorites).toBe('function')
      expect(typeof repository.removeFromFavorites).toBe('function')
      expect(typeof repository.isFavorite).toBe('function')
      expect(typeof repository.searchFavorites).toBe('function')
    })

    it('deve retornar GameDomainService através de getGameDomainService()', () => {
      const service = dddContainer.getGameDomainService()

      expect(service).toBeDefined()
      expect(typeof service.searchGamesWithFavorites).toBe('function')
      expect(typeof service.getPopularGamesWithFavorites).toBe('function')
      expect(typeof service.getRecommendedGames).toBe('function')
      expect(typeof service.getUserGamingProfile).toBe('function')
      expect(typeof service.compareGames).toBe('function')
      expect(typeof service.getGamingInsights).toBe('function')
    })
  })

  describe('Tratamento de erros', () => {
    it('deve lançar erro específico para repositório não encontrado', () => {
      expect(() => {
        dddContainer.getRepository('InvalidRepository')
      }).toThrow('Repository InvalidRepository not found')
    })

    it('deve lançar erro específico para serviço não encontrado', () => {
      expect(() => {
        dddContainer.getService('InvalidService')
      }).toThrow('Service InvalidService not found')
    })

    it('deve lançar erro com mensagem correta para repositório inexistente', () => {
      try {
        dddContainer.getRepository('TestRepository')
        fail('Deveria ter lançado um erro')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((error as Error).message).toBe(
          'Repository TestRepository not found'
        )
      }
    })

    it('deve lançar erro com mensagem correta para serviço inexistente', () => {
      try {
        dddContainer.getService('TestService')
        fail('Deveria ter lançado um erro')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((error as Error).message).toBe('Service TestService not found')
      }
    })
  })

  describe('Performance e Memória', () => {
    it('deve reutilizar a mesma instância de repositórios', () => {
      const repository1 = dddContainer.getRepository('GameRepository')
      const repository2 = dddContainer.getRepository('GameRepository')

      expect(repository1).toBe(repository2)
    })

    it('deve reutilizar a mesma instância de serviços', () => {
      const service1 = dddContainer.getService('GameDomainService')
      const service2 = dddContainer.getService('GameDomainService')

      expect(service1).toBe(service2)
    })
  })

  describe('Estrutura do Container', () => {
    it('deve ter métodos de acesso aos repositórios', () => {
      expect(typeof dddContainer.getGameRepository).toBe('function')
      expect(typeof dddContainer.getFavoritesRepository).toBe('function')
    })

    it('deve ter métodos de acesso aos serviços', () => {
      expect(typeof dddContainer.getGameDomainService).toBe('function')
    })

    it('deve ter métodos genéricos de acesso', () => {
      expect(typeof dddContainer.getRepository).toBe('function')
      expect(typeof dddContainer.getService).toBe('function')
    })
  })
})
