import { GameCollection } from '@/domain/aggregates/GameCollection'
import { Game } from '@/domain/entities/Game'
import type {
  GameSearchCriteria,
  IGameRepository
} from '@/domain/repositories/IGameRepository'
import { serviceContainer } from '@/services/ServiceContainer'

export class GameRepository implements IGameRepository {
  private readonly gameService = serviceContainer.getGameService()

  async findPopularGames(
    page: number = 1,
    pageSize: number = 20
  ): Promise<GameCollection> {
    try {
      const response = await this.gameService.getPopularGames(page, pageSize)
      const games = response.results.map(gameData => new Game(gameData))

      return new GameCollection(
        games,
        response.count,
        response.next,
        response.previous
      )
    } catch (error) {
      console.error('Erro ao buscar jogos populares:', error)
      throw new Error('Falha ao buscar jogos populares')
    }
  }

  async searchGames(
    query: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<GameCollection> {
    try {
      const response = await this.gameService.searchGames(query, page, pageSize)
      const games = response.results.map(gameData => new Game(gameData))

      return new GameCollection(
        games,
        response.count,
        response.next,
        response.previous
      )
    } catch (error) {
      console.error('Erro ao buscar jogos:', error)
      throw new Error('Falha ao buscar jogos')
    }
  }

  async findGamesByCriteria(
    criteria: GameSearchCriteria
  ): Promise<GameCollection> {
    try {
      const filterParams = this.buildFilterParams(criteria)
      const response = await this.gameService.getGamesWithFilters(
        filterParams,
        criteria.pageSize
      )
      const games = response.results.map(gameData => new Game(gameData))

      return new GameCollection(
        games,
        response.count,
        response.next,
        response.previous
      )
    } catch (error) {
      console.error('Erro ao buscar jogos por critérios:', error)
      throw new Error('Falha ao buscar jogos por critérios')
    }
  }

  async findGameById(id: number): Promise<Game | null> {
    try {
      const gameDetails = await this.gameService.getGameById(id)
      return new Game(gameDetails)
    } catch (error) {
      console.error('Erro ao buscar jogo por ID:', error)
      return null
    }
  }

  async findGamesByGenre(
    genre: string,
    page: number = 1,
    pageSize: number = 20
  ): Promise<GameCollection> {
    try {
      const response = await this.gameService.getGamesByGenre(
        genre,
        page,
        pageSize
      )
      const games = response.results.map(gameData => new Game(gameData))

      return new GameCollection(
        games,
        response.count,
        response.next,
        response.previous
      )
    } catch (error) {
      console.error('Erro ao buscar jogos por gênero:', error)
      throw new Error('Falha ao buscar jogos por gênero')
    }
  }

  async findGamesByGenres(
    genreIds: number[],
    page: number = 1,
    pageSize: number = 20
  ): Promise<GameCollection> {
    const criteria: GameSearchCriteria = {
      page,
      pageSize,
      genres: genreIds
    }
    return this.findGamesByCriteria(criteria)
  }

  async findGamesByPlatforms(
    platformIds: number[],
    page: number = 1,
    pageSize: number = 20
  ): Promise<GameCollection> {
    const criteria: GameSearchCriteria = {
      page,
      pageSize,
      platforms: platformIds
    }
    return this.findGamesByCriteria(criteria)
  }

  async findGamesByStores(
    storeIds: number[],
    page: number = 1,
    pageSize: number = 20
  ): Promise<GameCollection> {
    const criteria: GameSearchCriteria = {
      page,
      pageSize,
      stores: storeIds
    }
    return this.findGamesByCriteria(criteria)
  }

  async findGamesByTags(
    tagIds: number[],
    page: number = 1,
    pageSize: number = 20
  ): Promise<GameCollection> {
    const criteria: GameSearchCriteria = {
      page,
      pageSize,
      tags: tagIds
    }
    return this.findGamesByCriteria(criteria)
  }

  async findTopRatedGames(limit: number = 10): Promise<GameCollection> {
    const criteria: GameSearchCriteria = {
      pageSize: limit,
      ordering: '-rating'
    }
    return this.findGamesByCriteria(criteria)
  }

  async findRecentlyReleasedGames(limit: number = 10): Promise<GameCollection> {
    const criteria: GameSearchCriteria = {
      pageSize: limit,
      ordering: '-released'
    }
    return this.findGamesByCriteria(criteria)
  }

  async findGamesWithHighMetacriticScore(
    threshold: number = 80
  ): Promise<GameCollection> {
    const criteria: GameSearchCriteria = {
      metacriticRange: {
        min: threshold,
        max: 100
      }
    }
    return this.findGamesByCriteria(criteria)
  }

  async getGameStatistics(): Promise<{
    totalGames: number
    averageRating: number
    genreDistribution: Record<string, number>
    platformDistribution: Record<string, number>
    ratingDistribution: Record<string, number>
  }> {
    try {
      const popularGames = await this.findPopularGames(1, 100)

      return {
        totalGames: popularGames.totalCount,
        averageRating: popularGames.getAverageRating(),
        genreDistribution: popularGames.getGenreDistribution(),
        platformDistribution: popularGames.getPlatformDistribution(),
        ratingDistribution: popularGames.getRatingDistribution()
      }
    } catch (error) {
      console.error('Erro ao obter estatísticas dos jogos:', error)
      throw new Error('Falha ao obter estatísticas dos jogos')
    }
  }

  private buildFilterParams(criteria: GameSearchCriteria) {
    const params: any = {}

    if (criteria.page) params.page = criteria.page.toString()
    if (criteria.search) params.search = criteria.search
    if (criteria.genres?.length) params.genres = criteria.genres.join(',')
    if (criteria.platforms?.length)
      params.platforms = criteria.platforms.join(',')
    if (criteria.stores?.length) params.stores = criteria.stores.join(',')
    if (criteria.tags?.length) params.tags = criteria.tags.join(',')
    if (criteria.ordering) params.ordering = criteria.ordering

    if (criteria.dateRange?.start || criteria.dateRange?.end) {
      const dates = []
      if (criteria.dateRange.start) dates.push(criteria.dateRange.start)
      if (criteria.dateRange.end) dates.push(criteria.dateRange.end)
      params.dates = dates.join(',')
    }

    if (criteria.metacriticRange) {
      params.metacritic = `${criteria.metacriticRange.min},${criteria.metacriticRange.max}`
    }

    return params
  }
}
