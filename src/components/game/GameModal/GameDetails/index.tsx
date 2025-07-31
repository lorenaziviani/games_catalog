import { ElementType, TagVariant, TextVariant } from '@/types/common'
import type { Game } from '@/types/game'
import Image from '@components/common/ui/Image'
import TagsContainer from '@components/common/ui/TagsContainer'
import Text from '@components/common/ui/Text'
import FavoriteButton from '@components/features/favorites/FavoriteButton'
import Info from '@components/game/Info'
import MetacriticScore from '@components/game/MetacriticScore'
import RatingBadge from '@components/game/RatingBadge'

import { useIsFavorite } from '@/hooks/useFavorites'
import { sanitizeHTML } from '@/utils/htmlUtils'
import * as S from './styles'

import type { GameDetails as GameDetailsType } from '@/types/game'

interface GameDetailsProps {
  game: Game
  gameDetails: GameDetailsType | null
  loading: boolean
  error: string | null
}

const GameDetails = ({
  game,
  gameDetails,
  loading,
  error
}: GameDetailsProps) => {
  const { isFavorite, toggleFavorite } = useIsFavorite(game.id)

  const handleToggleFavorite = () => {
    toggleFavorite(game)
  }

  return (
    <S.Container>
      <S.Header>
        <S.ImageContainer>
          <Image src={game.background_image} alt={game.name} />
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={handleToggleFavorite}
          />
          <RatingBadge rating={game.rating} />
        </S.ImageContainer>

        <S.HeaderContent>
          <Text
            as={ElementType.TITLE}
            $lgFontSize={32}
            $mdFontSize={24}
            $smFontSize={20}
            $variant={TextVariant.PRIMARY}
          >
            {game.name}
          </Text>

          <Info released={game.released} playtime={game.playtime} />

          {game.metacritic && <MetacriticScore score={game.metacritic} />}
        </S.HeaderContent>
      </S.Header>

      <S.Content>
        {/* Seção de Descrição */}
        {gameDetails?.description && (
          <S.Section>
            <Text
              as={ElementType.P}
              $lgFontSize={20}
              $mdFontSize={16}
              $smFontSize={12}
              $variant={TextVariant.PRIMARY}
            >
              Descrição
            </Text>
            <S.DescriptionContainer>
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHTML(gameDetails.description)
                }}
              />
            </S.DescriptionContainer>
          </S.Section>
        )}

        {/* Loading State */}
        {loading && (
          <S.Section>
            <Text
              as={ElementType.P}
              $lgFontSize={16}
              $mdFontSize={16}
              $smFontSize={12}
              $variant={TextVariant.TERTIARY}
            >
              Carregando detalhes do jogo...
            </Text>
          </S.Section>
        )}

        {/* Error State */}
        {error && (
          <S.Section>
            <Text
              as={ElementType.P}
              $lgFontSize={16}
              $mdFontSize={16}
              $smFontSize={12}
              $variant={TextVariant.SECONDARY}
            >
              {`Erro ao carregar detalhes: ${error}`}
            </Text>
          </S.Section>
        )}

        <S.Section>
          <Text
            as={ElementType.P}
            $lgFontSize={20}
            $mdFontSize={16}
            $smFontSize={12}
            $variant={TextVariant.PRIMARY}
          >
            Gêneros
          </Text>
          <TagsContainer items={game.genres} variant={TagVariant.GENRE} />
        </S.Section>

        <S.Section>
          <Text
            as={ElementType.P}
            $lgFontSize={20}
            $mdFontSize={16}
            $smFontSize={12}
            $variant={TextVariant.PRIMARY}
          >
            Plataformas
          </Text>
          <TagsContainer
            items={game.platforms.map(p => ({
              id: p.platform.id,
              name: p.platform.name
            }))}
            variant={TagVariant.PLATFORM}
          />
        </S.Section>

        {game.tags && game.tags.length > 0 && (
          <S.Section>
            <Text
              as={ElementType.P}
              $lgFontSize={20}
              $mdFontSize={16}
              $smFontSize={12}
              $variant={TextVariant.PRIMARY}
            >
              Tags
            </Text>
            <TagsContainer
              items={game.tags.map(tag => ({
                id: tag.id,
                name: tag.name
              }))}
              variant={TagVariant.GENRE}
            />
          </S.Section>
        )}

        {game.short_screenshots && game.short_screenshots.length > 0 && (
          <S.Section>
            <Text
              as={ElementType.P}
              $lgFontSize={20}
              $mdFontSize={16}
              $smFontSize={12}
              $variant={TextVariant.PRIMARY}
            >
              Screenshots
            </Text>
            <S.ScreenshotsContainer>
              {game.short_screenshots.slice(0, 6).map(screenshot => (
                <S.ScreenshotItem key={screenshot.id}>
                  <Image
                    src={screenshot.image}
                    alt={`Screenshot de ${game.name}`}
                  />
                </S.ScreenshotItem>
              ))}
            </S.ScreenshotsContainer>
          </S.Section>
        )}
      </S.Content>
    </S.Container>
  )
}

export default GameDetails
