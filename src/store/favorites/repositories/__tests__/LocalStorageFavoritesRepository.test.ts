import type { Game } from '@/types/game'
import { LocalStorageFavoritesRepository } from '../LocalStorageFavoritesRepository'

describe('LocalStorageFavoritesRepository', () => {
  let repository: LocalStorageFavoritesRepository
  let mockLocalStorage: { [key: string]: string }

  const mockGame: Game = {
    id: 1,
    name: 'Test Game',
    slug: 'test-game',
    background_image: 'https://example.com/image.jpg',
    rating: 4.5,
    rating_top: 5,
    metacritic: 85,
    playtime: 120,
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
    ratings: [
      {
        id: 1,
        title: 'Exceptional',
        count: 100,
        percent: 85
      }
    ],
    ratings_count: 100,
    reviews_text_count: 50,
    suggestions_count: 10,
    user_game: null,
    reviews_count: 25,
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
          year_start: 1990,
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
          games_count: 10000,
          image_background: 'https://example.com/store-bg.jpg'
        }
      }
    ],
    tags: [
      {
        id: 1,
        name: 'Adventure',
        slug: 'adventure',
        language: 'eng',
        games_count: 200,
        image_background: 'https://example.com/genre-bg.jpg'
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
  }

  const mockFavorites: Game[] = [
    mockGame,
    {
      ...mockGame,
      id: 2,
      name: 'Test Game 2',
      slug: 'test-game-2'
    }
  ]

  beforeEach(() => {
    mockLocalStorage = {}

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key: string) => mockLocalStorage[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          mockLocalStorage[key] = value
        }),
        removeItem: jest.fn((key: string) => {
          delete mockLocalStorage[key]
        }),
        clear: jest.fn(() => {
          mockLocalStorage = {}
        }),
        key: jest.fn(),
        length: 0
      },
      writable: true
    })

    repository = new LocalStorageFavoritesRepository()
  })

  afterEach(() => {
    jest.clearAllMocks()
    mockLocalStorage = {}
  })

  describe('save', () => {
    it('deve salvar favoritos com sucesso', async () => {
      await repository.save(mockFavorites)
      expect(localStorage.setItem).toHaveBeenCalledTimes(1)

      const [key, value] = (localStorage.setItem as any).mock.calls[0]
      expect(key).toBe('favorites')
      const parsed = JSON.parse(value)
      expect(parsed.items).toEqual(mockFavorites)
      expect(typeof parsed.lastUpdated).toBe('number')
    })

    it('deve incluir timestamp de atualização', async () => {
      const beforeSave = Date.now()
      await repository.save(mockFavorites)
      const afterSave = Date.now()

      const savedData = JSON.parse(mockLocalStorage['favorites'])
      expect(savedData.lastUpdated).toBeGreaterThanOrEqual(beforeSave)
      expect(savedData.lastUpdated).toBeLessThanOrEqual(afterSave)
    })

    it('deve lançar erro quando localStorage falha', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})

      jest.mocked(localStorage.setItem).mockImplementationOnce(() => {
        throw new Error('Storage error')
      })

      await expect(repository.save(mockFavorites)).rejects.toThrow(
        'Erro ao salvar favoritos'
      )
      expect(consoleSpy).toHaveBeenCalledWith(
        'Erro ao salvar favoritos no localStorage:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })
  })

  describe('load', () => {
    it('deve carregar favoritos existentes com sucesso', async () => {
      const storedData = {
        items: mockFavorites,
        lastUpdated: Date.now()
      }
      mockLocalStorage['favorites'] = JSON.stringify(storedData)

      const result = await repository.load()

      expect(result).toEqual(mockFavorites)
      expect(localStorage.getItem).toHaveBeenCalledWith('favorites')
    })

    it('deve retornar array vazio quando não há dados salvos', async () => {
      const result = await repository.load()

      expect(result).toEqual([])
    })

    it('deve retornar array vazio quando dados são inválidos (não é array)', async () => {
      const consoleSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {})
      const invalidData = {
        items: 'not-an-array',
        lastUpdated: Date.now()
      }
      mockLocalStorage['favorites'] = JSON.stringify(invalidData)

      const result = await repository.load()

      expect(result).toEqual([])
      expect(consoleSpy).toHaveBeenCalledWith(
        'Dados inválidos no localStorage, limpando...'
      )
      expect(localStorage.removeItem).toHaveBeenCalledWith('favorites')

      consoleSpy.mockRestore()
    })

    it('deve retornar array vazio quando dados são inválidos (sem items)', async () => {
      const consoleSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {})
      const invalidData = {
        lastUpdated: Date.now()
      }
      mockLocalStorage['favorites'] = JSON.stringify(invalidData)

      const result = await repository.load()

      expect(result).toEqual([])
      expect(consoleSpy).toHaveBeenCalledWith(
        'Dados inválidos no localStorage, limpando...'
      )
      expect(localStorage.removeItem).toHaveBeenCalledWith('favorites')

      consoleSpy.mockRestore()
    })

    it('deve retornar array vazio quando JSON é inválido', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      mockLocalStorage['favorites'] = 'invalid-json'

      const result = await repository.load()

      expect(result).toEqual([])
      expect(consoleSpy).toHaveBeenCalledWith(
        'Erro ao carregar favoritos do localStorage:',
        expect.any(Error)
      )
      expect(localStorage.removeItem).toHaveBeenCalledWith('favorites')

      consoleSpy.mockRestore()
    })

    it('deve retornar array vazio quando localStorage falha', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})

      jest.mocked(localStorage.getItem).mockImplementationOnce(() => {
        throw new Error('Storage error')
      })

      const result = await repository.load()

      expect(result).toEqual([])
      expect(consoleSpy).toHaveBeenCalledWith(
        'Erro ao carregar favoritos do localStorage:',
        expect.any(Error)
      )
      expect(localStorage.removeItem).toHaveBeenCalledWith('favorites')

      consoleSpy.mockRestore()
    })
  })

  describe('clear', () => {
    it('deve limpar favoritos com sucesso', async () => {
      mockLocalStorage['favorites'] = 'test-data'

      await repository.clear()

      expect(localStorage.removeItem).toHaveBeenCalledWith('favorites')
      expect(mockLocalStorage['favorites']).toBeUndefined()
    })

    it('deve lidar com erro ao limpar favoritos', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})

      jest.mocked(localStorage.removeItem).mockImplementationOnce(() => {
        throw new Error('Storage error')
      })

      await expect(repository.clear()).resolves.toBeUndefined()
      expect(consoleSpy).toHaveBeenCalledWith(
        'Erro ao limpar favoritos do localStorage:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })
  })

  describe('isAvailable', () => {
    it('deve retornar true quando localStorage está disponível', async () => {
      const result = await repository.isAvailable()

      expect(result).toBe(true)
      expect(localStorage.setItem).toHaveBeenCalledWith('test', 'test')
      expect(localStorage.removeItem).toHaveBeenCalledWith('test')
    })

    it('deve retornar false quando localStorage não está disponível', async () => {
      jest.mocked(localStorage.setItem).mockImplementationOnce(() => {
        throw new Error('localStorage not available')
      })

      const result = await repository.isAvailable()

      expect(result).toBe(false)
    })

    it('deve retornar false quando localStorage.removeItem falha', async () => {
      jest.mocked(localStorage.removeItem).mockImplementationOnce(() => {
        throw new Error('removeItem error')
      })

      const result = await repository.isAvailable()

      expect(result).toBe(false)
    })
  })

  describe('integração', () => {
    it('deve salvar e carregar favoritos corretamente', async () => {
      await repository.save(mockFavorites)

      expect(mockLocalStorage['favorites']).toBeDefined()

      jest.clearAllMocks()

      const loadedFavorites = await repository.load()

      expect(loadedFavorites).toEqual(mockFavorites)
    })

    it('deve limpar dados corrompidos automaticamente', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      mockLocalStorage['favorites'] = 'corrupted-data'

      const result = await repository.load()

      expect(result).toEqual([])
      expect(consoleSpy).toHaveBeenCalledWith(
        'Erro ao carregar favoritos do localStorage:',
        expect.any(Error)
      )
      expect(localStorage.removeItem).toHaveBeenCalledWith('favorites')

      consoleSpy.mockRestore()
    })
  })
})
