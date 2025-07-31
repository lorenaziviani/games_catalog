import React from 'react'
import GridCard from '@/components/game/GridCard'
import type { CardRendererProps } from '@/components/game/Card/types'

const GridCardAdapter: React.FC<CardRendererProps> = ({
  game,
  onGameClick
}) => {
  const games = [game]

  const handleGameClick = (clickedGame: any) => {
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
