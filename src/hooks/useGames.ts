import { env, getCacheConfig, getRetryConfig } from '@/config/env'
import type { Game } from '@/types/game'
import { gamesApi } from '@services/gamesApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

const QUERY_KEYS = {
  games: 'games',
  search: 'search',
  popular: 'popular',
  favorites: 'favorites'
} as const

interface useGamesReturn {
  games: Game[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
  searchTerm: string
  favorites: number[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  handleSearch: (value: string) => void
  handleFavorite: (gameId: number) => void
  handlePageChange: (page: number) => void
  clearError: () => void
  refresh: () => void
  prefetchNextPage: () => void
  invalidateCache: () => void
}

export const useGames = (): useGamesReturn => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [favorites, setFavorites] = useState<number[]>([])

  const queryClient = useQueryClient()

  const cacheConfig = getCacheConfig()
  const retryConfig = getRetryConfig()

  const popularQuery = useQuery({
    queryKey: [QUERY_KEYS.popular, currentPage],
    queryFn: () => gamesApi.getPopularGames(currentPage, env.DEFAULT_PAGE_SIZE),
    enabled: !searchTerm.trim(),
    staleTime: cacheConfig.staleTime,
    gcTime: cacheConfig.duration,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('401')) {
        return false
      }
      return failureCount < retryConfig.attempts
    },
    retryDelay: attemptIndex =>
      Math.min(retryConfig.delay * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true
  })

  const searchQuery = useQuery({
    queryKey: [QUERY_KEYS.search, searchTerm, currentPage],
    queryFn: () =>
      gamesApi.searchGames(searchTerm, currentPage, env.DEFAULT_PAGE_SIZE),
    enabled: !!searchTerm.trim(),
    staleTime: Math.floor(cacheConfig.staleTime / 2),
    gcTime: cacheConfig.duration,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes('401')) {
        return false
      }
      return failureCount < Math.floor(retryConfig.attempts / 2)
    },
    retryDelay: attemptIndex =>
      Math.min(retryConfig.delay * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false
  })

  const activeQuery = searchTerm.trim() ? searchQuery : popularQuery
  const data = activeQuery.data
  const games = data?.results || []
  const totalPages = data ? Math.ceil(data.count / env.DEFAULT_PAGE_SIZE) : 1
  const loading = activeQuery.isLoading || activeQuery.isFetching
  const error = activeQuery.error
    ? 'Erro ao carregar os jogos. Tente novamente.'
    : null

  const hasNextPage = currentPage < totalPages
  const hasPreviousPage = currentPage > 1

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }, [])

  const handleFavorite = useCallback((gameId: number) => {
    setFavorites(prev =>
      prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    )
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  const clearError = useCallback(() => {
    queryClient.resetQueries({ queryKey: [QUERY_KEYS.search] })
    queryClient.resetQueries({ queryKey: [QUERY_KEYS.popular] })
  }, [queryClient])

  const refresh = useCallback(() => {
    activeQuery.refetch()
  }, [activeQuery])

  const prefetchNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1
      if (searchTerm.trim()) {
        queryClient.prefetchQuery({
          queryKey: [QUERY_KEYS.search, searchTerm, nextPage],
          queryFn: () =>
            gamesApi.searchGames(searchTerm, nextPage, env.DEFAULT_PAGE_SIZE),
          staleTime: cacheConfig.staleTime
        })
      } else {
        queryClient.prefetchQuery({
          queryKey: [QUERY_KEYS.popular, nextPage],
          queryFn: () =>
            gamesApi.getPopularGames(nextPage, env.DEFAULT_PAGE_SIZE),
          staleTime: cacheConfig.staleTime
        })
      }
    }
  }, [queryClient, currentPage, totalPages, searchTerm, cacheConfig.staleTime])

  const invalidateCache = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.search] })
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.popular] })
  }, [queryClient])

  return {
    games,
    loading,
    error,
    currentPage,
    totalPages,
    searchTerm,
    favorites,
    hasNextPage,
    hasPreviousPage,
    handleSearch,
    handleFavorite,
    handlePageChange,
    clearError,
    refresh,
    prefetchNextPage,
    invalidateCache
  }
}

export const useUpdateFavorite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      gameId,
      isFavorite
    }: {
      gameId: number
      isFavorite: boolean
    }) => {
      await new Promise(resolve => setTimeout(resolve, env.RETRY_DELAY))
      return { gameId, isFavorite }
    },
    onMutate: async ({ gameId, isFavorite }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.favorites] })

      const previousFavorites = queryClient.getQueryData([QUERY_KEYS.favorites])

      queryClient.setQueryData([QUERY_KEYS.favorites], (old: number[] = []) => {
        if (isFavorite) {
          return [...old, gameId]
        } else {
          return old.filter(id => id !== gameId)
        }
      })

      return { previousFavorites }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(
          [QUERY_KEYS.favorites],
          context.previousFavorites
        )
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.favorites] })
    }
  })
}

export const useAutoPrefetch = (
  currentPage: number,
  totalPages: number,
  searchTerm: string
) => {
  const queryClient = useQueryClient()
  const cacheConfig = getCacheConfig()

  const autoPrefetch = useCallback(() => {
    if (currentPage >= totalPages - 1) {
      const nextPage = currentPage + 1
      if (searchTerm.trim()) {
        queryClient.prefetchQuery({
          queryKey: [QUERY_KEYS.search, searchTerm, nextPage],
          queryFn: () =>
            gamesApi.searchGames(searchTerm, nextPage, env.DEFAULT_PAGE_SIZE),
          staleTime: cacheConfig.staleTime
        })
      } else {
        queryClient.prefetchQuery({
          queryKey: [QUERY_KEYS.popular, nextPage],
          queryFn: () =>
            gamesApi.getPopularGames(nextPage, env.DEFAULT_PAGE_SIZE),
          staleTime: cacheConfig.staleTime
        })
      }
    }
  }, [queryClient, currentPage, totalPages, searchTerm, cacheConfig.staleTime])

  return autoPrefetch
}
