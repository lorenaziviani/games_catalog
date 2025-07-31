import type { Game } from '@/types/game'
import React from 'react'
import { cardRegistry } from './CardRegistry'
import type { CardRendererProps } from './types'

interface DynamicCardProps {
  game: Game
  type?: string
  onGameClick?: (game: Game) => void
  onFavoriteToggle?: (game: Game) => void
  isFavorite?: boolean
  className?: string
  style?: React.CSSProperties
}

const DynamicCard: React.FC<DynamicCardProps> = ({
  game,
  type,
  onGameClick,
  onFavoriteToggle,
  isFavorite,
  className,
  style
}) => {
  const rendererType = type || 'default'
  const renderer = cardRegistry.getRenderer(rendererType)

  if (!renderer) {
    console.warn(`Card renderer type '${rendererType}' not found in registry`)

    const defaultRenderer = cardRegistry.getDefaultRenderer()
    if (!defaultRenderer) {
      console.error('No default card renderer available')
      return null
    }

    const CardComponent = defaultRenderer.component
    const props: CardRendererProps = {
      game,
      onGameClick,
      onFavoriteToggle,
      isFavorite,
      className,
      style
    }

    return <CardComponent {...props} />
  }

  const CardComponent = renderer.component
  const props: CardRendererProps = {
    game,
    onGameClick,
    onFavoriteToggle,
    isFavorite,
    className,
    style
  }

  return <CardComponent {...props} />
}

export default DynamicCard
