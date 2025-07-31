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
      const repository = dddContainer.getRepository('GameRepository')

      expect(repository).toBeDefined()
      expect(typeof repository.getGames).toBe('function')
      expect(typeof repository.getGameById).toBe('function')
      expect(typeof repository.searchGames).toBe('function')
    })

    it('deve retornar FavoritesRepository quando solicitado', () => {
      const repository = dddContainer.getRepository('FavoritesRepository')

      expect(repository).toBeDefined()
      expect(typeof repository.getFavorites).toBe('function')
      expect(typeof repository.addFavorite).toBe('function')
      expect(typeof repository.removeFavorite).toBe('function')
      expect(typeof repository.isFavorite).toBe('function')
    })

    it('deve lançar erro quando repositório não existe', () => {
      expect(() => {
        dddContainer.getRepository('NonExistentRepository')
      }).toThrow('Repository NonExistentRepository not found')
    })
  })

  describe('getService', () => {
    it('deve retornar GameDomainService quando solicitado', () => {
      const service = dddContainer.getService('GameDomainService')

      expect(service).toBeDefined()
      expect(typeof service.getGames).toBe('function')
      expect(typeof service.getGameById).toBe('function')
      expect(typeof service.searchGames).toBe('function')
      expect(typeof service.getFavorites).toBe('function')
      expect(typeof service.addFavorite).toBe('function')
      expect(typeof service.removeFavorite).toBe('function')
      expect(typeof service.isFavorite).toBe('function')
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
      expect(typeof repository.getGames).toBe('function')
      expect(typeof repository.getGameById).toBe('function')
      expect(typeof repository.searchGames).toBe('function')
    })

    it('deve retornar FavoritesRepository através de getFavoritesRepository()', () => {
      const repository = dddContainer.getFavoritesRepository()

      expect(repository).toBeDefined()
      expect(typeof repository.getFavorites).toBe('function')
      expect(typeof repository.addFavorite).toBe('function')
      expect(typeof repository.removeFavorite).toBe('function')
      expect(typeof repository.isFavorite).toBe('function')
    })

    it('deve retornar GameDomainService através de getGameDomainService()', () => {
      const service = dddContainer.getGameDomainService()

      expect(service).toBeDefined()
      expect(typeof service.getGames).toBe('function')
      expect(typeof service.getGameById).toBe('function')
      expect(typeof service.searchGames).toBe('function')
      expect(typeof service.getFavorites).toBe('function')
      expect(typeof service.addFavorite).toBe('function')
      expect(typeof service.removeFavorite).toBe('function')
      expect(typeof service.isFavorite).toBe('function')
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
