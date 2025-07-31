import type { Game, GameDetails } from '@/types/game'
import { useCallback, useState } from 'react'
import { useGameDetails } from './useGameDetails'

interface UseGameModalReturn {
  isOpen: boolean
  selectedGame: Game | null
  gameDetails: GameDetails | null
  loading: boolean
  error: string | null
  openModal: (game: Game) => void
  closeModal: () => void
}

export const useGameModal = (): UseGameModalReturn => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)

  const { gameDetails, loading, error } = useGameDetails(
    selectedGame?.id || null
  )

  const openModal = useCallback((game: Game) => {
    setSelectedGame(game)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setSelectedGame(null)
    document.body.style.overflow = 'unset'
  }, [])

  return {
    isOpen,
    selectedGame,
    gameDetails,
    loading,
    error,
    openModal,
    closeModal
  }
}
