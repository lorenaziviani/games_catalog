import { getRawgApiUrl } from '../config/api'
import { env } from '../config/env'
import {
  API_ENDPOINTS,
  API_ERROR_MESSAGES,
  API_ORDERING,
  API_QUERY_PARAMS
} from '../types/common'
import type {
  GameDetails,
  GamesResponse,
  GenresResponse,
  PlatformsResponse,
  StoresResponse,
  TagsResponse
} from '../types/game'
import { fetchWithHeaders } from '../utils/api'

interface FilterParams {
  page?: number
  search?: string
  genres?: string
  platforms?: string
  parent_platforms?: string
  stores?: string
  tags?: string
  dates?: string
  metacritic?: string
  ordering?: string
}

export const gamesApi = {
  async getPopularGames(
    page = 1,
    pageSize = env.DEFAULT_PAGE_SIZE
  ): Promise<GamesResponse> {
    try {
      const params = new URLSearchParams({
        [API_QUERY_PARAMS.PAGE]: page.toString(),
        [API_QUERY_PARAMS.PAGE_SIZE]: Math.min(
          pageSize,
          env.MAX_PAGE_SIZE
        ).toString(),
        [API_QUERY_PARAMS.ORDERING]: API_ORDERING.RATING_DESC
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
      console.error(API_ERROR_MESSAGES.POPULAR_GAMES, error)
      throw error
    }
  },

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
  },

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
          filterParams.ordering || API_ORDERING.RATING_DESC
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
  },

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
  },

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
        [API_QUERY_PARAMS.ORDERING]: API_ORDERING.RATING_DESC
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
  },

  async getGenres(): Promise<GenresResponse> {
    try {
      const response = await fetchWithHeaders(
        getRawgApiUrl(API_ENDPOINTS.GENRES)
      )

      if (!response.ok) {
        throw new Error(`${API_ERROR_MESSAGES.DEFAULT} ${response.status}`)
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error(API_ERROR_MESSAGES.GENRES, error)
      throw error
    }
  },

  async getPlatforms(): Promise<PlatformsResponse> {
    try {
      const response = await fetchWithHeaders(
        getRawgApiUrl(API_ENDPOINTS.PLATFORMS)
      )

      if (!response.ok) {
        throw new Error(`${API_ERROR_MESSAGES.DEFAULT} ${response.status}`)
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error(API_ERROR_MESSAGES.PLATFORMS, error)
      throw error
    }
  },

  async getStores(): Promise<StoresResponse> {
    try {
      const response = await fetchWithHeaders(
        getRawgApiUrl(API_ENDPOINTS.STORES)
      )

      if (!response.ok) {
        throw new Error(`${API_ERROR_MESSAGES.DEFAULT} ${response.status}`)
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error(API_ERROR_MESSAGES.STORES, error)
      throw error
    }
  },

  async getTags(): Promise<TagsResponse> {
    try {
      const response = await fetchWithHeaders(getRawgApiUrl(API_ENDPOINTS.TAGS))

      if (!response.ok) {
        throw new Error(`${API_ERROR_MESSAGES.DEFAULT} ${response.status}`)
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error(API_ERROR_MESSAGES.TAGS, error)
      throw error
    }
  }
}
