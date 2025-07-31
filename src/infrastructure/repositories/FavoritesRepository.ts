import { GameCollection } from '@/domain/aggregates/GameCollection'
import { Game } from '@/domain/entities/Game'
import type { IFavoritesRepository } from '@/domain/repositories/IFavoritesRepository'
import { favoritesStorage } from '@/store/favorites/utils'

export class FavoritesRepository implements IFavoritesRepository {
  async addToFavorites(game: Game): Promise<void> {
    try {
      const currentFavorites = await this.getAllFavoritesAsGames()
      const existingIndex = currentFavorites.findIndex(
        fav => fav.id === game.id
      )

      if (existingIndex === -1) {
        currentFavorites.push(game)
        await favoritesStorage.save(currentFavorites.map(g => g.toDTO()))
      }
    } catch (error) {
      console.error('Erro ao adicionar aos favoritos:', error)
      throw new Error('Falha ao adicionar aos favoritos')
    }
  }

  async removeFromFavorites(gameId: number): Promise<void> {
    try {
      const currentFavorites = await this.getAllFavoritesAsGames()
      const filteredFavorites = currentFavorites.filter(
        game => game.id !== gameId
      )
      await favoritesStorage.save(filteredFavorites.map(g => g.toDTO()))
    } catch (error) {
      console.error('Erro ao remover dos favoritos:', error)
      throw new Error('Falha ao remover dos favoritos')
    }
  }

  async clearAllFavorites(): Promise<void> {
    try {
      await favoritesStorage.clear()
    } catch (error) {
      console.error('Erro ao limpar favoritos:', error)
      throw new Error('Falha ao limpar favoritos')
    }
  }

