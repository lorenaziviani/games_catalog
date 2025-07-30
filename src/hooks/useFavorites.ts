import type { AppDispatch, RootState } from '@/store'
import {
  addToFavorites,
  clearFavorites,
  loadFavoritesFromStorage,
  removeFromFavorites,
  selectError,
  selectFavorites,
  selectFavoritesCount,
  selectIsFavorite,
  selectIsLoading,
  toggleFavorite
} from '@/store/favorites'
import type { Game } from '@/types/game'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useFavorites = () => {
  const dispatch = useDispatch<AppDispatch>()

  const favorites = useSelector(selectFavorites)
  const favoritesCount = useSelector(selectFavoritesCount)
  const isLoading = useSelector(selectIsLoading)
  const error = useSelector(selectError)

  useEffect(() => {
    dispatch(loadFavoritesFromStorage())
  }, [dispatch])

  const addFavorite = useCallback(
    (game: Game) => {
      dispatch(addToFavorites(game))
    },
    [dispatch]
  )

  const removeFavorite = useCallback(
    (gameId: number) => {
      dispatch(removeFromFavorites(gameId))
    },
    [dispatch]
  )

  const toggleFavoriteGame = useCallback(
    (game: Game) => {
      dispatch(toggleFavorite(game))
    },
    [dispatch]
  )

  const clearAllFavorites = useCallback(() => {
    dispatch(clearFavorites())
  }, [dispatch])

  const isFavorite = (gameId: number) => {
    return favorites.some(game => game.id === gameId)
  }

  return {
    favorites,
    favoritesCount,
    isLoading,
    error,
    addFavorite,
    removeFavorite,
    toggleFavoriteGame,
    clearAllFavorites,
    isFavorite
  }
}

export const useIsFavorite = (gameId: number) => {
  const dispatch = useDispatch<AppDispatch>()
  const isFavorite = useSelector((state: RootState) =>
    selectIsFavorite(state, gameId)
  )

  const toggleFavoriteAction = (game: Game) => {
    dispatch(toggleFavorite(game))
  }

  return {
    isFavorite,
    toggleFavorite: toggleFavoriteAction
  }
}

export const useFavoritesStats = () => {
  const favorites = useSelector(selectFavorites)
  const favoritesCount = useSelector(selectFavoritesCount)

  const stats = {
    total: favoritesCount,
    byGenre: favorites.reduce(
      (acc, game) => {
        game.genres.forEach(genre => {
          acc[genre.name] = (acc[genre.name] || 0) + 1
        })
        return acc
      },
      {} as Record<string, number>
    ),
    byPlatform: favorites.reduce(
      (acc, game) => {
        game.platforms.forEach(platform => {
          acc[platform.platform.name] = (acc[platform.platform.name] || 0) + 1
        })
        return acc
      },
      {} as Record<string, number>
    ),
    averageRating:
      favorites.length > 0
        ? favorites.reduce((sum, game) => sum + game.rating, 0) /
          favorites.length
        : 0
  }

  return stats
}
