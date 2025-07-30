import type { RootState } from '@/store'
import { createSelector } from '@reduxjs/toolkit'
import type { FavoritesState } from './types'

const selectFavoritesState = (state: RootState): FavoritesState =>
  state.favorites

export const selectFavorites = createSelector(
  [selectFavoritesState],
  favoritesState => favoritesState.items
)

export const selectFavoritesCount = createSelector(
  [selectFavorites],
  favorites => favorites.length
)

export const selectIsLoading = createSelector(
  [selectFavoritesState],
  favoritesState => favoritesState.isLoading
)

export const selectError = createSelector(
  [selectFavoritesState],
  favoritesState => favoritesState.error
)

export const selectIsFavorite = createSelector(
  [selectFavorites, (_state: RootState, gameId: number) => gameId],
  (favorites, gameId) => favorites.some(item => item.id === gameId)
)
