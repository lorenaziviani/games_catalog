import { ElementType, TextVariant } from '@/types/common'
import Text from '@components/common/ui/Text'
import { isDarkMode } from '@utils/themeUtils'
import type { ReactNode } from 'react'
import { useTheme } from 'styled-components'
import * as S from './styles'

interface FilterSectionProps {
  title: string
  children: ReactNode
}

const FilterSection = ({ title, children }: FilterSectionProps) => {
  const theme = useTheme()

  return (
    <S.Container data-testid="filter-section" data-title={title}>
      <Text
        as={ElementType.P}
        $variant={
          isDarkMode(theme) ? TextVariant.SECONDARY : TextVariant.PRIMARY
        }
        $lgFontSize={16}
      >
        {title}
      </Text>
      <S.Content>{children}</S.Content>
    </S.Container>
  )
}

export default FilterSection
