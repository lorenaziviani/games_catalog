import { GameCollection } from '@/domain/aggregates/GameCollection'
import { Game } from '@/domain/entities/Game'
import { favoritesStorage } from '@/store/favorites/utils'
import { FavoritesRepository } from './FavoritesRepository'

jest.mock('@/store/favorites/utils', () => ({
  favoritesStorage: {
    save: jest.fn(),
    load: jest.fn(),
    clear: jest.fn()
  }
}))

jest.mock('@/domain/entities/Game', () => ({
  Game: jest.fn().mockImplementation((data: any) => {
    return {
      id: data.id,
      name: data.name,
      rating: data.rating,
      metacritic: data.metacritic,
      genres: data.genres || [],
      platforms: data.platforms || [],
      stores: data.stores || [],
      tags: data.tags || [],
      toDTO: jest.fn().mockReturnValue(data),
      matchesGenreFilter: jest.fn().mockReturnValue(true),
      matchesPlatformFilter: jest.fn().mockReturnValue(true),
      matchesStoreFilter: jest.fn().mockReturnValue(true),
      matchesTagFilter: jest.fn().mockReturnValue(true),
      matchesSearchTerm: jest.fn().mockReturnValue(true),
      getGenreNames: jest.fn().mockReturnValue(['Action']),
      getPlatformNames: jest.fn().mockReturnValue(['PC']),
      getStoreNames: jest.fn().mockReturnValue(['Steam']),
      getTagNames: jest.fn().mockReturnValue(['Multiplayer'])
    }
  })
}))

jest.mock('@/domain/aggregates/GameCollection', () => ({
  GameCollection: jest.fn().mockImplementation((games: any, count: number) => {
    return {
      games,
      count,
      totalCount: count,
      hasNext: false,
      hasPrevious: false,
      getAverageRating: jest.fn().mockReturnValue(4.0),
      getGenreDistribution: jest.fn().mockReturnValue({ Action: 1 }),
      getPlatformDistribution: jest.fn().mockReturnValue({ PC: 1 }),
      getRatingDistribution: jest.fn().mockReturnValue({ '4-5': 1 })
    }
  })
}))

