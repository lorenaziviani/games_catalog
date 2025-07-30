import { DEFAULT_SORT, ElementType, TextVariant } from '@/types/common'
import Banner from '@components/Banner'
import List from '@components/List'
import Sort from '@components/Sort'
import Text from '@components/Text'
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
    searchTerm,
    handleSearch,
    handlePageChange
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

      <Sort currentSort={currentSort} onSortChange={handleSortChange} />

      <List
        games={sortedGames}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        searchTerm={searchTerm}
        onSearch={handleSearch}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default HomePage
