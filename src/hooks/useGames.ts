import { env, getCacheConfig, getRetryConfig } from '@/config/env'
import { DATE_RANGE_DEFAULTS } from '@/types/common'
import type { FilterState } from '@/types/filter'
import { DEFAULT_FILTERS } from '@/types/filter'
import { scrollToTop } from '@/utils/scrollUtils'
import { gamesApi } from '@services/gamesApi'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { useGameData } from './useGameData'

export const useGames = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

  const { gameData } = useGameData()

  const hasActiveFilters =
    filters.name !== '' ||
    filters.genres.length > 0 ||
    filters.platforms.length > 0 ||
    filters.stores.length > 0 ||
    filters.tags.length > 0 ||
    filters.dateRange.start !== '' ||
    filters.dateRange.end !== '' ||
    filters.metacriticRange.min !== 0 ||
    filters.metacriticRange.max !== 100

  const activeFiltersCount = [
    filters.name,
    filters.genres.length,
    filters.platforms.length,
    filters.stores.length,
    filters.tags.length,
    filters.dateRange.start || filters.dateRange.end,
    filters.metacriticRange.min !== 0 || filters.metacriticRange.max !== 100
  ].filter(Boolean).length

  const buildApiParams = useCallback(() => {
    const params: any = {
      page: currentPage,
      page_size: env.DEFAULT_PAGE_SIZE
    }

    if (searchTerm.trim()) {
      params.search = searchTerm.trim()
    }

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

    return params
  }, [currentPage, searchTerm, filters])

  const {
    data: gamesData,
    isLoading: loading,
    error
  } = useQuery({
    queryKey: ['games', currentPage, searchTerm, filters],
    queryFn: () => {
      const apiParams = buildApiParams()
      return gamesApi.getGamesWithFilters(apiParams)
    },
    staleTime: getCacheConfig().staleTime,
    retry: getRetryConfig().attempts,
    retryDelay: getRetryConfig().delay
  })

  const games = gamesData?.results || []

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    scrollToTop()
  }, [])

  const handleFilterChange = useCallback((type: string, value: any) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [type]: value
      }
      return newFilters
    })
    setCurrentPage(1)
  }, [])

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    setCurrentPage(1)
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    setCurrentPage(1)
  }, [])

  const totalPages = Math.ceil((gamesData?.count || 0) / env.DEFAULT_PAGE_SIZE)

  return {
    games: games,
    loading,
    error: error?.message || null,
    currentPage,
    totalPages,
    searchTerm,
    handleSearch,
    handlePageChange,
    filters,
    availableGenres: gameData.genres,
    availablePlatforms: gameData.platforms,
    availableStores: gameData.stores,
    availableTags: gameData.tags,
    handleFilterChange,
    handleResetFilters,
    handleClearFilters,
    hasActiveFilters,
    activeFiltersCount
  }
}
