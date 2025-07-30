import { DEFAULT_SORT, SortOption } from '@/types/common'
import type { Game } from '@/types/game'
import { useMemo, useState } from 'react'

export const useSort = (
  games: Game[],
  defaultSort: SortOption = DEFAULT_SORT
) => {
  const [currentSort, setCurrentSort] = useState<SortOption>(defaultSort)

  const sortedGames = useMemo(() => {
    const sorted = [...games].sort((a, b) => {
      switch (currentSort) {
        case SortOption.NAME:
          return a.name.localeCompare(b.name)
        case SortOption.RATING:
          return b.rating - a.rating
        case SortOption.RELEASE:
          return new Date(b.released).getTime() - new Date(a.released).getTime()
        case SortOption.ADDED:
        default:
          return 0
      }
    })

    return sorted
  }, [games, currentSort])

  const handleSortChange = (sort: SortOption) => {
    setCurrentSort(sort)
  }

  return {
    sortedGames,
    currentSort,
    handleSortChange
  }
}
