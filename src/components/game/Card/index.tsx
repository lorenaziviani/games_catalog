import { useIsFavorite } from '@/hooks/useFavorites'
import { ElementType, TagVariant, TextVariant } from '@/types/common'
import type { Game } from '@/types/game'
import Image from '@components/common/ui/Image'
import TagsContainer from '@components/common/ui/TagsContainer'
import Text from '@components/common/ui/Text'
import FavoriteButton from '@components/features/favorites/FavoriteButton'
import Info from '@components/game/Info'
import MetacriticScore from '@components/game/MetacriticScore'
import RatingBadge from '@components/game/RatingBadge'
import * as S from './styles'

interface CardProps {
  game: Game
  onGameClick?: (game: Game) => void
}

const Card = ({ game, onGameClick }: CardProps) => {
  const { isFavorite, toggleFavorite } = useIsFavorite(game.id)

  const handleToggleFavorite = () => {
    toggleFavorite(game)
  }

  const handleCardClick = () => {
    onGameClick?.(game)
  }

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    handleToggleFavorite()
  }

  return (
    <S.Card onClick={handleCardClick} data-testid="game-card">
      <S.ImageContainer>
        <Image src={game.background_image} alt={game.name} />
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={handleFavoriteClick}
        />
        <RatingBadge rating={game.rating} />
      </S.ImageContainer>

      <S.CardContent>
        <Text
          as={ElementType.TITLE}
          $lgFontSize={24}
          $variant={TextVariant.SECONDARY}
          data-testid="game-title"
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
