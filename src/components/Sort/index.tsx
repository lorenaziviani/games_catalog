import type { SortOption } from '@/types/common'
import { ElementType, SORT_OPTIONS, TextVariant } from '@/types/common'
import { useTheme } from 'styled-components'
import { isDarkMode } from '../../utils/themeUtils'
import MultiSelectFilter from '../Filters/MultiSelectFilter'
import Text from '../Text'
import * as S from './styles'

interface SortProps {
  currentSort: SortOption
  onSortChange: (sort: SortOption) => void
  showLabel?: boolean
}

const Sort = ({ currentSort, onSortChange, showLabel = true }: SortProps) => {
  const theme = useTheme()

  const handleSortChange = (values: string[]) => {
    const newSort =
      values.length > 0 ? (values[0] as SortOption) : ('name' as SortOption)
    onSortChange(newSort)
  }

  return (
    <S.SortContainer>
      {showLabel && (
        <S.SortLabel>
          <Text
            as={ElementType.SPAN}
            $variant={
              isDarkMode(theme) ? TextVariant.SECONDARY : TextVariant.PRIMARY
            }
            $lgFontSize={20}
          >
            Ordenar por:
          </Text>
        </S.SortLabel>
      )}

      <S.SortSelectWrapper>
        <MultiSelectFilter
          options={SORT_OPTIONS.map(option => ({
            value: option.value,
            label: option.label
          }))}
          selectedValues={currentSort ? [currentSort] : []}
          onChange={handleSortChange}
          placeholder="Selecione a ordenação..."
          isSingleSelect={true}
          showActionButtons={false}
        />
      </S.SortSelectWrapper>
    </S.SortContainer>
  )
}

export default Sort
