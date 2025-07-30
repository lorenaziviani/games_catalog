import GridCard from '@/components/GridCard'
import {
  ElementType,
  LoadingMessage,
  LoadingSpinnerSize,
  TextVariant
} from '@/types/common'
import type { Game } from '@/types/game'
import LoadingSpinner from '@components/LoadingSpinner'
import Pagination from '@components/Pagination'
import SearchBar from '@components/SearchBar'
import Text from '../Text'
import * as S from './styles'

type ListProps = {
  games: Game[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  searchTerm: string
  onSearch: (value: string) => void
  onPageChange: (page: number) => void
  showSearch?: boolean
  showPagination?: boolean
  emptyMessage?: string
  loadingMessage?: string
}

const List = ({
  games,
  loading,
  error,
  currentPage,
  totalPages,
  searchTerm,
  onSearch,
  onPageChange,
  showSearch = true,
  showPagination = true,
  emptyMessage = 'Nenhum jogo encontrado.',
  loadingMessage = LoadingMessage.GAMES
}: ListProps) => {
  if (loading && games.length === 0) {
    return (
      <LoadingSpinner
        message={loadingMessage}
        size={LoadingSpinnerSize.LARGE}
      />
    )
  }

  return (
    <S.Container>
      {showSearch && (
        <SearchBar
          value={searchTerm}
          onChange={onSearch}
          placeholder="Buscar jogos..."
        />
      )}

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

      <GridCard games={games} emptyMessage={emptyMessage} />

      {showPagination && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </S.Container>
  )
}

export default List
