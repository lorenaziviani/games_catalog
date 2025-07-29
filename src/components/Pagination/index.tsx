import { ElementType, TextVariant } from '@/types/common'
import { Text } from '../Text'
import * as S from './styles'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showInfo?: boolean
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showInfo = true
}: PaginationProps) => {
  if (totalPages <= 1) return null

  return (
    <S.PaginationContainer>
      <S.PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </S.PageButton>

      {showInfo && (
        <Text
          as={ElementType.SPAN}
          $variant={TextVariant.PRIMARY}
          $lgFontSize={16}
        >
          {`Página ${currentPage} de ${totalPages}`}
        </Text>
      )}

      <S.PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Próxima
      </S.PageButton>
    </S.PaginationContainer>
  )
}

export default Pagination
