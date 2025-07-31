import { serviceContainer } from '@/services/ServiceContainer'
import type { GameDetails } from '@/types/game'
import { useEffect, useState } from 'react'

interface UseGameDetailsReturn {
  gameDetails: GameDetails | null
  loading: boolean
  error: string | null
}

export const useGameDetails = (gameId: number | null): UseGameDetailsReturn => {
  const [gameDetails, setGameDetails] = useState<GameDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!gameId) {
      setGameDetails(null)
      setError(null)
      return
    }

    const fetchGameDetails = async () => {
      setLoading(true)
      setError(null)

      try {
        const gameService = serviceContainer.getGameService()
        const details = await gameService.getGameById(gameId)
        setGameDetails(details)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Erro ao carregar detalhes do jogo'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchGameDetails()
  }, [gameId])

  return {
    gameDetails,
    loading,
    error
  }
}
