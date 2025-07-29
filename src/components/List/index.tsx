import GridCard from '@/components/GridCard'
import {
  ElementType,
  LoadingMessage,
  LoadingSpinnerSize,
  TextVariant
} from '@/types/common'
import LoadingSpinner from '@components/LoadingSpinner'
import Pagination from '@components/Pagination'
import SearchBar from '@components/SearchBar'
import { useGames } from '@hooks/useGames'
import { Text } from '../Text'
import * as S from './styles'

const List = () => {
  const {
    games,
    loading,
    error,
    currentPage,
    totalPages,
    searchTerm,
    favorites,
    handleSearch,
    handleFavorite,
    handlePageChange
  } = useGames()

  if (loading && games.length === 0) {
    return (
      <LoadingSpinner
        message={LoadingMessage.GAMES}
        size={LoadingSpinnerSize.LARGE}
      />
    )
  }

  return (
    <S.Container>
      <SearchBar
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Buscar jogos..."
      />

      {error && (
        <S.ErrorMessage>
          <Text
            as={ElementType.TITLE}
            $variant={TextVariant.SECONDARY}
            $lgFontSize={16}
          >
            {error}
          </Text>
        </S.ErrorMessage>
      )}

      <GridCard
        games={games}
        favorites={favorites}
        onFavoriteToggle={handleFavorite}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </S.Container>
  )
}

export default List
