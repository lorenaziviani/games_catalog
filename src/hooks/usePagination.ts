import { scrollToTop } from '@/utils/scrollUtils'
import { useCallback, useState } from 'react'

interface UsePaginationReturn {
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
  resetPage: () => void
}

export const usePagination = (
  totalItems: number,
  pageSize: number
): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(totalItems / pageSize)

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    scrollToTop()
  }, [])

  const resetPage = useCallback(() => {
    setCurrentPage(1)
  }, [])

  return {
    currentPage,
    totalPages,
    handlePageChange,
    resetPage
  }
}
