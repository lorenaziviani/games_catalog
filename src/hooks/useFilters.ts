import type { FilterState, FilterType } from '@/types/filter'
import { DEFAULT_FILTERS } from '@/types/filter'
import { useCallback, useState } from 'react'

type FilterValue =
  | string
  | number
  | string[]
  | { start: string; end: string }
  | { min: number; max: number }

interface UseFiltersReturn {
  filters: FilterState
  hasActiveFilters: boolean
  activeFiltersCount: number
  handleFilterChange: (type: FilterType, value: FilterValue) => void
  handleResetFilters: () => void
  handleClearFilters: () => void
}

export const useFilters = (onFiltersChange?: () => void): UseFiltersReturn => {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)

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

  const handleFilterChange = useCallback(
    (type: FilterType, value: FilterValue) => {
      setFilters(prev => {
        const newFilters = {
          ...prev,
          [type]: value
        }
        return newFilters
      })
      onFiltersChange?.()
    },
    [onFiltersChange]
  )

  const handleResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    onFiltersChange?.()
  }, [onFiltersChange])

  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    onFiltersChange?.()
  }, [onFiltersChange])

  return {
    filters,
    hasActiveFilters,
    activeFiltersCount,
    handleFilterChange,
    handleResetFilters,
    handleClearFilters
  }
}
