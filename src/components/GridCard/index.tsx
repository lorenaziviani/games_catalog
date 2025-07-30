import Card from '@/components/Card'
import type { Game } from '@/types/game'
import { ElementType, TextVariant } from '../../types/common'
import Text from '../Text'
import * as S from './styles'

interface GridProps {
  games: Game[]
  emptyMessage?: string
}

const GridCard = ({
  games,
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
        <Card key={game.id} game={game} />
      ))}
    </S.GridCard>
  )
}

export default GridCard
