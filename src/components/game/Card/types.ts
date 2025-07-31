import type { Game } from '@/types/game'

export interface CardRenderer {
  type: string
  component: React.ComponentType<CardRendererProps>
  priority?: number
}

export interface CardRendererProps {
  game: Game
  onGameClick?: (game: Game) => void
  onFavoriteToggle?: (game: Game) => void
  isFavorite?: boolean
  className?: string
  style?: React.CSSProperties
}

export interface CardRegistry {
  registerRenderer(renderer: CardRenderer): void
  getRenderer(type: string): CardRenderer | undefined
  getAllRenderers(): CardRenderer[]
  getDefaultRenderer(): CardRenderer | undefined
}
