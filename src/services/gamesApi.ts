import { getRawgApiUrl } from '../config/api'
import { env } from '../config/env'
import type { GameDetails, GamesResponse, GenresResponse } from '../types/game'
import { fetchWithHeaders } from '../utils/api'

export const gamesApi = {
  async getPopularGames(
    page = 1,
    pageSize = env.DEFAULT_PAGE_SIZE
  ): Promise<GamesResponse> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        page_size: Math.min(pageSize, env.MAX_PAGE_SIZE).toString(),
        ordering: '-rating'
      })

      const response = await fetchWithHeaders(getRawgApiUrl(`/games?${params}`))

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`)
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error('Erro na RAWG API:', error)
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
        search: query,
        page: page.toString(),
        page_size: Math.min(pageSize, env.MAX_PAGE_SIZE).toString()
      })

      const response = await fetchWithHeaders(getRawgApiUrl(`/games?${params}`))

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`)
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error('Erro na busca RAWG API:', error)
      throw error
    }
  },

  async getGameById(id: number): Promise<GameDetails> {
    try {
      const response = await fetchWithHeaders(getRawgApiUrl(`/games/${id}`))

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`)
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error('Erro ao buscar jogo por ID:', error)
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
        genres: genre,
        page: page.toString(),
        page_size: Math.min(pageSize, env.MAX_PAGE_SIZE).toString(),
        ordering: '-rating'
      })

      const response = await fetchWithHeaders(getRawgApiUrl(`/games?${params}`))

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`)
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error('Erro ao buscar por gênero:', error)
      throw error
    }
  },

  async getGenres(): Promise<GenresResponse> {
    try {
      const response = await fetchWithHeaders(getRawgApiUrl('/genres'))

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`)
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error)
      throw error
    }
  }
}
