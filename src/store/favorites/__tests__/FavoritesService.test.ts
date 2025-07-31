import type { Game } from '@/types/game'
import { FavoritesService } from '../FavoritesService'
import type { IFavoritesRepository } from '../interfaces/IFavoritesRepository'

const mockRepository: jest.Mocked<IFavoritesRepository> = {
  load: jest.fn(),
  save: jest.fn(),
  clear: jest.fn(),
  isAvailable: jest.fn()
}

const mockGames: Game[] = [
  {
    id: 1,
    name: 'Game 1',
    slug: 'game-1',
    background_image: 'https://example.com/image.jpg',
    rating: 4.5,
    rating_top: 5,
    metacritic: 85,
    playtime: 20,
    released: '2023-01-01',
    updated: '2023-01-01',
    tba: false,
    added: 100,
    added_by_status: {
      yet: 10,
      owned: 50,
      beaten: 30,
      toplay: 5,
      dropped: 3,
      playing: 2
    },
    ratings: [{ id: 1, title: 'Exceptional', count: 50, percent: 80 }],
    ratings_count: 100,
    reviews_text_count: 20,
    suggestions_count: 5,
    user_game: null,
    reviews_count: 15,
    saturated_color: '#000000',
    dominant_color: '#ffffff',
    platforms: [
      {
        platform: {
          id: 1,
          name: 'PC',
          slug: 'pc',
          image: null,
          year_end: null,
          year_start: 1980,
          games_count: 1000,
          image_background: 'https://example.com/platform-bg.jpg'
        },
        released_at: '2023-01-01',
        requirements_en: {
          minimum: 'Windows 10',
          recommended: 'Windows 11'
        },
        requirements_ru: null
      }
    ],
    genres: [
      {
        id: 1,
        name: 'Action',
        slug: 'action',
        games_count: 500,
        image_background: 'https://example.com/genre-bg.jpg'
      },
      {
        id: 2,
        name: 'Adventure',
        slug: 'adventure',
        games_count: 300,
        image_background: 'https://example.com/genre-bg.jpg'
      }
    ],
    stores: [
      {
        id: 1,
        store: {
          id: 1,
          name: 'Steam',
          slug: 'steam',
          domain: 'store.steampowered.com',
          games_count: 50000,
          image_background: 'https://example.com/store-bg.jpg'
        }
      }
    ],
    tags: [
      {
        id: 1,
        name: 'Singleplayer',
        slug: 'singleplayer',
        language: 'eng',
        games_count: 1000,
        image_background: 'https://example.com/tag-bg.jpg'
      },
      {
        id: 2,
        name: 'Multiplayer',
        slug: 'multiplayer',
        language: 'eng',
        games_count: 800,
        image_background: 'https://example.com/tag-bg.jpg'
      }
    ],
    esrb_rating: {
      id: 1,
      name: 'Teen',
      slug: 'teen'
    },
    short_screenshots: [
      {
        id: 1,
        image: 'https://example.com/screenshot.jpg'
      }
    ],
    clip: null
  },
  {
    id: 2,
    name: 'Game 2',
    slug: 'game-2',
    background_image: 'https://example.com/image.jpg',
    rating: 3.8,
    rating_top: 5,
    metacritic: 75,
    playtime: 15,
    released: '2023-02-01',
    updated: '2023-02-01',
    tba: false,
    added: 80,
    added_by_status: {
      yet: 5,
      owned: 30,
      beaten: 20,
      toplay: 3,
      dropped: 2,
      playing: 1
    },
    ratings: [{ id: 2, title: 'Good', count: 30, percent: 60 }],
    ratings_count: 50,
    reviews_text_count: 10,
    suggestions_count: 3,
    user_game: null,
    reviews_count: 8,
    saturated_color: '#111111',
    dominant_color: '#eeeeee',
    platforms: [
      {
        platform: {
          id: 2,
          name: 'PlayStation 5',
          slug: 'ps5',
          image: null,
          year_end: null,
          year_start: 2020,
          games_count: 500,
          image_background: 'https://example.com/platform-bg.jpg'
        },
        released_at: '2023-02-01',
        requirements_en: null,
        requirements_ru: null
      }
    ],
    genres: [
      {
        id: 3,
        name: 'RPG',
        slug: 'rpg',
        games_count: 200,
        image_background: 'https://example.com/genre-bg.jpg'
      }
    ],
    stores: [
      {
        id: 2,
        store: {
          id: 2,
          name: 'PlayStation Store',
          slug: 'playstation-store',
          domain: 'store.playstation.com',
          games_count: 10000,
          image_background: 'https://example.com/store-bg.jpg'
        }
      }
    ],
    tags: [
      {
        id: 3,
        name: 'Story Rich',
        slug: 'story-rich',
        language: 'eng',
        games_count: 400,
        image_background: 'https://example.com/tag-bg.jpg'
      }
    ],
    esrb_rating: {
      id: 2,
      name: 'Mature',
      slug: 'mature'
    },
    short_screenshots: [
      {
        id: 2,
        image: 'https://example.com/screenshot.jpg'
      }
    ],
    clip: null
  }
]

