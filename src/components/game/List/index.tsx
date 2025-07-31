import Text from '@/components/common/ui/Text'
import GridCard from '@/components/game/GridCard'
import {
  ElementType,
  LoadingMessage,
  LoadingSpinnerSize,
  TextVariant
} from '@/types/common'
import type { Game } from '@/types/game'
import LoadingSpinner from '@components/common/ui/LoadingSpinner'
import Pagination from '@components/features/navigation/Pagination'
import * as S from './styles'

type ListProps = {
  games: Game[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
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
  onPageChange,
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
