import { GameCollection } from '@/domain/aggregates/GameCollection'
import { Game } from '@/domain/entities/Game'

export interface IFavoritesRepository {
  addToFavorites(game: Game): Promise<void>
  removeFromFavorites(gameId: number): Promise<void>
  clearAllFavorites(): Promise<void>

  findAllFavorites(): Promise<GameCollection>
  findFavoriteById(gameId: number): Promise<Game | null>
  isFavorite(gameId: number): Promise<boolean>

  findFavoritesByGenres(genreIds: number[]): Promise<GameCollection>
  findFavoritesByPlatforms(platformIds: number[]): Promise<GameCollection>
  findFavoritesByStores(storeIds: number[]): Promise<GameCollection>
  findFavoritesByTags(tagIds: number[]): Promise<GameCollection>
  searchFavorites(searchTerm: string): Promise<GameCollection>

  findTopRatedFavorites(limit?: number): Promise<GameCollection>
  findRecentlyAddedFavorites(limit?: number): Promise<GameCollection>

  getFavoritesStatistics(): Promise<{
    totalFavorites: number
    averageRating: number
    genreDistribution: Record<string, number>
    platformDistribution: Record<string, number>
    ratingDistribution: Record<string, number>
  }>

  getAvailableGenres(): Promise<Array<{ value: string; label: string }>>
  getAvailablePlatforms(): Promise<Array<{ value: string; label: string }>>
  getAvailableStores(): Promise<Array<{ value: string; label: string }>>
  getAvailableTags(): Promise<Array<{ value: string; label: string }>>
}
