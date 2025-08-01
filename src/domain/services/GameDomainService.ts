import { GameCollection } from '@/domain/aggregates/GameCollection'
import { Game } from '@/domain/entities/Game'
import type { IFavoritesRepository } from '@/domain/repositories/IFavoritesRepository'
import type { IGameRepository } from '@/domain/repositories/IGameRepository'

export class GameDomainService {
  constructor(
    private readonly gameRepository: IGameRepository,
    private readonly favoritesRepository: IFavoritesRepository
  ) {}

  async searchGamesWithFavorites(
    query: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<{
    games: GameCollection
    favorites: GameCollection
    isFavorite: (gameId: number) => boolean
  }> {
    const [games, favorites] = await Promise.all([
      this.gameRepository.searchGames(query, page, pageSize),
      this.favoritesRepository.searchFavorites(query)
    ])

    const favoriteIds = new Set(favorites.games.map(game => game.id))
    const isFavorite = (gameId: number) => favoriteIds.has(gameId)

    return { games, favorites, isFavorite }
  }

  async getPopularGamesWithFavorites(
    page: number = 1,
    pageSize: number = 20
  ): Promise<{
    games: GameCollection
    favorites: GameCollection
    isFavorite: (gameId: number) => boolean
  }> {
    const [games, favorites] = await Promise.all([
      this.gameRepository.findPopularGames(page, pageSize),
      this.favoritesRepository.findAllFavorites()
    ])

    const favoriteIds = new Set(favorites.games.map(game => game.id))
    const isFavorite = (gameId: number) => favoriteIds.has(gameId)

    return { games, favorites, isFavorite }
  }

  async getRecommendedGames(
    userFavorites: GameCollection,
    limit: number = 10
  ): Promise<GameCollection> {
    const userGenres = userFavorites.getUniqueGenres()
    const userPlatforms = userFavorites.getUniquePlatforms()

    const similarGames = await this.gameRepository.findTopRatedGames(limit * 2)

    const favoriteIds = new Set(userFavorites.games.map(game => game.id))
    const recommendedGames = similarGames.games.filter(
      game => !favoriteIds.has(game.id)
    )

    const scoredGames = recommendedGames.map(game => ({
      game,
      score: this.calculateRecommendationScore(game, userGenres, userPlatforms)
    }))

    const sortedGames = scoredGames
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.game)

    return new GameCollection(sortedGames, sortedGames.length)
  }

  private calculateRecommendationScore(
    game: Game,
    userGenres: string[],
    userPlatforms: string[]
  ): number {
    let score = 0

    score += game.rating * 2

    const gameGenres = game.getGenreNames()
    const matchingGenres = gameGenres.filter(genre =>
      userGenres.includes(genre)
    )
    score += matchingGenres.length * 3

    const gamePlatforms = game.getPlatformNames()
    const matchingPlatforms = gamePlatforms.filter(platform =>
      userPlatforms.includes(platform)
    )
    score += matchingPlatforms.length * 2

    if (game.hasMetacriticScore()) {
      score += (game.metacritic ?? 0) / 20
    }

    return score
  }

  async getUserGamingProfile(favorites: GameCollection): Promise<{
    preferredGenres: string[]
    preferredPlatforms: string[]
    averageRating: number
    totalPlaytime: number
    gamingStyle: string
    recommendations: string[]
  }> {
    const genreDistribution = favorites.getGenreDistribution()
    const platformDistribution = favorites.getPlatformDistribution()

    const preferredGenres = Object.entries(genreDistribution)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([genre]) => genre)

