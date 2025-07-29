import { ElementType, TagVariant, TextVariant } from '@/types/common'
import type { Game } from '@/types/game'
import FavoriteButton from '@components/FavoriteButton'
import Image from '@components/Image'
import Info from '@components/Info'
import MetacriticScore from '@components/MetacriticScore'
import RatingBadge from '@components/RatingBadge'
import TagsContainer from '@components/TagsContainer'
import { Text } from '@components/Text'
import { isDarkMode } from '@utils/themeUtils'
import { useTheme } from 'styled-components'
import * as S from './styles'

interface CardProps {
  game: Game
  isFavorite: boolean
  onFavoriteToggle: (gameId: number) => void
}

const Card = ({ game, isFavorite, onFavoriteToggle }: CardProps) => {
  const theme = useTheme()

  return (
    <S.Card>
      <S.ImageContainer>
        <Image src={game.background_image} alt={game.name} />
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={() => onFavoriteToggle(game.id)}
        />
        <RatingBadge rating={game.rating} />
      </S.ImageContainer>

      <S.CardContent>
        <Text
          as={ElementType.TITLE}
          $lgFontSize={24}
          $variant={
            isDarkMode(theme) ? TextVariant.SECONDARY : TextVariant.PRIMARY
          }
        >
          {game.name}
        </Text>

        <Info released={game.released} playtime={game.playtime} />

        <TagsContainer items={game.genres} variant={TagVariant.GENRE} />

        <TagsContainer
          items={game.platforms.map(p => ({
            id: p.platform.id,
            name: p.platform.name
          }))}
          variant={TagVariant.PLATFORM}
        />

        {game.metacritic && <MetacriticScore score={game.metacritic} />}
      </S.CardContent>
    </S.Card>
  )
}

export default Card
