import { GameCollection } from '../aggregates/GameCollection'
import { Game } from '../entities/Game'

export interface GameSearchCriteria {
  page?: number
  pageSize?: number
  search?: string
  genres?: number[]
  platforms?: number[]
  stores?: number[]
  tags?: number[]
  dateRange?: {
    start: string
    end: string
  }
  metacriticRange?: {
    min: number
    max: number
  }
  ordering?: string
}

export interface IGameRepository {
  findPopularGames(page?: number, pageSize?: number): Promise<GameCollection>
  searchGames(
    query: string,
    page?: number,
    pageSize?: number
  ): Promise<GameCollection>
  findGamesByCriteria(criteria: GameSearchCriteria): Promise<GameCollection>
  findGameById(id: number): Promise<Game | null>
  findGamesByGenre(
    genre: string,
    page?: number,
    pageSize?: number
  ): Promise<GameCollection>

  findGamesByGenres(
    genreIds: number[],
    page?: number,
    pageSize?: number
  ): Promise<GameCollection>
  findGamesByPlatforms(
    platformIds: number[],
    page?: number,
    pageSize?: number
  ): Promise<GameCollection>
  findGamesByStores(
    storeIds: number[],
    page?: number,
    pageSize?: number
  ): Promise<GameCollection>
  findGamesByTags(
    tagIds: number[],
    page?: number,
    pageSize?: number
  ): Promise<GameCollection>

  findTopRatedGames(limit?: number): Promise<GameCollection>
  findRecentlyReleasedGames(limit?: number): Promise<GameCollection>
  findGamesWithHighMetacriticScore(threshold?: number): Promise<GameCollection>

  getGameStatistics(): Promise<{
    totalGames: number
    averageRating: number
    genreDistribution: Record<string, number>
    platformDistribution: Record<string, number>
    ratingDistribution: Record<string, number>
  }>
}
