import { jest } from '@jest/globals'
import { fetchWithHeaders } from './api'

jest.mock('@/services/configService', () => ({
  configService: {
    getTimeoutConfig: jest.fn(),
    isProduction: jest.fn()
  }
}))

jest.mock('@/config/api', () => ({
  getDefaultHeaders: jest.fn()
}))

global.fetch = jest.fn() as any

global.AbortController = jest.fn() as any

describe('fetchWithHeaders', () => {
  let mockFetch: jest.MockedFunction<typeof fetch>

  let mockGetDefaultHeaders: jest.MockedFunction<any>

  let mockGetTimeoutConfig: jest.MockedFunction<any>

  let mockIsProduction: jest.MockedFunction<any>
  let mockAbortController: jest.MockedClass<typeof AbortController>

  beforeEach(() => {
    jest.clearAllMocks()

    mockFetch = global.fetch as jest.MockedFunction<typeof fetch>
    mockGetDefaultHeaders = require('@/config/api').getDefaultHeaders
    mockGetTimeoutConfig = require('@/services/configService').configService
      .getTimeoutConfig
    mockIsProduction = require('@/services/configService').configService
      .isProduction
    mockAbortController = global.AbortController as jest.MockedClass<
      typeof AbortController
    >

    mockGetDefaultHeaders.mockReturnValue({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    })

    mockGetTimeoutConfig.mockReturnValue({
      timeout: 5000,
      retryAttempts: 3,
      retryDelay: 1000
    })

    mockIsProduction.mockReturnValue(false)

    const mockAbort = jest.fn()
    const mockSignal = { aborted: false }

    mockAbortController.mockImplementation(
      () =>
        ({
          abort: mockAbort,
          signal: mockSignal
        }) as any
    )
  })

  describe('configuração básica', () => {
    it('deve fazer requisição GET com headers padrão', async () => {
      const mockResponse = { ok: true, json: jest.fn() }

      mockFetch.mockResolvedValue(mockResponse as any)

      const url = 'https://api.example.com/data'
      await fetchWithHeaders(url)

      expect(mockFetch).toHaveBeenCalledWith(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        signal: expect.any(Object)
      })
    })

    it('deve usar AbortController para timeout', async () => {
      const mockResponse = { ok: true, json: jest.fn() }

      mockFetch.mockResolvedValue(mockResponse as any)

      await fetchWithHeaders('https://api.example.com/data')

      expect(mockAbortController).toHaveBeenCalled()
    })
  })

  describe('configuração de headers', () => {
    it('deve adicionar Cache-Control em produção', async () => {
      mockIsProduction.mockReturnValue(true)
      const mockResponse = { ok: true, json: jest.fn() }

      mockFetch.mockResolvedValue(mockResponse as any)

      await fetchWithHeaders('https://api.example.com/data')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/data',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Cache-Control': 'public, max-age=300'
          })
        })
      )
    })

    it('não deve adicionar Cache-Control em desenvolvimento', async () => {
      mockIsProduction.mockReturnValue(false)
      const mockResponse = { ok: true, json: jest.fn() }

      mockFetch.mockResolvedValue(mockResponse as any)

      await fetchWithHeaders('https://api.example.com/data')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/data',
        expect.objectContaining({
          headers: expect.not.objectContaining({
            'Cache-Control': 'public, max-age=300'
          })
        })
      )
    })

    it('deve usar headers padrão do getDefaultHeaders', async () => {
      const customHeaders = {
        Authorization: 'Bearer token',
        'X-Custom-Header': 'value'
      }
      mockGetDefaultHeaders.mockReturnValue(customHeaders)

      const mockResponse = { ok: true, json: jest.fn() }

      mockFetch.mockResolvedValue(mockResponse as any)

      await fetchWithHeaders('https://api.example.com/data')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/data',
        expect.objectContaining({
          headers: customHeaders
        })
      )
    })
  })

  describe('timeout e abort', () => {
    it('deve configurar timeout baseado na configuração', async () => {
      const mockTimeoutConfig = {
        timeout: 10000,
        retryAttempts: 5,
        retryDelay: 2000
      }
      mockGetTimeoutConfig.mockReturnValue(mockTimeoutConfig)

      const mockResponse = { ok: true, json: jest.fn() }

      mockFetch.mockResolvedValue(mockResponse as any)

      const originalSetTimeout = global.setTimeout
      const mockSetTimeout = jest.fn()

      global.setTimeout = mockSetTimeout as any

      await fetchWithHeaders('https://api.example.com/data')

      expect(mockSetTimeout).toHaveBeenCalledWith(expect.any(Function), 10000)

      global.setTimeout = originalSetTimeout
    })

    it('deve limpar timeout quando requisição é bem-sucedida', async () => {
      const mockResponse = { ok: true, json: jest.fn() }

      mockFetch.mockResolvedValue(mockResponse as any)

      const originalSetTimeout = global.setTimeout
      const originalClearTimeout = global.clearTimeout
      const mockSetTimeout = jest.fn()
      const mockClearTimeout = jest.fn()

      global.setTimeout = mockSetTimeout as any

      global.clearTimeout = mockClearTimeout as any

      await fetchWithHeaders('https://api.example.com/data')

      expect(mockClearTimeout).toHaveBeenCalled()

      global.setTimeout = originalSetTimeout
      global.clearTimeout = originalClearTimeout
    })

    it('deve limpar timeout quando requisição falha', async () => {
      const mockError = new Error('Network error')
      mockFetch.mockRejectedValue(mockError)

      const originalSetTimeout = global.setTimeout
      const originalClearTimeout = global.clearTimeout
      const mockSetTimeout = jest.fn()
      const mockClearTimeout = jest.fn()

      global.setTimeout = mockSetTimeout as any

      global.clearTimeout = mockClearTimeout as any

      await expect(
        fetchWithHeaders('https://api.example.com/data')
      ).rejects.toThrow('Network error')

      expect(mockClearTimeout).toHaveBeenCalled()

      global.setTimeout = originalSetTimeout
      global.clearTimeout = originalClearTimeout
    })
  })

  describe('tratamento de erros', () => {
    it('deve propagar erro de fetch', async () => {
      const mockError = new Error('Network error')
      mockFetch.mockRejectedValue(mockError)

      await expect(
        fetchWithHeaders('https://api.example.com/data')
      ).rejects.toThrow('Network error')
    })

    it('deve propagar erro de timeout', async () => {
      const mockAbort = jest.fn()
      const mockSignal = { aborted: false }

      mockAbortController.mockImplementation(
        () =>
          ({
            abort: mockAbort,
            signal: mockSignal
          }) as any
      )

      const originalSetTimeout = global.setTimeout

      global.setTimeout = jest.fn((callback: () => void) => {
        callback()
        return 123
      }) as any

      const mockError = new Error('AbortError')
      mockFetch.mockRejectedValue(mockError)

      await expect(
        fetchWithHeaders('https://api.example.com/data')
      ).rejects.toThrow('AbortError')

      global.setTimeout = originalSetTimeout
    })

    it('deve limpar timeout mesmo quando fetch falha', async () => {
      const mockError = new Error('Network error')
      mockFetch.mockRejectedValue(mockError)

      const originalSetTimeout = global.setTimeout
      const originalClearTimeout = global.clearTimeout
      const mockSetTimeout = jest.fn()
      const mockClearTimeout = jest.fn()

      global.setTimeout = mockSetTimeout as any

      global.clearTimeout = mockClearTimeout as any

      try {
        await fetchWithHeaders('https://api.example.com/data')
      } catch (error) {
        console.log(error)
      }

      expect(mockClearTimeout).toHaveBeenCalled()

      global.setTimeout = originalSetTimeout
      global.clearTimeout = originalClearTimeout
    })
  })

  describe('integração com configService', () => {
    it('deve usar getTimeoutConfig do configService', async () => {
      const mockResponse = { ok: true, json: jest.fn() }

      mockFetch.mockResolvedValue(mockResponse as any)

      await fetchWithHeaders('https://api.example.com/data')

      expect(mockGetTimeoutConfig).toHaveBeenCalled()
    })

    it('deve usar isProduction do configService', async () => {
      const mockResponse = { ok: true, json: jest.fn() }

      mockFetch.mockResolvedValue(mockResponse as any)

      await fetchWithHeaders('https://api.example.com/data')

      expect(mockIsProduction).toHaveBeenCalled()
    })
  })

  describe('cenários de edge cases', () => {
    it('deve lidar com URL vazia', async () => {
      const mockResponse = { ok: true, json: jest.fn() }

      mockFetch.mockResolvedValue(mockResponse as any)

      await fetchWithHeaders('')

      expect(mockFetch).toHaveBeenCalledWith('', expect.any(Object))
    })

    it('deve lidar com URL inválida', async () => {
      const mockError = new Error('Invalid URL')
      mockFetch.mockRejectedValue(mockError)

      await expect(fetchWithHeaders('invalid-url')).rejects.toThrow(
        'Invalid URL'
      )
    })

    it('deve lidar com timeout muito baixo', async () => {
      mockGetTimeoutConfig.mockReturnValue({
        timeout: 0,
        retryAttempts: 3,
        retryDelay: 1000
      })

      const mockResponse = { ok: true, json: jest.fn() }

      mockFetch.mockResolvedValue(mockResponse as any)

      const originalSetTimeout = global.setTimeout
      const mockSetTimeout = jest.fn()

      global.setTimeout = mockSetTimeout as any

      await fetchWithHeaders('https://api.example.com/data')

      expect(mockSetTimeout).toHaveBeenCalledWith(expect.any(Function), 0)

      global.setTimeout = originalSetTimeout
    })
  })

  describe('comportamento assíncrono', () => {
    it('deve retornar Promise', async () => {
      const mockResponse = { ok: true, json: jest.fn() }

      mockFetch.mockResolvedValue(mockResponse as any)

      const result = fetchWithHeaders('https://api.example.com/data')

      expect(result).toBeInstanceOf(Promise)
      await result
    })

    it('deve resolver com response quando bem-sucedido', async () => {
      const mockResponse = { ok: true, json: jest.fn() }

      mockFetch.mockResolvedValue(mockResponse as any)

      const result = await fetchWithHeaders('https://api.example.com/data')

      expect(result).toBe(mockResponse)
    })

    it('deve rejeitar com erro quando fetch falha', async () => {
      const mockError = new Error('Network error')
      mockFetch.mockRejectedValue(mockError)

      await expect(
        fetchWithHeaders('https://api.example.com/data')
      ).rejects.toThrow('Network error')
    })
  })
})
