import type { Game } from '@/types/game'
import { useMemo } from 'react'
import { ElementType, TextVariant } from '../../types/common'
import Text from '../Text'
import * as S from './styles'

type StatsProps = {
  games: Game[]
  onClearAll?: () => void
  showClearButton?: boolean
}

const Stats = ({ games, onClearAll, showClearButton = false }: StatsProps) => {
  const stats = useMemo(() => {
    const byGenre = games.reduce(
      (acc, game) => {
        game.genres.forEach(genre => {
          acc[genre.name] = (acc[genre.name] || 0) + 1
        })
        return acc
      },
      {} as Record<string, number>
    )

    const byPlatform = games.reduce(
      (acc, game) => {
        game.platforms.forEach(platform => {
          acc[platform.platform.name] = (acc[platform.platform.name] || 0) + 1
        })
        return acc
      },
      {} as Record<string, number>
    )

    const averageRating =
      games.length > 0
        ? games.reduce((sum, game) => sum + game.rating, 0) / games.length
        : 0

    const uniqueGenres = Object.keys(byGenre).length
    const uniquePlatforms = Object.keys(byPlatform).length

    return {
      totalGames: games.length,
      averageRating,
      uniqueGenres,
      uniquePlatforms
    }
  }, [games])

  if (games.length === 0) {
    return null
  }

  return (
    <S.StatsContainer>
      <S.StatItem>
        <Text
          as={ElementType.TITLE}
          $variant={TextVariant.SECONDARY}
          $lgFontSize={40}
        >
          {`${stats.totalGames}`}
        </Text>
        <Text
          as={ElementType.P}
          $variant={TextVariant.SECONDARY}
          $lgFontSize={20}
        >
          Total de Jogos
        </Text>
      </S.StatItem>
      <S.StatItem>
        <Text
          as={ElementType.TITLE}
          $variant={TextVariant.SECONDARY}
          $lgFontSize={40}
        >
          {`${stats.averageRating.toFixed(1)}`}
        </Text>
        <Text
          as={ElementType.P}
          $variant={TextVariant.SECONDARY}
          $lgFontSize={20}
        >
          Avaliação Média
        </Text>
      </S.StatItem>
      <S.StatItem>
        <Text
          as={ElementType.TITLE}
          $variant={TextVariant.SECONDARY}
          $lgFontSize={40}
        >
          {`${stats.uniqueGenres}`}
        </Text>
        <Text
          as={ElementType.P}
          $variant={TextVariant.SECONDARY}
          $lgFontSize={20}
        >
          Gêneros
        </Text>
      </S.StatItem>
      <S.StatItem>
        <Text
          as={ElementType.TITLE}
          $variant={TextVariant.SECONDARY}
          $lgFontSize={40}
        >
          {`${stats.uniquePlatforms}`}
        </Text>
        <Text
          as={ElementType.P}
          $variant={TextVariant.SECONDARY}
          $lgFontSize={20}
        >
          Plataformas
        </Text>
      </S.StatItem>
      {showClearButton && onClearAll && (
        <S.ActionButton onClick={onClearAll} disabled={games.length === 0}>
          Limpar Todos
        </S.ActionButton>
      )}
    </S.StatsContainer>
  )
}

export default Stats
