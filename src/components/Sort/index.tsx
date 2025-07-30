import type { SortOption } from '@/types/common'
import { ElementType, SORT_OPTIONS, TextVariant } from '@/types/common'
import { useTheme } from 'styled-components'
import { isDarkMode } from '../../utils/themeUtils'
import Text from '../Text'
import * as S from './styles'

interface SortProps {
  currentSort: SortOption
  onSortChange: (sort: SortOption) => void
  showLabel?: boolean
}

const Sort = ({ currentSort, onSortChange, showLabel = true }: SortProps) => {
  const theme = useTheme()
  return (
    <S.SortContainer>
      {showLabel && (
        <S.SortLabel>
          <Text
            as={ElementType.SPAN}
            $variant={
              isDarkMode(theme) ? TextVariant.SECONDARY : TextVariant.PRIMARY
            }
          >
            Ordenar por:
          </Text>
        </S.SortLabel>
      )}

      <S.SortSelect
        value={currentSort}
        onChange={e => onSortChange(e.target.value as SortOption)}
      >
        {SORT_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </S.SortSelect>
    </S.SortContainer>
  )
}

export default Sort
