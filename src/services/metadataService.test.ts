import { API_ENDPOINTS, API_ERROR_MESSAGES } from '@/types/common'
import type {
  GenresResponse,
  PlatformsResponse,
  StoresResponse,
  TagsResponse
} from '@/types/game'
import { fetchWithHeaders } from '@/utils/api'
import { MetadataService } from './metadataService'

jest.mock('@/utils/api', () => ({
  fetchWithHeaders: jest.fn()
}))

jest.mock('@/config/api', () => ({
  getRawgApiUrl: jest.fn(
    (endpoint: string) => `https://api.rawg.io/api/${endpoint}`
  )
}))

describe('MetadataService', () => {
  let metadataService: MetadataService
  let mockFetchWithHeaders: jest.MockedFunction<typeof fetchWithHeaders>

  beforeEach(() => {
    jest.clearAllMocks()
    metadataService = new MetadataService()
    mockFetchWithHeaders = fetchWithHeaders as jest.MockedFunction<
      typeof fetchWithHeaders
    >
  })

  describe('getGenres', () => {
    const mockGenresResponse: GenresResponse = {
      count: 10,
      results: [
        {
          id: 1,
          name: 'Action',
          slug: 'action',
          games_count: 1000
        },
        {
          id: 2,
          name: 'Adventure',
          slug: 'adventure',
          games_count: 800
        }
      ]
    }

    it('deve buscar gêneros com sucesso', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockGenresResponse)
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      const result = await metadataService.getGenres()

      expect(result).toEqual(mockGenresResponse)
      expect(mockFetchWithHeaders).toHaveBeenCalledWith(
        expect.stringContaining(API_ENDPOINTS.GENRES)
      )
    })

    it('deve capturar erro da API', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        json: jest.fn().mockResolvedValue({ error: 'Internal Server Error' })
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      await expect(metadataService.getGenres()).rejects.toThrow(
        `${API_ERROR_MESSAGES.DEFAULT} 500`
      )
    })

    it('deve capturar erro de rede', async () => {
      const networkError = new Error('Network error')
      mockFetchWithHeaders.mockRejectedValue(networkError)

      await expect(metadataService.getGenres()).rejects.toThrow('Network error')
    })
  })

  describe('getPlatforms', () => {
    const mockPlatformsResponse: PlatformsResponse = {
      count: 5,
      results: [
        {
          id: 1,
          name: 'PC',
          slug: 'pc',
          games_count: 2000
        },
        {
          id: 2,
          name: 'PlayStation 5',
          slug: 'playstation5',
          games_count: 500
        }
      ]
    }

    it('deve buscar plataformas com sucesso', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockPlatformsResponse)
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      const result = await metadataService.getPlatforms()

      expect(result).toEqual(mockPlatformsResponse)
      expect(mockFetchWithHeaders).toHaveBeenCalledWith(
        expect.stringContaining(API_ENDPOINTS.PLATFORMS)
      )
    })

    it('deve capturar erro da API', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        json: jest.fn().mockResolvedValue({ error: 'Not Found' })
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      await expect(metadataService.getPlatforms()).rejects.toThrow(
        `${API_ERROR_MESSAGES.DEFAULT} 404`
      )
    })
  })

  describe('getStores', () => {
    const mockStoresResponse: StoresResponse = {
      count: 3,
      results: [
        {
          id: 1,
          name: 'Steam',
          slug: 'steam',
          domain: 'store.steampowered.com',
          games_count: 50000,
          image_background: 'https://example.com/image.jpg'
        },
        {
          id: 2,
          name: 'Epic Games Store',
          slug: 'epic-games-store',
          domain: 'store.epicgames.com',
          games_count: 1000,
          image_background: 'https://example.com/image.jpg'
        }
      ]
    }

    it('deve buscar lojas com sucesso', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockStoresResponse)
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      const result = await metadataService.getStores()

      expect(result).toEqual(mockStoresResponse)
      expect(mockFetchWithHeaders).toHaveBeenCalledWith(
        expect.stringContaining(API_ENDPOINTS.STORES)
      )
    })

    it('deve capturar erro da API', async () => {
      const mockResponse = {
        ok: false,
        status: 403,
        json: jest.fn().mockResolvedValue({ error: 'Forbidden' })
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      await expect(metadataService.getStores()).rejects.toThrow(
        `${API_ERROR_MESSAGES.DEFAULT} 403`
      )
    })
  })

  describe('getTags', () => {
    const mockTagsResponse: TagsResponse = {
      count: 8,
      results: [
        {
          id: 1,
          name: 'Multiplayer',
          slug: 'multiplayer',
          games_count: 3000,
          image_background: 'https://example.com/image.jpg'
        },
        {
          id: 2,
          name: 'Single-player',
          slug: 'single-player',
          games_count: 2500,
          image_background: 'https://example.com/image.jpg'
        }
      ]
    }

    it('deve buscar tags com sucesso', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockTagsResponse)
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      const result = await metadataService.getTags()

      expect(result).toEqual(mockTagsResponse)
      expect(mockFetchWithHeaders).toHaveBeenCalledWith(
        expect.stringContaining(API_ENDPOINTS.TAGS)
      )
    })

    it('deve capturar erro da API', async () => {
      const mockResponse = {
        ok: false,
        status: 429,
        json: jest.fn().mockResolvedValue({ error: 'Too Many Requests' })
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      await expect(metadataService.getTags()).rejects.toThrow(
        `${API_ERROR_MESSAGES.DEFAULT} 429`
      )
    })
  })

  describe('Performance e Tratamento de Erros', () => {
    it('deve lidar com resposta vazia', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ count: 0, results: [] })
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      const result = await metadataService.getGenres()

      expect(result.count).toBe(0)
      expect(result.results).toEqual([])
    })

    it('deve lidar com erro de parsing JSON', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON'))
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      await expect(metadataService.getGenres()).rejects.toThrow('Invalid JSON')
    })

    it('deve usar endpoints corretos', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ count: 0, results: [] })
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      await metadataService.getGenres()
      expect(mockFetchWithHeaders).toHaveBeenCalledWith(
        expect.stringContaining('/genres')
      )

      await metadataService.getPlatforms()
      expect(mockFetchWithHeaders).toHaveBeenCalledWith(
        expect.stringContaining('/platforms')
      )

      await metadataService.getStores()
      expect(mockFetchWithHeaders).toHaveBeenCalledWith(
        expect.stringContaining('/stores')
      )

      await metadataService.getTags()
      expect(mockFetchWithHeaders).toHaveBeenCalledWith(
        expect.stringContaining('/tags')
      )
    })
  })

  describe('Integração', () => {
    it('deve buscar todos os metadados com sucesso', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ count: 0, results: [] })
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      const [genres, platforms, stores, tags] = await Promise.all([
        metadataService.getGenres(),
        metadataService.getPlatforms(),
        metadataService.getStores(),
        metadataService.getTags()
      ])

      expect(genres).toBeDefined()
      expect(platforms).toBeDefined()
      expect(stores).toBeDefined()
      expect(tags).toBeDefined()

      expect(mockFetchWithHeaders).toHaveBeenCalledTimes(4)
    })

    it('deve lidar com falhas parciais', async () => {
      const successResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ count: 0, results: [] })
      }

      const errorResponse = {
        ok: false,
        status: 500,
        json: jest.fn().mockResolvedValue({ error: 'Internal Server Error' })
      }

      mockFetchWithHeaders

        .mockResolvedValueOnce(successResponse as any)

        .mockResolvedValueOnce(errorResponse as any)

        .mockResolvedValueOnce(successResponse as any)

        .mockResolvedValueOnce(successResponse as any)

      await expect(metadataService.getGenres()).resolves.toBeDefined()
      await expect(metadataService.getPlatforms()).rejects.toThrow()
      await expect(metadataService.getStores()).resolves.toBeDefined()
      await expect(metadataService.getTags()).resolves.toBeDefined()
    })
  })
})
