import { DATE_RANGE_DEFAULTS } from '@/types/common'
import type { FilterState } from '@/types/filter'

interface ApiParams {
  page: number
  page_size: number
  search?: string
  genres?: string
  platforms?: string
  stores?: string
  tags?: string
  dates?: string
  metacritic?: string
  ordering?: string
}

export const buildApiParams = (
  currentPage: number,
  searchTerm: string,
  filters: FilterState,
  pageSize: number
): ApiParams => {
  const params: ApiParams = {
    page: currentPage,
    page_size: pageSize
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
}
