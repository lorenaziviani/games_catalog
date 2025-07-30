import { DATE_RANGE_DEFAULTS, FILTER_STORAGE_KEY } from '@/types/common'
import type { ApiFilterParams, FilterState, FilterType } from '@/types/filter'
import { DEFAULT_FILTERS } from '@/types/filter'
import type { Game } from '@/types/game'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface UseFiltersReturn {
  filters: FilterState
  filteredGames: Game[]
  updateFilter: (type: FilterType, value: any) => void
  resetFilters: () => void
  clearFilters: () => void
  hasActiveFilters: boolean
  activeFiltersCount: number
  getApiParams: () => ApiFilterParams
}

export const useFilters = (games: Game[]): UseFiltersReturn => {
  const [filters, setFilters] = useState<FilterState>(() => {
    const savedFilters = localStorage.getItem(FILTER_STORAGE_KEY)
    return savedFilters
      ? { ...DEFAULT_FILTERS, ...JSON.parse(savedFilters) }
      : DEFAULT_FILTERS
  })

  useEffect(() => {
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filters))
  }, [filters])

  const applyFilters = useCallback(
    (gamesToFilter: Game[]): Game[] => {
      return gamesToFilter.filter(game => {
        if (
          filters.name &&
          !game.name.toLowerCase().includes(filters.name.toLowerCase())
        ) {
          return false
        }

        if (filters.genres.length > 0) {
          const gameGenres = game.genres.map(g => g.id.toString())
          const hasMatchingGenre = filters.genres.some(genre =>
            gameGenres.includes(genre)
          )
          if (!hasMatchingGenre) {
            return false
          }
        }

        if (filters.platforms.length > 0) {
          const gamePlatforms = game.platforms.map(p =>
            p.platform.id.toString()
          )
          const hasMatchingPlatform = filters.platforms.some(platform =>
            gamePlatforms.includes(platform)
          )
          if (!hasMatchingPlatform) {
            return false
          }
        }

        if (filters.stores.length > 0) {
          const gameStores = game.stores?.map(s => s.store.id.toString()) || []
          const hasMatchingStore = filters.stores.some(store =>
            gameStores.includes(store)
          )
          if (!hasMatchingStore) {
            return false
          }
        }

        if (filters.tags.length > 0) {
          const gameTags = game.tags?.map(t => t.id.toString()) || []
          const hasMatchingTag = filters.tags.some(tag =>
            gameTags.includes(tag)
          )
          if (!hasMatchingTag) {
            return false
          }
        }

        if (filters.dateRange.start || filters.dateRange.end) {
          const gameDate = new Date(game.released)
          const startDate = filters.dateRange.start
            ? new Date(filters.dateRange.start)
            : null
          const endDate = filters.dateRange.end
            ? new Date(filters.dateRange.end)
            : null

          if (startDate && gameDate < startDate) {
            return false
          }
          if (endDate && gameDate > endDate) {
            return false
          }
        }

        if (
          filters.metacriticRange.min !== 0 ||
          filters.metacriticRange.max !== 100
        ) {
          if (game.metacritic) {
            if (
              game.metacritic < filters.metacriticRange.min ||
              game.metacritic > filters.metacriticRange.max
            ) {
              return false
            }
          } else {
            return false
          }
        }

        return true
      })
    },
    [filters]
  )

  const filteredGames = useMemo(() => {
    return applyFilters(games)
  }, [games, applyFilters])

  const getApiParams = useCallback((): ApiFilterParams => {
    const params: ApiFilterParams = {}

    if (filters.name) {
      params.search = filters.name
    }

    if (filters.genres.length > 0) {
      params.genres = filters.genres.join(',')
    }

    if (filters.platforms.length > 0) {
      params.platforms = filters.platforms.join(',')
    }

    if (filters.stores.length > 0) {
      params.stores = filters.stores.join(',')
    }

    if (filters.tags.length > 0) {
      params.tags = filters.tags.join(',')
    }

    if (filters.dateRange.start || filters.dateRange.end) {
      const start = filters.dateRange.start || DATE_RANGE_DEFAULTS.START
      const end = filters.dateRange.end || DATE_RANGE_DEFAULTS.END
      params.dates = `${start},${end}`
    }

    if (
      filters.metacriticRange.min !== 0 ||
      filters.metacriticRange.max !== 100
    ) {
      params.metacritic = `${filters.metacriticRange.min},${filters.metacriticRange.max}`
    }

    if (filters.ordering) {
      params.ordering = filters.ordering
    }

    return params
  }, [filters])

  const updateFilter = useCallback((type: FilterType, value: any) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
  }, [])

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
  }, [])

  const hasActiveFilters = useMemo(() => {
    return (
      filters.name !== '' ||
      filters.genres.length > 0 ||
      filters.platforms.length > 0 ||
      filters.stores.length > 0 ||
      filters.tags.length > 0 ||
      filters.dateRange.start !== '' ||
      filters.dateRange.end !== '' ||
      filters.metacriticRange.min !== 0 ||
      filters.metacriticRange.max !== 100
    )
  }, [filters])

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.name) count++
    if (filters.genres.length > 0) count++
    if (filters.platforms.length > 0) count++
    if (filters.stores.length > 0) count++
    if (filters.tags.length > 0) count++
    if (filters.dateRange.start || filters.dateRange.end) count++
    if (
      filters.metacriticRange.min !== 0 ||
      filters.metacriticRange.max !== 100
    )
      count++
    return count
  }, [filters])

  return {
    filters,
    filteredGames,
    updateFilter,
    resetFilters,
    clearFilters,
    hasActiveFilters,
    activeFiltersCount,
    getApiParams
  }
}
