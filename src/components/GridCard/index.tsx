import Card from '@/components/Card'
import type { Game } from '@/types/game'
import { ElementType, TextVariant } from '../../types/common'
import { Text } from '../Text'
import * as S from './styles'

interface GridProps {
  games: Game[]
  favorites: number[]
  onFavoriteToggle: (gameId: number) => void
  emptyMessage?: string
}

const GridCard = ({
  games,
  favorites,
  onFavoriteToggle,
  emptyMessage = 'Nenhum jogo encontrado.'
}: GridProps) => {
  if (games.length === 0) {
    return (
      <S.EmptyContainer>
        <Text
          as={ElementType.P}
          $lgFontSize={20}
          $variant={TextVariant.TERTIARY}
        >
          {emptyMessage}
        </Text>
      </S.EmptyContainer>
    )
  }

  return (
    <S.GridCard>
      {games.map(game => (
        <Card
          key={game.id}
          game={game}
          isFavorite={favorites.includes(game.id)}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </S.GridCard>
  )
}

export default GridCard
