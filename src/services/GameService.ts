import { getRawgApiUrl } from '@/config/api'
import { env } from '@/config/env'
import type {
  FilterParams,
  IGameService
} from '@/services/interfaces/IGameService'
import type { IObservabilityService } from '@/services/interfaces/IObservabilityService'
import {
  API_ENDPOINTS,
  API_ERROR_MESSAGES,
  API_ORDERING,
  API_QUERY_PARAMS
} from '@/types/common'
import type { GameDetails, GamesResponse } from '@/types/game'
import { fetchWithHeaders } from '@/utils/api'

export class GameService implements IGameService {
  constructor(private observabilityService: IObservabilityService) {}

  async getPopularGames(
    page = 1,
    pageSize = env.DEFAULT_PAGE_SIZE
  ): Promise<GamesResponse> {
    const startTime = performance.now()
    const endpoint = `${API_ENDPOINTS.GAMES}`

    try {
      const params = new URLSearchParams({
        [API_QUERY_PARAMS.PAGE]: page.toString(),
        [API_QUERY_PARAMS.PAGE_SIZE]: Math.min(
          pageSize,
          env.MAX_PAGE_SIZE
        ).toString(),
        [API_QUERY_PARAMS.ORDERING]: API_ORDERING.ADDED_DESC
      })

      const response = await fetchWithHeaders(
        getRawgApiUrl(`${endpoint}?${params}`)
      )

      const duration = performance.now() - startTime

      if (!response.ok) {
        this.observabilityService.captureApiError(
          endpoint,
          response.status,
          `${API_ERROR_MESSAGES.DEFAULT} ${response.status}`
        )
        throw new Error(`${API_ERROR_MESSAGES.DEFAULT} ${response.status}`)
      }

      this.observabilityService.captureApiPerformance(
        endpoint,
        duration,
        response.status
      )
      const data = await response.json()

      return data
    } catch (error) {
      const duration = performance.now() - startTime
      this.observabilityService.captureApiError(endpoint, 0, error)
      this.observabilityService.captureApiPerformance(endpoint, duration, 0)
      console.error(API_ERROR_MESSAGES.POPULAR_GAMES, error)
      throw error
    }
  }

  async searchGames(
    query: string,
    page = 1,
    pageSize = env.DEFAULT_PAGE_SIZE
  ): Promise<GamesResponse> {
    try {
      const params = new URLSearchParams({
        [API_QUERY_PARAMS.SEARCH]: query,
        [API_QUERY_PARAMS.PAGE]: page.toString(),
        [API_QUERY_PARAMS.PAGE_SIZE]: Math.min(
          pageSize,
          env.MAX_PAGE_SIZE
        ).toString()
      })

      const response = await fetchWithHeaders(
        getRawgApiUrl(`${API_ENDPOINTS.GAMES}?${params}`)
      )

      if (!response.ok) {
        throw new Error(`${API_ERROR_MESSAGES.DEFAULT} ${response.status}`)
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error(API_ERROR_MESSAGES.SEARCH_GAMES, error)
      throw error
    }
  }

  async getGamesWithFilters(
    filterParams: FilterParams,
    pageSize = env.DEFAULT_PAGE_SIZE
  ): Promise<GamesResponse> {
    try {
      const params = new URLSearchParams({
        [API_QUERY_PARAMS.PAGE]: (filterParams.page || 1).toString(),
        [API_QUERY_PARAMS.PAGE_SIZE]: Math.min(
          pageSize,
          env.MAX_PAGE_SIZE
        ).toString(),
        [API_QUERY_PARAMS.ORDERING]:
          filterParams.ordering || API_ORDERING.ADDED_DESC
      })

      if (filterParams.search) {
        params.append(API_QUERY_PARAMS.SEARCH, filterParams.search)
      }
      if (filterParams.genres) {
        params.append(API_QUERY_PARAMS.GENRES, filterParams.genres)
      }
      if (filterParams.platforms) {
        params.append(API_QUERY_PARAMS.PLATFORMS, filterParams.platforms)
      }
      if (filterParams.parent_platforms) {
        params.append(
          API_QUERY_PARAMS.PARENT_PLATFORMS,
          filterParams.parent_platforms
        )
      }
      if (filterParams.stores) {
        params.append(API_QUERY_PARAMS.STORES, filterParams.stores)
      }
      if (filterParams.tags) {
        params.append(API_QUERY_PARAMS.TAGS, filterParams.tags)
      }
      if (filterParams.dates) {
        params.append(API_QUERY_PARAMS.DATES, filterParams.dates)
      }
      if (filterParams.metacritic) {
        params.append(API_QUERY_PARAMS.METACRITIC, filterParams.metacritic)
      }

      const response = await fetchWithHeaders(
        getRawgApiUrl(`${API_ENDPOINTS.GAMES}?${params}`)
      )

      if (!response.ok) {
        throw new Error(`${API_ERROR_MESSAGES.DEFAULT} ${response.status}`)
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error(API_ERROR_MESSAGES.FILTERED_GAMES, error)
      throw error
    }
  }

  async getGameById(id: number): Promise<GameDetails> {
    try {
      const response = await fetchWithHeaders(
        getRawgApiUrl(`${API_ENDPOINTS.GAMES}/${id}`)
      )

      if (!response.ok) {
        throw new Error(`${API_ERROR_MESSAGES.DEFAULT} ${response.status}`)
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error(API_ERROR_MESSAGES.GAME_BY_ID, error)
      throw error
    }
  }

  async getGamesByGenre(
    genre: string,
    page = 1,
    pageSize = env.DEFAULT_PAGE_SIZE
  ): Promise<GamesResponse> {
    try {
      const params = new URLSearchParams({
        [API_QUERY_PARAMS.GENRES]: genre,
        [API_QUERY_PARAMS.PAGE]: page.toString(),
        [API_QUERY_PARAMS.PAGE_SIZE]: Math.min(
          pageSize,
          env.MAX_PAGE_SIZE
        ).toString(),
        [API_QUERY_PARAMS.ORDERING]: API_ORDERING.ADDED_DESC
      })

      const response = await fetchWithHeaders(
        getRawgApiUrl(`${API_ENDPOINTS.GAMES}?${params}`)
      )

      if (!response.ok) {
        throw new Error(`${API_ERROR_MESSAGES.DEFAULT} ${response.status}`)
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error(API_ERROR_MESSAGES.GAMES_BY_GENRE, error)
      throw error
    }
  }
}