describe('FavoritesService', () => {
  let favoritesService: FavoritesService

  beforeEach(() => {
    jest.clearAllMocks()
    favoritesService = new FavoritesService(mockRepository)
  })

  describe('loadFavorites', () => {
    it('deve carregar favoritos com sucesso', async () => {
      mockRepository.load.mockResolvedValue(mockGames)

      const result = await favoritesService.loadFavorites()

      expect(mockRepository.load).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockGames)
    })

    it('deve propagar erro do repositório', async () => {
      const error = new Error('Erro ao carregar favoritos')
      mockRepository.load.mockRejectedValue(error)

      await expect(favoritesService.loadFavorites()).rejects.toThrow(
        'Erro ao carregar favoritos'
      )
      expect(mockRepository.load).toHaveBeenCalledTimes(1)
    })
  })

  describe('saveFavorites', () => {
    it('deve salvar favoritos com sucesso', async () => {
      mockRepository.save.mockResolvedValue()

      await favoritesService.saveFavorites(mockGames)

      expect(mockRepository.save).toHaveBeenCalledTimes(1)
      expect(mockRepository.save).toHaveBeenCalledWith(mockGames)
    })

    it('deve propagar erro do repositório', async () => {
      const error = new Error('Erro ao salvar favoritos')
      mockRepository.save.mockRejectedValue(error)

      await expect(favoritesService.saveFavorites(mockGames)).rejects.toThrow(
        'Erro ao salvar favoritos'
      )
      expect(mockRepository.save).toHaveBeenCalledTimes(1)
    })
  })

  describe('clearFavorites', () => {
    it('deve limpar favoritos com sucesso', async () => {
      mockRepository.clear.mockResolvedValue()

      await favoritesService.clearFavorites()

      expect(mockRepository.clear).toHaveBeenCalledTimes(1)
    })

    it('deve propagar erro do repositório', async () => {
      const error = new Error('Erro ao limpar favoritos')
      mockRepository.clear.mockRejectedValue(error)

      await expect(favoritesService.clearFavorites()).rejects.toThrow(
        'Erro ao limpar favoritos'
      )
      expect(mockRepository.clear).toHaveBeenCalledTimes(1)
    })
  })

  describe('isStorageAvailable', () => {
    it('deve retornar true quando storage está disponível', async () => {
      mockRepository.isAvailable.mockResolvedValue(true)

      const result = await favoritesService.isStorageAvailable()

      expect(mockRepository.isAvailable).toHaveBeenCalledTimes(1)
      expect(result).toBe(true)
    })

    it('deve retornar false quando storage não está disponível', async () => {
      mockRepository.isAvailable.mockResolvedValue(false)

      const result = await favoritesService.isStorageAvailable()

      expect(mockRepository.isAvailable).toHaveBeenCalledTimes(1)
      expect(result).toBe(false)
    })

    it('deve propagar erro do repositório', async () => {
      const error = new Error('Erro ao verificar disponibilidade')
      mockRepository.isAvailable.mockRejectedValue(error)

      await expect(favoritesService.isStorageAvailable()).rejects.toThrow(
        'Erro ao verificar disponibilidade'
      )
      expect(mockRepository.isAvailable).toHaveBeenCalledTimes(1)
    })
  })

  describe('filterDataFromFavorites', () => {
    it('deve extrair dados de filtro corretamente', () => {
      const result = favoritesService.filterDataFromFavorites(mockGames)

      expect(result).toEqual({
        genres: [
          { value: '1', label: 'Action' },
          { value: '2', label: 'Adventure' },
          { value: '3', label: 'RPG' }
        ],
        platforms: [
          { value: '1', label: 'PC' },
          { value: '2', label: 'PlayStation 5' }
        ],
        stores: [
          { value: '1', label: 'Steam' },
          { value: '2', label: 'PlayStation Store' }
        ],
        tags: [
          { value: '2', label: 'Multiplayer' },
          { value: '1', label: 'Singleplayer' },
          { value: '3', label: 'Story Rich' }
        ]
      })
    })

    it('deve lidar com jogos sem dados de filtro', () => {
      const gamesWithoutFilterData: Game[] = [
        {
          ...mockGames[0],
          genres: undefined,
          platforms: undefined,
          stores: undefined,
          tags: undefined
        }
      ]

      const result = favoritesService.filterDataFromFavorites(
        gamesWithoutFilterData
      )

      expect(result).toEqual({
        genres: [],
        platforms: [],
        stores: [],
        tags: []
      })
    })

    it('deve lidar com array vazio', () => {
      const result = favoritesService.filterDataFromFavorites([])

      expect(result).toEqual({
        genres: [],
        platforms: [],
        stores: [],
        tags: []
      })
    })

    it('deve remover itens duplicados e ordenar alfabeticamente', () => {
      const gamesWithDuplicates: Game[] = [
        {
          ...mockGames[0],
          genres: [
            {
              id: 1,
              name: 'Action',
              slug: 'action',
              games_count: 500,
              image_background: 'https://example.com/genre-bg.jpg'
            },
            {
              id: 1,
              name: 'Action',
              slug: 'action',
              games_count: 500,
              image_background: 'https://example.com/genre-bg.jpg'
            },
            {
              id: 2,
              name: 'Adventure',
              slug: 'adventure',
              games_count: 300,
              image_background: 'https://example.com/genre-bg.jpg'
            }
          ]
        }
      ]

      const result =
        favoritesService.filterDataFromFavorites(gamesWithDuplicates)

      expect(result.genres).toEqual([
        { value: '1', label: 'Action' },
        { value: '2', label: 'Adventure' }
      ])
    })

    it('deve lidar com itens inválidos (sem value ou label)', () => {
      const gamesWithInvalidItems: Game[] = [
        {
          ...mockGames[0],
          genres: [
            {
              id: 1,
              name: 'Action',
              slug: 'action',
              games_count: 500,
              image_background: 'https://example.com/genre-bg.jpg'
            },
            {
              id: 0,
              name: '',
              slug: 'empty',
              games_count: 0,
              image_background: ''
            } as unknown as Game['genres'][0],
            {
              id: 2,
              name: 'Adventure',
              slug: 'adventure',
              games_count: 300,
              image_background: 'https://example.com/genre-bg.jpg'
            }
          ]
        }
      ]

      const result = favoritesService.filterDataFromFavorites(
        gamesWithInvalidItems
      )

      expect(result.genres).toEqual([
        { value: '1', label: 'Action' },
        { value: '2', label: 'Adventure' }
      ])
    })
  })

  describe('extractUniqueItems (método privado)', () => {
    it('deve extrair gêneros únicos corretamente', () => {
      const result = favoritesService.filterDataFromFavorites(mockGames)

      expect(result.genres).toHaveLength(3)
      expect(result.genres).toEqual([
        { value: '1', label: 'Action' },
        { value: '2', label: 'Adventure' },
        { value: '3', label: 'RPG' }
      ])
    })

    it('deve extrair plataformas únicas corretamente', () => {
      const result = favoritesService.filterDataFromFavorites(mockGames)

      expect(result.platforms).toHaveLength(2)
      expect(result.platforms).toEqual([
        { value: '1', label: 'PC' },
        { value: '2', label: 'PlayStation 5' }
      ])
    })

    it('deve extrair lojas únicas corretamente', () => {
      const result = favoritesService.filterDataFromFavorites(mockGames)

      expect(result.stores).toHaveLength(2)
      expect(result.stores).toEqual([
        { value: '1', label: 'Steam' },
        { value: '2', label: 'PlayStation Store' }
      ])
    })

    it('deve extrair tags únicas corretamente', () => {
      const result = favoritesService.filterDataFromFavorites(mockGames)

      expect(result.tags).toHaveLength(3)
      expect(result.tags).toEqual([
        { value: '2', label: 'Multiplayer' },
        { value: '1', label: 'Singleplayer' },
        { value: '3', label: 'Story Rich' }
      ])
    })
  })
})
