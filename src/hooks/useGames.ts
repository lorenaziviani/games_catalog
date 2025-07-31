import { configService } from '@/services/configService'
import { buildApiParams } from '@/utils/apiParamsBuilder'
import { gameService } from '@services/gameService'
import { useQuery } from '@tanstack/react-query'
import { useFilters } from './useFilters'
import { useGameData } from './useGameData'
import { usePagination } from './usePagination'
import { useSearch } from './useSearch'

export const useGames = () => {
  const { gameData } = useGameData()
  const { defaultPageSize } = configService.getApiConfig()

  const { currentPage, handlePageChange, resetPage } = usePagination(
    0,
    defaultPageSize
  )

  const { searchTerm, handleSearch, clearSearch } = useSearch(() => {
    resetPage()
  })

  const {
    filters,
    hasActiveFilters,
    activeFiltersCount,
    handleFilterChange,
    handleResetFilters,
    handleClearFilters
  } = useFilters(() => {
    resetPage()
  })

  const {
    data: gamesData,
    isLoading: loading,
    error
  } = useQuery({
    queryKey: ['games', currentPage, searchTerm, filters],
    queryFn: () => {
      const apiParams = buildApiParams(
        currentPage,
        searchTerm,
        filters,
        defaultPageSize
      )
      return gameService.getGamesWithFilters(apiParams)
    },
    staleTime: configService.getCacheConfig().staleTime,
    retry: configService.getRetryConfig().attempts,
    retryDelay: configService.getRetryConfig().delay
  })

  const games = gamesData?.results || []

  const updatedTotalPages = Math.ceil((gamesData?.count || 0) / defaultPageSize)

  return {
    games,
    loading,
    error: error?.message || null,
    currentPage,
    totalPages: updatedTotalPages,
    handlePageChange,
    searchTerm,
    handleSearch,
    clearSearch,
    filters,
    hasActiveFilters,
    activeFiltersCount,
    handleFilterChange,
    handleResetFilters,
    handleClearFilters,
    availableGenres: gameData.genres,
    availablePlatforms: gameData.platforms,
    availableStores: gameData.stores,
    availableTags: gameData.tags
  }
}
