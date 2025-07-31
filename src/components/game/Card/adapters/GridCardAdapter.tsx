import type { CardRendererProps } from '@/components/game/Card/types'
import GridCard from '@/components/game/GridCard'
import React from 'react'

const GridCardAdapter: React.FC<CardRendererProps> = ({
  game,
  onGameClick
}) => {
  const games = [game]

  const handleGameClick = (clickedGame: CardRendererProps['game']) => {
    onGameClick?.(clickedGame)
  }

  return (
    <GridCard
      games={games}
      onGameClick={handleGameClick}
      emptyMessage="Nenhum jogo encontrado"
    />
  )
}

export default GridCardAdapter
