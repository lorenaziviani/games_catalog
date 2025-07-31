import { useCallback, useState } from 'react'

interface UseSearchReturn {
  searchTerm: string
  handleSearch: (term: string) => void
  clearSearch: () => void
}

export const useSearch = (onSearchChange?: () => void): UseSearchReturn => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term)
      onSearchChange?.()
    },
    [onSearchChange]
  )

  const clearSearch = useCallback(() => {
    setSearchTerm('')
    onSearchChange?.()
  }, [onSearchChange])

  return {
    searchTerm,
    handleSearch,
    clearSearch
  }
}
