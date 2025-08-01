import { StorageService } from '../StorageService'
import type { StorageConfig, StorageProvider } from '../types'

const mockProvider: jest.Mocked<StorageProvider> = {
  save: jest.fn(),
  load: jest.fn(),
  remove: jest.fn(),
  clear: jest.fn(),
  has: jest.fn()
}

describe('StorageService', () => {
  let storageService: StorageService
  let config: StorageConfig

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('com prefixo', () => {
    beforeEach(() => {
      config = {
        provider: mockProvider,
        prefix: 'test_prefix'
      }
      storageService = new StorageService(config)
    })

    describe('save', () => {
      it('deve salvar dados com prefixo', async () => {
        const key = 'favorites'
        const data = { games: [] }
        mockProvider.save.mockResolvedValue()

        await storageService.save(key, data)

        expect(mockProvider.save).toHaveBeenCalledTimes(1)
        expect(mockProvider.save).toHaveBeenCalledWith(
          'test_prefix_favorites',
          data
        )
      })

      it('deve propagar erro do provider', async () => {
        const key = 'favorites'
        const data = { games: [] }
        const error = new Error('Erro ao salvar')
        mockProvider.save.mockRejectedValue(error)

        await expect(storageService.save(key, data)).rejects.toThrow(
          'Erro ao salvar'
        )
        expect(mockProvider.save).toHaveBeenCalledTimes(1)
        expect(mockProvider.save).toHaveBeenCalledWith(
          'test_prefix_favorites',
          data
        )
      })
    })

    describe('load', () => {
      it('deve carregar dados com prefixo', async () => {
        const key = 'favorites'
        const expectedData = { games: [] }
        mockProvider.load.mockResolvedValue(expectedData)

        const result = await storageService.load(key)

        expect(mockProvider.load).toHaveBeenCalledTimes(1)
        expect(mockProvider.load).toHaveBeenCalledWith('test_prefix_favorites')
        expect(result).toEqual(expectedData)
      })

      it('deve propagar erro do provider', async () => {
        const key = 'favorites'
        const error = new Error('Erro ao carregar')
        mockProvider.load.mockRejectedValue(error)

        await expect(storageService.load(key)).rejects.toThrow(
          'Erro ao carregar'
        )
        expect(mockProvider.load).toHaveBeenCalledTimes(1)
        expect(mockProvider.load).toHaveBeenCalledWith('test_prefix_favorites')
      })
    })

    describe('remove', () => {
      it('deve remover dados com prefixo', async () => {
        const key = 'favorites'
        mockProvider.remove.mockResolvedValue()

        await storageService.remove(key)

        expect(mockProvider.remove).toHaveBeenCalledTimes(1)
        expect(mockProvider.remove).toHaveBeenCalledWith(
          'test_prefix_favorites'
        )
      })

      it('deve propagar erro do provider', async () => {
        const key = 'favorites'
        const error = new Error('Erro ao remover')
        mockProvider.remove.mockRejectedValue(error)

        await expect(storageService.remove(key)).rejects.toThrow(
          'Erro ao remover'
        )
        expect(mockProvider.remove).toHaveBeenCalledTimes(1)
        expect(mockProvider.remove).toHaveBeenCalledWith(
          'test_prefix_favorites'
        )
      })
    })

    describe('clear', () => {
      it('deve limpar todos os dados', async () => {
        mockProvider.clear.mockResolvedValue()

        await storageService.clear()

        expect(mockProvider.clear).toHaveBeenCalledTimes(1)
      })

      it('deve propagar erro do provider', async () => {
        const error = new Error('Erro ao limpar')
        mockProvider.clear.mockRejectedValue(error)

        await expect(storageService.clear()).rejects.toThrow('Erro ao limpar')
        expect(mockProvider.clear).toHaveBeenCalledTimes(1)
      })
    })

    describe('has', () => {
      it('deve verificar existência com prefixo - retorna true', async () => {
        const key = 'favorites'
        mockProvider.has.mockResolvedValue(true)

        const result = await storageService.has(key)

        expect(mockProvider.has).toHaveBeenCalledTimes(1)
        expect(mockProvider.has).toHaveBeenCalledWith('test_prefix_favorites')
        expect(result).toBe(true)
      })

      it('deve verificar existência com prefixo - retorna false', async () => {
        const key = 'favorites'
        mockProvider.has.mockResolvedValue(false)

        const result = await storageService.has(key)

        expect(mockProvider.has).toHaveBeenCalledTimes(1)
        expect(mockProvider.has).toHaveBeenCalledWith('test_prefix_favorites')
        expect(result).toBe(false)
      })

      it('deve propagar erro do provider', async () => {
        const key = 'favorites'
        const error = new Error('Erro ao verificar existência')
        mockProvider.has.mockRejectedValue(error)

        await expect(storageService.has(key)).rejects.toThrow(
          'Erro ao verificar existência'
        )
        expect(mockProvider.has).toHaveBeenCalledTimes(1)
        expect(mockProvider.has).toHaveBeenCalledWith('test_prefix_favorites')
      })
    })
  })

  describe('sem prefixo', () => {
    beforeEach(() => {
      config = {
        provider: mockProvider
      }
      storageService = new StorageService(config)
    })

    describe('save', () => {
      it('deve salvar dados sem prefixo', async () => {
        const key = 'favorites'
        const data = { games: [] }
        mockProvider.save.mockResolvedValue()

        await storageService.save(key, data)

        expect(mockProvider.save).toHaveBeenCalledTimes(1)
        expect(mockProvider.save).toHaveBeenCalledWith('favorites', data)
      })

      it('deve propagar erro do provider', async () => {
        const key = 'favorites'
        const data = { games: [] }
        const error = new Error('Erro ao salvar')
        mockProvider.save.mockRejectedValue(error)

        await expect(storageService.save(key, data)).rejects.toThrow(
          'Erro ao salvar'
        )
        expect(mockProvider.save).toHaveBeenCalledTimes(1)
        expect(mockProvider.save).toHaveBeenCalledWith('favorites', data)
      })
    })

    describe('load', () => {
      it('deve carregar dados sem prefixo', async () => {
        const key = 'favorites'
        const expectedData = { games: [] }
        mockProvider.load.mockResolvedValue(expectedData)

        const result = await storageService.load(key)

        expect(mockProvider.load).toHaveBeenCalledTimes(1)
        expect(mockProvider.load).toHaveBeenCalledWith('favorites')
        expect(result).toEqual(expectedData)
      })

      it('deve propagar erro do provider', async () => {
        const key = 'favorites'
        const error = new Error('Erro ao carregar')
        mockProvider.load.mockRejectedValue(error)

        await expect(storageService.load(key)).rejects.toThrow(
          'Erro ao carregar'
        )
        expect(mockProvider.load).toHaveBeenCalledTimes(1)
        expect(mockProvider.load).toHaveBeenCalledWith('favorites')
      })
    })

    describe('remove', () => {
      it('deve remover dados sem prefixo', async () => {
        const key = 'favorites'
        mockProvider.remove.mockResolvedValue()

        await storageService.remove(key)

        expect(mockProvider.remove).toHaveBeenCalledTimes(1)
        expect(mockProvider.remove).toHaveBeenCalledWith('favorites')
      })

      it('deve propagar erro do provider', async () => {
        const key = 'favorites'
        const error = new Error('Erro ao remover')
        mockProvider.remove.mockRejectedValue(error)

        await expect(storageService.remove(key)).rejects.toThrow(
          'Erro ao remover'
        )
        expect(mockProvider.remove).toHaveBeenCalledTimes(1)
        expect(mockProvider.remove).toHaveBeenCalledWith('favorites')
      })
    })

    describe('clear', () => {
      it('deve limpar todos os dados', async () => {
        mockProvider.clear.mockResolvedValue()

        await storageService.clear()

        expect(mockProvider.clear).toHaveBeenCalledTimes(1)
      })

      it('deve propagar erro do provider', async () => {
        const error = new Error('Erro ao limpar')
        mockProvider.clear.mockRejectedValue(error)

        await expect(storageService.clear()).rejects.toThrow('Erro ao limpar')
        expect(mockProvider.clear).toHaveBeenCalledTimes(1)
      })
    })

    describe('has', () => {
      it('deve verificar existência sem prefixo - retorna true', async () => {
        const key = 'favorites'
        mockProvider.has.mockResolvedValue(true)

        const result = await storageService.has(key)

        expect(mockProvider.has).toHaveBeenCalledTimes(1)
        expect(mockProvider.has).toHaveBeenCalledWith('favorites')
        expect(result).toBe(true)
      })

      it('deve verificar existência sem prefixo - retorna false', async () => {
        const key = 'favorites'
        mockProvider.has.mockResolvedValue(false)

        const result = await storageService.has(key)

        expect(mockProvider.has).toHaveBeenCalledTimes(1)
        expect(mockProvider.has).toHaveBeenCalledWith('favorites')
        expect(result).toBe(false)
      })

      it('deve propagar erro do provider', async () => {
        const key = 'favorites'
        const error = new Error('Erro ao verificar existência')
        mockProvider.has.mockRejectedValue(error)

        await expect(storageService.has(key)).rejects.toThrow(
          'Erro ao verificar existência'
        )
        expect(mockProvider.has).toHaveBeenCalledTimes(1)
        expect(mockProvider.has).toHaveBeenCalledWith('favorites')
      })
    })
  })

  describe('com prefixo vazio', () => {
    beforeEach(() => {
      config = {
        provider: mockProvider,
        prefix: ''
      }
      storageService = new StorageService(config)
    })

    it('deve funcionar como se não tivesse prefixo', async () => {
      const key = 'favorites'
      const data = { games: [] }
      mockProvider.save.mockResolvedValue()

      await storageService.save(key, data)

      expect(mockProvider.save).toHaveBeenCalledTimes(1)
      expect(mockProvider.save).toHaveBeenCalledWith('favorites', data)
    })
  })

  describe('com diferentes tipos de dados', () => {
    beforeEach(() => {
      config = {
        provider: mockProvider,
        prefix: 'test'
      }
      storageService = new StorageService(config)
    })

    it('deve salvar string', async () => {
      const key = 'string_data'
      const data = 'test string'
      mockProvider.save.mockResolvedValue()

      await storageService.save(key, data)

      expect(mockProvider.save).toHaveBeenCalledWith('test_string_data', data)
    })

    it('deve salvar número', async () => {
      const key = 'number_data'
      const data = 42
      mockProvider.save.mockResolvedValue()

      await storageService.save(key, data)

      expect(mockProvider.save).toHaveBeenCalledWith('test_number_data', data)
    })

    it('deve salvar array', async () => {
      const key = 'array_data'
      const data = [1, 2, 3]
      mockProvider.save.mockResolvedValue()

      await storageService.save(key, data)

      expect(mockProvider.save).toHaveBeenCalledWith('test_array_data', data)
    })

    it('deve salvar objeto complexo', async () => {
      const key = 'object_data'
      const data = {
        user: {
          id: 1,
          name: 'Test User',
          preferences: {
            theme: 'dark',
            language: 'pt-BR'
          }
        },
        settings: {
          notifications: true,
          autoSave: false
        }
      }
      mockProvider.save.mockResolvedValue()

      await storageService.save(key, data)

      expect(mockProvider.save).toHaveBeenCalledWith('test_object_data', data)
    })

    it('deve salvar null', async () => {
      const key = 'null_data'
      const data = null
      mockProvider.save.mockResolvedValue()

      await storageService.save(key, data)

      expect(mockProvider.save).toHaveBeenCalledWith('test_null_data', data)
    })

    it('deve salvar undefined', async () => {
      const key = 'undefined_data'
      const data = undefined
      mockProvider.save.mockResolvedValue()

      await storageService.save(key, data)

      expect(mockProvider.save).toHaveBeenCalledWith(
        'test_undefined_data',
        data
      )
    })
  })

  describe('com chaves especiais', () => {
    beforeEach(() => {
      config = {
        provider: mockProvider,
        prefix: 'app'
      }
      storageService = new StorageService(config)
    })

    it('deve lidar com chave vazia', async () => {
      const key = ''
      const data = { test: 'data' }
      mockProvider.save.mockResolvedValue()

      await storageService.save(key, data)

      expect(mockProvider.save).toHaveBeenCalledWith('app_', data)
    })

    it('deve lidar com chave com caracteres especiais', async () => {
      const key = 'user-settings@domain.com'
      const data = { theme: 'dark' }
      mockProvider.save.mockResolvedValue()

      await storageService.save(key, data)

      expect(mockProvider.save).toHaveBeenCalledWith(
        'app_user-settings@domain.com',
        data
      )
    })

    it('deve lidar com chave com espaços', async () => {
      const key = 'user preferences'
      const data = { language: 'pt-BR' }
      mockProvider.save.mockResolvedValue()

      await storageService.save(key, data)

      expect(mockProvider.save).toHaveBeenCalledWith(
        'app_user preferences',
        data
      )
    })

    it('deve lidar com chave numérica como string', async () => {
      const key = '123'
      const data = { count: 42 }
      mockProvider.save.mockResolvedValue()

      await storageService.save(key, data)

      expect(mockProvider.save).toHaveBeenCalledWith('app_123', data)
    })
  })

  describe('integração com provider', () => {
    let realProvider: StorageProvider

    beforeEach(() => {
      realProvider = {
        save: jest.fn().mockResolvedValue(undefined),
        load: jest.fn().mockResolvedValue(null),
        remove: jest.fn().mockResolvedValue(undefined),
        clear: jest.fn().mockResolvedValue(undefined),
        has: jest.fn().mockResolvedValue(false)
      }

      config = {
        provider: realProvider,
        prefix: 'integration_test'
      }
      storageService = new StorageService(config)
    })

    it('deve executar operações em sequência corretamente', async () => {
      const key = 'test_sequence'
      const data = { step: 1 }

      await storageService.save(key, data)
      expect(realProvider.save).toHaveBeenCalledWith(
        'integration_test_test_sequence',
        data
      )

      await storageService.has(key)
      expect(realProvider.has).toHaveBeenCalledWith(
        'integration_test_test_sequence'
      )

      await storageService.load(key)
      expect(realProvider.load).toHaveBeenCalledWith(
        'integration_test_test_sequence'
      )

      await storageService.remove(key)
      expect(realProvider.remove).toHaveBeenCalledWith(
        'integration_test_test_sequence'
      )

      await storageService.clear()
      expect(realProvider.clear).toHaveBeenCalled()
    })
  })
})
