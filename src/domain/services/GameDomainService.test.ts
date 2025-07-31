import { GameCollection } from '@/domain/aggregates/GameCollection'
import { Game } from '@/domain/entities/Game'
import type { IFavoritesRepository } from '@/domain/repositories/IFavoritesRepository'
import type { IGameRepository } from '@/domain/repositories/IGameRepository'
import { GameDomainService } from './GameDomainService'

jest.mock('@/domain/entities/Game', () => ({
  Game: jest.fn().mockImplementation(data => ({
    id: data.id,
    name: data.name,
    rating: data.rating,
    metacritic: data.metacritic,
    playtime: data.playtime || 0,
    released: data.released || '2023-01-01',
    genres: data.genres || [],
    platforms: data.platforms || [],
    stores: data.stores || [],
    tags: data.tags || [],
    getGenreNames: jest
      .fn()

      .mockReturnValue(data.genres?.map((g: any) => g.name) || []),
    getPlatformNames: jest
      .fn()

      .mockReturnValue(data.platforms?.map((p: any) => p.name) || []),
    getStoreNames: jest
      .fn()

      .mockReturnValue(data.stores?.map((s: any) => s.name) || []),
    getTagNames: jest
      .fn()

      .mockReturnValue(data.tags?.map((t: any) => t.name) || []),
    isHighlyRated: jest.fn().mockReturnValue(data.rating >= 4.0),
    isReleased: jest.fn().mockReturnValue(true),
    hasMetacriticScore: jest.fn().mockReturnValue(!!data.metacritic),
    matchesSearchTerm: jest.fn().mockReturnValue(true),
    matchesGenreFilter: jest.fn().mockReturnValue(true),
    matchesPlatformFilter: jest.fn().mockReturnValue(true),
    matchesStoreFilter: jest.fn().mockReturnValue(true),
    matchesTagFilter: jest.fn().mockReturnValue(true),
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
        getAverageRating: jest.fn().mockReturnValue(4.2),
        getGenreDistribution: jest.fn().mockReturnValue({ Action: 3, RPG: 2 }),
        getPlatformDistribution: jest.fn().mockReturnValue({ PC: 3, PS5: 2 }),
        getRatingDistribution: jest
          .fn()
          .mockReturnValue({ '4-5': 3, '3-4': 2 }),
        getHighlyRatedGames: jest
          .fn()
          .mockReturnValue(games.filter(g => g.rating >= 4.0)),
        getRecentlyReleasedGames: jest.fn().mockReturnValue(games.slice(0, 3)),
        getUniqueGenres: jest.fn().mockReturnValue(['Action', 'RPG']),
        getUniquePlatforms: jest.fn().mockReturnValue(['PC', 'PS5']),
        getUniqueStores: jest
          .fn()
          .mockReturnValue(['Steam', 'PlayStation Store']),
        getUniqueTags: jest
          .fn()
          .mockReturnValue(['Multiplayer', 'Single-player']),
        totalCount: count
      }
      return collection
    })
}))

