import type { Game } from '@/types/game'
import { useCallback, useState } from 'react'
import { useGameDetails } from './useGameDetails'

interface UseGameModalReturn {
  isOpen: boolean
  selectedGame: Game | null
  gameDetails: any
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
    // Previne scroll do body quando modal está aberto
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setSelectedGame(null)
    // Restaura scroll do body
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
