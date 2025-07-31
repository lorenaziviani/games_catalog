import type { Game } from '@/types/game'
import type { GameDetails } from '@/types/game'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import GameDetails from './GameDetails'
import * as S from './styles'

interface GameModalProps {
  isOpen: boolean
  game: Game | null
  gameDetails: GameDetails | null
  loading: boolean
  error: string | null
  onClose: () => void
}

const GameModal = ({
  isOpen,
  game,
  gameDetails,
  loading,
  error,
  onClose
}: GameModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !game) return null

  return createPortal(
    <S.ModalOverlay onClick={onClose} role="dialog" data-testid="game-modal">
      <S.ModalContent onClick={e => e.stopPropagation()}>
        <S.CloseButton
          onClick={onClose}
          aria-label="Fechar modal"
          data-testid="close-button"
        >
          <S.CloseIcon>×</S.CloseIcon>
        </S.CloseButton>
        <GameDetails
          game={game}
          gameDetails={gameDetails}
          loading={loading}
          error={error}
        />
      </S.ModalContent>
    </S.ModalOverlay>,
    document.body
  )
}

export default GameModal
