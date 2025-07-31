import { env } from '@/config/env'
import { DEFAULT_SORT, ElementType, TextVariant } from '@/types/common'
import type { Game } from '@/types/game'
import type { FilterType } from '@/types/filter'
import {
  extractGameGenresIds,
  extractGamePlatformsIds,
  extractGameStoresIds,
  extractGameTagsIds,
  isGameMatchingFilterIds
} from '@/utils/gameUtils'
import { scrollToTop } from '@/utils/scrollUtils'
import Filters from '@components/common/forms/filters'
import Sort from '@components/common/forms/Sort'
import Banner from '@components/common/layout/Banner'
import Text from '@components/common/ui/Text'
import GameListWithModal from '@components/game/GameListWithModal'
import Stats from '@components/game/Stats'
import { useFavorites } from '@hooks/useFavorites'
import { useFilters } from '@hooks/useFilters'
import { useSort } from '@hooks/useSort'
import { useCallback, useMemo, useState } from 'react'
import { FaHeart } from 'react-icons/fa'

const FavoritesPage = () => {
  const { favorites, filterDataFromFavorites, clearAllFavorites } =
    useFavorites()

  const { genres, platforms, stores, tags } = filterDataFromFavorites(favorites)

  const [currentPage, setCurrentPage] = useState(1)

  const {
    filters,
    hasActiveFilters,
    activeFiltersCount,
    handleFilterChange,
    handleResetFilters
  } = useFilters()

  const isGameNameMatchingFilter = useCallback(
    (game: Game) => {
      if (!filters.name) return true
      return game.name.toLowerCase().includes(filters.name.toLowerCase())
    },
    [filters.name]
  )

  const isGameGenresMatchingFilter = useCallback(
    (game: Game) => {
      const gameGenresIds = extractGameGenresIds(game)
      return isGameMatchingFilterIds(gameGenresIds, filters.genres)
    },
    [filters.genres]
  )

  const isGamePlatformsMatchingFilter = useCallback(
    (game: Game) => {
      const gamePlatformsIds = extractGamePlatformsIds(game)
      return isGameMatchingFilterIds(gamePlatformsIds, filters.platforms)
    },
    [filters.platforms]
  )

  const isGameStoresMatchingFilter = useCallback(
    (game: Game) => {
      const gameStoresIds = extractGameStoresIds(game)
      return isGameMatchingFilterIds(gameStoresIds, filters.stores)
    },
    [filters.stores]
  )

  const isGameTagsMatchingFilter = useCallback(
    (game: Game) => {
      const gameTagsIds = extractGameTagsIds(game)
      return isGameMatchingFilterIds(gameTagsIds, filters.tags)
    },
    [filters.tags]
  )

  const filteredGames = useMemo(() => {
    return favorites.filter(game => {
      return (
        isGameNameMatchingFilter(game) &&
        isGameGenresMatchingFilter(game) &&
        isGamePlatformsMatchingFilter(game) &&
        isGameStoresMatchingFilter(game) &&
        isGameTagsMatchingFilter(game)
      )
    })
  }, [
    favorites,
    isGameNameMatchingFilter,
    isGameGenresMatchingFilter,
    isGamePlatformsMatchingFilter,
    isGameStoresMatchingFilter,
    isGameTagsMatchingFilter
  ])

  const { sortedGames, currentSort, handleSortChange } = useSort(
    filteredGames,
    DEFAULT_SORT
  )

  const paginatedFavorites = useMemo(() => {
    const startIndex = (currentPage - 1) * env.DEFAULT_PAGE_SIZE
    const endIndex = startIndex + env.DEFAULT_PAGE_SIZE
    return sortedGames.slice(startIndex, endIndex)
  }, [sortedGames, currentPage])

  const totalPages = Math.ceil(sortedGames.length / env.DEFAULT_PAGE_SIZE)

  const navigateToPage = (page: number) => {
    setCurrentPage(page)
    setTimeout(() => {
      scrollToTop()
    }, 0)
  }

  const clearAllFavoritesAndResetPage = () => {
    clearAllFavorites()
    setCurrentPage(1)
  }

  const updateFilterAndResetPage = (type: FilterType, value: unknown) => {
    handleFilterChange(type, value as string | number | string[])
    setCurrentPage(1)
  }

  const resetFiltersAndResetPage = () => {
    handleResetFilters()
    setCurrentPage(1)
  }

  const renderBanner = () => (
    <Banner
      badge={{
        icon: FaHeart,
        text: 'Meus Favoritos'
      }}
    >
      <Text
        as={ElementType.TITLE}
        $variant={TextVariant.PRIMARY}
        $lgFontSize={40}
      >
        Sua Biblioteca de Jogos
      </Text>

      <Text as={ElementType.P} $variant={TextVariant.TERTIARY} $lgFontSize={20}>
        Gerencie seus jogos favoritos, organize por gênero e descubra novos
        títulos baseados no que você ama.
      </Text>
    </Banner>
  )

  const renderFiltersAndSort = () => (
    <>
      <Filters
        filters={filters}
        onUpdateFilter={updateFilterAndResetPage}
        onResetFilters={resetFiltersAndResetPage}
        hasActiveFilters={hasActiveFilters}
        activeFiltersCount={activeFiltersCount}
        availableGenres={genres}
        availablePlatforms={platforms}
        availableStores={stores}
        availableTags={tags}
      />

      <Sort currentSort={currentSort} onSortChange={handleSortChange} />
    </>
  )

  const getEmptyMessage = () => {
    return hasActiveFilters
      ? 'Nenhum jogo encontrado com os filtros aplicados.'
      : 'Você ainda não tem jogos favoritos.'
  }

  return (
    <>
      {renderBanner()}

      <Stats
        games={favorites}
        onClearAll={clearAllFavoritesAndResetPage}
        showClearButton={true}
      />

      {renderFiltersAndSort()}

      <GameListWithModal
        games={paginatedFavorites}
        loading={false}
        error={null}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={navigateToPage}
        showPagination={true}
        emptyMessage={getEmptyMessage()}
      />
    </>
  )
}

export default FavoritesPage
