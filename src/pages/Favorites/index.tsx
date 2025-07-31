import { env } from '@/config/env'
import { DEFAULT_SORT, ElementType, TextVariant } from '@/types/common'
import { scrollToTop } from '@/utils/scrollUtils'
import Filters from '@components/common/forms/Filters'
import Sort from '@components/common/forms/Sort'
import Banner from '@components/common/layout/Banner'
import Text from '@components/common/ui/Text'
import List from '@components/game/List'
import Stats from '@components/game/Stats'
import { useFavorites } from '@hooks/useFavorites'
import { useFilters } from '@hooks/useFilters'
import { useSort } from '@hooks/useSort'
import { useMemo, useState } from 'react'
import { FaHeart } from 'react-icons/fa'

const FavoritesPage = () => {
  const { favorites, filterDataFromFavorites, clearAllFavorites } =
    useFavorites()

  const { genres, platforms, stores, tags } = filterDataFromFavorites(favorites)

  const [currentPage, setCurrentPage] = useState(1)

  const {
    filters,
    filteredGames,
    updateFilter,
    resetFilters,
    hasActiveFilters,
    activeFiltersCount
  } = useFilters(favorites)

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setTimeout(() => {
      scrollToTop()
    }, 0)
  }

  const handleClearAll = () => {
    clearAllFavorites()
    setCurrentPage(1)
  }

  const handleFilterChange = (type: any, value: any) => {
    updateFilter(type, value)
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    resetFilters()
    setCurrentPage(1)
  }

  return (
    <>
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

        <Text
          as={ElementType.P}
          $variant={TextVariant.TERTIARY}
          $lgFontSize={20}
        >
          Gerencie seus jogos favoritos, organize por gênero e descubra novos
          títulos baseados no que você ama.
        </Text>
      </Banner>

      <Stats
        games={favorites}
        onClearAll={handleClearAll}
        showClearButton={true}
      />

      <Filters
        filters={filters}
        onUpdateFilter={handleFilterChange}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
        activeFiltersCount={activeFiltersCount}
        availableGenres={genres}
        availablePlatforms={platforms}
        availableStores={stores}
        availableTags={tags}
      />

      <Sort currentSort={currentSort} onSortChange={handleSortChange} />

      <List
        games={paginatedFavorites}
        loading={false}
        error={null}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        showPagination={true}
        emptyMessage={
          hasActiveFilters
            ? 'Nenhum jogo encontrado com os filtros aplicados.'
            : 'Você ainda não tem jogos favoritos.'
        }
      />
    </>
  )
}

export default FavoritesPage
