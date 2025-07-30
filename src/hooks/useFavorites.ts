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
import { FILTER_FIELDS } from '@/types/common'
import type { Game } from '@/types/game'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { GameItem } from '../types/filter'

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

  const filterDataFromFavorites = (favorites: Game[]) => {
    const genres = extractUniqueItems(favorites, FILTER_FIELDS.GENRES)
    const platforms = extractUniqueItems(favorites, FILTER_FIELDS.PLATFORMS)
    const stores = extractUniqueItems(favorites, FILTER_FIELDS.STORES)
    const tags = extractUniqueItems(favorites, FILTER_FIELDS.TAGS)

    return {
      genres,
      platforms,
      stores,
      tags
    }
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

type ExtractableField = keyof typeof FIELD_CONFIGS

const FIELD_CONFIGS = {
  genres: (g: Game) =>
    g.genres
      ?.map(item => ({ value: item.id.toString(), label: item.name }))
      .sort((a, b) => a.label.localeCompare(b.label)) || [],
  tags: (g: Game) =>
    g.tags
      ?.map(item => ({ value: item.id.toString(), label: item.name }))
      .sort((a, b) => a.label.localeCompare(b.label)) || [],
  platforms: (g: Game) =>
    g.platforms
      ?.map(p => ({
        value: p.platform.id.toString(),
        label: p.platform.name
      }))
      .sort((a, b) => a.label.localeCompare(b.label)) || [],
  stores: (g: Game) =>
    g.stores
      ?.map(s => ({
        value: s.store.id.toString(),
        label: s.store.name
      }))
      .sort((a, b) => a.label.localeCompare(b.label)) || []
} satisfies Record<string, (game: Game) => GameItem[]>

const extractUniqueItems = (
  favorites: Game[],
  field: ExtractableField
): GameItem[] => {
  const items = favorites.flatMap(FIELD_CONFIGS[field])
  const uniqueMap = new Map<string, GameItem>()
  for (const item of items) {
    if (item && item.value && item.label) {
      uniqueMap.set(item.value, item)
    }
  }
  return Array.from(uniqueMap.values())
}