describe('FavoritesRepository', () => {
  let favoritesRepository: FavoritesRepository
  const mockFavoritesStorage = favoritesStorage as jest.Mocked<
    typeof favoritesStorage
  >

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

  const mockGame = new Game(mockGameData as any)

  beforeEach(() => {
    jest.clearAllMocks()
    favoritesRepository = new FavoritesRepository()
  })

  describe('addToFavorites', () => {
    it('deve adicionar jogo aos favoritos com sucesso', async () => {
      mockFavoritesStorage.load.mockResolvedValue([])

      await favoritesRepository.addToFavorites(mockGame as any)

      expect(mockFavoritesStorage.load).toHaveBeenCalled()
      expect(mockFavoritesStorage.save).toHaveBeenCalledWith([mockGameData])
    })

    it('não deve adicionar jogo duplicado', async () => {
      mockFavoritesStorage.load.mockResolvedValue([mockGameData])

      await favoritesRepository.addToFavorites(mockGame as any)

      expect(mockFavoritesStorage.save).not.toHaveBeenCalled()
    })

    it('deve lançar erro quando falha ao adicionar', async () => {
      const error = new Error('Storage Error')
      mockFavoritesStorage.load.mockRejectedValue(error)

      await expect(
        favoritesRepository.addToFavorites(mockGame as any)
      ).rejects.toThrow('Falha ao adicionar aos favoritos')
    })
  })

  describe('removeFromFavorites', () => {
    it('deve remover jogo dos favoritos com sucesso', async () => {
      const existingGames = [mockGameData, { ...mockGameData, id: 2 }]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      await favoritesRepository.removeFromFavorites(1)

      expect(mockFavoritesStorage.save).toHaveBeenCalledWith([
        { ...mockGameData, id: 2 }
      ])
    })

    it('deve lançar erro quando falha ao remover', async () => {
      const error = new Error('Storage Error')
      mockFavoritesStorage.load.mockRejectedValue(error)

      await expect(favoritesRepository.removeFromFavorites(1)).rejects.toThrow(
        'Falha ao remover dos favoritos'
      )
    })
  })

  describe('clearAllFavorites', () => {
    it('deve limpar todos os favoritos com sucesso', async () => {
      await favoritesRepository.clearAllFavorites()

      expect(mockFavoritesStorage.clear).toHaveBeenCalled()
    })

    it('deve lançar erro quando falha ao limpar', async () => {
      const error = new Error('Storage Error')
      mockFavoritesStorage.clear.mockRejectedValue(error)

      await expect(favoritesRepository.clearAllFavorites()).rejects.toThrow(
        'Falha ao limpar favoritos'
      )
    })
  })

  describe('findAllFavorites', () => {
    it('deve buscar todos os favoritos com sucesso', async () => {
      const existingGames = [mockGameData]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.findAllFavorites()

      expect(GameCollection).toHaveBeenCalled()
      expect(result.games).toHaveLength(1)
      expect(result.count).toBe(1)
    })

    it('deve retornar coleção vazia quando não há favoritos', async () => {
      mockFavoritesStorage.load.mockResolvedValue([])

      const result = await favoritesRepository.findAllFavorites()

      expect(GameCollection).toHaveBeenCalled()
      expect(result.games).toHaveLength(0)
      expect(result.count).toBe(0)
    })

    it('deve lançar erro quando falha ao buscar', async () => {
      const error = new Error('Storage Error')
      mockFavoritesStorage.load.mockRejectedValue(error)

      await expect(favoritesRepository.findAllFavorites()).rejects.toThrow(
        'Falha ao buscar favoritos'
      )
    })
  })

  describe('findFavoriteById', () => {
    it('deve encontrar favorito por ID com sucesso', async () => {
      const existingGames = [mockGameData, { ...mockGameData, id: 2 }]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.findFavoriteById(1)

      expect(Game).toHaveBeenCalled()
      expect(result?.id).toBe(1)
    })

    it('deve retornar null quando favorito não encontrado', async () => {
      const existingGames = [mockGameData]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.findFavoriteById(999)

      expect(result).toBeNull()
    })

    it('deve retornar null quando falha ao buscar', async () => {
      const error = new Error('Storage Error')
      mockFavoritesStorage.load.mockRejectedValue(error)

      const result = await favoritesRepository.findFavoriteById(1)

      expect(result).toBeNull()
    })
  })

  describe('isFavorite', () => {
    it('deve retornar true quando jogo é favorito', async () => {
      const existingGames = [mockGameData]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.isFavorite(1)

      expect(result).toBe(true)
    })

    it('deve retornar false quando jogo não é favorito', async () => {
      const existingGames = [mockGameData]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.isFavorite(999)

      expect(result).toBe(false)
    })

    it('deve retornar false quando falha ao verificar', async () => {
      const error = new Error('Storage Error')
      mockFavoritesStorage.load.mockRejectedValue(error)

      const result = await favoritesRepository.isFavorite(1)

      expect(result).toBe(false)
    })
  })

  describe('findFavoritesByGenres', () => {
    it('deve filtrar favoritos por gêneros com sucesso', async () => {
      const existingGames = [mockGameData]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.findFavoritesByGenres([1, 2])

      expect(GameCollection).toHaveBeenCalled()
      expect(result.games).toHaveLength(1)
    })

    it('deve lançar erro quando falha ao filtrar', async () => {
      const error = new Error('Storage Error')
      mockFavoritesStorage.load.mockRejectedValue(error)

      await expect(
        favoritesRepository.findFavoritesByGenres([1])
      ).rejects.toThrow('Falha ao buscar favoritos por gêneros')
    })
  })

  describe('findFavoritesByPlatforms', () => {
    it('deve filtrar favoritos por plataformas com sucesso', async () => {
      const existingGames = [mockGameData]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.findFavoritesByPlatforms([1, 2])

      expect(GameCollection).toHaveBeenCalled()
      expect(result.games).toHaveLength(1)
    })

    it('deve lançar erro quando falha ao filtrar', async () => {
      const error = new Error('Storage Error')
      mockFavoritesStorage.load.mockRejectedValue(error)

      await expect(
        favoritesRepository.findFavoritesByPlatforms([1])
      ).rejects.toThrow('Falha ao buscar favoritos por plataformas')
    })
  })

  describe('findFavoritesByStores', () => {
    it('deve filtrar favoritos por lojas com sucesso', async () => {
      const existingGames = [mockGameData]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.findFavoritesByStores([1, 2])

      expect(GameCollection).toHaveBeenCalled()
      expect(result.games).toHaveLength(1)
    })

    it('deve lançar erro quando falha ao filtrar', async () => {
      const error = new Error('Storage Error')
      mockFavoritesStorage.load.mockRejectedValue(error)

      await expect(
        favoritesRepository.findFavoritesByStores([1])
      ).rejects.toThrow('Falha ao buscar favoritos por lojas')
    })
  })

  describe('findFavoritesByTags', () => {
    it('deve filtrar favoritos por tags com sucesso', async () => {
      const existingGames = [mockGameData]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.findFavoritesByTags([1, 2])

      expect(GameCollection).toHaveBeenCalled()
      expect(result.games).toHaveLength(1)
    })

    it('deve lançar erro quando falha ao filtrar', async () => {
      const error = new Error('Storage Error')
      mockFavoritesStorage.load.mockRejectedValue(error)

      await expect(
        favoritesRepository.findFavoritesByTags([1])
      ).rejects.toThrow('Falha ao buscar favoritos por tags')
    })
  })

  describe('searchFavorites', () => {
    it('deve buscar favoritos por termo com sucesso', async () => {
      const existingGames = [mockGameData]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.searchFavorites('test')

      expect(GameCollection).toHaveBeenCalled()
      expect(result.games).toHaveLength(1)
    })

    it('deve retornar resultados filtrados por nome', async () => {
      const game1 = { ...mockGameData, name: 'Test Game' }
      const game2 = { ...mockGameData, id: 2, name: 'Other Game' }
      const existingGames = [game1, game2]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.searchFavorites('Test')

      expect(GameCollection).toHaveBeenCalled()
      expect(result.games).toHaveLength(2)
    })

    it('deve lançar erro quando falha ao buscar', async () => {
      const error = new Error('Storage Error')
      mockFavoritesStorage.load.mockRejectedValue(error)

      await expect(favoritesRepository.searchFavorites('test')).rejects.toThrow(
        'Falha ao buscar favoritos'
      )
    })
  })

  describe('findTopRatedFavorites', () => {
    it('deve buscar favoritos mais bem avaliados com sucesso', async () => {
      const existingGames = [mockGameData]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.findTopRatedFavorites(10)

      expect(GameCollection).toHaveBeenCalled()
      expect(result.games).toHaveLength(1)
    })

    it('deve usar limite padrão quando não especificado', async () => {
      const existingGames = [mockGameData]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      await favoritesRepository.findTopRatedFavorites()

      expect(GameCollection).toHaveBeenCalled()
    })
  })

  describe('findRecentlyAddedFavorites', () => {
    it('deve buscar favoritos recentemente adicionados com sucesso', async () => {
      const existingGames = [mockGameData]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.findRecentlyAddedFavorites(10)

      expect(GameCollection).toHaveBeenCalled()
      expect(result.games).toHaveLength(1)
    })

    it('deve usar limite padrão quando não especificado', async () => {
      const existingGames = [mockGameData]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.findRecentlyAddedFavorites()

      expect(result).toBeDefined()
      expect(GameCollection).toHaveBeenCalled()
    })
  })

  describe('getFavoritesStatistics', () => {
    it('deve retornar estatísticas dos favoritos com sucesso', async () => {
      const existingGames = [mockGameData]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.getFavoritesStatistics()

      expect(result).toHaveProperty('totalFavorites')
      expect(result).toHaveProperty('averageRating')
      expect(result).toHaveProperty('genreDistribution')
      expect(result).toHaveProperty('platformDistribution')
      expect(result).toHaveProperty('ratingDistribution')
    })

    it('deve calcular estatísticas corretamente', async () => {
      const game1 = { ...mockGameData, rating: 4.5 }
      const game2 = { ...mockGameData, id: 2, rating: 3.5 }
      const existingGames = [game1, game2]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.getFavoritesStatistics()

      expect(result.totalFavorites).toBe(2)
      expect(result.averageRating).toBe(4.0)
    })
  })

  describe('getAvailableGenres', () => {
    it('deve retornar gêneros disponíveis com sucesso', async () => {
      const game1 = { ...mockGameData, genres: [{ id: 1, name: 'Action' }] }
      const game2 = {
        ...mockGameData,
        id: 2,
        genres: [{ id: 2, name: 'Adventure' }]
      }
      const existingGames = [game1, game2]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.getAvailableGenres()

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({ value: 'action', label: 'Action' })
    })

    it('deve retornar array vazio quando não há favoritos', async () => {
      mockFavoritesStorage.load.mockResolvedValue([])

      const result = await favoritesRepository.getAvailableGenres()

      expect(result).toHaveLength(0)
    })
  })

  describe('getAvailablePlatforms', () => {
    it('deve retornar plataformas disponíveis com sucesso', async () => {
      const game1 = { ...mockGameData, platforms: [{ id: 1, name: 'PC' }] }
      const game2 = {
        ...mockGameData,
        id: 2,
        platforms: [{ id: 2, name: 'PS4' }]
      }
      const existingGames = [game1, game2]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.getAvailablePlatforms()

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({ value: 'pc', label: 'PC' })
    })
  })

  describe('getAvailableStores', () => {
    it('deve retornar lojas disponíveis com sucesso', async () => {
      const game1 = { ...mockGameData, stores: [{ id: 1, name: 'Steam' }] }
      const game2 = {
        ...mockGameData,
        id: 2,
        stores: [{ id: 2, name: 'Epic' }]
      }
      const existingGames = [game1, game2]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.getAvailableStores()

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({ value: 'steam', label: 'Steam' })
    })
  })

  describe('getAvailableTags', () => {
    it('deve retornar tags disponíveis com sucesso', async () => {
      const game1 = { ...mockGameData, tags: [{ id: 1, name: 'Multiplayer' }] }
      const game2 = {
        ...mockGameData,
        id: 2,
        tags: [{ id: 2, name: 'Single-player' }]
      }
      const existingGames = [game1, game2]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await favoritesRepository.getAvailableTags()

      expect(result).toHaveLength(1)
      expect(result[0]).toEqual({ value: 'multiplayer', label: 'Multiplayer' })
    })
  })

  describe('getAllFavoritesAsGames', () => {
    it('deve converter dados do storage para objetos Game', async () => {
      const existingGames = [mockGameData]
      mockFavoritesStorage.load.mockResolvedValue(existingGames)

      const result = await (favoritesRepository as any).getAllFavoritesAsGames()

      expect(Game).toHaveBeenCalledWith(mockGameData)
      expect(result).toHaveLength(1)
    })

    it('deve retornar array vazio quando storage está vazio', async () => {
      mockFavoritesStorage.load.mockResolvedValue([])

      const result = await (favoritesRepository as any).getAllFavoritesAsGames()

      expect(result).toHaveLength(0)
    })
  })
})
