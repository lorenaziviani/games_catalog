import { serviceContainer } from '@/services/ServiceContainer'
import { GameRepository } from './GameRepository'

jest.mock('@/services/ServiceContainer', () => ({
  serviceContainer: {
    getGameService: jest.fn()
  }
}))

jest.mock('@/domain/entities/Game', () => ({
  Game: jest.fn().mockImplementation(data => ({
    id: data.id,
    name: data.name,
    rating: data.rating,
    metacritic: data.metacritic,
    genres: data.genres || [],
    platforms: data.platforms || [],
    stores: data.stores || [],
    tags: data.tags || [],
    toDTO: jest.fn().mockReturnValue(data)
  }))
}))

jest.mock('@/domain/aggregates/GameCollection', () => ({
  GameCollection: jest
    .fn()
    .mockImplementation((games, count, next, previous) => {
      const collection = {
        games,
        count,
        next,
        previous,
        hasNext: !!next,
        hasPrevious: !!previous,
        getAverageRating: jest.fn().mockReturnValue(4.5),
        getGenreDistribution: jest.fn().mockReturnValue({ Action: 1 }),
        getPlatformDistribution: jest.fn().mockReturnValue({ PC: 1 }),
        getRatingDistribution: jest.fn().mockReturnValue({ '4-5': 1 }),
        totalCount: count
      }
      return collection
    })
}))

