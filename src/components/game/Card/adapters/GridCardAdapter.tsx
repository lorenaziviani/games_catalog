import React from 'react'
import GridCard from '../../GridCard'
import type { CardRendererProps } from '../types'

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