    const preferredPlatforms = Object.entries(platformDistribution)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([platform]) => platform)

    const averageRating = favorites.getAverageRating()
    const totalPlaytime = favorites.games.reduce(
      (sum, game) => sum + game.playtime,
      0
    )

    const gamingStyle = this.determineGamingStyle(favorites)
    const recommendations = this.generateRecommendations(
      favorites,
      preferredGenres
    )

    return {
      preferredGenres,
      preferredPlatforms,
      averageRating,
      totalPlaytime,
      gamingStyle,
      recommendations
    }
  }

  private determineGamingStyle(favorites: GameCollection): string {
    const highlyRatedCount = favorites.getHighlyRatedGames().length
    const totalCount = favorites.count
    const highlyRatedPercentage = (highlyRatedCount / totalCount) * 100

    if (highlyRatedPercentage >= 80) return 'Crítico'
    if (highlyRatedPercentage >= 60) return 'Seletivo'
    if (highlyRatedPercentage >= 40) return 'Equilibrado'
    return 'Explorador'
  }

  private generateRecommendations(
    favorites: GameCollection,
    preferredGenres: string[]
  ): string[] {
    const recommendations: string[] = []

    if (favorites.count < 5) {
      recommendations.push(
        'Adicione mais jogos para receber recomendações personalizadas'
      )
    }

    if (favorites.getAverageRating() < 3.5) {
      recommendations.push('Experimente jogos com avaliações mais altas')
    }

    if (preferredGenres.length < 3) {
      recommendations.push(
        'Explore diferentes gêneros para diversificar sua biblioteca'
      )
    }

    const recentGames = favorites.getRecentlyReleasedGames(5)
    if (recentGames.length === 0) {
      recommendations.push(
        'Considere jogos mais recentes para estar atualizado'
      )
    }

    return recommendations
  }

  async compareGames(gameIds: number[]): Promise<{
    games: Game[]
    comparison: {
      averageRating: number
      totalPlaytime: number
      genreOverlap: string[]
      platformOverlap: string[]
      bestRated: Game
      mostPlayed: Game
    }
  }> {
    if (gameIds.length < 2) {
      throw new Error('É necessário pelo menos 2 jogos para comparação')
    }

    const games = await Promise.all(
      gameIds.map(id => this.gameRepository.findGameById(id))
    )

    const validGames = games.filter(game => game !== null) as Game[]

    if (validGames.length < 2) {
      throw new Error(
        'Não foi possível encontrar jogos suficientes para comparação'
      )
    }

    const averageRating =
      validGames.reduce((sum, game) => sum + game.rating, 0) / validGames.length
    const totalPlaytime = validGames.reduce(
      (sum, game) => sum + game.playtime,
      0
    )

    const allGenres = validGames.flatMap(game => game.getGenreNames())
    const genreCounts = allGenres.reduce(
      (acc, genre) => {
        acc[genre] = (acc[genre] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )
    const genreOverlap = Object.entries(genreCounts)
      .filter(([, count]) => count > 1)
      .map(([genre]) => genre)

    const allPlatforms = validGames.flatMap(game => game.getPlatformNames())
    const platformCounts = allPlatforms.reduce(
      (acc, platform) => {
        acc[platform] = (acc[platform] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )
    const platformOverlap = Object.entries(platformCounts)
      .filter(([, count]) => count > 1)
      .map(([platform]) => platform)

    const bestRated = validGames.reduce((best, current) =>
      current.rating > best.rating ? current : best
    )

    const mostPlayed = validGames.reduce((most, current) =>
      current.playtime > most.playtime ? current : most
    )

    return {
      games: validGames,
      comparison: {
        averageRating,
        totalPlaytime,
        genreOverlap,
        platformOverlap,
        bestRated,
        mostPlayed
      }
    }
  }

  async getGamingInsights(): Promise<{
    globalStats: {
      totalGames: number
      averageRating: number
      topGenres: string[]
      topPlatforms: string[]
    }
    userStats: {
      totalFavorites: number
      averageRating: number
      preferredGenres: string[]
      gamingStyle: string
    }
  }> {
    const [globalStats, favorites] = await Promise.all([
      this.gameRepository.getGameStatistics(),
      this.favoritesRepository.findAllFavorites()
    ])

    const userProfile = await this.getUserGamingProfile(favorites)

    return {
      globalStats: {
        totalGames: globalStats.totalGames,
        averageRating: globalStats.averageRating,
        topGenres: Object.entries(globalStats.genreDistribution)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([genre]) => genre),
        topPlatforms: Object.entries(globalStats.platformDistribution)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([platform]) => platform)
      },
      userStats: {
        totalFavorites: favorites.count,
        averageRating: userProfile.averageRating,
        preferredGenres: userProfile.preferredGenres,
        gamingStyle: userProfile.gamingStyle
      }
    }
  }
}
