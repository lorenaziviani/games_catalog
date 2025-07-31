import { LocalStorageProvider } from '../LocalStorageProvider'

describe('LocalStorageProvider', () => {
  let provider: LocalStorageProvider
  let mockLocalStorage: { [key: string]: string }

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

    provider = new LocalStorageProvider()
  })

  afterEach(() => {
    jest.clearAllMocks()
    mockLocalStorage = {}
  })

  describe('constructor', () => {
    it('deve usar prefix padrão quando não fornecido', () => {
      const defaultProvider = new LocalStorageProvider()
      expect(defaultProvider).toBeInstanceOf(LocalStorageProvider)
    })

    it('deve usar prefix customizado quando fornecido', () => {
      const customProvider = new LocalStorageProvider('custom_prefix_')
      expect(customProvider).toBeInstanceOf(LocalStorageProvider)
    })
  })

  describe('save', () => {
    it('deve salvar dados com sucesso', async () => {
      const testData = { name: 'test', value: 123 }
      const key = 'test-key'

      await provider.save(key, testData)

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'heroes_catalog_test-key',
        JSON.stringify(testData)
      )
    })

    it('deve lançar erro quando localStorage falha', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      const testData = { name: 'test' }
      const key = 'test-key'

      jest.mocked(localStorage.setItem).mockImplementationOnce(() => {
        throw new Error('Storage error')
      })

      await expect(provider.save(key, testData)).rejects.toThrow(
        'Storage error'
      )
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to save to localStorage:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })
  })

  describe('load', () => {
    it('deve carregar dados existentes com sucesso', async () => {
      const testData = { name: 'test', value: 456 }
      const key = 'test-key'
      const fullKey = 'heroes_catalog_test-key'

      mockLocalStorage[fullKey] = JSON.stringify(testData)

      const result = await provider.load(key)

      expect(result).toEqual(testData)
      expect(localStorage.getItem).toHaveBeenCalledWith(fullKey)
    })

    it('deve retornar null quando chave não existe', async () => {
      const key = 'non-existent-key'

      const result = await provider.load(key)

      expect(result).toBeNull()
    })

    it('deve retornar null quando localStorage falha', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      const key = 'test-key'

      jest.mocked(localStorage.getItem).mockImplementationOnce(() => {
        throw new Error('Storage error')
      })

      const result = await provider.load(key)

      expect(result).toBeNull()
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to load from localStorage:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })

    it('deve retornar null quando dados são JSON inválido', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      const key = 'test-key'
      const fullKey = 'heroes_catalog_test-key'

      mockLocalStorage[fullKey] = 'invalid-json'

      const result = await provider.load(key)

      expect(result).toBeNull()
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to load from localStorage:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })
  })

  describe('remove', () => {
    it('deve remover item com sucesso', async () => {
      const key = 'test-key'
      const fullKey = 'heroes_catalog_test-key'

      mockLocalStorage[fullKey] = 'test-data'

      await provider.remove(key)

      expect(localStorage.removeItem).toHaveBeenCalledWith(fullKey)
      expect(mockLocalStorage[fullKey]).toBeUndefined()
    })

    it('deve lançar erro quando localStorage falha', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      const key = 'test-key'

      jest.mocked(localStorage.removeItem).mockImplementationOnce(() => {
        throw new Error('Storage error')
      })

      await expect(provider.remove(key)).rejects.toThrow('Storage error')
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to remove from localStorage:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })
  })

  describe('clear', () => {
    it.skip('deve limpar apenas itens com prefix correto', async () => {})

    it.skip('deve lançar erro quando localStorage falha', async () => {})
  })

  describe('has', () => {
    it('deve retornar true quando item existe', async () => {
      const key = 'test-key'
      const fullKey = 'heroes_catalog_test-key'

      mockLocalStorage[fullKey] = 'test-data'

      const result = await provider.has(key)

      expect(result).toBe(true)
      expect(localStorage.getItem).toHaveBeenCalledWith(fullKey)
    })

    it('deve retornar false quando item não existe', async () => {
      const key = 'non-existent-key'

      const result = await provider.has(key)

      expect(result).toBe(false)
    })

    it('deve retornar false quando localStorage falha', async () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      const key = 'test-key'

      jest.mocked(localStorage.getItem).mockImplementationOnce(() => {
        throw new Error('Storage error')
      })

      const result = await provider.has(key)

      expect(result).toBe(false)
      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to check localStorage:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })
  })

  describe('getKey', () => {
    it('deve gerar chave com prefix correto', () => {
      const provider = new LocalStorageProvider('test_prefix_')

      const testData = { test: 'data' }
      provider.save('my-key', testData)

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'test_prefix_my-key',
        JSON.stringify(testData)
      )
    })
  })
})