describe('GameDomainService', () => {
  let gameDomainService: GameDomainService
  let mockGameRepository: jest.Mocked<IGameRepository>
  let mockFavoritesRepository: jest.Mocked<IFavoritesRepository>

  const mockGameData = {
    id: 1,
    name: 'Test Game',
    rating: 4.5,
    metacritic: 85,
    playtime: 20,
    released: '2023-01-01',
    genres: [
      {
        id: 1,
        name: 'Action',
        slug: 'action',
        games_count: 100,
        image_background: 'url'
      }
    ],
    platforms: [
      {
        id: 1,
        name: 'PC',
        slug: 'pc',
        games_count: 100,
        image_background: 'url'
      }
    ],
    stores: [
      {
        id: 1,
        name: 'Steam',
        slug: 'steam',
        games_count: 100,
        image_background: 'url'
      }
    ],
    tags: [
      {
        id: 1,
        name: 'Multiplayer',
        slug: 'multiplayer',
        games_count: 100,
        image_background: 'url'
      }
    ]
  }

  beforeEach(() => {
    jest.clearAllMocks()

    mockGameRepository = {
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
    } as jest.Mocked<IGameRepository>

    mockFavoritesRepository = {
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
      isFavorite: jest.fn(),
      findAllFavorites: jest.fn(),
      searchFavorites: jest.fn(),
      getFavoritesCount: jest.fn()
    } as any

    gameDomainService = new GameDomainService(
      mockGameRepository,
      mockFavoritesRepository
    )
  })

  describe('searchGamesWithFavorites', () => {
    it('deve buscar jogos com favoritos com sucesso', async () => {
      const mockGames = new GameCollection([new Game(mockGameData)], 1)
      const mockFavorites = new GameCollection([new Game(mockGameData)], 1)

      mockGameRepository.searchGames.mockResolvedValue(mockGames)
      mockFavoritesRepository.searchFavorites.mockResolvedValue(mockFavorites)

      const result = await gameDomainService.searchGamesWithFavorites('test')

      expect(mockGameRepository.searchGames).toHaveBeenCalledWith('test', 1, 20)
      expect(mockFavoritesRepository.searchFavorites).toHaveBeenCalledWith(
        'test'
      )
      expect(result.games).toBeDefined()
      expect(result.favorites).toBeDefined()
      expect(result.isFavorite).toBeDefined()
      expect(result.isFavorite(1)).toBe(true)
    })

    it('deve usar valores padrão quando não especificados', async () => {
      const mockGames = new GameCollection([new Game(mockGameData)], 1)
      const mockFavorites = new GameCollection([], 0)

      mockGameRepository.searchGames.mockResolvedValue(mockGames)
      mockFavoritesRepository.searchFavorites.mockResolvedValue(mockFavorites)

      await gameDomainService.searchGamesWithFavorites('test')

      expect(mockGameRepository.searchGames).toHaveBeenCalledWith('test', 1, 20)
    })

    it('deve retornar isFavorite como false quando jogo não está nos favoritos', async () => {
      const mockGames = new GameCollection([new Game(mockGameData)], 1)
      const mockFavorites = new GameCollection([], 0)

      mockGameRepository.searchGames.mockResolvedValue(mockGames)
      mockFavoritesRepository.searchFavorites.mockResolvedValue(mockFavorites)

      const result = await gameDomainService.searchGamesWithFavorites('test')

      expect(result.isFavorite(1)).toBe(false)
    })
  })

  describe('getPopularGamesWithFavorites', () => {
    it('deve buscar jogos populares com favoritos com sucesso', async () => {
      const mockGames = new GameCollection([new Game(mockGameData)], 1)
      const mockFavorites = new GameCollection([new Game(mockGameData)], 1)

      mockGameRepository.findPopularGames.mockResolvedValue(mockGames)
      mockFavoritesRepository.findAllFavorites.mockResolvedValue(mockFavorites)

      const result = await gameDomainService.getPopularGamesWithFavorites()

      expect(mockGameRepository.findPopularGames).toHaveBeenCalledWith(1, 20)
      expect(mockFavoritesRepository.findAllFavorites).toHaveBeenCalled()
      expect(result.games).toBeDefined()
      expect(result.favorites).toBeDefined()
      expect(result.isFavorite).toBeDefined()
    })

    it('deve usar valores padrão quando não especificados', async () => {
      const mockGames = new GameCollection([new Game(mockGameData)], 1)
      const mockFavorites = new GameCollection([], 0)

      mockGameRepository.findPopularGames.mockResolvedValue(mockGames)
      mockFavoritesRepository.findAllFavorites.mockResolvedValue(mockFavorites)

      await gameDomainService.getPopularGamesWithFavorites()

      expect(mockGameRepository.findPopularGames).toHaveBeenCalledWith(1, 20)
    })
  })

  describe('getRecommendedGames', () => {
    it('deve retornar jogos recomendados baseados nos favoritos do usuário', async () => {
      const userFavorites = new GameCollection(
        [
          new Game({
            ...mockGameData,
            id: 1,
            genres: [{ id: 1, name: 'Action' }]
          }),
          new Game({ ...mockGameData, id: 2, genres: [{ id: 2, name: 'RPG' }] })
        ],
        2
      )

      const similarGames = new GameCollection(
        [
          new Game({ ...mockGameData, id: 3, rating: 4.8 }),
          new Game({ ...mockGameData, id: 4, rating: 4.6 }),
          new Game({ ...mockGameData, id: 5, rating: 4.4 })
        ],
        3
      )

      mockGameRepository.findTopRatedGames.mockResolvedValue(similarGames)

      const result = await gameDomainService.getRecommendedGames(
        userFavorites,
        2
      )

      expect(mockGameRepository.findTopRatedGames).toHaveBeenCalledWith(4)
      expect(result).toBeDefined()
      expect(result.games).toHaveLength(2)
      expect(result.count).toBe(2)
    })

    it('deve filtrar jogos que já estão nos favoritos', async () => {
      const userFavorites = new GameCollection(
        [new Game({ ...mockGameData, id: 1 })],
        1
      )

      const similarGames = new GameCollection(
        [
          new Game({ ...mockGameData, id: 1 }),
          new Game({ ...mockGameData, id: 2, rating: 4.8 })
        ],
        2
      )

      mockGameRepository.findTopRatedGames.mockResolvedValue(similarGames)

      const result = await gameDomainService.getRecommendedGames(
        userFavorites,
        5
      )

      expect(result.games).toHaveLength(1)
      expect(result.games[0].id).toBe(2)
    })

    it('deve usar limite padrão quando não especificado', async () => {
      const userFavorites = new GameCollection([new Game(mockGameData)], 1)
      const similarGames = new GameCollection([new Game(mockGameData)], 1)

      mockGameRepository.findTopRatedGames.mockResolvedValue(similarGames)

      await gameDomainService.getRecommendedGames(userFavorites)

      expect(mockGameRepository.findTopRatedGames).toHaveBeenCalledWith(20)
    })
  })

  describe('getUserGamingProfile', () => {
    it('deve retornar perfil de gaming do usuário com sucesso', async () => {
      const favorites = new GameCollection(
        [
          new Game({ ...mockGameData, id: 1, rating: 4.5, playtime: 30 }),
          new Game({ ...mockGameData, id: 2, rating: 4.0, playtime: 25 })
        ],
        2
      )

      const result = await gameDomainService.getUserGamingProfile(favorites)

      expect(result).toHaveProperty('preferredGenres')
      expect(result).toHaveProperty('preferredPlatforms')
      expect(result).toHaveProperty('averageRating')
      expect(result).toHaveProperty('totalPlaytime')
      expect(result).toHaveProperty('gamingStyle')
      expect(result).toHaveProperty('recommendations')
      expect(result.preferredGenres).toHaveLength(2)
      expect(result.preferredPlatforms).toHaveLength(2)
      expect(result.averageRating).toBe(4.2)
      expect(result.totalPlaytime).toBe(55)
    })

    it('deve determinar estilo de gaming baseado na avaliação dos jogos', async () => {
      const highlyRatedFavorites = new GameCollection(
        [
          new Game({ ...mockGameData, id: 1, rating: 4.8 }),
          new Game({ ...mockGameData, id: 2, rating: 4.7 }),
          new Game({ ...mockGameData, id: 3, rating: 4.9 })
        ],
        3
      )

      const result =
        await gameDomainService.getUserGamingProfile(highlyRatedFavorites)

      expect(result.gamingStyle).toBe('Crítico')
    })
  })

  describe('compareGames', () => {
    it('deve comparar jogos com sucesso', async () => {
      const game1 = new Game({
        ...mockGameData,
        id: 1,
        rating: 4.5,
        playtime: 30
      })
      const game2 = new Game({
        ...mockGameData,
        id: 2,
        rating: 4.0,
        playtime: 25
      })

      mockGameRepository.findGameById
        .mockResolvedValueOnce(game1)
        .mockResolvedValueOnce(game2)

      const result = await gameDomainService.compareGames([1, 2])

      expect(mockGameRepository.findGameById).toHaveBeenCalledWith(1)
      expect(mockGameRepository.findGameById).toHaveBeenCalledWith(2)
      expect(result.games).toHaveLength(2)
      expect(result.comparison).toHaveProperty('averageRating')
      expect(result.comparison).toHaveProperty('totalPlaytime')
      expect(result.comparison).toHaveProperty('genreOverlap')
      expect(result.comparison).toHaveProperty('platformOverlap')
      expect(result.comparison).toHaveProperty('bestRated')
      expect(result.comparison).toHaveProperty('mostPlayed')
    })

    it('deve lançar erro quando menos de 2 jogos são fornecidos', async () => {
      await expect(gameDomainService.compareGames([1])).rejects.toThrow(
        'É necessário pelo menos 2 jogos para comparação'
      )
    })

    it('deve lançar erro quando não consegue encontrar jogos suficientes', async () => {
      mockGameRepository.findGameById.mockResolvedValue(null)

      await expect(gameDomainService.compareGames([1, 2])).rejects.toThrow(
        'Não foi possível encontrar jogos suficientes para comparação'
      )
    })

    it('deve calcular estatísticas de comparação corretamente', async () => {
      const game1 = new Game({
        ...mockGameData,
        id: 1,
        rating: 4.5,
        playtime: 30
      })
      const game2 = new Game({
        ...mockGameData,
        id: 2,
        rating: 4.0,
        playtime: 25
      })

      mockGameRepository.findGameById
        .mockResolvedValueOnce(game1)
        .mockResolvedValueOnce(game2)

      const result = await gameDomainService.compareGames([1, 2])

      expect(result.comparison.averageRating).toBe(4.25)
      expect(result.comparison.totalPlaytime).toBe(55)
      expect(result.comparison.bestRated.id).toBe(1)
      expect(result.comparison.mostPlayed.id).toBe(1)
    })
  })

  describe('getGamingInsights', () => {
    it('deve retornar insights de gaming com sucesso', async () => {
      const mockGlobalStats = {
        totalGames: 1000,
        averageRating: 4.2,
        genreDistribution: { Action: 300, RPG: 200 },
        platformDistribution: { PC: 400, PS5: 300 },
        ratingDistribution: { '4-5': 500, '3-4': 300 }
      }

      const mockFavorites = new GameCollection(
        [
          new Game({ ...mockGameData, id: 1 }),
          new Game({ ...mockGameData, id: 2 })
        ],
        2
      )

      mockGameRepository.getGameStatistics.mockResolvedValue(mockGlobalStats)
      mockFavoritesRepository.findAllFavorites.mockResolvedValue(mockFavorites)

      const result = await gameDomainService.getGamingInsights()

      expect(mockGameRepository.getGameStatistics).toHaveBeenCalled()
      expect(mockFavoritesRepository.findAllFavorites).toHaveBeenCalled()
      expect(result.globalStats).toHaveProperty('totalGames')
      expect(result.globalStats).toHaveProperty('averageRating')
      expect(result.globalStats).toHaveProperty('topGenres')
      expect(result.globalStats).toHaveProperty('topPlatforms')
      expect(result.userStats).toHaveProperty('totalFavorites')
      expect(result.userStats).toHaveProperty('averageRating')
      expect(result.userStats).toHaveProperty('preferredGenres')
      expect(result.userStats).toHaveProperty('gamingStyle')
    })

    it('deve calcular estatísticas globais corretamente', async () => {
      const mockGlobalStats = {
        totalGames: 1000,
        averageRating: 4.2,
        genreDistribution: { Action: 300, RPG: 200, Adventure: 150 },
        platformDistribution: { PC: 400, PS5: 300, Xbox: 200 },
        ratingDistribution: { '4-5': 500, '3-4': 300 }
      }

      const mockFavorites = new GameCollection([new Game(mockGameData)], 1)

      mockGameRepository.getGameStatistics.mockResolvedValue(mockGlobalStats)
      mockFavoritesRepository.findAllFavorites.mockResolvedValue(mockFavorites)

      const result = await gameDomainService.getGamingInsights()

      expect(result.globalStats.totalGames).toBe(1000)
      expect(result.globalStats.averageRating).toBe(4.2)
      expect(result.globalStats.topGenres).toHaveLength(3)
      expect(result.globalStats.topPlatforms).toHaveLength(3)
    })
  })

  describe('calculateRecommendationScore', () => {
    it('deve calcular score de recomendação corretamente', async () => {
      const game = new Game({
        ...mockGameData,
        rating: 4.5,
        metacritic: 85,
        genres: [{ id: 1, name: 'Action' }],
        platforms: [{ id: 1, name: 'PC' }]
      })

      const userGenres = ['Action', 'RPG']
      const userPlatforms = ['PC', 'PS5']

      const calculateScore = (
        gameDomainService as any
      ).calculateRecommendationScore.bind(gameDomainService)
      const score = calculateScore(game, userGenres, userPlatforms)

      expect(score).toBeGreaterThan(0)
    })
  })

  describe('determineGamingStyle', () => {
    it('deve determinar estilo crítico para jogos com alta avaliação', async () => {
      const highlyRatedFavorites = new GameCollection(
        [
          new Game({ ...mockGameData, id: 1, rating: 4.8 }),
          new Game({ ...mockGameData, id: 2, rating: 4.7 }),
          new Game({ ...mockGameData, id: 3, rating: 4.9 }),
          new Game({ ...mockGameData, id: 4, rating: 4.6 }),
          new Game({ ...mockGameData, id: 5, rating: 4.8 })
        ],
        5
      )

      const determineStyle = (
        gameDomainService as any
      ).determineGamingStyle.bind(gameDomainService)
      const style = determineStyle(highlyRatedFavorites)

      expect(style).toBe('Crítico')
    })

    it('deve determinar estilo seletivo para jogos com avaliação média-alta', async () => {
      const selectiveFavorites = new GameCollection(
        [
          new Game({ ...mockGameData, id: 1, rating: 4.2 }),
          new Game({ ...mockGameData, id: 2, rating: 4.1 }),
          new Game({ ...mockGameData, id: 3, rating: 4.3 }),
          new Game({ ...mockGameData, id: 4, rating: 3.8 }),
          new Game({ ...mockGameData, id: 5, rating: 3.9 })
        ],
        5
      )

      const determineStyle = (
        gameDomainService as any
      ).determineGamingStyle.bind(gameDomainService)
      const style = determineStyle(selectiveFavorites)

      expect(style).toBe('Seletivo')
    })
  })

  describe('generateRecommendations', () => {
    it('deve gerar recomendações para usuários com poucos jogos', async () => {
      const fewFavorites = new GameCollection(
        [new Game({ ...mockGameData, id: 1, rating: 3.0 })],
        1
      )

      const generateRecs = (
        gameDomainService as any
      ).generateRecommendations.bind(gameDomainService)
      const recommendations = generateRecs(fewFavorites, ['Action'])

      expect(recommendations).toContain(
        'Adicione mais jogos para receber recomendações personalizadas'
      )
      expect(recommendations).toContain(
        'Explore diferentes gêneros para diversificar sua biblioteca'
      )
    })

    it('deve gerar recomendações para usuários com poucos gêneros', async () => {
      const fewGenresFavorites = new GameCollection(
        [
          new Game({ ...mockGameData, id: 1, rating: 4.5 }),
          new Game({ ...mockGameData, id: 2, rating: 4.3 })
        ],
        2
      )

      const generateRecs = (
        gameDomainService as any
      ).generateRecommendations.bind(gameDomainService)
      const recommendations = generateRecs(fewGenresFavorites, ['Action'])

      expect(recommendations).toContain(
        'Explore diferentes gêneros para diversificar sua biblioteca'
      )
    })
  })
})
