import { env } from '@/config/env'
import { useFavorites } from '@/hooks/useFavorites'
import { DEFAULT_SORT, ElementType, TextVariant } from '@/types/common'
import { scrollToTop } from '@/utils/scrollUtils'
import Banner from '@components/Banner'
import List from '@components/List'
import Sort from '@components/Sort'
import Text from '@components/Text'
import { useSort } from '@hooks/useSort'
import { useMemo, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { Stats } from '../../components'

const FavoritesPage = () => {
  const { favorites, isLoading, error, clearAllFavorites } = useFavorites()
  const [currentPage, setCurrentPage] = useState(1)
  const { sortedGames, currentSort, handleSortChange } = useSort(
    favorites,
    DEFAULT_SORT
  )

  const handleClearAll = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os favoritos?')) {
      clearAllFavorites()
      setCurrentPage(1)
    }
  }

  const paginatedFavorites = useMemo(() => {
    const startIndex = (currentPage - 1) * env.DEFAULT_PAGE_SIZE
    const endIndex = startIndex + env.DEFAULT_PAGE_SIZE
    return sortedGames.slice(startIndex, endIndex)
  }, [sortedGames, currentPage])

  const totalPages = Math.ceil(sortedGames.length / env.DEFAULT_PAGE_SIZE)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)

    setTimeout(() => {
      scrollToTop()
    }, 0)
  }

  return (
    <>
      <Banner
        badge={{
          icon: FaHeart,
          text: 'Meus Favoritos'
        }}
      >
        <Text
          as={ElementType.TITLE}
          $variant={TextVariant.PRIMARY}
          $lgFontSize={40}
        >
          Sua Biblioteca de Jogos
        </Text>

        <Text
          as={ElementType.P}
          $variant={TextVariant.TERTIARY}
          $lgFontSize={20}
        >
          Gerencie seus jogos favoritos, organize por gênero e descubra novos
          títulos baseados no que você ama.
        </Text>
      </Banner>

      <Stats
        games={favorites}
        onClearAll={handleClearAll}
        showClearButton={true}
      />

      <Sort currentSort={currentSort} onSortChange={handleSortChange} />

      <List
        games={paginatedFavorites}
        loading={isLoading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        searchTerm=""
        onSearch={() => {}}
        onPageChange={handlePageChange}
        showSearch={false}
        showPagination={true}
        emptyMessage="Nenhum jogo favoritado ainda. Adicione jogos aos seus favoritos para vê-los aqui!"
        loadingMessage="Carregando favoritos..."
      />
    </>
  )
}

export default FavoritesPage
