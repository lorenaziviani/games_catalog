import { useIsFavorite } from '@/hooks/useFavorites'
import { ElementType, TagVariant, TextVariant } from '@/types/common'
import type { Game } from '@/types/game'
import FavoriteButton from '@components/FavoriteButton'
import Image from '@components/Image'
import Info from '@components/Info'
import MetacriticScore from '@components/MetacriticScore'
import RatingBadge from '@components/RatingBadge'
import TagsContainer from '@components/TagsContainer'
import Text from '@components/Text'
import * as S from './styles'

interface CardProps {
  game: Game
}

const Card = ({ game }: CardProps) => {
  const { isFavorite, toggleFavorite } = useIsFavorite(game.id)

  const handleToggleFavorite = () => {
    toggleFavorite(game)
  }

  return (
    <S.Card>
      <S.ImageContainer>
        <Image src={game.background_image} alt={game.name} />
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={handleToggleFavorite}
        />
        <RatingBadge rating={game.rating} />
      </S.ImageContainer>

      <S.CardContent>
        <Text
          as={ElementType.TITLE}
          $lgFontSize={24}
          $variant={TextVariant.SECONDARY}
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
