import { DEFAULT_SORT, ElementType, TextVariant } from '@/types/common'
import Filters from '@components/common/forms/filters'
import Sort from '@components/common/forms/Sort'
import Banner from '@components/common/layout/Banner'
import Text from '@components/common/ui/Text'
import List from '@components/game/List'
import { useGames } from '@hooks/useGames'
import { useSort } from '@hooks/useSort'
import { BiSolidJoystick } from 'react-icons/bi'

const HomePage = () => {
  const {
    games,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
    filters,
    availableGenres,
    availablePlatforms,
    availableStores,
    availableTags,
    handleFilterChange,
    handleResetFilters,
    hasActiveFilters,
    activeFiltersCount
  } = useGames()

  const { sortedGames, currentSort, handleSortChange } = useSort(
    games,
    DEFAULT_SORT
  )

  return (
    <>
      <Banner
        badge={{
          icon: BiSolidJoystick,
          text: 'Catálogo Completo'
        }}
      >
        <Text
          as={ElementType.TITLE}
          $variant={TextVariant.PRIMARY}
          $lgFontSize={40}
        >
          Descubra Seus Jogos Favoritos
        </Text>

        <Text
          as={ElementType.P}
          $variant={TextVariant.TERTIARY}
          $lgFontSize={20}
        >
          Explore milhares de títulos, veja detalhes, avaliações e salve seus
          favoritos em um só lugar. Sua biblioteca de jogos personalizada.
        </Text>
      </Banner>

      <Filters
        filters={filters}
        onUpdateFilter={handleFilterChange}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
        activeFiltersCount={activeFiltersCount}
        availableGenres={availableGenres}
        availablePlatforms={availablePlatforms}
        availableStores={availableStores}
        availableTags={availableTags}
      />

      <Sort currentSort={currentSort} onSortChange={handleSortChange} />

      <List
        games={sortedGames}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default HomePage
