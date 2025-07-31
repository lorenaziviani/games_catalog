import { useGameModal } from '@/hooks/useGameModal'
import type { Game } from '@/types/game'
import GameModal from '@components/game/GameModal'
import List from '@components/game/List'

interface GameListWithModalProps {
  games: Game[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showPagination?: boolean
  emptyMessage?: string
  loadingMessage?: string
}

const GameListWithModal = ({
  games,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  showPagination = true,
  emptyMessage = 'Nenhum jogo encontrado.',
  loadingMessage
}: GameListWithModalProps) => {
  const {
    isOpen,
    selectedGame,
    gameDetails,
    loading: modalLoading,
    error: modalError,
    openModal,
    closeModal
  } = useGameModal()

  const handleGameClick = (game: Game) => {
    openModal(game)
  }

  return (
    <>
      <List
        games={games}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showPagination={showPagination}
        emptyMessage={emptyMessage}
        loadingMessage={loadingMessage}
        onGameClick={handleGameClick}
      />

      <GameModal
        isOpen={isOpen}
        game={selectedGame}
        gameDetails={gameDetails}
        loading={modalLoading}
        error={modalError}
        onClose={closeModal}
      />
    </>
  )
}

export default GameListWithModal
