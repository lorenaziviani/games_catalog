import { API_ENDPOINTS, API_ERROR_MESSAGES } from '@/types/common'
import type { GameDetails, GamesResponse } from '@/types/game'
import { fetchWithHeaders } from '@/utils/api'
import { GameService } from './GameService'
import type { IObservabilityService } from './interfaces/IObservabilityService'

const mockObservabilityService: jest.Mocked<IObservabilityService> = {
  captureError: jest.fn(),
  captureEvent: jest.fn(),
  capturePerformance: jest.fn(),
  captureApiError: jest.fn(),
  captureApiPerformance: jest.fn()
}

jest.mock('@/config/env', () => ({
  env: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 50,
    RAWG_API_KEY: 'test-api-key',
    RAWG_API_BASE_URL: 'https://api.rawg.io/api'
  }
}))

jest.mock('@/config/api', () => ({
  getRawgApiUrl: jest.fn(
    (endpoint: string) => `https://api.rawg.io/api/${endpoint}`
  )
}))

jest.mock('@/utils/api', () => ({
  fetchWithHeaders: jest.fn()
}))

describe('GameService', () => {
  let gameService: GameService
  let mockFetchWithHeaders: jest.MockedFunction<typeof fetchWithHeaders>

  beforeEach(() => {
    jest.clearAllMocks()
    gameService = new GameService(mockObservabilityService)
    mockFetchWithHeaders = fetchWithHeaders as jest.MockedFunction<
      typeof fetchWithHeaders
    >
  })

  describe('getPopularGames', () => {
    const mockGamesResponse: GamesResponse = {
      count: 100,
      next: 'https://example.com/next',
      previous: undefined,
      results: [
        {
          id: 1,
          name: 'Test Game',
          slug: 'test-game',
          background_image: 'https://example.com/image.jpg',
          rating: 4.5,
          rating_top: 5,
          metacritic: 85,
          playtime: 0,
          released: '2023-01-01',
          updated: '2023-01-01',
          tba: false,
          added: 0,
          added_by_status: {
            yet: 0,
            owned: 0,
            beaten: 0,
            toplay: 0,
            dropped: 0,
            playing: 0
          },
          ratings: [],
          ratings_count: 0,
          reviews_text_count: 0,
          suggestions_count: 0,
          user_game: null,
          reviews_count: 0,
          saturated_color: '#000000',
          dominant_color: '#000000',
          platforms: [],
          genres: [],
          stores: [],
          tags: [],
          esrb_rating: undefined,
          short_screenshots: [],
          clip: null
        }
      ]
    }

    it('deve buscar jogos populares com sucesso', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockGamesResponse)
      }

      mockFetchWithHeaders.mockResolvedValue(
        mockResponse as unknown as Response
      )

      const result = await gameService.getPopularGames(1, 20)

      expect(result).toEqual(mockGamesResponse)
      expect(
        mockObservabilityService.captureApiPerformance
      ).toHaveBeenCalledWith(API_ENDPOINTS.GAMES, expect.any(Number), 200)
    })

    it('deve usar valores padrão quando parâmetros não são fornecidos', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockGamesResponse)
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      await gameService.getPopularGames()

      expect(mockFetchWithHeaders).toHaveBeenCalledWith(
        expect.stringContaining('page=1&page_size=20&ordering=-added')
      )
    })

    it('deve limitar pageSize ao valor máximo', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockGamesResponse)
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      await gameService.getPopularGames(1, 100)

      expect(mockFetchWithHeaders).toHaveBeenCalledWith(
        expect.stringContaining('page_size=50')
      )
    })

    it('deve capturar erro da API', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        json: jest.fn().mockResolvedValue({ error: 'Internal Server Error' })
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      await expect(gameService.getPopularGames()).rejects.toThrow(
        `${API_ERROR_MESSAGES.DEFAULT} 500`
      )

      expect(mockObservabilityService.captureApiError).toHaveBeenCalledWith(
        API_ENDPOINTS.GAMES,
        500,
        `${API_ERROR_MESSAGES.DEFAULT} 500`
      )
    })

    it('deve capturar erro de rede', async () => {
      const networkError = new Error('Network error')
      mockFetchWithHeaders.mockRejectedValue(networkError)

      await expect(gameService.getPopularGames()).rejects.toThrow(
        'Network error'
      )

      expect(mockObservabilityService.captureApiError).toHaveBeenCalledWith(
        API_ENDPOINTS.GAMES,
        0,
        networkError
      )
    })
  })

  describe('searchGames', () => {
    const mockSearchResponse: GamesResponse = {
      count: 10,
      next: undefined,
      previous: undefined,
      results: [
        {
          id: 1,
          name: 'Search Result Game',
          slug: 'search-result-game',
          background_image: 'https://example.com/image.jpg',
          rating: 4.0,
          rating_top: 5,
          metacritic: 80,
          playtime: 0,
          released: '2023-01-01',
          updated: '2023-01-01',
          tba: false,
          added: 0,
          added_by_status: {
            yet: 0,
            owned: 0,
            beaten: 0,
            toplay: 0,
            dropped: 0,
            playing: 0
          },
          ratings: [],
          ratings_count: 0,
          reviews_text_count: 0,
          suggestions_count: 0,
          user_game: null,
          reviews_count: 0,
          saturated_color: '#000000',
          dominant_color: '#000000',
          platforms: [],
          genres: [],
          stores: [],
          tags: [],
          esrb_rating: undefined,
          short_screenshots: [],
          clip: null
        }
      ]
    }

    it('deve buscar jogos com sucesso', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockSearchResponse)
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      const result = await gameService.searchGames('test query')

      expect(result).toEqual(mockSearchResponse)
      expect(mockFetchWithHeaders).toHaveBeenCalledWith(
        expect.stringContaining('search=test')
      )
    })

    it('deve capturar erro da API', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        json: jest.fn().mockResolvedValue({ error: 'Not Found' })
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      await expect(gameService.searchGames('test')).rejects.toThrow(
        `${API_ERROR_MESSAGES.DEFAULT} 404`
      )
    })
  })

  describe('getGamesByFilters', () => {
    const mockFilterResponse: GamesResponse = {
      count: 50,
      next: undefined,
      previous: undefined,
      results: []
    }

    it('deve filtrar jogos com sucesso', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockFilterResponse)
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      const filterParams = {
        genres: 'action',
        platforms: 'pc',
        ordering: '-rating'
      }

      const result = await gameService.getGamesWithFilters(filterParams)

      expect(result).toEqual(mockFilterResponse)
      expect(mockFetchWithHeaders).toHaveBeenCalledWith(
        expect.stringContaining('genres=action')
      )
      expect(mockFetchWithHeaders).toHaveBeenCalledWith(
        expect.stringContaining('platforms=pc')
      )
      expect(mockFetchWithHeaders).toHaveBeenCalledWith(
        expect.stringContaining('ordering=-rating')
      )
    })

    it('deve lidar com filtros vazios', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockFilterResponse)
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      await gameService.getGamesWithFilters({})

      expect(mockFetchWithHeaders).toHaveBeenCalledWith(
        expect.not.stringContaining('genres=')
      )
    })
  })

  describe('getGameById', () => {
    const mockGameDetails: GameDetails = {
      id: 1,
      name: 'Test Game',
      slug: 'test-game',
      description: 'Test description',
      background_image: 'https://example.com/image.jpg',
      rating: 4.5,
      rating_top: 5,
      metacritic: 85,
      playtime: 0,
      released: '2023-01-01',
      updated: '2023-01-01',
      tba: false,
      added: 0,
      added_by_status: {
        yet: 0,
        owned: 0,
        beaten: 0,
        toplay: 0,
        dropped: 0,
        playing: 0
      },
      ratings: [],
      ratings_count: 0,
      reviews_text_count: 0,
      suggestions_count: 0,
      user_game: '',
      reviews_count: 0,
      saturated_color: '#000000',
      dominant_color: '#000000',
      platforms: [],
      genres: [],
      stores: [],
      tags: [],
      esrb_rating: undefined,
      short_screenshots: [],
      clip: '',
      website: 'https://example.com/website',
      reddit_url: 'https://example.com/reddit',
      reddit_name: 'test',
      reddit_description: 'test',
      reddit_logo: 'https://example.com/reddit-logo',
      screenshots_count: 0,
      movies_count: 0,
      creators_count: 0,
      achievements_count: 0,
      parent_achievements: 'test',
      metacritic_url: 'https://example.com/metacritic',
      parents_count: 0,
      additions_count: 0,
      game_series_count: 0,
      clips: {
        clip: 'test',
        clips: {
          320: 'test',
          640: 'test',
          full: 'test'
        },
        video: 'test',
        preview: 'test'
      },
      requirements: {
        minimum: 'test',
        recommended: 'test'
      }
    }

    it('deve buscar detalhes do jogo com sucesso', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockGameDetails)
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      const result = await gameService.getGameById(1)

      expect(result).toEqual(mockGameDetails)
      expect(mockFetchWithHeaders).toHaveBeenCalledWith(
        expect.stringContaining('/games/1')
      )
    })

    it('deve capturar erro quando jogo não encontrado', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        json: jest.fn().mockResolvedValue({ error: 'Game not found' })
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      await expect(gameService.getGameById(999)).rejects.toThrow(
        `${API_ERROR_MESSAGES.DEFAULT} 404`
      )
    })
  })

  describe('getGamesByGenre', () => {
    const mockGenreResponse: GamesResponse = {
      count: 25,
      next: '',
      previous: '',
      results: []
    }

    it('deve buscar jogos por gênero com sucesso', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockGenreResponse)
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      const result = await gameService.getGamesByGenre('action')

      expect(result).toEqual(mockGenreResponse)
      expect(mockFetchWithHeaders).toHaveBeenCalledWith(
        expect.stringContaining('genres=action')
      )
    })

    it('deve usar paginação correta', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockGenreResponse)
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      await gameService.getGamesByGenre('action', 2, 10)

      expect(mockFetchWithHeaders).toHaveBeenCalledWith(
        expect.stringContaining('page=2&page_size=10')
      )
    })
  })

  describe('Performance e Observabilidade', () => {
    it('deve medir performance das chamadas de API', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({ results: [] })
      }

      mockFetchWithHeaders.mockResolvedValue(mockResponse as any)

      await gameService.getPopularGames()

      expect(
        mockObservabilityService.captureApiPerformance
      ).toHaveBeenCalledWith(API_ENDPOINTS.GAMES, expect.any(Number), 200)
    })

    it('deve capturar erros de observabilidade', async () => {
      const networkError = new Error('Network error')
      mockFetchWithHeaders.mockRejectedValue(networkError)

      await expect(gameService.getPopularGames()).rejects.toThrow(
        'Network error'
      )

      expect(mockObservabilityService.captureApiError).toHaveBeenCalledWith(
        API_ENDPOINTS.GAMES,
        0,
        networkError
      )
    })
  })
})
