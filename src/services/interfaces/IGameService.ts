import type { GameDetails, GamesResponse } from '@/types/game'

export interface FilterParams {
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

export interface IGameService {
  getPopularGames(page?: number, pageSize?: number): Promise<GamesResponse>
  searchGames(
    query: string,
    page?: number,
    pageSize?: number
  ): Promise<GamesResponse>
  getGamesWithFilters(
    filterParams: FilterParams,
    pageSize?: number
  ): Promise<GamesResponse>
  getGameById(id: number): Promise<GameDetails>
  getGamesByGenre(
    genre: string,
    page?: number,
    pageSize?: number
  ): Promise<GamesResponse>
}