describe('GameRepository', () => {
  let gameRepository: GameRepository

  let mockGameService: any

  const mockGameData = {
    id: 1,
    name: 'Test Game',
    rating: 4.5,
    metacritic: 85,
    genres: [{ id: 1, name: 'Action' }],
    platforms: [{ id: 1, name: 'PC' }],
    stores: [{ id: 1, name: 'Steam' }],
    tags: [{ id: 1, name: 'Multiplayer' }]
  }

  const mockGamesResponse = {
    results: [mockGameData],
    count: 1,
    next: null,
    previous: null
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockGameService = {
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
      getGamesWithHighMetacriticScore: jest.fn()
    }
    ;(serviceContainer.getGameService as jest.Mock).mockReturnValue(
      mockGameService
    )
    gameRepository = new GameRepository()
  })

  describe('findPopularGames', () => {
    it('deve buscar jogos populares com sucesso', async () => {
      mockGameService.getPopularGames.mockResolvedValue(mockGamesResponse)

      const result = await gameRepository.findPopularGames(1, 20)

      expect(mockGameService.getPopularGames).toHaveBeenCalledWith(1, 20)
      expect(result).toBeDefined()
      expect(result.games).toHaveLength(1)
      expect(result.count).toBe(1)
    })

    it('deve usar valores padrão quando não especificados', async () => {
      mockGameService.getPopularGames.mockResolvedValue(mockGamesResponse)

      await gameRepository.findPopularGames()

      expect(mockGameService.getPopularGames).toHaveBeenCalledWith(1, 20)
    })

    it('deve lançar erro quando a API falha', async () => {
      const error = new Error('API Error')
      mockGameService.getPopularGames.mockRejectedValue(error)

      await expect(gameRepository.findPopularGames()).rejects.toThrow(
        'Falha ao buscar jogos populares'
      )
    })
  })

  describe('searchGames', () => {
    it('deve buscar jogos por query com sucesso', async () => {
      mockGameService.searchGames.mockResolvedValue(mockGamesResponse)

      const result = await gameRepository.searchGames('test', 1, 20)

      expect(mockGameService.searchGames).toHaveBeenCalledWith('test', 1, 20)
      expect(result).toBeDefined()
      expect(result.games).toHaveLength(1)
    })

    it('deve usar valores padrão quando não especificados', async () => {
      mockGameService.searchGames.mockResolvedValue(mockGamesResponse)

      await gameRepository.searchGames('test')

      expect(mockGameService.searchGames).toHaveBeenCalledWith('test', 1, 20)
    })

    it('deve lançar erro quando a API falha', async () => {
      const error = new Error('API Error')
      mockGameService.searchGames.mockRejectedValue(error)

      await expect(gameRepository.searchGames('test')).rejects.toThrow(
        'Falha ao buscar jogos'
      )
    })
  })

  describe('findGamesByCriteria', () => {
    it('deve buscar jogos por critérios com sucesso', async () => {
      const criteria = {
        page: 1,
        pageSize: 20,
        search: 'test',
        genres: [1, 2],
        platforms: [1],
        ordering: '-rating'
      }

      mockGameService.getGamesWithFilters.mockResolvedValue(mockGamesResponse)

      const result = await gameRepository.findGamesByCriteria(criteria)

      expect(mockGameService.getGamesWithFilters).toHaveBeenCalled()
      expect(result).toBeDefined()
    })

    it('deve lançar erro quando a API falha', async () => {
      const criteria = { search: 'test' }
      const error = new Error('API Error')
      mockGameService.getGamesWithFilters.mockRejectedValue(error)

      await expect(
        gameRepository.findGamesByCriteria(criteria)
      ).rejects.toThrow('Falha ao buscar jogos por critérios')
    })
  })

  describe('findGameById', () => {
    it('deve buscar jogo por ID com sucesso', async () => {
      mockGameService.getGameById.mockResolvedValue(mockGameData)

      const result = await gameRepository.findGameById(1)

      expect(mockGameService.getGameById).toHaveBeenCalledWith(1)
      expect(result).toBeDefined()
      expect(result?.id).toBe(1)
    })

    it('deve retornar null quando jogo não encontrado', async () => {
      const error = new Error('Not Found')
      mockGameService.getGameById.mockRejectedValue(error)

      const result = await gameRepository.findGameById(999)

      expect(result).toBeNull()
    })
  })

  describe('findGamesByGenre', () => {
    it('deve buscar jogos por gênero com sucesso', async () => {
      mockGameService.getGamesByGenre.mockResolvedValue(mockGamesResponse)

      const result = await gameRepository.findGamesByGenre('action', 1, 20)

      expect(mockGameService.getGamesByGenre).toHaveBeenCalledWith(
        'action',
        1,
        20
      )
      expect(result).toBeDefined()
    })

    it('deve usar valores padrão quando não especificados', async () => {
      mockGameService.getGamesByGenre.mockResolvedValue(mockGamesResponse)

      await gameRepository.findGamesByGenre('action')

      expect(mockGameService.getGamesByGenre).toHaveBeenCalledWith(
        'action',
        1,
        20
      )
    })
  })

  describe('findGamesByGenres', () => {
    it('deve buscar jogos por múltiplos gêneros com sucesso', async () => {
      mockGameService.getGamesWithFilters.mockResolvedValue(mockGamesResponse)

      const result = await gameRepository.findGamesByGenres([1, 2], 1, 20)

      expect(mockGameService.getGamesWithFilters).toHaveBeenCalledWith(
        expect.objectContaining({
          genres: '1,2',
          page: '1'
        }),
        20
      )
      expect(result).toBeDefined()
      expect(result.games).toHaveLength(1)
      expect(result.count).toBe(1)
    })
  })

  describe('findGamesByPlatforms', () => {
    it('deve buscar jogos por plataformas com sucesso', async () => {
      mockGameService.getGamesWithFilters.mockResolvedValue(mockGamesResponse)

      const result = await gameRepository.findGamesByPlatforms([1, 2], 1, 20)

      expect(mockGameService.getGamesWithFilters).toHaveBeenCalledWith(
        expect.objectContaining({
          platforms: '1,2',
          page: '1'
        }),
        20
      )
      expect(result).toBeDefined()
      expect(result.games).toHaveLength(1)
      expect(result.count).toBe(1)
    })
  })

  describe('findGamesByStores', () => {
    it('deve buscar jogos por lojas com sucesso', async () => {
      mockGameService.getGamesWithFilters.mockResolvedValue(mockGamesResponse)

      const result = await gameRepository.findGamesByStores([1, 2], 1, 20)

      expect(mockGameService.getGamesWithFilters).toHaveBeenCalledWith(
        expect.objectContaining({
          stores: '1,2',
          page: '1'
        }),
        20
      )
      expect(result).toBeDefined()
      expect(result.games).toHaveLength(1)
      expect(result.count).toBe(1)
    })
  })

  describe('findGamesByTags', () => {
    it('deve buscar jogos por tags com sucesso', async () => {
      mockGameService.getGamesWithFilters.mockResolvedValue(mockGamesResponse)

      const result = await gameRepository.findGamesByTags([1, 2], 1, 20)

      expect(mockGameService.getGamesWithFilters).toHaveBeenCalledWith(
        expect.objectContaining({
          tags: '1,2',
          page: '1'
        }),
        20
      )
      expect(result).toBeDefined()
      expect(result.games).toHaveLength(1)
      expect(result.count).toBe(1)
    })
  })

  describe('findTopRatedGames', () => {
    it('deve buscar jogos mais bem avaliados com sucesso', async () => {
      mockGameService.getGamesWithFilters.mockResolvedValue(mockGamesResponse)

      const result = await gameRepository.findTopRatedGames(10)

      expect(mockGameService.getGamesWithFilters).toHaveBeenCalledWith(
        expect.objectContaining({
          ordering: '-rating'
        }),
        10
      )
      expect(result).toBeDefined()
      expect(result.games).toHaveLength(1)
      expect(result.count).toBe(1)
    })

    it('deve usar limite padrão quando não especificado', async () => {
      mockGameService.getGamesWithFilters.mockResolvedValue(mockGamesResponse)

      const result = await gameRepository.findTopRatedGames()

      expect(mockGameService.getGamesWithFilters).toHaveBeenCalledWith(
        expect.objectContaining({
          ordering: '-rating'
        }),
        10
      )
      expect(result).toBeDefined()
      expect(result.count).toBe(1)
    })
  })

  describe('findRecentlyReleasedGames', () => {
    it('deve buscar jogos recentemente lançados com sucesso', async () => {
      mockGameService.getGamesWithFilters.mockResolvedValue(mockGamesResponse)

      const result = await gameRepository.findRecentlyReleasedGames(10)

      expect(mockGameService.getGamesWithFilters).toHaveBeenCalledWith(
        expect.objectContaining({
          ordering: '-released'
        }),
        10
      )
      expect(result).toBeDefined()
      expect(result.games).toHaveLength(1)
      expect(result.count).toBe(1)
    })
  })

  describe('findGamesWithHighMetacriticScore', () => {
    it('deve buscar jogos com alta pontuação Metacritic com sucesso', async () => {
      mockGameService.getGamesWithFilters.mockResolvedValue(mockGamesResponse)

      const result = await gameRepository.findGamesWithHighMetacriticScore(80)

      expect(mockGameService.getGamesWithFilters).toHaveBeenCalledWith(
        expect.objectContaining({
          metacritic: '80,100'
        }),
        undefined
      )
      expect(result).toBeDefined()
      expect(result.games).toHaveLength(1)
      expect(result.count).toBe(1)
    })

    it('deve usar threshold padrão quando não especificado', async () => {
      mockGameService.getGamesWithFilters.mockResolvedValue(mockGamesResponse)

      const result = await gameRepository.findGamesWithHighMetacriticScore()

      expect(mockGameService.getGamesWithFilters).toHaveBeenCalledWith(
        expect.objectContaining({
          metacritic: '80,100'
        }),
        undefined
      )
      expect(result).toBeDefined()
      expect(result.count).toBe(1)
    })
  })

  describe('getGameStatistics', () => {
    it('deve retornar estatísticas dos jogos com sucesso', async () => {
      mockGameService.getPopularGames.mockResolvedValue({
        results: Array(100).fill(mockGameData),
        count: 100,
        next: null,
        previous: null
      })

      const result = await gameRepository.getGameStatistics()

      expect(result).toHaveProperty('totalGames')
      expect(result).toHaveProperty('averageRating')
      expect(result).toHaveProperty('genreDistribution')
      expect(result).toHaveProperty('platformDistribution')
      expect(result).toHaveProperty('ratingDistribution')
    })
  })

  describe('buildFilterParams', () => {
    it('deve construir parâmetros de filtro corretamente', async () => {
      const criteria = {
        search: 'test',
        genres: [1, 2],
        platforms: [1],
        stores: [1],
        tags: [1],
        dateRange: { start: '2023-01-01', end: '2023-12-31' },
        metacriticRange: { min: 80, max: 100 },
        ordering: '-rating'
      }

      mockGameService.getGamesWithFilters.mockResolvedValue(mockGamesResponse)

      await gameRepository.findGamesByCriteria(criteria)

      expect(mockGameService.getGamesWithFilters).toHaveBeenCalled()
    })
  })
})