  async findAllFavorites(): Promise<GameCollection> {
    try {
      const games = await this.getAllFavoritesAsGames()
      return new GameCollection(games, games.length)
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error)
      throw new Error('Falha ao buscar favoritos')
    }
  }

  async findFavoriteById(gameId: number): Promise<Game | null> {
    try {
      const games = await this.getAllFavoritesAsGames()
      return games.find(game => game.id === gameId) || null
    } catch (error) {
      console.error('Erro ao buscar favorito por ID:', error)
      return null
    }
  }

  async isFavorite(gameId: number): Promise<boolean> {
    try {
      const favorite = await this.findFavoriteById(gameId)
      return favorite !== null
    } catch (error) {
      console.error('Erro ao verificar se é favorito:', error)
      return false
    }
  }

  async findFavoritesByGenres(genreIds: number[]): Promise<GameCollection> {
    try {
      const games = await this.getAllFavoritesAsGames()
      const filteredGames = games.filter(game =>
        game.matchesGenreFilter(genreIds)
      )
      return new GameCollection(filteredGames, filteredGames.length)
    } catch (error) {
      console.error('Erro ao buscar favoritos por gêneros:', error)
      throw new Error('Falha ao buscar favoritos por gêneros')
    }
  }

  async findFavoritesByPlatforms(
    platformIds: number[]
  ): Promise<GameCollection> {
    try {
      const games = await this.getAllFavoritesAsGames()
      const filteredGames = games.filter(game =>
        game.matchesPlatformFilter(platformIds)
      )
      return new GameCollection(filteredGames, filteredGames.length)
    } catch (error) {
      console.error('Erro ao buscar favoritos por plataformas:', error)
      throw new Error('Falha ao buscar favoritos por plataformas')
    }
  }

  async findFavoritesByStores(storeIds: number[]): Promise<GameCollection> {
    try {
      const games = await this.getAllFavoritesAsGames()
      const filteredGames = games.filter(game =>
        game.matchesStoreFilter(storeIds)
      )
      return new GameCollection(filteredGames, filteredGames.length)
    } catch (error) {
      console.error('Erro ao buscar favoritos por lojas:', error)
      throw new Error('Falha ao buscar favoritos por lojas')
    }
  }

  async findFavoritesByTags(tagIds: number[]): Promise<GameCollection> {
    try {
      const games = await this.getAllFavoritesAsGames()
      const filteredGames = games.filter(game => game.matchesTagFilter(tagIds))
      return new GameCollection(filteredGames, filteredGames.length)
    } catch (error) {
      console.error('Erro ao buscar favoritos por tags:', error)
      throw new Error('Falha ao buscar favoritos por tags')
    }
  }

  async searchFavorites(searchTerm: string): Promise<GameCollection> {
    try {
      const games = await this.getAllFavoritesAsGames()
      const filteredGames = games.filter(game =>
        game.matchesSearchTerm(searchTerm)
      )
      return new GameCollection(filteredGames, filteredGames.length)
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error)
      throw new Error('Falha ao buscar favoritos')
    }
  }

  async findTopRatedFavorites(limit: number = 10): Promise<GameCollection> {
    try {
      const games = await this.getAllFavoritesAsGames()
      const sortedGames = games.sort((a, b) => b.rating - a.rating)
      const topGames = sortedGames.slice(0, limit)
      return new GameCollection(topGames, topGames.length)
    } catch (error) {
      console.error('Erro ao buscar favoritos mais bem avaliados:', error)
      throw new Error('Falha ao buscar favoritos mais bem avaliados')
    }
  }

  async findRecentlyAddedFavorites(
    limit: number = 10
  ): Promise<GameCollection> {
    try {
      const games = await this.getAllFavoritesAsGames()
      const sortedGames = games.sort(
        (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()
      )
      const recentGames = sortedGames.slice(0, limit)
      return new GameCollection(recentGames, recentGames.length)
    } catch (error) {
      console.error('Erro ao buscar favoritos recentes:', error)
      throw new Error('Falha ao buscar favoritos recentes')
    }
  }

  async getFavoritesStatistics(): Promise<{
    totalFavorites: number
    averageRating: number
    genreDistribution: Record<string, number>
    platformDistribution: Record<string, number>
    ratingDistribution: Record<string, number>
  }> {
    try {
      const games = await this.getAllFavoritesAsGames()
      const collection = new GameCollection(games, games.length)

      return {
        totalFavorites: games.length,
        averageRating: collection.getAverageRating(),
        genreDistribution: collection.getGenreDistribution(),
        platformDistribution: collection.getPlatformDistribution(),
        ratingDistribution: collection.getRatingDistribution()
      }
    } catch (error) {
      console.error('Erro ao obter estatísticas dos favoritos:', error)
      throw new Error('Falha ao obter estatísticas dos favoritos')
    }
  }

  async getAvailableGenres(): Promise<Array<{ value: string; label: string }>> {
    try {
      const games = await this.getAllFavoritesAsGames()
      const uniqueGenres = new Set<string>()

      games.forEach(game => {
        game.getGenreNames().forEach(genre => uniqueGenres.add(genre))
      })

      return Array.from(uniqueGenres).map(genre => ({
        value: genre.toLowerCase().replace(/\s+/g, '-'),
        label: genre
      }))
    } catch (error) {
      console.error('Erro ao obter gêneros disponíveis:', error)
      return []
    }
  }

  async getAvailablePlatforms(): Promise<
    Array<{ value: string; label: string }>
  > {
    try {
      const games = await this.getAllFavoritesAsGames()
      const uniquePlatforms = new Set<string>()

      games.forEach(game => {
        game
          .getPlatformNames()
          .forEach(platform => uniquePlatforms.add(platform))
      })

      return Array.from(uniquePlatforms).map(platform => ({
        value: platform.toLowerCase().replace(/\s+/g, '-'),
        label: platform
      }))
    } catch (error) {
      console.error('Erro ao obter plataformas disponíveis:', error)
      return []
    }
  }

  async getAvailableStores(): Promise<Array<{ value: string; label: string }>> {
    try {
      const games = await this.getAllFavoritesAsGames()
      const uniqueStores = new Set<string>()

      games.forEach(game => {
        game.getStoreNames().forEach(store => uniqueStores.add(store))
      })

      return Array.from(uniqueStores).map(store => ({
        value: store.toLowerCase().replace(/\s+/g, '-'),
        label: store
      }))
    } catch (error) {
      console.error('Erro ao obter lojas disponíveis:', error)
      return []
    }
  }

  async getAvailableTags(): Promise<Array<{ value: string; label: string }>> {
    try {
      const games = await this.getAllFavoritesAsGames()
      const uniqueTags = new Set<string>()

      games.forEach(game => {
        game.getTagNames().forEach(tag => uniqueTags.add(tag))
      })

      return Array.from(uniqueTags).map(tag => ({
        value: tag.toLowerCase().replace(/\s+/g, '-'),
        label: tag
      }))
    } catch (error) {
      console.error('Erro ao obter tags disponíveis:', error)
      return []
    }
  }

  private async getAllFavoritesAsGames(): Promise<Game[]> {
    try {
      const favoritesData = await favoritesStorage.load()
      return favoritesData.map(gameData => new Game(gameData))
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error)
      return []
    }
  }
}
