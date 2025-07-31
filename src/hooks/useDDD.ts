import { GameCollection } from '@/domain/aggregates/GameCollection'
import type { Game } from '@/domain/entities/Game'
import { dddContainer } from '@/infrastructure/container/DDDContainer'
import { useCallback, useState } from 'react'

export const useDDDGames = () => {
  const [games, setGames] = useState<GameCollection | null>(null)
  const [favorites, setFavorites] = useState<GameCollection | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const favoritesRepository = dddContainer.getFavoritesRepository()
  const gameDomainService = dddContainer.getGameDomainService()

  const loadPopularGames = useCallback(
    async (page: number = 1, pageSize: number = 20) => {
      setLoading(true)
      setError(null)

      try {
        const result = await gameDomainService.getPopularGamesWithFavorites(
          page,
          pageSize
        )
        setGames(result.games)
        setFavorites(result.favorites)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar jogos')
      } finally {
        setLoading(false)
      }
    },
    [gameDomainService]
  )

  const searchGames = useCallback(
    async (query: string, page: number = 1, pageSize: number = 20) => {
      setLoading(true)
      setError(null)

      try {
        const result = await gameDomainService.searchGamesWithFavorites(
          query,
          page,
          pageSize
        )
        setGames(result.games)
        setFavorites(result.favorites)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao buscar jogos')
      } finally {
        setLoading(false)
      }
    },
    [gameDomainService]
  )

  const addToFavorites = useCallback(
    async (game: Game) => {
      try {
        await favoritesRepository.addToFavorites(game)
        const updatedFavorites = await favoritesRepository.findAllFavorites()
        setFavorites(updatedFavorites)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro ao adicionar aos favoritos'
        )
      }
    },
    [favoritesRepository]
  )

  const removeFromFavorites = useCallback(
    async (gameId: number) => {
      try {
        await favoritesRepository.removeFromFavorites(gameId)
        const updatedFavorites = await favoritesRepository.findAllFavorites()
        setFavorites(updatedFavorites)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro ao remover dos favoritos'
        )
      }
    },
    [favoritesRepository]
  )

  const clearAllFavorites = useCallback(async () => {
    try {
      await favoritesRepository.clearAllFavorites()
      setFavorites(new GameCollection([], 0))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao limpar favoritos')
    }
  }, [favoritesRepository])

  const isFavorite = useCallback(
    (gameId: number): boolean => {
      if (!favorites) return false
      return favorites.games.some(game => game.id === gameId)
    },
    [favorites]
  )

  return {
    games,
    favorites,
    loading,
    error,
    loadPopularGames,
    searchGames,
    addToFavorites,
    removeFromFavorites,
    clearAllFavorites,
    isFavorite
  }
}

export const useDDDFavorites = () => {
  const [favorites, setFavorites] = useState<GameCollection | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const favoritesRepository = dddContainer.getFavoritesRepository()
  const gameDomainService = dddContainer.getGameDomainService()

  const loadFavorites = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await favoritesRepository.findAllFavorites()
      setFavorites(result)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao carregar favoritos'
      )
    } finally {
      setLoading(false)
    }
  }, [favoritesRepository])

  const searchFavorites = useCallback(
    async (searchTerm: string) => {
      setLoading(true)
      setError(null)

      try {
        const result = await favoritesRepository.searchFavorites(searchTerm)
        setFavorites(result)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro ao buscar favoritos'
        )
      } finally {
        setLoading(false)
      }
    },
    [favoritesRepository]
  )

  const filterFavoritesByGenres = useCallback(
    async (genreIds: number[]) => {
      setLoading(true)
      setError(null)

      try {
        const result = await favoritesRepository.findFavoritesByGenres(genreIds)
        setFavorites(result)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro ao filtrar favoritos'
        )
      } finally {
        setLoading(false)
      }
    },
    [favoritesRepository]
  )

  const getFavoritesStatistics = useCallback(async () => {
    try {
      return await favoritesRepository.getFavoritesStatistics()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao obter estatísticas'
      )
      return null
    }
  }, [favoritesRepository])

  const getUserGamingProfile = useCallback(async () => {
    if (!favorites) return null

    try {
      return await gameDomainService.getUserGamingProfile(favorites)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao obter perfil de jogador'
      )
      return null
    }
  }, [gameDomainService, favorites])

  const getRecommendedGames = useCallback(
    async (limit: number = 10) => {
      if (!favorites) return null

      try {
        return await gameDomainService.getRecommendedGames(favorites, limit)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro ao obter recomendações'
        )
        return null
      }
    },
    [gameDomainService, favorites]
  )

  return {
    favorites,
    loading,
    error,
    loadFavorites,
    searchFavorites,
    filterFavoritesByGenres,
    getFavoritesStatistics,
    getUserGamingProfile,
    getRecommendedGames
  }
}

export const useDDDInsights = () => {
  const [insights, setInsights] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const gameDomainService = dddContainer.getGameDomainService()

  const loadInsights = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await gameDomainService.getGamingInsights()
      setInsights(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar insights')
    } finally {
      setLoading(false)
    }
  }, [gameDomainService])

  return {
    insights,
    loading,
    error,
    loadInsights
  }
}
