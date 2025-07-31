import { serviceContainer } from '@/services/ServiceContainer'
import type { AppDispatch, RootState } from '@/store'
import {
  clearFavorites,
  loadFavoritesFromStorage,
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
  const favoritesService = serviceContainer.getFavoritesService()
  const dispatch = useDispatch<AppDispatch>()

  const favorites = useSelector(selectFavorites)
  const favoritesCount = useSelector(selectFavoritesCount)
  const isLoading = useSelector(selectIsLoading)
  const error = useSelector(selectError)

  useEffect(() => {
    dispatch(loadFavoritesFromStorage())
  }, [dispatch])

  const clearAllFavorites = useCallback(() => {
    dispatch(clearFavorites())
  }, [dispatch])

  const isFavorite = (gameId: number) => {
    return favorites.some(game => game.id === gameId)
  }

  const filterDataFromFavorites = (favorites: Game[]) => {
    return favoritesService.filterDataFromFavorites(favorites)
  }

  return {
    favorites,
    favoritesCount,
    isLoading,
    error,
    clearAllFavorites,
    isFavorite,
    filterDataFromFavorites
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
