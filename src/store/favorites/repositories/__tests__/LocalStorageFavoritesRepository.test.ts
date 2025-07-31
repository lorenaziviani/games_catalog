import type { Game } from '@/types/game'
import { LocalStorageFavoritesRepository } from '../LocalStorageFavoritesRepository'

describe('LocalStorageFavoritesRepository', () => {
  let repository: LocalStorageFavoritesRepository
  let mockLocalStorage: { [key: string]: string }

  const mockGame: Game = {
    id: 1,
    title: 'Test Game',
    thumbnail: 'test-thumbnail.jpg',
    short_description: 'Test description',
    game_url: 'https://example.com/game',
    genre: 'Action',
    platform: 'PC',
    publisher: 'Test Publisher',
    developer: 'Test Developer',
    release_date: '2023-01-01',
    freetogame_profile_url: 'https://example.com/game-url'
  }

  const mockFavorites: Game[] = [
    mockGame,
    {
      ...mockGame,
      id: 2,
      title: 'Test Game 2'
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
      const [key, value] = localStorage.setItem.mock.calls[0]
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
